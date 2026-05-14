export default function AdminLayout({ children }: { children: React.ReactNode }) {
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

        <div style={{ marginTop: 'auto', padding: '30px', borderTop: '1px solid #E8E8E8' }}>
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
