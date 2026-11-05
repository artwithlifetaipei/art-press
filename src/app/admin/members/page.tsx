"use client";

import { useEffect, useState, useMemo } from 'react';
import { 
  fetchClubApplications, 
  updateClubApplication, 
  deleteClubApplication, 
  exportApplicationsToCSV,
  ClubApplication, 
  ApplicationStatus,
  STATUS_CONFIG,
  MEMBERSHIP_TIER_CONFIG
} from '@/lib/looom-applications';
import { 
  Users, 
  Search, 
  Download, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Eye, 
  Trash2, 
  X, 
  Copy, 
  Check, 
  Building2, 
  FileText,
  CreditCard,
  Maximize2
} from 'lucide-react';

export default function AdminMembersPage() {
  const [applications, setApplications] = useState<ClubApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');
  
  // Selected Application for Detail Modal
  const [selectedApp, setSelectedApp] = useState<ClubApplication | null>(null);
  const [editingStatus, setEditingStatus] = useState<ApplicationStatus>('pending');
  const [editingNotes, setEditingNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Lightbox for previewing images
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    const data = await fetchClubApplications();
    setApplications(data);
    setLoading(false);
  };

  const handleOpenDetail = (app: ClubApplication) => {
    setSelectedApp(app);
    setEditingStatus(app.status);
    setEditingNotes(app.adminNotes || '');
  };

  const handleCloseDetail = () => {
    setSelectedApp(null);
  };

  const handleSaveStatus = async () => {
    if (!selectedApp) return;
    setIsUpdating(true);
    const ok = await updateClubApplication(selectedApp.id, {
      status: editingStatus,
      adminNotes: editingNotes
    });
    setIsUpdating(false);

    if (ok) {
      setApplications(prev => prev.map(a => 
        a.id === selectedApp.id ? { ...a, status: editingStatus, adminNotes: editingNotes } : a
      ));
      setSelectedApp(prev => prev ? { ...prev, status: editingStatus, adminNotes: editingNotes } : null);
    } else {
      alert('更新失敗，請確認連線。');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定要永久刪除此筆會員申請紀錄嗎？此操作無法復原。')) return;
    const ok = await deleteClubApplication(id);
    if (ok) {
      setApplications(prev => prev.filter(a => a.id !== id));
      if (selectedApp?.id === id) {
        setSelectedApp(null);
      }
    } else {
      alert('刪除失敗');
    }
  };

  const handleCopyContacts = (app: ClubApplication) => {
    const text = `品牌：${app.brandNameZh} (${app.brandNameEn})\n負責人：${app.ownerName}\n手機：${app.ownerPhone}\n電郵：${app.ownerEmail}\n統編：${app.taxId || '無'}\n發票抬頭：${app.invoiceTitle || '無'}`;
    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Metrics
  const metrics = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter(a => a.status === 'pending').length;
    const approved = applications.filter(a => a.status === 'approved').length;
    const revision = applications.filter(a => a.status === 'revision').length;
    const rejected = applications.filter(a => a.status === 'rejected').length;
    return { total, pending, approved, revision, rejected };
  }, [applications]);

  // Filtered List
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      // Status filter
      if (statusFilter !== 'all' && app.status !== statusFilter) return false;
      // Tier filter
      if (tierFilter !== 'all' && app.membershipTier !== tierFilter) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchBrandZh = (app.brandNameZh || '').toLowerCase().includes(q);
        const matchBrandEn = (app.brandNameEn || '').toLowerCase().includes(q);
        const matchOwner = (app.ownerName || '').toLowerCase().includes(q);
        const matchEmail = (app.ownerEmail || app.email || '').toLowerCase().includes(q);
        const matchPhone = (app.ownerPhone || app.phone || '').includes(q);
        const matchTax = (app.taxId || '').includes(q);
        if (!matchBrandZh && !matchBrandEn && !matchOwner && !matchEmail && !matchPhone && !matchTax) {
          return false;
        }
      }
      return true;
    });
  }, [applications, statusFilter, tierFilter, searchQuery]);

  return (
    <div style={{ padding: '50px 60px', maxWidth: '1440px', margin: '0 auto', color: '#111' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px' }}>
        <div>
          <span className="caps-label" style={{ color: '#B29B6E', fontWeight: 600, letterSpacing: '0.2em' }}>
            LOOOM CLUB
          </span>
          <h2 className="serif" style={{ fontSize: '2.5rem', fontWeight: 400, marginTop: '4px', margin: 0 }}>
            會員入會申請名冊
          </h2>
          <p style={{ color: '#777', fontSize: '0.9rem', marginTop: '6px' }}>
            管理與審核正式官方會員申請名單、匯款憑證與品牌權益導入狀態
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={loadApplications}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              backgroundColor: '#FFF',
              border: '1px solid #DDD',
              fontSize: '0.85rem',
              color: '#333',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            重新整理
          </button>

          <button
            onClick={() => exportApplicationsToCSV(filteredApplications)}
            disabled={filteredApplications.length === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#000',
              color: '#FFF',
              padding: '10px 22px',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              border: 'none',
              cursor: filteredApplications.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <Download size={15} /> 匯出 CSV 名冊
          </button>
        </div>
      </div>

      {/* Overview Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#FFF', border: '1px solid #E8E8E8', padding: '20px 24px' }}>
          <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>總申請數</span>
          <div className="serif" style={{ fontSize: '2.2rem', fontWeight: 600, marginTop: '6px' }}>{metrics.total}</div>
        </div>

        <div style={{ backgroundColor: '#FFF', border: '1px solid #E8E8E8', borderLeft: '4px solid #B45309', padding: '20px 24px' }}>
          <span style={{ fontSize: '0.75rem', color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>待審核 Pending</span>
          <div className="serif" style={{ fontSize: '2.2rem', fontWeight: 600, marginTop: '6px', color: '#B45309' }}>{metrics.pending}</div>
        </div>

        <div style={{ backgroundColor: '#FFF', border: '1px solid #E8E8E8', borderLeft: '4px solid #065F46', padding: '20px 24px' }}>
          <span style={{ fontSize: '0.75rem', color: '#065F46', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>已核准 Approved</span>
          <div className="serif" style={{ fontSize: '2.2rem', fontWeight: 600, marginTop: '6px', color: '#065F46' }}>{metrics.approved}</div>
        </div>

        <div style={{ backgroundColor: '#FFF', border: '1px solid #E8E8E8', borderLeft: '4px solid #1E40AF', padding: '20px 24px' }}>
          <span style={{ fontSize: '0.75rem', color: '#1E40AF', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>需補件 Revision</span>
          <div className="serif" style={{ fontSize: '2.2rem', fontWeight: 600, marginTop: '6px', color: '#1E40AF' }}>{metrics.revision}</div>
        </div>

        <div style={{ backgroundColor: '#FFF', border: '1px solid #E8E8E8', borderLeft: '4px solid #991B1B', padding: '20px 24px' }}>
          <span style={{ fontSize: '0.75rem', color: '#991B1B', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>未通過 Rejected</span>
          <div className="serif" style={{ fontSize: '2.2rem', fontWeight: 600, marginTop: '6px', color: '#991B1B' }}>{metrics.rejected}</div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div style={{ backgroundColor: '#FFF', border: '1px solid #E8E8E8', padding: '18px 24px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
        
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1 1 300px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋品牌中英文名、負責人、電話、電郵、統編..."
            style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #DDD', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: '#666' }}>狀態:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '10px 14px', border: '1px solid #DDD', fontSize: '0.85rem', outline: 'none', backgroundColor: '#FFF' }}
          >
            <option value="all">全部狀態 All</option>
            <option value="pending">待審核 Pending</option>
            <option value="approved">已核准 Approved</option>
            <option value="revision">需補件 Needs Revision</option>
            <option value="rejected">未通過 Rejected</option>
          </select>
        </div>

        {/* Tier Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: '#666' }}>方案:</span>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            style={{ padding: '10px 14px', border: '1px solid #DDD', fontSize: '0.85rem', outline: 'none', backgroundColor: '#FFF' }}
          >
            <option value="all">全部會籍 All Tiers</option>
            <option value="basic">基礎會籍 (NTD 18,800)</option>
            <option value="premium">Premium 會籍 (NTD 28,800)</option>
          </select>
        </div>

        <div style={{ marginLeft: 'auto', fontSize: '0.85rem', color: '#888' }}>
          顯示 {filteredApplications.length} 筆
        </div>

      </div>

      {/* Main Table */}
      {loading ? (
        <div style={{ padding: '80px', textAlign: 'center', backgroundColor: '#FFF', border: '1px solid #E8E8E8' }}>
          <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 12px', color: '#888' }} />
          <p style={{ color: '#777', fontSize: '0.9rem' }}>正在讀取會員申請名冊...</p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#FFF', border: '1px dashed #DDD' }}>
          <Users size={36} style={{ color: '#AAA', margin: '0 auto 12px' }} />
          <p className="serif" style={{ fontSize: '1.4rem', color: '#333', margin: 0 }}>目前無符合條件的申請紀錄</p>
          <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '6px' }}>
            若有新會員於線上專頁送出申請，將即時呈現於此審核中心。
          </p>
        </div>
      ) : (
        <div style={{ backgroundColor: '#FFF', border: '1px solid #E8E8E8', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E8E8E8', color: '#555' }}>
                <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>品牌名稱 / 會籍方案</th>
                <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>品牌負責人</th>
                <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>聯絡方式</th>
                <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>匯款與附件</th>
                <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>遞交日期</th>
                <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>審核狀態</th>
                <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'right' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => {
                const statusInfo = STATUS_CONFIG[app.status] || STATUS_CONFIG.pending;
                const tierInfo = MEMBERSHIP_TIER_CONFIG[app.membershipTier] || MEMBERSHIP_TIER_CONFIG.basic;

                return (
                  <tr 
                    key={app.id} 
                    style={{ borderBottom: '1px solid #EFEFEF', transition: 'background-color 0.15s' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FCFCFC'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFF'}
                  >
                    
                    {/* Brand & Tier */}
                    <td style={{ padding: '18px 20px' }}>
                      <div style={{ fontWeight: 600, color: '#000', fontSize: '0.95rem' }}>
                        {app.brandNameZh || app.brandNameEn}
                      </div>
                      {app.brandNameEn && app.brandNameZh && (
                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{app.brandNameEn}</div>
                      )}
                      <div style={{ marginTop: '4px' }}>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          padding: '2px 6px', 
                          backgroundColor: app.membershipTier === 'premium' ? '#000' : '#EFEFEF',
                          color: app.membershipTier === 'premium' ? '#FFF' : '#333',
                          fontWeight: 500
                        }}>
                          {tierInfo.nameZh}
                        </span>
                      </div>
                    </td>

                    {/* Owner */}
                    <td style={{ padding: '18px 20px' }}>
                      <div style={{ fontWeight: 500 }}>{app.ownerName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#888' }}>
                        {app.taxId ? `統編: ${app.taxId}` : '無統編'}
                      </div>
                    </td>

                    {/* Contact */}
                    <td style={{ padding: '18px 20px' }}>
                      <div style={{ fontSize: '0.85rem' }}>{app.ownerPhone || app.phone}</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>{app.ownerEmail || app.email}</div>
                    </td>

                    {/* Remittance & Attachments */}
                    <td style={{ padding: '18px 20px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {app.remittanceImageUrl ? (
                          <button
                            type="button"
                            onClick={() => setLightboxUrl(app.remittanceImageUrl!)}
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '4px', 
                              fontSize: '0.75rem', 
                              backgroundColor: '#F3F4F6', 
                              border: '1px solid #DDD', 
                              padding: '4px 8px', 
                              cursor: 'pointer',
                              color: '#111'
                            }}
                          >
                            <CreditCard size={12} /> 匯款截圖
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: '#AAA' }}>未附截圖</span>
                        )}

                        {app.cloudDriveUrl && (
                          <a
                            href={app.cloudDriveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '3px', 
                              fontSize: '0.75rem', 
                              color: '#B29B6E', 
                              textDecoration: 'none' 
                            }}
                          >
                            雲端 <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td style={{ padding: '18px 20px', color: '#666', fontSize: '0.85rem' }}>
                      {app.signedAt || (app.submittedAt ? app.submittedAt.slice(0, 10) : '-')}
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: '18px 20px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: statusInfo.bg,
                        color: statusInfo.color,
                        border: `1px solid ${statusInfo.border}`
                      }}>
                        {statusInfo.label}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '18px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          onClick={() => handleOpenDetail(app)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: '#000',
                            color: '#FFF',
                            border: 'none',
                            padding: '6px 12px',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            fontWeight: 500
                          }}
                        >
                          <Eye size={12} /> 審核詳情
                        </button>

                        <button
                          onClick={() => handleDelete(app.id)}
                          title="刪除紀錄"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#AAA',
                            cursor: 'pointer',
                            padding: '6px'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#AAA'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* DETAIL DRAWER / MODAL */}
      {selectedApp && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(3px)'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '800px',
            backgroundColor: '#FFF',
            height: '100%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-10px 0 40px rgba(0,0,0,0.1)'
          }}>
            
            {/* Drawer Header */}
            <div style={{ padding: '24px 30px', borderBottom: '1px solid #E8E8E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FAFAFA' }}>
              <div>
                <span className="caps-label" style={{ color: '#B29B6E', fontSize: '0.7rem' }}>
                  APPLICATION REVIEW CONSOLE
                </span>
                <h3 className="serif" style={{ fontSize: '1.6rem', fontWeight: 500, margin: '2px 0 0' }}>
                  {selectedApp.brandNameZh || selectedApp.brandNameEn}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>
                  申請編號: {selectedApp.id}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => handleCopyContacts(selectedApp)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    fontSize: '0.75rem',
                    backgroundColor: '#FFF',
                    border: '1px solid #DDD',
                    cursor: 'pointer'
                  }}
                >
                  {copyFeedback ? <Check size={14} style={{ color: '#059669' }} /> : <Copy size={14} />}
                  {copyFeedback ? '已複製資訊' : '複製聯絡摘要'}
                </button>

                <button
                  type="button"
                  onClick={handleCloseDetail}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#666' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Drawer Body */}
            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '30px', flex: 1 }}>
              
              {/* Status Action Console Card */}
              <div style={{ backgroundColor: '#F9F9F9', border: '1px solid #E5E5E5', padding: '24px' }}>
                <h4 style={{ margin: '0 0 14px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: '#000' }}>
                  審核決策與內部備註 (Review Action)
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#555', marginBottom: '6px', fontWeight: 600 }}>
                      變更審核狀態 Status
                    </label>
                    <select
                      value={editingStatus}
                      onChange={(e) => setEditingStatus(e.target.value as ApplicationStatus)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '0.9rem', backgroundColor: '#FFF', outline: 'none' }}
                    >
                      <option value="pending">待審核 (Pending)</option>
                      <option value="approved">審核通過 (Approved - 正式會員)</option>
                      <option value="revision">需補件 (Needs Revision)</option>
                      <option value="rejected">未通過 (Rejected)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#555', marginBottom: '6px', fontWeight: 600 }}>
                      會籍等級 Tier
                    </label>
                    <div style={{ padding: '10px 12px', border: '1px solid #E2E2E2', backgroundColor: '#FFF', fontSize: '0.9rem', fontWeight: 600 }}>
                      {MEMBERSHIP_TIER_CONFIG[selectedApp.membershipTier]?.nameZh} ({MEMBERSHIP_TIER_CONFIG[selectedApp.membershipTier]?.priceLabel})
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#555', marginBottom: '6px', fontWeight: 600 }}>
                    管理員內部備註 (Admin Notes - 僅內部可見)
                  </label>
                  <textarea
                    rows={3}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="例：已確認 11/06 匯款款項；已寄送閉門季會貴賓名冊邀請函；統編需補開三聯式等..."
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={handleSaveStatus}
                    disabled={isUpdating}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#000',
                      color: '#FFF',
                      padding: '10px 22px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      border: 'none',
                      cursor: isUpdating ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <CheckCircle size={15} /> {isUpdating ? '儲存中...' : '儲存審核紀錄'}
                  </button>
                </div>
              </div>

              {/* Remittance Screenshot Lightbox Trigger */}
              {selectedApp.remittanceImageUrl && (
                <div style={{ border: '1px solid #EAEAEA', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h5 style={{ margin: 0, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                      匯款憑證截圖 (Remittance Screenshot)
                    </h5>
                    <button
                      type="button"
                      onClick={() => setLightboxUrl(selectedApp.remittanceImageUrl!)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#B29B6E', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <Maximize2 size={12} /> 點擊放大檢視
                    </button>
                  </div>
                  <div 
                    onClick={() => setLightboxUrl(selectedApp.remittanceImageUrl!)}
                    style={{ cursor: 'pointer', maxWidth: '320px', border: '1px solid #EEE', overflow: 'hidden' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selectedApp.remittanceImageUrl} alt="匯款憑證" style={{ width: '100%', display: 'block' }} />
                  </div>
                </div>
              )}

              {/* Brand Images (Gallery) */}
              {selectedApp.brandImages && selectedApp.brandImages.length > 0 && (
                <div style={{ border: '1px solid #EAEAEA', padding: '20px' }}>
                  <h5 style={{ margin: '0 0 12px', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                    品牌代表照片 ({selectedApp.brandImages.length} 張)
                  </h5>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {selectedApp.brandImages.map((imgUrl, i) => (
                      <div 
                        key={i} 
                        onClick={() => setLightboxUrl(imgUrl)}
                        style={{ width: '100px', height: '100px', border: '1px solid #DDD', cursor: 'pointer', overflow: 'hidden' }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imgUrl} alt={`Brand Photo ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section A: Brand Info */}
              <div style={{ borderTop: '1px solid #EEE', paddingTop: '20px' }}>
                <span className="caps-label" style={{ color: '#888', fontSize: '0.7rem' }}>SECTION A</span>
                <h4 style={{ margin: '4px 0 16px', fontSize: '1rem', fontWeight: 600 }}>品牌基本資料</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.88rem' }}>
                  <div><span style={{ color: '#888' }}>品牌中文：</span><strong>{selectedApp.brandNameZh || '-'}</strong></div>
                  <div><span style={{ color: '#888' }}>品牌英文：</span><strong>{selectedApp.brandNameEn || '-'}</strong></div>
                  <div><span style={{ color: '#888' }}>成立時間：</span>{selectedApp.foundedDate || '-'}</div>
                  <div><span style={{ color: '#888' }}>國家城市：</span>{selectedApp.country} / {selectedApp.city}</div>
                  <div><span style={{ color: '#888' }}>官方電話：</span>{selectedApp.phone || '-'}</div>
                  <div><span style={{ color: '#888' }}>官方電郵：</span><a href={`mailto:${selectedApp.email}`} style={{ color: '#000' }}>{selectedApp.email || '-'}</a></div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <span style={{ color: '#888' }}>官方網站/社群：</span>
                    {selectedApp.website ? (
                      <a href={selectedApp.website.startsWith('http') ? selectedApp.website : `https://${selectedApp.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#B29B6E', textDecoration: 'underline' }}>
                        {selectedApp.website} <ExternalLink size={10} style={{ display: 'inline' }} />
                      </a>
                    ) : '-'}
                  </div>
                </div>
              </div>

              {/* Section B: Contacts & Billing */}
              <div style={{ borderTop: '1px solid #EEE', paddingTop: '20px' }}>
                <span className="caps-label" style={{ color: '#888', fontSize: '0.7rem' }}>SECTION B</span>
                <h4 style={{ margin: '4px 0 16px', fontSize: '1rem', fontWeight: 600 }}>負責人、聯絡人與帳單開立</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.88rem' }}>
                  <div><span style={{ color: '#888' }}>品牌負責人：</span><strong>{selectedApp.ownerName}</strong></div>
                  <div><span style={{ color: '#888' }}>負責人手機：</span><a href={`tel:${selectedApp.ownerPhone}`} style={{ color: '#000' }}>{selectedApp.ownerPhone}</a></div>
                  <div><span style={{ color: '#888' }}>負責人電郵：</span><a href={`mailto:${selectedApp.ownerEmail}`} style={{ color: '#000' }}>{selectedApp.ownerEmail}</a></div>
                  <div><span style={{ color: '#888' }}>指定聯絡窗口：</span>{selectedApp.contactName} ({selectedApp.contactPhone || '-'})</div>
                  <div style={{ gridColumn: 'span 2' }}><span style={{ color: '#888' }}>聯繫地址：</span>{selectedApp.contactAddress || '-'}</div>
                  <div><span style={{ color: '#888' }}>發票抬頭：</span>{selectedApp.invoiceTitle || '-'}</div>
                  <div><span style={{ color: '#888' }}>統一編號：</span><strong>{selectedApp.taxId || '-'}</strong></div>
                  <div style={{ gridColumn: 'span 2' }}><span style={{ color: '#888' }}>帳單地址：</span>{selectedApp.billingAddress || '-'}</div>
                </div>
              </div>

              {/* Section C: Introduction & Links */}
              <div style={{ borderTop: '1px solid #EEE', paddingTop: '20px' }}>
                <span className="caps-label" style={{ color: '#888', fontSize: '0.7rem' }}>SECTION C</span>
                <h4 style={{ margin: '4px 0 16px', fontSize: '1rem', fontWeight: 600 }}>品牌核心簡介與外部連結</h4>
                
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ color: '#888', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>中文簡介：</span>
                  <div style={{ backgroundColor: '#FDFDFD', border: '1px solid #EFEFEF', padding: '14px', fontSize: '0.9rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                    {selectedApp.introZh || '無填寫'}
                  </div>
                </div>

                {selectedApp.introEn && (
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ color: '#888', fontSize: '0.75rem', display: 'block', marginBottom: '6px' }}>英文簡介：</span>
                    <div style={{ backgroundColor: '#FDFDFD', border: '1px solid #EFEFEF', padding: '14px', fontSize: '0.85rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', color: '#555' }}>
                      {selectedApp.introEn}
                    </div>
                  </div>
                )}

                {selectedApp.cloudDriveUrl && (
                  <div style={{ marginBottom: '14px' }}>
                    <span style={{ color: '#888', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>雲端資料夾連結：</span>
                    <a href={selectedApp.cloudDriveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'underline', fontSize: '0.9rem', wordBreak: 'break-all' }}>
                      {selectedApp.cloudDriveUrl} <ExternalLink size={12} style={{ display: 'inline' }} />
                    </a>
                  </div>
                )}

                {selectedApp.mediaLinks && (
                  <div>
                    <span style={{ color: '#888', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>媒體報導：</span>
                    <div style={{ fontSize: '0.85rem', color: '#444', whiteSpace: 'pre-wrap' }}>
                      {selectedApp.mediaLinks}
                    </div>
                  </div>
                )}
              </div>

              {/* Section D: Legal Signature */}
              <div style={{ borderTop: '1px solid #EEE', paddingTop: '20px', marginBottom: '20px' }}>
                <span className="caps-label" style={{ color: '#888', fontSize: '0.7rem' }}>SECTION D</span>
                <h4 style={{ margin: '4px 0 16px', fontSize: '1rem', fontWeight: 600 }}>法定簽字與日期</h4>
                <div style={{ display: 'flex', gap: '30px', fontSize: '0.88rem' }}>
                  <div><span style={{ color: '#888' }}>法定簽署人：</span><strong>{selectedApp.signatureName}</strong></div>
                  <div><span style={{ color: '#888' }}>簽署日期：</span>{selectedApp.signedAt}</div>
                  <div><span style={{ color: '#888' }}>系統收件時間：</span>{selectedApp.submittedAt}</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* FULL RESOLUTION LIGHTBOX */}
      {lightboxUrl && (
        <div 
          onClick={() => setLightboxUrl(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.88)',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            cursor: 'zoom-out'
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={lightboxUrl} 
            alt="Preview" 
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} 
          />
          <button
            type="button"
            onClick={() => setLightboxUrl(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              backgroundColor: 'transparent',
              color: '#FFF',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <X size={32} />
          </button>
        </div>
      )}

    </div>
  );
}
