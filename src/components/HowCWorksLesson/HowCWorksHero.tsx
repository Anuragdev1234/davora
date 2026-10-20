import { motion } from 'framer-motion';
import { Clock, Layers, BookOpen } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './HowCWorksHero.module.css';

export function HowCWorksHero() {
  const reduced = useReducedMotion();

  return (
    <header className={styles.heroSection}>
      <div className={styles.heroGrid}>
        {/* Left Column: Editorial Typography */}
        <div className={styles.textContent}>
          {/* Eyebrow */}
          <motion.div
            className={styles.eyebrow}
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span>LESSON 02 / THE LOGIC CORE</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className={styles.heading}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            How a C Program Works
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={styles.subtitle}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            From writing source code to getting output.
          </motion.p>

          {/* Supporting Content */}
          <motion.p
            className={styles.description}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            A C program begins as instructions written by a programmer. Through a sequence of
            transformations, those instructions become machine-readable code that the computer can
            execute.
          </motion.p>

          {/* Secondary Statement */}
          <motion.div
            className={styles.secondaryStatement}
            initial={reduced ? undefined : { opacity: 0, x: -6 }}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            Your code is only the beginning. Discover what happens next.
          </motion.div>

          {/* Metadata Bar */}
          <motion.div
            className={styles.metaBar}
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            role="region"
            aria-label="Lesson Metadata"
          >
            <div className={styles.metaItem}>
              <BookOpen size={13} color="var(--color-text-muted)" aria-hidden="true" />
              <span className={styles.metaLabel}>Topic:</span>
              <span className={styles.metaValue}>C Fundamentals</span>
            </div>

            <div className={styles.metaDivider} aria-hidden="true" />

            <div className={styles.metaItem}>
              <Layers size={13} color="var(--color-text-muted)" aria-hidden="true" />
              <span className={styles.metaLabel}>Level:</span>
              <span className={styles.metaBadge}>Beginner</span>
            </div>

            <div className={styles.metaDivider} aria-hidden="true" />

            <div className={styles.metaItem}>
              <Clock size={13} color="var(--color-text-muted)" aria-hidden="true" />
              <span className={styles.metaLabel}>Est. time:</span>
              <span className={styles.metaValue}>8–10 Min</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Art-Directed Computational 3D Illustration */}
        <motion.div
          className={styles.imageWrapper}
          initial={reduced ? undefined : { opacity: 0, scale: 0.98, y: 14 }}
          animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          role="figure"
          aria-labelledby="journey-img-caption"
        >
          <div className={styles.imageAspectBox}>
            <img
              src="/images/devora-c-execution-journey.png"
              alt="DEVORA 3D architectural representation showing the 6 physical stages of C transformation from source document to silicon execution"
              className={styles.journeyImage}
              loading="eager"
            />
          </div>

          <div className={styles.imageCaption} id="journey-img-caption">
            <span className={styles.captionBadge}>
              <span className={styles.captionDot} aria-hidden="true" />
              <span>Computational Journey</span>
            </span>
            <span>6 Physical Transformation Stages</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

export default HowCWorksHero;
