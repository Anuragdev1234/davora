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
    explanation: 'Includes the standard input/output declarations required for functions like printf() and scanf(). Without this header, the compiler cannot verify the signatures of stream I/O functions.',
  },
  {
    line: 2,
    content: '',
    type: 'Blank',
    title: 'Whitespace',
    explanation: 'Blank line separating preprocessor directives from function definitions.',
  },
  {
    line: 3,
    content: 'int main(void) {',
    type: 'Main Entry',
    title: 'Program Entry Point',
    explanation: 'The entry point of any standard hosted C program. Returns an integer exit code to the operating system; void specifies that main accepts no command-line arguments.',
  },
  {
    line: 4,
    content: '    int n;',
    type: 'Declaration',
    title: 'Input Variable Declaration',
    explanation: 'Allocates memory on the stack for the integer variable n, which will store the user-specified row count.',
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
    title: 'User Prompt',
    explanation: 'Displays a friendly prompt asking the user to specify how many rows they want in the pyramid.',
  },
  {
    line: 7,
    content: '',
    type: 'Blank',
    title: 'Whitespace',
    explanation: 'Blank line before input retrieval.',
  },
  {
    line: 8,
    content: '    if (scanf("%d", &n) != 1 || n < 1 || n > 10) {',
    type: 'Validation',
    title: 'Robust Input Validation',
    explanation: 'scanf("%d", &n) returns 1 if an integer is parsed successfully. We also enforce that n is within the safe range [1, 10]. If input fails or is out of range, the branch activates.',
  },
  {
    line: 9,
    content: '        printf("Invalid input. Enter a number from 1 to 10.\\n");',
    type: 'Error Message',
    title: 'Error Diagnostic',
    explanation: 'Prints a helpful error message if the user enters letters, negative numbers, or integers beyond 10.',
  },
  {
    line: 10,
    content: '        return 1;',
    type: 'Error Exit',
    title: 'Failure Termination',
    explanation: 'Terminates the program with non-zero exit status 1, indicating failure to the operating system environment.',
  },
  {
    line: 11,
    content: '    }',
    type: 'Block End',
    title: 'Closing Validation Block',
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
    content: '    for (int i = 1; i <= n; i++) {',
    type: 'Outer Loop',
    title: 'Outer Loop — Row Controller',
    explanation: 'Initializes row counter i = 1 and loops while i <= n. Each iteration represents one horizontal row of the pyramid.',
  },
  {
    line: 14,
    content: '        for (int j = 1; j <= i; j++) {',
    type: 'Inner Loop',
    title: 'Inner Loop — Star Counter',
    explanation: 'The critical logic: j starts at 1 and runs up to i. Because the condition is j <= i, Row 1 runs 1 time, Row 2 runs 2 times, and Row i runs exactly i times!',
  },
  {
    line: 15,
    content: '            printf("* ");',
    type: 'Star Print',
    title: 'Printing Each Star',
    explanation: 'Prints an asterisk followed by a space. Notice there is NO newline here — stars in the same row must appear on the same line.',
  },
  {
    line: 16,
    content: '        }',
    type: 'Block End',
    title: 'Inner Loop Termination',
    explanation: 'Marks the end of the inner loop body for the current row.',
  },
  {
    line: 17,
    content: '        printf("\\n");',
    type: 'Newline Print',
    title: 'Advancing to the Next Line',
    explanation: 'Once all stars for row i are printed, this prints a newline to move the terminal cursor to the next line before row i+1 begins.',
  },
  {
    line: 18,
    content: '    }',
    type: 'Block End',
    title: 'Outer Loop Termination',
    explanation: 'Marks the completion of all n rows of the pyramid.',
  },
  {
    line: 19,
    content: '',
    type: 'Blank',
    title: 'Whitespace',
    explanation: 'Separates algorithm execution from return.',
  },
  {
    line: 20,
    content: '    return 0;',
    type: 'Success Return',
    title: 'Successful Exit Code',
    explanation: 'Returns 0 to the operating system, confirming successful completion of the process.',
  },
  {
    line: 21,
    content: '}',
    type: 'Function End',
    title: 'Closing Main Function',
    explanation: 'End of main function definition.',
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

  const handleLineClick = (lineNum: number) => {
    const meta = CODE_LINES.find((l) => l.line === lineNum);
    if (meta && meta.type !== 'Blank') {
      setInternalLine(lineNum);
      onSelectLine?.(lineNum);
    }
  };

  // Syntax colorizer helper
  const renderStyledLine = (line: CodeLineMeta) => {
    const text = line.content;

    if (text.startsWith('#include')) {
      return (
        <>
          <span className={styles.syntaxInclude}>#include </span>
          <span className={styles.syntaxString}>&lt;stdio.h&gt;</span>
        </>
      );
    }

    if (text.includes('int main(void)')) {
      return (
        <>
          <span className={styles.syntaxKeyword}>int </span>
          <span className={styles.syntaxFunc}>main</span>
          <span className={styles.syntaxKeyword}>(void) </span>
          <span>{'{'}</span>
        </>
      );
    }

    if (text.includes('int n;')) {
      return (
        <>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className={styles.syntaxKeyword}>int </span>
          <span>n;</span>
        </>
      );
    }

    if (text.includes('for (int i = 1; i <= n; i++)')) {
      return (
        <>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className={styles.syntaxKeyword}>for </span>
          <span>(</span>
          <span className={styles.syntaxKeyword}>int </span>
          <span>i = </span>
          <span className={styles.syntaxNumber}>1</span>
          <span>; i &lt;= n; i++) {'{'}</span>
        </>
      );
    }

    if (text.includes('for (int j = 1; j <= i; j++)')) {
      return (
        <>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className={styles.syntaxKeyword}>for </span>
          <span>(</span>
          <span className={styles.syntaxKeyword}>int </span>
          <span>j = </span>
          <span className={styles.syntaxNumber}>1</span>
          <span>; j &lt;= i; j++) {'{'}</span>
        </>
      );
    }

    if (text.includes('printf("* ");')) {
      return (
        <>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className={styles.syntaxFunc}>printf</span>
          <span>(</span>
          <span className={styles.syntaxString}>&quot;* &quot;</span>
          <span>);</span>
        </>
      );
    }

    if (text.includes('printf("\\n");')) {
      return (
        <>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className={styles.syntaxFunc}>printf</span>
          <span>(</span>
          <span className={styles.syntaxString}>&quot;\\n&quot;</span>
          <span>);</span>
        </>
      );
    }

    if (text.includes('return 0;')) {
      return (
        <>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className={styles.syntaxKeyword}>return </span>
          <span className={styles.syntaxNumber}>0</span>
          <span>;</span>
        </>
      );
    }

    return <span>{text}</span>;
  };

  return (
    <section className={styles.section} id="source-code" aria-label="06 Write the C Program">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>06 / Turn the Algorithm into C</div>
          <h2 className={styles.sectionTitle}>The Working C Implementation</h2>
          <p className={styles.sectionDesc}>
            Now that the reasoning is clear, we can translate the algorithm into a working
            C program. Click any line below to inspect its purpose.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left: Code Editor Card */}
          <div className={styles.editorCard}>
            <div className={styles.editorHeader}>
              <div className={styles.headerLeft}>
                <span className={styles.dot} />
                <span className={styles.fileName}>right_half_pyramid.c</span>
              </div>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={handleCopy}
                aria-label="Copy C source code"
              >
                {copied ? <Check size={13} color="#4ade80" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <div className={styles.codeBody}>
              {CODE_LINES.map((line) => {
                const isSelected = selectedLineNum === line.line;
                return (
                  <div
                    key={line.line}
                    className={`${styles.codeLine} ${
                      isSelected && line.type !== 'Blank' ? styles.codeLineActive : ''
                    }`}
                    onClick={() => handleLineClick(line.line)}
                  >
                    <span className={styles.lineNumber}>{line.line}</span>
                    <span className={styles.lineContent}>{renderStyledLine(line)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Line Explanation Card */}
          <div className={styles.explanationCard}>
            <div className={styles.cardHeader}>
              <span className={styles.lineBadge}>Line {currentMeta.line}</span>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{currentMeta.type}</span>
            </div>

            <h3 className={styles.cardTitle}>{currentMeta.title}</h3>
            <p className={styles.cardDesc}>{currentMeta.explanation}</p>

            <div>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: '#71717a', marginBottom: '0.35rem' }}>
                Source Statement
              </div>
              <pre className={styles.codeFocusBox}>{currentMeta.content.trim()}</pre>
            </div>

            <div className={styles.explanationHint}>
              <Code2 size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              Click any line in the code editor to explore how syntax maps to compiler instructions.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
