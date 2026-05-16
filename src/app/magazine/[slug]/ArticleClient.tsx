"use client";

import { motion } from "framer-motion";

export default function ArticleClient({ article }: { article: any }) {
  return (
    <main className="article-detail-v4" style={{ backgroundColor: '#FFF', minHeight: '100vh', paddingBottom: '140px' }}>
      
      {/* HEADER: Authoritative & Balanced */}
      <section className="container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="caps-label" style={{ color: 'var(--accent)', fontWeight: 600 }}>{article.tag || 'Magazine'}</span>
          <h1 className="serif" style={{ fontSize: '3rem', lineHeight: '1.2', margin: '1.5rem 0 2rem', fontWeight: 500, maxWidth: '950px' }}>
            {article.title}
          </h1>
          {article.english_title && (
            <p className="serif" style={{ fontSize: '1.5rem', color: '#555', maxWidth: '750px', fontStyle: 'italic', opacity: 0.8 }}>
              — {article.english_title}
            </p>
          )}
          {article.subtitle && !article.english_title && (
            <p className="serif" style={{ fontSize: '1.5rem', color: '#555', maxWidth: '750px', fontStyle: 'italic', opacity: 0.8 }}>
              — {article.subtitle}
            </p>
          )}
        </motion.div>

        <div className="article-info-flex">
          <div>
            <span className="caps-label">Published</span>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '0.5rem' }}>{article.date}</p>
          </div>
          <div>
            <span className="caps-label">Editorial</span>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '0.5rem' }}>{article.author || 'ART PRESS Editorial'}</p>
          </div>
        </div>
      </section>

      {/* HERO VISUAL */}
      {article.image && (
        <section className="container" style={{ margin: '0 auto 100px' }}>
          <img src={article.image} alt={article.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
          {article.image_caption && (
            <p style={{ fontSize: '13px', color: '#999', textAlign: 'right', marginTop: '1.5rem', fontStyle: 'italic' }}>{article.image_caption}</p>
          )}
        </section>
      )}

      {/* BODY CONTENT: Balanced Spacing */}
      <article style={{ maxWidth: '780px', margin: '0 auto', padding: '0 2rem' }}>
        {Array.isArray(article.content) && article.content.map((block: any, i: number) => {
          if (block.type === 'text' || block.type === 'paragraph') {
            const textContent = block.content || block.value;
            if (!textContent) return null;
            return (
              <p 
                key={i} 
                style={{ 
                  marginBottom: '2.5rem', 
                  fontSize: '1.15rem',
                  lineHeight: '1.9',
                  fontWeight: block.bold ? '600' : '400',
                  color: block.bold ? '#000' : '#333'
                }}
                dangerouslySetInnerHTML={{ __html: textContent }}
              />
            );
          } else if (block.type === 'subheading' || block.type === 'h2' || block.type === 'h3') {
            const textContent = block.content || block.value;
            if (!textContent) return null;
            return (
              <h2 
                key={i} 
                className="serif"
                style={{ fontSize: '2.2rem', marginTop: '80px', marginBottom: '35px', fontWeight: '500' }}
              >
                {textContent}
              </h2>
            );
          } else if (block.type === 'image') {
            const imgSrc = block.url || block.value;
            if (!imgSrc) return null;
            return (
              <div key={i} style={{ margin: '80px 0' }}>
                <img src={imgSrc} alt="Content" style={{ width: '100%', height: 'auto' }} />
                {block.caption && (
                  <p style={{ fontSize: '12px', color: '#AAA', textAlign: 'right', marginTop: '1rem', fontStyle: 'italic' }}>{block.caption}</p>
                )}
              </div>
            );
          }
          return null;
        })}

        <div style={{ marginTop: '120px', padding: '60px', border: '1px solid #EEE', textAlign: 'center' }}>
          <p className="serif" style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>Join the community of art enthusiasts and creative leaders.</p>
          <a href="#" style={{ display: 'inline-block', padding: '15px 40px', backgroundColor: '#000', color: '#FFF', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
            Subscribe Now
          </a>
        </div>
      </article>

      <nav className="container" style={{ marginTop: '120px', paddingTop: '60px', borderTop: '1px solid #EEE' }}>
        <a href="/magazine" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span className="caps-label">Explore More</span>
          <span className="serif" style={{ fontSize: '3.5rem', lineHeight: '1' }}>Magazine</span>
        </a>
      </nav>
    </main>
  );
}
