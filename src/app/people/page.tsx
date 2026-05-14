"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const fallbackArticles = [
  {
    slug: "gaute",
    tag: "Looom People / Tailoring",
    title: "經營事業，你把什麼擺在第一位？「美感和扎實的品味，比出名重要」— 專訪西服訂製品牌 GAUTE 創辦人",
    desc: "專訪西服訂製品牌 GAUTE 創辦人：探索工藝與現代裁縫中追求永恆美學的交匯點。",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/09/%E5%AE%98%E7%B6%B2%E5%9C%96%E6%96%87%E5%BE%8C%E8%A3%BD.jpg",
  },
  {
    slug: "eme-skincare",
    tag: "Looom People / Skincare",
    title: "你買到的是產品，或只是工業產物？「其實，做品牌從來無法求快」— 專訪 EME Skincare 創辦人 Zoey Fang",
    desc: "EME Skincare 創辦人 Zoey Fang：對 Zoey 來說，深度且有質量的關係勝過於大量的人流。",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/07/IMG_7628.jpg",
  },
  {
    slug: "dan-retro",
    tag: "Looom People / Furniture",
    title: "「做品牌，你就是要熬得住啊。」— 專訪家居品牌 Dan Retro & Furniture 主理人 Dan",
    desc: "專訪家居品牌 Dan Retro & Furniture：堅持非市場主流的選品，走一條不簡單但正確的路。",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/IMG_7170.jpg",
  },
  {
    slug: "yangi",
    tag: "Looom People / Fashion",
    title: "做品牌，要怎麼撐下去還不背叛自己？「最難的不是創作，而是平衡。」— 專訪男裝品牌 YANGI 主理人楊艾倫",
    desc: "專訪男裝品牌 YANGI 主理人楊艾倫：在商業與自我表達之間尋求平衡，重新定義男裝風格。",
    image: "https://i0.wp.com/theartpressasia.com/wp-content/uploads/2025/06/%E5%81%9A%E5%93%81%E7%89%8C%EF%BC%8C%E8%A6%81%E6%80%8E%E9%BA%BC%E6%92%90%E4%B8%8B%E5%8E%BB%E9%82%84%E4%B8%8D%E8%83%8C%E5%8F%9B%E8%87%AA%E5%B7%B1%EF%BC%9F%E3%80%8C%E6%9C%80%E9%9B%A3%E7%9A%84%E4%B8%8D%E6%98%AF%E5%89%B5%E4%BD%9C%EF%BC%8C%E8%80%8C%E6%98%AF%E5%B9%B3%E8%A1%A1%E3%80%82%E3%80%8D%E5%B0%88%E8%A8%AA%E7%94%B7%E8%A3%9D%E5%93%81%E7%89%8CYANGI%E4%B8%BB%E7%90%86%E4%BA%BA%E6%A5%8A%E8%89%BE%E5%80%AB.png",
  }
];

export default function PeoplePage() {
  const [articles, setArticles] = useState<any[]>(fallbackArticles);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const { data } = await supabase.from('articles').select('*').eq('status', 'published').eq('category', 'people').order('created_at', { ascending: false });
        if (data && data.length > 0) {
          setArticles(data.map(item => ({
            slug: item.slug,
            tag: item.tag,
            title: item.title,
            desc: item.subtitle || "Exploring the intersection of craft, patience, and aesthetics.",
            image: item.image
          })));
        }
      } catch (error) {
        console.error('Supabase fetch failed, falling back to local data');
      }
    }
    fetchArticles();
  }, []);

  return (
    <main className="people-page" style={{ backgroundColor: '#FFF', minHeight: '100vh', paddingBottom: '140px' }}>
      
      {/* HEADER SECTION: Clean & Airy */}
      <section className="container" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="caps-label" style={{ color: 'var(--accent)', fontWeight: 600 }}>Curated Interviews</span>
          <h1 className="serif" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: '1', marginTop: '1.5rem', fontWeight: 500 }}>
            Looom People
          </h1>
          <p className="serif" style={{ fontSize: '1.4rem', color: '#666', marginTop: '2rem', maxWidth: '600px', fontStyle: 'italic', opacity: 0.8 }}>
            Exploring the intersection of craft, patience, and aesthetics in modern business.
          </p>
        </motion.div>
      </section>

      {/* ARTICLE GRID: Synchronized with Homepage Standards */}
      <section className="container">
        <div className="editorial-grid">
          {articles.map((article, index) => (
            <motion.a 
              key={article.slug}
              href={`/people/${article.slug}`} 
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ y: -10 }}
            >
              <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', marginBottom: '2.5rem' }}>
                <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span className="caps-label">{article.tag}</span>
              <h3 className="serif" style={{ fontSize: '1.8rem', margin: '1.5rem 0', lineHeight: '1.3', fontWeight: 500 }}>
                {article.title}
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>{article.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>

    </main>
  );
}
