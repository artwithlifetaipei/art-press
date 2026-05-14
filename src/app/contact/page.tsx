"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="contact-page" style={{ backgroundColor: 'var(--canvas)', minHeight: '100vh', paddingBottom: '10rem' }}>
      <section className="container" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '10rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem' }}>
          
          {/* Left Column: Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="sub-title">Connect with us</span>
            <h1 className="serif" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: '1', marginBottom: '2rem' }}>
              Contact <br />
              <span style={{ fontSize: '0.5em', fontStyle: 'italic', color: 'var(--accent)' }}>聯繫</span>
            </h1>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#666', maxWidth: '400px', marginTop: '4rem' }}>
              無論是藝文投稿、新聞線索，或單純的想法交流，我們皆由衷期待與您對話。
            </p>
          </motion.div>

          {/* Right Column: Detailed Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}
          >
            {/* Block 1: Emails */}
            <div className="contact-block">
              <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#AAA', marginBottom: '2rem', borderBottom: '1px solid #EEE', paddingBottom: '1rem' }}>
                Departments
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem', color: '#888' }}>Media & Editorial</span>
                  <a href="mailto:news@theartpressasia.com" style={{ fontSize: '1.5rem', fontWeight: 500, borderBottom: '1px solid var(--ink)' }}>news@theartpressasia.com</a>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem', color: '#888' }}>Partnerships & Ads</span>
                  <a href="mailto:ads@theartpressasia.com" style={{ fontSize: '1.5rem', fontWeight: 500, borderBottom: '1px solid var(--ink)' }}>ads@theartpressasia.com</a>
                </div>
              </div>
            </div>

            {/* Block 2: Location */}
            <div className="contact-block">
              <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#AAA', marginBottom: '2rem', borderBottom: '1px solid #EEE', paddingBottom: '1rem' }}>
                Headquarters
              </h4>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.6', fontWeight: 500 }}>
                台北市大安區大安路一段175巷2號1樓 <br />
                <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 400 }}>1F, No. 2, Lane 175, Sec. 1, Da’an Rd, Taipei</span>
              </p>
            </div>

            {/* Block 3: Social & Press Kit */}
            <div className="contact-block">
              <h4 style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#AAA', marginBottom: '2rem', borderBottom: '1px solid #EEE', paddingBottom: '1rem' }}>
                Resources
              </h4>
              <div style={{ display: 'flex', gap: '3rem' }}>
                <a href="https://www.instagram.com/theartpressasia/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>Instagram</a>
                <a href="https://www.facebook.com/theartpressasia/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>Facebook</a>
                <a href="#" style={{ fontWeight: 600, color: 'var(--accent)' }}>Press Kit 2026</a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
