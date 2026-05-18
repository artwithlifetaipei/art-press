import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ART PRESS Asia | The Leading Contemporary Art Editorial",
  description: "The Leading Contemporary Art Editorial and Art Knowledge Media based in Taipei, providing exhibitions, research artists, view and insights.",
  keywords: ["contemporary art", "taiwan art", "art media", "exhibitions", "art interviews", "Patricia Dominguez", "Taipei Biennial"],
  metadataBase: new URL('https://looom-artpress.com'),
  openGraph: {
    title: "ART PRESS Asia",
    description: "The Leading Contemporary Art Editorial and Art Knowledge Media based in Taipei.",
    url: "https://looom-artpress.com",
    siteName: "ART PRESS Asia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ART PRESS Asia — Belong to LOOOM ASIA GROUP",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
};

import PageTransition from "@/components/PageTransition";
import MobileNav from "@/components/MobileNav";

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo_final.jpg" sizes="any" />
      </head>
      <body>
        <nav className="global-nav">
          <div className="nav-content">
            <a href="/" className="logo-link">
              <img src="/logo_final.jpg" alt="ART PRESS" className="logo-img" />
            </a>
            <div className="nav-links serif">
              <a href="/magazine">Magazine 雜誌</a>
              <a href="/people">Looom People</a>
              <a href="/looom-club">Looom Club</a>
              <a href="/contact">Contact 聯繫</a>
            </div>
            <div className="nav-meta">
              <a href="https://www.instagram.com/looomasia/" target="_blank" rel="noopener noreferrer" className="social-icon desktop-only">
                <InstagramIcon size={18} />
              </a>
              <MobileNav />
            </div>
          </div>
        </nav>

        <PageTransition>{children}</PageTransition>
        <footer className="global-footer">
          <div className="container">
            <div className="footer-top-grid">
              <div className="footer-brand">
                <p className="footer-desc serif">
                  Leading Contemporary Art Editorial and<br />
                  Art Knowledge Media based in Taipei.
                </p>
              </div>
              <div className="footer-newsletter">
                <h3 className="caps-label" style={{ color: 'var(--ink)' }}>Subscribe to Newsletter</h3>
                <div className="newsletter-input-group">
                  <input type="email" placeholder="Your email address" className="newsletter-input" />
                  <button className="newsletter-btn">→</button>
                </div>
              </div>
            </div>
            
            <div className="footer-links-row">
              <div className="footer-link-col">
                <h4>Sections</h4>
                <a href="/magazine">Magazine 雜誌</a>
                <a href="/people">Looom People</a>
                <a href="/looom-club">Looom Club</a>
                <a href="/contact">Contact 聯繫</a>
              </div>
              <div className="footer-link-col">
                <h4>Connect</h4>
                <a href="mailto:news@theartpressasia.com">新聞稿收件信箱，請點擊聯繫。</a>
                <a href="mailto:ads@theartpressasia.com">廣告業務洽詢，請點擊聯繫。</a>
              </div>
              <div className="footer-link-col">
                <h4>Follow</h4>
                <a href="https://www.instagram.com/theartpressasia/" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
            
            <div className="footer-bottom">
              <div>© 2026 ART PRESS ASIA. ALL RIGHTS RESERVED.</div>
              <div>Belong to LOOOM ASIA GROUP.</div>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
