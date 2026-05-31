"use client";

import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';

const safeStorage = {
  getItem: (key: string) => {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  },
  setItem: (key: string, val: string) => {
    try { localStorage.setItem(key, val); } catch (e) {}
  },
  removeItem: (key: string) => {
    try { localStorage.removeItem(key); } catch (e) {}
  }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if session exists in localStorage
    const session = safeStorage.getItem('looom_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Admin Credentials
    const ADMIN_EMAIL = 'looom@theartpressasia.com';
    const ADMIN_PASSWORD = 'LIUKUO05100413';

    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      safeStorage.setItem('looom_admin_session', 'true');
      setIsAuthenticated(true);
    } else {
      setError('帳號或密碼輸入錯誤，請重新輸入。');
    }
    setLoading(false);
  };

  const handleSignOut = () => {
    safeStorage.removeItem('looom_admin_session');
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', color: '#777' }}>
        <p className="serif" style={{ fontSize: '1.2rem' }}>Verifying security credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ 
        display: 'flex', 
        minHeight: '100vh', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#FAFAFA',
        padding: '20px'
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '440px', 
          backgroundColor: '#FFF', 
          border: '1px solid #E8E8E8', 
          padding: '50px 40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 className="serif" style={{ fontSize: '2.5rem', fontWeight: 400, letterSpacing: '0.1em', color: '#000', marginBottom: '8px' }}>
              LOOOM
            </h1>
            <span className="caps-label" style={{ color: '#888', fontSize: '0.75rem', letterSpacing: '0.2em' }}>
              Administrator Gate
            </span>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {error && (
              <div style={{ 
                padding: '12px 16px', 
                backgroundColor: '#FFF5F5', 
                borderLeft: '3px solid #EF4444', 
                color: '#C53030', 
                fontSize: '0.85rem' 
              }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#444' }}>
                Account / Email
              </label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="news@theartpressasia.com"
                style={{ 
                  padding: '12px 16px', 
                  border: '1px solid #DDD', 
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#444' }}>
                Password
              </label>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{ 
                  padding: '12px 16px', 
                  border: '1px solid #DDD', 
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              style={{ 
                backgroundColor: '#000', 
                color: '#FFF', 
                padding: '14px', 
                fontSize: '0.85rem', 
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                marginTop: '10px',
                transition: 'opacity 0.2s'
              }}
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      
      {/* Sidebar - Art Authority V4 Style */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: '#FFF', 
        borderRight: '1px solid #E8E8E8',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '40px 30px', borderBottom: '1px solid #E8E8E8' }}>
          <h1 className="serif" style={{ fontSize: '1.8rem', fontWeight: 500, letterSpacing: '0.05em' }}>
            Looom <br /> Admin
          </h1>
        </div>
        
        <nav style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <a href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#000', fontWeight: 500 }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#B29B6E', borderRadius: '50%' }}></span>
            All Articles
          </a>
          <a href="/admin/editor/new" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#777' }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: 'transparent', border: '1px solid #CCC', borderRadius: '50%' }}></span>
            Draft New
          </a>
        </nav>

        <div style={{ marginTop: 'auto', padding: '30px', borderTop: '1px solid #E8E8E8', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button 
            onClick={handleSignOut}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontSize: '0.8rem', 
              color: '#EF4444', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              padding: '0',
              fontWeight: 500,
              textAlign: 'left'
            }}
          >
            <LogOut size={14} /> Sign Out
          </button>
          <a href="/" style={{ fontSize: '0.8rem', color: '#777', textDecoration: 'underline' }}>
            &larr; Back to Live Site
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </main>

    </div>
  );
}
