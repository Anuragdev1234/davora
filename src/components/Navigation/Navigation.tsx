import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from '../../router/Router';
import { useReducedMotion, useScrollTo } from '../../hooks/useMotion';
import styles from './Navigation.module.css';

const NAV_LINKS = [
  { label: 'Intro', target: 'intro_action', isRoute: false },
  { label: 'The Logic Core', target: 'hero', isRoute: false },
  { label: 'Curriculum', target: '/theory', isRoute: true },
  { label: 'Programs', target: '/programs', isRoute: true },
  { label: 'History', target: 'history', isRoute: false },
  { label: 'Try It', target: 'experiment', isRoute: false },
];

interface NavigationProps {
  onReplayIntro?: () => void;
}

export function Navigation({ onReplayIntro }: NavigationProps = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const reduced = useReducedMotion();
  const scrollTo = useScrollTo();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (link: (typeof NAV_LINKS)[0]) => {
    if (link.target === 'intro_action') {
      if (onReplayIntro) {
        onReplayIntro();
      } else {
        navigate('/');
      }
      setMenuOpen(false);
      return;
    }

    if (link.isRoute) {
      navigate(link.target);
    } else {
      if (location.pathname !== '/') {
        navigate(`/#${link.target}`);
      } else {
        scrollTo(link.target);
      }
    }
    setMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      scrollTo('hero');
    }
  };

  const isLinkActive = (link: (typeof NAV_LINKS)[0]) => {
    if (!link.isRoute) return false;
    if (link.target === '/programs' && location.pathname.startsWith('/programs')) return true;
    if (link.target === '/theory' && (location.pathname.startsWith('/theory') || location.pathname.startsWith('/curriculum'))) return true;
    return location.pathname === link.target;
  };

  const isProgramsPage = location.pathname.startsWith('/programs');

  const handleCtaClick = () => {
    if (isProgramsPage) {
      const el = document.getElementById('programs-catalogue');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/programs');
    }
  };

  return (
    <motion.header
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={reduced ? undefined : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.inner}>
        <button
          className={styles.logo}
          onClick={handleLogoClick}
          aria-label="DEVORA — Go to top"
        >
          DEVORA
        </button>

        <nav className={styles.links} aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link);
            return (
              <button
                key={link.target}
                className={`${styles.link} ${active ? styles.activeLink : ''}`}
                onClick={() => handleNav(link)}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <button
          className={styles.cta}
          onClick={handleCtaClick}
        >
          {isProgramsPage ? 'Explore Programs →' : 'Explore Devora'}
        </button>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link);
              return (
                <button
                  key={link.target}
                  className={`${styles.mobileLink} ${active ? styles.activeLink : ''}`}
                  onClick={() => handleNav(link)}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              className={styles.mobileCta}
              onClick={() => {
                handleCtaClick();
                setMenuOpen(false);
              }}
            >
              {isProgramsPage ? 'Explore Programs →' : 'Explore Devora'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navigation;
