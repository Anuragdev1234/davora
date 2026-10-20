import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './StructureOutputSection.module.css';

export function StructureOutputSection() {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('Number = 10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="program-output" className={styles.sectionWrapper} aria-labelledby="output-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>05</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>PROGRAM OUTPUT</span>
          </div>

          <h2 id="output-heading" className={styles.mainHeading}>
            See the result.
          </h2>

          <p className={styles.subHeading}>
            When compiled and executed on your host system, the compiled binary emits formatted text
            directly to the standard output stream.
          </p>
        </div>

        {/* Minimalist Restrained Dark Terminal Window */}
        <motion.div
          className={styles.terminalContainer}
          initial={reduced ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Terminal Title Bar */}
          <div className={styles.terminalHeader}>
            <div className={styles.trafficLights}>
              <span className={styles.dotRed} />
              <span className={styles.dotAmber} />
              <span className={styles.dotGreen} />
            </div>

            <div className={styles.terminalTitle}>
              <Terminal size={13} className={styles.terminalIcon} aria-hidden="true" />
              <span>terminal &bull; bash</span>
            </div>

            <div className={styles.terminalActions}>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={handleCopy}
                aria-label="Copy terminal output"
              >
                {copied ? (
                  <>
                    <Check size={12} aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className={styles.terminalBody}>
            <div className={styles.terminalRow}>
              <span className={styles.prompt}>$</span>
              <span className={styles.command}>gcc main.c -o program</span>
            </div>
            <div className={styles.terminalRow}>
              <span className={styles.prompt}>$</span>
              <span className={styles.command}>./program</span>
            </div>

            <div className={styles.outputRow} aria-live="polite">
              <span className={styles.outputText}>Number = 10</span>
            </div>

            <div className={styles.terminalRow}>
              <span className={styles.prompt}>$</span>
              <span className={styles.cursor} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default StructureOutputSection;
