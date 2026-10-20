import React from 'react';
import { motion } from 'framer-motion';
import {
  fadeUp,
  scaleIn,
  pathDraw,
  viewportConfig,
} from '../../utils/motion';
import {
  useReducedMotion,
  useViewportWidth,
} from '../../hooks/useMotion';
import { useNavigate } from '../../router/Router';
import {
  ArrowRight,
  Terminal,
  BookOpen,
  Check,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import styles from './Transformation.module.css';

interface ConnectorProps {
  index: number;
  isMobile: boolean;
  reducedMotion: boolean;
}

const Connector: React.FC<ConnectorProps> = ({ index, isMobile, reducedMotion }) => {
  // Delays tailored to sequence: Arrow 1 at 0.35s, Arrow 2 at 0.70s, Arrow 3 at 1.05s
  const baseDelay = 0.35 + index * 0.35;
  const customIndex = reducedMotion ? 0 : baseDelay / 0.15;

  if (isMobile) {
    return (
      <div className={styles.connectorMobile} aria-hidden="true">
        <svg
          className={styles.connectorSvg}
          viewBox="0 0 24 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M 12 0 L 12 28 M 6 22 L 12 28 L 18 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathDraw}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={customIndex}
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={styles.connectorDesktop} aria-hidden="true">
      <svg
        className={styles.connectorSvg}
        viewBox="0 0 36 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M 0 12 L 28 12 M 22 6 L 28 12 L 22 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathDraw}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={customIndex}
        />
      </svg>
    </div>
  );
};

export const Transformation: React.FC = () => {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const width = useViewportWidth();
  const isMobile = width <= 1024;

  // Animation delay calculation helper
  const getDelay = (delay: number) => (reducedMotion ? 0 : delay);

  return (
    <section
      id="transformation"
      className={styles.section}
      aria-label="Transformation: Problem to Result"
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className={styles.sectionLabel}>04 / TRANSFORMATION</span>
          <h2 className={styles.heading}>
            Don't just learn what to type. Discover why it works.
          </h2>
          <p className={styles.subheading}>
            Trace an intuitive problem from mathematical definition to hardware-level execution.
            C exposes the deterministic path between your mental logic and raw silicon operations.
          </p>
        </motion.div>

        {/* 4-Stage Horizontal Flow */}
        <div className={styles.flowWrapper}>
          <div className={styles.pipeline} role="list" aria-label="Transformation sequence">
            {/* STAGE 1: PROBLEM */}
            <motion.div
              className={styles.stageCard}
              role="listitem"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              custom={getDelay(0.15)}
            >
              <div className={styles.stageHeader}>
                <div className={styles.stageBadge}>
                  <span className={`${styles.stageDot} ${styles.stageDotActive}`} />
                  <span>Problem</span>
                </div>
                <span className={styles.stageNumber}>01</span>
              </div>

              <div className={styles.stageBody}>
                <h3 className={styles.stageTitle}>
                  Find Maximum Value
                  <Layers size={16} aria-hidden="true" />
                </h3>
                <p className={styles.stageDesc}>
                  Given an unsorted array of integers, isolate the element with the highest numeric value.
                </p>

                <div className={styles.problemVisual} aria-label="Array [14, 42, 19, 88]">
                  <div className={styles.arrayHeader}>
                    <span>int arr[4]</span>
                    <span>size: 4 ints (16B)</span>
                  </div>

                  <div className={styles.arrayGrid}>
                    <div className={styles.arrayCell}>
                      <span className={styles.cellIndex}>[0]</span>
                      <span className={styles.cellValue}>14</span>
                    </div>
                    <div className={styles.arrayCell}>
                      <span className={styles.cellIndex}>[1]</span>
                      <span className={styles.cellValue}>42</span>
                    </div>
                    <div className={styles.arrayCell}>
                      <span className={styles.cellIndex}>[2]</span>
                      <span className={styles.cellValue}>19</span>
                    </div>
                    <div className={`${styles.arrayCell} ${styles.arrayCellTarget}`}>
                      <span className={styles.cellIndex}>[3]</span>
                      <span className={`${styles.cellValue} ${styles.cellValueHighlight}`}>88</span>
                    </div>
                  </div>

                  <div className={styles.arrayTargetTag}>
                    <Sparkles size={12} aria-hidden="true" />
                    <span>Target: Peak value at index 3</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Connector 1 -> 2 */}
            <Connector index={0} isMobile={isMobile} reducedMotion={reducedMotion} />

            {/* STAGE 2: LOGIC */}
            <motion.div
              className={styles.stageCard}
              role="listitem"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              custom={getDelay(0.5)}
            >
              <div className={styles.stageHeader}>
                <div className={styles.stageBadge}>
                  <span className={`${styles.stageDot} ${styles.stageDotActive}`} />
                  <span>Logic</span>
                </div>
                <span className={styles.stageNumber}>02</span>
              </div>

              <div className={styles.stageBody}>
                <h3 className={styles.stageTitle}>
                  Decision Algorithm
                  <Cpu size={16} aria-hidden="true" />
                </h3>
                <p className={styles.stageDesc}>
                  Initialize candidate to first item, then compare each subsequent element sequentially.
                </p>

                <div className={styles.logicVisual}>
                  <div className={styles.logicStep}>
                    <Check size={12} className={styles.logicStepIcon} aria-hidden="true" />
                    <span>max = arr[0] (seed: 14)</span>
                  </div>

                  <div className={styles.logicDecision}>
                    <div className={styles.logicDecisionLabel}>Condition: arr[i] &gt; max ?</div>
                    <div className={styles.logicBranches}>
                      <div className={styles.branchYes}>
                        <strong>YES:</strong> max = arr[i]
                      </div>
                      <div className={styles.branchNo}>
                        <strong>NO:</strong> next i
                      </div>
                    </div>
                  </div>

                  <div className={styles.logicStep}>
                    <Check size={12} className={styles.logicStepIcon} aria-hidden="true" />
                    <span>Loop terminates at n</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Connector 2 -> 3 */}
            <Connector index={1} isMobile={isMobile} reducedMotion={reducedMotion} />

            {/* STAGE 3: C PROGRAM */}
            <motion.div
              className={`${styles.stageCard} ${styles.codeCard}`}
              role="listitem"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              custom={getDelay(0.85)}
            >
              <div className={styles.stageHeader}>
                <div className={styles.stageBadge}>
                  <span className={`${styles.stageDot} ${styles.stageDotActive}`} />
                  <span>C Program</span>
                </div>
                <span className={styles.stageNumber}>03</span>
              </div>

              <div className={styles.stageBody}>
                <h3 className={styles.stageTitle}>
                  Compiled Syntax
                  <Terminal size={16} aria-hidden="true" />
                </h3>
                <p className={styles.stageDesc}>
                  Zero-overhead implementation utilizing single-pass CPU register caching.
                </p>

                <div className={styles.codeVisual}>
                  <div className={styles.codeTopBar}>
                    <div className={styles.windowDots}>
                      <span className={`${styles.windowDot} ${styles.dotRed}`} />
                      <span className={`${styles.windowDot} ${styles.dotYellow}`} />
                      <span className={`${styles.windowDot} ${styles.dotGreen}`} />
                    </div>
                    <span className={styles.fileName}>max_element.c</span>
                  </div>

                  <pre className={styles.codeEditor}>
                    <code>
                      <div className={styles.codeLine}>
                        <span className={styles.lineNumber}>1</span>
                        <span>
                          <span className={styles.synType}>int</span>{' '}
                          <span className={styles.synVar}>max</span>{' '}
                          <span className={styles.synOp}>=</span>{' '}
                          <span className={styles.synVar}>arr</span>
                          <span className={styles.synPunct}>[</span>
                          <span className={styles.synNum}>0</span>
                          <span className={styles.synPunct}>];</span>
                        </span>
                      </div>
                      <div className={styles.codeLine}>
                        <span className={styles.lineNumber}>2</span>
                        <span>
                          <span className={styles.synKeyword}>for</span>{' '}
                          <span className={styles.synPunct}>(</span>
                          <span className={styles.synType}>int</span>{' '}
                          <span className={styles.synVar}>i</span>{' '}
                          <span className={styles.synOp}>=</span>{' '}
                          <span className={styles.synNum}>1</span>
                          <span className={styles.synPunct}>;</span>{' '}
                          <span className={styles.synVar}>i</span>{' '}
                          <span className={styles.synOp}>&lt;</span>{' '}
                          <span className={styles.synVar}>n</span>
                          <span className={styles.synPunct}>;</span>{' '}
                          <span className={styles.synVar}>i</span>
                          <span className={styles.synOp}>++</span>
                          <span className={styles.synPunct}>)</span>{' '}
                          <span className={styles.synPunct}>{'{'}</span>
                        </span>
                      </div>
                      <div className={styles.codeLine}>
                        <span className={styles.lineNumber}>3</span>
                        <span>
                          {'    '}
                          <span className={styles.synKeyword}>if</span>{' '}
                          <span className={styles.synPunct}>(</span>
                          <span className={styles.synVar}>arr</span>
                          <span className={styles.synPunct}>[</span>
                          <span className={styles.synVar}>i</span>
                          <span className={styles.synPunct}>]</span>{' '}
                          <span className={styles.synOp}>&gt;</span>{' '}
                          <span className={styles.synVar}>max</span>
                          <span className={styles.synPunct}>)</span>{' '}
                          <span className={styles.synPunct}>{'{'}</span>
                        </span>
                      </div>
                      <div className={styles.codeLine}>
                        <span className={styles.lineNumber}>4</span>
                        <span>
                          {'        '}
                          <span className={styles.synVar}>max</span>{' '}
                          <span className={styles.synOp}>=</span>{' '}
                          <span className={styles.synVar}>arr</span>
                          <span className={styles.synPunct}>[</span>
                          <span className={styles.synVar}>i</span>
                          <span className={styles.synPunct}>];</span>
                        </span>
                      </div>
                      <div className={styles.codeLine}>
                        <span className={styles.lineNumber}>5</span>
                        <span>
                          {'    '}
                          <span className={styles.synPunct}>{'}'}</span>
                        </span>
                      </div>
                      <div className={styles.codeLine}>
                        <span className={styles.lineNumber}>6</span>
                        <span>
                          <span className={styles.synPunct}>{'}'}</span>
                        </span>
                      </div>
                      <div className={styles.codeLine}>
                        <span className={styles.lineNumber}>7</span>
                        <span>
                          <span className={styles.synFunc}>printf</span>
                          <span className={styles.synPunct}>(</span>
                          <span className={styles.synString}>"%d\n"</span>
                          <span className={styles.synPunct}>,</span>{' '}
                          <span className={styles.synVar}>max</span>
                          <span className={styles.synPunct}>);</span>
                        </span>
                      </div>
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>

            {/* Connector 3 -> 4 */}
            <Connector index={2} isMobile={isMobile} reducedMotion={reducedMotion} />

            {/* STAGE 4: RESULT */}
            <motion.div
              className={styles.stageCard}
              role="listitem"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              custom={getDelay(1.2)}
            >
              <div className={styles.stageHeader}>
                <div className={styles.stageBadge}>
                  <span className={`${styles.stageDot} ${styles.stageDotActive}`} />
                  <span>Result</span>
                </div>
                <span className={styles.stageNumber}>04</span>
              </div>

              <div className={styles.stageBody}>
                <h3 className={styles.stageTitle}>
                  Computed Output
                  <Sparkles size={16} aria-hidden="true" />
                </h3>
                <p className={styles.stageDesc}>
                  Deterministically computed without garbage collection pauses or runtime overhead.
                </p>

                <div className={styles.resultVisual}>
                  <div className={styles.resultNumeral}>
                    88
                    <span className={styles.resultNumeralBadge}>max</span>
                  </div>
                  <div className={styles.resultLabel}>Maximum value found</div>

                  <div className={styles.resultTerminal}>
                    <span>$ ./max_element</span>
                    <span className={styles.terminalOutput}>88</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Two Side-by-Side Cards (Theory vs Programming) */}
        <div className={styles.bottomCardsGrid}>
          {/* Card 1: Theory (Light) */}
          <motion.div
            className={`${styles.card} ${styles.theoryCard}`}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={getDelay(0.2)}
          >
            <div>
              <span className={styles.cardLabel}>01 / CONCEPTUAL FOUNDATION</span>
              <h3 className={styles.cardTitle}>THEORY</h3>
              <p className={styles.cardText}>
                Understand what happens beneath the code. Memory layouts, stack frames, pointer arithmetic,
                and cache line utilization explained through crystal-clear visual architecture.
              </p>

              <div className={styles.cardVisualTheory} aria-hidden="true">
                <div className={styles.memoryGrid}>
                  <div className={styles.memoryBlock}>
                    <div className={styles.memoryAddr}>0x1000</div>
                    <div className={styles.memoryVal}>14</div>
                  </div>
                  <div className={styles.memoryBlock}>
                    <div className={styles.memoryAddr}>0x1004</div>
                    <div className={styles.memoryVal}>42</div>
                  </div>
                  <div className={styles.memoryBlock}>
                    <div className={styles.memoryAddr}>0x1008</div>
                    <div className={styles.memoryVal}>19</div>
                  </div>
                  <div className={styles.memoryBlock} style={{ borderColor: 'var(--color-accent-dark)' }}>
                    <div className={styles.memoryAddr}>0x100C</div>
                    <div className={styles.memoryVal} style={{ color: '#2a5a0c' }}>88</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate('/theory')}
              >
                <BookOpen size={16} aria-hidden="true" />
                <span>Explore Theory</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Programming (Dark) */}
          <motion.div
            className={`${styles.card} ${styles.programmingCard}`}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={getDelay(0.35)}
          >
            <div>
              <span className={styles.cardLabel}>02 / SYSTEM IMPLEMENTATION</span>
              <h3 className={styles.cardTitle}>PROGRAMMING</h3>
              <p className={styles.cardText}>
                Turn logic into reality. Craft lean, deterministic programs with direct memory management,
                zero abstraction tax, and absolute command over the underlying microprocessor.
              </p>

              <div className={styles.cardVisualProg} aria-hidden="true">
                <div className={styles.progLine}>
                  <span className={styles.progPrompt}>$</span>
                  <span>clang -O3 -Wall -Wextra max_element.c -o out</span>
                </div>
                <div className={styles.progLine}>
                  <span className={styles.progPrompt}>asm:</span>
                  <span className={styles.progAsm}>cmpl %edx, %eax; cmovg %edx, %eax</span>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <button
                type="button"
                className="btn btn-accent"
                onClick={() => navigate('/programs')}
              >
                <Terminal size={16} aria-hidden="true" />
                <span>Enter Programming</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
