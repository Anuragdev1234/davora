import { LessonLayout } from '../Lesson/LessonLayout';
import { FunctionsHero } from './FunctionsHero';
import { FunctionBasicsSection } from './FunctionBasicsSection';
import { FunctionCallVisualizerSection } from './FunctionCallVisualizerSection';
import { FunctionDeepCurriculumSection } from './FunctionDeepCurriculumSection';
import { RecursionAndStackSection } from './RecursionAndStackSection';
import { FunctionPracticeAndChallengesSection } from './FunctionPracticeAndChallengesSection';
import { FunctionCompletionNav } from './FunctionCompletionNav';

export function FunctionsLessonPage() {
  const handleStartLearning = () => {
    const el = document.getElementById('function-basics');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LessonLayout
      lessonNumber="10"
      categoryTitle="BASICS"
      currentLessonTitle="Functions in C"
      isWideLayout={true}
    >
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        {/* Phase 1-5: The Cinematic Hero with Campus Photograph, Floating Code Editor, Call Diagram & Benefit Strip */}
        <FunctionsHero onStartLearningClick={handleStartLearning} />

        {/* Phase 6-10: Sections 01 to 05 (What Is a Function, 3-Stage Journey, Syntax, Decl vs Def, Complete Example) */}
        <FunctionBasicsSection />

        {/* Phase 11: Section 06 Signature Interactive Feature (Visual Flow of Function Call) */}
        <FunctionCallVisualizerSection />

        {/* Phase 12: Sections 07 to 12 (Terminology, Library Functions, 4 User Types, Parameters, Call by Value, Return) */}
        <FunctionDeepCurriculumSection />

        {/* Sections 13 to 16 (Recursion Visualizer, Function Call Stack, Memory Management & Static, Scope) */}
        <RecursionAndStackSection />

        {/* Sections 17 to 20 (Advantages & Trade-offs, 8 Best Practices, 6 Quiz Questions, 5 Programming Challenges) */}
        <FunctionPracticeAndChallengesSection />

        {/* Section 21: Takeaways & Next Steps (Recursion in C) */}
        <FunctionCompletionNav />
      </div>
    </LessonLayout>
  );
}

export default FunctionsLessonPage;
