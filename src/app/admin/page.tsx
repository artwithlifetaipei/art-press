"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Edit2, Plus, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) throw error;
      fetchArticles();
    } catch (error) {
      alert('Error deleting article');
    }
  };

  const totalCount = articles.length;
  const draftCount = articles.filter(a => a.status === 'draft').length;

  return (
    <div style={{ padding: '60px 80px', maxWidth: '1200px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <span className="caps-label" style={{ color: 'var(--accent)', fontWeight: 600 }}>Overview</span>
          <h2 className="serif" style={{ fontSize: '2.5rem', fontWeight: 500, marginTop: '0.5rem' }}>
            All Articles ({totalCount})
            <span style={{ fontSize: '1rem', color: '#888', marginLeft: '1.5rem' }}>
              Drafts ({draftCount})
            </span>
          </h2>
        </div>
        <a 
          href="/admin/editor/new"
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            backgroundColor: '#000', color: '#FFF', 
            padding: '12px 24px', fontSize: '0.85rem', fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase'
          }}
        >
          <Plus size={16} /> New Article
        </a>
      </div>

      {loading ? (
        <p style={{ color: '#777' }}>Loading repository...</p>
      ) : articles.length === 0 ? (
        <div style={{ padding: '80px', textAlign: 'center', backgroundColor: '#FFF', border: '1px dashed #CCC' }}>
          <p className="serif" style={{ fontSize: '1.5rem', color: '#555', marginBottom: '20px' }}>No articles found.</p>
          <a href="/admin/editor/new" style={{ color: '#000', textDecoration: 'underline' }}>Create your first draft</a>
        </div>
      ) : (
        <div style={{ backgroundColor: '#FFF', border: '1px solid #E8E8E8' }}>
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1.5fr 1fr 1fr', padding: '20px 30px', borderBottom: '1px solid #E8E8E8', backgroundColor: '#FAFAFA' }}>
            <span className="caps-label">Title</span>
            <span className="caps-label">Category</span>
            <span className="caps-label">Status</span>
            <span className="caps-label" style={{ textAlign: 'right' }}>Actions</span>
          </div>

          {/* Table Rows */}
          {articles.map((article) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ 
                display: 'grid', gridTemplateColumns: '3fr 1.5fr 1fr 1fr', 
                padding: '24px 30px', borderBottom: '1px solid #F0F0F0',
                alignItems: 'center'
              }}
            >
              <div>
                <p className="serif" style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '4px' }}>{article.title}</p>
                <p style={{ fontSize: '0.8rem', color: '#777' }}>/{article.slug}</p>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#555' }}>
                <span style={{ display: 'inline-block', padding: '4px 8px', backgroundColor: '#F3F4F6', borderRadius: '4px' }}>
                  {article.category === 'magazine' ? 'Magazine' : 'Looom People'}
                </span>
              </div>
              <div>
                <span style={{ 
                  display: 'inline-block', padding: '4px 10px', 
                  backgroundColor: article.status === 'published' ? '#F0FDF4' : '#F8FAFC',
                  color: article.status === 'published' ? '#166534' : '#475569',
                  border: article.status === 'published' ? '1px solid #BBF7D0' : '1px solid #E2E8F0',
                  fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase'
                }}>
                  {article.status}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                <a href={`/admin/editor/${article.id}`} style={{ color: '#666' }} title="Edit">
                  <Edit2 size={18} />
                </a>
                <button onClick={() => deleteArticle(article.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }} title="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}
