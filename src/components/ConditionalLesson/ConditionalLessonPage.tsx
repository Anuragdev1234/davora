import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LessonLayout } from '../Lesson/LessonLayout';
import { ConditionalHero } from './ConditionalHero';
import { ConditionalExamplesSection } from './ConditionalExamplesSection';
import { ConditionalDifferencesSection } from './ConditionalDifferencesSection';
import { ConditionalPracticeSection } from './ConditionalPracticeSection';
import { ConditionalCompletionNav } from './ConditionalCompletionNav';
import { useReducedMotion } from '../../hooks/useMotion';

export function ConditionalLessonPage() {
  const reduced = useReducedMotion();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleExploreClick = () => {
    const el = document.getElementById('conditional-examples');
    if (el) {
      const navOffset = 90;
      const pos = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: pos - navOffset, behavior: 'smooth' });
    }
  };

  return (
    <LessonLayout
      currentLessonTitle="Conditional Statements in C"
      categoryTitle="BASICS"
      lessonNumber="08"
      isWideLayout={true}
    >
      <motion.article
        initial={reduced ? undefined : { opacity: 0, y: 15 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%' }}
      >
        {/* 1. Hero matching Reference Board */}
        <ConditionalHero onExploreClick={handleExploreClick} />

        {/* 2. Examples of Conditional Statements in C (6-Column Grid) */}
        <ConditionalExamplesSection />

        {/* 3. Difference Between Conditional Statements Table */}
        <ConditionalDifferencesSection />

        {/* 4. Predict the Output Practice Section */}
        <ConditionalPracticeSection />

        {/* 5. Summary Takeaways & Navigation */}
        <ConditionalCompletionNav />
      </motion.article>
    </LessonLayout>
  );
}
