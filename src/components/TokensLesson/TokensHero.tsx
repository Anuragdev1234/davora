import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Maximize2, X, Sparkles, BookOpen } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './TokensHero.module.css';

interface TokensHeroProps {
  onExploreClick: () => void;
}

export function TokensHero({ onExploreClick }: TokensHeroProps) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  return (
    <section className={styles.heroSection} aria-label="Tokens, Keywords and Identifiers in C Hero">
      <div className={styles.container}>
        {/* Meta Header / Breadcrumb */}
        <div className={styles.metaHeader}>
          <div className={styles.breadcrumbGroup}>
            <span
              className={styles.breadcrumbLink}
              onClick={() => navigate('/theory')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/theory')}
            >
              C Basics
            </span>
            <span className={styles.breadcrumbDivider}>›</span>
            <span className={styles.breadcrumbCurrent}>PROGRAM TOKENS</span>
          </div>

          <div className={styles.lessonIndexBadge}>
            <BookOpen size={13} aria-hidden="true" />
            <span>04 / 12</span>
          </div>
        </div>

        {/* Two-Column Hero Grid */}
        <div className={styles.heroGrid}>
          {/* Column 1: Editorial Typography & Actions */}
          <motion.div
            className={styles.textColumn}
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className={styles.headline}>
              <span className={styles.titleLine}>Tokens, Keywords</span>
              <span className={styles.titleLine}>and Identifiers</span>
              <span className={styles.titleLine}>in C</span>
            </h1>

            <p className={styles.leadParagraph}>
              Tokens are the smallest meaningful lexical elements of a C program recognized by the
              compiler. C tokens include <strong>keywords, identifiers, constants, string literals,
              and operators and punctuators</strong>.
            </p>

            <div className={styles.actionRow}>
              <button
                type="button"
                className={styles.ctaButton}
                onClick={onExploreClick}
                aria-label="Explore the tokens in detail"
              >
                <span>Explore the Tokens</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>

              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setIsLightboxOpen(true)}
                aria-label="Inspect the tokens infographic in high resolution"
              >
                <Maximize2 size={14} aria-hidden="true" />
                <span>View Full Infographic</span>
              </button>
            </div>
          </motion.div>

          {/* Column 2: Prominently Embedded Reference Infographic Card */}
          <motion.div
            className={styles.infographicColumn}
            initial={reduced ? undefined : { opacity: 0, scale: 0.98, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.infographicCard}>
              {/* Window Card Bar */}
              <div className={styles.cardHeader}>
                <div className={styles.cardControls}>
                  <span className={`${styles.windowDot} ${styles.dotRed}`} />
                  <span className={`${styles.windowDot} ${styles.dotAmber}`} />
                  <span className={`${styles.windowDot} ${styles.dotGreen}`} />
                </div>

                <div className={styles.cardBadge}>
                  <Sparkles size={12} color="#0055ff" aria-hidden="true" />
                  <span>Visual Reference &bull; C Lexical Anatomy</span>
                </div>

                <button
                  type="button"
                  className={styles.zoomTriggerBtn}
                  onClick={() => setIsLightboxOpen(true)}
                  title="Expand to Fullscreen"
                  aria-label="Expand image"
                >
                  <Maximize2 size={13} aria-hidden="true" />
                  <span>Expand</span>
                </button>
              </div>

              {/* Exact Infographic Image Frame */}
              <div
                className={styles.imageFrame}
                onClick={() => setIsLightboxOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsLightboxOpen(true)}
                aria-label="Click to inspect high-resolution tokens infographic"
              >
                <img
                  src="/images/tokens_keywords_identifiers_infographic.jpg"
                  alt="Visual infographic breakdown of Tokens, Keywords, and Identifiers in C showing preprocessor directives, keywords, identifiers, constants, string literals, operators, and punctuators."
                  className={styles.infographicImage}
                  loading="eager"
                />

                <div className={styles.imageHoverHint}>
                  <Maximize2 size={12} aria-hidden="true" />
                  <span>Click to expand full resolution</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div
            className={styles.modalBackdrop}
            onClick={() => setIsLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Tokens Infographic Fullscreen View"
          >
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.modalHeaderBar}>
                <span className={styles.modalTitle}>Tokens, Keywords & Identifiers Reference Infographic</span>
                <button
                  type="button"
                  className={styles.modalCloseBtn}
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close fullscreen modal"
                >
                  <X size={20} />
                </button>
              </div>

              <img
                src="/images/tokens_keywords_identifiers_infographic.jpg"
                alt="Tokens, Keywords, and Identifiers in C high-resolution full-size diagram"
                className={styles.modalImage}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
