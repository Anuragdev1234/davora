import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import styles from './LessonNavigation.module.css';

export function LessonNavigation() {
  const navigate = useNavigate();

  return (
    <div className={styles.navSection}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.navLinkBtn}
          onClick={() => navigate('/programs')}
          aria-label="Back to Programs Library"
        >
          <ArrowLeft size={16} />
          <span>Back to Practice Library</span>
        </button>

        <button
          type="button"
          className={`${styles.navLinkBtn} ${styles.navLinkNext}`}
          onClick={() => navigate('/programs/patterns/inverted-right-half-pyramid')}
          aria-label="Next pattern: Inverted Right Half Pyramid"
        >
          <span>Next: Inverted Right Half Pyramid</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
