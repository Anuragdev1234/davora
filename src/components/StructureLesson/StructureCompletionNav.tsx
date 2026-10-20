import { ArrowLeft, ArrowRight, BookOpen, Terminal, Layers, GitBranch, Box } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import { NEXT_TOPICS, type NextTopic } from '../../data/structureLessonData';
import styles from './StructureCompletionNav.module.css';

export function StructureCompletionNav() {
  const navigate = useNavigate();

  const getTopicIcon = (iconName: NextTopic['iconName']) => {
    switch (iconName) {
      case 'terminal':
        return <Terminal size={18} className={styles.topicIcon} aria-hidden="true" />;
      case 'layers':
        return <Layers size={18} className={styles.topicIcon} aria-hidden="true" />;
      case 'git-branch':
        return <GitBranch size={18} className={styles.topicIcon} aria-hidden="true" />;
      case 'box':
        return <Box size={18} className={styles.topicIcon} aria-hidden="true" />;
      default:
        return <Terminal size={18} className={styles.topicIcon} aria-hidden="true" />;
    }
  };

  return (
    <footer className={styles.sectionWrapper} aria-label="Lesson Completion and Next Steps">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>07</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>NEXT STEPS</span>
          </div>

          <h2 className={styles.mainHeading}>What's next?</h2>

          <p className={styles.subHeading}>
            Now that you understand how a C program is structured and executed, explore foundational
            concepts in I/O, data representation, and modular architecture.
          </p>
        </div>

        {/* 4 Topic Cards Grid */}
        <div className={styles.topicGrid}>
          {NEXT_TOPICS.map((topic) => (
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

        {/* Lesson Bottom Navigation Bar */}
        <div className={styles.bottomNav}>
          {/* Previous Lesson Card */}
          <div
            className={styles.navCard}
            onClick={() => navigate('/theory/how-a-c-program-works')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/theory/how-a-c-program-works');
              }
            }}
            aria-label="Previous Lesson: How a C Program Works"
          >
            <div className={styles.navCardLabel}>
              <ArrowLeft size={13} aria-hidden="true" />
              <span>Previous Lesson &bull; Lesson 02</span>
            </div>
            <div className={styles.navCardTitle}>How a C Program Works</div>
            <p className={styles.navCardDesc}>
              Review the six compilation stages: Preprocessor, Compiler, Assembler, Linker, Loader, and Execution.
            </p>
          </div>

          {/* Curriculum Return Center Link */}
          <div className={styles.navCenter}>
            <button
              type="button"
              className={styles.returnTheoryBtn}
              onClick={() => navigate('/theory')}
              aria-label="Back to Theory Curriculum"
            >
              <BookOpen size={16} aria-hidden="true" />
              <span>Back to Theory Curriculum</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default StructureCompletionNav;
