import { LessonLayout } from '../Lesson/LessonLayout';
import { LoopsHero } from './LoopsHero';
import { LoopFlowAndTypesSection } from './LoopFlowAndTypesSection';
import { LoopTimeMachine } from './LoopTimeMachine';
import { IndividualLoopsSection } from './IndividualLoopsSection';
import { NestedAndFlowControlSection } from './NestedAndFlowControlSection';
import { LoopDifferencesAndMistakesSection } from './LoopDifferencesAndMistakesSection';
import { LoopPracticeAndChallengesSection } from './LoopPracticeAndChallengesSection';
import { LoopCompletionNav } from './LoopCompletionNav';

export function LoopsLessonPage() {
  const handleExploreHero = () => {
    const el = document.getElementById('loop-flow-overview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LessonLayout
      lessonNumber="09"
      categoryTitle="BASICS"
      currentLessonTitle="Loops in C"
      isWideLayout={true}
    >
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        {/* Phase 2 & 3: Hero Scene with Campus Photograph, Floating Code Editor, Output & Feature Strip */}
        <LoopsHero onExploreClick={handleExploreHero} />

        {/* Phase 4 & 5: Loop Flowchart & 3 Loop Types Overview */}
        <LoopFlowAndTypesSection />

        {/* SIGNATURE FEATURE: The Loop Time Machine */}
        <LoopTimeMachine />

        {/* Phase 6, 7, 8, 9: Individual Interactive Loop Lessons (for, while, do-while) */}
        <IndividualLoopsSection />

        {/* Phase 10, 11, 12: Nested Loops, Infinite Loops Safe Simulation, break & continue */}
        <NestedAndFlowControlSection />

        {/* Phase 13: Differences Table & Common Mistakes */}
        <LoopDifferencesAndMistakesSection />

        {/* Phase 14: Interactive Practice Quizzes & Programming Challenges */}
        <LoopPracticeAndChallengesSection />

        {/* Phase 15: Summary Takeaways & Navigation to Next Lesson (Functions in C) */}
        <LoopCompletionNav />
      </div>
    </LessonLayout>
  );
}

export default LoopsLessonPage;
