import { motion } from 'framer-motion';
import { fadeUp, fadeIn } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import { TheoryLogicCore } from './TheoryLogicCore';
import styles from './TheoryHero.module.css';

export function TheoryHero() {
  const reduced = useReducedMotion();

  return (
    <section className={styles.heroSection} aria-label="Theory Hero">
      <div className="container">
        <div className={styles.heroGrid}>
          {/* Left Column: Editorial Headline & Subtitle */}
          <div className={styles.textColumn}>
            <motion.div
              className={styles.eyebrow}
              variants={reduced ? undefined : fadeIn}
              initial={reduced ? undefined : 'hidden'}
              animate="visible"
              custom={0.1}
            >
              <span className={styles.eyebrowDash} aria-hidden="true" />
              <span>DEVORA / THE LOGIC CORE</span>
            </motion.div>

            <motion.h1
              className={styles.heading}
              variants={reduced ? undefined : fadeUp}
              initial={reduced ? undefined : 'hidden'}
              animate="visible"
              custom={0.18}
            >
              <span className={styles.headingLine}>Understand what</span>
              <span className={styles.headingLine}>happens beneath the code.</span>
            </motion.h1>

            <motion.p
              className={styles.supportingText}
              variants={reduced ? undefined : fadeUp}
              initial={reduced ? undefined : 'hidden'}
              animate="visible"
              custom={0.3}
            >
              Explore the principles behind C — from the way instructions execute to the way
              memory, data, and control work together.
            </motion.p>
          </div>

          {/* Right Column: Devora Logic Core Visual */}
          <motion.div
            variants={reduced ? undefined : fadeUp}
            initial={reduced ? undefined : 'hidden'}
            animate="visible"
            custom={0.4}
          >
            <TheoryLogicCore />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default TheoryHero;
