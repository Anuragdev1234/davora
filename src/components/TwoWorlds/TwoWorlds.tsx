import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Cpu } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import { slideInLeft, slideInRight, viewportConfig } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './TwoWorlds.module.css';

export function TwoWorlds() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  const handleTheoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/theory');
  };

  const handleProgrammingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/programs');
  };

  return (
    <section id="twoworlds" className={styles.section} aria-label="Two Learning Worlds">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionLabel}>05 / TWO LEARNING WORLDS</span>
          <h2 className={styles.heading}>
            Two ways to understand C. One deeper foundation.
          </h2>
          <p className={styles.subheading}>
            Mastering C demands both conceptual mental models of memory architecture
            and the tactile reality of compiler execution. DEVORA unifies both into one cohesive journey.
          </p>
        </div>

        <div className={styles.grid}>
          {/* ── LEFT CARD: THEORY (Light) ── */}
          <motion.div
            className={`${styles.card} ${styles.theoryCard}`}
            variants={reduced ? undefined : slideInLeft}
            initial={reduced ? undefined : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={viewportConfig}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardTopRow}>
                <span className={`${styles.badge} ${styles.theoryBadge}`}>
                  <span className={styles.badgeDot} />
                  THEORY
                </span>
                <span className={styles.cardCategory}>Conceptual Architecture</span>
              </div>
              <h3 className={`${styles.cardTitle} ${styles.theoryTitle}`}>
                Understand what happens beneath the code.
              </h3>
            </div>

            {/* Conceptual SVG Memory Diagram */}
            <div className={styles.theoryIllustrationWrapper} aria-label="Memory Stack and Heap Architecture Diagram">
              <svg
                className={styles.memorySvg}
                viewBox="0 0 460 210"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
              >
                <title>Conceptual Memory Diagram</title>
                <desc>Illustration of Stack frame with local pointers referencing allocated Heap memory</desc>

                {/* Stack Region */}
                <rect
                  x="16"
                  y="20"
                  width="190"
                  height="146"
                  rx="8"
                  fill="#FFFFFF"
                  stroke="#C8CAC4"
                  strokeWidth="1.5"
                />
                <text x="30" y="42" fill="#777B74" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" letterSpacing="0.08em">
                  STACK (AUTOMATIC)
                </text>

                {/* Stack Slot 1 */}
                <rect x="28" y="56" width="166" height="40" rx="4" fill="#F5F5F1" stroke="#E2E3DE" strokeWidth="1" />
                <text x="38" y="73" fill="#777B74" fontFamily="JetBrains Mono, monospace" fontSize="10">0x7FFE...88</text>
                <text x="38" y="88" fill="#191B19" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="600">int size = 16;</text>

                {/* Stack Slot 2 (Pointer) */}
                <rect x="28" y="106" width="166" height="46" rx="4" fill="#FFFFFF" stroke="#C5E97B" strokeWidth="1.5" />
                <text x="38" y="123" fill="#777B74" fontFamily="JetBrains Mono, monospace" fontSize="10">0x7FFE...80</text>
                <text x="38" y="139" fill="#191B19" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="600">char *buf → 0x10F0</text>
                <circle cx="178" cy="135" r="4" fill="#9BC44A" />

                {/* Heap Region */}
                <rect
                  x="254"
                  y="20"
                  width="190"
                  height="146"
                  rx="8"
                  fill="#FFFFFF"
                  stroke="#C8CAC4"
                  strokeWidth="1.5"
                />
                <text x="268" y="42" fill="#777B74" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" letterSpacing="0.08em">
                  HEAP (DYNAMIC)
                </text>

                {/* Heap Block */}
                <rect x="266" y="80" width="166" height="72" rx="4" fill="#F5F5F1" stroke="#9BC44A" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="276" y="100" fill="#777B74" fontFamily="JetBrains Mono, monospace" fontSize="10">0x10F0 [malloc(16)]</text>
                <rect x="276" y="108" width="146" height="32" rx="3" fill="#FFFFFF" stroke="#E2E3DE" strokeWidth="1" />
                <text x="286" y="128" fill="#191B19" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="600">
                  "Hello, Devora!"
                </text>

                {/* Connector Pointer Arrow */}
                <path
                  d="M 182 135 C 220 135, 235 116, 264 116"
                  fill="none"
                  stroke="#9BC44A"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <polygon points="263,113 269,116 263,119" fill="#9BC44A" />

                {/* Bottom Address Bus bar */}
                <line x1="20" y1="184" x2="440" y2="184" stroke="#D8DAD4" strokeWidth="1" strokeDasharray="2 4" />
                <text x="20" y="198" fill="#A0A39C" fontFamily="JetBrains Mono, monospace" fontSize="9">LOW MEMORY</text>
                <text x="375" y="198" fill="#A0A39C" fontFamily="JetBrains Mono, monospace" fontSize="9">HIGH MEMORY</text>
              </svg>

              <div className={styles.diagramMeta}>
                <span>• Deterministic call frames</span>
                <span>• Contiguous byte addresses</span>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <button
                type="button"
                onClick={handleTheoryClick}
                className={`${styles.actionBtn} ${styles.theoryActionBtn}`}
                aria-label="Explore Theory section"
              >
                <Cpu size={16} aria-hidden="true" />
                <span>Explore Theory</span>
                <ArrowRight className={styles.arrowIcon} aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          {/* ── RIGHT CARD: PROGRAMMING (Dark) ── */}
          <motion.div
            className={`${styles.card} ${styles.programmingCard}`}
            variants={reduced ? undefined : slideInRight}
            initial={reduced ? undefined : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={viewportConfig}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardTopRow}>
                <span className={`${styles.badge} ${styles.programmingBadge}`}>
                  <span className={styles.badgeDot} />
                  PROGRAMMING
                </span>
                <span className={styles.cardCategoryDark}>Interactive Execution</span>
              </div>
              <h3 className={`${styles.cardTitle} ${styles.programmingTitle}`}>
                Turn logic into reality.
              </h3>
            </div>

            {/* Dark Code Editor */}
            <div className={styles.editorWrapper}>
              <div className={styles.editorHeader}>
                <div className={styles.windowControls} aria-hidden="true">
                  <span className={`${styles.windowDot} ${styles.windowDotRed}`} />
                  <span className={`${styles.windowDot} ${styles.windowDotYellow}`} />
                  <span className={`${styles.windowDot} ${styles.windowDotGreen}`} />
                </div>
                <div className={styles.editorTab}>
                  <Terminal size={13} aria-hidden="true" />
                  <span>main.c</span>
                </div>
                <span className={styles.editorLang}>GCC 13.2</span>
              </div>

              <div className={styles.codeArea}>
                <div className={styles.codeLine}>
                  <span className={styles.lineNumber}>1</span>
                  <span className={styles.codeContent}>
                    <span className={styles.tokenPreprocessor}>#include</span>{' '}
                    <span className={styles.tokenPreprocessor}>&lt;stdio.h&gt;</span>
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.lineNumber}>2</span>
                  <span className={styles.codeContent}>
                    <span className={styles.tokenKeyword}>int</span>{' '}
                    <span className={styles.tokenFunction}>main</span>
                    <span className={styles.tokenPunctuation}>()</span>{' '}
                    <span className={styles.tokenPunctuation}>{'{'}</span>
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.lineNumber}>3</span>
                  <span className={styles.codeContent}>
                    {'    '}
                    <span className={styles.tokenFunction}>printf</span>
                    <span className={styles.tokenPunctuation}>(</span>
                    <span className={styles.tokenString}>&quot;Hello, Devora!\n&quot;</span>
                    <span className={styles.tokenPunctuation}>);</span>
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.lineNumber}>4</span>
                  <span className={styles.codeContent}>
                    {'    '}
                    <span className={styles.tokenKeyword}>return</span>{' '}
                    <span className={styles.tokenNumber}>0</span>
                    <span className={styles.tokenPunctuation}>;</span>
                  </span>
                </div>
                <div className={styles.codeLine}>
                  <span className={styles.lineNumber}>5</span>
                  <span className={styles.codeContent}>
                    <span className={styles.tokenPunctuation}>{'}'}</span>
                  </span>
                </div>
              </div>

              {/* Terminal Output Area */}
              <div className={styles.terminalOutput}>
                <div className={styles.outputHeader}>
                  <Terminal size={12} className={styles.outputIcon} aria-hidden="true" />
                  <span>Output</span>
                </div>
                <div className={styles.outputBody}>
                  <span>&gt; Hello, Devora!</span>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <button
                type="button"
                onClick={handleProgrammingClick}
                className={`${styles.actionBtn} ${styles.programmingActionBtn}`}
                aria-label="Enter Programming experiment section"
              >
                <span>Enter Programming</span>
                <ArrowRight className={styles.arrowIcon} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default TwoWorlds;
