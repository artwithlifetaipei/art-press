"use client";

import { motion } from "framer-motion";
import { useParams, notFound } from "next/navigation";

const articleData: Record<string, any> = {
  "1": {
    tag: "Magazine / Feature",
    title: "「再教育是我尋求尊重的途徑，讓我們的土地卸下人類的欲望與規則。」",
    subtitle: "— 專訪智利藝術家 Patricia Domínguez",
    date: "August 26, 2025",
    author: "ART PRESS Editorial",
    image: "/hero.png",
    content: [
      { type: 'text', value: "Patricia Domínguez，獲得第十屆 Marta García-Fajardo 國際藝術獎，她從 Puchuncaví 出發，一片被新自由主義摧毀的土地。" },
      { type: 'text', value: "在這裡，她的創作融合了對資本主義的批判，在這次訪談中，這位智利藝術家細細剖析了她追尋靈性的歷程，並作為對生態危機的回應。" },
      { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/08/Patricia-DominguezGreen-Irises-2019.jpg" },
      { type: 'text', value: "「再教育是我尋求尊重的途徑，讓我們的土地卸下人類的欲望與規則。」她的作品融合了祖先的靈性智慧與對資本主義的批判，也回應了現代的生態危機。" },
      { type: 'text', value: "Art Press：您的創作長期聚焦於植物與土地，並使用陶土與藥草，您是如何看待這些材料在當代框架中的模樣？" },
      { type: 'text', value: "PD：在作品中的核心概念是：如何擴展我的「宇宙感知器」，如何進入與世界的靈性對話，如何解讀大地與植物的語言。這一切「有生命的事物」正因數位化與體制同質化而逐漸消逝，我覺得我有必要去回應並守護。" },
      { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/08/Eyes_of_plants-Q3.jpg" },
      { type: 'text', value: "Art Press：在 Yerbateras 中，像是手、腳和頭髮等身體部位以破碎或肢解的形式出現，這些不完整的形體代表了什麼？" },
      { type: 'text', value: "PD：一方面，我將它們視為一種「資本主義的黑客」，這些零散的消費物件，被重新拼合為「大地女性」形象。而在智利，醫療體系高度私有化，使得就醫成本極為高昂，因此許多人轉而求助於原住民祖傳的植物療法。" },
      { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/08/Madre_drone.jpg" },
      { type: 'text', value: "Art Press：你如何看待在現代中“靈性”的力量？" },
      { type: 'text', value: "PD：我相信我們在當下擁有抵抗的力量，它是關懷、庇護、擁抱並保護生命的能量。我的作品靈感來自我的夢境與冥想。" },
      { type: 'image', value: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/08/PD.png" },
      { type: 'text', value: "Art Press：您與CERN和天文觀測站等科學研究機構合作，這些經驗是否改變了您對感知的方式？" },
      { type: 'text', value: "PD：對我而言，世界本身就是靈性的。科學，只是我們嘗試理解這份神秘的途徑之一。前往 CERN 對我來說，是一場「靈性科幻」的旅程，研究宇宙神秘起源的所在。" }
    ]
  }
};

export default function ArticlePage() {
  const { id } = useParams();
  const article = articleData[id as string];

  if (!article) return notFound();

  return (
    <main className="article-detail-page">
      {/* SECTION 1: VISUAL AT THE TOP (Full contained viewport) */}
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
            <h1 className="article-main-title" style={{ fontSize: '2rem', maxWidth: '800px', margin: '0 auto 0.5rem' }}>
              {article.title}
            </h1>
            {article.subtitle && (
              <h2 className="article-subtitle" style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2.5rem', fontWeight: '400' }}>
                {article.subtitle}
              </h2>
            )}
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
        <a href="/" className="nav-item-btn">
          <span className="nav-label">BACK TO</span>
          <span className="nav-title">Homepage</span>
        </a>
      </nav>
    </main>
  );
}
