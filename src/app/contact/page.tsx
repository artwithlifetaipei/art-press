"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="contact-page" style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh', paddingBottom: '10rem' }}>
      <section className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '8rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="article-tag" style={{ color: '#888', marginBottom: '1.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.8rem', display: 'block' }}>
            Get in touch
          </span>
          <h1 className="serif" style={{ fontSize: '3.5rem', marginBottom: '4rem', lineHeight: '1.1' }}>
            Contact 聯繫
          </h1>

          <div className="contact-content" style={{ fontSize: '1.1rem', lineHeight: '2', color: '#333' }}>
            <p style={{ marginBottom: '2.5rem' }}>
              想要聯絡 ART PRESS 編輯部，您可以發送郵件給 <a href="mailto:news@theartpressasia.com" style={{ textDecoration: 'underline', fontWeight: '600' }}>news@theartpressasia.com</a>。
            </p>
            <p style={{ marginBottom: '4rem' }}>
              無論是藝文類文章投稿、提供關於文化政策、藝文環境之新聞線索、或者有任何想法希望與我們交流皆歡迎。我們會確實閱讀所有的郵件，必要時亦會盡量快地回覆。
            </p>

            <div style={{ borderTop: '1px solid #EEE', paddingTop: '4rem', marginBottom: '4rem' }}>
              <h2 className="serif" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>聯繫方式</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#888', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Media & General</span>
                  <a href="mailto:news@theartpressasia.com" style={{ fontSize: '1.2rem', fontWeight: '500' }}>news@theartpressasia.com</a>
                </li>
                <li style={{ marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#888', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Advertising & Collaboration</span>
                  <a href="mailto:ads@theartpressasia.com" style={{ fontSize: '1.2rem', fontWeight: '500' }}>ads@theartpressasia.com</a>
                </li>
                <li style={{ marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#888', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Media Kit</span>
                  <a href="https://theartpressasia.com/wp-content/uploads/2022/08/ART-PRESS-2022-ONLINE-MAGAZINE.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.1rem', textDecoration: 'underline' }}>
                    ART PRESS - 2022 Online Magazine (PDF)
                  </a>
                </li>
              </ul>
            </div>

            <div style={{ borderTop: '1px solid #EEE', paddingTop: '4rem', marginBottom: '4rem' }}>
              <h2 className="serif" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Office 辦公室</h2>
              <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                台北市大安區大安路一段175巷2號1樓
              </p>
              <p style={{ fontSize: '1rem', color: '#666' }}>
                1F, No. 2, Lane 175, Section 1, Da’an Rd, Da’an District, Taipei City, 106, TAIWAN
              </p>
            </div>

            <div style={{ borderTop: '1px solid #EEE', paddingTop: '4rem' }}>
              <h2 className="serif" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Social 社交網路</h2>
              <p style={{ marginBottom: '2rem' }}>
                如果您更習慣使用 Facebook 或者其它社交網絡，也可以在這些地方找到和關注我們：
              </p>
              <div style={{ display: 'flex', gap: '3rem' }}>
                <a href="https://www.instagram.com/looomasia/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600', borderBottom: '1px solid #000' }}>Instagram</a>
                <a href="https://www.facebook.com/theartpressasia/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600', borderBottom: '1px solid #000' }}>Facebook</a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
