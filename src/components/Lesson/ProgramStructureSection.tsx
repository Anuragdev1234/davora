import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ChevronRight } from 'lucide-react';
import { fadeUp, viewportConfig } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './ProgramStructureSection.module.css';

interface StructureBlock {
  id: string;
  num: string;
  title: string;
  code: string;
  description: string;
  relationship: string;
}

const BLOCKS: StructureBlock[] = [
  {
    id: 'header',
    num: '01',
    title: 'Header Inclusion',
    code: '#include <stdio.h>',
    description:
      'Provides standard declarations and function prototypes required by the program before compilation begins.',
    relationship:
      'Connects the source code to external shared library declarations, allowing the compiler to validate function signatures such as printf().',
  },
  {
    id: 'entry',
    num: '02',
    title: 'Entry-Point Function',
    code: 'int main(void)',
    description:
      'The standardized interface where host operating systems transfer CPU control into your program.',
    relationship:
      'Every hosted C application must define exactly one main() function as the root of its call hierarchy.',
  },
  {
    id: 'body',
    num: '03',
    title: 'Function Body',
    code: '{\n    /* statements */\n}',
    description:
      'Curly braces establish the lexical block scope and stack activation frame for local variables and statements.',
    relationship:
      'Groups declarations and executable statements together, defining where variables are allocated and deallocated.',
  },
  {
    id: 'statement',
    num: '04',
    title: 'Executable Statement',
    code: 'printf("Hello World\\n");',
    description:
      'The operational statement that performs runtime work—transmitting formatted byte sequences to the standard output buffer.',
    relationship:
      'Terminated with a required semicolon (;), indicating an atomic expression statement to the parser.',
  },
  {
    id: 'return',
    num: '05',
    title: 'Return Statement',
    code: 'return 0;',
    description:
      'Passes an integer termination status code back to the parent environment or shell (0 denotes clean success).',
    relationship:
      'Concludes execution of main(), causing the runtime startup code to trigger exit syscall handlers and flush streams.',
  },
];

export function ProgramStructureSection() {
  const reduced = useReducedMotion();
  const [selectedBlockId, setSelectedBlockId] = useState<string>('header');

  const activeBlock = BLOCKS.find((b) => b.id === selectedBlockId) || BLOCKS[0];

  return (
    <motion.section
      className={styles.section}
      variants={reduced ? undefined : fadeUp}
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={viewportConfig}
      aria-labelledby="program-structure-heading"
    >
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>05 / ARCHITECTURAL BREAKDOWN</span>
        <h2 id="program-structure-heading" className={styles.heading}>
          Understand the building blocks.
        </h2>
        <p className={styles.subheading}>
          Every C program is constructed from cohesive structural layers. Explore how these
          five building blocks coordinate to form a complete executable program.
        </p>
      </div>

      <div
        className={styles.structureContainer}
        role="region"
        aria-label="C Program Building Blocks"
      >
        {/* Left Side: Selectable Blocks List / Diagram */}
        <div className={styles.diagramCard} role="tablist" aria-label="Program Building Blocks">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-secondary)',
              marginBottom: '0.5rem',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            <Layers size={14} aria-hidden="true" />
            <span>Structural Blocks</span>
          </div>

          {BLOCKS.map((block) => {
            const isSelected = block.id === selectedBlockId;
            return (
              <button
                key={block.id}
                type="button"
                className={`${styles.blockItem} ${isSelected ? styles.blockItemActive : ''}`}
                onClick={() => setSelectedBlockId(block.id)}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`structure-panel-${block.id}`}
                id={`structure-tab-${block.id}`}
              >
                <div className={styles.blockLeft}>
                  <span className={styles.blockNum}>{block.num}</span>
                  <div>
                    <div className={styles.blockTitle}>{block.title}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <code className={styles.blockCodeSnippet}>
                    {block.code.split('\n')[0]}
                  </code>
                  <ChevronRight
                    size={15}
                    color={isSelected ? 'var(--color-text)' : 'var(--color-text-muted)'}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Structural Relationship Explanation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBlock.id}
            className={styles.explanationCard}
            id={`structure-panel-${activeBlock.id}`}
            role="tabpanel"
            aria-labelledby={`structure-tab-${activeBlock.id}`}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.explanationTag}>
              Block {activeBlock.num} &bull; Conceptual Role
            </span>
            <h3 className={styles.explanationTitle}>{activeBlock.title}</h3>

            <div className={styles.explanationCodeBox}>
              <pre style={{ margin: 0 }}>
                <code>{activeBlock.code}</code>
              </pre>
            </div>

            <p className={styles.explanationBody}>{activeBlock.description}</p>

            <div className={styles.relationshipNote}>
              <strong>System Relationship: </strong>
              {activeBlock.relationship}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export default ProgramStructureSection;
