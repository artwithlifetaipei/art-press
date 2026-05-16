/**
 * Insert EME Skincare & Dan Retro articles + fix YANGI content
 * These articles were completely missing from Supabase and need to be created.
 * 
 * Usage: node scripts/insert-missing-articles.mjs
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ndykxwqdhgffnldpfoiw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5keWt4d3FkaGdmZm5sZHBmb2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTkxMTAsImV4cCI6MjA5NDIzNTExMH0.hPoot7WIdklyBZHNz8q10OIlcXnv40W58sEixybpZF8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── EME Skincare Content (from WordPress) ─────────────────────────────────────
const EME_CONTENT = [
  { type: 'text', bold: true, caption: '', value: '「其實，現在的消費者，是更耳聰目明的了。」Zoey Fang 說道。' },
  { type: 'text', bold: false, caption: '', value: '做品牌長達十多年的 Zoey ，在訂製、女裝、甚至到美妝保養等，她親身經歷過一波又一波的風潮追趕，更清楚台灣市場的眾多難解問題。除了市場規模有限外，如今，要在社群上創造出一個「品牌」，相較於從前容易許多，創設 Instagram 帳號、替產品拍美照、做直播帶貨，彷彿人人皆可創品牌，競爭如此激烈。然而，這些觀察與過去十多年的寶貴經歷，並不沒有讓她對市場有任何埋怨，在她眼裡，如今的資訊發達，象徵著消費者遠比身在以前的消費環境時更加地聰慧，且更有機會去做出對自己真正好的選擇。' },
  { type: 'text', bold: false, caption: '', value: '換言之，在 Zoey 眼裏，如今最重要的反而是：身為品牌，能不能帶給消費者「足夠好」的『品牌產品』，而不是輕易可以變出來稱作是產品的工業產物。' },
  { type: 'subheading', bold: false, caption: '', value: '1. 擁有流量，就代表一定能讓品牌「成功」嗎？' },
  { type: 'text', bold: false, caption: '', value: '在不久的過去，建立品牌可能需要投入大量資金在行銷、KOL發文曝光、甚至是找藝人代言等。然而，試問在如今網紅越來越多的社群行銷環境裡，如往常一般地讓網紅帶著產品拍照發文，對消費者們所能造成的效果，可能是很有限了。' },
  { type: 'text', bold: false, caption: '', value: '近年來，越來越多網紅自創品牌，但當眾人們論起銷量時，卻是幾家歡樂幾家愁，這又是為什麼？顯然地，若只是有流量，是無法直接轉化為長久銷量的。更何況，流量還分很多種，不是每一種都能對自己品牌在長遠上有實質的幫助。網紅，如果想透過社群變現有很多種方法，這個 Zoey 再清楚不過。' },
  { type: 'text', bold: false, caption: '', value: '如果，她選擇透過大量的網紅曝光、隨之地把產品價格帶拉低後，可能會在短期間獲得蜂擁而至的銷量，但她想要的是更長遠的關係。Zoey 她認為現在的消費者很聰明，越來越多沒有那麼容易光看美照就買單、早已不是觀眾單純相信代言的時代，因此她更重視產品的品質與實際體驗。「重點是你的品質要好，客人才不會離開。」Zoey 說。' },
  { type: 'text', bold: false, caption: '', value: '這種轉變不僅降低了行銷成本，也使經營更加「紮實」，更加地符合她的理念。就像 Zoey 在其中一個旗下保養品牌 EME skincare 的理念：追求的不只是短暫的美麗。' },
  { type: 'subheading', bold: false, caption: '', value: '2. 網路時代顧客總是在比價？與其抱怨消費者，不如好好地做溝通' },
  { type: 'text', bold: false, caption: '', value: '「這十幾年裡，不管是哪一個年代，建立品牌本來就需要花很多錢。」對 Zoey 來說，把錢花在哪裡，才是品牌主需要思考的問題。' },
  { type: 'text', bold: false, caption: '', value: '舉例來說，品牌究竟是該把錢花在累計百萬甚至千萬的流量曝光？砸重本設立精緻的實體門店、或進駐百貨？還是，你會選擇把錢花在經營深度的顧客關係？在切身經歷上，Zoey 以過去服飾品牌的選品經驗為例，網路時代裡消費者進行「比價」的成本極低，幾乎不可能阻止消費者在網路上充分地搜尋、比價後才選擇。' },
  { type: 'text', bold: false, caption: '', value: '而當隨著越來越多選品品牌，在同樣的選品品項上，為了競爭而選擇壓低價格，且在市場相對小的台灣，以量制價能夠發揮作用的可能性較低時，這個狀況，也讓許多選品品牌落入極大的困境。而這對像是 Zoey 這樣，實地走遍巴黎去選品的品牌來說，更是嚴峻。Zoey 分享道，許多選進來的品牌和品項，是就算飛到巴黎，如果沒有專業人士帶路，可能也逛不到的店。' },
  { type: 'text', bold: false, caption: '', value: '想像一個服飾品牌們的困境，顧客們一昧地比價，若品牌選擇妥協隨之壓低價格到近乎賠本時，即賣一件等於虧一件的困境，對此，許多品牌苦不堪言。' },
  { type: 'text', bold: false, caption: '', value: '然而，對 Zoey 來說，與其抱怨環境、抱怨消費者，不如回到品牌踏實地對消費者溝通。從給予充分的服飾風格與保養知識、到邀請顧客到現場做深度且扎實的實際產品體驗，對 Zoey 來說，都屬於品牌該去做的「溝通」。好好地讓眼前的顧客理解到產品背後的價值，且與市面上許多產品都不同時，顧客自然不會那麼容易陷入一昧的比價狀態了。' },
  { type: 'text', bold: true, caption: '', value: '「有時，乍看之下是條遠路，但其實是最好的路。」Zoey 說。' },
  { type: 'subheading', bold: false, caption: '', value: '3. 身為獨立品牌，你選擇要外顯價值，還是做出好品質的產品？' },
  { type: 'text', bold: false, caption: '', value: '早期將店面設在東區、甚至拓展門市到百貨中，而如今，對 Zoey 來說，深度且有質量的關係勝過於大量的人流。' },
  { type: 'text', bold: false, caption: '', value: '從廣泛的知名度與曝光等外顯價值，轉向深耕客戶關係，培養顧客的高黏著度與價值認可，因為對過去經營品牌已長達十多年的 Zoey 來說，品牌不該是一個只做三五年的事情，長期的關係才是她想追求的。而當然，長期的關係，是無法炒短線求快的，例如，在 Zoey 旗下的保養品牌上，她從不去倡導「一夕之間的神奇效果」，而是呼籲客人注重肌膚根本性的健康，不過度宣傳「快速且驚人」的 before after。或許，面對做品牌，踏實且深度地做了之後，耐心等待時間帶來的成果，如何更沈得住氣，正是值得我們深思的。' },
  { type: 'text', bold: true, caption: '', value: '「其實，做品牌從來都是無法求快的。」Zoey 說道。' },
  { type: 'text', bold: false, caption: '', value: 'EME Skincare｜@EMESkincare_official\nEME相信，我們值得追求的不只是短暫的美麗，而是長久的健康光采。真正美麗的肌膚來自於健康的根基，每款產品都不含防腐劑、人造色素、酒精、礦物油、螢光劑和香精，選用的成分天然的同時也結合創新科技，努力為每一位消費者在溫和中帶來明顯效果。' },
  { type: 'text', bold: false, caption: '', value: 'EME Official｜@EME_theeme\nEME 主理人 Zoey Fang 所創下的選品品牌。從 Maison ZF、ZOEYF Showroom，到如今的 EME Official，帶給喜歡 Parisian Chic 風格的台灣質感女性們，倡議著 "Less is more" 的生活哲學，是主理人十多年來不變的初衷。' },
  { type: 'text', bold: false, caption: '', value: '——————————\n在過去，台灣有許多傳統形式的社群，但 Looom Club 與這些傳統精英社群不同。\nLooom Club 適合擁有自身事業的主理人與企業高階經理人，能在有限的時間裡高效率交流。透過入會篩選流程，讓大家在專注事業發展的同時，也能結識正在努力前進的新朋友。' },
];

// ── Dan Retro & Furniture Content (from WordPress) ────────────────────────────
const DAN_CONTENT = [
  { type: 'text', bold: true, caption: '', value: '「你確定你要做嗎？你如果只想要成功，不想要付出代價的話，那你可能先不要做。」Dan 說道。' },
  { type: 'text', bold: false, caption: '', value: '自 2018 年至今，創辦家居品牌 Dan Retro & Furniture 的 Dan，從德國極簡元祖百靈 Braun 的老件音響、20 世紀現代設計的代表人物 Charles & Ray Eames 的 DSS 玻璃纖維餐椅等經典老件，到當代比利時 Stack 的鋁合金模組收納系統都有的家居品牌 Dan Retro & Furniture，涉獵甚是廣。但其實，品牌主理人 Dan 並不是家居傢具產品出身的品牌主理人。' },
  { type: 'text', bold: false, caption: '', value: '如今，Dan Retro & Furniture 在社群上有著極高的聲量，當提到經典老件與當代家居選品品牌時，他是社群上數一數二的品牌。曾有媒體報導稱他為「老件與家具的浪漫場域」、「尋寶秘境」等。然而，這些浪漫的代價又是什麼？' },
  { type: 'text', bold: true, caption: '', value: '「當我決定了，我沒有要賣現在傢俱市場上好賣的東西時，就也要知道這條路不會太容易。」Dan 說。' },
  { type: 'text', bold: false, caption: '', value: '過去國際貿易的背景，再憑著他年輕時從古著服飾上體會到，那些經時光洗練的靈魂性有何不同時，這讓他知道，他之所以需要親身走訪歐洲大小城市去「找東西」的原因，以及所謂的「品味」到底是什麼。所謂的「品味」是奢侈昂貴嗎？還是純粹的稀有呢？而當實地的海外經驗使他看過許多、且選擇不盲目地跟著市場流行風潮而隨波逐流時，身為品牌主理人，在這個網路時代，他不怕別人輕易模仿複製嗎？當市場上很明顯地有著某個流行風潮與熱或產生時，要起身追逐嗎？那些做品牌的心慌、不斷質問自己的自我對話時刻，該如何是好？' },
  { type: 'text', bold: true, caption: '', value: '「如果，前方的路很暗，你必須要為你自己點亮屬於你自己的燈。」Dan 一派輕鬆地說。' },
  { type: 'text', bold: true, caption: '', value: '「做品牌，它可能其實是眼前根本不知道有沒有路。創造出一個品牌，就像是拓荒。」Dan 說道。' },
  { type: 'text', bold: false, caption: '', value: '幾乎所有的品牌主理人都能理解，做一個品牌有太多事情需要學會了。除了技術核心之外，從進貨、盤存、行政、稅務、行銷、媒體公關、陳列、銷售策略等，甚至像是傢俱品牌還有維修和保養問題。「其實，現在連修復我都能幫客人做，這些我以前也不會啊。」對許多品牌主理人來說，做品牌就像是把一件事情從無到有地長出來，自學這一切對 Dan 和許多品牌主理人來說，彷彿是基本功般地稀鬆平常。然而，如果有哪些是自己還不會、還缺乏的呢？' },
  { type: 'text', bold: true, caption: '', value: '「我會問前輩啊，但要哪裡找前輩問？就一樣在同個路上一直走，他就會出現了。但，那就必須要等。」' },
  { type: 'text', bold: true, caption: '', value: '「做品牌，你就是要熬得住啊。」' },
  { type: 'text', bold: false, caption: '', value: '如今，當眾人在生活裡談論著蔚為風潮的「MIX & MATCH」，甚至也開始認為古董也是當代的時髦樣貌之一時，Dan 的選品品味則是多年前就已經確立了這個路線，且無論傢俱市場流行風潮如何，都絲毫不左右他當初設定的品牌精神。' },
  { type: 'text', bold: false, caption: '', value: '這象徵著：做屬於自己的品牌，乍看事件沒有門檻，好似有個名字、畫了LOGO創立了 Instagram 帳號後就能輕易發生的事情。創立品牌確實是一件充滿無限可能的事，但要能做出差異化、且不計眼前成果如何都選擇投入，也就是能夠堅持下去，正如 Dan 所說的「能熬」，能傳遞精神與價值，才能真正成就一個「品牌」，而非只是「賣貨」。' },
  { type: 'text', bold: false, caption: '', value: 'Dan Retro & furniture｜@dan_decoantique\n經營古董老件品牌長達8年，現有一百坪展間（新北市新莊區中正路831-1號2樓），以及一間工作室（桃園市龜山區文學路202號），同時，也身兼許多質感與當代風格的設計公司軟裝師與家居品味顧問。' },
  { type: 'text', bold: false, caption: '', value: '——————————\n在過去，台灣有許多傳統形式的社群，但 Looom Club 與這些傳統精英社群不同。\nLooom Club 適合擁有自身事業的主理人與企業高階經理人，能在有限的時間裡高效率交流。透過入會篩選流程，讓大家在專注事業發展的同時，也能結識正在努力前進的新朋友。' },
];

async function run() {
  console.log('\n🚀 Inserting missing Looom People articles...\n');

  // ── 1. Insert EME Skincare ────────────────────────────────────────────────
  console.log('📝 Inserting: EME Skincare (Zoey Fang)');
  const emePayload = {
    title: '你買到的是產品，或只是工業產物？「其實，做品牌從來無法求快」EME Skincare 創辦人 Zoey Fang',
    english_title: '"Are you buying a product — or just another industrial output? Real brand-building takes time," says Zoey Fang, founder of EME.',
    slug: 'eme-skincare',
    subtitle: '早期將店面設在東區、甚至拓展門市到百貨中，而如今，對 Zoey 來說，深度且有質量的關係勝過於大量的人流。',
    tag: 'Looom People',
    date: 'July 16, 2025',
    author: 'ART PRESS Editorial',
    image: 'https://tapeverythingcom.wpcomstaging.com/wp-content/uploads/2025/07/EME-Skincare-Zoey-Fang-ART-PRESS.jpg',
    image_caption: 'EME Skincare 創辦人 Zoey Fang',
    status: 'published',
    category: 'people',
    is_hero: false,
    content: EME_CONTENT,
  };

  const { data: emeData, error: emeError } = await supabase.from('articles').insert([emePayload]).select('id, slug');
  if (emeError) {
    console.error('  ❌ EME insert failed:', emeError.message);
  } else {
    console.log('  ✅ EME Skincare inserted! ID:', emeData?.[0]?.id);
  }

  // ── 2. Insert Dan Retro & Furniture ──────────────────────────────────────
  console.log('\n📝 Inserting: Dan Retro & Furniture');
  const danPayload = {
    title: '「做品牌，你就是要熬得住啊。」專訪家居品牌 Dan Retro & Furniture 主理人',
    english_title: "Brand-building is a long game — It was once just someone who didn't give up. Interview with founder of Dan Retro & Furniture",
    slug: 'dan-retro',
    subtitle: '「做品牌，它可能其實是眼前根本不知道有沒有路。創造出一個品牌，就像是拓荒。」Dan 說道。',
    tag: 'Looom People',
    date: 'June 7, 2025',
    author: 'ART PRESS Editorial',
    image: 'https://tapeverythingcom.wpcomstaging.com/wp-content/uploads/2025/06/Dan-Retro-Furniture-ART-PRESS.jpg',
    image_caption: '家居品牌 Dan Retro & Furniture 主理人 Dan',
    status: 'published',
    category: 'people',
    is_hero: false,
    content: DAN_CONTENT,
  };

  const { data: danData, error: danError } = await supabase.from('articles').insert([danPayload]).select('id, slug');
  if (danError) {
    console.error('  ❌ Dan Retro insert failed:', danError.message);
  } else {
    console.log('  ✅ Dan Retro & Furniture inserted! ID:', danData?.[0]?.id);
  }

  // ── 3. Re-fetch & fix YANGI (only 3 blocks currently — needs full content) ─
  console.log('\n🔧 Re-migrating YANGI from WordPress (currently only 3 blocks)...');
  const yangiSlug = 'the-hardest-part-isnt-creating-its-balancing-interview-with-allen-yang-founder-of-yangi';
  const yangiUrl = 'https://tapeverythingcom.wpcomstaging.com/2025/06/06/the-hardest-part-isnt-creating-its-balancing-interview-with-allen-yang-founder-of-yangi/';
  
  const res = await fetch(yangiUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
  });
  const html = await res.text();
  
  // Extract the entry-content section (longer greedy match to get all content)
  const entryMatches = html.matchAll(/<div[^>]+class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<div[^>]+class="[^"]*sharedaddy/gi);
  let wpBody = null;
  for (const m of entryMatches) { wpBody = m[1]; break; }
  if (!wpBody) {
    // fallback: get between the categories and the author section
    const bodyMatch = html.match(/(<p[^>]*>[\s\S]{50,}?)<div[^>]+class="[^"]*post-tags/i);
    if (bodyMatch) wpBody = bodyMatch[1];
  }
  
  if (wpBody) {
    const blocks = htmlToBlocks(wpBody);
    console.log(`  📝 Fetched ${blocks.length} blocks for YANGI`);
    const { error } = await supabase.from('articles').update({ content: blocks }).eq('slug', yangiSlug);
    if (error) console.error('  ❌ YANGI update failed:', error.message);
    else console.log('  ✅ YANGI content updated!');
  } else {
    console.log('  ⚠️  Could not extract YANGI body content from WordPress');
  }

  console.log('\n════════════════════════════════════════');
  console.log('✅ All missing articles processed!');
  console.log('🌐 Check: https://looom-artpress.com/people/eme-skincare');
  console.log('🌐 Check: https://looom-artpress.com/people/dan-retro');
  console.log('════════════════════════════════════════\n');
}

function htmlToBlocks(html) {
  const blocks = [];
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  const lines = html.split(/(?=<(?:p|h[1-6]|figure|blockquote)[\s>])/i);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const imgMatch = trimmed.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
    if (imgMatch) {
      const src = imgMatch[1];
      const captionMatch = trimmed.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
      const caption = captionMatch ? stripTags(captionMatch[1]).trim() : '';
      if (src && !src.includes('data:image')) blocks.push({ type: 'image', value: src, bold: false, caption });
      continue;
    }
    const h23 = trimmed.match(/^<h[2-3][^>]*>([\s\S]*?)<\/h[2-3]>/i);
    if (h23) { const t = stripTags(h23[1]).trim(); if (t) blocks.push({ type: 'subheading', value: t, bold: false, caption: '' }); continue; }
    const h46 = trimmed.match(/^<h[4-6][^>]*>([\s\S]*?)<\/h[4-6]>/i);
    if (h46) { const t = stripTags(h46[1]).trim(); if (t) blocks.push({ type: 'text', value: t, bold: true, caption: '' }); continue; }
    const quote = trimmed.match(/^<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i);
    if (quote) { const t = stripTags(quote[1]).trim(); if (t) blocks.push({ type: 'text', value: `\u300C${t}\u300D`, bold: true, caption: '' }); continue; }
    const p = trimmed.match(/^<p[^>]*>([\s\S]*?)<\/p>/i);
    if (p) {
      const inner = p[1].trim();
      if (!inner || inner.length < 2) continue;
      const withBreaks = inner.replace(/<br\s*\/?>/gi, '\n');
      const cleaned = stripTags(withBreaks).trim();
      if (cleaned && cleaned.length >= 3 && !cleaned.match(/^(magazine|looom people|magazine 雜誌)$/i)) {
        blocks.push({ type: 'text', value: cleaned, bold: false, caption: '' });
      }
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

run();
