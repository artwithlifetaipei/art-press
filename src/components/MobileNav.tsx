"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants: any = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const linkVariants: any = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + (i * 0.1), duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    })
  };

  const links = [
    { name: "Magazine 雜誌", href: "/magazine" },
    { name: "Looom People", href: "/people" },
    { name: "Looom Club", href: "/looom-club" },
    { name: "Press 媒體報導", href: "/press" },
    { name: "Contact 聯繫", href: "/contact" }
  ];

  return (
    <div className="mobile-nav-container">
      <button 
        onClick={toggleMenu} 
        className="hamburger-btn"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="mobile-menu-content">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="mobile-menu-link serif"
                  variants={linkVariants}
                  custom={i}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div 
                className="mobile-menu-footer"
                variants={linkVariants}
                custom={3}
              >
                <a href="https://www.instagram.com/looomasia/" target="_blank" rel="noopener noreferrer" className="mobile-social-link">
                  Instagram
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
