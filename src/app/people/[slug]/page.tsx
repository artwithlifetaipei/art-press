"use client";

import { motion } from "framer-motion";
import { useParams, notFound } from "next/navigation";

const articleData: Record<string, any> = {
  "gaute": {
    tag: "Looom People / Tailoring",
    title: "經營事業，你把什麼擺在第一位？「美感和扎實的品味，比出名重要」",
    date: "September 30, 2025",
    author: "ART PRESS Editorial",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/09/%E5%AE%98%E7%B6%B2%E5%9C%96%E6%96%87%E5%BE%8C%E8%A3%BD.jpg",
    content: [
      { type: 'text', value: "「若要選擇跟市場妥協，我可能會選擇不做。」" },
      { type: 'text', value: "對 GAUTE 的兩位創辦人來說，會選擇「訂製」的人，底層的思維邏輯本來就會比較與眾不同，儘管當前的消費環境裡充滿著各式各樣鼓勵快速消費的情境，假使因焦慮於市場大環境的節奏，而改變品牌的做法，那豈不是本末倒置？" },
      { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/09/10-2.jpg" },
      { type: 'text', value: "換言之，與其形容 GAUTE 的「訂製」為高級，不如說他們充滿扎實的品味，也因此能為特別在意美感的顧客們，根據品味與美感經驗，從裡到外的量身打造，去找出「真正適合」自己的訂製服。" },
      { type: 'text', value: "1. 經營品牌，為什麼 GAUTE 並不希望顧客衝動消費？" },
      { type: 'text', value: "「我們並不期待透過強烈的言語去刺激客人消費，或是創造衝動購物。」作為 Loro Piana 指定合作的台灣西服店之一，GAUTE 給顧客的「精緻」，並非只是提供物理上最昂貴的接待，而是無可取代、從裡到外地：為顧客花時間。" },
      { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/09/3.jpg" },
      { type: 'text', value: "2. 經營品牌事業，名氣重要嗎？" },
      { type: 'text', value: "「新的客人這件事情，不是人多就好，而是要對的人。」" },
      { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/09/7-1.jpg" },
      { type: 'text', value: "3. 所謂的訂製是？訂製店就必須情緒價值給滿？" },
      { type: 'text', value: "「越真的東西，走越久。」什麼是訂製？正如前述所說地，對 GAUTE 來說所謂的「訂製」，是給客人真正適合的東西，而不只是給他情緒價值。" },
      { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/09/8.jpg" }
    ]
  },
  "eme-skincare": {
    tag: "Looom People / Skincare",
    title: "你買到的是產品，或只是工業產物？「其實，做品牌從來無法求快」",
    date: "July 16, 2025",
    author: "ART PRESS Editorial",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/07/IMG_7628.jpg",
    content: [
      { type: 'text', value: "早期將店面設在東區、甚至拓展門市到百貨中，而如今，對 Zoey 來說，深度且有質量的關係勝過於大量的人流。" },
      { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/07/IMG_7625.jpg" },
      { type: 'text', value: "「其實，做品牌從來無法求快。」EME Skincare 創辦人 Zoey Fang 提到，在追求快速回報的時代，維持品牌的純粹與深度是一場長期的修行。" },
      { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/07/IMG_7632.jpg" },
      { type: 'text', value: "品牌建立不僅僅是銷售，更是一種生活態度的傳遞。" }
    ]
  },
  "dan-retro": {
    tag: "Looom People / Furniture",
    title: "「做品牌，你就是要熬得住啊。」專訪家居品牌 Dan Retro & Furniture 主理人",
    date: "June 7, 2025",
    author: "ART PRESS Editorial",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/IMG_7170.jpg",
    content: [
      { type: 'text', value: "「做品牌，它可能其實是眼前根本不知道有沒有路。創造出一個品牌，就像是拓荒。」Dan 說道。" },
      { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/IMG_7146-1.jpg" },
      { type: 'text', value: "每一個從零到有的事業，都是充滿艱辛的。Dan Retro & Furniture 專注於中古家具的修復與美感重塑，讓老物在現代空間中重獲新生。" },
      { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/IMG_7151.jpg" },
      { type: 'text', value: "熬得住，是因為對美感的偏執與對老件價值的信任。" }
    ]
  },
  "yangi": {
    tag: "Looom People / Fashion",
    title: "做品牌，要怎麼撐下去還不背叛自己？「最難的不是創作，而是平衡。」",
    date: "June 6, 2025",
    author: "ART PRESS Editorial",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/%E5%81%9A%E5%93%81%E7%89%8C%EF%BC%8C%E8%A6%81%E6%80%8E%E9%BA%BC%E6%92%90%E4%B8%8B%E5%8E%BB%E9%82%84%E4%B8%8D%E8%83%8C%E5%8F%9B%E8%87%AA%E5%B7%B1%EF%BC%9F%E3%80%8C%E6%9C%80%E9%9B%A3%E7%9A%84%E4%B8%8D%E6%98%AF%E5%89%B5%E4%BD%9C%EF%BC%8C%E8%80%8C%E6%98%AF%E5%B9%B3%E8%A1%A1%E3%80%82%E3%80%8D%E5%B0%88%E8%A8%AA%E7%94%B7%E8%A3%9D%E5%93%81%E7%89%8CYANGI%E4%B8%BB%E7%90%86%E4%BA%BA%E6%A5%8A%E8%89%BE%E5%80%AB.png",
    content: [
      { type: 'text', value: "「做品牌這一塊最辛苦的。就是你會對台灣服裝產業的現況很有想法，可是一個人的力量，其實很難去改變整個產業，甚至幾乎是不可能。」楊艾倫說。" },
      { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/%E6%9C%AA%E5%91%BD%E5%90%8D%E8%A8%AD%E8%A8%88-7.png" },
      { type: 'text', value: "作為男裝品牌 YANGI 的主理人，他在商業市場的現實與服裝創作的理想之間不斷尋求平衡點。" },
      { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/%E6%9C%AA%E5%91%BD%E5%90%8D%E8%A8%AD%E8%A8%88-9.png" },
      { type: 'text', value: "不背叛自己，意味著在每一個妥協中，都依然保有品牌最核心的靈魂。" }
    ]
  }
};

export default function PeopleArticlePage() {
  const { slug } = useParams();
  const article = articleData[slug as string];

  if (!article) return notFound();

  return (
    <main className="article-detail-page">
      {/* SECTION 1: VISUAL AT THE TOP */}
      <motion.section 
        className="article-visual"
        style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '2rem', marginBottom: '2rem', aspectRatio: '16/7', overflow: 'hidden' }}
        initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
        animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      >
        <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.section>

      {/* SECTION 2: HEADER */}
      <section className="article-hero container" style={{ padding: '0 0 4rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="article-tag" style={{ color: '#888', marginBottom: '1rem', fontSize: '0.75rem', display: 'block' }}>{article.tag}</span>
            <h1 className="article-main-title" style={{ fontSize: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
              {article.title}
            </h1>
          </motion.div>

          <motion.div 
            className="article-info-grid"
            style={{ display: 'flex', justifyContent: 'center', gap: '3rem', border: 'none', paddingTop: '0', marginBottom: '4rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="info-item" style={{ gap: '0.8rem' }}>
              <span className="info-label" style={{ width: 'auto', fontSize: '0.65rem' }}>DATE</span>
              <span className="info-value" style={{ fontSize: '0.85rem' }}>{article.date}</span>
            </div>
            <div className="info-item" style={{ gap: '0.8rem' }}>
              <span className="info-label" style={{ width: 'auto', fontSize: '0.65rem' }}>AUTHOR</span>
              <span className="info-value" style={{ fontSize: '0.85rem' }}>{article.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: BODY WITH MIXED CONTENT */}
      <article className="article-body">
        {article.content.map((block: any, i: number) => (
          block.type === 'text' ? (
            <p key={i} style={{ marginBottom: '2rem' }}>{block.value}</p>
          ) : (
            <motion.div 
              key={i} 
              style={{ margin: '4rem 0', width: '100%', overflow: 'hidden' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src={block.value} alt="Internal" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </motion.div>
          )
        ))}
      </article>

      {/* SECTION 4: NAV */}
      <nav className="article-nav container" style={{ maxWidth: '750px', marginTop: '6rem' }}>
        <a href="/people" className="nav-item-btn">
          <span className="nav-label">BACK TO</span>
          <span className="nav-title">Looom People</span>
        </a>
      </nav>
    </main>
  );
}
