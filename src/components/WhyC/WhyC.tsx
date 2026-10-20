import { motion } from 'framer-motion';
import { fadeUp, pathDraw, staggerContainer, viewportConfig } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './WhyC.module.css';

const columns = [
  {
    title: 'Memory',
    items: ['Variables & Values', 'Addresses & Pointers', 'Stack / Heap', 'Data Structures'],
    description: 'The instruction is a statement contained in one line denoting operations; it involves local variables, each having pointers.',
  },
  {
    title: 'Control',
    items: ['Conditions', 'Loops', 'Functions', 'Execution Paths'],
    description: 'The execution data exists; can instead for the application protocols to user release to the operations.',
  },
  {
    title: 'Systems',
    items: ['Kernel', 'Kernel Interaction', 'Kernel Interaction', 'Resource Management'],
    description: 'The module wants to memories condition; autonomous/able to the multinomial innovation interested to be a framework kernel.',
  },
];

export function WhyC() {
  const reduced = useReducedMotion();

  return (
    <section id="whyc" className={styles.section} aria-label="Why C">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className={styles.sectionLabel}>02 / WHY C</span>
          <h2 className={styles.heading}>
            Learn how the machine thinks.
          </h2>
        </motion.div>

        {/* Diagram */}
        <motion.div
          className={styles.diagram}
          variants={staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* C instruction box */}
          <motion.div className={styles.instructionBox} variants={fadeUp}>
            <span className={styles.instructionLabel}>C instruction</span>
          </motion.div>

          {/* SVG connector from C instruction to the diagram */}
          <svg className={styles.connectorSvg} viewBox="0 0 120 60" fill="none" aria-hidden="true">
            <motion.path
              d="M 10 30 L 50 30 L 50 10 M 50 30 L 50 50 M 50 30 L 110 30"
              stroke="#C8CAC4"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              variants={pathDraw}
              custom={0}
            />
          </svg>

          {/* Three columns */}
          <div className={styles.columnsGrid}>
            {columns.map((col, i) => (
              <motion.div
                key={col.title}
                className={styles.column}
                variants={fadeUp}
                custom={i + 1}
              >
                <div className={styles.columnHeader}>
                  <h3 className={styles.columnTitle}>{col.title}</h3>
                </div>
                <div className={styles.columnBody}>
                  {/* Internal diagram items with connecting lines */}
                  <svg className={styles.internalSvg} viewBox="0 0 200 160" fill="none" aria-hidden="true">
                    {col.items.map((item, j) => {
                      const y = 20 + j * 36;
                      return (
                        <g key={j}>
                          <rect
                            x="20" y={y} width="160" height="28" rx="4"
                            fill="none" stroke="#D8DAD4" strokeWidth="1"
                          />
                          <text x="100" y={y + 18} textAnchor="middle"
                            fill="#191B19" fontFamily="Inter, sans-serif"
                            fontSize="11" fontWeight="500"
                          >
                            {item}
                          </text>
                          {j < col.items.length - 1 && (
                            <line
                              x1="100" y1={y + 28} x2="100" y2={y + 36}
                              stroke="#D8DAD4" strokeWidth="1"
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>
                <p className={styles.columnDesc}>{col.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyC;
