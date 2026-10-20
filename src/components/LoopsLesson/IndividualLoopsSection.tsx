import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, PlayCircle, Info, Terminal } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './IndividualLoopsSection.module.css';

export function IndividualLoopsSection() {
  const reduced = useReducedMotion();

  // 1. For Loop Interactive Slider State
  const [forEndNum, setForEndNum] = useState<number>(5);
  const forOutputArray = Array.from({ length: forEndNum }, (_, i) => i + 1);

  // 2. While Loop Input Validation State
  const [userInputVal, setUserInputVal] = useState<string>('');
  const [validationHistory, setValidationHistory] = useState<
    { input: string; status: 'rejected' | 'accepted'; message: string }[]
  >([
    { input: '-2', status: 'rejected', message: 'Rejected (<= 0); prompt repeats' },
    { input: '0', status: 'rejected', message: 'Rejected (<= 0); prompt repeats' },
    { input: '8', status: 'accepted', message: 'Valid number: 8 (Exited loop)' },
  ]);

  const handleValidationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(userInputVal.trim(), 10);
    if (isNaN(parsed)) {
      setValidationHistory((prev) => [
        ...prev,
        { input: userInputVal, status: 'rejected', message: 'Invalid integer; prompt repeats' },
      ]);
    } else if (parsed <= 0) {
      setValidationHistory((prev) => [
        ...prev,
        { input: `${parsed}`, status: 'rejected', message: `Rejected (${parsed} <= 0); prompt repeats` },
      ]);
    } else {
      setValidationHistory((prev) => [
        ...prev,
        { input: `${parsed}`, status: 'accepted', message: `Valid number: ${parsed} (Exited loop)` },
      ]);
    }
    setUserInputVal('');
  };

  // Copy state
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const forCode = `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= ${forEndNum}; i++) {
        printf("%d\\n", i);
    }
    return 0;
}`;

  const whileCode = `#include <stdio.h>

int main(void) {
    int number = -1;
    while (number <= 0) {
        printf("Enter positive: ");
        scanf("%d", &number);
    }
    printf("Valid: %d\\n", number);
    return 0;
}`;

  const doWhileCode = `#include <stdio.h>

int main(void) {
    int i = 10;
    do {
        printf("%d\\n", i);
        i++;
    } while (i < 5);
    return 0;
}`;

  return (
    <section className={styles.sectionWrapper} id="individual-loops">
      <div className={styles.container}>
        {/* ==========================================================
            CARD 03: The for Loop
            ========================================================== */}
        <motion.div
          className={styles.loopCard}
          id="section-for-loop"
          initial={reduced ? undefined : { opacity: 0, y: 15 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          style={{ borderTop: '4px solid #2563EB' }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.headerTop}>
              <span className={styles.indexBadge} style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563EB' }}>
                03
              </span>
              <h3 className={styles.cardTitle}>The for Loop</h3>
            </div>
            <p className={styles.cardSubtitle}>Used when the repetition pattern is known.</p>
          </div>

          <div className={styles.editorSplitGrid}>
            <div className={styles.darkEditor}>
              <div className={styles.editorHeader}>
                <div className={styles.macDots}>
                  <span className={`${styles.dot} ${styles.dotRed}`} />
                  <span className={`${styles.dot} ${styles.dotAmber}`} />
                  <span className={`${styles.dot} ${styles.dotGreen}`} />
                </div>
                <span className={styles.fileName}>for_loop.c</span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() => handleCopy('for', forCode)}
                >
                  {copiedId === 'for' ? <Check size={11} /> : <Copy size={11} />}
                  <span>{copiedId === 'for' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className={styles.codeArea}>{forCode}</pre>
            </div>

            <div className={styles.terminalBox}>
              <div className={styles.terminalHeader}>Output</div>
              <div className={styles.terminalOutput}>
                {forOutputArray.slice(0, 5).map((n) => (
                  <div key={n}>{n}</div>
                ))}
                {forEndNum > 5 && <div>...</div>}
              </div>
            </div>
          </div>

          {/* Interactive Simulator: Ending Number Slider */}
          <div className={styles.interactiveControlCard}>
            <div className={styles.controlHeadingRow}>
              <PlayCircle size={15} color="#2563EB" />
              <span>Try it yourself: Change the ending number</span>
            </div>

            <div className={styles.sliderArea}>
              <div className={styles.sliderLabelRow}>
                <span>Ending number:</span>
                <span className={styles.sliderValBox}>{forEndNum}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={forEndNum}
                onChange={(e) => setForEndNum(parseInt(e.target.value, 10))}
                className={styles.rangeInput}
                aria-label="Ending number slider"
              />
              <div className={styles.scaleMarks}>
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>

            <div className={styles.generatedResultBox}>
              <span className={styles.genTitle}>Generated output:</span>
              <span className={styles.genValues}>{forOutputArray.join(' ')}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#64748b' }}>
              Total iterations: <strong>{forEndNum}</strong>
            </div>
          </div>
        </motion.div>

        {/* ==========================================================
            CARD 04: The while Loop
            ========================================================== */}
        <motion.div
          className={styles.loopCard}
          id="section-while-loop"
          initial={reduced ? undefined : { opacity: 0, y: 15 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          style={{ borderTop: '4px solid #059669' }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.headerTop}>
              <span className={styles.indexBadge} style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                04
              </span>
              <h3 className={styles.cardTitle}>The while Loop</h3>
            </div>
            <p className={styles.cardSubtitle}>Repeats as long as the condition is true.</p>
          </div>

          <div className={styles.editorSplitGrid}>
            <div className={styles.darkEditor}>
              <div className={styles.editorHeader}>
                <div className={styles.macDots}>
                  <span className={`${styles.dot} ${styles.dotRed}`} />
                  <span className={`${styles.dot} ${styles.dotAmber}`} />
                  <span className={`${styles.dot} ${styles.dotGreen}`} />
                </div>
                <span className={styles.fileName}>while_loop.c</span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() => handleCopy('while', whileCode)}
                >
                  {copiedId === 'while' ? <Check size={11} /> : <Copy size={11} />}
                  <span>{copiedId === 'while' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className={styles.codeArea}>{whileCode}</pre>
            </div>

            <div className={styles.terminalBox}>
              <div className={styles.terminalHeader}>Output</div>
              <div className={styles.terminalOutput}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
              </div>
            </div>
          </div>

          {/* Interactive Input Validation Terminal */}
          <div className={styles.interactiveControlCard}>
            <div className={styles.controlHeadingRow}>
              <Terminal size={15} color="#059669" />
              <span>Real-world example: Input validation</span>
            </div>

            <form onSubmit={handleValidationSubmit} className={styles.terminalInputForm}>
              <input
                type="text"
                placeholder="Enter positive integer..."
                value={userInputVal}
                onChange={(e) => setUserInputVal(e.target.value)}
                className={styles.cliInput}
                aria-label="Test positive number input"
              />
              <button type="submit" className={styles.cliEnterBtn}>
                Enter
              </button>
            </form>

            <div className={styles.cliHistoryBox}>
              {validationHistory.map((item, idx) => (
                <div key={idx}>
                  &gt; Enter a positive number: <strong>{item.input}</strong>
                  <br />
                  <span className={item.status === 'accepted' ? styles.cliAccepted : styles.cliRejected}>
                    ↳ {item.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ==========================================================
            CARD 05: The do-while Loop
            ========================================================== */}
        <motion.div
          className={styles.loopCard}
          id="section-do-while-loop"
          initial={reduced ? undefined : { opacity: 0, y: 15 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.16 }}
          style={{ borderTop: '4px solid #D97706' }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.headerTop}>
              <span className={styles.indexBadge} style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#D97706' }}>
                05
              </span>
              <h3 className={styles.cardTitle}>The do-while Loop</h3>
            </div>
            <p className={styles.cardSubtitle}>Executes the body first and then checks the condition.</p>
          </div>

          <div className={styles.editorSplitGrid}>
            <div className={styles.darkEditor}>
              <div className={styles.editorHeader}>
                <div className={styles.macDots}>
                  <span className={`${styles.dot} ${styles.dotRed}`} />
                  <span className={`${styles.dot} ${styles.dotAmber}`} />
                  <span className={`${styles.dot} ${styles.dotGreen}`} />
                </div>
                <span className={styles.fileName}>do_while_loop.c</span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() => handleCopy('dowhile', doWhileCode)}
                >
                  {copiedId === 'dowhile' ? <Check size={11} /> : <Copy size={11} />}
                  <span>{copiedId === 'dowhile' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className={styles.codeArea}>{doWhileCode}</pre>
            </div>

            <div className={styles.terminalBox}>
              <div className={styles.terminalHeader}>Output</div>
              <div className={styles.terminalOutput}>
                <div style={{ color: '#D97706', fontWeight: 700 }}>10</div>
              </div>
            </div>
          </div>

          {/* Semicolon Notice Callout */}
          <div className={styles.interactiveControlCard}>
            <div className={styles.noticeBox}>
              <Info size={18} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong>Notice the semicolon (;)</strong> after the while condition. It is required:
                <br />
                <code style={{ background: '#dbeafe', padding: '1px 4px', borderRadius: '4px' }}>
                  do &#123; ... &#125; while (condition);
                </code>
                <br />
                The body of a do-while loop always executes at least once.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
