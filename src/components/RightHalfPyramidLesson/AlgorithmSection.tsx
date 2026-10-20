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
      title: 'Start',
      text: 'Start program execution.',
      tag: 'Init',
      explanation: 'The operating system transfers execution to the entry point of the process (main function).',
      cCode: 'int main(void) {',
    },
    {
      id: 2,
      title: 'Read rows (n)',
      text: 'Read the number of rows n.',
      tag: 'Input',
      explanation: 'Prompt the user for the pyramid height and validate that n is within bounds [1, 10].',
      cCode: 'scanf("%d", &n);',
    },
    {
      id: 3,
      title: 'Init outer loop i = 1',
      text: 'Initialize the outer loop variable i = 1.',
      tag: 'Loop 1',
      explanation: 'The outer loop variable i represents the current row index, starting at 1.',
      cCode: 'for (int i = 1; ...)',
    },
    {
      id: 4,
      title: 'Check outer condition',
      text: 'Check whether i <= n.',
      tag: 'Decision',
      explanation: 'If i is less than or equal to n, proceed to generate row i. If i > n, the pyramid is complete.',
      cCode: 'i <= n',
    },
    {
      id: 5,
      title: 'Branch if false',
      text: 'If the condition is false, go to Step 10.',
      tag: 'Branch',
      explanation: 'When all rows have been printed, bypass the loop body and terminate cleanly.',
      cCode: '/* exit outer loop */',
    },
    {
      id: 6,
      title: 'Init inner loop j = 1',
      text: 'Initialize the inner loop variable j = 1.',
      tag: 'Loop 2',
      explanation: 'The inner loop variable j counts how many stars have been printed in the current row.',
      cCode: 'for (int j = 1; ...)',
    },
    {
      id: 7,
      title: 'Print stars while j <= i',
      text: 'While j <= i, print "* " and increment j.',
      tag: 'Print',
      explanation: 'In row i, print exactly i stars. Each iteration prints one star and adds 1 to j.',
      cCode: 'printf("* ");',
    },
    {
      id: 8,
      title: 'Print newline',
      text: 'Print a newline after the inner loop finishes.',
      tag: 'Format',
      explanation: 'Once all i stars for this row are printed, send "\\n" so the next row starts on a new line.',
      cCode: 'printf("\\n");',
    },
    {
      id: 9,
      title: 'Increment i',
      text: 'Increment i and return to Step 4.',
      tag: 'Update',
      explanation: 'Advance to the next row (i = i + 1) and test the outer condition again.',
      cCode: 'i++',
    },
    {
      id: 10,
      title: 'Stop',
      text: 'Stop program execution.',
      tag: 'Exit',
      explanation: 'Return status code 0 to indicate successful process execution.',
      cCode: 'return 0;\n}',
    },
  ];

  const currentStep = algorithmSteps.find((s) => s.id === activeStep) || algorithmSteps[0];

  return (
    <section className={styles.section} id="algorithm-section" aria-label="04 Build the Algorithm">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>04 / Now Think Like a Programmer</div>
          <h2 className={styles.sectionTitle}>Translate Human Logic to an Algorithm</h2>
          <p className={styles.sectionDesc}>
            A computer needs precise, unambiguous instructions. We convert the observation
            into a sequence of steps.
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
              “Each new row contains one more star.”
            </div>
            <p className={styles.comparisonDetails}>
              A person naturally notices visual symmetry and row growth without worrying
              about state variables or cursor positioning.
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
              “For every row i from 1 to n, print i stars.”
            </div>
            <p className={styles.comparisonDetails}>
              We formalize the rule mathematically: the row index <code>i</code> determines
              the exact limit for the number of stars.
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
              “Repeat inner loop i times, then print newline.”
            </div>
            <div className={styles.miniLoopBox}>
              outer: i from 1..n<br />
              &nbsp;&nbsp;inner: j from 1..i &rarr; print *<br />
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
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: '#71717a', marginBottom: '0.35rem' }}>
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
