import { LessonLayout } from '../Lesson/LessonLayout';
import { PracticeHero } from './PracticeHero';
import { PracticeWorkspace } from './PracticeWorkspace';
import styles from './PracticeProblemsPage.module.css';

export function PracticeProblemsPage() {
  const handleScrollToWorkspace = () => {
    const el = document.getElementById('practice-workspace');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <LessonLayout
      lessonNumber="12"
      categoryTitle="BASICS"
      currentLessonTitle="Practice Problems"
      isWideLayout={true}
    >
      <div className={styles.pageInner}>
        <PracticeHero onStartPracticing={handleScrollToWorkspace} />
        <PracticeWorkspace />
      </div>
    </LessonLayout>
  );
}

export default PracticeProblemsPage;
