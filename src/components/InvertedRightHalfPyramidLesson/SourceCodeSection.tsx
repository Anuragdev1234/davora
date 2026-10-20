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
    type: 'Header',
    title: 'Standard I/O Library Header',
    explanation:
      'Includes declarations for standard stream input and output functions like printf() and scanf(). This enables format-string parsing and console interaction.',
  },
  {
    line: 2,
    content: '',
    type: 'Blank',
    title: 'Whitespace',
    explanation: 'Blank line separating preprocessor directives from the main function definition.',
  },
  {
    line: 3,
    content: 'int main(void) {',
    type: 'Main Entry',
    title: 'Program Entry Point',
    explanation:
      'Standard hosted C entry point returning an integer status code to the environment. void indicates that main takes no command-line arguments.',
  },
  {
    line: 4,
    content: '    int n;',
    type: 'Declaration',
    title: 'Input Variable Allocation',
    explanation:
      'Allocates memory on the thread stack frame for integer n, storing the user-requested row count.',
  },
  {
    line: 5,
    content: '',
    type: 'Blank',
    title: 'Whitespace',
    explanation: 'Improves code readability between variable allocation and execution.',
  },
  {
    line: 6,
    content: '    printf("Enter the number of rows (1-10): ");',
    type: 'Prompt',
    title: 'Console Prompt',
    explanation:
      'Outputs a clear user prompt asking for the pyramid row count within the recommended range.',
  },
  {
    line: 7,
    content: '',
    type: 'Blank',
    title: 'Whitespace',
    explanation: 'Visual spacing before input retrieval.',
  },
  {
    line: 8,
    content: '    if (scanf("%d", &n) != 1 || n < 1 || n > 10) {',
    type: 'Validation',
    title: 'Robust Input Validation Guard',
    explanation:
      'Ensures that scanf successfully parses one integer and that n is in [1, 10]. If input fails or is invalid, the guard block handles the error.',
  },
  {
    line: 9,
    content: '        printf("Invalid input. Enter a number from 1 to 10.\\n");',
    type: 'Error Message',
    title: 'Error Diagnostic',
    explanation:
      'Notifies the user with a diagnostic message if non-numeric or out-of-range input is entered.',
  },
  {
    line: 10,
    content: '        return 1;',
    type: 'Error Exit',
    title: 'Non-Zero Exit Status',
    explanation:
      'Terminates execution early with exit code 1 to inform the shell that the program encountered bad input.',
  },
  {
    line: 11,
    content: '    }',
    type: 'Block End',
    title: 'Closing Validation Guard',
    explanation: 'End of input validation guard block.',
  },
  {
    line: 12,
    content: '',
    type: 'Blank',
    title: 'Whitespace',
    explanation: 'Spacing before nested loop execution.',
  },
  {
    line: 13,
    content: '    for (int i = n; i >= 1; i--) {',
    type: 'Reverse Outer Loop',
    title: 'Reverse Outer Loop — Decrementing Row Controller',
    explanation:
      'The core inverted logic: counter i starts at maximum width n and decrements (i--) on each step while i >= 1. Row 1 has i = n; row 2 has i = n-1; the final row has i = 1. When i becomes 0, the loop ends.',
  },
  {
    line: 14,
    content: '        for (int j = 1; j <= i; j++) {',
    type: 'Inner Loop',
    title: 'Inner Loop — Star Column Counter',
    explanation:
      'Inner column counter j starts at 1 and counts up to current i (j <= i). Because i decreases each row, the inner loop prints n stars, then n-1, down to 1 star on the final row!',
  },
  {
    line: 15,
    content: '            printf("* ");',
    type: 'Star Print',
    title: 'Printing Each Star',
    explanation:
      'Prints an asterisk and a trailing space. All stars for row i are printed on the same line without a newline.',
  },
  {
    line: 16,
    content: '        }',
    type: 'Block End',
    title: 'Inner Loop Termination',
    explanation: 'Marks the end of star generation for row i.',
  },
  {
    line: 17,
    content: '        printf("\\n");',
    type: 'Newline Print',
    title: 'Advancing to Next Row',
    explanation:
      'Emits a newline escape sequence ("\\n") to advance the console cursor to the beginning of the next line before i is decremented.',
  },
  {
    line: 18,
    content: '    }',
    type: 'Block End',
    title: 'Outer Loop Termination',
    explanation: 'Marks the completion of all n rows of the inverted pyramid.',
  },
  {
    line: 19,
    content: '',
    type: 'Blank',
    title: 'Whitespace',
    explanation: 'Separates algorithm execution from process termination.',
  },
  {
    line: 20,
    content: '    return 0;',
    type: 'Success Return',
    title: 'Successful Exit Code',
    explanation:
      'Returns exit code 0 to the host OS, confirming successful and normal process termination.',
  },
  {
    line: 21,
    content: '}',
    type: 'Function End',
    title: 'Closing Main Function',
    explanation: 'End of main function definition block.',
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

    for (int i = n; i >= 1; i--) {
        for (int j = 1; j <= i; j++) {
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
  const [copied, setCopied] = useState(false);
  const [internalLine, setInternalLine] = useState(13);

  const selectedLineNum = activeLine ?? internalLine;
  const currentMeta =
    CODE_LINES.find((l) => l.line === selectedLineNum && l.type !== 'Blank') ||
    CODE_LINES.find((l) => l.line === 13)!;

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_C_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderHighlightedContent = (lineObj: CodeLineMeta) => {
    const raw = lineObj.content;

    if (raw.includes('#include')) {
      return (
        <>
          <span className={styles.syntaxInclude}>#include</span>{' '}
          <span className={styles.syntaxString}>&lt;stdio.h&gt;</span>
        </>
      );
    }

    if (raw.includes('int main(void)')) {
      return (
        <>
          <span className={styles.syntaxKeyword}>int</span>{' '}
          <span className={styles.syntaxFunc}>main</span>
          <span style={{ color: '#d4d4d8' }}>(</span>
          <span className={styles.syntaxKeyword}>void</span>
          <span style={{ color: '#d4d4d8' }}>) {'{'}</span>
        </>
      );
    }

    if (raw.includes('int n;')) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.syntaxKeyword}>int</span> n;
        </>
      );
    }

    if (raw.includes('printf("Enter the number')) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.syntaxFunc}>printf</span>(
          <span className={styles.syntaxString}>"Enter the number of rows (1-10): "</span>);
        </>
      );
    }

    if (raw.includes('if (scanf(')) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.syntaxKeyword}>if</span> (
          <span className={styles.syntaxFunc}>scanf</span>(
          <span className={styles.syntaxString}>"%d"</span>, &amp;n) !={' '}
          <span className={styles.syntaxNumber}>1</span> || n &lt;{' '}
          <span className={styles.syntaxNumber}>1</span> || n &gt;{' '}
          <span className={styles.syntaxNumber}>10</span>) {'{'}
        </>
      );
    }

    if (raw.includes('printf("Invalid input')) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.syntaxFunc}>printf</span>(
          <span className={styles.syntaxString}>
            "Invalid input. Enter a number from 1 to 10.\\n"
          </span>
          );
        </>
      );
    }

    if (raw.includes('return 1;')) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.syntaxKeyword}>return</span>{' '}
          <span className={styles.syntaxNumber}>1</span>;
        </>
      );
    }

    if (raw.includes('for (int i = n; i >= 1; i--)')) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.syntaxKeyword}>for</span> (
          <span className={styles.syntaxKeyword}>int</span> i = n; i &gt;={' '}
          <span className={styles.syntaxNumber}>1</span>; i--) {'{'}
        </>
      );
    }

    if (raw.includes('for (int j = 1; j <= i; j++)')) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.syntaxKeyword}>for</span> (
          <span className={styles.syntaxKeyword}>int</span> j ={' '}
          <span className={styles.syntaxNumber}>1</span>; j &lt;= i; j++) {'{'}
        </>
      );
    }

    if (raw.includes('printf("* ");')) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.syntaxFunc}>printf</span>(
          <span className={styles.syntaxString}>"* "</span>);
        </>
      );
    }

    if (raw.includes('printf("\\n");')) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.syntaxFunc}>printf</span>(
          <span className={styles.syntaxString}>"\\n"</span>);
        </>
      );
    }

    if (raw.includes('return 0;')) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.syntaxKeyword}>return</span>{' '}
          <span className={styles.syntaxNumber}>0</span>;
        </>
      );
    }

    return <span>{raw}</span>;
  };

  return (
    <section className={styles.section} id="source-code" aria-label="06 Write the C Program">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>06 / The C Implementation</div>
          <h2 className={styles.sectionTitle}>The Complete Inverted C Program</h2>
          <p className={styles.sectionDesc}>
            Inspect the complete, production-ready C program. Click on any line of code to reveal
            how the reverse outer loop coordinates with the inner loop.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Code Editor */}
          <div className={styles.editorCard}>
            <div className={styles.editorHeader}>
              <div className={styles.headerLeft}>
                <span className={styles.dot} />
                <span className={styles.fileName}>inverted_right_half_pyramid.c</span>
              </div>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={handleCopy}
                aria-label="Copy C Code"
              >
                {copied ? <Check size={13} color="#4ade80" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <div className={styles.codeBody}>
              {CODE_LINES.map((lineObj) => {
                const isSelected = selectedLineNum === lineObj.line && lineObj.type !== 'Blank';
                return (
                  <div
                    key={lineObj.line}
                    className={`${styles.codeLine} ${isSelected ? styles.codeLineActive : ''}`}
                    onClick={() => {
                      if (lineObj.type !== 'Blank') {
                        setInternalLine(lineObj.line);
                        onSelectLine?.(lineObj.line);
                      }
                    }}
                  >
                    <span className={styles.lineNumber}>{lineObj.line}</span>
                    <span className={styles.lineContent}>
                      {renderHighlightedContent(lineObj)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Line Explanation Card */}
          <div className={styles.explanationCard}>
            <div className={styles.cardHeader}>
              <span className={styles.lineBadge}>Line {currentMeta.line}</span>
              <span style={{ fontSize: '0.75rem', color: '#71717a' }}>{currentMeta.type}</span>
            </div>

            <h3 className={styles.cardTitle}>{currentMeta.title}</h3>
            <p className={styles.cardDesc}>{currentMeta.explanation}</p>

            <div>
              <div
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#71717a',
                  marginBottom: '0.35rem',
                }}
              >
                Code Snippet
              </div>
              <pre className={styles.codeFocusBox}>{currentMeta.content.trim()}</pre>
            </div>

            <div className={styles.explanationHint}>
              <Code2 size={13} style={{ display: 'inline', marginRight: '4px' }} />
              Click any line in the code editor to inspect its compilation behavior.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
