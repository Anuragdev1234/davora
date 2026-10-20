import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCode,
  FileSearch,
  Cpu,
  Layers,
  Package,
  Terminal,
  ArrowRight,
} from 'lucide-react';
import { fadeUp, viewportConfig } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './ArtifactTransformationDiagram.module.css';

interface ArtifactNode {
  stageIndex: number;
  file: string;
  role: string;
  format: string;
  title: string;
  explanation: string;
  icon: typeof FileCode;
}

const ARTIFACT_NODES: ArtifactNode[] = [
  {
    stageIndex: 0,
    file: 'hello.c',
    role: 'Source Instructions',
    format: 'Plain Text (ASCII/UTF-8)',
    title: 'Human-Written Source Code',
    explanation:
      'The initial C source file containing preprocessor directives, data declarations, and procedural instructions written by the developer.',
    icon: FileCode,
  },
  {
    stageIndex: 1,
    file: 'hello.i',
    role: 'Preprocessed Unit',
    format: 'Expanded Text Translation Unit',
    title: 'Preprocessed Intermediate File',
    explanation:
      'Headers have been spliced inline and macros expanded. All comments are stripped. Ready for lexical and syntax parsing.',
    icon: FileSearch,
  },
  {
    stageIndex: 2,
    file: 'hello.s',
    role: 'Compiler Assembly',
    format: 'Target CPU Assembly Mnemonic',
    title: 'Assembly Representation / IR',
    explanation:
      'The compiler translates high-level C logic into target machine assembly instructions (or intermediate representation) after type checks and optimizations.',
    icon: Cpu,
  },
  {
    stageIndex: 3,
    file: 'hello.o',
    role: 'Object Module',
    format: 'Relocatable Machine Code (ELF/Mach-O)',
    title: 'Relocatable Object File',
    explanation:
      'Assembly instructions are encoded into raw binary machine code with unresolved symbol tables and relocation offset records.',
    icon: Layers,
  },
  {
    stageIndex: 4,
    file: 'hello (a.out)',
    role: 'Linked Executable',
    format: 'Self-Contained Binary Executable',
    title: 'Final Executable Image',
    explanation:
      'The linker binds external standard library calls (libc), resolves symbols, and constructs the platform executable image.',
    icon: Package,
  },
  {
    stageIndex: 5,
    file: 'stdout',
    role: 'Program Output',
    format: 'Process Virtual Memory Execution',
    title: 'Running Program Output',
    explanation:
      'The operating system loader executes main(), streams bytes to POSIX standard output, and yields return status code 0.',
    icon: Terminal,
  },
];

interface ArtifactTransformationDiagramProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export function ArtifactTransformationDiagram({
  activeIndex,
  onSelectIndex,
}: ArtifactTransformationDiagramProps) {
  const reduced = useReducedMotion();
  const currentArtifact =
    ARTIFACT_NODES.find((node) => node.stageIndex === activeIndex) || ARTIFACT_NODES[0];

  return (
    <motion.section
      className={styles.section}
      variants={reduced ? undefined : fadeUp}
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={viewportConfig}
      aria-labelledby="artifact-diagram-heading"
    >
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>02 / UNDER THE SURFACE</span>
        <h2 id="artifact-diagram-heading" className={styles.heading}>
          Follow the transformation.
        </h2>
        <p className={styles.subheading}>
          The program changes representation as it moves through the toolchain. Some stages
          produce new files, while others process information used by later stages.
        </p>
      </div>

      <div
        className={styles.diagramCard}
        role="region"
        aria-label="Interactive Artifact Transformation Flow"
      >
        {/* Horizontal Flow Line */}
        <div className={styles.flowContainer} role="tablist" aria-label="Transformation Artifacts">
          {ARTIFACT_NODES.map((node, i) => {
            const isSelected = node.stageIndex === activeIndex;
            const Icon = node.icon;

            return (
              <div key={node.file} style={{ display: 'contents' }}>
                <button
                  type="button"
                  className={`${styles.flowItem} ${isSelected ? styles.flowItemActive : ''}`}
                  onClick={() => onSelectIndex(node.stageIndex)}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`artifact-panel-${node.stageIndex}`}
                  id={`artifact-tab-${node.stageIndex}`}
                >
                  <div className={styles.nodeBadge}>
                    <Icon size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <div className={styles.artifactFile}>{node.file}</div>
                    <div className={styles.artifactRole}>{node.role}</div>
                  </div>
                </button>

                {i < ARTIFACT_NODES.length - 1 && (
                  <ArrowRight
                    size={16}
                    className={`${styles.connectorArrow} ${
                      activeIndex > i ? styles.connectorArrowActive : ''
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Synchronized Inspector Callout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentArtifact.file}
            className={styles.inspectorBox}
            id={`artifact-panel-${currentArtifact.stageIndex}`}
            role="tabpanel"
            aria-labelledby={`artifact-tab-${currentArtifact.stageIndex}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.inspectorTop}>
              <span className={styles.inspectorStageTag}>
                Stage 0{currentArtifact.stageIndex + 1} Artifact &bull; {currentArtifact.file}
              </span>
              <span className={styles.inspectorFormat}>{currentArtifact.format}</span>
            </div>

            <div className={styles.inspectorTitle}>{currentArtifact.title}</div>
            <p className={styles.inspectorExplanation}>{currentArtifact.explanation}</p>

            <div className={styles.caveatNote}>
              <strong>Pipeline architecture note: </strong>
              Toolchains may combine stages internally or maintain intermediate representation in
              memory without writing discrete files to disk on every step.
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export default ArtifactTransformationDiagram;
