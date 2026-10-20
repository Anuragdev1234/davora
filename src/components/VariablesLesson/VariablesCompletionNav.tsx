import { ArrowLeft, ArrowRight, Layers, Box, Terminal, GitBranch } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import { VARIABLES_NEXT_TOPICS, type NextTopicItem } from '../../data/variablesLessonData';
import styles from './VariablesCompletionNav.module.css';

export function VariablesCompletionNav() {
  const navigate = useNavigate();

  const getTopicIcon = (iconName: NextTopicItem['iconName']) => {
    switch (iconName) {
      case 'layers':
        return <Layers size={18} aria-hidden="true" />;
      case 'box':
        return <Box size={18} aria-hidden="true" />;
      case 'terminal':
        return <Terminal size={18} aria-hidden="true" />;
      case 'git-branch':
        return <GitBranch size={18} aria-hidden="true" />;
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
            <span className={styles.eyebrowIndex}>08</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>NEXT STEPS</span>
          </div>

          <h2 className={styles.mainHeading}>What's next?</h2>

          <p className={styles.subHeading}>
            Now that you understand variable allocation, identifiers, data representation, scopes,
            and type conversions, delve into constants, literals, and composite operators.
          </p>
        </div>

        {/* 4 Topic Cards Grid */}
        <div className={styles.topicGrid}>
          {VARIABLES_NEXT_TOPICS.map((topic) => (
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
            aria-label="Continue to Lesson 06: Constants and Literals"
          >
            <span>Next: Constants & Literals</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
