import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import styles from './LessonNavigation.module.css';

export function LessonNavigation() {
  const navigate = useNavigate();

  return (
    <section className={styles.navSection} aria-label="Lesson Navigation">
      <div className={styles.navCardsGrid}>
        {/* Previous Lesson (Disabled since Lesson 01 is first) */}
        <div
          className={`${styles.navCard} ${styles.navCardDisabled}`}
          aria-disabled="true"
        >
          <div className={styles.navCardLabel}>
            <ArrowLeft size={13} aria-hidden="true" />
            <span>Previous Lesson</span>
          </div>
          <div className={styles.navCardTitle}>Course Orientation</div>
          <p className={styles.navCardDesc}>
            You are at the start of the DEVORA curriculum.
          </p>
        </div>

        {/* Next Lesson: How a C Program Works */}
        <div
          className={`${styles.navCard} ${styles.navCardNext}`}
          onClick={() => navigate('/theory/how-a-c-program-works')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/theory/how-a-c-program-works');
            }
          }}
          aria-label="Next Lesson: How a C Program Works"
        >
          <div className={styles.navCardLabel} style={{ color: 'var(--color-accent-dark)' }}>
            <span>Next Lesson &bull; Lesson 02</span>
            <ArrowRight size={13} aria-hidden="true" />
          </div>
          <div className={styles.navCardTitle}>How a C Program Works</div>
          <p className={styles.navCardDesc}>
            Dive deeper into machine cycles, memory layout, and the compiler model.
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
    </section>
  );
}

export default LessonNavigation;
