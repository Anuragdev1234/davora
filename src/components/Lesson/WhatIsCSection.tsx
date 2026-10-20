import { motion } from 'framer-motion';
import { Cpu, Terminal, Layers } from 'lucide-react';
import { fadeUp, viewportConfig } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './WhatIsCSection.module.css';

const FEATURE_PILLS = [
  'Procedural programming',
  'Structured programming',
  'Efficient execution',
  'Low-level memory access',
  'Portable implementations',
];

export function WhatIsCSection() {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className={styles.section}
      variants={reduced ? undefined : fadeUp}
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={viewportConfig}
      aria-labelledby="what-is-c-heading"
    >
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>01 / ORIGIN &amp; PHILOSOPHY</span>
        <h2 id="what-is-c-heading" className={styles.heading}>
          A small language. An enormous legacy.
        </h2>
      </div>

      <div className={styles.prose}>
        <p>
          C is a general-purpose programming language developed by Dennis Ritchie at Bell Labs in
          1972. It is one of the most influential programming languages and has helped shape many
          modern programming languages.
        </p>
        <p>
          C supports procedural and structured programming. Its efficient execution, direct memory
          access capabilities, and close relationship with computer architecture make it especially
          useful for software that needs control and performance.
        </p>
        <p>
          C is widely used in operating systems, embedded systems, compilers, system software,
          database engines, and other performance-sensitive applications.
        </p>
      </div>

      {/* Feature Labels / Pills */}
      <div className={styles.featurePillsContainer} role="region" aria-label="Core Language Properties">
        <div className={styles.featurePillsLabel}>Core Language Characteristics</div>
        <div className={styles.pillsList}>
          {FEATURE_PILLS.map((pill) => (
            <span key={pill} className={styles.pill}>
              <span className={styles.pillDot} aria-hidden="true" />
              <span>{pill}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Architecture Concept Diagram */}
      <div className={styles.diagramBox} role="figure" aria-label="C in the System Architecture Diagram">
        <div className={styles.diagramHeader}>
          <span className={styles.diagramTitle}>C’s Unique Position in Computer Architecture</span>
          <span className={styles.diagramNote}>Hardware $\longleftrightarrow$ Software Bridge</span>
        </div>

        <div className={styles.architectureFlow}>
          {/* Column 1: Hardware Layer */}
          <div className={styles.archColumn}>
            <span className={styles.archTag}>Underlying Metal</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <Cpu size={16} color="var(--color-text-secondary)" aria-hidden="true" />
              <div className={styles.archName}>Hardware &amp; Silicon</div>
            </div>
            <p className={styles.archDesc}>
              Physical CPU registers, program counter, ALU, virtual address space, and direct byte memory pages.
            </p>
          </div>

          {/* Column 2: C Programming Language (Elevated) */}
          <div className={`${styles.archColumn} ${styles.archColumnC}`}>
            <span className={styles.archTag}>Deterministic Bridge</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <Terminal size={16} color="#2c590c" aria-hidden="true" />
              <div className={styles.archName}>C Language</div>
            </div>
            <p className={styles.archDesc}>
              Zero runtime overhead. Typed pointers mirror hardware addresses. Instructions compile directly into native machine instructions without a virtual machine.
            </p>
          </div>

          {/* Column 3: Systems Layer */}
          <div className={styles.archColumn}>
            <span className={styles.archTag}>Modern Infrastructure</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <Layers size={16} color="var(--color-text-secondary)" aria-hidden="true" />
              <div className={styles.archName}>Operating Systems</div>
            </div>
            <p className={styles.archDesc}>
              The foundation of Linux, macOS, Windows kernels, PostgreSQL/SQLite databases, Git, and high-level language runtimes.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default WhatIsCSection;
