import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import {
  PROGRAM_COMPONENTS,
  PROGRAM_LINES,
} from '../../data/structureLessonData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './StructureCodeExplorer.module.css';

interface StructureCodeExplorerProps {
  activeComponentId: string;
  exploredIds: Set<string>;
  onSelectComponent: (componentId: string) => void;
  onQuizRequested: () => void;
}

export function StructureCodeExplorer({
  activeComponentId,
  exploredIds,
  onSelectComponent,
  onQuizRequested,
}: StructureCodeExplorerProps) {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState<boolean>(false);

  const currentIndex = PROGRAM_COMPONENTS.findIndex((c) => c.id === activeComponentId);
  const activeComp = PROGRAM_COMPONENTS[currentIndex] || PROGRAM_COMPONENTS[0];

  const allExplored = exploredIds.size >= PROGRAM_COMPONENTS.length;

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + PROGRAM_COMPONENTS.length) % PROGRAM_COMPONENTS.length;
    onSelectComponent(PROGRAM_COMPONENTS[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % PROGRAM_COMPONENTS.length;
    onSelectComponent(PROGRAM_COMPONENTS[nextIdx].id);
  };

  const handleLineClick = (lineNum: number) => {
    const comp = PROGRAM_COMPONENTS.find((c) => c.highlightLines.includes(lineNum));
    if (comp) {
      onSelectComponent(comp.id);
    }
  };

  const handleCopySnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSyntaxCode = (code: string) => {
    if (!code) return '\u00A0';
    if (code.startsWith('#include')) {
      return (
        <>
          <span className={styles.kwPreprocessor}>#include</span>{' '}
          <span className={styles.libHeader}>&lt;stdio.h&gt;</span>
        </>
      );
    }
    if (code.startsWith('int main')) {
      return (
        <>
          <span className={styles.kwType}>int</span>{' '}
          <span className={styles.fnName}>main</span>(
          <span className={styles.kwType}>void</span>)
        </>
      );
    }
    if (code.includes('int number = 10;')) {
      return (
        <>
          {'    '}
          <span className={styles.kwType}>int</span> number ={' '}
          <span className={styles.literalNum}>10</span>;
        </>
      );
    }
    if (code.includes('printf')) {
      return (
        <>
          {'    '}
          <span className={styles.fnName}>printf</span>(
          <span className={styles.literalStr}>"Number = %d\n"</span>, number);
        </>
      );
    }
    if (code.includes('return 0;')) {
      return (
        <>
          {'    '}
          <span className={styles.kwControl}>return</span>{' '}
          <span className={styles.literalNum}>0</span>;
        </>
      );
    }
    return code;
  };

  return (
    <section id="code-explorer" className={styles.sectionWrapper} aria-labelledby="explorer-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>03</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>INTERACTIVE CODE</span>
          </div>

          <h2 id="explorer-heading" className={styles.mainHeading}>
            Explore each part.
          </h2>

          <p className={styles.subHeading}>
            Click any line in the code editor or use the navigation controls to inspect each
            statement's role, semantics, and system implications.
          </p>
        </div>

        {/* Two-Column Explorer Layout */}
        <div className={styles.explorerGrid}>
          {/* Left Column: Interactive Code Editor */}
          <div className={styles.editorPanel}>
            {/* Editor Window Top Bar */}
            <div className={styles.editorHeader}>
              <div className={styles.trafficLights}>
                <span className={styles.dotRed} />
                <span className={styles.dotAmber} />
                <span className={styles.dotGreen} />
              </div>
              <span className={styles.editorTab}>main.c</span>
              <div className={styles.progressTracker}>
                <span>{exploredIds.size} of {PROGRAM_COMPONENTS.length} explored</span>
              </div>
            </div>

            {/* Code Lines List */}
            <div className={styles.codeBody}>
              {PROGRAM_LINES.map((line) => {
                const isSelected = activeComp.highlightLines.includes(line.lineNum);
                const matchingComp = PROGRAM_COMPONENTS.find((c) =>
                  c.highlightLines.includes(line.lineNum)
                );
                const isPartExplored = matchingComp ? exploredIds.has(matchingComp.id) : false;

                return (
                  <div
                    key={line.lineNum}
                    className={`${styles.codeLine} ${isSelected ? styles.codeLineActive : ''}`}
                    onClick={() => handleLineClick(line.lineNum)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleLineClick(line.lineNum);
                      }
                    }}
                    aria-label={`Line ${line.lineNum}: ${line.code || 'blank line'}`}
                  >
                    <span className={styles.lineGutter}>{line.lineNum}</span>
                    <span className={styles.codeText}>{renderSyntaxCode(line.code)}</span>

                    {/* Badge or Checkmark */}
                    <div className={styles.lineStatus}>
                      {isPartExplored && (
                        <CheckCircle2
                          size={13}
                          className={`${styles.checkIcon} ${
                            isSelected ? styles.checkIconActive : ''
                          }`}
                          aria-label="Component explored"
                        />
                      )}
                      {line.badgeIndex && !isPartExplored && (
                        <span
                          className={`${styles.numberBadge} ${
                            isSelected ? styles.numberBadgeActive : ''
                          }`}
                        >
                          {line.badgeIndex}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Comments Supplementary Switcher */}
            <div
              className={`${styles.commentsBar} ${
                activeComponentId === 'comments' ? styles.commentsBarActive : ''
              }`}
              onClick={() => onSelectComponent('comments')}
              role="button"
              tabIndex={0}
              aria-label="Inspect comments documentation component"
            >
              <div className={styles.commentsBarLeft}>
                <span className={styles.commentPrefix}>//</span>
                <span className={styles.commentText}>
                  Comments are non-executable developer notes ignored by the compiler.
                </span>
              </div>
              <span className={styles.commentTag}>06 &bull; Comments</span>
            </div>
          </div>

          {/* Right Column: Dynamic Component Explanation Card */}
          <div className={styles.detailCol}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeComp.id}
                className={styles.detailCard}
                initial={reduced ? undefined : { opacity: 0, y: 8 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Header: Counter & Badge */}
                <div className={styles.detailTop}>
                  <span className={styles.counterText}>
                    {currentIndex + 1} / {PROGRAM_COMPONENTS.length}
                  </span>
                  <span className={styles.categoryBadge}>{activeComp.badge}</span>
                </div>

                {/* Title & Short Role */}
                <h3 className={styles.detailTitle}>{activeComp.title}</h3>
                <p className={styles.detailShort}>{activeComp.shortRole}</p>

                {/* Code Example Box */}
                <div className={styles.snippetContainer}>
                  <div className={styles.snippetLabelRow}>
                    <span className={styles.snippetLabel}>Example Statement</span>
                    <button
                      type="button"
                      className={styles.copyBtn}
                      onClick={() => handleCopySnippet(activeComp.snippet)}
                      aria-label="Copy snippet to clipboard"
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
                  <pre className={styles.snippetPre}>
                    <code>{activeComp.snippet}</code>
                  </pre>
                </div>

                {/* In-Depth Explanation */}
                <div className={styles.explanationSection}>
                  <h4 className={styles.explanationHeading}>How It Functions</h4>
                  <p className={styles.explanationBody}>{activeComp.explanation}</p>
                </div>

                {/* Key Takeaway Callout */}
                <div className={styles.takeawayBox}>
                  <div className={styles.takeawayHeader}>
                    <Sparkles size={13} className={styles.sparkleIcon} aria-hidden="true" />
                    <span>System Insight</span>
                  </div>
                  <p className={styles.takeawayText}>{activeComp.keyTakeaway}</p>
                </div>

                {/* Navigation Stepper Controls */}
                <div className={styles.detailNav}>
                  <button
                    type="button"
                    className={styles.navBtn}
                    onClick={handlePrev}
                    aria-label="Previous component"
                  >
                    <ArrowLeft size={14} aria-hidden="true" />
                    <span>Previous</span>
                  </button>

                  <div className={styles.dotsRow}>
                    {PROGRAM_COMPONENTS.map((comp, idx) => (
                      <button
                        key={comp.id}
                        type="button"
                        className={`${styles.stepDot} ${
                          idx === currentIndex ? styles.stepDotActive : ''
                        } ${exploredIds.has(comp.id) ? styles.stepDotExplored : ''}`}
                        onClick={() => onSelectComponent(comp.id)}
                        aria-label={`Go to ${comp.title}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className={`${styles.navBtn} ${styles.navBtnPrimary}`}
                    onClick={handleNext}
                    aria-label="Next component"
                  >
                    <span>Next</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* All Parts Explored Completion Celebration Banner */}
            {allExplored && (
              <motion.div
                className={styles.completedBanner}
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.bannerCheck}>
                  <CheckCircle2 size={22} className={styles.bannerCheckIcon} aria-hidden="true" />
                </div>
                <div className={styles.bannerTextCol}>
                  <h4 className={styles.bannerTitle}>All parts explored!</h4>
                  <p className={styles.bannerDesc}>
                    You understand each line of this C program. Test your understanding with the practice quiz.
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.startQuizBtn}
                  onClick={onQuizRequested}
                  aria-label="Scroll to practice quiz"
                >
                  <span>Start Quiz</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StructureCodeExplorer;
