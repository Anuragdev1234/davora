import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCode,
  FileSearch,
  Cpu,
  Layers,
  Package,
  Play,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { fadeUp, viewportConfig } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './SixStageJourney.module.css';

export interface StageData {
  id: string;
  number: string;
  trackTitle: string;
  eyebrow: string;
  heading: string;
  explanation: string;
  input: string;
  output: string;
  codeExample?: string;
  codeLang?: string;
  technicalNote: string;
  icon: typeof FileCode;
}

export const STAGES_DATA: StageData[] = [
  {
    id: 'source',
    number: '01',
    trackTitle: 'Writing Source',
    eyebrow: '01 / SOURCE',
    heading: 'It begins with an idea.',
    explanation:
      'A programmer writes instructions in the C programming language and saves them in a source file, usually with the .c extension.',
    input: 'Human-readable C source code.',
    output: 'A source file, such as hello.c.',
    codeExample: `#include <stdio.h>

int main(void)
{
    printf("Hello, World!\\n");
    return 0;
}`,
    codeLang: 'hello.c',
    technicalNote:
      'The source file describes what the program should do. It is not yet the native executable produced by a conventional compilation workflow.',
    icon: FileCode,
  },
  {
    id: 'preprocess',
    number: '02',
    trackTitle: 'Preprocessing',
    eyebrow: '02 / PREPROCESSOR',
    heading: 'Prepare the source.',
    explanation:
      'The preprocessor handles directives such as #include and #define. It performs operations such as applicable header inclusion, macro expansion, and conditional compilation before the main compilation process proceeds.',
    input: 'C source containing preprocessing directives.',
    output: 'Preprocessed source that is supplied to the compiler in a conventional implementation.',
    codeExample: `#include <stdio.h>
#define MESSAGE "Hello, World!\\n"

// Directives are evaluated before lexical analysis.
// Standard declarations are made available to the translation unit.`,
    codeLang: 'hello.i',
    technicalNote:
      'Important: #include is not a runtime operation. It does not paste the entire standard library implementation, but rather provides declarations required by the compiler.',
    icon: FileSearch,
  },
  {
    id: 'compile',
    number: '03',
    trackTitle: 'Compilation',
    eyebrow: '03 / COMPILER',
    heading: 'Translate the language.',
    explanation:
      'The compiler analyzes the preprocessed C program and translates it into a lower-level representation, commonly including assembly language or an internal intermediate representation. Compiler diagnostics may identify syntax errors and other problems during this process.',
    input: 'Preprocessed C source.',
    output: 'A lower-level representation, often assembly in a traditional toolchain.',
    codeExample: `// Lexical & Syntactic Analysis -> AST Construction
// Type Checking & Semantic Verification
// Optimization Passes (inlining, constant folding)
// Code Generation -> Target Architecture Assembly`,
    codeLang: 'Compiler IR / Optimizer',
    technicalNote:
      'Actual compiler pipelines differ. Some implementations use intermediate representations, perform multiple optimization passes, or combine operations internally.',
    icon: Cpu,
  },
  {
    id: 'assemble',
    number: '04',
    trackTitle: 'Assembly',
    eyebrow: '04 / ASSEMBLER',
    heading: 'Turn instructions into object code.',
    explanation:
      'In a traditional native toolchain, the assembler converts assembly instructions into machine-code object files. The object file may contain code, data, symbol information, relocation information, and other metadata.',
    input: 'Assembly representation.',
    output: 'Object file, such as hello.o on a typical Unix-like toolchain.',
    codeExample: `.globl  main
main:
    pushq   %rbp
    movq    %rsp, %rbp
    leaq    .LC0(%rip), %rdi
    call    puts
    xorl    %eax, %eax
    popq    %rbp
    ret`,
    codeLang: 'hello.s -> hello.o',
    technicalNote:
      'An object file is not a complete executable. External symbol references (such as calls to puts or printf) remain unresolved until linking.',
    icon: Layers,
  },
  {
    id: 'link',
    number: '05',
    trackTitle: 'Linking',
    eyebrow: '05 / LINKER',
    heading: 'Bring the pieces together.',
    explanation:
      'The linker combines object files and resolves references to other required code or data. It may also incorporate or arrange library components according to the target platform and linking configuration.',
    input: 'Object files and required libraries or other linkable components.',
    output: 'An executable or another final build artifact appropriate to the target environment.',
    codeExample: `// Resolving symbol references:
// hello.o [UND puts]  <==== binds to ====>  libc.so.6 [DEF puts]
// Calculating absolute memory offsets
// Output: ELF 64-bit LSB pie executable x86-64`,
    codeLang: 'Linker Map (ld)',
    technicalNote:
      'Not every library is always copied into the executable. Static and dynamic linking behave differently, and actual linking arrangements depend on the toolchain and platform.',
    icon: Package,
  },
  {
    id: 'execute',
    number: '06',
    trackTitle: 'Execution',
    eyebrow: '06 / EXECUTION',
    heading: 'The program comes to life.',
    explanation:
      'After a suitable executable has been produced, the operating system or relevant execution environment can load and start it. For a typical hosted C program, execution begins at main after the implementation\'s startup procedures.',
    input: 'A successfully produced executable or suitable program artifact.',
    output: 'Program behavior, including the displayed message in this example.',
    codeExample: `printf("Hello, World!\\n");

/* Output stream: */
Hello, World!`,
    codeLang: 'stdout output',
    technicalNote:
      'Execution details depend on the operating system, target platform, and runtime environment. A hosted native executable and a web-based compiler service may handle the process differently.',
    icon: Play,
  },
];

interface SixStageJourneyProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export function SixStageJourney({ activeIndex, onSelectIndex }: SixStageJourneyProps) {
  const reduced = useReducedMotion();
  const currentStage = STAGES_DATA[activeIndex] || STAGES_DATA[0];

  const handlePrev = () => {
    if (activeIndex > 0) onSelectIndex(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < STAGES_DATA.length - 1) onSelectIndex(activeIndex + 1);
  };

  return (
    <motion.section
      className={styles.section}
      variants={reduced ? undefined : fadeUp}
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={viewportConfig}
      aria-labelledby="journey-heading"
    >
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>01 / THE JOURNEY</span>
        <h2 id="journey-heading" className={styles.heading}>
          Six stages. One running program.
        </h2>
        <p className={styles.subheading}>
          A typical native C build process transforms source code into an executable through a
          sequence of stages. Explore each stage to understand what changes, what is produced, and
          how the program moves closer to execution.
        </p>
      </div>

      <div
        className={styles.journeyCard}
        role="region"
        aria-label="Six Stage C Build and Execution Navigator"
      >
        {/* Horizontal 6-Stage Track */}
        <div className={styles.stageTrack} role="tablist" aria-label="Stages of C program execution">
          {STAGES_DATA.map((stage, idx) => {
            const isSelected = idx === activeIndex;
            const Icon = stage.icon;

            return (
              <button
                key={stage.id}
                type="button"
                className={`${styles.stageTrackBtn} ${
                  isSelected ? styles.stageTrackBtnActive : ''
                }`}
                onClick={() => onSelectIndex(idx)}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`stage-view-${stage.id}`}
                id={`stage-tab-${stage.id}`}
              >
                <div className={styles.stageTopRow}>
                  <span className={styles.stageNum}>{stage.number}</span>
                  <div className={styles.stageIcon}>
                    <Icon size={11} aria-hidden="true" />
                  </div>
                </div>

                <div className={styles.stageBtnTitle}>{stage.trackTitle}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Inspector */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            className={styles.detailPanel}
            id={`stage-view-${currentStage.id}`}
            role="tabpanel"
            aria-labelledby={`stage-tab-${currentStage.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.detailHeader}>
              <div>
                <span className={styles.detailEyebrow}>{currentStage.eyebrow}</span>
                <h3 className={styles.detailHeading}>{currentStage.heading}</h3>
              </div>
            </div>

            <p className={styles.detailDescription}>{currentStage.explanation}</p>

            {/* Inputs & Outputs Grid */}
            <div className={styles.ioGrid}>
              <div className={styles.ioCard}>
                <div className={styles.ioLabel}>Input</div>
                <div className={styles.ioValue}>{currentStage.input}</div>
              </div>

              <div className={styles.ioCard}>
                <div className={styles.ioLabel}>Output</div>
                <div className={styles.ioValue}>{currentStage.output}</div>
              </div>
            </div>

            {/* Stage Code / Visual Representation */}
            {currentStage.codeExample && (
              <div className={styles.stageCodeBox}>
                <div className={styles.stageCodeHeader}>
                  <span>Stage Artifact Representation</span>
                  <span style={{ color: 'var(--color-accent)' }}>{currentStage.codeLang}</span>
                </div>
                <pre className={styles.stageCodeSnippet}>
                  <code>{currentStage.codeExample}</code>
                </pre>
              </div>
            )}

            {/* Technical Note */}
            <div className={styles.technicalNote}>
              <strong>Technical Accuracy: </strong>
              {currentStage.technicalNote}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Stage Navigation Controls Footer */}
        <div className={styles.stageFooterNav}>
          <button
            type="button"
            className={styles.navActionBtn}
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous Stage"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            <span>Previous Stage</span>
          </button>

          <span className={styles.stepCounter}>
            Stage {activeIndex + 1} of {STAGES_DATA.length}
          </span>

          <button
            type="button"
            className={styles.navActionBtn}
            onClick={handleNext}
            disabled={activeIndex === STAGES_DATA.length - 1}
            aria-label="Next Stage"
          >
            <span>Next Stage</span>
            <ArrowRight size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}

export default SixStageJourney;
