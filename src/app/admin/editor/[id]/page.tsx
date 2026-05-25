"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, Plus, ArrowUp, ArrowDown, Trash2, ArrowLeft, Upload } from 'lucide-react';

export default function ArticleEditor() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === 'new';
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [article, setArticle] = useState({
    title: '', english_title: '', slug: '', subtitle: '', tag: '', date: '', author: '',
    image: '', image_caption: '', status: 'draft', category: 'people'
  });

  const [isHero, setIsHero] = useState(false);
  
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    if (!isNew) fetchArticle();
  }, [params.id]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase.from('articles').select('*').eq('id', params.id).single();
      if (error) throw error;
      if (data) {
        setArticle(data);
        setIsHero(data.is_hero || false);
        setBlocks(data.content || []);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (statusOverride?: 'draft' | 'published') => {
    const trimmedTitle = article.title.trim();
    const trimmedSlug = article.slug.trim().replace(/\s+/g, '-');

    if (!trimmedTitle || !trimmedSlug) {
      alert('Title and Slug are required');
      return;
    }
    setSaving(true);
    try {
      // If no status provided, keep current status. If provided, update it.
      const finalStatus = statusOverride || article.status || 'draft';
      const updatedArticle = {
        ...article,
        title: trimmedTitle,
        slug: trimmedSlug,
      };
      const payload = { ...updatedArticle, content: blocks, status: finalStatus, is_hero: isHero };
      
      // remove id from payload to avoid conflict on insert
      const { id, ...insertPayload } = payload as any;
      
      if (isNew) {
        const { error } = await supabase.from('articles').insert([insertPayload]);
        if (error) throw error;
        alert(`Successfully saved as ${finalStatus}!`);
        router.push('/admin');
      } else {
        const { error } = await supabase.from('articles').update(payload).eq('id', params.id);
        if (error) throw error;
        setArticle(payload); // update local state
        alert(`Successfully updated as ${finalStatus}!`);
      }
    } catch (error: any) {
      alert('Error saving: ' + error.message + '\n\nPlease check if your Supabase URL and Key are correct in .env.local');
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'cover' | 'block', index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('looom_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('looom_images')
        .getPublicUrl(filePath);

      if (targetField === 'cover') {
        setArticle({ ...article, image: publicUrl });
      } else if (targetField === 'block' && typeof index === 'number') {
        updateBlock(index, 'value', publicUrl);
      }
    } catch (error: any) {
      alert('Upload failed. Did you create the "looom_images" storage bucket in Supabase? Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const addBlock = (type: 'text' | 'subheading' | 'image') => {
    setBlocks([...blocks, { type, value: '', bold: false, caption: '' }]);
  };

  const updateBlock = (index: number, field: string, value: any) => {
    const newBlocks = [...blocks];
    newBlocks[index][field] = value;
    setBlocks(newBlocks);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;
    
    const newBlocks = [...blocks];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[swapIndex]] = [newBlocks[swapIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  if (loading) return <div style={{ padding: '60px' }}>Loading editor...</div>;

  const InputRow = ({ label, field, placeholder = '', type = 'text' }: any) => (
    <div style={{ marginBottom: '20px' }}>
      <label className="caps-label" style={{ display: 'block', marginBottom: '8px' }}>{label}</label>
      {type === 'textarea' ? (
        <textarea 
          value={article[field as keyof typeof article]} 
          onChange={e => setArticle({...article, [field]: e.target.value})}
          placeholder={placeholder}
          style={{ width: '100%', padding: '12px', border: '1px solid #CCC', minHeight: '100px', fontFamily: 'inherit' }}
        />
      ) : (
        <input 
          type="text" 
          value={article[field as keyof typeof article]} 
          onChange={e => setArticle({...article, [field]: e.target.value})}
          placeholder={placeholder}
          style={{ width: '100%', padding: '12px', border: '1px solid #CCC', fontFamily: 'inherit' }}
        />
      )}
    </div>
  );

  return (
    <div style={{ padding: '40px 80px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <button onClick={() => router.push('/admin')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#555' }}>
          <ArrowLeft size={18} /> Back
        </button>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={() => handleSave('draft')}
            disabled={saving || uploading}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              backgroundColor: '#FFF', color: '#000', border: '1px solid #000',
              padding: '12px 20px', fontSize: '0.85rem', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', cursor: (saving || uploading) ? 'not-allowed' : 'pointer'
            }}
          >
            Save Draft
          </button>
          <button 
            onClick={() => handleSave('published')}
            disabled={saving || uploading}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              backgroundColor: '#000', color: '#FFF', border: '1px solid #000',
              padding: '12px 30px', fontSize: '0.85rem', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', cursor: (saving || uploading) ? 'not-allowed' : 'pointer'
            }}
          >
            <Save size={16} /> {saving ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#FFF', padding: '40px', border: '1px solid #E8E8E8', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 className="serif" style={{ fontSize: '2rem' }}>Metadata Settings</h2>
          <span style={{ 
            display: 'inline-block', padding: '6px 12px', 
            backgroundColor: article.status === 'published' ? '#F0FDF4' : '#F8FAFC',
            color: article.status === 'published' ? '#166534' : '#475569',
            border: article.status === 'published' ? '1px solid #BBF7D0' : '1px solid #E2E8F0',
            fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase'
          }}>
            Status: {article.status}
          </span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <InputRow label="Chinese Title (Required)" field="title" />
          <InputRow label="Slug (URL Friendly, Required)" field="slug" placeholder="e.g. gaute-interview" />
          <div style={{ marginBottom: '20px' }}>
            <label className="caps-label" style={{ display: 'block', marginBottom: '8px' }}>Category</label>
            <select 
              value={article.category} 
              onChange={e => setArticle({...article, category: e.target.value})}
              style={{ width: '100%', padding: '12px', border: '1px solid #CCC', fontFamily: 'inherit', backgroundColor: '#FFF' }}
            >
              <option value="people">Looom People</option>
              <option value="magazine">Magazine</option>
            </select>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <InputRow label="English Title" field="english_title" placeholder="e.g. When building a brand, what do you prioritize?" />
          <InputRow label="Subtitle / Description" field="subtitle" type="textarea" placeholder="e.g. 專訪西服訂製品牌 GAUTE 創辦人：探索工藝與現代裁縫中追求永恆美學的交匯點..." />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <InputRow label="Category / Tag" field="tag" placeholder="Looom People / Fashion" />
          <InputRow label="Date" field="date" placeholder="October 1, 2025" />
          <InputRow label="Author" field="author" placeholder="ART PRESS Editorial" />
        </div>

        {/* HERO FEATURE TOGGLE */}
        <div style={{
          marginBottom: '30px',
          padding: '24px 28px',
          border: isHero ? '2px solid #ff5858' : '1px solid #E8E8E8',
          backgroundColor: isHero ? '#fff5f5' : '#FAFAFA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease',
        }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.95rem', margin: 0, letterSpacing: '0.05em' }}>
              {isHero ? '⬛ 已設定為首頁 Hero 封面' : '○ 設為首頁 Hero 封面'}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#888', margin: '6px 0 0', lineHeight: '1.5' }}>
              開啟後，此文章將顯示於首頁全螢幕 Hero 區塊。每次僅應設定一篇文章為 Hero。
            </p>
          </div>
          <label style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              checked={isHero}
              onChange={e => setIsHero(e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#ff5858' }}
            />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>啟用</span>
          </label>
        </div>

        {/* COVER IMAGE UPLOAD AREA */}
        <div style={{ marginBottom: '20px', padding: '20px', border: '1px dashed #CCC', backgroundColor: '#FAFAFA' }}>
          <label className="caps-label" style={{ display: 'block', marginBottom: '15px' }}>Cover Image Upload</label>
          {article.image && (
            <div style={{ marginBottom: '15px' }}>
              <img src={article.image} alt="Cover Preview" style={{ width: '100%', maxWidth: '300px', height: 'auto', border: '1px solid #EEE' }} />
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#FFF', border: '1px solid #000', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}>
              <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload Image'}
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => uploadImage(e, 'cover')} disabled={uploading} />
            </label>
            <span style={{ fontSize: '0.8rem', color: '#777' }}>Or URL:</span>
            <input type="text" value={article.image} onChange={e => setArticle({...article, image: e.target.value})} placeholder="https://..." style={{ flex: 1, padding: '10px', border: '1px solid #CCC' }} />
          </div>
        </div>

        <InputRow label="Cover Image Caption" field="image_caption" />
      </div>

      {/* BLOCK BUILDER */}
      <div style={{ backgroundColor: '#FFF', padding: '40px', border: '1px solid #E8E8E8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 className="serif" style={{ fontSize: '2rem' }}>Content Editor (Block Builder)</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => addBlock('text')} style={{ padding: '8px 16px', border: '1px solid #CCC', background: '#FFF', cursor: 'pointer', fontSize: '0.8rem' }}>+ Text</button>
            <button onClick={() => addBlock('subheading')} style={{ padding: '8px 16px', border: '1px solid #CCC', background: '#FFF', cursor: 'pointer', fontSize: '0.8rem' }}>+ Subheading</button>
            <button onClick={() => addBlock('image')} style={{ padding: '8px 16px', border: '1px solid #CCC', background: '#FFF', cursor: 'pointer', fontSize: '0.8rem' }}>+ Image</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {blocks.map((block, index) => (
            <motion.div 
              key={index}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ padding: '20px', border: '1px solid #E8E8E8', backgroundColor: '#FAFAFA', position: 'relative' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span className="caps-label" style={{ color: '#B29B6E' }}>{block.type.toUpperCase()} BLOCK</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => moveBlock(index, 'up')} disabled={index === 0} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#666' }}><ArrowUp size={16}/></button>
                  <button onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#666' }}><ArrowDown size={16}/></button>
                  <button onClick={() => removeBlock(index)} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#EF4444', marginLeft: '10px' }}><Trash2 size={16}/></button>
                </div>
              </div>

              {block.type === 'text' && (
                <>
                  <textarea 
                    value={block.value} 
                    onChange={e => updateBlock(index, 'value', e.target.value)}
                    placeholder="Enter paragraph text (HTML allowed, e.g. <br>)..."
                    style={{ width: '100%', padding: '15px', minHeight: '120px', border: '1px solid #CCC', fontFamily: 'inherit', lineHeight: '1.6' }}
                  />
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={block.bold} onChange={e => updateBlock(index, 'bold', e.target.checked)} />
                    Make this text bold
                  </label>
                </>
              )}

              {block.type === 'subheading' && (
                <input 
                  type="text" 
                  value={block.value} 
                  onChange={e => updateBlock(index, 'value', e.target.value)}
                  placeholder="Enter subheading text..."
                  className="serif"
                  style={{ width: '100%', padding: '15px', border: '1px solid #CCC', fontSize: '1.5rem' }}
                />
              )}

              {block.type === 'image' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {block.value && (
                    <div><img src={block.value} alt="Preview" style={{ width: '100%', maxWidth: '200px', border: '1px solid #EEE' }}/></div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{ padding: '10px 15px', backgroundColor: '#FFF', border: '1px solid #CCC', cursor: 'pointer', fontSize: '0.8rem' }}>
                      {uploading ? '...' : 'Upload File'}
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => uploadImage(e, 'block', index)} disabled={uploading} />
                    </label>
                    <span style={{ fontSize: '0.8rem', color: '#777' }}>Or URL:</span>
                    <input 
                      type="text" 
                      value={block.value} 
                      onChange={e => updateBlock(index, 'value', e.target.value)}
                      placeholder="Image URL..."
                      style={{ flex: 1, padding: '10px', border: '1px solid #CCC' }}
                    />
                  </div>
                  <input 
                    type="text" 
                    value={block.caption} 
                    onChange={e => updateBlock(index, 'caption', e.target.value)}
                    placeholder="Image Caption (Optional)..."
                    style={{ width: '100%', padding: '12px', border: '1px solid #CCC' }}
                  />
                </div>
              )}
            </motion.div>
          ))}
          {blocks.length === 0 && (
            <p style={{ textAlign: 'center', color: '#999', padding: '40px', border: '1px dashed #CCC' }}>No content blocks yet. Add a text, subheading, or image block above.</p>
          )}
        </div>
      </div>

    </div>
  );
}
