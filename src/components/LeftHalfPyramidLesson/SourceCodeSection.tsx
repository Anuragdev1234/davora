import { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';
import styles from './SourceCodeSection.module.css';

interface SourceCodeSectionProps {
  activeLine?: number;
  onSelectLine?: (line: number) => void;
}

interface CodeLineMeta {
  line: number;
  content: string;
  type: string;
  title: string;
  explanation: string;
}

const CODE_LINES: CodeLineMeta[] = [
  {
    line: 1,
    content: '#include <stdio.h>',
    type: 'Preprocessor',
    title: 'Standard I/O Header Directive',
    explanation: 'Includes declarations for standard input and output functions like printf() and scanf().',
  },
  {
    line: 2,
    content: '',
    type: 'Whitespace',
    title: 'Visual Separation',
    explanation: 'Blank line separating preprocessor includes from function definitions.',
  },
  {
    line: 3,
    content: 'int main(void) {',
    type: 'Entry Point',
    title: 'Program Main Function',
    explanation: 'Standard hosted C entry point returning an integer exit status. void signifies no arguments.',
  },
  {
    line: 4,
    content: '    int n;',
    type: 'Declaration',
    title: 'Row Parameter Allocation',
    explanation: 'Allocates space on the stack for integer n, which stores the total row count.',
  },
  {
    line: 5,
    content: '',
    type: 'Whitespace',
    title: 'Visual Separation',
    explanation: 'Blank line separating variable declarations from executable statements.',
  },
  {
    line: 6,
    content: '    printf("Enter the number of rows (1-10): ");',
    type: 'Prompt',
    title: 'User Prompt',
    explanation: 'Displays a helpful message instructing the user to enter a row count between 1 and 10.',
  },
  {
    line: 7,
    content: '',
    type: 'Whitespace',
    title: 'Visual Separation',
    explanation: 'Separates console output from input parsing.',
  },
  {
    line: 8,
    content: '    if (scanf("%d", &n) != 1 || n < 1 || n > 10) {',
    type: 'Validation Guard',
    title: 'Defensive Input Validation',
    explanation: 'Validates that scanf successfully read an integer and that n is in [1, 10]. If not, enters error block.',
  },
  {
    line: 9,
    content: '        printf("Invalid input. Enter a number from 1 to 10.\\n");',
    type: 'Error Diagnostic',
    title: 'Diagnostic Error Message',
    explanation: 'Informs the user that their input was invalid or out of allowed bounds.',
  },
  {
    line: 10,
    content: '        return 1;',
    type: 'Exit Status',
    title: 'Non-Zero Failure Return',
    explanation: 'Terminates early with exit code 1 to indicate failure to the operating system.',
  },
  {
    line: 11,
    content: '    }',
    type: 'Block End',
    title: 'End of Validation Guard',
    explanation: 'Closes the defensive validation if-block.',
  },
  {
    line: 12,
    content: '',
    type: 'Whitespace',
    title: 'Visual Separation',
    explanation: 'Separates input validation from loop processing.',
  },
  {
    line: 13,
    content: '    for (int i = 1; i <= n; i++) {',
    type: 'Outer Loop',
    title: 'Outer Row Controller Loop',
    explanation: 'Controls vertical progress: row i runs from 1 to n. Each iteration generates one complete line.',
  },
  {
    line: 14,
    content: '        for (int j = 1; j <= n - i; j++) {',
    type: 'Inner Loop 1',
    title: 'Leading Spaces Loop',
    explanation: 'First inner loop: prints n - i whitespace units ("  ") to right-align the stars on row i.',
  },
  {
    line: 15,
    content: '            printf("  ");',
    type: 'Space Print',
    title: 'Whitespace Unit Output',
    explanation: 'Outputs two space characters. Notice two spaces are used to match the two-character width of "* ".',
  },
  {
    line: 16,
    content: '        }',
    type: 'Block End',
    title: 'End of Spaces Loop',
    explanation: 'Terminates when j exceeds n - i. All leading indentation for row i is now complete.',
  },
  {
    line: 17,
    content: '',
    type: 'Whitespace',
    title: 'Visual Separation',
    explanation: 'Clear separation between the space printing loop and star printing loop.',
  },
  {
    line: 18,
    content: '        for (int k = 1; k <= i; k++) {',
    type: 'Inner Loop 2',
    title: 'Asterisk Generation Loop',
    explanation: 'Second inner loop: prints exactly i star units ("* ") for the current row i.',
  },
  {
    line: 19,
    content: '            printf("* ");',
    type: 'Star Print',
    title: 'Star Unit Output',
    explanation: 'Outputs an asterisk and a trailing space ("* "), forming the visible pyramid shape.',
  },
  {
    line: 20,
    content: '        }',
    type: 'Block End',
    title: 'End of Stars Loop',
    explanation: 'Terminates when k exceeds i. All stars for row i have been emitted.',
  },
  {
    line: 21,
    content: '',
    type: 'Whitespace',
    title: 'Visual Separation',
    explanation: 'Separates inner printing loops from row termination.',
  },
  {
    line: 22,
    content: '        printf("\\n");',
    type: 'Row Delimiter',
    title: 'Newline Delimiter',
    explanation: 'Emits newline escape character ("\\n") to drop the console cursor down to the next row.',
  },
  {
    line: 23,
    content: '    }',
    type: 'Block End',
    title: 'End of Outer Row Loop',
    explanation: 'Closes the outer row loop. All n rows have been fully rendered.',
  },
  {
    line: 24,
    content: '',
    type: 'Whitespace',
    title: 'Visual Separation',
    explanation: 'Separates loop processing from normal function exit.',
  },
  {
    line: 25,
    content: '    return 0;',
    type: 'Success Return',
    title: 'Successful Process Termination',
    explanation: 'Returns status code 0 to indicate normal, successful execution to the operating system.',
  },
  {
    line: 26,
    content: '}',
    type: 'Function End',
    title: 'Closing Main Function',
    explanation: 'Closes the main function block, reclaiming all stack memory.',
  },
];

const FULL_C_CODE = `#include <stdio.h>

int main(void) {
    int n;

    printf("Enter the number of rows (1-10): ");

    if (scanf("%d", &n) != 1 || n < 1 || n > 10) {
        printf("Invalid input. Enter a number from 1 to 10.\\n");
        return 1;
    }

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n - i; j++) {
            printf("  ");
        }

        for (int k = 1; k <= i; k++) {
            printf("* ");
        }

        printf("\\n");
    }

    return 0;
}`;

export function SourceCodeSection({
  activeLine,
  onSelectLine,
}: SourceCodeSectionProps) {
  const [internalActiveLine, setInternalActiveLine] = useState(13);
  const [copied, setCopied] = useState(false);

  const selectedLineNum = activeLine ?? internalActiveLine;
  const currentLineMeta =
    CODE_LINES.find((l) => l.line === selectedLineNum) ||
    CODE_LINES.find((l) => l.line === 13)!;

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_C_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLineClick = (lineNum: number) => {
    setInternalActiveLine(lineNum);
    onSelectLine?.(lineNum);
  };

  return (
    <section className={styles.section} id="source-code-section" aria-label="06 Complete C Program">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>06 / The C Implementation</div>
          <h2 className={styles.sectionTitle}>Complete Left Half Pyramid Program</h2>
          <p className={styles.sectionDesc}>
            Inspect the complete, production-ready C program. Click on any line of code in the dark editor
            to reveal its architectural function and execution behavior.
          </p>
        </div>

        <div className={styles.editorGrid}>
          {/* Left Editor */}
          <div className={styles.editorCard}>
            <div className={styles.editorTitleBar}>
              <div className={styles.editorFileTab}>
                <Code2 size={16} color="#60a5fa" />
                <span>left_half_pyramid.c</span>
              </div>
              <button
                type="button"
                className={styles.copyButton}
                onClick={handleCopy}
                aria-label="Copy source code"
              >
                {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className={styles.codeBody}>
              {CODE_LINES.map((l) => {
                const isActive = l.line === selectedLineNum;
                return (
                  <div
                    key={l.line}
                    className={`${styles.codeLine} ${isActive ? styles.codeLineActive : ''}`}
                    onClick={() => handleLineClick(l.line)}
                  >
                    <span className={styles.lineNumber}>{l.line}</span>
                    <span className={styles.lineContent}>{l.content}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Line Detail Inspector */}
          <div className={styles.lineDetailCard}>
            <div className={styles.detailBadgeRow}>
              <span className={styles.lineBadge}>Line {currentLineMeta.line}</span>
              <span className={styles.lineTypeTag}>{currentLineMeta.type}</span>
            </div>

            <h3 className={styles.detailTitle}>{currentLineMeta.title}</h3>

            {currentLineMeta.content && (
              <pre className={styles.activeCodeSnippet}>
                <code>{currentLineMeta.content}</code>
              </pre>
            )}

            <p className={styles.detailExplanation}>{currentLineMeta.explanation}</p>

            <div className={styles.hintBox}>
              <strong>Key Architectural Insight:</strong> Notice lines 14–16 and 18–20.
              The two inner loops run sequentially, not nested inside each other!
              Line 14 finishes all spaces for row <code>i</code>, then Line 18 prints all stars for row <code>i</code>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
