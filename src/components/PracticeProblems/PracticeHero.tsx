import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Clock, Award, Layers, Sparkles } from 'lucide-react';
import { Link, useNavigate } from '../../router/Router';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './PracticeHero.module.css';

interface PracticeHeroProps {
  onStartPracticing: () => void;
}

export function PracticeHero({ onStartPracticing }: PracticeHeroProps) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  const handleExplorePrograms = () => {
    navigate('/programs');
  };

  return (
    <section className={styles.heroSection} aria-label="Practice Problems Overview">
      <div className={styles.container}>
        {/* Left Editorial Content */}
        <motion.div
          className={styles.leftCol}
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/" className={styles.breadcrumbLink}>
              DEVORA
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link to="/theory" className={styles.breadcrumbLink}>
              CURRICULUM
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link to="/theory" className={styles.breadcrumbLink}>
              BASICS
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>PRACTICE PROBLEMS</span>
          </nav>

          {/* Eyebrow */}
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>FOUNDATION MODULE · PRACTICE</span>
          </div>

          {/* Main Heading */}
          <h1 className={styles.heading}>
            Practice Your Logic.
            <br />
            Strengthen Your C.
          </h1>

          {/* Supporting Text */}
          <p className={styles.supportingText}>
            Move beyond reading code. Solve programming problems, test your reasoning, understand
            edge cases, and build confidence through practice.
          </p>

          {/* Metadata Badges */}
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <Clock size={13} className={styles.metaIcon} aria-hidden="true" />
              <span>Est. 25 min</span>
            </div>
            <div className={styles.metaItem}>
              <Award size={13} className={styles.metaIcon} aria-hidden="true" />
              <span>Beginner to Intermediate</span>
            </div>
            <div className={styles.metaItem}>
              <Sparkles size={13} className={styles.metaIcon} aria-hidden="true" />
              <span>28 Curated Exercises</span>
            </div>
            <div className={styles.metaItem}>
              <Layers size={13} className={styles.metaIcon} aria-hidden="true" />
              <span>Syntax · Control Flow · Pointers · Recursion</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className={styles.actionsRow}>
            <button
              type="button"
              onClick={onStartPracticing}
              className={styles.primaryCta}
              aria-label="Start Practicing and scroll to workspace"
            >
              <span>Start Practicing</span>
              <ArrowDown size={15} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={handleExplorePrograms}
              className={styles.secondaryCta}
              aria-label="Explore Programs Library"
            >
              <span>Explore Programs</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        {/* Right Visual: Interactive Code Card & Logic Core */}
        <motion.div
          className={styles.rightCol}
          initial={reduced ? undefined : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Dark macOS-style Code Editor Card */}
          <div className={styles.editorCard}>
            <div className={styles.editorHeader}>
              <div className={styles.dots} aria-hidden="true">
                <span className={`${styles.dot} ${styles.dotRed}`} />
                <span className={`${styles.dot} ${styles.dotYellow}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
              </div>
              <div className={styles.tabTitle}>
                <span className={styles.tabDot} />
                <span>logic_verification.c</span>
              </div>
              <span className={styles.editorStatus}>VERIFIED</span>
            </div>

            <pre className={styles.codeArea}>
              <code>
                <span className={styles.cm}>// DEVORA C Practice Engine</span>
                {'\n'}
                <span className={styles.kw}>bool</span> <span className={styles.fn}>verify_base_case</span>(
                <span className={styles.kw}>int</span> n) {'{\n'}
                {'    '}
                <span className={styles.kw}>if</span> (n &lt;= <span className={styles.num}>1</span>) {'{\n'}
                {'        '}
                <span className={styles.kw}>return</span> <span className={styles.num}>true</span>;{' '}
                <span className={styles.cm}>// Halts recursion stack</span>
                {'\n'}
                {'    }\n'}
                {'    '}
                <span className={styles.kw}>return</span> <span className={styles.num}>false</span>;
                {'\n}\n\n'}
                <span className={styles.kw}>void</span> <span className={styles.fn}>run_challenge</span>
                (<span className={styles.kw}>void</span>) {'{\n'}
                {'    '}<span className={styles.fn}>assert</span>(<span className={styles.fn}>verify_base_case</span>(<span className={styles.num}>1</span>));{'\n'}
                {'    '}<span className={styles.fn}>printf</span>(<span className={styles.str}>&quot;Logic test passed. Ready.\\n&quot;</span>);{'\n'}
                {'}'}
              </code>
            </pre>
          </div>

          {/* Floating Logic Core Banner */}
          <div className={styles.logicCoreBanner}>
            <div className={styles.coreIconWrapper}>
              <img
                src="/images/devora-logic-core-c-icon.png"
                alt="DEVORA Logic Core"
                className={styles.coreImage}
                loading="eager"
              />
            </div>
            <div className={styles.coreText}>
              <span className={styles.coreTitle}>DEVORA Logic Core</span>
              <span className={styles.coreSubtitle}>
                Computational Architecture · Interactive Problem Solving
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PracticeHero;
