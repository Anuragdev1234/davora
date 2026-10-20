import { ArrowLeft, ArrowRight, Layers, Box, Terminal, GitBranch } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import { OPERATORS_NEXT_TOPICS, type NextTopicItem } from '../../data/operatorsLessonData';
import styles from './OperatorsCompletionNav.module.css';

export function OperatorsCompletionNav() {
  const navigate = useNavigate();

  const getTopicIcon = (iconName: NextTopicItem['iconName']) => {
    switch (iconName) {
      case 'terminal':
        return <Terminal size={18} aria-hidden="true" />;
      case 'layers':
        return <Layers size={18} aria-hidden="true" />;
      case 'git-branch':
        return <GitBranch size={18} aria-hidden="true" />;
      case 'box':
        return <Box size={18} aria-hidden="true" />;
      default:
        return <Layers size={18} aria-hidden="true" />;
    }
  };

  return (
    <footer className={styles.sectionWrapper} aria-label="Lesson Completion and Next Steps">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>12</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>NEXT STEPS</span>
          </div>

          <h2 className={styles.mainHeading}>What's next?</h2>

          <p className={styles.subHeading}>
            Now that you have mastered C expressions, precedence, associativity, and bitwise operations,
            advance into input/output formatting and execution flow control.
          </p>
        </div>

        {/* 4 Topic Cards Grid */}
        <div className={styles.topicGrid}>
          {OPERATORS_NEXT_TOPICS.map((topic) => (
            <div
              key={topic.title}
              className={styles.topicCard}
              onClick={() => navigate(topic.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(topic.path);
                }
              }}
              aria-label={`Explore ${topic.title}`}
            >
              <div className={styles.topicCardTop}>
                <div className={styles.topicIconBox}>{getTopicIcon(topic.iconName)}</div>
                <ArrowRight size={14} className={styles.topicArrow} aria-hidden="true" />
              </div>

              <span className={styles.topicCat}>{topic.category}</span>
              <h3 className={styles.topicTitle}>{topic.title}</h3>
              <p className={styles.topicDesc}>{topic.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Navigation Row */}
        <div className={styles.bottomBar}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigate('/theory')}
            aria-label="Return to full Curriculum page"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to Theory Curriculum</span>
          </button>

          <button
            type="button"
            className={styles.nextLessonPill}
            onClick={() => navigate('/theory')}
            aria-label="Continue to Lesson 07: Input and Output"
          >
            <span>Next: Input &amp; Output</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
