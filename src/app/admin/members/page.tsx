"use client";

import { useEffect, useState, useMemo, useCallback } from 'react';
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
  Eye, 
  Trash2, 
  X, 
  Copy, 
  Check, 
  Maximize2,
  Send,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
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
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Lightbox for previewing images
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  // Official Bank Info (VIS / 泰德文化創意社 玉山銀行)
  const [bankInfo, setBankInfo] = useState({
    bankName: '808 玉山銀行 / 中崙分行',
    accountNumber: '0912940021772',
    accountName: '泰德文化創意社（或 泰德文化創意社郭芝妘，視各家銀行系統規定而異）',
    swiftCode: 'ESUNTWTP',
    beneficiaryName: 'ART PRESS and Life Co.',
    beneficiaryBranch: 'E.Sun Bank / Zhonglun Branch'
  });
  const [includeIntlWire, setIncludeIntlWire] = useState(true);
  const [showEmailPreview, setShowEmailPreview] = useState(true);
  const [customEmailBody, setCustomEmailBody] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);
  const [subjectCopied, setSubjectCopied] = useState(false);

  const generateApprovalEmail = useCallback((app: ClubApplication) => {
    const tier = MEMBERSHIP_TIER_CONFIG[app.membershipTier] || MEMBERSHIP_TIER_CONFIG.basic;
    const recipient = app.ownerName || app.contactName || '貴賓';
    const brand = app.brandNameZh || app.brandNameEn || '貴品牌';

    const intlSection = includeIntlWire
      ? `\n【國際匯款資訊 International Remittance】
• SWIFT CODE：${bankInfo.swiftCode}
• BENEFICIARY'S NAME：${bankInfo.beneficiaryName}
• BENEFICIARY BRANCH：${bankInfo.beneficiaryBranch}
• ACCOUNT NUMBER：${bankInfo.accountNumber}\n`
      : '';

    return {
      subject: `【Looom Club】恭喜入選官方會籍審核通知及繳費指引 — ${brand}`,
      body: `親愛的 ${recipient} 您好，

感謝您申請加入 Looom Club。

我們非常榮幸地通知您，經 Looom Club 官方審核委員會評估，貴品牌的理念與我們所追求的美學商業實務價值高度契合，已正式通過會籍審核！

【入選會籍資訊】
• 申請品牌：${brand}
• 會籍方案：${tier.nameZh}（${tier.nameEn}）
• 方案年費：${tier.priceLabel}（未稅）
• 會籍核心權益：
  - I. 產業戰略陪跑：十二個月內線上諮詢總時數 ${app.membershipTier === 'premium' ? '6' : '1'} 小時
  - II. 閉門共學季會：每季一次，全年共四次（僅限會員參與之深度實務聚會）
  - 封閉會員制創辦人跨界交流網絡
${app.membershipTier === 'premium' ? '  - III. 精準貴賓導入：每年一次依品牌需求邀約具品味與消費潛力之合適貴賓\n' : ''}
【國內會費轉帳資訊 Domestic Remittance】
• 銀行／分行：${bankInfo.bankName}
• 銀行帳號：${bankInfo.accountNumber}
• 帳戶戶名：${bankInfo.accountName}
• 應繳金額：${tier.priceLabel}
• 繳費期限：收到本通知信起 5 個工作天內
${intlSection}
【匯款完成回覆確認】
• 匯款時請於備註欄註明「${brand} Looom會費」。
• 完成匯款後，請直接回覆本信並提供您的「匯款帳號後五碼」（或匯款單據截圖）以及「發票抬頭與統一編號（若需開立三聯式發票，目前填載為：${app.invoiceTitle || '未填'} / ${app.taxId || '未填'}）」。
• 我們將於確認收到款項後，立即為您寄發正式收據與 Looom Club 會員迎新啟動指南。

再次誠摯歡迎您加入 Looom Club！

Looom Club 執委會 敬上
官方信箱：looom@theartpressasia.com
會員服務：looom.member@gmail.com`
    };
  }, [bankInfo, includeIntlWire]);

  // Keep customEmailBody synced when app or bankInfo changes
  useEffect(() => {
    if (selectedApp) {
      setCustomEmailBody(generateApprovalEmail(selectedApp).body);
    }
  }, [selectedApp, generateApprovalEmail]);

  useEffect(() => {
    loadApplications();
  }, []);

  // ESC key handler to close Lightbox or Drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxUrl) {
          setLightboxUrl(null);
        } else if (selectedApp) {
          setSelectedApp(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxUrl, selectedApp]);

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
    setSaveSuccessMsg('');
  };

  const handleCloseDetail = () => {
    setSelectedApp(null);
    setSaveSuccessMsg('');
  };

  // Auto-save when status dropdown changes so admin never forgets to click Save
  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    setEditingStatus(newStatus);
    if (!selectedApp) return;
    setIsUpdating(true);
    setSaveSuccessMsg('');
    const ok = await updateClubApplication(selectedApp.id, {
      status: newStatus,
      adminNotes: editingNotes
    });
    setIsUpdating(false);

    if (ok) {
      setApplications(prev => prev.map(a => 
        a.id === selectedApp.id ? { ...a, status: newStatus, adminNotes: editingNotes } : a
      ));
      setSelectedApp(prev => prev ? { ...prev, status: newStatus, adminNotes: editingNotes } : null);
      setSaveSuccessMsg(`✓ 狀態已自動更新為「${STATUS_CONFIG[newStatus]?.label}」`);
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    } else {
      alert('狀態更新失敗，請確認網路連線。');
    }
  };

  const handleSaveStatus = async () => {
    if (!selectedApp) return;
    setIsUpdating(true);
    setSaveSuccessMsg('');
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
      setSaveSuccessMsg('✓ 審核狀態與內部備註已成功儲存！');
      setTimeout(() => setSaveSuccessMsg(''), 4000);
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

  const formatDateTime = (isoOrDate?: string) => {
    if (!isoOrDate) return '-';
    try {
      const d = new Date(isoOrDate);
      if (isNaN(d.getTime())) return isoOrDate;
      return d.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch {
      return isoOrDate;
    }
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
      if (statusFilter !== 'all' && app.status !== statusFilter) return false;
      if (tierFilter !== 'all' && app.membershipTier !== tierFilter) return false;
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

  // Previous / Next navigation inside drawer
  const currentIndex = useMemo(() => {
    if (!selectedApp) return -1;
    return filteredApplications.findIndex(a => a.id === selectedApp.id);
  }, [selectedApp, filteredApplications]);

  const handlePrevApp = () => {
    if (currentIndex > 0) {
      handleOpenDetail(filteredApplications[currentIndex - 1]);
    }
  };

  const handleNextApp = () => {
    if (currentIndex >= 0 && currentIndex < filteredApplications.length - 1) {
      handleOpenDetail(filteredApplications[currentIndex + 1]);
    }
  };

  return (
    <div className="looom-admin-members-wrap" style={{ padding: '40px 48px', maxWidth: '1440px', margin: '0 auto', color: '#111' }}>
      <style>{`
        @media (max-width: 768px) {
          .looom-admin-members-wrap {
            padding: 24px 16px !important;
          }
          .looom-admin-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .looom-admin-drawer-grid {
            grid-template-columns: 1fr !important;
          }
          .looom-admin-drawer-span2 {
            grid-column: span 1 !important;
          }
          .looom-admin-drawer-header {
            padding: 16px !important;
          }
          .looom-admin-drawer-body {
            padding: 20px 16px !important;
          }
        }
      `}</style>
      
      {/* Header */}
      <div className="looom-admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <span className="caps-label" style={{ color: '#B29B6E', fontWeight: 600, letterSpacing: '0.2em' }}>
            LOOOM CLUB
          </span>
          <h2 className="serif" style={{ fontSize: '2.4rem', fontWeight: 400, marginTop: '4px', margin: 0 }}>
            會員入會申請名冊
          </h2>
          <p style={{ color: '#777', fontSize: '0.9rem', marginTop: '6px' }}>
            管理與審核正式官方會員申請名單、寄發入選匯款通知信與匯出名冊（點擊下方指標卡或列表可快速檢視）
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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

      {/* Interactive Overview Metrics Cards (Click to filter) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div 
          onClick={() => setStatusFilter('all')}
          style={{ 
            backgroundColor: statusFilter === 'all' ? '#111' : '#FFF', 
            color: statusFilter === 'all' ? '#FFF' : '#111',
            border: statusFilter === 'all' ? '1px solid #111' : '1px solid #E8E8E8', 
            padding: '18px 22px',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
        >
          <span style={{ fontSize: '0.75rem', color: statusFilter === 'all' ? '#CCC' : '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>總申請數 All</span>
          <div className="serif" style={{ fontSize: '2.1rem', fontWeight: 600, marginTop: '4px' }}>{metrics.total}</div>
        </div>

        <div 
          onClick={() => setStatusFilter(statusFilter === 'pending' ? 'all' : 'pending')}
          style={{ 
            backgroundColor: statusFilter === 'pending' ? '#FEF3C7' : '#FFF', 
            border: statusFilter === 'pending' ? '2px solid #B45309' : '1px solid #E8E8E8', 
            borderLeft: '4px solid #B45309', 
            padding: '18px 22px',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>待審核 Pending</span>
          <div className="serif" style={{ fontSize: '2.1rem', fontWeight: 600, marginTop: '4px', color: '#B45309' }}>{metrics.pending}</div>
        </div>

        <div 
          onClick={() => setStatusFilter(statusFilter === 'approved' ? 'all' : 'approved')}
          style={{ 
            backgroundColor: statusFilter === 'approved' ? '#D1FAE5' : '#FFF', 
            border: statusFilter === 'approved' ? '2px solid #065F46' : '1px solid #E8E8E8', 
            borderLeft: '4px solid #065F46', 
            padding: '18px 22px',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#065F46', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>已核准 Approved</span>
          <div className="serif" style={{ fontSize: '2.1rem', fontWeight: 600, marginTop: '4px', color: '#065F46' }}>{metrics.approved}</div>
        </div>

        <div 
          onClick={() => setStatusFilter(statusFilter === 'revision' ? 'all' : 'revision')}
          style={{ 
            backgroundColor: statusFilter === 'revision' ? '#DBEAFE' : '#FFF', 
            border: statusFilter === 'revision' ? '2px solid #1E40AF' : '1px solid #E8E8E8', 
            borderLeft: '4px solid #1E40AF', 
            padding: '18px 22px',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#1E40AF', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>需補件 Revision</span>
          <div className="serif" style={{ fontSize: '2.1rem', fontWeight: 600, marginTop: '4px', color: '#1E40AF' }}>{metrics.revision}</div>
        </div>

        <div 
          onClick={() => setStatusFilter(statusFilter === 'rejected' ? 'all' : 'rejected')}
          style={{ 
            backgroundColor: statusFilter === 'rejected' ? '#FEE2E2' : '#FFF', 
            border: statusFilter === 'rejected' ? '2px solid #991B1B' : '1px solid #E8E8E8', 
            borderLeft: '4px solid #991B1B', 
            padding: '18px 22px',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#991B1B', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>未通過 Rejected</span>
          <div className="serif" style={{ fontSize: '2.1rem', fontWeight: 600, marginTop: '4px', color: '#991B1B' }}>{metrics.rejected}</div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div style={{ backgroundColor: '#FFF', border: '1px solid #E8E8E8', padding: '16px 22px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
        
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1 1 280px' }}>
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
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem', minWidth: '860px' }}>
            <thead>
              <tr style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E8E8E8', color: '#555' }}>
                <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>品牌名稱 / 會籍方案</th>
                <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>品牌負責人</th>
                <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>聯絡方式</th>
                <th style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>品牌素材與附件</th>
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
                    onClick={() => handleOpenDetail(app)}
                    style={{ borderBottom: '1px solid #EFEFEF', transition: 'background-color 0.15s', cursor: 'pointer' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9F9F9'}
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
                      <div style={{ marginTop: '4px', display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
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
                      {app.adminNotes && (
                        <div style={{ marginTop: '6px', fontSize: '0.75rem', color: '#B29B6E', maxWidth: '260px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          備註：{app.adminNotes}
                        </div>
                      )}
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

                    {/* Brand Media & Attachments */}
                    <td style={{ padding: '18px 20px' }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {app.brandImages && app.brandImages.length > 0 ? (
                          <button
                            type="button"
                            onClick={() => setLightboxUrl(app.brandImages![0])}
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
                            <Maximize2 size={11} /> 照片 ({app.brandImages.length})
                          </button>
                        ) : (
                          !app.cloudDriveUrl && <span style={{ fontSize: '0.75rem', color: '#AAA' }}>無照片附件</span>
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
                              textDecoration: 'none',
                              fontWeight: 500
                            }}
                          >
                            雲端資料夾 <ExternalLink size={10} />
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
                    <td style={{ padding: '18px 20px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
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
                            padding: '7px 14px',
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

      {/* DETAIL DRAWER / MODAL (zIndex 2000 > .global-nav 1000 so top bar is NEVER covered!) */}
      {selectedApp && (
        <div 
          onClick={handleCloseDetail}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.55)',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'flex-end',
            backdropFilter: 'blur(3px)'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '860px',
              backgroundColor: '#FFF',
              height: '100%',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-12px 0 45px rgba(0,0,0,0.18)'
            }}
          >
            
            {/* Sticky Drawer Top Navigation Bar (Always visible while scrolling) */}
            <div 
              className="looom-admin-drawer-header"
              style={{ 
                position: 'sticky',
                top: 0,
                zIndex: 20,
                padding: '18px 28px', 
                borderBottom: '1px solid #E2E2E2', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                backgroundColor: '#FAFAFA',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  type="button"
                  onClick={handleCloseDetail}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: '#000',
                    color: '#FFF',
                    border: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    letterSpacing: '0.05em'
                  }}
                >
                  <ArrowLeft size={15} /> 返回名冊列表（上一頁）
                </button>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 className="serif" style={{ fontSize: '1.35rem', fontWeight: 600, margin: 0 }}>
                      {selectedApp.brandNameZh || selectedApp.brandNameEn}
                    </h3>
                    <span style={{
                      padding: '2px 8px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      backgroundColor: (STATUS_CONFIG[selectedApp.status] || STATUS_CONFIG.pending).bg,
                      color: (STATUS_CONFIG[selectedApp.status] || STATUS_CONFIG.pending).color,
                      border: `1px solid ${(STATUS_CONFIG[selectedApp.status] || STATUS_CONFIG.pending).border}`
                    }}>
                      {(STATUS_CONFIG[selectedApp.status] || STATUS_CONFIG.pending).label}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>
                    申請編號: {selectedApp.id.slice(0, 13).toUpperCase()}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {/* Prev / Next Application Switcher */}
                {filteredApplications.length > 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #DDD', backgroundColor: '#FFF', marginRight: '4px' }}>
                    <button
                      type="button"
                      onClick={handlePrevApp}
                      disabled={currentIndex <= 0}
                      title="上一筆申請"
                      style={{
                        padding: '7px 10px',
                        background: 'none',
                        border: 'none',
                        borderRight: '1px solid #EEE',
                        cursor: currentIndex <= 0 ? 'not-allowed' : 'pointer',
                        color: currentIndex <= 0 ? '#CCC' : '#333',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <span style={{ padding: '0 10px', fontSize: '0.75rem', color: '#666' }}>
                      {currentIndex + 1} / {filteredApplications.length}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextApp}
                      disabled={currentIndex >= filteredApplications.length - 1}
                      title="下一筆申請"
                      style={{
                        padding: '7px 10px',
                        background: 'none',
                        border: 'none',
                        borderLeft: '1px solid #EEE',
                        cursor: currentIndex >= filteredApplications.length - 1 ? 'not-allowed' : 'pointer',
                        color: currentIndex >= filteredApplications.length - 1 ? '#CCC' : '#333',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleCopyContacts(selectedApp)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
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
                  title="關閉視窗 (ESC)"
                  style={{ 
                    background: '#FFF', 
                    border: '1px solid #DDD', 
                    cursor: 'pointer', 
                    padding: '7px', 
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Drawer Body */}
            <div className="looom-admin-drawer-body" style={{ padding: '28px 30px', display: 'flex', flexDirection: 'column', gap: '28px', flex: 1 }}>
              
              {/* Status Action Console Card */}
              <div style={{ backgroundColor: '#F9F9F9', border: '1px solid #E5E5E5', padding: '22px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: '#000' }}>
                    審核決策與內部備註 (Review Action)
                  </h4>
                  {saveSuccessMsg && (
                    <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600, backgroundColor: '#D1FAE5', padding: '4px 10px', border: '1px solid #A7F3D0' }}>
                      {saveSuccessMsg}
                    </span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#555', marginBottom: '6px', fontWeight: 600 }}>
                      變更審核狀態 Status（切換即自動儲存）
                    </label>
                    <select
                      value={editingStatus}
                      onChange={(e) => handleStatusChange(e.target.value as ApplicationStatus)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #999', fontSize: '0.9rem', backgroundColor: '#FFF', outline: 'none', fontWeight: 600, cursor: 'pointer' }}
                    >
                      <option value="pending">待審核 (Pending)</option>
                      <option value="approved">審核通過 (Approved - 展開入選匯款通知信)</option>
                      <option value="revision">需補件 (Needs Revision)</option>
                      <option value="rejected">未通過 (Rejected)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#555', marginBottom: '6px', fontWeight: 600 }}>
                      申請會籍等級 Tier
                    </label>
                    <div style={{ padding: '10px 12px', border: '1px solid #E2E2E2', backgroundColor: '#FFF', fontSize: '0.9rem', fontWeight: 600 }}>
                      {MEMBERSHIP_TIER_CONFIG[selectedApp.membershipTier]?.nameZh} ({MEMBERSHIP_TIER_CONFIG[selectedApp.membershipTier]?.priceLabel})
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#555', marginBottom: '6px', fontWeight: 600 }}>
                    管理員內部備註 (Admin Notes - 僅內部可見，可記錄匯款後五碼、開票狀態等)
                  </label>
                  <textarea
                    rows={3}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="例：11/09 已寄送入選匯款通知信；已確認收到玉山銀行 18,800 元款項（後五碼 12345）；三聯式發票已開立..."
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #CCC', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', backgroundColor: '#FFF' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px' }}>
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
                    <CheckCircle size={15} /> {isUpdating ? '儲存中...' : '儲存審核紀錄與備註'}
                  </button>
                </div>
              </div>

              {/* Approval Email Dispatch Box (VIS 泰德文化創意社 玉山銀行) */}
              {(editingStatus === 'approved' || selectedApp.status === 'approved') && (
                <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #86EFAC', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <span className="caps-label" style={{ color: '#166534', fontSize: '0.7rem', fontWeight: 700 }}>
                        OFFICIAL ACCEPTANCE & REMITTANCE DISPATCH
                      </span>
                      <h4 style={{ margin: '2px 0 0', fontSize: '1.1rem', fontWeight: 600, color: '#14532D' }}>
                        寄送官方入選專函與匯款指引信（泰德文化創意社／玉山銀行）
                      </h4>
                      <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#15803D' }}>
                        收件人：<strong>{selectedApp.ownerName}</strong>（<a href={`mailto:${selectedApp.ownerEmail || selectedApp.email}`} style={{ color: '#166534', textDecoration: 'underline' }}>{selectedApp.ownerEmail || selectedApp.email}</a>）｜應繳年費：<strong>{MEMBERSHIP_TIER_CONFIG[selectedApp.membershipTier]?.priceLabel}</strong>
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => {
                          const mail = generateApprovalEmail(selectedApp);
                          navigator.clipboard.writeText(mail.subject);
                          setSubjectCopied(true);
                          setTimeout(() => setSubjectCopied(false), 2000);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '8px 12px',
                          fontSize: '0.75rem',
                          backgroundColor: '#FFF',
                          border: '1px solid #86EFAC',
                          color: '#15803D',
                          cursor: 'pointer',
                          fontWeight: 500
                        }}
                      >
                        {subjectCopied ? <Check size={13} /> : <Copy size={13} />}
                        {subjectCopied ? '已複製主旨' : '複製信件主旨'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const mail = generateApprovalEmail(selectedApp);
                          navigator.clipboard.writeText(`主旨：${mail.subject}\n\n${customEmailBody}`);
                          setEmailCopied(true);
                          setTimeout(() => setEmailCopied(false), 2000);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          fontSize: '0.75rem',
                          backgroundColor: '#FFF',
                          border: '1px solid #166534',
                          color: '#166534',
                          cursor: 'pointer',
                          fontWeight: 600
                        }}
                      >
                        {emailCopied ? <Check size={13} /> : <Copy size={13} />}
                        {emailCopied ? '✓ 已複製完整通知信' : '複製完整通知信'}
                      </button>

                      <a
                        href={`mailto:${selectedApp.ownerEmail || selectedApp.email}?subject=${encodeURIComponent(generateApprovalEmail(selectedApp).subject)}&body=${encodeURIComponent(customEmailBody)}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 16px',
                          fontSize: '0.75rem',
                          backgroundColor: '#166534',
                          color: '#FFF',
                          textDecoration: 'none',
                          fontWeight: 600
                        }}
                      >
                        <Send size={13} /> 開啟郵件軟體寄發
                      </a>
                    </div>
                  </div>

                  {/* Official Remittance Account Summary Card */}
                  <div style={{ backgroundColor: '#FFF', border: '1px solid #BBF7D0', padding: '16px 18px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#14532D', letterSpacing: '0.05em' }}>
                        🏦 指定匯款帳戶（已預設帶入泰德文化創意社玉山銀行資訊，可直接微調）：
                      </span>
                      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#166534', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={includeIntlWire}
                          onChange={(e) => setIncludeIntlWire(e.target.checked)}
                          style={{ accentColor: '#166534' }}
                        />
                        信件內同時附加上國際匯款資訊 (SWIFT: ESUNTWTP)
                      </label>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginBottom: '4px' }}>銀行／分行 BANK / BRANCH</label>
                        <input
                          type="text"
                          value={bankInfo.bankName}
                          onChange={(e) => setBankInfo(prev => ({ ...prev, bankName: e.target.value }))}
                          style={{ width: '100%', padding: '7px 10px', fontSize: '0.82rem', border: '1px solid #86EFAC', backgroundColor: '#FFF', fontWeight: 600 }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginBottom: '4px' }}>銀行帳號 ACCOUNT NUMBER</label>
                        <input
                          type="text"
                          value={bankInfo.accountNumber}
                          onChange={(e) => setBankInfo(prev => ({ ...prev, accountNumber: e.target.value }))}
                          style={{ width: '100%', padding: '7px 10px', fontSize: '0.82rem', border: '1px solid #86EFAC', backgroundColor: '#FFF', fontFamily: 'monospace', fontWeight: 700, color: '#B45309' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#666', marginBottom: '4px' }}>帳戶戶名 ACCOUNT NAME</label>
                        <input
                          type="text"
                          value={bankInfo.accountName}
                          onChange={(e) => setBankInfo(prev => ({ ...prev, accountName: e.target.value }))}
                          style={{ width: '100%', padding: '7px 10px', fontSize: '0.82rem', border: '1px solid #86EFAC', backgroundColor: '#FFF', fontWeight: 600 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Live Email Preview & Editable Textarea */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowEmailPreview(prev => !prev)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: '#166534',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginBottom: '8px'
                      }}
                    >
                      {showEmailPreview ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {showEmailPreview ? '收合通知信內文預覽（可直接於下方框內修改信件文字）' : '展開檢視／編輯通知信完整內文'}
                    </button>

                    {showEmailPreview && (
                      <div style={{ backgroundColor: '#FFF', border: '1px solid #86EFAC', padding: '12px' }}>
                        <div style={{ fontSize: '0.78rem', color: '#444', paddingBottom: '8px', marginBottom: '8px', borderBottom: '1px solid #EEE' }}>
                          <strong>信件主旨：</strong>{generateApprovalEmail(selectedApp).subject}
                        </div>
                        <textarea
                          rows={14}
                          value={customEmailBody}
                          onChange={(e) => setCustomEmailBody(e.target.value)}
                          style={{
                            width: '100%',
                            border: 'none',
                            outline: 'none',
                            fontSize: '0.82rem',
                            lineHeight: 1.65,
                            color: '#222',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

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
                    品牌代表照片 ({selectedApp.brandImages.length} 張，點擊可放大檢視)
                  </h5>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {selectedApp.brandImages.map((imgUrl, i) => (
                      <div 
                        key={i} 
                        onClick={() => setLightboxUrl(imgUrl)}
                        style={{ width: '110px', height: '110px', border: '1px solid #DDD', cursor: 'pointer', overflow: 'hidden' }}
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
                <div className="looom-admin-drawer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.88rem' }}>
                  <div><span style={{ color: '#888' }}>品牌中文：</span><strong>{selectedApp.brandNameZh || '-'}</strong></div>
                  <div><span style={{ color: '#888' }}>品牌英文：</span><strong>{selectedApp.brandNameEn || '-'}</strong></div>
                  <div><span style={{ color: '#888' }}>成立時間：</span>{selectedApp.foundedDate || '-'}</div>
                  <div><span style={{ color: '#888' }}>國家城市：</span>{selectedApp.country} / {selectedApp.city}</div>
                  <div><span style={{ color: '#888' }}>官方電話：</span>{selectedApp.phone || '-'}</div>
                  <div><span style={{ color: '#888' }}>官方電郵：</span><a href={`mailto:${selectedApp.email}`} style={{ color: '#000', textDecoration: 'underline' }}>{selectedApp.email || '-'}</a></div>
                  <div className="looom-admin-drawer-span2" style={{ gridColumn: 'span 2' }}>
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
                <div className="looom-admin-drawer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.88rem' }}>
                  <div><span style={{ color: '#888' }}>品牌負責人：</span><strong>{selectedApp.ownerName}</strong></div>
                  <div><span style={{ color: '#888' }}>負責人手機：</span><a href={`tel:${selectedApp.ownerPhone}`} style={{ color: '#000' }}>{selectedApp.ownerPhone}</a></div>
                  <div><span style={{ color: '#888' }}>負責人電郵：</span><a href={`mailto:${selectedApp.ownerEmail}`} style={{ color: '#000', textDecoration: 'underline' }}>{selectedApp.ownerEmail}</a></div>
                  <div><span style={{ color: '#888' }}>指定聯絡窗口：</span>{selectedApp.contactName} ({selectedApp.contactPhone || '-'})</div>
                  <div className="looom-admin-drawer-span2" style={{ gridColumn: 'span 2' }}><span style={{ color: '#888' }}>聯繫地址：</span>{selectedApp.contactAddress || '-'}</div>
                  <div><span style={{ color: '#888' }}>發票抬頭：</span>{selectedApp.invoiceTitle || '-'}</div>
                  <div><span style={{ color: '#888' }}>統一編號：</span><strong>{selectedApp.taxId || '-'}</strong></div>
                  <div className="looom-admin-drawer-span2" style={{ gridColumn: 'span 2' }}><span style={{ color: '#888' }}>帳單地址：</span>{selectedApp.billingAddress || '-'}</div>
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
              <div style={{ borderTop: '1px solid #EEE', paddingTop: '20px', marginBottom: '10px' }}>
                <span className="caps-label" style={{ color: '#888', fontSize: '0.7rem' }}>SECTION D</span>
                <h4 style={{ margin: '4px 0 16px', fontSize: '1rem', fontWeight: 600 }}>法定簽字與日期</h4>
                <div style={{ display: 'flex', gap: '28px', fontSize: '0.88rem', flexWrap: 'wrap' }}>
                  <div><span style={{ color: '#888' }}>法定簽署人：</span><strong>{selectedApp.signatureName}</strong></div>
                  <div><span style={{ color: '#888' }}>簽署日期：</span>{selectedApp.signedAt}</div>
                  <div><span style={{ color: '#888' }}>系統收件時間：</span>{formatDateTime(selectedApp.submittedAt)}</div>
                </div>
              </div>

            </div>

            {/* Sticky Bottom Bar for Easy Return & Save */}
            <div style={{
              position: 'sticky',
              bottom: 0,
              zIndex: 20,
              padding: '16px 28px',
              backgroundColor: '#FAFAFA',
              borderTop: '1px solid #E2E2E2',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <button
                type="button"
                onClick={handleCloseDetail}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  backgroundColor: '#FFF',
                  color: '#111',
                  border: '1px solid #CCC',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={15} /> 返回上一頁（名冊列表）
              </button>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => handleDelete(selectedApp.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 16px',
                    backgroundColor: '#FFF',
                    color: '#EF4444',
                    border: '1px solid #FECACA',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={14} /> 刪除此筆申請
                </button>

                <button
                  type="button"
                  onClick={handleSaveStatus}
                  disabled={isUpdating}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#000',
                    color: '#FFF',
                    padding: '10px 24px',
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

          </div>
        </div>
      )}

      {/* FULL RESOLUTION LIGHTBOX (zIndex 2100) */}
      {lightboxUrl && (
        <div 
          onClick={() => setLightboxUrl(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.88)',
            zIndex: 2100,
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
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: '#FFF',
              border: '1px solid #666',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <X size={20} /> 關閉預覽 (ESC)
          </button>
        </div>
      )}

    </div>
  );
}
