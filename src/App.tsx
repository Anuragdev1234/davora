import { useState } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate } from './router/Router';
import { Navigation } from './components/Navigation/Navigation';
import { Hero } from './components/Hero/Hero';
import { WhyC } from './components/WhyC/WhyC';
import { TheoryDiagram } from './components/TheoryDiagram/TheoryDiagram';
import { Transformation } from './components/Transformation/Transformation';
import { History } from './components/History/History';
import { TwoWorlds } from './components/TwoWorlds/TwoWorlds';
import { Experiment } from './components/Experiment/Experiment';
import { Closing } from './components/Closing/Closing';
import SpotlightLoadingScreen from './components/Intro/SpotlightLoadingScreen';
import Curved3DCarousel from './components/Intro/Curved3DCarousel';
import { TheoryPage } from './components/Theory/TheoryPage';
import { IntroToCLessonPage } from './components/Lesson/IntroToCLessonPage';
import { HowCWorksLessonPage } from './components/HowCWorksLesson/HowCWorksLessonPage';
import { StructureLessonPage } from './components/StructureLesson/StructureLessonPage';
import { TokensLessonPage } from './components/TokensLesson/TokensLessonPage';
import { VariablesLessonPage } from './components/VariablesLesson/VariablesLessonPage';
import { OperatorsLessonPage } from './components/OperatorsLesson/OperatorsLessonPage';
import { InputOutputLessonPage } from './components/InputOutputLesson/InputOutputLessonPage';
import { ConditionalLessonPage } from './components/ConditionalLesson/ConditionalLessonPage';
import { LoopsLessonPage } from './components/LoopsLesson/LoopsLessonPage';
import { FunctionsLessonPage } from './components/FunctionsLesson/FunctionsLessonPage';
import { RecursionLessonPage } from './components/RecursionLesson/RecursionLessonPage';
import { PracticeProblemsPage } from './components/PracticeProblems/PracticeProblemsPage';
import { ProgramsLibraryPage } from './components/Programs/ProgramsLibraryPage';
import { ProgramDetailPage } from './components/Programs/ProgramDetailPage';
import { RightHalfPyramidLessonPage } from './components/RightHalfPyramidLesson/RightHalfPyramidLessonPage';
import { InvertedRightHalfPyramidLessonPage } from './components/InvertedRightHalfPyramidLesson/InvertedRightHalfPyramidLessonPage';
import { LeftHalfPyramidLessonPage } from './components/LeftHalfPyramidLesson/LeftHalfPyramidLessonPage';
import { FullPyramidLessonPage } from './components/FullPyramidLesson/FullPyramidLessonPage';

function HomePage() {
  const [stage, setStage] = useState<'intro' | 'carousel' | 'landing'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlStage = params.get('stage');
      if (urlStage === 'landing' || urlStage === 'carousel' || urlStage === 'intro') {
        return urlStage;
      }
    }
    return 'intro';
  });

  if (stage === 'intro') {
    return (
      <SpotlightLoadingScreen
        fps={30}
        loadingDurationMs={3800}
        maskShape="blob"
        onEnterDevora={() => setStage('carousel')}
      />
    );
  }

  if (stage === 'carousel') {
    return (
      <Curved3DCarousel
        onEnterCLanguage={() => setStage('landing')}
        onBackToIntro={() => setStage('intro')}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Navigation onReplayIntro={() => setStage('intro')} />
      <main>
        <Hero />
        <WhyC />
        <TheoryDiagram />
        <Transformation />
        <History />
        <TwoWorlds />
        <Experiment />
        <Closing />
      </main>
    </motion.div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/intro"
          element={
            <SpotlightLoadingScreen
              fps={30}
              loadingDurationMs={3800}
              maskShape="blob"
              onEnterDevora={() => {
                window.location.href = '/carousel';
              }}
            />
          }
        />
        <Route
          path="/carousel"
          element={
            <Curved3DCarousel
              onEnterCLanguage={() => {
                window.location.href = '/';
              }}
              onBackToIntro={() => {
                window.location.href = '/intro';
              }}
            />
          }
        />
        <Route path="/theory" element={<TheoryPage />} />
        <Route path="/theory/introduction-to-c" element={<IntroToCLessonPage />} />
        <Route path="/theory/basics/introduction-to-c" element={<IntroToCLessonPage />} />
        <Route path="/theory/how-a-c-program-works" element={<HowCWorksLessonPage />} />
        <Route path="/theory/basics/how-a-c-program-works" element={<HowCWorksLessonPage />} />
        <Route path="/theory/structure-of-a-c-program" element={<StructureLessonPage />} />
        <Route path="/theory/basics/structure-of-a-c-program" element={<StructureLessonPage />} />
        <Route path="/theory/tokens-keywords-identifiers" element={<TokensLessonPage />} />
        <Route path="/theory/basics/tokens-keywords-identifiers" element={<TokensLessonPage />} />
        <Route path="/theory/tokens-keywords-and-identifiers" element={<TokensLessonPage />} />
        <Route path="/theory/basics/tokens-keywords-and-identifiers" element={<TokensLessonPage />} />
        <Route path="/theory/tokens-keywords-and-identifiers-in-c" element={<TokensLessonPage />} />
        <Route path="/theory/basics/tokens-keywords-and-identifiers-in-c" element={<TokensLessonPage />} />
        <Route path="/theory/variables-and-data-types" element={<VariablesLessonPage />} />
        <Route path="/theory/basics/variables-and-data-types" element={<VariablesLessonPage />} />
        <Route path="/theory/variables-and-data-types-in-c" element={<VariablesLessonPage />} />
        <Route path="/theory/basics/variables-and-data-types-in-c" element={<VariablesLessonPage />} />
        <Route path="/theory/variables-datatypes" element={<VariablesLessonPage />} />
        <Route path="/theory/basics/variables-datatypes" element={<VariablesLessonPage />} />
        <Route path="/theory/operators-in-c" element={<OperatorsLessonPage />} />
        <Route path="/theory/basics/operators-in-c" element={<OperatorsLessonPage />} />
        <Route path="/theory/operators" element={<OperatorsLessonPage />} />
        <Route path="/theory/basics/operators" element={<OperatorsLessonPage />} />
        <Route path="/theory/operators-and-expressions" element={<OperatorsLessonPage />} />
        <Route path="/theory/basics/operators-and-expressions" element={<OperatorsLessonPage />} />
        <Route path="/theory/input-and-output" element={<InputOutputLessonPage />} />
        <Route path="/theory/basics/input-and-output" element={<InputOutputLessonPage />} />
        <Route path="/theory/input-and-output-in-c" element={<InputOutputLessonPage />} />
        <Route path="/theory/basics/input-and-output-in-c" element={<InputOutputLessonPage />} />
        <Route path="/theory/input-output" element={<InputOutputLessonPage />} />
        <Route path="/theory/basics/input-output" element={<InputOutputLessonPage />} />
        <Route path="/theory/io-in-c" element={<InputOutputLessonPage />} />
        <Route path="/theory/basics/io-in-c" element={<InputOutputLessonPage />} />
        <Route path="/theory/conditional-statements" element={<ConditionalLessonPage />} />
        <Route path="/theory/basics/conditional-statements" element={<ConditionalLessonPage />} />
        <Route path="/theory/conditional-statements-in-c" element={<ConditionalLessonPage />} />
        <Route path="/theory/basics/conditional-statements-in-c" element={<ConditionalLessonPage />} />
        <Route path="/theory/conditionals" element={<ConditionalLessonPage />} />
        <Route path="/theory/basics/conditionals" element={<ConditionalLessonPage />} />
        <Route path="/theory/loops" element={<LoopsLessonPage />} />
        <Route path="/theory/basics/loops" element={<LoopsLessonPage />} />
        <Route path="/theory/loops-in-c" element={<LoopsLessonPage />} />
        <Route path="/theory/basics/loops-in-c" element={<LoopsLessonPage />} />
        <Route path="/theory/functions" element={<FunctionsLessonPage />} />
        <Route path="/theory/basics/functions" element={<FunctionsLessonPage />} />
        <Route path="/theory/functions-in-c" element={<FunctionsLessonPage />} />
        <Route path="/theory/basics/functions-in-c" element={<FunctionsLessonPage />} />
        <Route path="/theory/recursion" element={<RecursionLessonPage />} />
        <Route path="/theory/basics/recursion" element={<RecursionLessonPage />} />
        <Route path="/theory/recursion-in-c" element={<RecursionLessonPage />} />
        <Route path="/theory/basics/recursion-in-c" element={<RecursionLessonPage />} />
        <Route path="/curriculum/basics/practice-problems" element={<PracticeProblemsPage />} />
        <Route path="/theory/basics/practice-problems" element={<PracticeProblemsPage />} />
        <Route path="/curriculum/practice-problems" element={<PracticeProblemsPage />} />
        <Route path="/theory/practice-problems" element={<PracticeProblemsPage />} />
        <Route path="/programs" element={<ProgramsLibraryPage />} />
        <Route path="/programs/patterns/right-half-pyramid" element={<RightHalfPyramidLessonPage />} />
        <Route path="/programs/patterns/right-half-pyramid-star" element={<RightHalfPyramidLessonPage />} />
        <Route path="/programs/patterns/inverted-right-half-pyramid" element={<InvertedRightHalfPyramidLessonPage />} />
        <Route path="/programs/patterns/inverted-right-half-pyramid-star" element={<InvertedRightHalfPyramidLessonPage />} />
        <Route path="/programs/patterns/left-half-pyramid" element={<LeftHalfPyramidLessonPage />} />
        <Route path="/programs/patterns/left-half-pyramid-star" element={<LeftHalfPyramidLessonPage />} />
        <Route path="/programs/patterns/full-pyramid" element={<FullPyramidLessonPage />} />
        <Route path="/programs/patterns/full-pyramid-star" element={<FullPyramidLessonPage />} />
        <Route path="/programs/*" element={<ProgramDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
