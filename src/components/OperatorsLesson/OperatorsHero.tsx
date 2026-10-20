import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import {
  HERO_OPERATOR_CATEGORIES,
  HERO_PROGRAM_OUTPUT,
  type OperatorCategoryId,
  type HeroOperatorCategory,
} from '../../data/operatorsLessonData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './OperatorsHero.module.css';

interface OperatorsHeroProps {
  onExploreClick?: () => void;
  selectedCategory: OperatorCategoryId;
  onSelectCategory: (id: OperatorCategoryId) => void;
}

interface ConnectorCoordinate {
  id: OperatorCategoryId;
  color: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  pathD: string;
}

export function OperatorsHero({
  onExploreClick,
  selectedCategory,
  onSelectCategory,
}: OperatorsHeroProps) {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [connectors, setConnectors] = useState<ConnectorCoordinate[]>([]);

  // Smooth scroll to Types section
  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const target = document.getElementById('operator-types');
    if (target) {
      const navOffset = 90;
      const pos = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: pos - navOffset, behavior: 'smooth' });
    }
  };

  // Recalculate dynamic connector lines based on actual DOM measurements
  const updateConnectors = useCallback(() => {
    if (!stageRef.current) return;
    const stageRect = stageRef.current.getBoundingClientRect();
    if (stageRect.width < 1024) {
      // Don't render SVG connectors on tablet/mobile to prevent clutter
      setConnectors([]);
      return;
    }

    const calculated: ConnectorCoordinate[] = [];

    HERO_OPERATOR_CATEGORIES.forEach((cat) => {
      const panelEl = document.getElementById(`hero-panel-${cat.id}`);
      const targetEl = document.getElementById(`code-target-${cat.id}`);

      if (panelEl && targetEl) {
        const panelRect = panelEl.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();

        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        if (cat.side === 'left') {
          // Connect from right edge of left panel to left edge of target token
          startX = panelRect.right - stageRect.left;
          startY = panelRect.top + panelRect.height / 2 - stageRect.top;
          endX = targetRect.left - stageRect.left - 4;
          endY = targetRect.top + targetRect.height / 2 - stageRect.top;
        } else {
          // Connect from left edge of right panel to right edge of target token
          startX = panelRect.left - stageRect.left;
          startY = panelRect.top + panelRect.height / 2 - stageRect.top;
          endX = targetRect.right - stageRect.left + 4;
          endY = targetRect.top + targetRect.height / 2 - stageRect.top;
        }

        // Cubic Bezier curve control points
        const dx = (endX - startX) * 0.55;
        const pathD = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx * 0.6} ${endY}, ${endX} ${endY}`;

        calculated.push({
          id: cat.id,
          color: cat.color,
          startX,
          startY,
          endX,
          endY,
          pathD,
        });
      }
    });

    setConnectors(calculated);
  }, []);

  useEffect(() => {
    updateConnectors();
    window.addEventListener('resize', updateConnectors);
    const timeout = setTimeout(updateConnectors, 400);

    return () => {
      window.removeEventListener('resize', updateConnectors);
      clearTimeout(timeout);
    };
  }, [updateConnectors]);

  const leftPanels = HERO_OPERATOR_CATEGORIES.filter((c) => c.side === 'left');
  const rightPanels = HERO_OPERATOR_CATEGORIES.filter((c) => c.side === 'right');

  const renderPanel = (cat: HeroOperatorCategory) => {
    const isSelected = selectedCategory === cat.id;

    return (
      <div
        key={cat.id}
        id={`hero-panel-${cat.id}`}
        className={`${styles.operatorCard} ${isSelected ? styles.operatorCardActive : ''}`}
        onClick={() => onSelectCategory(cat.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectCategory(cat.id)}
        style={{
          borderLeft: isSelected ? `3px solid ${cat.color}` : '1px solid #e2e2dc',
        }}
        aria-pressed={isSelected}
        aria-label={`${cat.title}: ${cat.description}`}
      >
        <div className={styles.cardHeader}>
          <div
            className={styles.cardIconBadge}
            style={{ backgroundColor: cat.color }}
          >
            {cat.iconSymbol}
          </div>
          <h3 className={styles.cardTitle}>{cat.title}</h3>
        </div>

        <p className={styles.cardDesc}>{cat.description}</p>

        <div className={styles.chipsRow}>
          {cat.chips.map((chip) => (
            <span key={chip} className={styles.operatorChip}>
              {chip}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header className={styles.heroSection} aria-label="Operators in C Lesson Hero">
      {/* Background Architectural Terrain */}
      <div className={styles.terrainBackground} aria-hidden="true" />

      <div className={styles.container}>
        {/* Top Meta Header */}
        <div className={styles.metaHeader}>
          <div className={styles.brandGroup}>
            <span className={styles.brandLogo}>DEVORA</span>
            <span className={styles.brandSubtitle}>C PROGRAMMING</span>
          </div>

          <div className={styles.lessonBadge}>
            <BookOpen size={13} aria-hidden="true" />
            <span>LESSON 06 · OPERATORS IN C</span>
          </div>
        </div>

        {/* Main Hero Layout: Left Editorial + Center Stage */}
        <div className={styles.heroLayout}>
          {/* Left Editorial Introduction */}
          <motion.div
            className={styles.editorialColumn}
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className={styles.headline}>
              <span className={styles.titleLine}>Operators</span>
              <span className={styles.titleLine}>in C</span>
            </h1>

            <p className={styles.leadParagraph}>
              Operators are special symbols that perform operations on one or more operands, such as
              variables, constants, or expressions.
            </p>

            <p className={styles.supportingParagraph}>
              Operators are used for mathematical calculations, comparison, logical decisions, bit
              manipulation, and assignment.
            </p>

            <button
              type="button"
              className={styles.ctaButton}
              onClick={handleExplore}
              aria-label="Scroll to Types of Operators in C section"
            >
              <span>Explore the Operators</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </motion.div>

          {/* Central Interactive Stage: Left Panels + Dark Code Editor + Right Panels */}
          <div ref={stageRef} className={styles.stageWrapper}>
            {/* SVG Connector Lines Overlay */}
            <svg className={styles.connectorsSvg} aria-hidden="true">
              <defs>
                {HERO_OPERATOR_CATEGORIES.map((cat) => (
                  <marker
                    key={`marker-${cat.id}`}
                    id={`arrow-${cat.id}`}
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 9 5 L 0 9 z" fill={cat.color} />
                  </marker>
                ))}
              </defs>

              {connectors.map((conn) => {
                const isSelected = selectedCategory === conn.id;
                return (
                  <path
                    key={conn.id}
                    d={conn.pathD}
                    className={styles.connectorPath}
                    stroke={conn.color}
                    strokeWidth={isSelected ? 2.5 : 1.4}
                    strokeOpacity={isSelected ? 0.95 : 0.4}
                    markerEnd={`url(#arrow-${conn.id})`}
                  />
                );
              })}
            </svg>

            {/* Left 3 Category Panels */}
            <div className={styles.leftPanelStack}>
              {leftPanels.map((cat) => renderPanel(cat))}
            </div>

            {/* Center Dark Code Editor & Floating Output */}
            <div className={styles.centerEditorWrap}>
              <div className={styles.codeEditorCard}>
                {/* Title Bar with Traffic Dots */}
                <div className={styles.editorTitleBar}>
                  <div className={styles.macControls}>
                    <span className={`${styles.macDot} ${styles.macDotRed}`} />
                    <span className={`${styles.macDot} ${styles.macDotAmber}`} />
                    <span className={`${styles.macDot} ${styles.macDotGreen}`} />
                  </div>
                  <span className={styles.editorFileName}>operators_overview.c</span>
                </div>

                {/* Code Body with Synchronized Interactive Highlights */}
                <div className={styles.codeBody}>
                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>1</span>
                    <span className={styles.lineText}>
                      <span style={{ color: '#60a5fa' }}>#include</span>{' '}
                      <span style={{ color: '#fca5a5' }}>&lt;stdio.h&gt;</span>
                    </span>
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>2</span>
                    <span className={styles.lineText} />
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>3</span>
                    <span className={styles.lineText}>
                      <span style={{ color: '#c084fc' }}>int</span> main(
                      <span style={{ color: '#c084fc' }}>void</span>) &#123;
                    </span>
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>4</span>
                    <span className={styles.lineText}>
                      {'    '}
                      <span style={{ color: '#c084fc' }}>int</span> a ={' '}
                      <span
                        id="code-target-increment"
                        className={`${styles.pillHighlight} ${
                          selectedCategory === 'increment' ? styles.pillHighlightActive : ''
                        }`}
                        style={{
                          border: '1.5px solid #8b5cf6',
                          background: 'rgba(139, 92, 246, 0.15)',
                          color: '#c4b5fd',
                        }}
                      >
                        10
                      </span>
                      , b = 5;
                    </span>
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>5</span>
                    <span className={styles.lineText}>
                      {'    '}
                      <span style={{ color: '#c084fc' }}>int</span> sum{' '}
                      <span
                        id="code-target-assignment"
                        className={`${styles.pillHighlight} ${
                          selectedCategory === 'assignment' ? styles.pillHighlightActive : ''
                        }`}
                        style={{
                          border: '1.5px solid #10a37f',
                          background: 'rgba(16, 163, 127, 0.18)',
                          color: '#86efac',
                        }}
                      >
                        =
                      </span>{' '}
                      <span
                        id="code-target-arithmetic"
                        className={`${styles.pillHighlight} ${
                          selectedCategory === 'arithmetic' ? styles.pillHighlightActive : ''
                        }`}
                        style={{
                          border: '1.5px solid #0055ff',
                          background: 'rgba(0, 85, 255, 0.18)',
                          color: '#93c5fd',
                        }}
                      >
                        a + b
                      </span>
                      ;
                    </span>
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>6</span>
                    <span className={styles.lineText}>
                      {'    '}
                      <span style={{ color: '#c084fc' }}>int</span> diff = a - b;
                    </span>
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>7</span>
                    <span className={styles.lineText}>
                      {'    '}
                      <span style={{ color: '#c084fc' }}>int</span> prod = a * b;
                    </span>
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>8</span>
                    <span className={styles.lineText}>
                      {'    '}
                      <span style={{ color: '#c084fc' }}>int</span> div = a / b;
                    </span>
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>9</span>
                    <span className={styles.lineText}>
                      {'    '}
                      <span style={{ color: '#c084fc' }}>int</span> rem = a % b;
                    </span>
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>10</span>
                    <span className={styles.lineText} />
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>11</span>
                    <span className={styles.lineText}>
                      {'    '}printf(
                      <span style={{ color: '#86efac' }}>"a &gt; b: %d\n"</span>,{' '}
                      <span
                        id="code-target-relational"
                        className={`${styles.pillHighlight} ${
                          selectedCategory === 'relational' ? styles.pillHighlightActive : ''
                        }`}
                        style={{
                          border: '1.5px solid #d97706',
                          background: 'rgba(217, 119, 6, 0.2)',
                          color: '#fde047',
                        }}
                      >
                        a &gt; b
                      </span>
                      );
                    </span>
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>12</span>
                    <span className={styles.lineText}>
                      {'    '}printf(
                      <span style={{ color: '#86efac' }}>"a == b: %d\n"</span>, a == b);
                    </span>
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>13</span>
                    <span className={styles.lineText}>
                      {'    '}printf(
                      <span style={{ color: '#86efac' }}>"(a &gt; 0 && b &gt; 0): %d\n"</span>,{' '}
                      <span
                        id="code-target-logical"
                        className={`${styles.pillHighlight} ${
                          selectedCategory === 'logical' ? styles.pillHighlightActive : ''
                        }`}
                        style={{
                          border: '1.5px solid #ea580c',
                          background: 'rgba(234, 88, 12, 0.2)',
                          color: '#fed7aa',
                        }}
                      >
                        a &gt; 0 && b &gt; 0
                      </span>
                      );
                    </span>
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>14</span>
                    <span className={styles.lineText}>
                      {'    '}
                      <span
                        id="code-target-bitwise"
                        style={{
                          display: 'inline-block',
                          color: selectedCategory === 'bitwise' ? '#d8b4fe' : '#ffffff',
                          fontWeight: selectedCategory === 'bitwise' ? 700 : 400,
                        }}
                      >
                        <span style={{ color: '#f43f5e' }}>return</span> 0;
                      </span>
                    </span>
                  </div>

                  <div className={styles.codeLine}>
                    <span className={styles.lineNumber}>15</span>
                    <span className={styles.lineText}>&#125;</span>
                  </div>
                </div>
              </div>

              {/* Compact Floating Output Card */}
              <div className={styles.outputCard}>
                <div className={styles.outputHeader}>
                  <span className={styles.outputDot} />
                  <span>Program Output</span>
                </div>
                <pre className={styles.outputBody}>{HERO_PROGRAM_OUTPUT}</pre>
              </div>
            </div>

            {/* Right 3 Category Panels */}
            <div className={styles.rightPanelStack}>
              {rightPanels.map((cat) => renderPanel(cat))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
