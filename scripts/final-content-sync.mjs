
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ndykxwqdhgffnldpfoiw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5keWt4d3FkaGdmZm5sZHBmb2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTkxMTAsImV4cCI6MjA5NDIzNTExMH0.hPoot7WIdklyBZHNz8q10OIlcXnv40W58sEixybpZF8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const GAUTE_CONTENT = [
  { type: 'text', value: "「若要選擇跟市場妥協，我可能會選擇不做。」", bold: true },
  { type: 'text', value: "對 GAUTE 的兩位創辦人來說，會選擇「訂製」的人，底層的思維邏輯本來就會比較與眾不同，儘管當前的消費環境裡充滿著各式各樣鼓勵快速消費的情境，假使因焦慮於市場大環境的節奏，而改變品牌的做法，那豈不是本末倒置？" },
  { type: 'text', value: "換言之，與其形容 GAUTE 的「訂製」為高級，不如說他們充滿扎實的品味，也因此能為特別在意美感的顧客們，根據品味與美感經驗，從裡到外的量身打造，去找出「真正適合」自己的訂製服，對他們來說，這才是「訂製」，而非只是盲從追逐流行，更不是執行了單純物理上的尺寸丈量。「這樣的人，他有足夠的 sense 或是一定程度的鑑賞力，所以他們通常都會知道他知道我們在幹嘛。」" },
  { type: 'subheading', value: "1. 經營品牌，為什麼 GAUTE 並不希望顧客衝動消費？" },
  { type: 'text', value: "「我們並不期待透過強烈的言語去刺激客人消費，或是創造衝動購物。」作為 Loro Piana 指定合作的台灣西服店之一，GAUTE 給顧客的「精緻」，並非只是提供物理上最昂貴的接待，而是無可取代、從裡到外地：<b>為顧客花時間。</b>" },
  { type: 'text', value: "對 GAUTE 的兩位創辦人 Lawson 和 Lee 來說，比起「快狠準」地在短時間內闡述產品用料有多高級，更不是，最重要的，是花時間了解顧客。也因此，從顧客走進門店的第一刻開始，少說至少兩個小時的時間。「唯有更理解他，幫他設定出真的很適合他的東西。」" },
  { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/09/11.jpg?resize=740%2C458&ssl=1", caption: "Courtesy of GAUTE" },
  { type: 'text', value: "哪一個品牌不需要行銷？而電商與網路行銷強勢發展的時代，品牌創辦人要如何拒絕短期利益的誘惑？其實，GAUTE 兩位創辦人並不是不理解網路行銷、短影音是如何風行且高效；從事服裝多年，他們也知曉如果快速簡短地告訴顧客什麼才是「最好」，再加上手上握有世界頂尖的供應商，銷量肯定斐然。「其實，我們並不會希望，客人看到我們在網路上發出一張圖片，客人就馬上說我好想要這件，我相信有些品牌也會有同樣的心境。」" },
  { type: 'text', value: "GAUTE 期待的是，顧客可以收穫的不僅只是一套高質量的西服，還可以體會到，懷有品味的快樂與愉悅。而這樣的愉悅，總是必須從了解自己開始。" },
  { type: 'subheading', value: "2. 經營品牌事業，名氣重要嗎？" },
  { type: 'text', value: "<b>「新的客人這件事情，不是人多就好，而是要對的人。」</b>", bold: true },
  { type: 'text', value: "聳動的標題、強調奇效或名人穿著地與品牌強力連結在一起，以鋪天蓋地的名氣讓眾人都知曉，可想而知地對銷售成績肯定有很大的助益吧？但是，對 GAUTE 來說，除此之外還不夠。「我們其實不太會在網上下很誇張的標題或是文字，我們當然會盡可能透過文字和影像表達自己，但是我們不會說你穿這個就會變得怎麼樣，或者說這個誰誰誰也有什麼的。」" },
  { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/09/10-2.jpg?w=426&h=639&ssl=1", caption: "Courtesy of GAUTE" },
  { type: 'text', value: "其實，GAUTE 有著眾多名人顧客，除了國際間當紅的演員許光漢之外，甚至連 Kobe Bryant 都曾經是他們品牌的顧客。顯然地，相比快速湧進的人潮與衝動消費，GAUTE 更希望與理解品味之所以珍貴的顧客相遇，並最高規格地給他充分的理解作為接待，像這樣的品牌，培養目標客群與高黏著度才是品牌長久經營且日漸成長的關鍵之一。「我們不會說只是盤算著，舉辦單一一場活動現場能為我帶來多少單，我們從來不會這樣去思考。」" },
  { type: 'subheading', value: "3. 所謂的訂製是？訂製店就必須情緒價值給滿？" },
  { type: 'text', value: "<b>「越真的東西，走越久。」</b>", bold: true },
  { type: 'text', value: "什麼是訂製？正如前述所說地，對 GAUTE 來說所謂的「訂製」，是給客人真正適合的東西，而不只是給他情緒價值，這也是為什麼 GAUTE 既不挑人、也所沒有一個所謂的「固定的樣式」。除此之外，在用料方面，西裝「布料客製化」也是 GAUTE 品牌的一大特質，GAUTE 不論是全訂製或半訂製，所有的布料皆來自海外。「Loro Piana 是我們最重要的布料合作夥伴，要找 Loro Piana 的布料，我們絕對是台灣最齊全的。」" },
  { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/09/7-1.jpg?w=426&h=639&ssl=1", caption: "Courtesy of GAUTE" },
  { type: 'text', value: "「我們所發佈的文字，常常像詩一樣。」如果一昧地透過聳動、快速的短影音等方式，則會變成一種利用言語刺激消費者產生衝動購物，這本質上只是在販售「情緒價值」，而非讓顧客親身體會到懷有一身品味的愉悅，GAUTE 不願意讓客人陷入那種乍看快速滿足、但其實永遠飢餓的消費模式。" },
  { type: 'text', value: "每一個從零到有的事業，都是充滿艱辛的。" },
  { type: 'text', value: "在過去，包含 GAUTE 門店還位於台中的時期，兩位創辦人走訪了無數的地方去做關於品味與紳裝風格的演講，犧牲了快速賺錢的機會，專注於透過極高的品質、高度重視品味與美的獨家服務，以及對消費者的尊重，來建立深度和品牌忠誠度，並且相信這樣才能讓事業走得更長久。" },
  { type: 'text', value: "「在年度服裝界盛會 Pitti Uomo 中，除了與國際間的既有夥伴再次聚首交流以外，更讓我們感到興奮的是，能夠藉由這個機會發掘產業中各式各樣的新穎發展，結識新的合作品牌夥伴並將它們帶回台灣，讓大家第一時間接收到最新的國際視野。」這是近期一則來自 GAUTE 發佈在社群平台上的文字，傳遞著品牌價值觀外，也傳遞著希望與顧客們一同積累品味的期待。" },
  { type: 'text', value: "回過頭來，GAUTE 的兩位創辦人 Lawson 和 Lee 很高興能把兩個人的價值觀化作一個品牌，這麼一來，這樣的價值觀既是有脈絡，又能夠在未來將其規模化。經營品牌，不畏懼長遠發展，他們始終確定自己要做的是一個長久的品牌，而不是追求快速的回報。" }
];

const EME_CONTENT = [
  { type: 'text', value: "「其實，現在的消費者，是更耳聰目明的了。」Zoey Fang 說道。", bold: true },
  { type: 'text', value: "做品牌長達十多年的 Zoey ，在訂製、女裝、甚至到美妝保養等，她親身經歷過一波又一波的風潮追趕，更清楚台灣市場的眾多難解問題。" },
  { type: 'text', value: "早期將店面設在東區、甚至拓展門市到百貨中，而如今，對 Zoey 來說，深度且有質量的關係勝過於大量的人流。回憶起那個時期，Zoey 說當時百貨櫃位的人流極大，雖然業績顯著，但也讓她反思：這真的是她想要的品牌經營方式嗎？" },
  { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/IMG_7641.jpg?resize=740%2C493&ssl=1", caption: "Photo via Zoey Fang" },
  { type: 'subheading', value: "1. 擁有流量就代表成功嗎？" },
  { type: 'text', value: "Zoey 她認為現在的消費者很聰明，早已不是觀眾單純相信代言的時代，因此她更重視產品的品質與實際體驗。<b>「重點是你的品質要好，客人才不會離開。」</b>" },
  { type: 'text', value: "「很多人會追求爆紅，或是瞬間的流量。但流量就像潮水，來得快去得也快。」EME Skincare 的核心在於提供真正有效的護膚方案，而不是利用工業化的大量生產與廣告去填補消費者的焦慮。" },
  { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/IMG_7627.jpg?resize=493%2C740&ssl=1", caption: "Photo via EME Skincare and Zoey Fang" },
  { type: 'subheading', value: "2. 網路時代的溝通" },
  { type: 'text', value: "好好地讓眼前的顧客理解到產品背後的價值，且與市面上許多產品都不同時時，顧客自然不會那麼容易陷入一昧的比價狀態了。<b>「有時，捕捉到的一抹陽光，乍看之下是條遠路，但其實是最好的路。」</b>" },
  { type: 'text', value: "Zoey 相信，做品牌是一個漫長的旅程。在這個過程中，她堅持不使用過多的化學添加物，而是選擇更高成本、但對皮膚更友善的天然成分。這種「慢」在當前的工業體系中顯得格格不入，但卻是她保護品牌靈魂的方式。" }
];

const DAN_CONTENT = [
  { type: 'text', value: "「你確定你要做嗎？你如果只想要成功，不想要付出代價的話，那你可能先不要做。」Dan 說道。", bold: true },
  { type: 'text', value: "「做品牌，它可能其實是眼前根本不知道有沒有路。創造出一個品牌，就像是拓荒。」對於 Dan 來說，Dan Retro & Furniture 不僅僅是一間傢俱店，更是他對於生活美學的一種堅持。" },
  { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/IMG_7162.jpg?resize=740%2C731&ssl=1", caption: "Photo via Dan Retro & Furniture" },
  { type: 'text', value: "<b>「 當我決定了，我沒有要賣現在傢俱市場上好賣的東西時，就也要知道這條路不會太容易。」Dan 說。</b>", bold: true },
  { type: 'text', value: "在當前的傢俱市場中，大多數人追求的是快速、低價且符合大眾潮流的產品。但 Dan 選擇了另一條路：引進那些具有設計靈魂、甚至有些冷門但充滿故事的經典作品。他深知這需要時間去教育市場，也需要極大的心理韌性去面對業績的起伏。" },
  { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/IMG_7169.jpg?resize=740%2C730&ssl=1", caption: "Photo via Dan Retro & Furniture" },
  { type: 'text', value: "<b>「如果，前方的路很暗，你必須要為你自己點亮屬於你自己的燈。」</b>", bold: true },
  { type: 'text', value: "這盞燈，就是對於品質的執著，以及對於美學不妥協的勇氣。Dan 認為，品牌的核心認在於主理人的性格。如果你熬不住寂寞，那麼你的品牌也會隨波逐流。" }
];

const YANGI_CONTENT = [
  { type: 'text', value: "不論是創作或是做品牌，對你來說，絕對不能妥協的是什麼？", bold: true },
  { type: 'text', value: "「做品牌這一塊最辛苦的。就是你會對台灣服裝產業的現況很有想法，可是一個人的力量，其實很難去改變整個產業，甚至幾乎是不可能。」楊艾倫說。" },
  { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/IMG_13C67A7F4BB0-1-e1749187985416-499x740.jpeg?resize=499%2C740&ssl=1", caption: "Photo via YANGI and Allen Yang" },
  { type: 'text', value: "<b>「最難的不是創作，而是平衡。有時候你會懷疑：我要捨棄那個理想去迎合市場嗎？」</b>", bold: true },
  { type: 'text', value: "Allen 坦言，在台灣經營男裝品牌充滿挑戰。市場規模小、消費者對於原創設計的接受度尚在培養中，這讓他必須在「極致的自我表達」與「商業上的生存」之間不斷拉鋸。但他認為，這種拉鋸正是品牌成形的必經之路。" },
  { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/IMG_7151.jpg?resize=596%2C740&ssl=1", caption: "Photo via YANGI and Allen Yang" },
  { type: 'text', value: "「如果你完全不聽市場的，那你可能會很快消失；但如果你完全迎合市場，那你就不是你原本想做的那個品牌了。」YANGI 的存在，就是為了證明在這種平衡中，依然可以創造出具有力量且不失風格的作品。" }
];

const run = async () => {
  const updates = [
    { slug: 'gaute', content: GAUTE_CONTENT },
    { slug: 'yangi', content: YANGI_CONTENT },
    { slug: 'eme-skincare', content: EME_CONTENT },
    { slug: 'dan-retro', content: DAN_CONTENT }
  ];

  for (const u of updates) {
    const { error } = await supabase.from('articles').update({ 
      content: u.content,
      category: 'people',
      status: 'published'
    }).eq('slug', u.slug);
    
    if (error) console.error(`❌ Failed ${u.slug}:`, error.message);
    else console.log(`✅ Success: ${u.slug}`);
  }
};

run();
