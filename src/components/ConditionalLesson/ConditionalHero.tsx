import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DecisionFlowchart } from './DecisionFlowchart';
import {
  HERO_GRADE_LINES,
  evaluateGradeBranch,
} from '../../data/conditionalLessonData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './ConditionalHero.module.css';

interface ConnectorCoords {
  card1ToLine6: string;
  card2ToLine9: string;
  card3ToLine12: string;
  line15ToCard4: string;
}

interface ConditionalHeroProps {
  onExploreClick?: () => void;
}

export function ConditionalHero({ onExploreClick }: ConditionalHeroProps) {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  // Interactive Marks State (default 85 -> Grade A)
  const [marks, setMarks] = useState<number>(85);
  const evaluation = evaluateGradeBranch(marks);

  const [connectors, setConnectors] = useState<ConnectorCoords>({
    card1ToLine6: '',
    card2ToLine9: '',
    card3ToLine12: '',
    line15ToCard4: '',
  });

  const updateConnectors = useCallback(() => {
    if (!stageRef.current) return;
    const stageRect = stageRef.current.getBoundingClientRect();

    const elCard1 = document.getElementById('hero-card-if');
    const elCard2 = document.getElementById('hero-card-ifelse');
    const elCard3 = document.getElementById('hero-card-ladder');
    const elLine6 = document.getElementById('code-line-if-90');
    const elLine9 = document.getElementById('code-line-elseif-80');
    const elLine12 = document.getElementById('code-line-elseif-70');
    const elLine15 = document.getElementById('code-line-else');
    const elCard4 = document.getElementById('hero-card-switch');

    if (elCard1 && elCard2 && elCard3 && elLine6 && elLine9 && elLine12 && elLine15 && elCard4) {
      const rCard1 = elCard1.getBoundingClientRect();
      const rCard2 = elCard2.getBoundingClientRect();
      const rCard3 = elCard3.getBoundingClientRect();
      const rLine6 = elLine6.getBoundingClientRect();
      const rLine9 = elLine9.getBoundingClientRect();
      const rLine12 = elLine12.getBoundingClientRect();
      const rLine15 = elLine15.getBoundingClientRect();
      const rCard4 = elCard4.getBoundingClientRect();

      // Card 1 -> Line 6
      const x1 = rCard1.right - stageRect.left;
      const y1 = rCard1.top + rCard1.height / 2 - stageRect.top;
      const x2 = rLine6.left - stageRect.left;
      const y2 = rLine6.top + rLine6.height / 2 - stageRect.top;
      const dx1 = (x2 - x1) * 0.5;
      const path1 = `M ${x1} ${y1} C ${x1 + dx1} ${y1}, ${x2 - dx1} ${y2}, ${x2} ${y2}`;

      // Card 2 -> Line 9
      const c2x = rCard2.right - stageRect.left;
      const c2y = rCard2.top + rCard2.height / 2 - stageRect.top;
      const l9x = rLine9.left - stageRect.left;
      const l9y = rLine9.top + rLine9.height / 2 - stageRect.top;
      const dx2 = (l9x - c2x) * 0.5;
      const path2 = `M ${c2x} ${c2y} C ${c2x + dx2} ${c2y}, ${l9x - dx2} ${l9y}, ${l9x} ${l9y}`;

      // Card 3 -> Line 12
      const c3x = rCard3.right - stageRect.left;
      const c3y = rCard3.top + rCard3.height / 2 - stageRect.top;
      const l12x = rLine12.left - stageRect.left;
      const l12y = rLine12.top + rLine12.height / 2 - stageRect.top;
      const dx3 = (l12x - c3x) * 0.5;
      const path3 = `M ${c3x} ${c3y} C ${c3x + dx3} ${c3y}, ${l12x - dx3} ${l12y}, ${l12x} ${l12y}`;

      // Line 15 -> Card 4 (Purple right connector)
      const l15x = rLine15.right - stageRect.left;
      const l15y = rLine15.top + rLine15.height / 2 - stageRect.top;
      const c4x = rCard4.left - stageRect.left;
      const c4y = rCard4.top + 30 - stageRect.top;
      const dx4 = (c4x - l15x) * 0.55;
      const path4 = `M ${l15x} ${l15y} C ${l15x + dx4} ${l15y}, ${c4x - dx4} ${c4y}, ${c4x} ${c4y}`;

      setConnectors({
        card1ToLine6: path1,
        card2ToLine9: path2,
        card3ToLine12: path3,
        line15ToCard4: path4,
      });
    }
  }, []);

  useEffect(() => {
    updateConnectors();
    const handleResize = () => updateConnectors();
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(updateConnectors, 250);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [updateConnectors, marks]);

  const handleCardClick = (conceptId: string) => {
    if (conceptId === 'if-stmt') setMarks(95);
    else if (conceptId === 'if-else-stmt') setMarks(85);
    else if (conceptId === 'else-if-ladder') setMarks(75);
    else if (conceptId === 'switch-stmt') setMarks(60);
    else if (conceptId === 'ternary-op') setMarks(85);
  };

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('conditional-examples');
      if (el) {
        const navOffset = 90;
        const pos = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: pos - navOffset, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className={styles.heroSection} aria-label="Conditional Statements in C Interactive Lesson">
      {/* Background Architectural Terrain */}
      <div className={styles.terrainBackground} aria-hidden="true" />

      <div className={styles.container}>
        {/* Top Eyebrow Meta Header */}
        <div className={styles.metaHeader}>
          <div className={styles.brandGroup}>
            <span className={styles.brandLogo}>DEVORA</span>
            <span className={styles.brandSubtitle}>C PROGRAMMING</span>
          </div>

          <div className={styles.lessonBadge}>
            <span>LESSON 08 · CONDITIONAL STATEMENTS IN C</span>
          </div>
        </div>

        {/* 4-Zone Hero Grid */}
        <div className={styles.heroGrid} ref={stageRef}>
          {/* Dynamic SVG Connectors */}
          <svg className={styles.connectorsSvg} aria-hidden="true">
            <defs>
              <marker
                id="cond-arrow-blue"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#3B82F6" />
              </marker>
              <marker
                id="cond-arrow-green"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#10B981" />
              </marker>
              <marker
                id="cond-arrow-coral"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#F43F5E" />
              </marker>
              <marker
                id="cond-arrow-purple"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#8B5CF6" />
              </marker>
            </defs>

            {/* Connector 1: Card 01 -> Line 6 */}
            {connectors.card1ToLine6 && (
              <path
                d={connectors.card1ToLine6}
                className={styles.connectorPath}
                stroke="#3B82F6"
                strokeWidth={evaluation.activePill === 'if-90' ? '2.8' : '1.8'}
                strokeOpacity={evaluation.activePill === 'if-90' ? '1' : '0.6'}
                markerEnd="url(#cond-arrow-blue)"
              />
            )}

            {/* Connector 2: Card 02 -> Line 9 */}
            {connectors.card2ToLine9 && (
              <path
                d={connectors.card2ToLine9}
                className={styles.connectorPath}
                stroke="#10B981"
                strokeWidth={evaluation.activePill === 'elseif-80' ? '2.8' : '1.8'}
                strokeOpacity={evaluation.activePill === 'elseif-80' ? '1' : '0.6'}
                markerEnd="url(#cond-arrow-green)"
              />
            )}

            {/* Connector 3: Card 03 -> Line 12 */}
            {connectors.card3ToLine12 && (
              <path
                d={connectors.card3ToLine12}
                className={styles.connectorPath}
                stroke="#F43F5E"
                strokeWidth={evaluation.activePill === 'elseif-70' ? '2.8' : '1.8'}
                strokeOpacity={evaluation.activePill === 'elseif-70' ? '1' : '0.6'}
                markerEnd="url(#cond-arrow-coral)"
              />
            )}

            {/* Connector 4: Line 15 -> Card 04 */}
            {connectors.line15ToCard4 && (
              <path
                d={connectors.line15ToCard4}
                className={styles.connectorPath}
                stroke="#8B5CF6"
                strokeWidth={evaluation.activePill === 'else-fallback' ? '2.8' : '1.8'}
                strokeOpacity={evaluation.activePill === 'else-fallback' ? '1' : '0.6'}
                markerEnd="url(#cond-arrow-purple)"
              />
            )}
          </svg>

          {/* ==========================================================
              ZONE 1 (FAR LEFT): Editorial Intro
              ========================================================== */}
          <div className={styles.leftColumn}>
            <motion.h1
              className={styles.headline}
              initial={reduced ? undefined : { opacity: 0, y: 15 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.titleLine}>Conditional</span>
              <span className={styles.titleLine}>Statements</span>
              <span className={styles.titleLine}>in C</span>
            </motion.h1>

            <motion.p
              className={styles.leadDescription}
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              Conditional statements in C are decision-making statements that allow a program to execute different blocks of code depending on whether a specified condition is true or false.
            </motion.p>

            <motion.p
              className={styles.subDescription}
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 }}
            >
              They help a program make decisions based on user input, variable values, and logical expressions.
            </motion.p>

            <button
              type="button"
              className={styles.ctaButton}
              onClick={handleExplore}
              aria-label="Explore the Conditional Statements"
            >
              <span>Explore the Conditional Statements</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* ==========================================================
              ZONE 2 (CENTER-LEFT): Concept Panels 01, 02, 03
              ========================================================== */}
          <div className={styles.conceptStack}>
            {/* Card 01: if */}
            <div
              id="hero-card-if"
              className={`${styles.conceptCard} ${evaluation.activePill === 'if-90' ? styles.conceptCardActive : ''}`}
              style={{ color: '#2563EB' }}
              onClick={() => handleCardClick('if-stmt')}
              role="button"
              tabIndex={0}
            >
              <div className={styles.cardHeader}>
                <span className={styles.numberBadge} style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563EB' }}>
                  01
                </span>
                <h4 className={styles.cardTitle}>if Statement</h4>
              </div>
              <p className={styles.cardSubtitle}>Executes a block of code when a condition is true.</p>
              <div className={styles.codeBoxLight}>
                {`if (condition) {\n    // code\n}`}
              </div>
            </div>

            {/* Card 02: if-else */}
            <div
              id="hero-card-ifelse"
              className={`${styles.conceptCard} ${evaluation.activePill === 'elseif-80' ? styles.conceptCardActive : ''}`}
              style={{ color: '#059669' }}
              onClick={() => handleCardClick('if-else-stmt')}
              role="button"
              tabIndex={0}
            >
              <div className={styles.cardHeader}>
                <span className={styles.numberBadge} style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                  02
                </span>
                <h4 className={styles.cardTitle}>if-else Statement</h4>
              </div>
              <p className={styles.cardSubtitle}>Chooses between two blocks of code.</p>
              <div className={styles.codeBoxLight}>
                {`if (condition) {\n    ...\n} else {\n    ...\n}`}
              </div>
            </div>

            {/* Card 03: else-if Ladder */}
            <div
              id="hero-card-ladder"
              className={`${styles.conceptCard} ${evaluation.activePill === 'elseif-70' ? styles.conceptCardActive : ''}`}
              style={{ color: '#E11D48' }}
              onClick={() => handleCardClick('else-if-ladder')}
              role="button"
              tabIndex={0}
            >
              <div className={styles.cardHeader}>
                <span className={styles.numberBadge} style={{ background: 'rgba(225, 29, 72, 0.1)', color: '#E11D48' }}>
                  03
                </span>
                <h4 className={styles.cardTitle}>else-if Ladder</h4>
              </div>
              <p className={styles.cardSubtitle}>Checks multiple conditions in sequence.</p>
              <div className={styles.codeBoxLight}>
                {`if (...) { ... }\nelse if (...) { ... }\nelse { ... }`}
              </div>
            </div>
          </div>

          {/* ==========================================================
              ZONE 3 (CENTER): Primary Dark Code Editor + Controller
              ========================================================== */}
          <div className={styles.centerColumn}>
            <div className={styles.codeEditorCard}>
              <div className={styles.editorTitleBar}>
                <div className={styles.macControls}>
                  <span className={`${styles.macDot} ${styles.macDotRed}`} />
                  <span className={`${styles.macDot} ${styles.macDotAmber}`} />
                  <span className={`${styles.macDot} ${styles.macDotGreen}`} />
                </div>
                <div className={styles.editorFileName}>main.c</div>
                <div style={{ width: 40 }} />
              </div>

              <div className={styles.codeBody}>
                {HERO_GRADE_LINES.map((item) => {
                  if (item.lineNum === 6) {
                    const isActive = evaluation.activePill === 'if-90';
                    return (
                      <div className={styles.codeLine} key={item.lineNum}>
                        <span className={styles.lineNum}>{item.lineNum}</span>
                        <span
                          id="code-line-if-90"
                          className={`${styles.pillHighlight} ${styles.pillIf} ${isActive ? styles.pillActive : ''}`}
                          onClick={() => setMarks(95)}
                        >
                          <span className={styles.syntaxKeyword}>if</span>
                          <span className={styles.syntaxPunct}> (</span>
                          <span className={styles.syntaxVar}>marks</span> <span className={styles.syntaxOp}>&gt;=</span> <span className={styles.syntaxNum}>90</span>
                          <span className={styles.syntaxPunct}>) {'{'}</span>
                        </span>
                      </div>
                    );
                  }

                  if (item.lineNum === 9) {
                    const isActive = evaluation.activePill === 'elseif-80';
                    return (
                      <div className={styles.codeLine} key={item.lineNum}>
                        <span className={styles.lineNum}>{item.lineNum}</span>
                        <span
                          id="code-line-elseif-80"
                          className={`${styles.pillHighlight} ${styles.pillElseIf80} ${isActive ? styles.pillActive : ''}`}
                          onClick={() => setMarks(85)}
                        >
                          <span className={styles.syntaxKeyword}>else if</span>
                          <span className={styles.syntaxPunct}> (</span>
                          <span className={styles.syntaxVar}>marks</span> <span className={styles.syntaxOp}>&gt;=</span> <span className={styles.syntaxNum}>80</span>
                          <span className={styles.syntaxPunct}>) {'{'}</span>
                        </span>
                      </div>
                    );
                  }

                  if (item.lineNum === 12) {
                    const isActive = evaluation.activePill === 'elseif-70';
                    return (
                      <div className={styles.codeLine} key={item.lineNum}>
                        <span className={styles.lineNum}>{item.lineNum}</span>
                        <span
                          id="code-line-elseif-70"
                          className={`${styles.pillHighlight} ${styles.pillElseIf70} ${isActive ? styles.pillActive : ''}`}
                          onClick={() => setMarks(75)}
                        >
                          <span className={styles.syntaxKeyword}>else if</span>
                          <span className={styles.syntaxPunct}> (</span>
                          <span className={styles.syntaxVar}>marks</span> <span className={styles.syntaxOp}>&gt;=</span> <span className={styles.syntaxNum}>70</span>
                          <span className={styles.syntaxPunct}>) {'{'}</span>
                        </span>
                      </div>
                    );
                  }

                  if (item.lineNum === 15) {
                    const isActive = evaluation.activePill === 'else-fallback';
                    return (
                      <div className={styles.codeLine} key={item.lineNum}>
                        <span className={styles.lineNum}>{item.lineNum}</span>
                        <span
                          id="code-line-else"
                          className={`${styles.pillHighlight} ${styles.pillElse} ${isActive ? styles.pillActive : ''}`}
                          onClick={() => setMarks(60)}
                        >
                          <span className={styles.syntaxKeyword}>else</span>
                          <span className={styles.syntaxPunct}> {'{'}</span>
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div className={styles.codeLine} key={item.lineNum}>
                      <span className={styles.lineNum}>{item.lineNum}</span>
                      <span className={styles.codeText}>
                        {item.lineNum === 1 && (
                          <>
                            <span className={styles.syntaxPreproc}>#include</span>{' '}
                            <span className={styles.syntaxString}>&lt;stdio.h&gt;</span>
                          </>
                        )}
                        {item.lineNum === 3 && (
                          <>
                            <span className={styles.syntaxType}>int</span>{' '}
                            <span className={styles.syntaxFunc}>main</span>
                            <span className={styles.syntaxPunct}>(</span>
                            <span className={styles.syntaxType}>void</span>
                            <span className={styles.syntaxPunct}>) {'{'}</span>
                          </>
                        )}
                        {item.lineNum === 4 && (
                          <>
                            {'    '}
                            <span className={styles.syntaxType}>int</span> marks ={' '}
                            <span className={styles.syntaxNum}>{marks}</span>;
                          </>
                        )}
                        {item.lineNum === 7 && (
                          <>
                            {'        '}
                            <span className={styles.syntaxFunc}>printf</span>
                            <span className={styles.syntaxPunct}>(</span>
                            <span className={styles.syntaxString}>"Grade A+\n"</span>
                            <span className={styles.syntaxPunct}>);</span>
                          </>
                        )}
                        {item.lineNum === 8 && '    }'}
                        {item.lineNum === 10 && (
                          <>
                            {'        '}
                            <span className={styles.syntaxFunc}>printf</span>
                            <span className={styles.syntaxPunct}>(</span>
                            <span className={styles.syntaxString}>"Grade A\n"</span>
                            <span className={styles.syntaxPunct}>);</span>
                          </>
                        )}
                        {item.lineNum === 11 && '    }'}
                        {item.lineNum === 13 && (
                          <>
                            {'        '}
                            <span className={styles.syntaxFunc}>printf</span>
                            <span className={styles.syntaxPunct}>(</span>
                            <span className={styles.syntaxString}>"Grade B\n"</span>
                            <span className={styles.syntaxPunct}>);</span>
                          </>
                        )}
                        {item.lineNum === 14 && '    }'}
                        {item.lineNum === 16 && (
                          <>
                            {'        '}
                            <span className={styles.syntaxFunc}>printf</span>
                            <span className={styles.syntaxPunct}>(</span>
                            <span className={styles.syntaxString}>"Grade C or below\n"</span>
                            <span className={styles.syntaxPunct}>);</span>
                          </>
                        )}
                        {item.lineNum === 17 && '    }'}
                        {item.lineNum === 19 && (
                          <>
                            {'    '}
                            <span className={styles.syntaxKeyword}>return</span>{' '}
                            <span className={styles.syntaxNum}>0</span>;
                          </>
                        )}
                        {item.lineNum === 20 && '}'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Marks Slider Controller */}
            <div className={styles.marksControllerBar}>
              <span className={styles.controllerLabel}>Adjust Marks:</span>
              <div className={styles.sliderWrapper}>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={marks}
                  onChange={(e) => setMarks(parseInt(e.target.value, 10))}
                  className={styles.marksSlider}
                  aria-label="Adjust program variable marks"
                />
                <span className={styles.marksValueBadge}>{marks}</span>
              </div>
              <div className={styles.outputResultPill}>
                Output: {evaluation.output}
              </div>
            </div>
          </div>

          {/* ==========================================================
              ZONE 4 (RIGHT): Decision Flowchart & Cards 04, 05
              ========================================================== */}
          <div className={styles.rightColumn}>
            {/* Decision Flowchart */}
            <DecisionFlowchart
              isConditionTrue={evaluation.flowDecision}
              onConditionToggle={(val) => {
                if (val && marks < 80) setMarks(85);
                if (!val && marks >= 80) setMarks(65);
              }}
            />

            {/* Card 04: switch */}
            <div
              id="hero-card-switch"
              className={`${styles.conceptCard} ${evaluation.activePill === 'else-fallback' ? styles.conceptCardActive : ''}`}
              style={{ color: '#7C3AED' }}
              onClick={() => handleCardClick('switch-stmt')}
              role="button"
              tabIndex={0}
            >
              <div className={styles.cardHeader}>
                <span className={styles.numberBadge} style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7C3AED' }}>
                  04
                </span>
                <h4 className={styles.cardTitle}>switch Statement</h4>
              </div>
              <p className={styles.cardSubtitle}>Selects a block based on the value of an expression.</p>
              <div className={styles.codeBoxLight}>
                {`switch (expression) {\n    case value1: ...; break;\n    case value2: ...; break;\n    default: ...;\n}`}
              </div>
            </div>

            {/* Card 05: Conditional Operator */}
            <div
              id="hero-card-ternary"
              className={styles.conceptCard}
              style={{ color: '#D97706' }}
              onClick={() => handleCardClick('ternary-op')}
              role="button"
              tabIndex={0}
            >
              <div className={styles.cardHeader}>
                <span className={styles.numberBadge} style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#D97706' }}>
                  05
                </span>
                <h4 className={styles.cardTitle}>Conditional Operator (?:)</h4>
              </div>
              <p className={styles.cardSubtitle}>A shorthand way to select one of two expressions.</p>
              <div className={styles.codeBoxLight}>
                {`condition ? expression1 : expression2;`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
