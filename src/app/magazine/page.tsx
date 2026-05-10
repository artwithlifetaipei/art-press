"use client";

import { motion } from "framer-motion";

const magazineArticles = [
  {
    slug: "patricia-dominguez",
    tag: "Magazine / Feature",
    title: "「再教育是我尋求尊重的途徑」 — 專訪智利藝術家 Patricia Domínguez",
    desc: "在數位時代與安地斯山脈智慧之間，探討藝術如何轉譯生態意識與權力結構。",
    image: "/hero.png",
  },
  {
    slug: "gaute",
    tag: "Magazine / Tailoring",
    title: "經營事業，你把什麼擺在第一位？「美感和扎實的品味，比出名重要」",
    desc: "專訪西服訂製品牌 GAUTE 創辦人：拒絕短期利益，追求訂製服中的永恆美學。",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/09/%E5%AE%98%E7%B6%B2%E5%9C%96%E6%96%87%E5%BE%8C%E8%A3%BD.jpg",
  },
  {
    slug: "yangi",
    tag: "Magazine / Fashion",
    title: "做品牌，要怎麼撐下去還不背叛自己？「最難的不是創作，而是平衡。」",
    desc: "專訪男裝品牌 YANGI 主理人楊艾倫：在服裝產業現況中尋找個人價值的生存空間。",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/%E5%81%9A%E5%93%81%E7%89%8C%EF%BC%8C%E8%A6%81%E6%80%8E%E9%BA%BC%E6%92%90%E4%B8%8B%E5%8E%BB%E9%82%84%E4%B8%8D%E8%83%8C%E5%8F%9B%E8%87%AA%E5%B7%B1%EF%BC%9F%E3%80%8C%E6%9C%80%E9%9B%A3%E7%9A%84%E4%B8%8D%E6%98%AF%E5%89%B5%E4%BD%9C%EF%BC%8C%E8%80%8C%E6%98%AF%E5%B9%B3%E8%A1%A1%E3%80%82%E3%80%8D%E5%B0%88%E8%A8%AA%E7%94%B7%E8%A3%9D%E5%93%81%E7%89%8CYANGI%E4%B8%BB%E7%90%86%E4%BA%BA%E6%A5%8A%E8%89%BE%E5%80%AB.png",
  },
  {
    slug: "palm-gallery",
    tag: "Magazine / Art",
    title: "為什麼我們對生活感到無聊？「過度依賴穩定性，讓生活變得僵化」",
    desc: "Palm Gallery 與 9 位藝術家的解域創造：探討藝術如何打破生活的僵局與侷限。",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/01/Rewriting-Territories.jpg?fit=1200%2C800&ssl=1",
  },
  {
    slug: "sun-and-sea",
    tag: "Magazine / Performance",
    title: "摧毀的同時，你我都悠閒地哼著歌：威尼斯雙年展金獅獎歌劇《太陽與海》",
    desc: "於台北表演藝術中心呈現：探討氣候變遷下人類的平庸與無力感。",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2023/08/Sun-and-Sea.jpg?fit=1200%2C800&ssl=1",
  },
  {
    slug: "roni-horn",
    tag: "Magazine / Exhibition",
    title: "關於冰島、文學、和水，大自然是多麽無可限量？藝術家 Roni Horn 首個展",
    desc: "文心藝所呈現：簡潔的視覺語言與對環境、自我認同的詩意探索。",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2023/04/Roni-Horn.jpg?fit=1200%2C800&ssl=1",
  }
];

export default function MagazinePage() {
  return (
    <main className="magazine-page" style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh', paddingBottom: '10rem' }}>
      <section className="pola-list-section container" style={{ paddingTop: '8rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '6rem' }}
        >
          <span className="article-tag" style={{ color: '#888', marginBottom: '1.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.8rem', display: 'block' }}>
            Featured Stories
          </span>
          <h1 className="serif" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '2rem' }}>
            Magazine 雜誌
          </h1>
        </motion.div>

        <div className="pola-list-container">
          {magazineArticles.map((article, index) => (
            <motion.a 
              key={article.slug}
              href={article.slug === 'patricia-dominguez' ? '/article/1' : `/magazine/${article.slug}`} 
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
