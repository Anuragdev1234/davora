import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Maximize2, X, Sparkles, BookOpen, Compass } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './VariablesHero.module.css';

interface VariablesHeroProps {
  onExploreClick?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export function VariablesHero({ onExploreClick, onNavigateSection }: VariablesHeroProps) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleScrollTo = (sectionId: string) => {
    if (onNavigateSection) {
      onNavigateSection(sectionId);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 90;
      const elPos = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elPos - navOffset, behavior: 'smooth' });
    }
  };

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    handleScrollTo('section-variables');
  };

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

  const navHotspots = [
    { label: '1. Variables in C', target: 'section-variables' },
    { label: '2. Constants in C', target: 'section-constants' },
    { label: '3. Scope of Variables', target: 'section-scope' },
    { label: '4. Data Types in C', target: 'section-datatypes' },
    { label: '5. Type Conversion', target: 'section-conversion' },
    { label: 'Knowledge Check', target: 'section-quiz' },
  ];

  return (
    <section className={styles.heroSection} aria-label="Variables and Data Types in C Hero">
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
            <span className={styles.breadcrumbCurrent}>VARIABLES & DATA TYPES</span>
          </div>

          <div className={styles.lessonIndexBadge}>
            <BookOpen size={13} aria-hidden="true" />
            <span>05 / 12</span>
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
              <span className={styles.titleLine}>Variables and</span>
              <span className={styles.titleLine}>Data Types in C</span>
            </h1>

            <p className={styles.leadParagraph}>
              A variable in C is a named object used to store a value that a program can access and,
              when permitted, modify during execution. Each variable has a data type that determines
              the kind of value it can represent and the operations that can be performed on it.
            </p>

            <p className={styles.supportingParagraph}>
              Variables allow programmers to work with meaningful names instead of directly managing
              memory addresses.
            </p>

            <div className={styles.actionRow}>
              <button
                type="button"
                className={styles.ctaButton}
                onClick={handleExplore}
                aria-label="Explore the lesson"
              >
                <span>Explore the Lesson</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>

              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setIsLightboxOpen(true)}
                aria-label="Inspect the variables infographic in full resolution"
              >
                <Maximize2 size={14} aria-hidden="true" />
                <span>View Full Infographic</span>
              </button>
            </div>
          </motion.div>

          {/* Column 2: Prominently Embedded Infographic Overview Card */}
          <motion.div
            id="hero-infographic"
            className={styles.infographicColumn}
            initial={reduced ? undefined : { opacity: 0, scale: 0.98, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.infographicCard}>
              {/* Window Header */}
              <div className={styles.cardHeader}>
                <div className={styles.cardControls}>
                  <span className={`${styles.windowDot} ${styles.dotRed}`} />
                  <span className={`${styles.windowDot} ${styles.dotAmber}`} />
                  <span className={`${styles.windowDot} ${styles.dotGreen}`} />
                </div>

                <div className={styles.cardBadge}>
                  <Sparkles size={12} color="#0055ff" aria-hidden="true" />
                  <span>Visual Overview &bull; Memory & Type Representation</span>
                </div>

                <button
                  type="button"
                  className={styles.zoomTriggerBtn}
                  onClick={() => setIsLightboxOpen(true)}
                  title="Expand to Fullscreen"
                  aria-label="Expand infographic"
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
                aria-label="Click to inspect full resolution infographic"
              >
                <img
                  src="/images/variables_datatypes_infographic.jpg"
                  alt="Variables and Data Types in C infographic showing memory representation, int age, float height, char grade, basic types, constants, and variable scope."
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

        {/* Connected Visual Navigation Bar (Hotspot Map) */}
        <div className={styles.visualNavBar} role="navigation" aria-label="Quick lesson sections navigation">
          <div className={styles.navBarLabel}>
            <Compass size={14} aria-hidden="true" />
            <span>Manuscript Jump Map:</span>
          </div>

          {navHotspots.map((spot) => (
            <button
              key={spot.target}
              type="button"
              className={styles.navHotspotBtn}
              onClick={() => handleScrollTo(spot.target)}
            >
              {spot.label}
            </button>
          ))}
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
            aria-label="Variables Infographic Fullscreen View"
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
                <span className={styles.modalTitle}>Variables and Data Types in C &bull; Official Reference</span>
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
                src="/images/variables_datatypes_infographic.jpg"
                alt="Variables and Data Types in C full-resolution diagram"
                className={styles.modalImage}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
