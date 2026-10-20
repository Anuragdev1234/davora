import { useEffect, useState } from 'react';
import { CHAPTERS, type ChapterItem } from '../../data/recursionLessonData';
import styles from './ChapterNavRail.module.css';

export function ChapterNavRail() {
  const [activeChapterId, setActiveChapterId] = useState<string>(CHAPTERS[0].id);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently closest to the top of viewport
      const offset = 180;
      let currentId = CHAPTERS[0].id;

      for (let i = 0; i < CHAPTERS.length; i++) {
        const ch = CHAPTERS[i];
        const el = document.getElementById(ch.targetId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            currentId = ch.id;
          }
        }
      }

      setActiveChapterId(currentId);

      // Only show rail once user has scrolled into the long-form lesson (past the hero)
      // and hide before the footer
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pastHero = scrollPos > 420;
      const nearFooter = docHeight - scrollPos < 350;
      setIsVisible(pastHero && !nearFooter);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToChapter = (chapter: ChapterItem) => {
    setActiveChapterId(chapter.id);
    const el = document.getElementById(chapter.targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Desktop Sticky Rail */}
      <aside
        className={styles.desktopRail}
        style={{
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
        aria-label="Lesson Chapter Navigation"
      >
        <div className={styles.railHeader}>
          <span className={styles.railTitle}>Chapters</span>
          <span className={styles.railCount}>{CHAPTERS.length}</span>
        </div>

        <ul className={styles.chapterList}>
          {CHAPTERS.map((ch) => {
            const isActive = ch.id === activeChapterId;
            return (
              <li key={ch.id}>
                <button
                  type="button"
                  className={`${styles.chapterItem} ${isActive ? styles.chapterItemActive : ''}`}
                  onClick={() => scrollToChapter(ch)}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <span
                    className={`${styles.chapterNumber} ${
                      isActive ? styles.chapterNumberActive : ''
                    }`}
                  >
                    {ch.number}
                  </span>
                  <span className={styles.chapterTitleText} title={ch.title}>
                    {ch.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Mobile Horizontal Strip */}
      <nav
        className={styles.mobileStrip}
        style={{
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
          transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
        aria-label="Mobile Chapter Navigation"
      >
        <div className={styles.mobileStripList}>
          {CHAPTERS.map((ch) => {
            const isActive = ch.id === activeChapterId;
            return (
              <button
                key={ch.id}
                type="button"
                className={`${styles.mobilePill} ${isActive ? styles.mobilePillActive : ''}`}
                onClick={() => scrollToChapter(ch)}
              >
                <span>{ch.number}</span>
                <span>{ch.title}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
