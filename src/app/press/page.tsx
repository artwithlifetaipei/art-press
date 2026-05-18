"use client";

import { motion } from "framer-motion";

export default function PressPage() {
  const pressItems = [
    {
      source: "artnet",
      date: "SEPTEMBER 2025",
      headline: "“In Taipei, a patron group called Looom Club”",
      desc: "Artnet News reports on Looom Club's growing influence on the contemporary art and patron collector ecosystem. The report highlights Taipei's vibrant next-generation cultural patrons, exploring how Looom Club bridges the gap between creative professional leadership and fine arts discourse.",
      url: "https://www.artnet.com",
    },
    {
      source: "ART PRESS Asia",
      date: "OCTOBER 2025",
      headline: "“Looom Club: Crafting a New Visual and Taste Dialect”",
      desc: "An in-depth editorial coverage on how Looom Club's private salons, design dialogs, and multidisciplinary collaborations are redefining cultural leadership and collection paradigms for modern founders.",
      url: "/magazine",
    }
  ];

  return (
    <main style={{ backgroundColor: "#FFF", minHeight: "100vh", paddingTop: "140px", paddingBottom: "140px" }}>
      
      {/* HEADER HERO */}
      <section className="container" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "60px", marginBottom: "80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="caps-label" style={{ color: "var(--accent)", fontWeight: 600 }}>Media & Editorial Coverage</span>
          <h1 className="serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, marginTop: "1.5rem", lineHeight: 1.15 }}>
            媒體報導<br />PRESS COVERAGE
          </h1>
          <p className="serif" style={{ color: "var(--muted)", fontSize: "1.25rem", maxWidth: "600px", marginTop: "2rem", lineHeight: 1.75, fontStyle: "italic" }}>
            Looom Club 與 ART PRESS 備受國際與本地重要藝術媒體關注，透過跨界合作與深刻報導，共同建構當代藝術與生活品味的論述。
          </p>
        </motion.div>
      </section>

      {/* FEATURED PRESS SECTION */}
      <section className="container">
        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {pressItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: "60px",
                borderBottom: "1px solid var(--border)",
                paddingBottom: "80px"
              }}
              className="press-grid-row"
            >
              {/* Left Column: Media Source */}
              <div>
                <span className="caps-label" style={{ color: "var(--accent)", fontWeight: 700, letterSpacing: "0.15em", display: "block", marginBottom: "1rem" }}>
                  {item.date}
                </span>
                <h3 className="serif" style={{ fontSize: "2.4rem", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>
                  {item.source}
                </h3>
              </div>

              {/* Right Column: Content */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h2 className="serif" style={{ fontSize: "2rem", fontWeight: 400, lineHeight: 1.35, marginBottom: "2rem", color: "var(--ink)" }}>
                    {item.headline}
                  </h2>
                  <p className="serif" style={{ color: "#444", fontSize: "1.2rem", lineHeight: 1.85, marginBottom: "3rem" }}>
                    {item.desc}
                  </p>
                </div>
                
                <div>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="club-btn-outline"
                    style={{ padding: "14px 35px", display: "inline-block" }}
                  >
                    Read Article 閱讀報導
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MEDIA KIT & INQUIRIES */}
      <section className="container" style={{ marginTop: "120px" }}>
        <div 
          style={{
            border: "1px solid var(--border)",
            padding: "80px 60px",
            textAlign: "center",
            backgroundColor: "#FAFAFA"
          }}
        >
          <span className="caps-label">Press Contacts</span>
          <h2 className="serif" style={{ fontSize: "2.2rem", fontWeight: 400, marginTop: "1rem", marginBottom: "1.5rem" }}>
            媒體聯絡與合作洽詢
          </h2>
          <p className="serif" style={{ color: "var(--muted)", fontSize: "1.15rem", maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: 1.75 }}>
            若您有採訪撰稿需求、品牌合作提案，或欲索取 Looom Club 與 ART PRESS 官方新聞資料袋（Media Kit），歡迎隨時來信。
          </p>
          <a href="mailto:looom@theartpressasia.com" className="club-btn">
            Contact Press Office 聯繫媒體部
          </a>
        </div>
      </section>

      {/* Responsive layout styles for press-grid-row */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .press-grid-row {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            padding-bottom: 60px !important;
          }
        }
      `}</style>

    </main>
  );
}
