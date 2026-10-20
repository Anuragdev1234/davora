import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './AlgorithmSection.module.css';

interface AlgorithmSectionProps {
  activeStep: number;
  onSelectStep: (step: number) => void;
}

export function AlgorithmSection({
  activeStep,
  onSelectStep,
}: AlgorithmSectionProps) {
  const reduced = useReducedMotion();

  const algorithmSteps = [
    {
      id: 1,
      title: 'Start Program',
      text: 'Start program execution.',
      tag: 'Init',
      explanation: 'The operating system begins execution at main(void) and allocates local variables.',
      cCode: 'int main(void) {',
    },
    {
      id: 2,
      title: 'Read Row Count (n)',
      text: 'Read the number of rows n.',
      tag: 'Input',
      explanation: 'Prompt the user for total rows n and validate that n is within bounds [1, 10].',
      cCode: 'scanf("%d", &n);',
    },
    {
      id: 3,
      title: 'Init Outer Loop (i = n)',
      text: 'Initialize outer loop counter i = n.',
      tag: 'Reverse Init',
      explanation: 'Unlike the growing pyramid, the inverted pyramid starts at the maximum width: i = n.',
      cCode: 'for (int i = n; ...)',
    },
    {
      id: 4,
      title: 'Check Outer Condition (i >= 1)',
      text: 'Check whether i >= 1.',
      tag: 'Decision',
      explanation: 'As long as i is greater than or equal to 1, we continue generating rows. When i reaches 0, the loop stops.',
      cCode: 'i >= 1',
    },
    {
      id: 5,
      title: 'Branch if False (i < 1)',
      text: 'If i >= 1 is false (i == 0), go to Step 10.',
      tag: 'Branch',
      explanation: 'When i reaches 0, all rows from n down to 1 have been printed. Jump past the loop body.',
      cCode: '/* exit outer loop */',
    },
    {
      id: 6,
      title: 'Init Inner Loop (j = 1)',
      text: 'Initialize inner loop column counter j = 1.',
      tag: 'Inner Init',
      explanation: 'Column counter j always begins at 1 for each row and counts up to the current row width i.',
      cCode: 'for (int j = 1; ...)',
    },
    {
      id: 7,
      title: 'Print Star while j <= i',
      text: 'While j <= i, print "* " and increment j (j++).',
      tag: 'Print',
      explanation: 'Print a star followed by space. Since i decrements each row, fewer stars are printed each time.',
      cCode: 'printf("* ");',
    },
    {
      id: 8,
      title: 'Print Newline (\\n)',
      text: 'Print a newline after inner loop finishes.',
      tag: 'Newline',
      explanation: 'Once j exceeds i, the current row is complete. Print "\\n" to move the cursor to the next line.',
      cCode: 'printf("\\n");',
    },
    {
      id: 9,
      title: 'Decrement i (i--)',
      text: 'Decrement i by 1 (i--) and return to Step 4.',
      tag: 'Reverse Step',
      explanation: 'Crucial reverse step: i = i - 1. Then return to Step 4 to test if i >= 1 for the next row.',
      cCode: 'i--',
    },
    {
      id: 10,
      title: 'Stop Execution',
      text: 'Stop program execution with exit code 0.',
      tag: 'Exit',
      explanation: 'Return 0 to indicate successful process completion to the OS.',
      cCode: 'return 0;\n}',
    },
  ];

  const currentStep =
    algorithmSteps.find((s) => s.id === activeStep) || algorithmSteps[0];

  return (
    <section className={styles.section} id="algorithm-section" aria-label="04 Build the Algorithm">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>04 / Now Think Like a Programmer</div>
          <h2 className={styles.sectionTitle}>Translate Reverse Logic to an Algorithm</h2>
          <p className={styles.sectionDesc}>
            A computer cannot understand visual geometry directly. We formulate the inverted pattern
            into a sequence of 10 clear algorithmic operations featuring reverse outer iteration.
          </p>
        </div>

        {/* 3-Part Transformation Comparison */}
        <div className={styles.comparisonStrip}>
          <motion.div
            className={styles.comparisonCard}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.comparisonRole}>01 · Human Observation</div>
            <div className={styles.comparisonQuote}>
              “Start with N stars, and print one less star each row.”
            </div>
            <p className={styles.comparisonDetails}>
              A human observes the shrinking shape intuitively without worrying about loop conditions,
              zero-checks, or cursor advances.
            </p>
          </motion.div>

          <motion.div
            className={styles.comparisonCard}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className={styles.comparisonRole}>02 · Programming Rule</div>
            <div className={styles.comparisonQuote}>
              “Count outer loop down from N to 1 (i = n; i &gt;= 1; i--).”
            </div>
            <p className={styles.comparisonDetails}>
              By counting in reverse, outer variable <code>i</code> directly represents the exact number of stars
              needed for that row: print <code>i</code> stars.
            </p>
          </motion.div>

          <motion.div
            className={styles.comparisonCard}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className={styles.comparisonRole}>03 · Computer Instructions</div>
            <div className={styles.comparisonQuote}>
              “Nested loop with reverse outer decrement.”
            </div>
            <div className={styles.miniLoopBox}>
              outer: i from n down to 1 (i--)<br />
              &nbsp;&nbsp;inner: j from 1 up to i (j++) &rarr; print *<br />
              &nbsp;&nbsp;end inner &rarr; print \n
            </div>
          </motion.div>
        </div>

        {/* Algorithm Steps List & Detail Explanation */}
        <div className={styles.algorithmWorkspace}>
          <div className={styles.stepsList} role="list" aria-label="10 Algorithm Steps">
            {algorithmSteps.map((step) => {
              const isActive = activeStep === step.id;
              return (
                <div
                  key={step.id}
                  className={`${styles.stepItem} ${isActive ? styles.stepItemActive : ''}`}
                  onClick={() => onSelectStep(step.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectStep(step.id);
                    }
                  }}
                  aria-pressed={isActive}
                >
                  <span className={styles.stepNumber}>{step.id}</span>
                  <span className={styles.stepText}>{step.text}</span>
                  <span className={styles.stepTag}>{step.tag}</span>
                </div>
              );
            })}
          </div>

          {/* Sticky Step Detail Panel */}
          <div className={styles.stepDetailCard}>
            <div className={styles.detailHeader}>
              <span className={styles.detailBadge}>Step {currentStep.id} of 10</span>
              <span style={{ fontSize: '0.75rem', color: '#71717a' }}>{currentStep.tag}</span>
            </div>

            <h3 className={styles.detailTitle}>{currentStep.title}</h3>
            <p className={styles.detailDesc}>{currentStep.explanation}</p>

            <div>
              <div
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#71717a',
                  marginBottom: '0.35rem',
                }}
              >
                Corresponding C Construction
              </div>
              <pre className={styles.detailCodeSnippet}>{currentStep.cCode}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
