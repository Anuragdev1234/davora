import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './AlgorithmSection.module.css';

interface AlgorithmSectionProps {
  activeStep: number;
  onSelectStep: (step: number) => void;
}

export const AlgorithmSection: React.FC<AlgorithmSectionProps> = ({
  activeStep,
  onSelectStep,
}) => {
  const reduced = useReducedMotion();

  const algorithmSteps = [
    {
      id: 1,
      title: 'Start Program',
      text: 'Start program execution.',
      tag: 'Init',
      explanation: 'Execution begins at the main function. The operating system allocates stack frame memory.',
      cCode: 'int main(void) {',
    },
    {
      id: 2,
      title: 'Declare Loop Variables',
      text: 'Declare integer variables n, i, j, k.',
      tag: 'Vars',
      explanation: 'n stores user row count, i counts rows, j counts leading spaces, and k counts stars.',
      cCode: 'int n;\n// i, j, k declared in loop counters',
    },
    {
      id: 3,
      title: 'Read Row Count (n)',
      text: 'Prompt user and read n (1 to 10).',
      tag: 'Input',
      explanation: 'Prompt the learner for pyramid height n and safely read input via scanf.',
      cCode: 'printf("Enter the number of rows (1-10): ");\nscanf("%d", &n);',
    },
    {
      id: 4,
      title: 'Validate Row Range',
      text: 'Validate if 1 <= n <= 10. If not, exit.',
      tag: 'Validate',
      explanation: 'Defensive validation ensures inputs outside [1, 10] or malformed tokens fail gracefully with return 1.',
      cCode: 'if (scanf("%d", &n) != 1 || n < 1 || n > 10) {\n    printf("Invalid input. Enter a number from 1 to 10.\\n");\n    return 1;\n}',
    },
    {
      id: 5,
      title: 'Initialize Outer Loop (i = 1)',
      text: 'Initialize outer loop row counter i = 1.',
      tag: 'Outer Init',
      explanation: 'Outer loop begins at apex row 1 and will advance row-by-row until base row n.',
      cCode: 'for (int i = 1; i <= n; i++) {',
    },
    {
      id: 6,
      title: 'Test Outer Condition (i <= n)',
      text: 'Test if i <= n. If false, jump to Step 11.',
      tag: 'Decision',
      explanation: 'As long as i <= n, execute the row body. Once i exceeds n, all rows are rendered.',
      cCode: 'i <= n',
    },
    {
      id: 7,
      title: 'Loop 1: Leading Spaces (j <= n - i)',
      text: 'For j = 1 to (n - i), print " " (single space).',
      tag: 'Space Loop',
      explanation: 'Inner loop 1 prints exactly (n - i) spaces to push the star group to the center symmetry axis.',
      cCode: 'for (int j = 1; j <= n - i; j++) {\n    printf(" ");\n}',
    },
    {
      id: 8,
      title: 'Loop 2: Odd Stars (k <= 2 * i - 1)',
      text: 'For k = 1 to (2 * i - 1), print "*".',
      tag: 'Star Loop',
      explanation: 'Inner loop 2 prints (2i - 1) consecutive stars, creating the expanding odd-numbered star tiers (1, 3, 5, 7, 9).',
      cCode: 'for (int k = 1; k <= 2 * i - 1; k++) {\n    printf("*");\n}',
    },
    {
      id: 9,
      title: 'Print Row Terminator (\\n)',
      text: 'Print newline "\\n" to move cursor to next row.',
      tag: 'Newline',
      explanation: 'Both inner loops have finished their row output. Emit newline character to advance to the next line.',
      cCode: 'printf("\\n");',
    },
    {
      id: 10,
      title: 'Increment Outer Counter (i++)',
      text: 'Increment i by 1 (i++) and loop back to Step 6.',
      tag: 'Increment',
      explanation: 'Row counter increments (i = i + 1). Control returns to evaluate outer condition i <= n.',
      cCode: 'i++',
    },
    {
      id: 11,
      title: 'Terminate Program',
      text: 'Stop execution and return 0.',
      tag: 'Return',
      explanation: 'Returns exit code 0 back to the operating system signifying successful program completion.',
      cCode: 'return 0;\n}',
    },
  ];

  const currentStep =
    algorithmSteps.find((s) => s.id === activeStep) || algorithmSteps[0];

  return (
    <section className={styles.section} id="algorithm" aria-label="04 Build the Algorithm">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>SCENE 04 &bull; FROM OBSERVATION TO CODE</div>
          <h2 className={styles.sectionTitle}>Translate Centered Logic into an Algorithm</h2>
          <p className={styles.sectionDesc}>
            A computer operates strictly sequentially. We deconstruct the symmetrical shape into an 11-step formal algorithm
            coordinating one outer row loop with two successive inner printing loops.
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
            <div className={styles.comparisonRole}>01 &bull; Human Observation</div>
            <div className={styles.comparisonQuote}>
              &ldquo;Center the pyramid by printing leading spaces, then printing an odd number of stars.&rdquo;
            </div>
            <p className={styles.comparisonDetails}>
              A human visualizes symmetrical balance intuitively without tracking exact terminal character offsets,
              ASCII column positions, or loop index limits.
            </p>
          </motion.div>

          <motion.div
            className={styles.comparisonCard}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className={styles.comparisonRole}>02 &bull; Programming Rule</div>
            <div className={styles.comparisonQuote}>
              &ldquo;Two consecutive inner loops inside one outer loop.&rdquo;
            </div>
            <p className={styles.comparisonDetails}>
              Outer loop runs <code>i = 1 &hellip; n</code>. First inner loop prints <code>n - i</code> spaces;
              second inner loop prints <code>2i - 1</code> stars; then emit <code>\n</code>.
            </p>
            <div className={styles.miniLoopBox}>
              for i = 1 to n<br />
              &nbsp;&nbsp;for j = 1 to n - i &rarr; &quot; &quot;<br />
              &nbsp;&nbsp;for k = 1 to 2 * i - 1 &rarr; &quot;*&quot;<br />
              &nbsp;&nbsp;print &quot;\n&quot;
            </div>
          </motion.div>

          <motion.div
            className={styles.comparisonCard}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className={styles.comparisonRole}>03 &bull; Formal Algorithm</div>
            <div className={styles.comparisonQuote}>
              &ldquo;11 unambiguous steps ready for C implementation.&rdquo;
            </div>
            <p className={styles.comparisonDetails}>
              Step-by-step logic detailing variable allocations, boundary validation, condition evaluations,
              nested counter increments, and cursor carriage returns.
            </p>
          </motion.div>
        </div>

        {/* Main Algorithm Workspace: Left Step List + Right Detail Panel */}
        <div className={styles.algorithmWorkspace}>
          <div className={styles.stepsListCard}>
            {algorithmSteps.map((s) => {
              const isActive = s.id === activeStep;
              return (
                <div
                  key={s.id}
                  className={`${styles.stepItem} ${isActive ? styles.stepItemActive : ''}`}
                  onClick={() => onSelectStep(s.id)}
                >
                  <span className={styles.stepNumber}>{s.id}</span>
                  <span className={styles.stepText}>{s.text}</span>
                  <span className={styles.stepTag}>{s.tag}</span>
                </div>
              );
            })}
          </div>

          {/* Right Detail Panel */}
          <div className={styles.stepDetailPanel}>
            <div className={styles.detailHeader}>
              <span className={styles.detailTitle}>Step {currentStep.id}: {currentStep.title}</span>
              <span className={styles.detailBadge}>{currentStep.tag}</span>
            </div>

            <p className={styles.detailExplanation}>{currentStep.explanation}</p>

            <div className={styles.codeSnippetHeader}>Corresponding C Syntax</div>
            <pre className={styles.codeSnippetBlock}>
              <code>{currentStep.cCode}</code>
            </pre>

            <div className={styles.stepNavRow}>
              <button
                type="button"
                className={styles.stepNavBtn}
                disabled={activeStep <= 1}
                onClick={() => onSelectStep(activeStep - 1)}
              >
                &larr; Previous Step
              </button>

              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                {activeStep} of {algorithmSteps.length}
              </span>

              <button
                type="button"
                className={styles.stepNavBtn}
                disabled={activeStep >= algorithmSteps.length}
                onClick={() => onSelectStep(activeStep + 1)}
              >
                Next Step &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
