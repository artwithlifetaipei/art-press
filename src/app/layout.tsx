import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ART PRESS Asia | The Leading Contemporary Art Editorial",
  description: "The Leading Contemporary Art Editorial and Art Knowledge Media based in Taipei, providing exhibitions, research artists, view and insights.",
  keywords: ["contemporary art", "taiwan art", "art media", "exhibitions", "art interviews", "Patricia Dominguez", "Taipei Biennial"],
  openGraph: {
    title: "ART PRESS Asia",
    description: "The Leading Contemporary Art Editorial and Art Knowledge Media based in Taipei.",
    url: "https://theartpressasia.com",
    siteName: "ART PRESS Asia",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
};

import PageTransition from "@/components/PageTransition";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <nav className="global-nav">
          <div className="container nav-content">
            <a href="/" className="logo-link">
              <img src="/logo_final.jpg" alt="ART PRESS" className="logo-img" />
            </a>
            <div className="nav-links">
              <a href="/magazine">Magazine 雜誌</a>
              <a href="/people">Looom People</a>
              <a href="/contact">Contact 聯繫</a>
            </div>
            <div className="nav-meta">
              <a href="https://www.instagram.com/looomasia/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>
        </nav>
        <PageTransition>{children}</PageTransition>
        <footer className="global-footer">
          <div className="container">
            <div className="footer-top">
              <img src="/logo_final.jpg" alt="ART PRESS" className="footer-logo" />
              <p className="footer-desc">
                Leading Contemporary Art Editorial and Art Knowledge Media based in Taipei.
              </p>
            </div>
            <div className="footer-content-row">
              <div className="footer-contact-info">
                <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>新聞稿收件：news@theartpressasia.com</p>
                <p style={{ fontSize: '0.9rem' }}>廣告業務洽詢：ads@theartpressasia.com</p>
              </div>
              <div className="footer-links-grid">
                <div className="footer-link-col">
                  <h4>Sections</h4>
                  <a href="/">Magazine</a>
                  <a href="/">People</a>
                  <a href="/">Contact</a>
                </div>
                <div className="footer-link-col">
                  <h4>Follow</h4>
                  <a href="https://www.instagram.com/looomasia/" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom" style={{ marginTop: '6rem', paddingTop: '2rem', borderTop: '1px solid #EEE', fontSize: '0.8rem', color: '#888' }}>
              <p>© 2026 ART PRESS. Belong to Looom Asia.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
