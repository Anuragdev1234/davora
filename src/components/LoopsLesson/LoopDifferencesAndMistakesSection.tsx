import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { LOOP_COMPARISON_TABLE, LOOP_MISTAKES } from '../../data/loopsLessonData';
import styles from './LoopDifferencesAndMistakesSection.module.css';

export function LoopDifferencesAndMistakesSection() {

  // State mapping each mistake ID to 'buggy' | 'fixed' view
  const [activeCodeViews, setActiveCodeViews] = useState<Record<string, 'buggy' | 'fixed'>>({});

  const toggleCodeView = (id: string) => {
    setActiveCodeViews((prev) => ({
      ...prev,
      [id]: prev[id] === 'fixed' ? 'buggy' : 'fixed',
    }));
  };

  return (
    <section className={styles.sectionWrapper} id="differences-and-mistakes">
      <div className={styles.container}>
        {/* ==========================================================
            09A: DIFFERENCE BETWEEN LOOPS TABLE
            ========================================================== */}
        <div id="section-differences">
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>09</span>
              <span>/</span>
              <span>Architectural Reference</span>
            </div>
            <h3 className={styles.mainHeading}>Difference Between for, while, and do-while</h3>
            <p className={styles.subHeading}>
              A side-by-side architectural reference comparing condition check timing, execution
              guarantees, syntax placement, and optimal production use cases.
            </p>
          </div>

          <div className={styles.tableCard}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th style={{ color: '#2563EB' }}>for Loop</th>
                  <th style={{ color: '#059669' }}>while Loop</th>
                  <th style={{ color: '#D97706' }}>do-while Loop</th>
                </tr>
              </thead>
              <tbody>
                {LOOP_COMPARISON_TABLE.map((row, idx) => (
                  <tr key={idx}>
                    <td className={styles.aspectCell}>{row.aspect}</td>
                    <td>{row.forLoop}</td>
                    <td>{row.whileLoop}</td>
                    <td>{row.doWhileLoop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================================
            09B: COMMON MISTAKES IN LOOPS
            ========================================================== */}
        <div id="section-mistakes">
          <div className={styles.sectionHeader}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowIndex}>DEBUGGING</span>
              <span>/</span>
              <span>Frequent Traps & Countermeasures</span>
            </div>
            <h3 className={styles.mainHeading}>Common Mistakes in Loops</h3>
            <p className={styles.subHeading}>
              Avoid the classic pitfalls that lead to infinite loops, off-by-one boundary bugs,
              and unintended empty statement executions in C.
            </p>
          </div>

          <div className={styles.mistakesGrid}>
            {LOOP_MISTAKES.map((mistake) => {
              const currentView = activeCodeViews[mistake.id] || 'buggy';
              const isFixed = currentView === 'fixed';

              return (
                <div key={mistake.id} className={styles.mistakeCard}>
                  <div>
                    <div className={styles.mistakeHeader}>
                      <h4 className={styles.mistakeTitle}>{mistake.title}</h4>
                      <button
                        type="button"
                        className={styles.toggleCodeBtn}
                        onClick={() => toggleCodeView(mistake.id)}
                      >
                        {isFixed ? 'Show Buggy Code' : 'Show Fixed Code'}
                      </button>
                    </div>
                    <p className={styles.mistakeProblem}>{mistake.problem}</p>
                  </div>

                  {/* Code Display */}
                  <div className={styles.codeBoxWrapper}>
                    <div
                      className={
                        isFixed
                          ? styles.codeBoxHeaderFixed
                          : styles.codeBoxHeaderBuggy
                      }
                    >
                      {isFixed ? (
                        <>
                          <CheckCircle2 size={13} />
                          <span>Correct Implementation</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={13} />
                          <span>Buggy Implementation</span>
                        </>
                      )}
                    </div>
                    <pre className={styles.codeContent}>
                      {isFixed ? mistake.fixedCode : mistake.buggyCode}
                    </pre>
                  </div>

                  {/* Solution Tip */}
                  <div className={styles.solutionTip}>
                    <strong>Solution: </strong>
                    {mistake.solution}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
