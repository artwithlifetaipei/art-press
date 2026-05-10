"use client";

import { motion } from "framer-motion";

const peopleArticles = [
  {
    slug: "gaute",
    tag: "Looom People / Tailoring",
    title: "經營事業，你把什麼擺在第一位？「美感和扎實的品味，比出名重要」",
    desc: "專訪西服訂製品牌 GAUTE 創辦人：在電商與網路行銷強勢發展的時代，品牌創辦人要如何拒絕短期利益的誘惑？",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/09/%E5%AE%98%E7%B6%B2%E5%9C%96%E6%96%87%E5%BE%8C%E8%A3%BD.jpg",
  },
  {
    slug: "eme-skincare",
    tag: "Looom People / Skincare",
    title: "你買到的是產品，或只是工業產物？「其實，做品牌從來無法求快」",
    desc: "EME Skincare 創辦人 Zoey Fang：對 Zoey 來說，深度且有質量的關係勝過於大量的人流。",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/07/IMG_7628.jpg",
  },
  {
    slug: "dan-retro",
    tag: "Looom People / Furniture",
    title: "「做品牌，你就是要熬得住啊。」",
    desc: "專訪家居品牌 Dan Retro & Furniture 主理人：創造一個品牌就像拓荒，在看不見路的時候堅持前行。",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/IMG_7170.jpg",
  },
  {
    slug: "yangi",
    tag: "Looom People / Fashion",
    title: "做品牌，要怎麼撐下去還不背叛自己？「最難的不是創作，而是平衡。」",
    desc: "專訪男裝品牌 YANGI 主理人楊艾倫：一個人的力量很難改變產業，但在平衡中尋求品牌的生存之道。",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/%E5%81%9A%E5%93%81%E7%89%8C%EF%BC%8C%E8%A6%81%E6%80%8E%E9%BA%BC%E6%92%90%E4%B8%8B%E5%8E%BB%E9%82%84%E4%B8%8D%E8%83%8C%E5%8F%9B%E8%87%AA%E5%B7%B1%EF%BC%9F%E3%80%8C%E6%9C%80%E9%9B%A3%E7%9A%84%E4%B8%8D%E6%98%AF%E5%89%B5%E4%BD%9C%EF%BC%8C%E8%80%8C%E6%98%AF%E5%B9%B3%E8%A1%A1%E3%80%82%E3%80%8D%E5%B0%88%E8%A8%AA%E7%94%B7%E8%A3%9D%E5%93%81%E7%89%8CYANGI%E4%B8%BB%E7%90%86%E4%BA%BA%E6%A5%8A%E8%89%BE%E5%80%AB.png",
  }
];

export default function PeoplePage() {
  return (
    <main className="people-page" style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh', paddingBottom: '10rem' }}>
      <section className="pola-list-section container" style={{ paddingTop: '8rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '6rem' }}
        >
          <span className="article-tag" style={{ color: '#888', marginBottom: '1.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.8rem', display: 'block' }}>
            Interviews & Stories
          </span>
          <h1 className="serif" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '2rem' }}>
            Looom People
          </h1>
        </motion.div>

        <div className="pola-list-container">
          {peopleArticles.map((article, index) => (
            <motion.a 
              key={article.slug}
              href={`/people/${article.slug}`} 
              className="pola-list-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="pola-list-content">
                <span className="pola-list-tag">{article.tag}</span>
                <h3 className="pola-list-title">{article.title}</h3>
                <p className="pola-list-desc">{article.desc}</p>
              </div>
              <div className="pola-list-image-wrap">
                <img src={article.image} alt={article.title} className="pola-list-image" />
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </main>
  );
}
