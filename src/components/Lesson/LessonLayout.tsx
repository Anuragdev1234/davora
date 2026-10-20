import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Menu, X, Terminal, BookOpen } from 'lucide-react';
import { Link, useNavigate } from '../../router/Router';
import styles from './LessonLayout.module.css';

interface LessonLayoutProps {
  children: React.ReactNode;
  currentLessonTitle?: string;
  categoryTitle?: string;
  lessonNumber?: string;
  isWideLayout?: boolean;
}

export function LessonLayout({
  children,
  currentLessonTitle = 'Introduction to C',
  categoryTitle = 'BASICS',
  lessonNumber = '01',
  isWideLayout = false,
}: LessonLayoutProps) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Set document title
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `DEVORA — ${currentLessonTitle}`;
    return () => {
      document.title = prevTitle;
    };
  }, [currentLessonTitle]);

  // Track scroll position for header blur / shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 25);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* ── Sticky Header ── */}
      <header
        className={`${styles.headerSticky} ${scrolled ? styles.headerScrolled : ''}`}
        role="banner"
      >
        <div className={`${styles.navContainer} ${isWideLayout ? styles.navContainerWide : ''}`}>
          {/* Brand Logo */}
          <Link to="/" className={styles.brandLogo} aria-label="DEVORA — Return to Home">
            <span className={styles.brandDot} aria-hidden="true" />
            <span>DEVORA</span>
          </Link>

          {/* Navigation Links */}
          <nav className={styles.navLinks} aria-label="Main Navigation">
            <Link to="/" className={styles.navLink}>
              The Logic Core
            </Link>
            <Link to="/theory" className={`${styles.navLink} ${styles.navLinkActive}`}>
              Curriculum
            </Link>
            <Link to="/#history" className={styles.navLink}>
              History
            </Link>
            <Link to="/#experiment" className={styles.navLink}>
              Try It
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className={styles.rightActions}>
            <button
              type="button"
              className={styles.backBtn}
              onClick={() => navigate('/theory')}
              aria-label="Back to Theory Curriculum"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Back to Theory</span>
            </button>

            <button
              type="button"
              className={styles.ctaBtn}
              onClick={() => navigate('/#experiment')}
            >
              Explore Devora
            </button>

            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Editorial Breadcrumb Sub-bar ── */}
        <div className={styles.subBar}>
          <div className={`${styles.subBarContainer} ${isWideLayout ? styles.subBarContainerWide : ''}`}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link to="/" className={styles.breadcrumbLink}>
                DEVORA
              </Link>
              <span className={styles.breadcrumbDivider} aria-hidden="true">
                /
              </span>
              <Link to="/theory" className={styles.breadcrumbLink}>
                THEORY
              </Link>
              <span className={styles.breadcrumbDivider} aria-hidden="true">
                /
              </span>
              <Link to="/theory" className={styles.breadcrumbLink}>
                {categoryTitle}
              </Link>
              <span className={styles.breadcrumbDivider} aria-hidden="true">
                /
              </span>
              <span className={styles.breadcrumbCurrent} aria-current="page">
                {currentLessonTitle.toUpperCase()}
              </span>
            </nav>

            <div className={styles.lessonQuickPill}>
              <BookOpen size={12} aria-hidden="true" />
              <span>Lesson {lessonNumber}</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/" onClick={() => setMenuOpen(false)}>
                The Logic Core
              </Link>
              <Link to="/theory" onClick={() => setMenuOpen(false)}>
                Curriculum
              </Link>
              <Link to="/#history" onClick={() => setMenuOpen(false)}>
                History
              </Link>
              <Link to="/#experiment" onClick={() => setMenuOpen(false)}>
                Try It
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/theory');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                }}
              >
                <ArrowLeft size={16} />
                <span>Back to Theory</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Main Educational Article Container ── */}
      <main
        className={`${styles.mainContainer} ${isWideLayout ? styles.mainContainerWide : ''}`}
        id="lesson-content"
      >
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className={styles.footer} role="contentinfo">
        <div className={`${styles.footerInner} ${isWideLayout ? styles.footerInnerWide : ''}`}>
          <div className={styles.footerLeft}>
            <div className={styles.footerBrand}>
              <span className={styles.brandDot} aria-hidden="true" />
              <span>DEVORA</span>
            </div>
            <div>Copyright &copy; 2023 DEVORA. All rights reserved.</div>
          </div>

          <div className={styles.footerRight}>
            <div className={styles.footerBrand}>
              <Terminal size={14} aria-hidden="true" />
              <span>DEVORA</span>
            </div>
            <div>Inside the Logic.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LessonLayout;
