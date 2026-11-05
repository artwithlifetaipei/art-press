import { supabase } from './supabase';

export type MembershipTier = 'basic' | 'premium';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'revision';

export interface ClubApplication {
  id: string;
  submittedAt: string;
  membershipTier: MembershipTier;
  brandNameZh: string;
  brandNameEn: string;
  foundedDate: string;
  country: string;
  city: string;
  website: string;
  phone: string;
  email: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  invoiceTitle: string;
  taxId: string;
  billingAddress: string;
  introZh: string;
  introEn?: string;
  cloudDriveUrl?: string;
  remittanceImageUrl?: string;
  brandImages?: string[];
  mediaLinks?: string;
  signatureName: string;
  signedAt: string;
  status: ApplicationStatus;
  adminNotes?: string;
}

export const MEMBERSHIP_TIER_CONFIG = {
  basic: {
    nameZh: '基礎會籍 12 個月',
    nameEn: 'Membership for 12 Months',
    price: 18800,
    priceLabel: 'NTD 18,800 / 年',
    features: [
      '「I. 產業戰略陪跑」：十二個月內線上諮詢總時數 1 小時',
      '「II. 閉門共學季會」：每季一次，全年共四次。僅限會員閉門深度共學',
      '封閉會員制社群網絡與品牌決策者直接交流'
    ]
  },
  premium: {
    nameZh: 'Premium 會籍 12 個月',
    nameEn: 'Membership for 12 Months Premium',
    price: 28800,
    priceLabel: 'NTD 28,800 / 年',
    features: [
      '「I. 產業戰略陪跑」：十二個月內線上諮詢總時數 6 小時',
      '「II. 閉門共學季會」：每季一次，全年共四次。僅限會員閉門深度共學',
      '「III. 精準貴賓導入」：每年一次精準貴賓導入，邀約具品味與消費潛力之特定貴賓',
      '封閉會員制社群網絡與跨界決策者優先對接'
    ]
  }
};

export const STATUS_CONFIG: Record<ApplicationStatus, { label: string; color: string; bg: string; border: string }> = {
  pending: {
    label: '待審核 Pending',
    color: '#B45309',
    bg: '#FEF3C7',
    border: '#FDE68A'
  },
  approved: {
    label: '審核通過 Approved',
    color: '#065F46',
    bg: '#D1FAE5',
    border: '#A7F3D0'
  },
  revision: {
    label: '需補件 Needs Revision',
    color: '#1E40AF',
    bg: '#DBEAFE',
    border: '#BFDBFE'
  },
  rejected: {
    label: '未通過 Rejected',
    color: '#991B1B',
    bg: '#FEE2E2',
    border: '#FECACA'
  }
};

/**
 * Submit a new application into Supabase
 */
export async function submitClubApplication(appData: Omit<ClubApplication, 'id' | 'submittedAt' | 'status'>): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `app-${Date.now()}`;
    const submittedAt = new Date().toISOString();
    const status: ApplicationStatus = 'pending';

    const fullApplication: ClubApplication = {
      ...appData,
      id,
      submittedAt,
      status,
      adminNotes: ''
    };

    const rowPayload = {
      id,
      slug: `looom-app-${id.slice(0, 8)}`,
      title: `[Looom Club] ${appData.brandNameZh || appData.brandNameEn || '新申請'} - ${appData.ownerName || ''}`,
      subtitle: `${MEMBERSHIP_TIER_CONFIG[appData.membershipTier]?.nameZh || '會籍申請'} (${MEMBERSHIP_TIER_CONFIG[appData.membershipTier]?.priceLabel})`,
      tag: 'pending',
      date: new Date().toISOString().slice(0, 10),
      author: appData.brandNameZh || appData.brandNameEn || appData.ownerName || 'Applicant',
      image: appData.remittanceImageUrl || (appData.brandImages && appData.brandImages[0]) || '',
      image_caption: `匯款證明: ${appData.invoiceTitle ? `發票抬頭 ${appData.invoiceTitle}` : '無統編'} / 統編 ${appData.taxId || '無'}`,
      content: JSON.stringify(fullApplication),
      status: 'pending',
      category: 'looom_application',
      english_title: appData.brandNameEn || appData.brandNameZh || 'Looom Club Application',
      is_hero: false
    };

    const { error } = await supabase.from('articles').insert([rowPayload]);
    if (error) throw error;

    return { success: true, id };
  } catch (err: any) {
    console.error('Failed to submit application:', err);
    return { success: false, error: err.message || '提交失敗，請稍後再試。' };
  }
}

/**
 * Fetch all applications for Admin
 */
export async function fetchClubApplications(): Promise<ClubApplication[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('category', 'looom_application')
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data) return [];

    return data.map((item) => {
      try {
        const parsed = JSON.parse(item.content);
        return {
          ...parsed,
          id: item.id,
          status: item.tag || parsed.status || 'pending',
          submittedAt: parsed.submittedAt || item.created_at || item.date
        };
      } catch (e) {
        return {
          id: item.id,
          submittedAt: item.created_at || item.date,
          membershipTier: 'basic',
          brandNameZh: item.author || '',
          brandNameEn: item.english_title || '',
          foundedDate: '',
          country: '',
          city: '',
          website: '',
          phone: '',
          email: '',
          ownerName: '',
          ownerPhone: '',
          ownerEmail: '',
          contactName: '',
          contactPhone: '',
          contactEmail: '',
          contactAddress: '',
          invoiceTitle: '',
          taxId: '',
          billingAddress: '',
          introZh: item.title || '',
          signatureName: '',
          signedAt: item.date || '',
          status: (item.tag as ApplicationStatus) || 'pending',
          adminNotes: ''
        };
      }
    });
  } catch (err) {
    console.error('Error fetching applications:', err);
    return [];
  }
}

/**
 * Update application status and admin notes
 */
export async function updateClubApplication(
  id: string, 
  updates: { status?: ApplicationStatus; adminNotes?: string }
): Promise<boolean> {
  try {
    const { data, error: fetchErr } = await supabase
      .from('articles')
      .select('content')
      .eq('id', id)
      .single();

    if (fetchErr) throw fetchErr;

    let parsedContent: Partial<ClubApplication> = {};
    try {
      parsedContent = JSON.parse(data.content);
    } catch (e) {}

    const updatedContent = {
      ...parsedContent,
      ...(updates.status ? { status: updates.status } : {}),
      ...(updates.adminNotes !== undefined ? { adminNotes: updates.adminNotes } : {})
    };

    const rowUpdates: any = {
      content: JSON.stringify(updatedContent)
    };
    if (updates.status) {
      rowUpdates.tag = updates.status;
      rowUpdates.status = updates.status;
    }

    const { error: updateErr } = await supabase
      .from('articles')
      .update(rowUpdates)
      .eq('id', id);

    if (updateErr) throw updateErr;
    return true;
  } catch (err) {
    console.error('Failed to update application:', err);
    return false;
  }
}

/**
 * Delete an application
 */
export async function deleteClubApplication(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Failed to delete application:', err);
    return false;
  }
}

/**
 * Convert applications list to downloadable CSV format
 */
export function exportApplicationsToCSV(applications: ClubApplication[]) {
  const headers = [
    '申請編號 (ID)',
    '遞交時間 (Submitted At)',
    '審核狀態 (Status)',
    '會籍類別 (Tier)',
    '品牌中文名 (Brand Zh)',
    '品牌英文名 (Brand En)',
    '成立時間 (Founded)',
    '國家 (Country)',
    '城市 (City)',
    '官方網址/社群 (Website)',
    '品牌電話 (Phone)',
    '品牌電郵 (Email)',
    '負責人姓名 (Owner Name)',
    '負責人手機 (Owner Phone)',
    '負責人電郵 (Owner Email)',
    '聯絡人姓名 (Contact Name)',
    '聯絡人手機 (Contact Phone)',
    '聯絡人電郵 (Contact Email)',
    '聯繫地址 (Address)',
    '發票抬頭 (Invoice Title)',
    '統一編號 (Tax ID)',
    '帳單地址 (Billing Address)',
    '品牌中文簡介 (Intro Zh)',
    '品牌英文簡介 (Intro En)',
    '雲端硬碟連結 (Cloud Drive URL)',
    '匯款憑證連結 (Remittance Image)',
    '代表照片數量 (Brand Images Count)',
    '法定簽署姓名 (Signature Name)',
    '簽署日期 (Signed At)',
    '管理員內部備註 (Admin Notes)'
  ];

  const escapeCSV = (val: any) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = applications.map((app) => [
    escapeCSV(app.id),
    escapeCSV(app.submittedAt),
    escapeCSV(STATUS_CONFIG[app.status]?.label || app.status),
    escapeCSV(MEMBERSHIP_TIER_CONFIG[app.membershipTier]?.nameZh || app.membershipTier),
    escapeCSV(app.brandNameZh),
    escapeCSV(app.brandNameEn),
    escapeCSV(app.foundedDate),
    escapeCSV(app.country),
    escapeCSV(app.city),
    escapeCSV(app.website),
    escapeCSV(app.phone),
    escapeCSV(app.email),
    escapeCSV(app.ownerName),
    escapeCSV(app.ownerPhone),
    escapeCSV(app.ownerEmail),
    escapeCSV(app.contactName),
    escapeCSV(app.contactPhone),
    escapeCSV(app.contactEmail),
    escapeCSV(app.contactAddress),
    escapeCSV(app.invoiceTitle),
    escapeCSV(app.taxId),
    escapeCSV(app.billingAddress),
    escapeCSV(app.introZh),
    escapeCSV(app.introEn || ''),
    escapeCSV(app.cloudDriveUrl || ''),
    escapeCSV(app.remittanceImageUrl ? '已提供匯款單據截圖' : '未上傳'),
    escapeCSV(app.brandImages?.length || 0),
    escapeCSV(app.signatureName),
    escapeCSV(app.signedAt),
    escapeCSV(app.adminNotes || '')
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Looom_Club_Members_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
