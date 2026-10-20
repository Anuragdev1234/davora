import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCode,
  FileSearch,
  Cpu,
  Package,
  Play,
} from 'lucide-react';
import { fadeUp, viewportConfig } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './ExecutionPipeline.module.css';

interface PipelineStage {
  id: string;
  number: string;
  title: string;
  shortFile: string;
  artifactDesc: string;
  concise: string;
  technicalNote: string;
  icon: typeof FileCode;
}

const STAGES: PipelineStage[] = [
  {
    id: 'source',
    number: '01',
    title: 'Source Code',
    shortFile: 'hello.c',
    artifactDesc: 'Source File',
    concise: 'The programmer writes instructions in a source file such as hello.c.',
    technicalNote:
      'Human-readable ASCII/UTF-8 source containing functions, preprocessor directives, and statements structured according to ISO C language grammar.',
    icon: FileCode,
  },
  {
    id: 'preprocess',
    number: '02',
    title: 'Preprocessing',
    shortFile: 'hello.i',
    artifactDesc: 'Preprocessed Unit',
    concise:
      'Preprocessor directives are processed, including applicable header inclusions and macro expansion.',
    technicalNote:
      'Directives starting with # (such as #include <stdio.h> and #define) are evaluated. Comments are stripped, headers are spliced inline, and macros are expanded before compilation begins.',
    icon: FileSearch,
  },
  {
    id: 'compile',
    number: '03',
    title: 'Compilation',
    shortFile: 'hello.o',
    artifactDesc: 'Object Code / IR',
    concise:
      'The compiler translates the processed C source into lower-level code and typically produces an object file or an intermediate representation along the way.',
    technicalNote:
      'The compiler front-end parses AST tokens, validates types, performs optimization passes, and generates relocatable machine code targeted to the host CPU architecture (x86_64, ARM, RISC-V).',
    icon: Cpu,
  },
  {
    id: 'link',
    number: '04',
    title: 'Linking',
    shortFile: 'hello.out',
    artifactDesc: 'Executable Binary',
    concise:
      'The linker combines object files and required libraries to produce an executable or another appropriate output.',
    technicalNote:
      'The linker resolves external symbol references—such as binding the printf() call to standard C library symbols (libc)—and constructs the finished ELF or Mach-O executable image.',
    icon: Package,
  },
  {
    id: 'execute',
    number: '05',
    title: 'Execution',
    shortFile: 'Process',
    artifactDesc: 'Running OS Process',
    concise:
      'The operating system or execution environment starts the program. Its main function begins executing, and the program produces output.',
    technicalNote:
      'The OS kernel allocates virtual address pages (text, data, heap, and stack), sets up environment pointers, and directs the microprocessor to begin instruction fetch-decode-execute cycles at main.',
    icon: Play,
  },
];

export function ExecutionPipeline() {
  const reduced = useReducedMotion();
  const [selectedStageId, setSelectedStageId] = useState<string>('source');

  const activeStage = STAGES.find((s) => s.id === selectedStageId) || STAGES[0];

  return (
    <motion.section
      className={styles.section}
      variants={reduced ? undefined : fadeUp}
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={viewportConfig}
      aria-labelledby="execution-pipeline-heading"
    >
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>04 / THE COMPILATION JOURNEY</span>
        <h2 id="execution-pipeline-heading" className={styles.heading}>
          From source code to running software.
        </h2>
        <p className={styles.subheading}>
          Writing code is only the beginning. Before a program can run, it normally passes
          through several stages.
        </p>
      </div>

      <div
        className={styles.pipelineContainer}
        role="region"
        aria-label="C Program Execution Pipeline"
      >
        {/* Horizontal Process Grid */}
        <div className={styles.stageList} role="tablist" aria-label="Compilation stages">
          {STAGES.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            const Icon = stage.icon;

            return (
              <button
                key={stage.id}
                type="button"
                className={`${styles.stageCard} ${isSelected ? styles.stageCardActive : ''}`}
                onClick={() => setSelectedStageId(stage.id)}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`stage-panel-${stage.id}`}
                id={`stage-tab-${stage.id}`}
              >
                <div className={styles.stageTopRow}>
                  <span className={styles.stageNumber}>{stage.number}</span>
                  <div className={styles.stageIconWrapper}>
                    <Icon size={12} aria-hidden="true" />
                  </div>
                </div>

                <div className={styles.stageTitle}>{stage.title}</div>
                <code className={styles.stageFileTag}>{stage.shortFile}</code>
              </button>
            );
          })}
        </div>

        {/* Expanded Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            className={styles.expandedDetail}
            id={`stage-panel-${activeStage.id}`}
            role="tabpanel"
            aria-labelledby={`stage-tab-${activeStage.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.detailHeader}>
              <div className={styles.detailStageBadge}>
                <span>Stage {activeStage.number}</span>
                <span>&bull;</span>
                <span>{activeStage.title}</span>
              </div>

              <div className={styles.detailArtifact}>
                Artifact: <code>{activeStage.shortFile}</code> ({activeStage.artifactDesc})
              </div>
            </div>

            <p className={styles.detailText}>{activeStage.concise}</p>

            <div className={styles.technicalNote}>
              <strong>Technical Implementation: </strong>
              {activeStage.technicalNote}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export default ExecutionPipeline;
