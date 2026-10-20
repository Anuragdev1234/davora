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
          onClick={() => navigate('/programs/patterns/inverted-right-half-pyramid')}
          aria-label="Previous pattern: Inverted Right Half Pyramid"
        >
          <ArrowLeft size={16} />
          <span>Previous: Inverted Right Half</span>
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
          onClick={() => navigate('/programs/patterns/full-pyramid')}
          aria-label="Next pattern: Full Pyramid"
        >
          <span>Next: Full Pyramid</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
