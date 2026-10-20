import React from 'react';
import { ArrowLeft, ArrowRight, Grid } from 'lucide-react';
import { useNavigate } from '../../router/Router';
import styles from './LessonNavigation.module.css';

export const LessonNavigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.navSection}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.navLinkBtn}
          onClick={() => navigate('/programs/patterns/left-half-pyramid')}
          aria-label="Previous pattern: Left Half Pyramid"
        >
          <ArrowLeft size={16} />
          <span>Previous: Left Half Pyramid</span>
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
          onClick={() => navigate('/programs/patterns/inverted-full-pyramid')}
          aria-label="Next pattern: Inverted Full Pyramid"
        >
          <span>Next: Inverted Full Pyramid</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
