import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Zap, Cog, BarChart2, ArrowRight, RotateCw } from 'lucide-react';
import { HERO_FEATURE_STRIP } from '../../data/loopsLessonData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './LoopsHero.module.css';

interface LoopsHeroProps {
  onExploreClick?: () => void;
}

export function LoopsHero({ onExploreClick }: LoopsHeroProps) {
  const reduced = useReducedMotion();
  const [outputLines, setOutputLines] = useState<number[]>([]);
  const [isReplaying, setIsReplaying] = useState(false);

  // Sequential output reveal animation
  useEffect(() => {
    setOutputLines([]);
    const timers: ReturnType<typeof setTimeout>[] = [];

    [1, 2, 3, 4, 5].forEach((num, index) => {
      const t = setTimeout(() => {
        setOutputLines((prev) => [...prev, num]);
      }, 500 + index * 250);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [isReplaying]);

  const handleReplay = () => {
    setIsReplaying((prev) => !prev);
  };

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('loop-flow-overview');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getFeatureIcon = (name: string) => {
    switch (name) {
      case 'RotateCcw':
        return <RotateCcw size={15} className={styles.featureIcon} />;
      case 'Zap':
        return <Zap size={15} className={styles.featureIcon} />;
      case 'Cog':
        return <Cog size={15} className={styles.featureIcon} />;
      case 'BarChart2':
        return <BarChart2 size={15} className={styles.featureIcon} />;
      default:
        return null;
    }
  };

  return (
    <section className={styles.heroWrapper} id="loops-hero">
      {/* Background Campus Scene Layer */}
      <div className={styles.bgImageLayer} aria-hidden="true" />
      <div className={styles.gradientOverlay} aria-hidden="true" />
      <div className={styles.bottomFadeOverlay} aria-hidden="true" />

      <div className={styles.heroContainer}>
        {/* ==========================================================
            LEFT COLUMN: Editorial Typography & Feature Strip
            ========================================================== */}
        <div className={styles.leftColumn}>
          <motion.div
            className={styles.eyebrow}
            initial={reduced ? undefined : { opacity: 0, y: -6 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className={styles.eyebrowDot} />
            <span>DEVORA</span>
            <span>·</span>
            <span>C PROGRAMMING</span>
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <span>Loops</span>
            <span>in C</span>
          </motion.h1>

          <motion.p
            className={styles.leadParagraph}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            A loop in C is a control structure that repeatedly executes a block of code as long as a
            specified condition is satisfied or until a particular stopping condition is reached.
          </motion.p>

          <motion.button
            type="button"
            className={styles.ctaButton}
            onClick={handleExplore}
            initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.22 }}
            aria-label="Explore Loops in C"
          >
            <span>Explore Loops in C</span>
            <ArrowRight size={15} />
          </motion.button>

          {/* Feature Strip (4 items) */}
          <motion.div
            className={styles.featureStrip}
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            {HERO_FEATURE_STRIP.map((item) => (
              <div key={item.id} className={styles.featureItem}>
                {getFeatureIcon(item.iconName)}
                <div>
                  <h4 className={styles.featureTitle}>{item.title}</h4>
                  <p className={styles.featureDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ==========================================================
            RIGHT STAGE: Floating Code Editor + Output + Handwritten Arrow
            ========================================================== */}
        <div className={styles.rightStage}>
          {/* Floating Dark Code Editor (loops.c) */}
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
              <div className={styles.editorFileName}>loops.c</div>
              <div style={{ width: 36 }} />
            </div>

            <div className={styles.codeBody}>
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>1</span>
                <span>
                  <span className={styles.syntaxPreproc}>#include</span>{' '}
                  <span className={styles.syntaxString}>&lt;stdio.h&gt;</span>
                </span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>2</span>
                <span />
              </div>
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>3</span>
                <span>
                  <span className={styles.syntaxType}>int</span>{' '}
                  <span className={styles.syntaxFunc}>main</span>
                  <span className={styles.syntaxPunct}>(</span>
                  <span className={styles.syntaxType}>void</span>
                  <span className={styles.syntaxPunct}>) {'{'}</span>
                </span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>4</span>
                <span>
                  {'    '}
                  <span className={styles.syntaxKeyword}>for</span>
                  <span className={styles.syntaxPunct}> (</span>
                  <span className={styles.syntaxType}>int</span>{' '}
                  <span className={styles.syntaxVar}>i</span> ={' '}
                  <span className={styles.syntaxNum}>1</span>;{' '}
                  <span className={styles.syntaxVar}>i</span> &lt;={' '}
                  <span className={styles.syntaxNum}>5</span>;{' '}
                  <span className={styles.syntaxVar}>i</span>++
                  <span className={styles.syntaxPunct}>) {'{'}</span>
                </span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>5</span>
                <span>
                  {'        '}
                  <span className={styles.syntaxFunc}>printf</span>
                  <span className={styles.syntaxPunct}>(</span>
                  <span className={styles.syntaxString}>"%d\n"</span>
                  <span className={styles.syntaxPunct}>, </span>
                  <span className={styles.syntaxVar}>i</span>
                  <span className={styles.syntaxPunct}>);</span>
                </span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>6</span>
                <span>{'    }'}</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>7</span>
                <span>
                  {'    '}
                  <span className={styles.syntaxKeyword}>return</span>{' '}
                  <span className={styles.syntaxNum}>0</span>;
                </span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.lineNum}>8</span>
                <span>{'}'}</span>
              </div>
            </div>
          </motion.div>

          {/* Connected Floating Output Terminal */}
          <motion.div
            className={styles.outputCard}
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
          >
            <div className={styles.outputHeader}>
              <span>Output</span>
              <button
                type="button"
                className={styles.replayBtn}
                onClick={handleReplay}
                title="Replay loop execution"
                aria-label="Replay loop execution"
              >
                <RotateCw size={13} />
              </button>
            </div>
            <div className={styles.outputBody}>
              {outputLines.map((val) => (
                <span key={val} className={styles.outputItem}>
                  {val}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Handwritten-Style Annotation & Curved Arrow */}
          <motion.div
            className={styles.annotationCluster}
            initial={reduced ? undefined : { opacity: 0, scale: 0.9 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className={styles.annotationText}>Same task, just a few lines of code.</span>
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
                transition={{ duration: 0.7, delay: 0.6 }}
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
                transition={{ duration: 0.3, delay: 1.2 }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
