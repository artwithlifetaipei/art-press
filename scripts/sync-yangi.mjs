import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const SUPABASE_URL = 'https://ndykxwqdhgffnldpfoiw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5keWt4d3FkaGdmZm5sZHBmb2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTkxMTAsImV4cCI6MjA5NDIzNTExMH0.hPoot7WIdklyBZHNz8q10OIlcXnv40W58sEixybpZF8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const yangiUrl = 'https://tapeverythingcom.wpcomstaging.com/2025/06/06/the-hardest-part-isnt-creating-its-balancing-interview-with-allen-yang-founder-of-yangi/';

async function syncYangi() {
  console.log('🔄 Fetching YANGI article from WordPress staging...');
  
  try {
    const res = await fetch(yangiUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
    });
    const html = await res.text();
    
    // Extract the entry-content section
    const bodyMatch = html.match(/<div[^>]+class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<footer[^>]+class="end-meta"/i)
      || html.match(/<div[^>]+class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<div[^>]+id='jp-relatedposts'/i)
      || html.match(/<div[^>]+class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/article>/i);
    let wpBody = bodyMatch ? bodyMatch[1] : null;
    
    if (!wpBody) {
      throw new Error('Could not extract YANGI body content from HTML');
    }
    
    const blocks = htmlToBlocks(wpBody);
    console.log(`✅ Parsed ${blocks.length} blocks for YANGI article!`);
    fs.writeFileSync('scripts/yangi-blocks.json', JSON.stringify(blocks, null, 2));
    console.log('\nPreviewing parsed blocks structure:');
    blocks.forEach((b, idx) => {
      console.log(`[${idx}] Type: ${b.type}, Bold: ${b.bold || false}, Value: "${b.value ? b.value.substring(0, 60) + (b.value.length > 60 ? '...' : '') : ''}"`);
    });

    console.log('\n🚀 Updating Supabase record for slug "yangi"...');
    const { data, error } = await supabase
      .from('articles')
      .update({ content: blocks })
      .eq('slug', 'yangi')
      .select('id, slug, title');
      
    if (error) {
      console.error('❌ Supabase update failed:', error.message);
    } else {
      console.log('🎉 YANGI article contents updated successfully in Supabase!');
      console.log(JSON.stringify(data, null, 2));
    }
    
  } catch (err) {
    console.error('❌ Sync failed:', err.message);
  }
}

function htmlToBlocks(html) {
  const blocks = [];
  
  // Remove comments
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  
  // Split into paragraphs, headings, figures, blockquotes
  const lines = html.split(/(?=<(?:p|h[1-6]|figure|blockquote)[\s>])/i);
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // 1. Image checks
    const imgMatch = trimmed.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
    if (imgMatch) {
      let src = imgMatch[1];
      src = src.replace(/&#038;/g, '&').replace(/&amp;/g, '&');
      const captionMatch = trimmed.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
      const caption = captionMatch ? stripTags(captionMatch[1]).trim() : '';
      if (src && !src.includes('data:image')) {
        // Clean up jetpack resizing URLs to original if possible or keep as is
        blocks.push({ type: 'image', value: src, bold: false, caption });
      }
      continue;
    }
    
    // 2. Subheading checks (h2 or h3)
    const h23 = trimmed.match(/^<h[2-3][^>]*>([\s\S]*?)<\/h[2-3]>/i);
    if (h23) {
      const t = stripTags(h23[1]).trim();
      if (t && !t.match(/^(相關|相關文章)$/i)) blocks.push({ type: 'subheading', value: t, bold: false, caption: '' });
      continue;
    }
    
    // 3. Smaller headings (h4, h5, h6)
    const h46 = trimmed.match(/^<h[4-6][^>]*>([\s\S]*?)<\/h[4-6]>/i);
    if (h46) {
      const t = stripTags(h46[1]).trim();
      if (t && !t.match(/^(相關|相關文章)$/i)) blocks.push({ type: 'text', value: t, bold: true, caption: '' });
      continue;
    }
    
    // 4. Blockquotes
    const quote = trimmed.match(/^<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i);
    if (quote) {
      const t = stripTags(quote[1]).trim();
      if (t) {
        const cleanQuote = t.replace(/\s+/g, ' ').trim();
        // Only wrap in quotes if it doesn't already start with a quote character
        if (cleanQuote.startsWith('「') || cleanQuote.startsWith('“') || cleanQuote.startsWith('"') || cleanQuote.startsWith('『')) {
          blocks.push({ type: 'text', value: cleanQuote, bold: true, caption: '' });
        } else {
          blocks.push({ type: 'text', value: `\u300C${cleanQuote}\u300D`, bold: true, caption: '' });
        }
      }
      continue;
    }
    
    // 5. Paragraphs
    const p = trimmed.match(/^<p[^>]*>([\s\S]*?)<\/p>/i);
    if (p) {
      const inner = p[1].trim();
      if (!inner || inner.length < 2) continue;
      
      // Keep nested links and basic tags like <b> or <a> if any, but clean rest
      const withBreaks = inner.replace(/<br\s*\/?>/gi, '\n');
      const cleaned = stripTags(withBreaks).trim();
      
      // Skip utility words and metadata lines
      if (
        cleaned && 
        cleaned.length >= 3 && 
        !cleaned.match(/^(magazine|looom people|magazine 雜誌|screenshot|相關|相關文章)$/i) &&
        !cleaned.startsWith('— — —')
      ) {
        // Check if paragraph is actually strong/bold
        const isStrong = inner.startsWith('<strong>') && inner.endsWith('</strong>');
        blocks.push({ type: 'text', value: cleaned, bold: isStrong, caption: '' });
      }
    }
  }
  
  // De-duplicate any consecutive identical text blocks that may occur due to block editor redundancy
  const uniqueBlocks = [];
  for (let i = 0; i < blocks.length; i++) {
    const current = blocks[i];
    if (i > 0) {
      const prev = uniqueBlocks[uniqueBlocks.length - 1];
      if (current.type === prev.type && current.value === prev.value) {
        continue; // skip duplicate
      }
    }
    uniqueBlocks.push(current);
  }
  
  return uniqueBlocks;
}
 
function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8220;/g, '\u300C')
    .replace(/&#8221;/g, '\u300D')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8211;/g, '\u2013')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&#8230;/g, '…')
    .replace(/\s+/g, ' ')
    .trim();
}
 
syncYangi();
