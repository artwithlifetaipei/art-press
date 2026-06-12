
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
  {
    "type": "text",
    "value": "不論是創作或是做品牌，對你來說，絕對不能妥協的是什麼？",
    "bold": false,
    "caption": ""
  },
  {
    "type": "text",
    "value": "被時尚媒體與眾人稱為「新時代潮流 ICON」、「潮流金童」的楊艾倫（Allen Yang），除了各大品牌邀約合作之外，不久前，他更是少數受邀出席巴黎時裝周 LOUIS VUITTON 男裝秀的一員。在潮流與時裝領域的多年累積，這些底蘊，再加上他自小對服飾真實的愛，他創立了名為 YANGI 的獨立品牌。然而，也正因為他對時尚和服裝產業有著極深且赤裸的了解，他在品牌策略上的抉擇，也顯得更加不容易。",
    "bold": false,
    "caption": ""
  },
  {
    "type": "text",
    "value": "「你明明知道什麼會紅、什麼會有流量，但你有沒有辦法偏不做那些東西？」楊艾倫說道。",
    "bold": true,
    "caption": ""
  },
  {
    "type": "image",
    "value": "https://i0.wp.com/tapeverythingcom.wpcomstaging.com/wp-content/uploads/2025/06/IMG_13C67A7F4BB0-1-e1749187985416-499x740.jpeg?resize=499%2C740&ssl=1",
    "bold": false,
    "caption": ""
  },
  {
    "type": "text",
    "value": "「最難的不是創作，而是平衡。有時候你會懷疑：我要捨棄那個理想去迎合市場嗎？還是先活下來、賺錢再說？」楊艾倫說。",
    "bold": true,
    "caption": ""
  },
  {
    "type": "text",
    "value": "顯然地，潮流人們精神裡的 cool kids 是必須精神與行動合一地，在各個角落展現態度的。 「 其實我在這條路上，並沒有太多轉捩點，反而是要在路途中去排除掉很多的雜音，才能一直處在自己希望的樣子。」",
    "bold": false,
    "caption": ""
  },
  {
    "type": "text",
    "value": "許多人可能難以想像楊艾倫喜歡服裝、鍾愛創作有多久了。這對他來說，並不是隨著在潮流與時裝領域累積直到有了今天的底蘊後才想做的事。從小家裡便有著美術環境的楊艾倫，在求學階段時，一次因為自己畫的東西「過於狂放不羈」，而被訓導主任罰了。「 我還記得當時美術老師到訓導處跟主任說『你不能罰他，因為你這樣子罰他，可能會抹滅一個學生的藝術心。』我被這美術老師救出來，我就沒有再繼續罰。」",
    "bold": false,
    "caption": ""
  },
  {
    "type": "image",
    "value": "https://i0.wp.com/tapeverythingcom.wpcomstaging.com/wp-content/uploads/2025/06/IMG_7151.jpg?resize=596%2C740&ssl=1",
    "bold": false,
    "caption": "Photo via YANGI and 楊艾倫 Allen Yang"
  },
  {
    "type": "text",
    "value": "「 消費者的每一次選擇，都在形塑這整個社會跟這整個群體。」楊艾倫語重心長地，敘述著台灣服裝產業的種種過往與現況。",
    "bold": false,
    "caption": ""
  },
  {
    "type": "text",
    "value": "他坦誠地認為，身為消費者的我們，是最快樂但同時也是責任最大的。身為消費者，排除買或不買，我們都不需要去苦苦抉擇這一季要不要隨著流行發表什麼風格的衣服，只需要觀賞並體驗品牌們的作品；然而，眾所皆知地，消費者也肩負著整體環境與產業未來的重責大任。",
    "bold": false,
    "caption": ""
  },
  {
    "type": "text",
    "value": "「台灣的服裝產業就是長這個樣子。每一個藝術家、或是從無到有創造出東西的人，一定會經歷過例如『為什麼這個世界或是受眾沒辦法接受我的東西』等的心路歷程。」楊艾倫的語重心長裡，同時也帶著對台灣男裝產業的深深瞭解與觀察。從產業裡互相比便宜的惡性競爭、到抄襲也無仿的風氣，相信許多同為服裝產業的同業都能共感這樣的無奈。「像做品牌，我當然也可以去任何一個工廠，做一件便宜很多的 T-shirt 賣給你，但我為什麼要用更好的布料、更細的剪裁，更好的呈現方式去做。因為這樣做，這個產業才會有多一個不一樣的選擇出來。不然就都一樣在比便宜。」楊艾倫說。",
    "bold": false,
    "caption": ""
  },
  {
    "type": "image",
    "value": "https://i0.wp.com/tapeverythingcom.wpcomstaging.com/wp-content/uploads/2025/06/%E6%9C%AA%E5%91%BD%E5%90%8D%E8%A8%AD%E8%A8%88-7.png?resize=740%2C416&ssl=1",
    "bold": false,
    "caption": "Photo via YANGI and 楊艾倫 Allen Yang"
  },
  {
    "type": "text",
    "value": "「做品牌這一塊最辛苦的。就是你會對台灣服裝產業的現況很有想法，可是一個人的力量，其實很難去改變整個產業，甚至幾乎是不可能。」楊艾倫說。",
    "bold": true,
    "caption": ""
  },
  {
    "type": "text",
    "value": "相信無論是品牌主理人或是消費者都能理解，「便宜」的東西，消費者決策起來確實是比較沒有壓力，例如萬一發現買錯了、或是過幾天發現這件衣服只是一時衝動所以買了時，損失的成本會比較少。「但如果貴一點點，但是可以穿比較久而不是過一年或甚至是一季就不會再穿了呢？這背後的成本是不是也會被 balance 掉？」",
    "bold": false,
    "caption": ""
  },
  {
    "type": "text",
    "value": "楊艾倫帶領我們思考一個情境：假設一件貴3000但可以穿20次的衣服，對比便宜3000塊但只穿3次的衣服；抑或是，大家覺得790的衣服比較買得下去而不選擇一件4000的，但累計起來花費卻是一樣時…。這些問題若是你，你會如何思考？然而，其實這些問題的背後，並沒有所謂的標準答案。",
    "bold": false,
    "caption": ""
  },
  {
    "type": "image",
    "value": "https://i0.wp.com/tapeverythingcom.wpcomstaging.com/wp-content/uploads/2025/06/%E6%9C%AA%E5%91%BD%E5%90%8D%E8%A8%AD%E8%A8%88-9.png?resize=740%2C416&ssl=1",
    "bold": false,
    "caption": "除了選材用料與做工之外，服裝輔料細節選擇也十足用心。Photo via YANGI and 楊艾倫 Allen Yang"
  },
  {
    "type": "text",
    "value": "楊艾倫真心希望探討的，並不是「便宜一定沒好貨」、或是「貴的一定比較好」，而是希望消費者如果可以在生活中實踐著「有意識的識別」、「有意識的選擇或不選擇」，就算發現決策錯了，也還是可以從中學到一些東西，這會讓自己日後在買衣服時便會更有想法，而當越穿越有想法時，也就能越穿越好看。",
    "bold": false,
    "caption": ""
  },
  {
    "type": "text",
    "value": "「如果很多事情真的要進步的話，是需要我們每一個人都多多思考一點點這些事情，而不是就覺得便宜就好。」楊艾倫說道。",
    "bold": false,
    "caption": ""
  },
  {
    "type": "text",
    "value": "想像一個美好的服裝品牌產業與零售環境：當消費者是何等地有意識，品牌主理人們也是何等地認真開創設計、每一季都讓消費者們的眼睛與靈魂都充滿收穫、也因處在杜絕抄襲的良性競爭環境而越來越有國際競爭力…。而不是市場時而對便宜且充滿複製的服飾充滿謾罵，但卻不時依然「不得不」選擇「便宜」；而當市場上也始終充斥著差不多的產品，最後逼的品牌主理人們說出「不敢賣太貴」的無奈之語，抑或是身為消費者眾人，對這樣的服裝市場感到無趣。",
    "bold": false,
    "caption": ""
  },
  {
    "type": "image",
    "value": "https://i0.wp.com/tapeverythingcom.wpcomstaging.com/wp-content/uploads/2025/06/IMG_7146-1.jpg?resize=599%2C740&ssl=1",
    "bold": false,
    "caption": "Photo via YANGI and 楊艾倫 Allen Yang"
  },
  {
    "type": "text",
    "value": "任何時候，創造改變，都是一件困難的事。",
    "bold": false,
    "caption": ""
  },
  {
    "type": "text",
    "value": "然而，對楊艾倫來說，服裝產業跟多數事情一樣，倘若只希望眼前「好」就好，而不管以後整個環境怎麼樣的話，那對不管是品牌主理人，還是消費者自己來說，這個心態恐怕都會讓我們每一個人走到無路可走。",
    "bold": false,
    "caption": ""
  },
  {
    "type": "text",
    "value": "YANGI ｜@yangi.official",
    "bold": false,
    "caption": ""
  },
  {
    "type": "text",
    "value": "2024年，由 Pharrell Williams 打造的服飾品牌 Billionaire Boys Club 以旗下支線 ICECREAM 攜手台灣服裝品牌 YANGI 推出聯名系列，帶來多款讓人驚艷的單品。而在今年2025年，服裝品牌 YANGI 也與國際時尚配件品牌 CASETiFY 首次合作，融合了水洗布料質感、汽車復古元素和多彩潑漆視覺呈現聯名作。",
    "bold": false,
    "caption": ""
  },
  {
    "type": "text",
    "value": "在過去，台灣有許多傳統形式的社群，但 Looom Club 與這些傳統精英社群不同。",
    "bold": false,
    "caption": ""
  },
  {
    "type": "text",
    "value": "Looom Club 適合擁有自身事業的主理人與企業高階經理人，能在有限的時間裡高效率交流。透過入會篩選流程，讓大家在專注事業發展的同時，也能結識正在努力前進的新朋友。申請加入，點擊這裡。",
    "bold": false,
    "caption": ""
  }
];

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
