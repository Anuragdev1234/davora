import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './OperatorTaxonomySection.module.css';

interface TaxonomyCardData {
  number: string;
  id: string;
  targetAnchor: string;
  title: string;
  description: string;
  themeColor: string;
  bgTint: string;
  codeSnippet: string;
  exampleLabel: string;
  calculationContent: React.ReactNode;
}

const TAXONOMY_CARDS: TaxonomyCardData[] = [
  {
    number: '01',
    id: 'arithmetic',
    targetAnchor: 'section-arithmetic',
    title: 'Arithmetic Operators',
    description: 'Perform mathematical calculations.',
    themeColor: '#0055ff',
    bgTint: '#f0f5ff',
    codeSnippet: 'int result = a + b;',
    exampleLabel: 'Example',
    calculationContent: (
      <div className={styles.calculationRow}>
        <span>10 + 5</span>
        <span className={styles.arrowSym}>→</span>
        <span className={styles.calcResultBadge}>15</span>
      </div>
    ),
  },
  {
    number: '02',
    id: 'relational',
    targetAnchor: 'section-relational',
    title: 'Relational Operators',
    description: 'Compare two values and return 1 (true) or 0 (false).',
    themeColor: '#d97706',
    bgTint: '#fffaf0',
    codeSnippet: 'int result = a > b;',
    exampleLabel: 'Example',
    calculationContent: (
      <div className={styles.calculationRow}>
        <span>10 &gt; 5</span>
        <span className={styles.arrowSym}>→</span>
        <span className={styles.calcResultBadge}>1</span>
      </div>
    ),
  },
  {
    number: '03',
    id: 'logical',
    targetAnchor: 'section-logical',
    title: 'Logical Operators',
    description: 'Combine conditions or reverse a condition.',
    themeColor: '#ea580c',
    bgTint: '#fff5f2',
    codeSnippet: 'int result = a && b;',
    exampleLabel: 'Example',
    calculationContent: (
      <div className={styles.calculationRow}>
        <span>(1 &amp;&amp; 0)</span>
        <span className={styles.arrowSym}>→</span>
        <span className={styles.calcResultBadge}>0</span>
      </div>
    ),
  },
  {
    number: '04',
    id: 'assignment',
    targetAnchor: 'section-assignment',
    title: 'Assignment Operators',
    description: 'Assign values to variables. Compound operators combine an operation with assignment.',
    themeColor: '#10a37f',
    bgTint: '#f0faf5',
    codeSnippet: 'a += 5;',
    exampleLabel: 'Example',
    calculationContent: (
      <div className={styles.calculationRow}>
        <span>a = 10</span>
        <span style={{ fontSize: '0.75rem', color: '#10a37f', fontWeight: 600 }}>a += 5</span>
        <span className={styles.arrowSym}>→</span>
        <span className={styles.calcResultBadge}>15</span>
      </div>
    ),
  },
  {
    number: '05',
    id: 'bitwise',
    targetAnchor: 'section-bitwise',
    title: 'Bitwise Operators',
    description: 'Perform operations on individual bits of integers.',
    themeColor: '#9333ea',
    bgTint: '#faf5ff',
    codeSnippet: 'int result = a & b;',
    exampleLabel: 'Example',
    calculationContent: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div className={styles.calculationRow} style={{ fontSize: '0.78rem' }}>
          <span>0101 &amp; 0011</span>
          <span className={styles.arrowSym}>→</span>
          <span className={styles.calcResultBadge}>0001</span>
        </div>
        <div className={styles.calculationRow}>
          <span>(5 &amp; 3)</span>
          <span className={styles.arrowSym}>→</span>
          <span className={styles.calcResultBadge}>1</span>
        </div>
      </div>
    ),
  },
  {
    number: '06',
    id: 'increment',
    targetAnchor: 'section-increment',
    title: 'Increment / Decrement',
    description: 'Increase or decrease a value by one.',
    themeColor: '#0284c7',
    bgTint: '#f0f9ff',
    codeSnippet: '++a;   a--;',
    exampleLabel: 'Example',
    calculationContent: (
      <div
        className={styles.calculationRow}
        style={{
          fontSize: '0.78rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>a = 5</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'right' }}>
          <div>
            <span style={{ color: '#0284c7', fontWeight: 600 }}>++a</span> →{' '}
            <span className={styles.calcResultBadge}>6</span>
          </div>
          <div>
            <span style={{ color: '#0284c7', fontWeight: 600 }}>a--</span> →{' '}
            <span className={styles.calcResultBadge}>4</span>
          </div>
        </div>
      </div>
    ),
  },
];

export function OperatorTaxonomySection() {
  const reduced = useReducedMotion();

  const handleCardClick = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) {
      const navOffset = 90;
      const pos = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: pos - navOffset, behavior: 'smooth' });
    }
  };

  return (
    <section id="operator-types" className={styles.sectionWrapper} aria-labelledby="heading-types">
      <div className={styles.container}>
        <motion.h2
          id="heading-types"
          className={styles.mainHeading}
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
        >
          Types of Operators in C
        </motion.h2>

        {/* 6-Column Aligned Grid */}
        <div className={styles.taxonomyGrid}>
          {TAXONOMY_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              className={styles.taxonomyCard}
              style={{
                backgroundColor: card.bgTint,
                borderColor: `${card.themeColor}30`,
              }}
              onClick={() => handleCardClick(card.targetAnchor)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCardClick(card.targetAnchor)}
              aria-label={`Jump to detailed section for ${card.title}`}
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.35, delay: reduced ? 0 : idx * 0.05 }}
            >
              <div className={styles.cardTop}>
                <div
                  className={styles.numberBadge}
                  style={{
                    color: card.themeColor,
                    backgroundColor: `${card.themeColor}15`,
                  }}
                >
                  {card.number}
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
              </div>

              <p className={styles.cardDescription}>{card.description}</p>

              <div className={styles.codePillBox}>
                <span style={{ color: '#0055ff' }}>int</span> {card.codeSnippet.replace('int ', '')}
              </div>

              <div className={styles.exampleLabel}>{card.exampleLabel}</div>
              {card.calculationContent}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
