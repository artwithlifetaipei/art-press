"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, Sparkles, CornerDownLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Predefined list of popular artist and interviewee names representing featured pages
const POPULAR_NAMES = [
  "Patricia Domínguez",
  "Zoey Fang",
  "Dan",
  "楊艾倫 Allen Yang",
  "GAUTE",
  "鄭在東",
  "吳東龍",
  "張徐展",
  "皆川明 Akira Minagawa",
  "Anri Sala",
  "李若玫 Lee Jo-Mei",
  "Veronica Ryan",
  "Arman 阿曼",
  "許光漢",
  "Bonny Liu"
];

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestedNames, setSuggestedNames] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling when search overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Dynamically pick 5 random suggestions when search is opened
  useEffect(() => {
    if (isOpen) {
      const shuffled = [...POPULAR_NAMES].sort(() => 0.5 - Math.random());
      setSuggestedNames(shuffled.slice(0, 5));
    }
  }, [isOpen]);

  // Server-side database query with 300ms debounce
  useEffect(() => {
    if (!query.trim()) {
      setFilteredResults([]);
      setLoading(false);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        setLoading(true);
        const q = query.trim().toLowerCase();
        
        // Sanitize to avoid breaking PostgREST formatting (e.g. comma, parentheses)
        const sanitizedQ = q.replace(/[,()#?%&]/g, "");
        
        if (!sanitizedQ) {
          setFilteredResults([]);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('articles')
          .select('id, slug, title, subtitle, english_title, image, tag, category, date')
          .or(`title.ilike.%${sanitizedQ}%,subtitle.ilike.%${sanitizedQ}%,english_title.ilike.%${sanitizedQ}%,tag.ilike.%${sanitizedQ}%`)
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) throw error;
        if (data) {
          setFilteredResults(data);
        }
      } catch (err) {
        console.error('Failed to query articles:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setActiveIndex(-1);
    }
  }, [isOpen]);

  // Keyboard navigation & accessibility
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => Math.max(prev - 1, -1));
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && activeIndex < filteredResults.length) {
          e.preventDefault();
          const targetArticle = filteredResults[activeIndex];
          const path = targetArticle.category === 'people' 
            ? `/people/${targetArticle.slug}` 
            : `/magazine/${targetArticle.slug}`;
          window.location.href = path;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, filteredResults]);

  const handleSuggestionClick = (name: string) => {
    setQuery(name);
    inputRef.current?.focus();
  };

  // Overlay Framer Motion animation variants
  const modalVariants: any = {
    closed: {
      opacity: 0,
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      opacity: 1,
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const contentVariants: any = {
    closed: {
      opacity: 0,
      y: 30,
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.1, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <>
      {/* Elegantly styled search trigger button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="search-trigger-btn"
        aria-label="Search articles"
      >
        <SearchIcon size={18} strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={overlayRef}
            className="search-overlay"
            initial="closed"
            animate="open"
            exit="closed"
            variants={modalVariants}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="search-close-btn"
              aria-label="Close search"
            >
              <X size={22} strokeWidth={1.5} />
            </button>

            {/* Modal Inner Container */}
            <motion.div 
              className="search-content-container"
              variants={contentVariants}
            >
              {/* Massive centered input */}
              <div className="search-input-wrapper">
                <input 
                  ref={inputRef}
                  type="text"
                  placeholder="Search stories, artists, interviews..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(-1);
                  }}
                  className="search-field-input"
                />
                <div className="search-input-underline-track"></div>
                <div className="search-input-underline-fill" style={{ transform: query ? 'scaleX(1)' : undefined }}></div>
              </div>

              {/* Dynamic Suggestions (Shown when input is empty) */}
              {!query.trim() && (
                <div className="search-suggestions-section">
                  <h4 className="search-suggestions-title">
                    <Sparkles size={12} style={{ color: 'var(--accent)' }} />
                    Try Searching for / 探索受訪創作者
                  </h4>
                  <div className="search-suggestions-list">
                    {suggestedNames.map((name) => (
                      <button
                        key={name}
                        onClick={() => handleSuggestionClick(name)}
                        className="search-suggestion-item-tag"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results Area */}
              {query.trim() && (
                <div className="search-results-section">
                  <div className="search-results-section-header">
                    {loading ? (
                      "Searching database..."
                    ) : (
                      `${filteredResults.length} Result${filteredResults.length !== 1 ? 's' : ''} for "${query}"`
                    )}
                  </div>

                  {loading ? (
                    <div className="search-loader-container">
                      <div className="search-loader-spinner-bar">
                        <div className="search-loader-spinner-fill"></div>
                      </div>
                      <span className="search-loader-label">Scanning archives</span>
                    </div>
                  ) : filteredResults.length > 0 ? (
                    <div className="search-results-grid">
                      {filteredResults.map((article, index) => {
                        const isHighlighted = index === activeIndex;
                        const cardPath = article.category === 'people' 
                          ? `/people/${article.slug}` 
                          : `/magazine/${article.slug}`;
                        
                        return (
                          <div key={article.slug} style={{ position: 'relative' }}>
                            <a 
                              href={cardPath}
                              className="search-result-card-link"
                              style={{ 
                                outline: isHighlighted ? '1px solid var(--accent)' : 'none',
                                outlineOffset: '12px',
                                background: isHighlighted ? '#FAFAFA' : 'transparent',
                                padding: isHighlighted ? '12px' : '0',
                                margin: isHighlighted ? '-12px' : '0',
                                borderRadius: '4px'
                              }}
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="search-result-image-wrapper">
                                <img 
                                  src={article.image} 
                                  alt={article.title} 
                                  className="search-result-thumbnail-img"
                                />
                              </div>
                              <span className="search-result-card-tag">
                                {article.tag || (article.category === 'people' ? 'Looom People' : 'Magazine')}
                              </span>
                              <h3 className="search-result-card-title">
                                {article.title}
                              </h3>
                              <p className="search-result-card-description">
                                {article.subtitle || article.english_title || "Deep dive and exclusive coverage."}
                              </p>
                              {isHighlighted && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent)', fontSize: '10px', marginTop: '0.8rem', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.1em' }}>
                                  <CornerDownLeft size={10} />
                                  PRESS ENTER TO READ
                                </div>
                              )}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="search-no-results-box">
                      <SearchIcon size={44} className="search-no-results-icon" strokeWidth={1} />
                      <h3 className="search-no-results-title serif">No Results Found</h3>
                      <p className="search-no-results-tips">
                        Try looking for artist names, categories, or check spelling.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
