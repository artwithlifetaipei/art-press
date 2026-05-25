"use client";

import { motion } from "framer-motion";

export default function LooomClubPage() {
  const testimonials = [
    {
      quote: "創業非常重要的一環是與不同專業的人合作，而這需要有機會認識新的人，並能夠與有遠見的人們建立有意義的連結。Looom Club 恰好提供了這樣一個的場域，將不同領域中有熱忱、有想法的人們聚集在一起，讓我們在輕鬆且高質感的氛圍中互相分享經歷並探討可能的合作機會，拓展視野及生活上的格局。",
      author: "花廊會所, Everijoy Floral Boutique 創辦人"
    },
    {
      quote: "我一直以來都是專注於自己的創作，因為我喜歡用作品說話。在入會Looom之後，能夠認識到不同領域的精英者，透過作品與社交更加連結。希望在未來能夠與不同領域的人產生出特殊的化學效應，並且這個世界留下我的作品足跡。",
      author: "玩具創作家, JT ® JTSTUDIO 創辦人"
    },
    {
      quote: "Looom Club 的各位比起社團更像同樂會一樣，大家都是在各自領域的專業人士，也因為這樣比起商會型的聚會，這裡更像是一個職人的想法交流，大家聚在一起完全沒有壓力的聊天與分享，對於跨界或是有合作想法的人來說更是一個非常棒的平台，是前所沒有的聚會形態，非常棒，也收穫良多！",
      author: "西服訂製品牌 GAUTE 創辦人"
    },
    {
      quote: "老實說我本質有點社恐，但社交又是我工作裡非常重要的一環。Looom Club 提供了一個品質極高、氛圍舒服的連結場域，讓我能在不勉強自己的狀態下認識同樣在用力生活、彼此支持的人。好的同溫層不是關在一起取暖，而是一起把格局撐大。",
      author: "藝廊, 奇想會 Whimsy Works 創辦人"
    }
  ];

  const steps = [
    {
      num: "01 / APPLY",
      title: "線上遞交會籍申請",
      desc: "填寫我們的線上申請表單，分享您的背景、事業願景以及您希望在社群中獲得的價值。"
    },
    {
      num: "02 / APPROVAL",
      title: "審核與合適通知",
      desc: "Looom Club 是一個申請制社群。我們會仔細評估每一份申請，並第一時間通知合適的主理人與夥伴。"
    },
    {
      num: "03 / CHAT",
      title: "預約首次聊聊",
      desc: "審核通過後，與我們預約一場輕鬆的首次聊聊，讓我們更深認識您，具體協助您媒合所需的資源與人脈。"
    }
  ];

  const faqs = [
    {
      cn: "若您的品牌已跨越初創期，具備初步的市場驗證與營收基礎：在面對供應鏈規模化、高規格的季度視覺企劃、以及進階行銷預算配置時，若您期望能更精準地評估投資報酬率並優化資源配置。透過 Looom Club 每季舉辦的「閉門共學季會」，您能與成熟品牌主進行實戰經驗交流，精準避開擴張期的試錯成本，將資金效益極大化。",
      en: "If your brand has crossed the startup stage and established a basic market proof and revenue stream: when facing supply chain scaling, high-end seasonal visuals, and strategic marketing budgets, Looom Club's quarterly closed-door summits connect you with seasoned founders to optimize ROI and avoid expansion pitfalls."
    },
    {
      cn: "若您的品牌正處於高速擴張期，面臨更複雜的商業挑戰：\n當您需要深度探討市場買氣趨勢、跨通路佈局與談判、產品組合矩陣優化、精細化的庫存週轉率，以及進階的人、貨、場等各項數據指標時。Looom Club 的「閉門共學季會」、「領域專業顧問」等，能為您提供高維度的商業思維碰撞，協助您釐清營運盲區，突破品牌成長天花板。",
      en: "If your brand is in high-speed expansion and facing complex commercial hurdles:\nwhen navigating market trends, multi-channel negotiations, product matrix optimizations, and inventory turnover, Looom Club provides quarterly summits and expert advisor matchmaking to break growth ceilings."
    },
    {
      cn: "若您的品牌事業已經脫離發展期，即創辦 2 年以上者，且在品牌貴賓經營、品牌貴賓人數擴張上感到吃力時，那 Looom Club 或許可以幫助到你。",
      en: "If your brand is over 2 years old and you're struggling to grow and manage your VIP customer base, Looom Club might be able to support you."
    }
  ];

  return (
    <main className="looom-club-page" style={{ backgroundColor: '#FFF', minHeight: '100vh' }}>
      
      {/* HERO SECTION */}
      <section className="club-hero container">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="caps-label" style={{ color: 'var(--accent)', fontWeight: 600 }}>Exclusive Patron Community</span>
          <h1 className="club-hero-title serif">
            Where creators and business owners, leaders come together.
          </h1>
          <p className="club-hero-subtitle serif">
            在過去，台灣有許多傳統形式的社群，但 Looom Club 與這些傳統精英社群不同
            <span className="club-subtitle-second-line">
              —- 以文化、創意產業與長期關係為核心的私密會員俱樂部
            </span>
          </p>
          <div className="club-cta-group">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSfxZhoWLWTW7wFBShy1VxbuuDUJNzkZup3df-BI4tSJ5UBFfg/viewform" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="club-btn"
            >
              Apply Membership 申請會籍
            </a>
            <a href="#membership" className="club-btn-outline">
              Learn More 暸解更多
            </a>
          </div>
        </motion.div>
      </section>

      {/* INTRO DUO */}
      <section className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="club-intro-box">
          <motion.p 
            className="club-intro-text serif"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            Looom Club 適合擁有自身事業的創辦人與企業高階經理人，能在有限的時間裡高效率交流。
            透過入會篩選流程，讓大家在專注事業發展的同時，也能結識正在努力前進的新朋友。
          </motion.p>
        </div>
      </section>

      {/* TESTIMONIALS (他們的故事) */}
      <section className="club-quote-section">
        <div className="container">
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '30px', marginBottom: '60px' }}>
            <span className="caps-label">Testimonials</span>
            <h2 className="serif" style={{ fontSize: '2.5rem', fontWeight: 400, marginTop: '1rem' }}>他們的故事 Creators' Stories</h2>
          </div>

          <div className="club-quote-grid">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                className="club-quote-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              >
                <div className="club-quote-icon">“</div>
                <p className="club-quote-text serif">{t.quote}</p>
                <span className="club-quote-author">{t.author}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIPS */}
      <section id="membership" className="club-pricing-section container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="caps-label">Yearly Memberships</span>
          <h2 className="serif" style={{ fontSize: '3rem', fontWeight: 400, marginTop: '1rem' }}>會籍類別</h2>
          <p className="serif" style={{ color: '#666', fontSize: '1.2rem', marginTop: '1.5rem', fontStyle: 'italic' }}>
            Looom Club 以年為單位提供兩種精緻會籍，根據您的業務擴張需求量身選擇。
          </p>
        </div>

        <div className="club-pricing-grid">
          {/* TIER 1 */}
          <motion.div 
            className="club-price-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            <h3 className="serif club-price-title">基礎會籍</h3>
            <p className="club-price-desc" style={{ marginBottom: "1rem" }}>Membership for 12 Months</p>
            <p className="serif" style={{ fontSize: "1.15rem", color: "var(--muted)", fontStyle: "italic", marginBottom: "3rem" }}>NTD 18,800 / 年</p>
            <ul className="club-price-features serif">
              <li>I. 產業聊聊</li>
              <li>II. 品味社交生活圈</li>
            </ul>
          </motion.div>

          {/* TIER 2 */}
          <motion.div 
            className="club-price-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            style={{ borderColor: 'var(--accent)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 className="serif club-price-title" style={{ margin: 0 }}>Premium 會籍</h3>
              <span className="caps-label" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '10px', border: '1px solid var(--accent)', padding: '4px 10px' }}>RECOMMENDED</span>
            </div>
            <p className="club-price-desc" style={{ marginBottom: "1rem" }}>Membership for 12 Months Premium</p>
            <p className="serif" style={{ fontSize: "1.15rem", color: "var(--accent)", fontStyle: "italic", marginBottom: "3rem" }}>NTD 28,800 / 年</p>
            <ul className="club-price-features serif">
              <li>I. 產業聊聊</li>
              <li>II. 品味社交生活圈</li>
              <li>III. 貴賓導入</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* APPLICATION PROCESS */}
      <section className="club-steps-section container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="caps-label">How to Join</span>
          <h2 className="serif" style={{ fontSize: '3rem', fontWeight: 400, marginTop: '1rem' }}>入會流程</h2>
        </div>

        <div className="club-steps-grid">
          {steps.map((s, i) => (
            <motion.div 
              key={i}
              className="club-step-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
            >
              <span className="club-step-num">{s.num}</span>
              <h3 className="serif club-step-title">{s.title}</h3>
              <p className="club-step-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSfxZhoWLWTW7wFBShy1VxbuuDUJNzkZup3df-BI4tSJ5UBFfg/viewform" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="club-btn"
          >
            Apply Membership 立即申請會籍
          </a>
        </div>
      </section>

      {/* MEDIA COVERAGE SECTION */}
      <section className="club-media-section container" style={{ borderTop: "1px solid var(--border)", paddingTop: "140px", paddingBottom: "140px" }}>
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '30px', marginBottom: '60px' }}>
          <span className="caps-label">Media & Editorial Coverage</span>
          <h2 className="serif" style={{ fontSize: '2.5rem', fontWeight: 400, marginTop: '1rem' }}>媒體報導 Media Coverage</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "60px",
            alignItems: "center"
          }}
          className="press-grid-row"
        >
          {/* Left Column: Media Source */}
          <div>
            <span className="caps-label" style={{ color: "var(--accent)", fontWeight: 700, letterSpacing: "0.15em", display: "block", marginBottom: "1rem" }}>
              SEPTEMBER 2025
            </span>
            <h3 className="serif" style={{ fontSize: "2.4rem", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>
              artnet
            </h3>
          </div>

          {/* Right Column: Content */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h2 className="serif" style={{ fontSize: "2rem", fontWeight: 400, lineHeight: 1.35, marginBottom: "2rem", color: "var(--ink)" }}>
                “In Taipei, a patron group called Looom Club”
              </h2>
              <p className="serif" style={{ color: "#444", fontSize: "1.2rem", lineHeight: 1.85 }}>
                Artnet News reports on Looom Club's growing influence on the contemporary art and patron collector ecosystem. The report highlights Taipei's vibrant next-generation cultural patrons, exploring how Looom Club bridges the gap between creative professional leadership and fine arts discourse.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Responsive layout styles for press-grid-row */}
        <style jsx global>{`
          @media (max-width: 1024px) {
            .press-grid-row {
              grid-template-columns: 1fr !important;
              gap: 30px !important;
            }
          }
        `}</style>
      </section>

      {/* FAQ SECTION */}
      <section className="club-faq-section">
        <div className="container">
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '30px', marginBottom: '60px' }}>
            <span className="caps-label">FAQ</span>
            <h2 className="serif" style={{ fontSize: '2.5rem', fontWeight: 400, marginTop: '1rem' }}>常見問題</h2>
          </div>

          <div className="club-faq-grid">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                className="club-faq-row"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="club-faq-chinese serif" style={{ whiteSpace: 'pre-line' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 600, marginRight: '1rem' }}>Q:</span>
                  {faq.cn}
                </div>
                <div className="club-faq-english serif" style={{ whiteSpace: 'pre-line' }}>
                  {faq.en}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="club-contact-section container">
        <div className="club-contact-grid">
          <div className="club-contact-info">
            <span className="caps-label">Get in Touch</span>
            <h3 className="serif">與我們聯絡<br />CONTACT</h3>
            <p className="serif">
              Looom Club 於台北設有辦公室，我們非常歡迎您來信，或透過官方渠道與我們聯繫。
            </p>
          </div>

          <div className="club-contact-details">


            <div className="club-contact-block">
              <h4>EMAIL CONTACT</h4>
              <div className="club-contact-emails serif">
                <a href="mailto:looom@theartpressasia.com">
                  官方資訊信箱 looom@theartpressasia.com
                </a>
                <a href="mailto:looom.member@gmail.com">
                  會員服務信箱 looom.member@gmail.com
                </a>
              </div>
            </div>

            <div className="club-contact-block">
              <h4>COMMUNITY GATEWAY</h4>
              <p className="serif">
                社群快速通道：請在 Line 中搜尋 ID <span style={{ color: 'var(--accent)', fontWeight: 600 }}>@751icbhe</span>
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
