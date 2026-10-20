import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Play,
  Copy,
  Check,
  RefreshCw,
  Layers,
  FileText,
  Bug,
  Shield,
  Wrench,
  Settings,
} from 'lucide-react';
import { useReducedMotion } from '../../hooks/useMotion';
import { HERO_BENEFITS, HERO_CODE_FILES } from '../../data/functionsLessonData';
import styles from './FunctionsHero.module.css';

interface FunctionsHeroProps {
  onStartLearningClick?: () => void;
}

export function FunctionsHero({ onStartLearningClick }: FunctionsHeroProps) {
  const reduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'main.c' | 'add.c' | 'math.c'>('main.c');
  const [copied, setCopied] = useState(false);

  const activeFile = HERO_CODE_FILES.find((f) => f.name === activeTab) || HERO_CODE_FILES[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'RefreshCw':
        return <RefreshCw size={13} className={styles.benefitIcon} />;
      case 'Layers':
        return <Layers size={13} className={styles.benefitIcon} />;
      case 'FileText':
        return <FileText size={13} className={styles.benefitIcon} />;
      case 'Bug':
        return <Bug size={13} className={styles.benefitIcon} />;
      case 'Shield':
        return <Shield size={13} className={styles.benefitIcon} />;
      case 'Wrench':
        return <Wrench size={13} className={styles.benefitIcon} />;
      default:
        return <Settings size={13} className={styles.benefitIcon} />;
    }
  };

  return (
    <section className={styles.heroWrapper} id="functions-hero">
      {/* Background Campus Photograph Layer */}
      <div className={styles.heroBackground} />
      <div className={styles.scrimOverlay} />
      <div className={styles.bottomFadeOverlay} />

      <div className={styles.heroContainer}>
        {/* ==========================================================
            LEFT COLUMN: Editorial Typography & Benefits Strip
            ========================================================== */}
        <div className={styles.leftColumn}>
          <motion.div
            className={styles.eyebrow}
            initial={reduced ? undefined : { opacity: 0, y: -6 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className={styles.eyebrowDash} />
            <span>MODULE 07 · FUNCTIONS</span>
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <span>Functions</span>
            <span>
              in <span className={styles.titleAccentC}>C</span>
            </span>
          </motion.h1>

          <motion.p
            className={styles.leadParagraph}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            A function in C is a named, reusable unit of code that performs a specific task. It can
            receive input through parameters, execute a set of statements, and return a result to the
            calling function.
          </motion.p>

          <motion.div
            className={styles.ctaButtonGroup}
            initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.22 }}
          >
            <button
              type="button"
              className={styles.ctaPrimary}
              onClick={onStartLearningClick}
              aria-label="Start Learning Functions in C"
            >
              <span>Start Learning</span>
              <ArrowDown size={14} />
            </button>
            <button
              type="button"
              className={styles.ctaSecondary}
              onClick={onStartLearningClick}
              aria-label="Watch Intro to Functions"
            >
              <Play size={13} fill="currentColor" />
              <span>Watch Intro</span>
            </button>
          </motion.div>

          {/* Benefit Strip (6 items) */}
          <motion.div
            className={styles.benefitStrip}
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            {HERO_BENEFITS.map((item) => (
              <div key={item.id} className={styles.benefitItem} title={item.description}>
                {getBenefitIcon(item.icon)}
                <span className={styles.benefitTitle}>{item.title}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ==========================================================
            RIGHT STAGE: Floating Code Editor + Function Diagram + Note
            ========================================================== */}
        <div className={styles.rightStage}>
          {/* Floating Dark Code Editor */}
          <motion.div
            className={styles.editorCard}
            initial={reduced ? undefined : { opacity: 0, x: 25 }}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
          >
            <div className={styles.editorTitleBar}>
              <div className={styles.macControls}>
                <span className={`${styles.macDot} ${styles.macDotRed}`} />
                <span className={`${styles.macDot} ${styles.macDotAmber}`} />
                <span className={`${styles.macDot} ${styles.macDotGreen}`} />
              </div>

              <div className={styles.editorTabs}>
                {(['main.c', 'add.c', 'math.c'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`${styles.editorTab} ${
                      activeTab === tab ? styles.editorTabActive : ''
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className={styles.editorCopyBtn}
                onClick={handleCopy}
                title="Copy code"
                aria-label="Copy code"
              >
                {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
              </button>
            </div>

            <div className={styles.codeBody}>
              {activeFile.code.split('\n').map((line, idx) => {
                const lineNum = idx + 1;
                const isComment = line.trim().startsWith('//');
                const isPreproc = line.trim().startsWith('#');
                const isCallLine = line.includes('add(10, 20)');

                return (
                  <div
                    key={lineNum}
                    className={styles.codeLine}
                    style={{
                      background: isCallLine ? 'rgba(37, 99, 235, 0.12)' : undefined,
                      borderRadius: isCallLine ? 4 : undefined,
                    }}
                  >
                    <span className={styles.lineNum}>{lineNum}</span>
                    <span>
                      {isPreproc ? (
                        <span className={styles.syntaxPreproc}>{line}</span>
                      ) : isComment ? (
                        <span className={styles.syntaxComment}>{line}</span>
                      ) : (
                        line.split(/(\b(?:int|void|return)\b|add|printf|Sum = %d\\n|\b\d+\b)/g).map((chunk, cIdx) => {
                          if (['int', 'void'].includes(chunk)) {
                            return <span key={cIdx} className={styles.syntaxType}>{chunk}</span>;
                          }
                          if (chunk === 'return') {
                            return <span key={cIdx} className={styles.syntaxKeyword}>{chunk}</span>;
                          }
                          if (['add', 'printf', 'main'].includes(chunk)) {
                            return <span key={cIdx} className={styles.syntaxFunc}>{chunk}</span>;
                          }
                          if (chunk.includes('"') || chunk.includes('Sum =')) {
                            return <span key={cIdx} className={styles.syntaxString}>{chunk}</span>;
                          }
                          if (/^\d+$/.test(chunk)) {
                            return <span key={cIdx} className={styles.syntaxNum}>{chunk}</span>;
                          }
                          return <span key={cIdx} className={styles.syntaxVar}>{chunk}</span>;
                        })
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Connected Floating Function Call Visual Object */}
          <motion.div
            className={styles.functionCallVisualObject}
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
          >
            {/* Top: Function Call */}
            <div className={styles.funcCallHeaderBox}>
              <div className={styles.funcCallLabel}>Function Call</div>
              <div className={styles.funcCallPill}>add(10, 20)</div>
            </div>

            {/* Middle Row: Parameters + Process */}
            <div className={styles.funcMiddleRow}>
              <div className={styles.funcParamBox}>
                <div className={styles.funcParamTitle}>Parameters</div>
                <div>a = 10</div>
                <div>b = 20</div>
              </div>
              <div className={styles.funcProcessBox}>
                <div className={styles.funcProcessTitle}>Process</div>
                <div>a + b</div>
                <div>→ 30</div>
              </div>
            </div>

            {/* Center: Function Body */}
            <div className={styles.funcBodyBox}>
              <div className={styles.funcBodyTitle}>
                <Settings size={13} />
                <span>add() Function Body</span>
              </div>
              <div className={styles.funcBodySub}>return a + b;</div>
            </div>

            {/* Bottom: Return Value */}
            <div className={styles.funcReturnBox}>
              <div className={styles.funcReturnLabel}>Return Value</div>
              <div className={styles.funcReturnPill}>30</div>
            </div>
          </motion.div>

          {/* Handwritten Annotation & Curved SVG Arrow */}
          <motion.div
            className={styles.annotationCluster}
            initial={reduced ? undefined : { opacity: 0, scale: 0.9 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <span className={styles.annotationText}>
              Write once.<br />Use anywhere.<br />That is the power<br />of functions.
            </span>
            <svg
              className={styles.annotationArrowSvg}
              viewBox="0 0 90 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M 72 8 C 50 32, 26 32, 8 18"
                stroke="#1E293B"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                initial={reduced ? undefined : { pathLength: 0 }}
                animate={reduced ? undefined : { pathLength: 1 }}
                transition={{ duration: 0.7, delay: 0.55 }}
              />
              <motion.path
                d="M 15 12 L 8 18 L 16 22"
                stroke="#1E293B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={reduced ? undefined : { opacity: 0 }}
                animate={reduced ? undefined : { opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.1 }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
