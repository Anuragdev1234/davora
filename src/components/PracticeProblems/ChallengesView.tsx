import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Code2, Copy, Check, ChevronDown, ChevronUp, ArrowRight, Play } from 'lucide-react';
import type { ChallengeProblem } from '../../data/practiceProblemsData';
import { useNavigate } from '../../router/Router';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './ChallengesView.module.css';

interface ChallengesViewProps {
  challenges: ChallengeProblem[];
}

export function ChallengesView({ challenges }: ChallengesViewProps) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [revealedHints, setRevealedHints] = useState<Record<string, number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (challenges.length === 0) {
    return null;
  }

  const toggleHint = (challengeId: string, maxHints: number) => {
    setRevealedHints((prev) => {
      const current = prev[challengeId] || 0;
      if (current >= maxHints) {
        return { ...prev, [challengeId]: 0 };
      }
      return { ...prev, [challengeId]: current + 1 };
    });
  };

  const toggleSolution = (challengeId: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [challengeId]: !prev[challengeId],
    }));
  };

  const handleCopyCode = async (challengeId: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(challengeId);
      setTimeout(() => {
        setCopiedId((curr) => (curr === challengeId ? null : curr));
      }, 2000);
    } catch {
      // Fallback
      setCopiedId(challengeId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className={styles.challengesContainer}>
      {challenges.map((challenge, idx) => {
        const hintCount = revealedHints[challenge.id] || 0;
        const isSolutionOpen = !!revealedSolutions[challenge.id];
        const isCopied = copiedId === challenge.id;

        const diffClass =
          challenge.difficulty === 'Beginner'
            ? styles.diffBeginner
            : challenge.difficulty === 'Intermediate'
            ? styles.diffIntermediate
            : styles.diffAdvanced;

        return (
          <motion.article
            key={challenge.id}
            className={styles.challengeCard}
            initial={reduced ? undefined : { opacity: 0, y: 15 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.06 }}
          >
            {/* Header Row */}
            <div className={styles.headerRow}>
              <div className={styles.badgesGroup}>
                <span className={styles.categoryTag}>{challenge.categoryLabel}</span>
                <span className={`${styles.diffBadge} ${diffClass}`}>{challenge.difficulty}</span>
                <span className={styles.conceptPill}>{challenge.concept}</span>
              </div>
            </div>

            {/* Title & Statement */}
            <h3 className={styles.challengeTitle}>{challenge.title}</h3>
            <p className={styles.problemStatement}>{challenge.problem}</p>

            {/* Sample I/O Grid */}
            <div className={styles.ioGrid}>
              <div className={styles.ioBox}>
                <span className={styles.ioLabel}>Input Specification / Sample</span>
                <pre className={styles.ioValue}>{challenge.sampleInput || challenge.inputFormat}</pre>
              </div>
              <div className={styles.ioBox}>
                <span className={styles.ioLabel}>Expected Standard Output</span>
                <pre className={styles.ioValue}>{challenge.sampleOutput || challenge.outputFormat}</pre>
              </div>
            </div>

            {/* Progressive Hints */}
            <div className={styles.hintsSection}>
              <button
                type="button"
                className={styles.hintToggleBtn}
                onClick={() => toggleHint(challenge.id, challenge.hints.length)}
                aria-expanded={hintCount > 0}
              >
                <Lightbulb size={15} />
                {hintCount === 0
                  ? `Show Step-by-Step Hint (1 of ${challenge.hints.length})`
                  : hintCount < challenge.hints.length
                  ? `Reveal Next Hint (${hintCount + 1} of ${challenge.hints.length})`
                  : `Hide Hints (${challenge.hints.length} shown)`}
              </button>

              <AnimatePresence>
                {hintCount > 0 && (
                  <motion.div
                    className={styles.hintBox}
                    initial={reduced ? undefined : { opacity: 0, height: 0 }}
                    animate={reduced ? undefined : { opacity: 1, height: 'auto' }}
                    exit={reduced ? undefined : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {challenge.hints.slice(0, hintCount).map((hint: string, hIdx: number) => (
                      <div key={hIdx}>
                        <strong>Hint {hIdx + 1}:</strong> {hint}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Solution Disclosure */}
            <div className={styles.solutionWrapper}>
              <button
                type="button"
                className={styles.revealBtn}
                onClick={() => toggleSolution(challenge.id)}
                aria-expanded={isSolutionOpen}
              >
                <Code2 size={16} />
                <span>{isSolutionOpen ? 'Hide Reference Solution' : 'Reveal Canonical C Solution'}</span>
                {isSolutionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <AnimatePresence>
                {isSolutionOpen && (
                  <motion.div
                    className={styles.solutionCard}
                    initial={reduced ? undefined : { opacity: 0, y: -8 }}
                    animate={reduced ? undefined : { opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className={styles.solutionHeader}>
                      <span>C99 / ISO-C Reference Implementation</span>
                      <button
                        type="button"
                        className={styles.copyBtn}
                        onClick={() => handleCopyCode(challenge.id, challenge.solutionCode)}
                        title="Copy code to clipboard"
                      >
                        {isCopied ? (
                          <>
                            <Check size={13} color="#10b981" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className={styles.solutionCode}>
                      <code>{challenge.solutionCode}</code>
                    </pre>

                    {challenge.solutionExplanation && (
                      <div className={styles.explanationBox}>
                        <strong>Architectural Insight:</strong> {challenge.solutionExplanation}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions Footer */}
            <div className={styles.actionsFooter}>
              {challenge.programLibrarySlug ? (
                <button
                  type="button"
                  className={styles.programLink}
                  onClick={() => navigate(challenge.programLibrarySlug!)}
                >
                  <span>Explore in DEVORA Programs Library</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.programLink}
                  onClick={() => navigate('/programs')}
                >
                  <span>Browse Programs Library</span>
                  <ArrowRight size={14} />
                </button>
              )}

              <button
                type="button"
                className={styles.tryInPlaygroundBtn}
                onClick={() => navigate('/#experiment')}
              >
                <Play size={13} />
                <span>Try in Devora Playground</span>
              </button>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
