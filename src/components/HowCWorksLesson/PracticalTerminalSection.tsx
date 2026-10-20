import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Copy, Check, Loader2, ArrowUpRight } from 'lucide-react';
import { fadeUp, viewportConfig } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './PracticalTerminalSection.module.css';

const CODE_EXAMPLE = `#include <stdio.h>

int main(void)
{
    printf("Hello, World!\\n");
    return 0;
}`;

const TRACE_STEPS = [
  'Source instructions are written.',
  'Preprocessing handles directives.',
  'The compiler translates the source.',
  'The assembler produces object code in a traditional toolchain.',
  'The linker creates the final build artifact.',
  'The execution environment starts the program.',
];

interface PracticalTerminalSectionProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export function PracticalTerminalSection({
  activeIndex,
  onSelectIndex,
}: PracticalTerminalSectionProps) {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE_EXAMPLE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
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

  return (
    <motion.section
      className={styles.section}
      variants={reduced ? undefined : fadeUp}
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={viewportConfig}
      aria-labelledby="practical-terminal-heading"
    >
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>03 / SEE IT IN ACTION</span>
        <h2 id="practical-terminal-heading" className={styles.heading}>
          One program. A complete journey.
        </h2>
        <p className={styles.subheading}>
          Observe how the simple hello program moves from source lines to terminal output. Run
          the program or select any step to synchronize with the six-stage pipeline above.
        </p>
      </div>

      {/* Code Editor & Output */}
      <div className={styles.terminalCard} role="region" aria-label="Terminal Code Runner">
        <div className={styles.terminalHeader}>
          <div className={styles.terminalTitleGroup}>
            <div className={styles.dots} aria-hidden="true">
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <span className={styles.fileName}>main.c</span>
          </div>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={handleCopy}
              aria-label="Copy source code"
            >
              {copied ? (
                <>
                  <Check size={12} color="var(--color-accent)" aria-hidden="true" />
                  <span style={{ color: 'var(--color-accent)' }}>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} aria-hidden="true" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              type="button"
              className={styles.runBtn}
              onClick={handleRun}
              disabled={isRunning}
              aria-label="Run C Program simulation"
            >
              {isRunning ? (
                <>
                  <Loader2 size={12} className="spin" aria-hidden="true" />
                  <span>Executing...</span>
                </>
              ) : (
                <>
                  <Play size={12} fill="currentColor" aria-hidden="true" />
                  <span>Run Program</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Syntax-highlighted code area */}
        <div className={styles.codeArea}>
          <div className={styles.codeLine}>
            <span className={styles.lineNum}>1</span>
            <span className={styles.lineCode}>
              <span className={styles.tokPrep}>#include</span>{' '}
              <span className={styles.tokStr}>&lt;stdio.h&gt;</span>
            </span>
          </div>
          <div className={styles.codeLine}>
            <span className={styles.lineNum}>2</span>
            <span className={styles.lineCode}>&nbsp;</span>
          </div>
          <div className={styles.codeLine}>
            <span className={styles.lineNum}>3</span>
            <span className={styles.lineCode}>
              <span className={styles.tokType}>int</span>{' '}
              <span className={styles.tokFunc}>main</span>
              <span className={styles.tokPunc}>(</span>
              <span className={styles.tokKeyw}>void</span>
              <span className={styles.tokPunc}>)</span>
            </span>
          </div>
          <div className={styles.codeLine}>
            <span className={styles.lineNum}>4</span>
            <span className={styles.lineCode}>
              <span className={styles.tokPunc}>{'{'}</span>
            </span>
          </div>
          <div className={styles.codeLine}>
            <span className={styles.lineNum}>5</span>
            <span className={styles.lineCode}>
              {'    '}
              <span className={styles.tokFunc}>printf</span>
              <span className={styles.tokPunc}>(</span>
              <span className={styles.tokStr}>"Hello, World!\n"</span>
              <span className={styles.tokPunc}>);</span>
            </span>
          </div>
          <div className={styles.codeLine}>
            <span className={styles.lineNum}>6</span>
            <span className={styles.lineCode}>
              {'    '}
              <span className={styles.tokKeyw}>return</span>{' '}
              <span className={styles.tokNum}>0</span>
              <span className={styles.tokPunc}>;</span>
            </span>
          </div>
          <div className={styles.codeLine}>
            <span className={styles.lineNum}>7</span>
            <span className={styles.lineCode}>
              <span className={styles.tokPunc}>{'}'}</span>
            </span>
          </div>
        </div>

        {/* Terminal Output */}
        <div className={styles.outputArea}>
          <div className={styles.outputHeader}>
            <span>Standard Output Stream (stdout)</span>
            {hasRun && (
              <span style={{ color: 'var(--color-accent)' }}>Status: 0 &bull; 0.001s</span>
            )}
          </div>

          <div className={styles.stdoutBox}>
            <span className={styles.stdoutPrompt}>$</span>
            <span>Hello, World!</span>
          </div>
        </div>
      </div>

      {/* 6-step Process Trace */}
      <div className={styles.traceSection}>
        <div className={styles.traceTitle}>
          Conceptual Process Trace &bull; Select any step to inspect stage
        </div>

        <div className={styles.traceGrid} role="list" aria-label="Conceptual process trace">
          {TRACE_STEPS.map((step, idx) => {
            const isActive = idx === activeIndex;

            return (
              <button
                key={step}
                type="button"
                className={`${styles.traceCard} ${isActive ? styles.traceCardActive : ''}`}
                onClick={() => {
                  onSelectIndex(idx);
                  const el = document.getElementById('journey-heading');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                role="listitem"
                aria-label={`Step ${idx + 1}: ${step}`}
              >
                <span className={styles.traceNum}>{idx + 1}</span>
                <span className={styles.traceText}>{step}</span>
                <ArrowUpRight
                  size={14}
                  style={{
                    marginLeft: 'auto',
                    opacity: isActive ? 1 : 0.4,
                    color: isActive ? 'var(--color-accent-dark)' : 'inherit',
                  }}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

export default PracticalTerminalSection;
