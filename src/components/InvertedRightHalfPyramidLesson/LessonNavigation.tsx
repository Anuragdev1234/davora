import { ArrowLeft, ArrowRight, Grid } from 'lucide-react';
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
          onClick={() => navigate('/programs/patterns/right-half-pyramid')}
          aria-label="Previous pattern: Right Half Pyramid"
        >
          <ArrowLeft size={16} />
          <span>Previous: Right Half Pyramid</span>
        </button>

        <button
          type="button"
          className={styles.navLinkBtn}
          onClick={() => navigate('/programs')}
          aria-label="Back to Programs Library"
        >
          <Grid size={16} />
          <span>Programs Library</span>
        </button>

        <button
          type="button"
          className={`${styles.navLinkBtn} ${styles.navLinkNext}`}
          onClick={() => navigate('/programs/patterns/left-half-pyramid')}
          aria-label="Next pattern: Left Half Pyramid"
        >
          <span>Next: Left Half Pyramid</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
