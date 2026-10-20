import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useMotion';
import { TOTAL_PROGRAMS_COUNT, TOTAL_COLLECTIONS_COUNT } from '../../data/programs';
import styles from './ProgramsHero.module.css';

export function ProgramsHero() {
  const reduced = useReducedMotion();

  return (
    <section className={styles.heroSection} aria-label="Programs Library Hero">
      <div className={styles.container}>
        {/* Left Editorial Text Column */}
        <div className={styles.leftColumn}>
          <motion.div
            className={styles.breadcrumb}
            initial={reduced ? undefined : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className={styles.breadcrumbDash} />
            <span>DEVORA / C PROGRAMMING / PRACTICE LIBRARY</span>
          </motion.div>

          <motion.h1
            className={styles.heroHeading}
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            C Programming Programs
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore essential C programs, understand the logic, and build confidence
            through practical examples.
          </motion.p>

          <motion.div
            className={styles.metaStrip}
            initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <span className={styles.metaHighlight}>{TOTAL_COLLECTIONS_COUNT} collections</span>
            <span className={styles.metaDot} />
            <span className={styles.metaHighlight}>{TOTAL_PROGRAMS_COUNT} programs</span>
            <span className={styles.metaDot} />
            <span>Beginner to Advanced</span>
          </motion.div>
        </div>

        {/* Right Stage: Logic Core Sculpture with Callouts */}
        <motion.div
          className={styles.rightStage}
          initial={reduced ? undefined : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.sculptureWrapper}>
            {/* Real HTML Callouts */}
            <div className={`${styles.callout} ${styles.calloutLogic}`}>
              <span className={styles.calloutTitle}>LOGIC</span>
              <span className={styles.calloutDesc}>From problem to solution</span>
            </div>

            <div className={`${styles.callout} ${styles.calloutMemory}`}>
              <span className={styles.calloutTitle}>MEMORY</span>
              <span className={styles.calloutDesc}>Store, access, and manage data</span>
            </div>

            <div className={`${styles.callout} ${styles.calloutExecution}`}>
              <span className={styles.calloutTitle}>EXECUTION</span>
              <span className={styles.calloutDesc}>Turn code into real results</span>
            </div>

            {/* SVG Connector Lines */}
            <svg
              className={styles.calloutSvgOverlay}
              viewBox="0 0 520 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Line 1: LOGIC to top rim */}
              <motion.path
                d="M 68 45 L 105 45 L 126 62"
                stroke="#27272a"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              <circle cx="126" cy="62" r="2.5" fill="#18181b" />

              {/* Line 2: MEMORY to mid rib */}
              <motion.path
                d="M 60 178 L 118 178"
                stroke="#27272a"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
              <circle cx="118" cy="178" r="2.5" fill="#18181b" />

              {/* Line 3: EXECUTION to right notch */}
              <motion.path
                d="M 430 115 L 398 115 L 348 134"
                stroke="#27272a"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              />
              <circle cx="348" cy="134" r="2.5" fill="#18181b" />
            </svg>

            {/* Pristine 3D Sculpture Image */}
            <img
              src="/images/devora-logic-core-sculpture-flawless.png"
              alt="DEVORA Logic Core Sculpture"
              className={styles.sculptureImage}
              width={510}
              height={267}
              loading="eager"
            />
          </div>

          {/* Clean Mobile / Tablet Callouts Bar */}
          <div className={styles.mobileCallouts}>
            <div className={styles.mobileCalloutCard}>
              <span className={styles.calloutTitle}>LOGIC</span>
              <span className={styles.calloutDesc}>From problem to solution</span>
            </div>
            <div className={styles.mobileCalloutCard}>
              <span className={styles.calloutTitle}>MEMORY</span>
              <span className={styles.calloutDesc}>Store, access, & manage data</span>
            </div>
            <div className={styles.mobileCalloutCard}>
              <span className={styles.calloutTitle}>EXECUTION</span>
              <span className={styles.calloutDesc}>Turn code into real results</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
