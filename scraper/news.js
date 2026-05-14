require('dotenv').config({ path: '../.env.local' });
const { createClient } = require('@supabase/supabase-js');
const cheerio = require('cheerio');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const ws = require('ws');

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
  global: { fetch: fetch },
  realtime: { transport: ws }
});

async function fetchHTML(url) {
  const res = await fetch(url);
  return await res.text();
}

async function scrapeCategoryPage(url) {
  console.log(`Scraping category page: ${url}`);
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);
  const links = [];
  
  $('h2.entry-title a, h3.entry-title a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && !links.includes(href)) {
      links.push(href);
    }
  });
  
  return links;
}

function getHighResUrl(url) {
  if (!url) return url;
  // Remove query parameters
  let cleanUrl = url.split('?')[0];
  // Remove WordPress dimensional suffixes (e.g., -1024x768.jpg)
  cleanUrl = cleanUrl.replace(/-\d+x\d+(?=\.[a-zA-Z]+$)/, '');
  return cleanUrl;
}

async function scrapeArticle(url) {
  console.log(`Scraping article: ${url}`);
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);
  
  const title = $('h1.entry-title').text().trim() || $('title').text().replace('｜ART PRESS', '').trim();
  
  // Try to find the featured image and upgrade to high-res
  let image = $('meta[property="og:image"]').attr('content') || $('.post-thumbnail img').attr('src') || $('.entry-content img').first().attr('src');
  image = getHighResUrl(image);
  
  const dateStr = $('time.entry-date.published').text().trim() || new Date().toLocaleDateString();
  const datetimeAttr = $('time.entry-date.published').attr('datetime');
  const created_at = datetimeAttr ? new Date(datetimeAttr).toISOString() : new Date().toISOString();
  
  // Extract slug from URL
  const urlParts = url.split('/').filter(Boolean);
  const slug = urlParts[urlParts.length - 1];
  
  const blocks = [];
  
  $('.entry-content').children().each((i, el) => {
    const tagName = el.tagName.toLowerCase();
    
    if (tagName === 'p') {
      const text = $(el).text().trim();
      // Keep only meaningful text
      if (text && !text.includes('Read More') && !text.includes('ART PRESS')) {
        blocks.push({ type: 'text', content: text });
      }
    } else if (tagName === 'figure') {
      let img = $(el).find('img').attr('src');
      if (img) img = getHighResUrl(img);
      const caption = $(el).find('figcaption').text().trim();
      if (img) {
        blocks.push({ type: 'image', url: img, caption });
      }
    } else if (tagName === 'h2' || tagName === 'h3') {
      const text = $(el).text().trim();
      if (text) {
        blocks.push({ type: tagName, content: text });
      }
    } else if (tagName === 'div' && $(el).find('img').length > 0) {
      // Sometimes images are wrapped in divs
      $(el).find('img').each((idx, imgEl) => {
        let src = $(imgEl).attr('src');
        if (src) {
          src = getHighResUrl(src);
          blocks.push({ type: 'image', url: src, caption: '' });
        }
      });
    }
  });

  return {
    title,
    slug,
    english_title: '',
    subtitle: '',
    tag: 'Magazine / News',
    date: dateStr,
    created_at,
    author: 'ART PRESS Editorial',
    image,
    image_caption: '',
    content: blocks,
    status: 'published',
    category: 'magazine'
  };
}

async function run() {
  const baseUrl = 'https://theartpressasia.com/news/';
  let page = 1;
  let allLinks = [];
  let hasMorePages = true;

  console.log("Starting to scrape all pages...");

  while (hasMorePages) {
    const pageUrl = page === 1 ? baseUrl : `${baseUrl}page/${page}/`;
    try {
      const links = await scrapeCategoryPage(pageUrl);
      if (links.length === 0) {
        hasMorePages = false;
        console.log(`No more articles found on page ${page}. Stopping pagination.`);
      } else {
        allLinks.push(...links);
        console.log(`Page ${page}: Found ${links.length} articles.`);
        page++;
      }
    } catch (e) {
      console.log(`Error or end of pagination on page ${page}.`);
      hasMorePages = false;
    }
  }
  
  // Remove duplicates just in case
  allLinks = [...new Set(allLinks)];
  console.log(`Total unique articles found across all pages: ${allLinks.length}`);
  
  for (const link of allLinks) {
    try {
      const articleData = await scrapeArticle(link);
      console.log(`Extracted: ${articleData.title.substring(0, 40)}... | Blocks: ${articleData.content.length}`);
      
      const { data, error } = await supabase
        .from('articles')
        .upsert(articleData, { onConflict: 'slug' });
        
      if (error) {
        console.error(`❌ Failed to insert ${articleData.slug}:`, error.message);
      } else {
        console.log(`✅ Successfully inserted: ${articleData.slug}`);
      }
      
      // Sleep slightly to be polite to the server
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.error(`❌ Error processing ${link}:`, e.message);
    }
  }
  
  console.log("All pages migration complete!");
}

run();
