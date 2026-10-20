import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LessonLayout } from '../Lesson/LessonLayout';
import { HowCWorksHero } from './HowCWorksHero';
import { SixStageJourney } from './SixStageJourney';
import { ArtifactTransformationDiagram } from './ArtifactTransformationDiagram';
import { PracticalTerminalSection } from './PracticalTerminalSection';
import { HowCWorksQuiz } from './HowCWorksQuiz';
import { HowCWorksCompletion } from './HowCWorksCompletion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from '../Lesson/IntroToCLessonPage.module.css';

export function HowCWorksLessonPage() {
  const reduced = useReducedMotion();
  // Shared active stage index across SixStageJourney, ArtifactTransformationDiagram, and PracticalTerminalSection
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <LessonLayout
      currentLessonTitle="How a C Program Works"
      categoryTitle="BASICS"
    >
      <motion.article
        initial={reduced ? undefined : { opacity: 0, y: 15 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Hero Section with 3D Visual Asset */}
        <HowCWorksHero />

        {/* Section 1: The Six Stages Main Navigator */}
        <SixStageJourney
          activeIndex={activeStageIndex}
          onSelectIndex={setActiveStageIndex}
        />
        <hr className={styles.sectionDivider} aria-hidden="true" />

        {/* Section 2: Visual Artifact Transformation Diagram */}
        <ArtifactTransformationDiagram
          activeIndex={activeStageIndex}
          onSelectIndex={setActiveStageIndex}
        />
        <hr className={styles.sectionDivider} aria-hidden="true" />

        {/* Section 3: Practical Terminal Example and Process Trace */}
        <PracticalTerminalSection
          activeIndex={activeStageIndex}
          onSelectIndex={setActiveStageIndex}
        />
        <hr className={styles.sectionDivider} aria-hidden="true" />

        {/* Section 4: Interactive Knowledge Check */}
        <HowCWorksQuiz />

        {/* Section 5: Lesson Completion and Next Navigation */}
        <HowCWorksCompletion />
      </motion.article>
    </LessonLayout>
  );
}

export default HowCWorksLessonPage;
