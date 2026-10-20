import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LessonLayout } from '../Lesson/LessonLayout';
import { StructureHero } from './StructureHero';
import { BuildingBlocksSection } from './BuildingBlocksSection';
import { StructureCodeExplorer } from './StructureCodeExplorer';
import { StructureExecutionSimulator } from './StructureExecutionSimulator';
import { StructureOutputSection } from './StructureOutputSection';
import { StructureQuiz } from './StructureQuiz';
import { StructureCompletionNav } from './StructureCompletionNav';
import { useReducedMotion } from '../../hooks/useMotion';

export function StructureLessonPage() {
  const reduced = useReducedMotion();

  // Active component ID shared across Building Blocks, Code Explorer, and Hero
  const [activeComponentId, setActiveComponentId] = useState<string>('header');
  const [exploredIds, setExploredIds] = useState<Set<string>>(() => new Set(['header']));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSelectComponent = (componentId: string) => {
    setActiveComponentId(componentId);
    setExploredIds((prev) => {
      const next = new Set(prev);
      next.add(componentId);
      return next;
    });
  };

  // Primary Action: "Explore the Program" from the Hero section
  const handleExploreClick = () => {
    // Immediately activate the first component: Header Files (line 1 #include <stdio.h>)
    handleSelectComponent('header');

    // Smoothly scroll down to the Building Blocks section accounting for sticky header
    const targetEl =
      document.getElementById('program-components') ||
      document.getElementById('code-explorer');

    if (targetEl) {
      const navHeight = 110;
      const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleQuizRequested = () => {
    const quizEl = document.getElementById('practice-quiz');
    if (quizEl) {
      const navHeight = 110;
      const elementPosition = quizEl.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <LessonLayout
      currentLessonTitle="Structure of a C Program"
      categoryTitle="BASICS"
      isWideLayout={true}
    >
      <motion.article
        initial={reduced ? undefined : { opacity: 0, y: 15 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Section 01: Hero with Editorial Typography, Desert Ridge Backdrop & Interactive 3D Preview */}
        <StructureHero onExploreClick={handleExploreClick} />

        {/* Section 02: The Building Blocks (6 Core Components) */}
        <BuildingBlocksSection
          activeComponentId={activeComponentId}
          onSelectComponent={handleSelectComponent}
        />

        {/* Section 03: Interactive Code Explorer with Bidirectional Synchronization */}
        <StructureCodeExplorer
          activeComponentId={activeComponentId}
          exploredIds={exploredIds}
          onSelectComponent={handleSelectComponent}
          onQuizRequested={handleQuizRequested}
        />

        {/* Section 04: Execution Timeline Simulator with Live Stack Memory Watch */}
        <StructureExecutionSimulator />

        {/* Section 05: Program Output Terminal Reveal */}
        <StructureOutputSection />

        {/* Section 06: Practice Quiz ("Quick Check.") */}
        <StructureQuiz />

        {/* Section 07: Next Steps & Lesson Completion Navigation */}
        <StructureCompletionNav />
      </motion.article>
    </LessonLayout>
  );
}

export default StructureLessonPage;
