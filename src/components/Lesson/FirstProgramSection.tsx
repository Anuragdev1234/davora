import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Copy, Check, Terminal, Loader2 } from 'lucide-react';
import { fadeUp, viewportConfig } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './FirstProgramSection.module.css';

const CODE_STRING = `#include <stdio.h>

int main(void)
{
    // This prints a message to the screen
    printf("Hello World\\n");

    return 0;
}`;

export function FirstProgramSection() {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE_STRING);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setHasRun(false);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 600);
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsRunning(false);
    setHasRun(false);
  };

  return (
    <motion.section
      className={styles.section}
      variants={reduced ? undefined : fadeUp}
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={viewportConfig}
      aria-labelledby="first-program-heading"
    >
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>02 / SOURCE CODE &amp; RUNTIME</span>
        <h2 id="first-program-heading" className={styles.heading}>
          Every program starts somewhere.
        </h2>
        <p className={styles.subheading}>
          This simple program prints a message to the screen. It introduces the essential
          structure of a C program.
        </p>
      </div>

      {/* ── Editor Card ── */}
      <div className={styles.editorCard} role="region" aria-label="Interactive C Code Example">
        {/* Top bar */}
        <div className={styles.editorHeader}>
          <div className={styles.editorTitleGroup}>
            <div className={styles.windowDots} aria-hidden="true">
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <span className={styles.fileName}>hello.c</span>
            <span className={styles.langBadge}>C · C99/C11</span>
          </div>

          <div className={styles.editorActions}>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopy}
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <Check size={13} color="var(--color-accent)" aria-hidden="true" />
                  <span style={{ color: 'var(--color-accent)' }}>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} aria-hidden="true" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              type="button"
              className={styles.runBtn}
              onClick={handleRun}
              disabled={isRunning}
              aria-label="Run and execute C program"
            >
              {isRunning ? (
                <>
                  <Loader2 size={13} className="spin" aria-hidden="true" />
                  <span>Compiling...</span>
                </>
              ) : (
                <>
                  <Play size={13} fill="currentColor" aria-hidden="true" />
                  <span>Run Code</span>
                </>
              )}
            </button>

            {hasRun && (
              <button
                type="button"
                className={styles.resetBtn}
                onClick={handleReset}
                title="Reset simulation output"
                aria-label="Reset simulation"
              >
                <RotateCcw size={13} aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Code display with line numbers and syntax highlighting */}
        <div className={styles.codeArea}>
          {/* Line 1 */}
          <div className={styles.codeLine}>
            <span className={styles.lineNumber}>1</span>
            <span className={styles.lineContent}>
              <span className={styles.tokPreprocessor}>#include</span>{' '}
              <span className={styles.tokString}>&lt;stdio.h&gt;</span>
            </span>
          </div>

          {/* Line 2 */}
          <div className={styles.codeLine}>
            <span className={styles.lineNumber}>2</span>
            <span className={styles.lineContent}>&nbsp;</span>
          </div>

          {/* Line 3 */}
          <div className={styles.codeLine}>
            <span className={styles.lineNumber}>3</span>
            <span className={styles.lineContent}>
              <span className={styles.tokType}>int</span>{' '}
              <span className={styles.tokFunction}>main</span>
              <span className={styles.tokPunctuation}>(</span>
              <span className={styles.tokKeyword}>void</span>
              <span className={styles.tokPunctuation}>)</span>
            </span>
          </div>

          {/* Line 4 */}
          <div className={styles.codeLine}>
            <span className={styles.lineNumber}>4</span>
            <span className={styles.lineContent}>
              <span className={styles.tokPunctuation}>{'{'}</span>
            </span>
          </div>

          {/* Line 5 */}
          <div className={styles.codeLine}>
            <span className={styles.lineNumber}>5</span>
            <span className={styles.lineContent}>
              {'    '}
              <span className={styles.tokComment}>// This prints a message to the screen</span>
            </span>
          </div>

          {/* Line 6 */}
          <div className={styles.codeLine}>
            <span className={styles.lineNumber}>6</span>
            <span className={styles.lineContent}>
              {'    '}
              <span className={styles.tokFunction}>printf</span>
              <span className={styles.tokPunctuation}>(</span>
              <span className={styles.tokString}>"Hello World\n"</span>
              <span className={styles.tokPunctuation}>);</span>
            </span>
          </div>

          {/* Line 7 */}
          <div className={styles.codeLine}>
            <span className={styles.lineNumber}>7</span>
            <span className={styles.lineContent}>&nbsp;</span>
          </div>

          {/* Line 8 */}
          <div className={styles.codeLine}>
            <span className={styles.lineNumber}>8</span>
            <span className={styles.lineContent}>
              {'    '}
              <span className={styles.tokKeyword}>return</span>{' '}
              <span className={styles.tokNumber}>0</span>
              <span className={styles.tokPunctuation}>;</span>
            </span>
          </div>

          {/* Line 9 */}
          <div className={styles.codeLine}>
            <span className={styles.lineNumber}>9</span>
            <span className={styles.lineContent}>
              <span className={styles.tokPunctuation}>{'}'}</span>
            </span>
          </div>
        </div>

        {/* ── Output Panel ── */}
        <div className={styles.outputContainer}>
          <div className={styles.outputHeader}>
            <div className={styles.outputLabel}>
              <Terminal size={14} color="var(--color-dark-muted)" aria-hidden="true" />
              <span>OUTPUT</span>
            </div>

            {hasRun && (
              <span className={styles.outputStatus}>
                Exit code: 0 &bull; 0.002s
              </span>
            )}
          </div>

          <div className={styles.terminalBox}>
            <span className={styles.terminalPrompt}>$</span>
            <span>{hasRun ? 'Hello World' : 'Hello World'}</span>
          </div>

          <div className={styles.outputExplanation}>
            The <code>printf()</code> function sends formatted text to standard output. The{' '}
            <code>\n</code> escape sequence moves the cursor to a new line.
            <div>
              <span className={styles.simulationNotice}>
                * Simulated C execution environment targeting standard POSIX stdout.
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default FirstProgramSection;
