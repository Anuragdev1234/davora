import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Menu, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from '../../router/Router';
import { curriculumCategories, type LessonItem } from '../../data/curriculumData';
import styles from './TheoryNavbar.module.css';

interface TheoryNavbarProps {
  onSelectLesson?: (lesson: LessonItem) => void;
}

export function TheoryNavbar({ onSelectLesson }: TheoryNavbarProps) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [searchOpen]);

  // Global keyboard shortcut to open search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Filter lessons across all categories
  const searchResults = searchQuery.trim()
    ? curriculumCategories.flatMap((cat) =>
        cat.lessons
          .filter(
            (lesson) =>
              lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((lesson) => ({ lesson, categoryTitle: cat.title }))
      )
    : [];

  const handleLessonPick = (lesson: LessonItem) => {
    setSearchOpen(false);
    if (lesson.id === 'intro-c' || lesson.slug.includes('introduction-to-c')) {
      navigate('/theory/introduction-to-c');
    } else if (lesson.id === 'how-c-works' || lesson.slug.includes('how-a-c-program-works')) {
      navigate('/theory/how-a-c-program-works');
    } else if (lesson.id === 'structure-c' || lesson.slug.includes('structure-of-a-c-program')) {
      navigate('/theory/structure-of-a-c-program');
    } else if (onSelectLesson) {
      onSelectLesson(lesson);
    }
  };

  return (
    <>
      <header className={styles.navWrapper}>
        <div className={`${styles.navContainer} ${scrolled ? styles.scrolled : ''}`}>
          <Link to="/" className={styles.logo} aria-label="DEVORA — Return to Home">
            DEVORA
          </Link>

          <nav className={styles.links} aria-label="Theory page navigation">
            <Link to="/" className={styles.link}>
              The Logic Core
            </Link>
            <span className={`${styles.link} ${styles.linkActive}`}>Curriculum</span>
            <Link to="/#history" className={styles.link}>
              History
            </Link>
            <Link to="/#experiment" className={styles.link}>
              Try It
            </Link>
          </nav>

          <div className={styles.rightActions}>
            <button
              type="button"
              className={styles.searchBtn}
              onClick={() => setSearchOpen(true)}
              aria-label="Search lessons and topics (Ctrl + K)"
              title="Search curriculum (Ctrl + K)"
            >
              <Search size={17} aria-hidden="true" />
            </button>

            <button
              type="button"
              className={styles.ctaBtn}
              onClick={() => navigate('/')}
            >
              Explore Devora
            </button>

            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                The Logic Core (Home)
              </Link>
              <span className={styles.mobileLink} style={{ fontWeight: 600 }}>
                Curriculum
              </span>
              <Link to="/#history" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                History
              </Link>
              <Link
                to="/#experiment"
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                Try It
              </Link>
              <button
                type="button"
                className={styles.mobileLink}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-text-secondary)',
                }}
                onClick={() => {
                  setMenuOpen(false);
                  setSearchOpen(true);
                }}
              >
                <Search size={15} />
                <span>Search curriculum...</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Interactive Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className={styles.searchModalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              className={styles.searchModal}
              initial={{ scale: 0.96, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Curriculum Search"
            >
              <div className={styles.searchInputRow}>
                <Search size={18} style={{ color: 'var(--color-text-muted)' }} />
                <input
                  ref={searchInputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search C topics, pointers, memory, loops, structs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery ? (
                  <button
                    type="button"
                    className={styles.searchClearBtn}
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                ) : (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--color-text-muted)',
                      border: '1px solid var(--color-border-light)',
                      borderRadius: '4px',
                      padding: '2px 6px',
                    }}
                  >
                    ESC
                  </span>
                )}
              </div>

              <div className={styles.searchResultsList}>
                {searchQuery.trim() ? (
                  searchResults.length > 0 ? (
                    searchResults.map(({ lesson, categoryTitle }) => (
                      <button
                        key={lesson.id}
                        type="button"
                        className={styles.searchResultItem}
                        onClick={() => handleLessonPick(lesson)}
                      >
                        <div>
                          <div className={styles.searchResultTitle}>{lesson.title}</div>
                          <div className={styles.searchResultCat}>
                            {categoryTitle} • {lesson.duration} • {lesson.difficulty}
                          </div>
                        </div>
                        <ArrowRight size={14} style={{ color: 'var(--color-text-muted)' }} />
                      </button>
                    ))
                  ) : (
                    <div className={styles.searchEmptyState}>
                      No lessons matching &ldquo;{searchQuery}&rdquo;
                    </div>
                  )
                ) : (
                  <div className={styles.searchEmptyState}>
                    Type to search across all 60+ C lessons, data structures, and courses.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default TheoryNavbar;
