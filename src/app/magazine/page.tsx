"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const ARTICLES_PER_PAGE = 4;

export default function MagazinePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  
  const observerTarget = useRef(null);

  // Initial Fetch
  useEffect(() => {
    fetchInitialArticles();
  }, []);

  const fetchInitialArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .eq('category', 'magazine')
        .order('created_at', { ascending: false })
        .range(0, ARTICLES_PER_PAGE - 1);
        
      if (error) throw error;
      
      if (data) {
        setArticles(data);
        if (data.length < ARTICLES_PER_PAGE) setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreArticles = useCallback(async () => {
    if (fetchingMore || !hasMore) return;
    try {
      setFetchingMore(true);
      const nextPage = page + 1;
      const start = nextPage * ARTICLES_PER_PAGE;
      const end = start + ARTICLES_PER_PAGE - 1;
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .eq('category', 'magazine')
        .order('created_at', { ascending: false })
        .range(start, end);

      if (error) throw error;
      
      if (data && data.length > 0) {
        setArticles(prev => [...prev, ...data]);
        setPage(nextPage);
        if (data.length < ARTICLES_PER_PAGE) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingMore(false);
    }
  }, [page, fetchingMore, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreArticles();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [loadMoreArticles, hasMore, loading]);

  if (loading && articles.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
        <p style={{ color: '#888', letterSpacing: '0.2em' }}>LOADING...</p>
      </div>
    );
  }

  return (
    <main className="magazine-page" style={{ backgroundColor: '#FFF', minHeight: '100vh', paddingBottom: '140px' }}>
      
      {/* HEADER SECTION: Clean & Airy */}
      <section className="container" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="caps-label" style={{ color: 'var(--accent)', fontWeight: 600 }}>Featured Stories</span>
          <h1 className="serif" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: '1', marginTop: '1.5rem', fontWeight: 500 }}>
            Magazine 雜誌
          </h1>
          <p className="serif" style={{ fontSize: '1.4rem', color: '#666', marginTop: '2rem', maxWidth: '600px', fontStyle: 'italic', opacity: 0.8 }}>
            Curated articles, interviews, and deep dives into the world of art and culture.
          </p>
        </motion.div>
      </section>

      {/* ARTICLE GRID: Match Looom People */}
      <section className="container">
        <div className="editorial-grid">
          {articles.map((article, index) => (
            <motion.a 
              key={article.slug}
              href={`/magazine/${article.slug}`} 
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: (index % 4) * 0.1, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ y: -10 }}
            >
              <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', marginBottom: '2.5rem' }}>
                <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span className="caps-label">{article.tag || 'Magazine'} | {article.date}</span>
              <h3 className="serif" style={{ fontSize: '1.8rem', margin: '1.5rem 0', lineHeight: '1.3', fontWeight: 500 }}>
                {article.title}
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6' }}>{article.english_title || article.subtitle}</p>
            </motion.a>
          ))}
        </div>
        
        {articles.length === 0 && (
          <div style={{ padding: '80px 0', textAlign: 'center' }}>
            <p className="serif" style={{ fontSize: '1.5rem', color: '#888' }}>No articles published yet.</p>
          </div>
        )}

        {/* Infinite Scroll Trigger & Loader */}
        {hasMore && (
          <div ref={observerTarget} style={{ padding: '80px 0', textAlign: 'center', marginTop: '40px' }}>
            {fetchingMore && <span style={{ color: '#888', letterSpacing: '0.2em', fontSize: '0.9rem' }}>LOADING MORE...</span>}
          </div>
        )}
        
        {!hasMore && articles.length > 0 && (
          <div style={{ padding: '100px 0 60px', textAlign: 'center', marginTop: '80px', borderTop: '1px solid #EAEAEA' }}>
            <span className="serif" style={{ color: '#CCC', fontSize: '1.2rem', fontStyle: 'italic' }}>You have reached the end.</span>
          </div>
        )}
      </section>
    </main>
  );
}
