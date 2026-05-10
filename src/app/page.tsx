"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="home-page">
      {/* SECTION 1: HERO (Article 1) */}
      <section className="hero-section container">
        <div className="hero-container">
          <motion.div 
            className="hero-image-wrapper"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <a href="/article/1">
              <img src="https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/08/PD-Q3.png" alt="Featured" className="hero-image" />
            </a>
          </motion.div>
          
          <motion.div 
            className="hero-content-overlay"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <a href="/article/1">
              <span className="card-cat">Magazine 雜誌</span>
              <h1 className="hero-title">「再教育是我尋求尊重的途徑」 — 專訪智利藝術家 Patricia Domínguez</h1>
              <p className="hero-desc-text" style={{ color: '#666' }}>
                “Re-education is the way I pursue respect, so that our land may cast off human desires and constraints.”
              </p>
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: LOOOM PEOPLE (Curated to 2 articles to make total 3 on home) */}
      <section className="pola-list-section container">
        <div style={{ paddingBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h2 className="pola-list-title" style={{ fontSize: '1rem', letterSpacing: '0.4em' }}>Looom People</h2>
          <a href="/people" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px' }}>View All</a>
        </div>

        {/* Article 2 - GAUTE */}
        <a href="/people/gaute" className="pola-list-item">
          <div className="pola-list-content">
            <span className="pola-list-tag">Looom People / Interview</span>
            <h3 className="pola-list-title">經營事業，你把什麼擺在第一位？「美感和扎實的品味，比出名重要」</h3>
            <p className="pola-list-desc">
              專訪西服訂製品牌 GAUTE 創辦人：探索工藝、耐心以及在現代裁縫中追求永恆美學的交匯點。
            </p>
          </div>
          <div className="pola-list-image-wrap">
            <img src="https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/09/%E5%AE%98%E7%B6%B2%E5%9C%96%E6%96%87%E5%BE%8C%E8%A3%BD.jpg" alt="Gaute" className="pola-list-image" />
          </div>
        </a>

        {/* Article 3 - Allen Yang */}
        <a href="/people/yangi" className="pola-list-item">
          <div className="pola-list-content">
            <span className="pola-list-tag">Looom People / Brand</span>
            <h3 className="pola-list-title">做品牌，要怎麼撐下去還不背叛自己？「最難的不是創作，而是平衡。」</h3>
            <p className="pola-list-desc">
              專訪男裝品牌 YANGI 主理人楊艾倫：在商業與自我表達之間尋求平衡，重新定義台灣男裝風格。
            </p>
          </div>
          <div className="pola-list-image-wrap">
            <img src="https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/%E5%81%9A%E5%93%81%E7%89%8C%EF%BC%8C%E8%A6%81%E6%80%8E%E9%BA%BC%E6%92%90%E4%B8%8B%E5%8E%BB%E9%82%84%E4%B8%8D%E8%83%8C%E5%8F%9B%E8%87%AA%E5%B7%B1%EF%BC%9F%E3%80%8C%E6%9C%80%E9%9B%A3%E7%9A%84%E4%B8%8D%E6%98%AF%E5%89%B5%E4%BD%9C%EF%BC%8C%E8%80%8C%E6%98%AF%E5%B9%B3%E8%A1%A1%E3%80%82%E3%80%8D%E5%B0%88%E8%A8%AA%E7%94%B7%E8%A3%9D%E5%93%81%E7%89%8CYANGI%E4%B8%BB%E7%90%86%E4%BA%BA%E6%A5%8A%E8%89%BE%E5%80%AB.png" alt="Allen Yang" className="pola-list-image" />
          </div>
        </a>
      </section>
    </div>
  );
}
