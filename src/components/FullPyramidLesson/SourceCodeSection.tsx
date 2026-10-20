import React, { useState } from 'react';
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
    explanation: 'First inner loop: prints exactly (n - i) spaces to push the star group to the center symmetry axis.',
  },
  {
    line: 15,
    content: '            printf(" ");',
    type: 'Space Print',
    title: 'Whitespace Unit Output',
    explanation: 'Outputs a single space character " " to center the pyramid row.',
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
    content: '        for (int k = 1; k <= 2 * i - 1; k++) {',
    type: 'Inner Loop 2',
    title: 'Odd Asterisk Generation Loop',
    explanation: 'Second inner loop: prints exactly (2 * i - 1) stars (1, 3, 5, 7, 9...) for row i.',
  },
  {
    line: 19,
    content: '            printf("*");',
    type: 'Star Print',
    title: 'Star Unit Output',
    explanation: 'Outputs a single asterisk "*", contributing to the symmetrical odd-numbered tier.',
  },
  {
    line: 20,
    content: '        }',
    type: 'Block End',
    title: 'End of Stars Loop',
    explanation: 'Terminates when k exceeds 2 * i - 1. All stars for row i have been emitted.',
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

export const SourceCodeSection: React.FC<SourceCodeSectionProps> = ({
  activeLine,
  onSelectLine,
}) => {
  const [internalActiveLine, setInternalActiveLine] = useState(13);
  const [copied, setCopied] = useState(false);

  const currentSelectedLine = activeLine || internalActiveLine;
  const lineData =
    CODE_LINES.find((l) => l.line === currentSelectedLine) || CODE_LINES[12];

  const fullSourceCode = CODE_LINES.map((l) => l.content).join('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullSourceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleLineClick = (lineNum: number) => {
    setInternalActiveLine(lineNum);
    onSelectLine?.(lineNum);
  };

  return (
    <section className={styles.section} id="source-code" aria-label="06 Write the C Program">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>SCENE 06 &bull; C IMPLEMENTATION</div>
          <h2 className={styles.sectionTitle}>The Complete C Source Code</h2>
          <p className={styles.sectionDesc}>
            Inspect the complete 26-line C implementation. Click on any line in the editor to inspect
            its mechanical role, loop conditions, and terminal output behavior.
          </p>
        </div>

        <div className={styles.editorGrid}>
          {/* Left Editor Card */}
          <div className={styles.editorCard}>
            <div className={styles.editorTitleBar}>
              <div className={styles.editorFileTab}>
                <Code2 size={16} className="text-blue-400" />
                <span>full_pyramid.c</span>
              </div>
              <button
                type="button"
                className={styles.copyButton}
                onClick={handleCopy}
                aria-label="Copy C source code"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
              </button>
            </div>

            <div className={styles.codeBody}>
              {CODE_LINES.map((line) => {
                const isActive = line.line === currentSelectedLine;
                return (
                  <div
                    key={line.line}
                    className={`${styles.codeLine} ${isActive ? styles.codeLineActive : ''}`}
                    onClick={() => handleLineClick(line.line)}
                  >
                    <span className={styles.lineNumber}>{line.line}</span>
                    <span className={styles.lineContent}>{line.content || ' '}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Line Inspector */}
          <div className={styles.lineDetailCard}>
            <div className={styles.detailBadgeRow}>
              <span className={styles.lineBadge}>Line {lineData.line}</span>
              <span className={styles.lineTypeTag}>{lineData.type}</span>
            </div>

            <h3 className={styles.detailTitle}>{lineData.title}</h3>

            {lineData.content && (
              <div className={styles.activeCodeSnippet}>
                {lineData.content}
              </div>
            )}

            <p className={styles.detailExplanation}>{lineData.explanation}</p>

            <div className={styles.hintBox}>
              <strong>Key Architectural Note:</strong> In Full Pyramid, the leading space loop runs{' '}
              <code>j = 1 &hellip; (n - i)</code> with a single space <code>printf(&quot; &quot;)</code>, and the star loop
              runs <code>k = 1 &hellip; (2*i - 1)</code> with <code>printf(&quot;*&quot;)</code>. This produces the exact
              symmetrical odd sequence (1, 3, 5, 7, 9...).
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
