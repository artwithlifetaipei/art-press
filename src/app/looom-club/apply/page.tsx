"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  Building2, 
  User, 
  FileText, 
  ShieldCheck, 
  CreditCard,
  ExternalLink,
  Sparkles,
  Info,
  X
} from 'lucide-react';
import { 
  MembershipTier, 
  MEMBERSHIP_TIER_CONFIG, 
  submitClubApplication 
} from '@/lib/looom-applications';

export default function LooomApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [membershipTier, setMembershipTier] = useState<MembershipTier>('basic');
  
  // Step 2: Brand Information
  const [brandNameZh, setBrandNameZh] = useState('');
  const [brandNameEn, setBrandNameEn] = useState('');
  const [foundedDate, setFoundedDate] = useState('');
  const [country, setCountry] = useState('台灣 Taiwan');
  const [city, setCity] = useState('台北 Taipei');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Step 3: Contact & Billing
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [invoiceTitle, setInvoiceTitle] = useState('');
  const [taxId, setTaxId] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  // Step 4: Intro & Attachments
  const [introZh, setIntroZh] = useState('');
  const [introEn, setIntroEn] = useState('');
  const [cloudDriveUrl, setCloudDriveUrl] = useState('');
  const [mediaLinks, setMediaLinks] = useState('');
  const [remittanceImage, setRemittanceImage] = useState<string>('');
  const [brandImages, setBrandImages] = useState<string[]>([]);

  // Step 5: Terms & Signature
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedReviewProcess, setAgreedReviewProcess] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [signedAt, setSignedAt] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()} / ${String(today.getMonth() + 1).padStart(2, '0')} / ${String(today.getDate()).padStart(2, '0')}`;
  });

  // Helper for image file reading with resizing
  const handleImageUpload = (file: File, isRemittance: boolean) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          if (isRemittance) {
            setRemittanceImage(dataUrl);
          } else {
            setBrandImages(prev => [...prev.slice(0, 4), dataUrl]);
          }
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const removeBrandImage = (index: number) => {
    setBrandImages(prev => prev.filter((_, i) => i !== index));
  };

  // Validation per step
  const validateStep = (step: number): boolean => {
    setErrorMessage('');
    if (step === 1) {
      return true;
    }
    if (step === 2) {
      if (!brandNameZh.trim() && !brandNameEn.trim()) {
        setErrorMessage('請填寫品牌中文或英文名稱。');
        return false;
      }
      if (!phone.trim()) {
        setErrorMessage('請填寫品牌聯繫電話（含國碼與區碼）。');
        return false;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('請填寫有效的品牌官方電子郵件。');
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!ownerName.trim()) {
        setErrorMessage('請填寫品牌負責人姓名。');
        return false;
      }
      if (!ownerPhone.trim()) {
        setErrorMessage('請填寫品牌負責人手機號碼。');
        return false;
      }
      if (!ownerEmail.trim() || !ownerEmail.includes('@')) {
        setErrorMessage('請填寫品牌負責人電子郵件。');
        return false;
      }
      return true;
    }
    if (step === 4) {
      if (introZh.trim().length < 30) {
        setErrorMessage('品牌中文簡介請至少填寫 30~50 字，以利審核委員會評估品牌調性。');
        return false;
      }
      return true;
    }
    if (step === 5) {
      if (!agreedTerms || !agreedReviewProcess) {
        setErrorMessage('請確認並勾選入會規範與官方審核程序條款。');
        return false;
      }
      if (!signatureName.trim()) {
        setErrorMessage('請於電子簽名處輸入負責人法定正楷姓名。');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setSubmitting(true);
    setErrorMessage('');

    const res = await submitClubApplication({
      membershipTier,
      brandNameZh: brandNameZh.trim(),
      brandNameEn: brandNameEn.trim(),
      foundedDate: foundedDate.trim(),
      country: country.trim(),
      city: city.trim(),
      website: website.trim(),
      phone: phone.trim(),
      email: email.trim(),
      ownerName: ownerName.trim(),
      ownerPhone: ownerPhone.trim(),
      ownerEmail: ownerEmail.trim(),
      contactName: (contactName.trim() || ownerName.trim()),
      contactPhone: (contactPhone.trim() || ownerPhone.trim()),
      contactEmail: (contactEmail.trim() || ownerEmail.trim()),
      contactAddress: contactAddress.trim(),
      invoiceTitle: invoiceTitle.trim(),
      taxId: taxId.trim(),
      billingAddress: billingAddress.trim(),
      introZh: introZh.trim(),
      introEn: introEn.trim(),
      cloudDriveUrl: cloudDriveUrl.trim(),
      mediaLinks: mediaLinks.trim(),
      remittanceImageUrl: remittanceImage,
      brandImages: brandImages,
      signatureName: signatureName.trim(),
      signedAt: signedAt.trim()
    });

    setSubmitting(false);

    if (res.success && res.id) {
      setSubmittedId(res.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrorMessage(res.error || '提交過程發生異常，請確認網路連線或直接聯繫 looom@theartpressasia.com');
    }
  };

  // STEP 6: SUCCESS CONFIRMATION SCREEN
  if (submittedId) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', padding: '80px 20px', color: '#111' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', backgroundColor: '#FFF', border: '1px solid #E8E8E8', padding: '50px 40px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#000', color: '#FFF', marginBottom: '20px' }}>
              <Check size={28} />
            </div>
            <span className="caps-label" style={{ color: '#B29B6E', letterSpacing: '0.25em', display: 'block', marginBottom: '8px' }}>
              APPLICATION RECEIVED
            </span>
            <h1 className="serif" style={{ fontSize: '2.2rem', fontWeight: 400, letterSpacing: '0.04em', margin: 0 }}>
              感謝您的入會申請
            </h1>
            <p style={{ color: '#666', fontSize: '0.92rem', marginTop: '12px', lineHeight: 1.7 }}>
              我們已成功接收您的入會申請資料。Looom 審核委員會將於 5 個工作天內展開評估程序。
            </p>
          </div>

          <div style={{ borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0', padding: '24px 0', margin: '30px 0', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>申請編號 Reference ID</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{submittedId.slice(0, 13).toUpperCase()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>申請會籍 Tier</span>
              <span style={{ fontWeight: 600 }}>{MEMBERSHIP_TIER_CONFIG[membershipTier].nameZh}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>申請品牌 Brand</span>
              <span style={{ fontWeight: 500 }}>{brandNameZh || brandNameEn}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>法定簽署人 Signatory</span>
              <span style={{ fontWeight: 500 }}>{signatureName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>遞交日期 Date</span>
              <span style={{ color: '#444' }}>{signedAt}</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#FBFBFB', border: '1px solid #EEE', padding: '20px 24px', marginBottom: '35px' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: '#333', marginBottom: '12px' }}>
              審核時程與官方聯繫
            </h4>
            <ul style={{ margin: 0, paddingLeft: '18px', color: '#555', fontSize: '0.85rem', lineHeight: 1.8 }}>
              <li><strong>初審免繳費</strong>：遞交申請階段無需預先付款，專注於品牌資料評估。</li>
              <li><strong>5 個工作天審核期</strong>：官方審核結果將透過電子郵件專函通知。</li>
              <li><strong>入選繳費指引</strong>：經委員會審核通過後，將以專函電郵提供收款帳號、匯款金額與迎新須知。</li>
              <li><strong>款項收訖確認</strong>：確認收到入會款項後，我們將寄發正式收據與會員社群啟動指南。</li>
              <li>若於遞交後 3 個工作天內未收到確認回覆，或有任何資料補充，歡迎聯繫：</li>
              <li style={{ listStyle: 'none', marginTop: '6px' }}>
                <span style={{ color: '#111', fontWeight: 500 }}>官方信箱：</span> looom@theartpressasia.com<br/>
                <span style={{ color: '#111', fontWeight: 500 }}>會員服務：</span> looom.member@gmail.com
              </li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Link
              href="/looom-club"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#000',
                color: '#FFF',
                padding: '14px 28px',
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              <ArrowLeft size={16} /> 返回 Looom Club
            </Link>
            <button
              onClick={() => window.print()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: '#444',
                padding: '14px 24px',
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                border: '1px solid #DDD',
                cursor: 'pointer'
              }}
            >
              列印申請證明
            </button>
          </div>
        </div>
      </main>
    );
  }

  const stepsMeta = [
    { num: 1, title: '會籍選擇', en: 'Tier' },
    { num: 2, title: '品牌基本資料', en: 'Profile' },
    { num: 3, title: '負責人與聯繫', en: 'Contacts' },
    { num: 4, title: '品牌簡介與附件', en: 'Details' },
    { num: 5, title: '聲明與簽名', en: 'Confirm' }
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FDFDFD', color: '#111', paddingBottom: '100px' }}>
      
      {/* Editorial Header */}
      <header style={{ borderBottom: '1px solid #EBEBEB', backgroundColor: '#FFF', position: 'sticky', top: 0, zIndex: 30 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/looom-club" style={{ color: '#000', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', textDecoration: 'none' }}>
              <ArrowLeft size={16} /> <span className="caps-label" style={{ letterSpacing: '0.15em' }}>LOOOM CLUB</span>
            </Link>
            <span style={{ color: '#CCC' }}>/</span>
            <span style={{ fontSize: '0.85rem', color: '#777', fontWeight: 400 }}>入會申請表 Application</span>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Step {currentStep} of 5
          </div>
        </div>

        {/* Step Progress Bar */}
        <div style={{ display: 'flex', width: '100%', height: '2px', backgroundColor: '#EFEFEF' }}>
          <div 
            style={{ 
              width: `${(currentStep / 5) * 100}%`, 
              backgroundColor: '#000', 
              transition: 'width 0.3s ease' 
            }} 
          />
        </div>
      </header>

      {/* Main Container */}
      <div style={{ maxWidth: '840px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="caps-label" style={{ color: '#B29B6E', letterSpacing: '0.25em', display: 'block', marginBottom: '8px' }}>
            MEMBERSHIP APPLICATION FORM
          </span>
          <h1 className="serif" style={{ fontSize: '2.5rem', fontWeight: 400, letterSpacing: '0.04em', margin: 0 }}>
            Looom Club 入會申請
          </h1>
          <p style={{ color: '#666', fontSize: '0.92rem', marginTop: '12px', maxWidth: '580px', margin: '12px auto 0', lineHeight: 1.7 }}>
            本社群採封閉審核制，致力於為創業者與產業決策者構築美學與商業深度的實務社交網絡。
          </p>

          {/* Steps Indicator Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '30px', flexWrap: 'wrap' }}>
            {stepsMeta.map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num < currentStep) setCurrentStep(s.num);
                }}
                disabled={s.num > currentStep}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  border: currentStep === s.num ? '1px solid #000' : '1px solid #E8E8E8',
                  backgroundColor: currentStep === s.num ? '#000' : currentStep > s.num ? '#F5F5F5' : '#FFF',
                  color: currentStep === s.num ? '#FFF' : currentStep > s.num ? '#222' : '#999',
                  cursor: s.num < currentStep ? 'pointer' : 'default',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{s.num}.</span>
                <span>{s.title}</span>
                {currentStep > s.num && <Check size={12} />}
              </button>
            ))}
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div style={{ 
            backgroundColor: '#FFF5F5', 
            borderLeft: '3px solid #EF4444', 
            color: '#B91C1C', 
            padding: '14px 20px', 
            marginBottom: '30px', 
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Info size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Body with Animations */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#FFF', border: '1px solid #EAEAEA', padding: '40px 36px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <AnimatePresence mode="wait">
            
            {/* STEP 1: 会籍方案 */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ marginBottom: '28px', borderBottom: '1px solid #F0F0F0', paddingBottom: '16px' }}>
                  <span className="caps-label" style={{ color: '#888', fontSize: '0.75rem' }}>Step 01</span>
                  <h3 className="serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginTop: '4px', margin: 0 }}>
                    選擇入會會籍類別
                  </h3>
                  <p style={{ color: '#777', fontSize: '0.85rem', marginTop: '6px' }}>
                    請選取您希望申請的會籍方案，會籍有效期間均為十二個月。
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '35px' }}>
                  
                  {/* Basic Tier */}
                  <div
                    onClick={() => setMembershipTier('basic')}
                    style={{
                      border: membershipTier === 'basic' ? '2px solid #000' : '1px solid #E2E2E2',
                      backgroundColor: membershipTier === 'basic' ? '#FAFAFA' : '#FFF',
                      padding: '28px 24px',
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                        <div>
                          <span className="caps-label" style={{ color: '#888', fontSize: '0.7rem' }}>OPTION A</span>
                          <h4 className="serif" style={{ fontSize: '1.35rem', fontWeight: 600, margin: '4px 0 0' }}>
                            {MEMBERSHIP_TIER_CONFIG.basic.nameZh}
                          </h4>
                          <span style={{ fontSize: '0.75rem', color: '#888' }}>{MEMBERSHIP_TIER_CONFIG.basic.nameEn}</span>
                        </div>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: membershipTier === 'basic' ? '6px solid #000' : '1px solid #CCC',
                          backgroundColor: '#FFF'
                        }} />
                      </div>

                      <div style={{ fontSize: '1.5rem', fontWeight: 600, margin: '16px 0 20px', color: '#000', fontFamily: 'serif' }}>
                        {MEMBERSHIP_TIER_CONFIG.basic.priceLabel}
                      </div>

                      <div style={{ borderTop: '1px solid #EEE', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#555', lineHeight: 1.6 }}>
                        {MEMBERSHIP_TIER_CONFIG.basic.features.map((feat, i) => (
                          <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <Check size={14} style={{ color: '#000', marginTop: '3px', flexShrink: 0 }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Premium Tier */}
                  <div
                    onClick={() => setMembershipTier('premium')}
                    style={{
                      border: membershipTier === 'premium' ? '2px solid #000' : '1px solid #E2E2E2',
                      backgroundColor: membershipTier === 'premium' ? '#FAFAFA' : '#FFF',
                      padding: '28px 24px',
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="caps-label" style={{ color: '#B29B6E', fontSize: '0.7rem' }}>OPTION B</span>
                            <span style={{ backgroundColor: '#000', color: '#FFF', fontSize: '0.65rem', padding: '2px 6px', letterSpacing: '0.1em', fontWeight: 600 }}>PREMIUM</span>
                          </div>
                          <h4 className="serif" style={{ fontSize: '1.35rem', fontWeight: 600, margin: '4px 0 0' }}>
                            {MEMBERSHIP_TIER_CONFIG.premium.nameZh}
                          </h4>
                          <span style={{ fontSize: '0.75rem', color: '#888' }}>{MEMBERSHIP_TIER_CONFIG.premium.nameEn}</span>
                        </div>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: membershipTier === 'premium' ? '6px solid #000' : '1px solid #CCC',
                          backgroundColor: '#FFF'
                        }} />
                      </div>

                      <div style={{ fontSize: '1.5rem', fontWeight: 600, margin: '16px 0 20px', color: '#000', fontFamily: 'serif' }}>
                        {MEMBERSHIP_TIER_CONFIG.premium.priceLabel}
                      </div>

                      <div style={{ borderTop: '1px solid #EEE', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#555', lineHeight: 1.6 }}>
                        {MEMBERSHIP_TIER_CONFIG.premium.features.map((feat, i) => (
                          <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <Check size={14} style={{ color: '#B29B6E', marginTop: '3px', flexShrink: 0 }} />
                            <span style={{ color: i === 2 ? '#000' : '#555', fontWeight: i === 2 ? 600 : 400 }}>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Review Process Timeline Card */}
                <div style={{ backgroundColor: '#FBFBFB', border: '1px solid #EBEBEB', padding: '22px 24px', marginBottom: '20px' }}>
                  <h5 style={{ margin: '0 0 14px', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#444' }}>
                    申請暨官方審核程序（初審免預先繳費）
                  </h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', fontSize: '0.85rem' }}>
                    <div style={{ borderLeft: '2px solid #000', paddingLeft: '12px' }}>
                      <span style={{ color: '#888', fontSize: '0.75rem' }}>A 階段</span>
                      <p style={{ margin: '2px 0 0', fontWeight: 600 }}>線上遞交申請</p>
                      <span style={{ color: '#777', fontSize: '0.75rem' }}>填寫品牌與負責人資料，免預繳會費</span>
                    </div>
                    <div style={{ borderLeft: '2px solid #000', paddingLeft: '12px' }}>
                      <span style={{ color: '#888', fontSize: '0.75rem' }}>B 階段</span>
                      <p style={{ margin: '2px 0 0', fontWeight: 600 }}>5 個工作天官方審核期</p>
                      <span style={{ color: '#777', fontSize: '0.75rem' }}>審核委員會評估品牌調性與契合度</span>
                    </div>
                    <div style={{ borderLeft: '2px solid #000', paddingLeft: '12px' }}>
                      <span style={{ color: '#888', fontSize: '0.75rem' }}>C 階段</span>
                      <p style={{ margin: '2px 0 0', fontWeight: 600 }}>入選通知與匯款繳費</p>
                      <span style={{ color: '#777', fontSize: '0.75rem' }}>審核通過後，專函電郵通知轉帳帳號</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* STEP 2: 品牌基本资料 */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ marginBottom: '28px', borderBottom: '1px solid #F0F0F0', paddingBottom: '16px' }}>
                  <span className="caps-label" style={{ color: '#888', fontSize: '0.75rem' }}>Step 02</span>
                  <h3 className="serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginTop: '4px', margin: 0 }}>
                    A. 基本資料 Brand Information
                  </h3>
                  <p style={{ color: '#777', fontSize: '0.85rem', marginTop: '6px' }}>
                    此名稱將作為日後正式公告、宣傳之用，請確認品牌正名並注意英文大小寫。
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                        品牌中文名稱 Brand Name (ZH) *
                      </label>
                      <input
                        type="text"
                        value={brandNameZh}
                        onChange={(e) => setBrandNameZh(e.target.value)}
                        placeholder="例：Looom Club、JT STUDIO"
                        style={{ width: '100%', padding: '12px 14px', border: '1px solid #DDD', fontSize: '0.95rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                        品牌英文名稱 Brand Name (EN)
                      </label>
                      <input
                        type="text"
                        value={brandNameEn}
                        onChange={(e) => setBrandNameEn(e.target.value)}
                        placeholder="例：Looom Club"
                        style={{ width: '100%', padding: '12px 14px', border: '1px solid #DDD', fontSize: '0.95rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                        成立時間 Founded Date (西元年/月)
                      </label>
                      <input
                        type="text"
                        value={foundedDate}
                        onChange={(e) => setFoundedDate(e.target.value)}
                        placeholder="例：2020 / 08"
                        style={{ width: '100%', padding: '12px 14px', border: '1px solid #DDD', fontSize: '0.95rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                        國家 Country (中/英)
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="例：台灣 Taiwan"
                        style={{ width: '100%', padding: '12px 14px', border: '1px solid #DDD', fontSize: '0.95rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                        城市 City (中/英)
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="例：台北 Taipei"
                        style={{ width: '100%', padding: '12px 14px', border: '1px solid #DDD', fontSize: '0.95rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                      品牌網站 / Instagram / Facebook 網址 Website
                    </label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://... 或 instagram.com/brand"
                      style={{ width: '100%', padding: '12px 14px', border: '1px solid #DDD', fontSize: '0.95rem', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                        品牌官方電話 Phone (含國碼與區碼) *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="例：+886-2-2700-0000"
                        style={{ width: '100%', padding: '12px 14px', border: '1px solid #DDD', fontSize: '0.95rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                        品牌官方電郵 Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="official@brand.com"
                        style={{ width: '100%', padding: '12px 14px', border: '1px solid #DDD', fontSize: '0.95rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* STEP 3: 负责人与联系信息 */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ marginBottom: '28px', borderBottom: '1px solid #F0F0F0', paddingBottom: '16px' }}>
                  <span className="caps-label" style={{ color: '#888', fontSize: '0.75rem' }}>Step 03</span>
                  <h3 className="serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginTop: '4px', margin: 0 }}>
                    B. 聯繫與發票資料 Contacts & Billing
                  </h3>
                  <p style={{ color: '#777', fontSize: '0.85rem', marginTop: '6px' }}>
                    後續官方審核結果、專屬季會邀請及貴賓導入將由負責人或指定聯絡人接洽。
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                  
                  {/* Owner Section */}
                  <div style={{ border: '1px solid #EFEFEF', padding: '20px 22px', backgroundColor: '#FAFAFA' }}>
                    <h5 style={{ margin: '0 0 14px', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#111' }}>
                      品牌負責人資訊 Brand Founder / Owner *
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#555', marginBottom: '6px', textTransform: 'uppercase' }}>姓名 (中/英文) *</label>
                        <input
                          type="text"
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                          placeholder="王大明 David Wang"
                          style={{ width: '100%', padding: '10px 12px', border: '1px solid #DDD', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFF' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#555', marginBottom: '6px', textTransform: 'uppercase' }}>手機 Mobile *</label>
                        <input
                          type="tel"
                          value={ownerPhone}
                          onChange={(e) => setOwnerPhone(e.target.value)}
                          placeholder="0912-345-678"
                          style={{ width: '100%', padding: '10px 12px', border: '1px solid #DDD', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFF' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#555', marginBottom: '6px', textTransform: 'uppercase' }}>電郵 Email *</label>
                        <input
                          type="email"
                          value={ownerEmail}
                          onChange={(e) => setOwnerEmail(e.target.value)}
                          placeholder="owner@brand.com"
                          style={{ width: '100%', padding: '10px 12px', border: '1px solid #DDD', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFF' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Person Section */}
                  <div style={{ border: '1px solid #EFEFEF', padding: '20px 22px', backgroundColor: '#FAFAFA' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <h5 style={{ margin: 0, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#111' }}>
                        品牌指定聯絡人 Contact Person (後續接洽窗口)
                      </h5>
                      <button
                        type="button"
                        onClick={() => {
                          setContactName(ownerName);
                          setContactPhone(ownerPhone);
                          setContactEmail(ownerEmail);
                        }}
                        style={{ background: 'none', border: 'none', color: '#B29B6E', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        同負責人資料
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#555', marginBottom: '6px', textTransform: 'uppercase' }}>姓名 Name</label>
                        <input
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="若同負責人可留空"
                          style={{ width: '100%', padding: '10px 12px', border: '1px solid #DDD', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFF' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#555', marginBottom: '6px', textTransform: 'uppercase' }}>手機 Mobile</label>
                        <input
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="聯絡人手機"
                          style={{ width: '100%', padding: '10px 12px', border: '1px solid #DDD', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFF' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#555', marginBottom: '6px', textTransform: 'uppercase' }}>電郵 Email</label>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="聯絡人電郵"
                          style={{ width: '100%', padding: '10px 12px', border: '1px solid #DDD', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFF' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                      聯繫地址 Contact Address
                    </label>
                    <input
                      type="text"
                      value={contactAddress}
                      onChange={(e) => setContactAddress(e.target.value)}
                      placeholder="例：台北市大安區敦化南路..."
                      style={{ width: '100%', padding: '12px 14px', border: '1px solid #DDD', fontSize: '0.95rem', outline: 'none' }}
                    />
                  </div>

                  {/* Invoice / Tax ID */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                        發票抬頭 Invoice Title (若需開立三聯式發票)
                      </label>
                      <input
                        type="text"
                        value={invoiceTitle}
                        onChange={(e) => setInvoiceTitle(e.target.value)}
                        placeholder="例：某某股份有限公司"
                        style={{ width: '100%', padding: '12px 14px', border: '1px solid #DDD', fontSize: '0.95rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                        統一編號 Tax ID (8 碼)
                      </label>
                      <input
                        type="text"
                        value={taxId}
                        maxLength={8}
                        onChange={(e) => setTaxId(e.target.value)}
                        placeholder="例：12345678"
                        style={{ width: '100%', padding: '12px 14px', border: '1px solid #DDD', fontSize: '0.95rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                      帳單地址 Billing Address (若與品牌聯繫地址不同)
                    </label>
                    <input
                      type="text"
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                      placeholder="若與聯繫地址相同可留空"
                      style={{ width: '100%', padding: '12px 14px', border: '1px solid #DDD', fontSize: '0.95rem', outline: 'none' }}
                    />
                  </div>

                </div>
              </motion.div>
            )}

            {/* STEP 4: 品牌简介与附件证明 */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ marginBottom: '28px', borderBottom: '1px solid #F0F0F0', paddingBottom: '16px' }}>
                  <span className="caps-label" style={{ color: '#888', fontSize: '0.75rem' }}>Step 04</span>
                  <h3 className="serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginTop: '4px', margin: 0 }}>
                    C. 品牌簡介與附件證明 Profile & Media
                  </h3>
                  <p style={{ color: '#777', fontSize: '0.85rem', marginTop: '6px' }}>
                    請提供至少 50 字之核心敘述，並附上代表品牌質地之影像照片與匯款單據截圖。
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                  
                  {/* Chinese Intro */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333' }}>
                        品牌核心簡介 (中文) * (至少 50 字)
                      </label>
                      <span style={{ fontSize: '0.75rem', color: introZh.length >= 50 ? '#059669' : '#888' }}>
                        目前字數：{introZh.length} 字
                      </span>
                    </div>
                    <textarea
                      rows={5}
                      value={introZh}
                      onChange={(e) => setIntroZh(e.target.value)}
                      placeholder="請敘述品牌定位、事業願景、代表作或您期望在 Looom Club 交流的核心領域（例如：美學工藝、空間設計、跨界媒合等）..."
                      style={{ width: '100%', padding: '14px', border: '1px solid #DDD', fontSize: '0.95rem', lineHeight: 1.7, outline: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  {/* English Intro */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                      品牌英文簡介 Brand Statement (EN) (選填)
                    </label>
                    <textarea
                      rows={3}
                      value={introEn}
                      onChange={(e) => setIntroEn(e.target.value)}
                      placeholder="Optional English brand description or artist statement..."
                      style={{ width: '100%', padding: '14px', border: '1px solid #DDD', fontSize: '0.95rem', lineHeight: 1.7, outline: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  {/* Payment & Review Policy Notice */}
                  <div style={{ border: '1px solid #EBEBEB', padding: '22px 24px', backgroundColor: '#FAFAFA' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#000',
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <h5 style={{ margin: 0, fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: '#111' }}>
                          會費繳納說明：初審階段無需預先付款
                        </h5>
                        <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: '#666', lineHeight: 1.7 }}>
                          Looom Club 為封閉審核制會員社群。為確保雙方理念與資源契合，<strong>遞交申請階段無需進行轉帳或匯款</strong>。您的申請將於 5 個工作天內由審核委員會評估，經<strong>審核通過（Approved）</strong>後，官方將以專函電郵寄發正式入選通知、專屬匯款帳戶資訊與會籍啟動迎新指南。
                        </p>
                        <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#B29B6E', fontWeight: 600 }}>
                          預計繳納會費：{MEMBERSHIP_TIER_CONFIG[membershipTier].nameZh} {MEMBERSHIP_TIER_CONFIG[membershipTier].priceLabel}（待審核通過後繳納）
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Brand Images (3-5 Photos) */}
                  <div style={{ border: '1px solid #EBEBEB', padding: '22px', backgroundColor: '#FAFAFA' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <h5 style={{ margin: 0, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#111' }}>
                          品牌代表照片與形象圖 (建議 3-5 張)
                        </h5>
                        <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#777' }}>
                          展示空間、代表產品或品牌視覺質地（亦可透過下方雲端資料夾連結提供）
                        </p>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#888' }}>{brandImages.length} / 5 張</span>
                    </div>

                    {brandImages.length > 0 && (
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        {brandImages.map((imgUrl, idx) => (
                          <div key={idx} style={{ position: 'relative', width: '90px', height: '90px', border: '1px solid #DDD' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imgUrl} alt={`Brand Image ${idx+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button
                              type="button"
                              onClick={() => removeBrandImage(idx)}
                              style={{
                                position: 'absolute',
                                top: '-6px',
                                right: '-6px',
                                backgroundColor: '#000',
                                color: '#FFF',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {brandImages.length < 5 && (
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '16px',
                        border: '1px dashed #CCC',
                        backgroundColor: '#FFF',
                        cursor: 'pointer'
                      }}>
                        <Upload size={18} style={{ color: '#888' }} />
                        <span style={{ fontSize: '0.85rem', color: '#444' }}>上傳品牌形象照片 (點擊新增)</span>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleImageUpload(e.target.files[0], false);
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>

                  {/* Cloud Drive Link */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                      雲端資料夾連結 (Google Drive / Dropbox / WeTransfer) (建議大檔與動態影像使用)
                    </label>
                    <input
                      type="url"
                      value={cloudDriveUrl}
                      onChange={(e) => setCloudDriveUrl(e.target.value)}
                      placeholder="https://drive.google.com/drive/folders/..."
                      style={{ width: '100%', padding: '12px 14px', border: '1px solid #DDD', fontSize: '0.95rem', outline: 'none' }}
                    />
                    <span style={{ fontSize: '0.75rem', color: '#888', marginTop: '6px', display: 'block' }}>
                      * 請確認開啟共用權限（知道連結的使用者均可檢視），以利審核委員會閱讀。
                    </span>
                  </div>

                  {/* Media Coverage Links */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                      相關媒體報導連結 (選填，最多 5 篇)
                    </label>
                    <textarea
                      rows={2}
                      value={mediaLinks}
                      onChange={(e) => setMediaLinks(e.target.value)}
                      placeholder="一行填寫一個報導網址..."
                      style={{ width: '100%', padding: '12px 14px', border: '1px solid #DDD', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                </div>
              </motion.div>
            )}

            {/* STEP 5: 声明与电子签名 */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ marginBottom: '28px', borderBottom: '1px solid #F0F0F0', paddingBottom: '16px' }}>
                  <span className="caps-label" style={{ color: '#888', fontSize: '0.75rem' }}>Step 05</span>
                  <h3 className="serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginTop: '4px', margin: 0 }}>
                    聲明與法定簽署 Affirmation & Signature
                  </h3>
                  <p style={{ color: '#777', fontSize: '0.85rem', marginTop: '6px' }}>
                    請檢閱申請摘要，確認聲明事項並輸入品牌負責人法定全名完成線上簽字。
                  </p>
                </div>

                {/* Application Summary Box */}
                <div style={{ backgroundColor: '#FAFAFA', border: '1px solid #EAEAEA', padding: '24px', marginBottom: '30px' }}>
                  <span className="caps-label" style={{ color: '#888', fontSize: '0.7rem' }}>APPLICATION SUMMARY</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginTop: '14px', fontSize: '0.88rem' }}>
                    <div>
                      <span style={{ color: '#888', display: 'block', fontSize: '0.75rem' }}>申請方案 Tier</span>
                      <strong>{MEMBERSHIP_TIER_CONFIG[membershipTier].nameZh}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#888', display: 'block', fontSize: '0.75rem' }}>會費金額 Fee</span>
                      <strong style={{ color: '#000' }}>{MEMBERSHIP_TIER_CONFIG[membershipTier].priceLabel}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#888', display: 'block', fontSize: '0.75rem' }}>品牌名稱 Brand</span>
                      <strong>{brandNameZh || brandNameEn}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#888', display: 'block', fontSize: '0.75rem' }}>品牌負責人 Founder</span>
                      <strong>{ownerName} ({ownerPhone})</strong>
                    </div>
                    <div>
                      <span style={{ color: '#888', display: 'block', fontSize: '0.75rem' }}>品牌電郵 Email</span>
                      <span>{email}</span>
                    </div>
                    <div>
                      <span style={{ color: '#888', display: 'block', fontSize: '0.75rem' }}>會費繳納狀態 Fee Status</span>
                      <strong style={{ color: '#B29B6E' }}>初審免預繳，審核通過後電郵通知</strong>
                    </div>
                  </div>
                </div>

                {/* Terms Checkbox 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', fontSize: '0.88rem', color: '#333', lineHeight: 1.6 }}>
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      style={{ marginTop: '4px', width: '18px', height: '18px', accentColor: '#000', cursor: 'pointer' }}
                    />
                    <span>
                      我保證本表單所填載及檢附之品牌資訊、營業資料均屬真實完整。我充分理解 Looom Club 為封閉審核制社群，提交資料將作為入選評估之用，官方將秉持保密原則妥善保管。
                    </span>
                  </label>

                  {/* Terms Checkbox 2 */}
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', fontSize: '0.88rem', color: '#333', lineHeight: 1.6 }}>
                    <input
                      type="checkbox"
                      checked={agreedReviewProcess}
                      onChange={(e) => setAgreedReviewProcess(e.target.checked)}
                      style={{ marginTop: '4px', width: '18px', height: '18px', accentColor: '#000', cursor: 'pointer' }}
                    />
                    <span>
                      我知悉遞交申請後享有 5 個工作天之官方審核期。審核通過與否將由官方透過電子郵件專函通知；若經審核通過，我將依專函所附之匯款帳戶資訊於期限內完成會費繳納，以正式啟動會員權益。
                    </span>
                  </label>
                </div>

                {/* Electronic Signature */}
                <div style={{ border: '1px solid #111', padding: '24px', backgroundColor: '#FFF', marginBottom: '25px' }}>
                  <span className="caps-label" style={{ color: '#111', letterSpacing: '0.15em', fontWeight: 600 }}>
                    負責人法定正楷全名簽署 (Electronic Signature)
                  </span>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '6px' }}>
                        負責人法定全名 Full Name *
                      </label>
                      <input
                        type="text"
                        value={signatureName}
                        onChange={(e) => setSignatureName(e.target.value)}
                        placeholder="請輸入法定負責人正楷姓名"
                        style={{ width: '100%', padding: '12px 14px', border: '1px solid #999', fontSize: '1.05rem', fontFamily: 'serif', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '6px' }}>
                        簽署日期 Date (西元年/月/日)
                      </label>
                      <input
                        type="text"
                        value={signedAt}
                        onChange={(e) => setSignedAt(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', border: '1px solid #CCC', fontSize: '0.95rem', outline: 'none', backgroundColor: '#F9F9F9' }}
                      />
                    </div>
                  </div>
                  <p style={{ margin: '14px 0 0', fontSize: '0.75rem', color: '#888' }}>
                    * 本線上聲明送出即代表品牌負責人行使電子簽名權利，具備法律效力。
                  </p>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

          {/* Navigation & Submit Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '35px', paddingTop: '25px', borderTop: '1px solid #F0F0F0' }}>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  border: '1px solid #CCC',
                  color: '#444',
                  padding: '12px 24px',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                <ArrowLeft size={16} /> 上一步
              </button>
            ) : <div />}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#000',
                  border: 'none',
                  color: '#FFF',
                  padding: '12px 28px',
                  fontSize: '0.85rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                下一步 <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#000',
                  border: 'none',
                  color: '#FFF',
                  padding: '14px 34px',
                  fontSize: '0.9rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.7 : 1,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                }}
              >
                {submitting ? '提交申請中 Submitting...' : '確認並遞交入會申請 Submit Application'}
              </button>
            )}
          </div>

        </form>

        {/* Footer info */}
        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.8rem', color: '#999', lineHeight: 1.8 }}>
          如有任何問題或需親簽紙本掃描回傳，請洽官方信箱：looom@theartpressasia.com<br/>
          © Looom Club by ART PRESS. All Rights Reserved.
        </div>

      </div>

    </main>
  );
}
