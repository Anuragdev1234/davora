import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import styles from './HowCWorksCompletion.module.css';

export function HowCWorksCompletion() {
  const navigate = useNavigate();

  return (
    <footer className={styles.completionSection} aria-label="Lesson Completion and Navigation">
      <div className={styles.closingHeader}>
        <h2 className={styles.closingHeading}>
          Now you know what happens beneath the code.
        </h2>
        <p className={styles.closingText}>
          You have followed a C program from its source representation through a conventional build
          pipeline and into execution. Next, learn how a C program is organized into functions,
          declarations, and statements.
        </p>
      </div>

      <div className={styles.navGrid}>
        {/* Previous Lesson: Introduction to C */}
        <div
          className={styles.navCard}
          onClick={() => navigate('/theory/introduction-to-c')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/theory/introduction-to-c');
            }
          }}
          aria-label="Previous Lesson: Introduction to C"
        >
          <div className={styles.navCardLabel}>
            <ArrowLeft size={13} aria-hidden="true" />
            <span>Previous Lesson &bull; Lesson 01</span>
          </div>
          <div className={styles.navCardTitle}>Introduction to C</div>
          <p className={styles.navCardDesc}>
            Review the historical origin, language philosophy, and initial program structure.
          </p>
        </div>

        {/* Next Lesson: Structure of a C Program */}
        <div
          className={`${styles.navCard} ${styles.navCardNext}`}
          onClick={() => navigate('/theory/structure-of-a-c-program')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/theory/structure-of-a-c-program');
            }
          }}
          aria-label="Next Lesson: Structure of a C Program"
        >
          <div className={styles.navCardLabel} style={{ color: 'var(--color-accent-dark)' }}>
            <span>Next Lesson &bull; Lesson 03</span>
            <ArrowRight size={13} aria-hidden="true" />
          </div>
          <div className={styles.navCardTitle}>Structure of a C Program</div>
          <p className={styles.navCardDesc}>
            Explore functions, variables, statements, and lexical scope in detail.
          </p>
        </div>
      </div>

      {/* Return to Theory Center Link */}
      <div className={styles.centerReturn}>
        <button
          type="button"
          className={styles.returnTheoryBtn}
          onClick={() => navigate('/theory')}
        >
          <BookOpen size={16} aria-hidden="true" />
          <span>Back to Theory Curriculum</span>
        </button>
      </div>
    </footer>
  );
}

export default HowCWorksCompletion;
