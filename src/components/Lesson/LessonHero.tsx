import { motion } from 'framer-motion';
import { Clock, Layers, BookOpen } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './LessonHero.module.css';

export function LessonHero() {
  const reduced = useReducedMotion();

  return (
    <header className={styles.heroSection}>
      <div className={styles.heroContent}>
        {/* Left Editorial Content */}
        <div className={styles.textContent}>
          {/* Eyebrow */}
          <motion.div
            className={styles.eyebrow}
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span>LESSON 01 / THE FOUNDATIONS</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className={styles.heading}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Introduction to C
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            className={styles.description}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            Before you write complex programs, understand the language that shaped modern
            computing. Discover how C works, why it matters, and how your first program comes to life.
          </motion.p>

          {/* Editorial Metadata Bar */}
          <motion.div
            className={styles.metaBar}
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            role="region"
            aria-label="Lesson Metadata"
          >
            <div className={styles.metaItem}>
              <BookOpen size={14} color="var(--color-text-muted)" aria-hidden="true" />
              <span className={styles.metaLabel}>Topic:</span>
              <span className={styles.metaValue}>C Fundamentals</span>
            </div>

            <div className={styles.metaDivider} aria-hidden="true" />

            <div className={styles.metaItem}>
              <Layers size={14} color="var(--color-text-muted)" aria-hidden="true" />
              <span className={styles.metaLabel}>Level:</span>
              <span className={styles.metaBadge}>Beginner</span>
            </div>

            <div className={styles.metaDivider} aria-hidden="true" />

            <div className={styles.metaItem}>
              <Clock size={14} color="var(--color-text-muted)" aria-hidden="true" />
              <span className={styles.metaLabel}>Estimated time:</span>
              <span className={styles.metaValue}>8–10 minutes</span>
            </div>
          </motion.div>
        </div>

        {/* Right Restrained Logic Core Vector Motif */}
        <div className={styles.motifContainer} aria-hidden="true">
          <svg
            className={styles.motifSvg}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="80" cy="80" r="72" stroke="var(--color-border-light)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="80" cy="80" r="54" stroke="var(--color-border)" strokeWidth="1.2" />
            <circle cx="80" cy="80" r="36" stroke="var(--color-border)" strokeWidth="1" />
            <circle cx="80" cy="80" r="20" stroke="var(--color-text)" strokeWidth="1.5" />
            <circle cx="80" cy="80" r="6" fill="var(--color-text)" />
            {/* Accent Satellite Dot */}
            <circle cx="116" cy="80" r="4" fill="var(--color-accent)" stroke="var(--color-text)" strokeWidth="1" />
            <circle cx="80" cy="44" r="3" fill="var(--color-accent)" />
            {/* Precision Crosshairs */}
            <line x1="80" y1="4" x2="80" y2="16" stroke="var(--color-text-muted)" strokeWidth="1" />
            <line x1="80" y1="144" x2="80" y2="156" stroke="var(--color-text-muted)" strokeWidth="1" />
            <line x1="4" y1="80" x2="16" y2="80" stroke="var(--color-text-muted)" strokeWidth="1" />
            <line x1="144" y1="80" x2="156" y2="80" stroke="var(--color-text-muted)" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default LessonHero;
