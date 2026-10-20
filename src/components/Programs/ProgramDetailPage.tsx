import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Copy, Check, Terminal, Code2 } from 'lucide-react';
import { useNavigate, useLocation } from '../../router/Router';
import { Navigation } from '../Navigation/Navigation';
import {
  getProgramBySlug,
  getCategoryBySlug,
  getAdjacentPrograms,
  ALL_PROGRAMS,
} from '../../data/programs';
import { RightHalfPyramidLessonPage } from '../RightHalfPyramidLesson/RightHalfPyramidLessonPage';
import { InvertedRightHalfPyramidLessonPage } from '../InvertedRightHalfPyramidLesson/InvertedRightHalfPyramidLessonPage';
import { LeftHalfPyramidLessonPage } from '../LeftHalfPyramidLesson/LeftHalfPyramidLessonPage';
import { FullPyramidLessonPage } from '../FullPyramidLesson/FullPyramidLessonPage';
import styles from './ProgramDetailPage.module.css';

export function ProgramDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  // Parse path: /programs/:categorySlug/:programSlug
  const segments = location.pathname.split('/').filter(Boolean);
  // e.g. ['programs', 'patterns', 'right-half-pyramid']
  const categorySlug = segments[1] || '';
  const programSlug = segments[2] || '';

  // Dedicated rich interactive lesson for Right Half Pyramid
  if (programSlug === 'right-half-pyramid' || programSlug === 'right-half-pyramid-star') {
    return <RightHalfPyramidLessonPage />;
  }

  // Dedicated rich interactive lesson for Inverted Right Half Pyramid
  if (programSlug === 'inverted-right-half-pyramid' || programSlug === 'inverted-right-half-pyramid-star') {
    return <InvertedRightHalfPyramidLessonPage />;
  }

  // Dedicated rich interactive lesson for Left Half Pyramid
  if (programSlug === 'left-half-pyramid' || programSlug === 'left-half-pyramid-star') {
    return <LeftHalfPyramidLessonPage />;
  }

  // Dedicated rich interactive lesson for Full Pyramid
  if (programSlug === 'full-pyramid' || programSlug === 'full-pyramid-star') {
    return <FullPyramidLessonPage />;
  }

  const program = getProgramBySlug(categorySlug, programSlug) ||
    // Fallback: search by program slug alone across all programs
    ALL_PROGRAMS.find((p) => p.slug === programSlug);

  const category = program ? getCategoryBySlug(program.categorySlug) : undefined;
  const adjacent = program ? getAdjacentPrograms(program.id) : { prev: null, next: null };

  const handleCopyCode = () => {
    if (!program) return;
    navigator.clipboard.writeText(program.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!program) {
    return (
      <div className={styles.pageWrapper}>
        <Navigation />
        <main className={styles.mainContent}>
          <div className={styles.container} style={{ textAlign: 'center', paddingTop: '4rem' }}>
            <h1 className={styles.programTitle}>Program Not Found</h1>
            <p className={styles.programDesc} style={{ margin: '1rem auto 2rem auto' }}>
              The requested C program could not be located in the catalogue.
            </p>
            <button
              type="button"
              className={styles.backBtn}
              onClick={() => navigate('/programs')}
            >
              <ArrowLeft size={14} />
              <span>Back to Programs Library</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  const diffClass =
    program.difficulty === 'Beginner'
      ? styles.diffBeginner
      : program.difficulty === 'Intermediate'
      ? styles.diffIntermediate
      : styles.diffAdvanced;

  const totalInCat = category ? category.programs.length : 10;

  return (
    <div className={styles.pageWrapper}>
      <Navigation />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Top Bar: Breadcrumb + Back Button */}
          <div className={styles.topBar}>
            <div className={styles.breadcrumb}>
              <button
                type="button"
                className={styles.breadcrumbLink}
                onClick={() => navigate('/')}
              >
                DEVORA
              </button>
              <span className={styles.breadcrumbSep}>/</span>
              <button
                type="button"
                className={styles.breadcrumbLink}
                onClick={() => navigate('/programs')}
              >
                C PROGRAMMING
              </button>
              <span className={styles.breadcrumbSep}>/</span>
              <button
                type="button"
                className={styles.breadcrumbLink}
                onClick={() => navigate('/programs')}
              >
                PRACTICE LIBRARY
              </button>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>{program.categoryTitle}</span>
            </div>

            <button
              type="button"
              className={styles.backBtn}
              onClick={() => navigate('/programs')}
            >
              <ArrowLeft size={14} />
              <span>All 99 Programs</span>
            </button>
          </div>

          {/* Program Header Card */}
          <motion.div
            className={styles.headerCard}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className={styles.badgeRow}>
              <span className={styles.catBadge}>{program.categoryTitle}</span>
              <span className={`${styles.diffBadge} ${diffClass}`}>
                {program.difficulty}
              </span>
              <span className={styles.indexPill}>
                Program {program.indexInCategory} of {totalInCat}
              </span>
            </div>

            <h1 className={styles.programTitle}>{program.title}</h1>
            <p className={styles.programDesc}>{program.description}</p>
          </motion.div>

          {/* Code Editor and Output / Explanation Grid */}
          <div className={styles.workspaceGrid}>
            {/* Left Column: C Code Editor */}
            <motion.div
              className={styles.codeCard}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className={styles.editorHeader}>
                <div className={styles.fileLabel}>
                  <span className={styles.fileDot} />
                  <span>{program.slug}.c</span>
                </div>

                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={handleCopyCode}
                  aria-label="Copy C Source Code"
                >
                  {copied ? (
                    <>
                      <Check size={12} color="#4ade80" />
                      <span style={{ color: '#4ade80' }}>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className={styles.codeArea}>
                <code>{program.code}</code>
              </pre>
            </motion.div>

            {/* Right Column: Output & Logic Breakdown */}
            <div className={styles.rightStack}>
              {/* Output Card */}
              <motion.div
                className={styles.outputCard}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <div className={styles.terminalHeader}>
                  <span className={styles.terminalDot} />
                  <Terminal size={12} style={{ display: 'inline', marginRight: 4 }} />
                  <span>Verified Program Output</span>
                </div>
                <pre className={styles.terminalBody}>
                  {program.output}
                </pre>
              </motion.div>

              {/* Explanation Card */}
              <motion.div
                className={styles.explanationCard}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h2 className={styles.expSectionTitle}>
                  <Code2 size={15} style={{ display: 'inline', marginRight: 6 }} />
                  Logic & Mechanics
                </h2>
                <p className={styles.expParagraph}>
                  {program.explanation.concept}
                </p>

                <h3 className={styles.expSectionTitle} style={{ fontSize: '0.86rem' }}>
                  Execution Flow:
                </h3>
                <ol className={styles.algoList}>
                  {program.explanation.algorithm.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>

                <h3 className={styles.expSectionTitle} style={{ fontSize: '0.86rem' }}>
                  Key C Constructs:
                </h3>
                <div className={styles.tagsRow}>
                  {program.explanation.keyConstructs.map((construct, idx) => (
                    <span key={idx} className={styles.tagPill}>
                      {construct}
                    </span>
                  ))}
                </div>

                {program.explanation.complexity && (
                  <div className={styles.complexityRow}>
                    Complexity: {program.explanation.complexity}
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Bottom Adjacent Navigation */}
          <div className={styles.bottomNav}>
            {adjacent.prev ? (
              <button
                type="button"
                className={styles.navPrevNextBtn}
                onClick={() =>
                  navigate(`/programs/${adjacent.prev?.categorySlug}/${adjacent.prev?.slug}`)
                }
              >
                <ArrowLeft size={16} />
                <div>
                  <span className={styles.navBtnLabel}>Previous Program</span>
                  <span className={styles.navBtnTitle}>{adjacent.prev.title}</span>
                </div>
              </button>
            ) : (
              <div />
            )}

            {adjacent.next && (
              <button
                type="button"
                className={styles.navPrevNextBtn}
                style={{ textAlign: 'right' }}
                onClick={() =>
                  navigate(`/programs/${adjacent.next?.categorySlug}/${adjacent.next?.slug}`)
                }
              >
                <div>
                  <span className={styles.navBtnLabel}>Next Program</span>
                  <span className={styles.navBtnTitle}>{adjacent.next.title}</span>
                </div>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
