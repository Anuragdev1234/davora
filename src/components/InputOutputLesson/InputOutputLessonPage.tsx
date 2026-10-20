import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LessonLayout } from '../Lesson/LessonLayout';
import { InputOutputHero } from './InputOutputHero';
import { CommonIoFunctionsSection } from './CommonIoFunctionsSection';
import { FormatSpecifiersAndFlowSection } from './FormatSpecifiersAndFlowSection';
import { IoInDepthManuscript } from './IoInDepthManuscript';
import { IoQuizSection } from './IoQuizSection';
import { IoCompletionNav } from './IoCompletionNav';
import { useReducedMotion } from '../../hooks/useMotion';

export function InputOutputLessonPage() {
  const reduced = useReducedMotion();
  const [selectedStage, setSelectedStage] = useState<'prompt' | 'input' | 'processing' | 'output'>('input');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleStageSelect = (stage: 'prompt' | 'input' | 'processing' | 'output') => {
    setSelectedStage(stage);
  };

  const handleFunctionSelect = (funcId: string) => {
    if (funcId === 'printf') {
      setSelectedStage('output');
    } else if (funcId === 'scanf') {
      setSelectedStage('input');
    }
  };

  return (
    <LessonLayout
      currentLessonTitle="Input and Output in C"
      categoryTitle="BASICS"
      lessonNumber="07"
      isWideLayout={true}
    >
      <motion.article
        initial={reduced ? undefined : { opacity: 0, y: 15 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%' }}
      >
        {/* 1. Cinematic Hero matching Reference Board */}
        <InputOutputHero
          selectedStage={selectedStage}
          onStageSelect={handleStageSelect}
        />

        {/* 2. Common I/O Functions Section (Cards 01–05) */}
        <CommonIoFunctionsSection
          onFunctionSelect={handleFunctionSelect}
        />

        {/* 3. Common Format Specifiers & The Complete Flow (2-Column Grid) */}
        <FormatSpecifiersAndFlowSection
          activeStage={selectedStage}
          onStageSelect={handleStageSelect}
        />

        {/* 4. Complete In-Depth Educational Manuscript */}
        <IoInDepthManuscript />

        {/* 5. Quick Revision Quiz */}
        <IoQuizSection />

        {/* 6. Summary Takeaways & Navigation */}
        <IoCompletionNav />
      </motion.article>
    </LessonLayout>
  );
}
