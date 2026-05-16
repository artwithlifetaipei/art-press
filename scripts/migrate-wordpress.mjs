/**
 * WordPress → Supabase Content Migration Script
 * 
 * Fetches all article body content from WordPress staging site,
 * converts HTML to block JSON format, and updates Supabase records.
 * 
 * Usage: node scripts/migrate-wordpress.mjs
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ndykxwqdhgffnldpfoiw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5keWt4d3FkaGdmZm5sZHBmb2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTkxMTAsImV4cCI6MjA5NDIzNTExMH0.hPoot7WIdklyBZHNz8q10OIlcXnv40W58sEixybpZF8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// All WordPress article URLs to migrate — slug must match Supabase exactly
const WP_ARTICLES = [
  // ── Looom People (stored as magazine category in Supabase) ────────────────
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2025/09/30/interview-with-gaute-2/',
    slug: 'interview-with-gaute-2',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2025/06/06/the-hardest-part-isnt-creating-its-balancing-interview-with-allen-yang-founder-of-yangi/',
    slug: 'the-hardest-part-isnt-creating-its-balancing-interview-with-allen-yang-founder-of-yangi',
  },
  // ── Magazine ───────────────────────────────────────────────────────────────
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2025/08/26/patricia-dominguez/',
    slug: 'patricia-dominguez',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2025/01/15/why-do-we-feel-life-lacks-spark-palm-gallery-with-nine-artists-present-group-show-rewriting-territories-artistic-breakthroughs-in-deterritorialization/',
    slug: 'why-do-we-feel-life-lacks-spark-palm-gallery-with-nine-artists-present-group-show-rewriting-territories-artistic-breakthroughs-in-deterritorialization',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2023/10/24/dance-art-taipei-performance-taipei-art-music-festival-2023-c-lab-sound-art-festival-diversonics/',
    slug: 'dance-art-taipei-performance-taipei-art-music-festival-2023-c-lab-sound-art-festival-diversonics',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2023/08/25/sun-sea-by-rugile-barzdziukaite-vaiva-grainyte-lina-lapelyte-at-taipei-performing-arts-center/',
    slug: 'sun-sea-by-rugile-barzdziukaite-vaiva-grainyte-lina-lapelyte-at-taipei-performing-arts-center',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2023/08/11/art-taipei-museum-for-the-once-passiaonte-historical-moments-c-labs-memory-palace-in-ruins/',
    slug: 'art-taipei-museum-for-the-once-passiaonte-historical-moments-c-labs-memory-palace-in-ruins',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2023/08/10/imperfect-is-perfect-interview-with-lolo-sosaku-at-double-square-gallery-during-spectrum-motion/',
    slug: 'imperfect-is-perfect-interview-with-lolo-sosaku-at-double-square-gallery-during-spectrum-motion',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2023/05/10/gallery-at-it-yiyun-art-with-the-study-of-chinese-culture-artist-realize-the-ethereal-and-elegant-atmosphere-interview-with-artist-cheng-tsai-tung/',
    slug: 'gallery-at-it-yiyun-art-with-the-study-of-chinese-culture-artist-realize-the-ethereal-and-elegant-atmosphere-interview-with-artist-cheng-tsai-tung',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2023/04/20/art-taipei-exhibition-about-iceland-nature-and-water-a-sparse-visual-language-imbued-with-environment-roni-horns-first-solo-exhibition-in-taipei/',
    slug: 'art-taipei-exhibition-about-iceland-nature-and-water-a-sparse-visual-language-imbued-with-environment-roni-horns-first-solo-exhibition-in-taipei',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2023/02/07/museum-it-copying-the-state-of-the-continuously-fading-time-the-lithe-return%ef%bc%8dlee-jo-mei-at-double-square-gallery/',
    slug: 'museum-it-copying-the-state-of-the-continuously-fading-time-the-lithe-return%ef%bc%8dlee-jo-mei-at-double-square-gallery',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2023/01/17/how-to-talk-about-your-country-through-art-4-keywords-about-anri-sala-and-anri-salaas-you-go-at-win-sing-art-place/',
    slug: 'how-to-talk-about-your-country-through-art-4-keywords-about-anri-sala-and-anri-salaas-you-go-at-win-sing-art-place',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2023/01/05/besides-cookie-what-else-can-we-buy-as-lunar-new-year-gift-for-all-the-contemporary-art-lovers-5-recommend-by-art-press/',
    slug: 'besides-cookie-what-else-can-we-buy-as-lunar-new-year-gift-for-all-the-contemporary-art-lovers-5-recommend-by-art-press',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2022/11/23/yves-klein-andy-warhol-it-museum-in-the-end-of-the-year-reveal-all-the-chaos-alien-art-centre-presents-arman-think-things-and-jean-claude-wouters-light-of-void/',
    slug: 'yves-klein-andy-warhol-it-museum-in-the-end-of-the-year-reveal-all-the-chaos-alien-art-centre-presents-arman-think-things-and-jean-claude-wouters-light-of-void',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2022/11/15/it-museum-minimal-and-abstract-art-without-semiotics-suspension-wu-tung-lung-solo-exhibition-at-chiayi-art-museum/',
    slug: 'it-museum-minimal-and-abstract-art-without-semiotics-suspension-wu-tung-lung-solo-exhibition-at-chiayi-art-museum',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2022/11/06/besides-art-fair-is-there-any-possibility-about-international-art-event-in-collaboration-with-art-basel-art-week-tokyo-present-museum-and-gallery-to-international-visitors/',
    slug: 'besides-art-fair-is-there-any-possibility-about-international-art-event-in-collaboration-with-art-basel-art-week-tokyo-present-museum-and-gallery-to-international-visitors',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2022/10/21/beside-the-local-history-local-museum-can-also-present-contemporary-art-2222-at-chiayi-art-museum/',
    slug: 'beside-the-local-history-local-museum-can-also-present-contemporary-art-2222-at-chiayi-art-museum',
  },
  {
    wpUrl: 'https://tapeverythingcom.wpcomstaging.com/2022/10/18/taipei-museum-it-for-you-whats-the-ideal-future-should-be-like-1972-toffler%ef%bc%8dsuhui-yusolo-exhibition-at-double-square-gallery/',
    slug: 'taipei-museum-it-for-you-whats-the-ideal-future-should-be-like-1972-toffler%ef%bc%8dsuhui-yusolo-exhibition-at-double-square-gallery',
  },
];


// ─── HTML → Block Converter ───────────────────────────────────────────────────

function htmlToBlocks(html) {
  const blocks = [];

  // Remove WordPress-specific comment blocks
  html = html.replace(/<!--[\s\S]*?-->/g, '');

  // Extract all paragraphs, headings, images
  // Match <p>, <h1>-<h6>, <figure>/<img>, <blockquote>
  const elementRegex = /<(p|h[1-6]|figure|blockquote|div[^>]*class="[^"]*wp-block[^"]*"[^>]*)>([\s\S]*?)<\/\1>/gi;

  // Split by block-level tags
  const lines = html.split(/(?=<(?:p|h[1-6]|figure|blockquote)[\s>])/i);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // --- Image blocks ---
    const imgMatch = trimmed.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
    if (imgMatch) {
      const src = imgMatch[1];
      const captionMatch = trimmed.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
      const caption = captionMatch ? stripTags(captionMatch[1]).trim() : '';
      if (src && !src.includes('data:image')) {
        blocks.push({ type: 'image', value: src, bold: false, caption });
      }
      continue;
    }

    // --- Heading blocks (h2, h3) → subheading ---
    const headingMatch = trimmed.match(/^<h[2-3][^>]*>([\s\S]*?)<\/h[2-3]>/i);
    if (headingMatch) {
      const text = stripTags(headingMatch[1]).trim();
      if (text) blocks.push({ type: 'subheading', value: text, bold: false, caption: '' });
      continue;
    }

    // --- H4-H6 → bold text ---
    const smallHeadingMatch = trimmed.match(/^<h[4-6][^>]*>([\s\S]*?)<\/h[4-6]>/i);
    if (smallHeadingMatch) {
      const text = stripTags(smallHeadingMatch[1]).trim();
      if (text) blocks.push({ type: 'text', value: text, bold: true, caption: '' });
      continue;
    }

    // --- Blockquote → bold text ---
    const quoteMatch = trimmed.match(/^<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i);
    if (quoteMatch) {
      const text = stripTags(quoteMatch[1]).trim();
      if (text) blocks.push({ type: 'text', value: `「${text}」`, bold: true, caption: '' });
      continue;
    }

    // --- Paragraph text ---
    const pMatch = trimmed.match(/^<p[^>]*>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      const inner = pMatch[1].trim();
      // Skip empty or nav/metadata paragraphs
      if (!inner || inner.length < 2) continue;
      const text = stripTags(inner).trim();
      // Skip very short meaningless fragments
      if (!text || text.length < 3) continue;
      // Skip if it's just a link to category/tag
      if (text.match(/^(magazine|looom people|magazine 雜誌)$/i)) continue;

      // Preserve line breaks by replacing <br> with \n
      const withBreaks = inner.replace(/<br\s*\/?>/gi, '\n');
      const cleaned = stripTags(withBreaks).trim();
      if (cleaned) blocks.push({ type: 'text', value: cleaned, bold: false, caption: '' });
      continue;
    }
  }

  return blocks;
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
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Fetch WordPress article HTML ─────────────────────────────────────────────

async function fetchWpContent(url) {
  try {
    console.log(`  📥 Fetching: ${url}`);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    // Extract the article body — WP stores it in <div class="entry-content ...">
    const contentMatch = html.match(/<div[^>]+class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div|<footer|<section)/i);
    if (!contentMatch) {
      // Try alternate selector
      const altMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
      if (altMatch) return altMatch[1];
      console.warn(`  ⚠️  Could not find entry-content in ${url}`);
      return null;
    }
    return contentMatch[1];
  } catch (err) {
    console.error(`  ❌ Fetch failed for ${url}:`, err.message);
    return null;
  }
}

// ─── Main Migration ────────────────────────────────────────────────────────────

async function migrate() {
  console.log('\n🚀 Starting WordPress → Supabase content migration...\n');
  console.log(`📊 Total articles to migrate: ${WP_ARTICLES.length}\n`);

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const { wpUrl, slug } of WP_ARTICLES) {
    console.log(`\n────────────────────────────────────────`);
    console.log(`🔍 Processing: ${slug}`);

    // 1. Find the article in Supabase by slug
    const { data: articles, error: findError } = await supabase
      .from('articles')
      .select('id, slug, title')
      .eq('slug', slug);

    if (findError) {
      console.error(`  ❌ Supabase query error for slug "${slug}":`, findError.message);
      failed++;
      continue;
    }

    if (!articles || articles.length === 0) {
      console.log(`  ⚠️  Slug "${slug}" not found in Supabase — skipping`);
      console.log(`     → You may need to create this article in the admin first`);
      skipped++;
      continue;
    }

    const article = articles[0];
    console.log(`  ✅ Found in Supabase: "${article.title}" (ID: ${article.id})`);

    // 2. Fetch WordPress HTML
    const wpHtml = await fetchWpContent(wpUrl);
    if (!wpHtml) {
      console.log(`  ⚠️  No content fetched — skipping`);
      skipped++;
      continue;
    }

    // 3. Convert HTML to blocks
    const blocks = htmlToBlocks(wpHtml);
    console.log(`  📝 Converted to ${blocks.length} content blocks`);

    if (blocks.length === 0) {
      console.log(`  ⚠️  No blocks generated — skipping`);
      skipped++;
      continue;
    }

    // Show a preview of the first 2 blocks
    blocks.slice(0, 2).forEach((b, i) => {
      const preview = b.value.substring(0, 60).replace(/\n/g, ' ');
      console.log(`     Block ${i + 1} [${b.type}]: ${preview}...`);
    });

    // 4. Update Supabase
    const { error: updateError } = await supabase
      .from('articles')
      .update({ content: blocks })
      .eq('id', article.id);

    if (updateError) {
      console.error(`  ❌ Supabase update failed:`, updateError.message);
      failed++;
      continue;
    }

    console.log(`  ✅ Successfully updated content in Supabase!`);
    success++;

    // Small delay between requests to be polite to WordPress server
    await new Promise(r => setTimeout(r, 800));
  }

  console.log('\n════════════════════════════════════════');
  console.log('📋 Migration Summary');
  console.log('════════════════════════════════════════');
  console.log(`  ✅ Successfully migrated : ${success}`);
  console.log(`  ⚠️  Skipped (not found)  : ${skipped}`);
  console.log(`  ❌ Failed                : ${failed}`);
  console.log(`  📊 Total processed       : ${WP_ARTICLES.length}`);
  console.log('\n🎉 Done! Please check your site to verify content.\n');
}

migrate();
