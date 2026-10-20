import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Info } from 'lucide-react';
import { fadeUp, viewportConfig } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './ProgramLineExplorer.module.css';

interface ProgramComponent {
  id: string;
  letter: string;
  label: string;
  code: string;
  lineNumbers: number[];
  explanation: string;
}

const PROGRAM_COMPONENTS: ProgramComponent[] = [
  {
    id: 'header',
    letter: 'A',
    label: 'Header file',
    code: '#include <stdio.h>',
    lineNumbers: [1],
    explanation:
      'This directive makes declarations for standard input/output functions available to the program. Here, the program uses printf() to display text.',
  },
  {
    id: 'main',
    letter: 'B',
    label: 'Main function',
    code: 'int main(void)',
    lineNumbers: [3],
    explanation:
      'Execution of a hosted C program begins at main. The function returns an integer status value to the execution environment.',
  },
  {
    id: 'braces',
    letter: 'C',
    label: 'Curly braces',
    code: '{\n    /* statements */\n}',
    lineNumbers: [4, 9],
    explanation:
      'Curly braces delimit a block of code. They mark the body of the main function and group the statements that belong to it.',
  },
  {
    id: 'printf',
    letter: 'D',
    label: 'Print statement',
    code: 'printf("Hello World\\n");',
    lineNumbers: [6],
    explanation:
      'This statement calls printf() to display the text. The semicolon terminates the expression statement.',
  },
  {
    id: 'return',
    letter: 'E',
    label: 'Return statement',
    code: 'return 0;',
    lineNumbers: [8],
    explanation:
      'In this example, returning zero from main indicates successful program termination to the execution environment.',
  },
];

const CODE_LINES = [
  { num: 1, text: '#include <stdio.h>', componentId: 'header' },
  { num: 2, text: '', componentId: null },
  { num: 3, text: 'int main(void)', componentId: 'main' },
  { num: 4, text: '{', componentId: 'braces' },
  { num: 5, text: '    // This prints a message to the screen', componentId: null },
  { num: 6, text: '    printf("Hello World\\n");', componentId: 'printf' },
  { num: 7, text: '', componentId: null },
  { num: 8, text: '    return 0;', componentId: 'return' },
  { num: 9, text: '}', componentId: 'braces' },
];

export function ProgramLineExplorer() {
  const reduced = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string>('header');

  const selectedComponent =
    PROGRAM_COMPONENTS.find((c) => c.id === selectedId) || PROGRAM_COMPONENTS[0];

  const handleLineClick = (componentId: string | null) => {
    if (componentId) {
      setSelectedId(componentId);
    }
  };

  return (
    <motion.section
      className={styles.section}
      variants={reduced ? undefined : fadeUp}
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={viewportConfig}
      aria-labelledby="understand-program-heading"
    >
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>03 / LINE-BY-LINE ANATOMY</span>
        <h2 id="understand-program-heading" className={styles.heading}>
          Every line has a purpose.
        </h2>
        <p className={styles.subheading}>
          A C program is built from instructions, declarations, functions, and supporting
          libraries. Let's examine the essential parts of the program you just saw.
        </p>
      </div>

      <div className={styles.explorerGrid}>
        {/* Left: Code Panel */}
        <div className={styles.codeCard}>
          <div className={styles.codeCardHeader}>
            <span>hello.c &bull; Click any line to inspect</span>
            <span style={{ color: 'var(--color-accent)' }}>Interactive</span>
          </div>

          <div className={styles.codeArea} role="list" aria-label="Program Lines">
            {CODE_LINES.map((line) => {
              const isActive = selectedComponent.lineNumbers.includes(line.num);
              return (
                <div
                  key={line.num}
                  className={`${styles.codeLine} ${isActive ? styles.codeLineActive : ''}`}
                  onClick={() => handleLineClick(line.componentId)}
                  role={line.componentId ? 'button' : undefined}
                  tabIndex={line.componentId ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (line.componentId && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleLineClick(line.componentId);
                    }
                  }}
                  aria-label={
                    line.componentId
                      ? `Line ${line.num}: ${line.text}. Click to view explanation.`
                      : `Line ${line.num}`
                  }
                >
                  <span className={styles.lineNumber}>{line.num}</span>
                  <span className={styles.lineText}>{line.text || ' '}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Component Selector & Synchronized Explanation */}
        <div className={styles.inspectorColumn}>
          {/* Component Buttons */}
          <div className={styles.componentSelector} role="tablist" aria-label="Code components">
            {PROGRAM_COMPONENTS.map((comp) => {
              const isSelected = comp.id === selectedId;
              return (
                <button
                  key={comp.id}
                  type="button"
                  className={`${styles.componentBtn} ${
                    isSelected ? styles.componentBtnActive : ''
                  }`}
                  onClick={() => setSelectedId(comp.id)}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${comp.id}`}
                  id={`tab-${comp.id}`}
                >
                  <div className={styles.btnLeft}>
                    <span className={styles.btnLetter}>{comp.letter}</span>
                    <span className={styles.btnLabel}>{comp.label}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <code className={styles.btnCodeBadge}>
                      {comp.lineNumbers.length > 1
                        ? `L${comp.lineNumbers.join(', L')}`
                        : `Line ${comp.lineNumbers[0]}`}
                    </code>
                    <ChevronRight
                      size={15}
                      color={isSelected ? 'var(--color-text)' : 'var(--color-text-muted)'}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Detail Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedComponent.id}
              className={styles.detailCard}
              id={`panel-${selectedComponent.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${selectedComponent.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.detailHeader}>
                <div className={styles.detailTitle}>
                  <Info size={15} color="var(--color-text-secondary)" aria-hidden="true" />
                  <span>
                    Component {selectedComponent.letter}: {selectedComponent.label}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--color-accent-dark)',
                    fontWeight: 600,
                  }}
                >
                  Active Selection
                </span>
              </div>

              <div className={styles.detailCodeSnippet}>
                <code>{selectedComponent.code}</code>
              </div>

              <p className={styles.detailText}>{selectedComponent.explanation}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

export default ProgramLineExplorer;
