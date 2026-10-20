import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  Terminal,
  ChevronDown,
  ChevronUp,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Code2,
  Edit3,
} from 'lucide-react';
import { fadeUp, viewportConfig, transitions } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './Experiment.module.css';

const DEFAULT_STRING = 'Hello, Devora!\\n';

const DEFAULT_CODE = `#include <stdio.h>

int main() {
    printf("Hello, Devora!\\n");
    return 0;
}`;

/**
 * Interpret C string escape sequences and return lines of stdout
 */
function interpretCString(str: string): string[] {
  // Replace escape sequences
  const unescaped = str
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '    ')
    .replace(/\\r/g, '')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');

  // If ends with a newline, trim that single trailing newline to match terminal line display
  const clean = unescaped.endsWith('\n') ? unescaped.slice(0, -1) : unescaped;
  return clean.split('\n');
}

/**
 * Parses full C code to extract and execute printf statements
 */
function parseFullCCode(source: string): {
  success: boolean;
  lines: string[];
  error?: string;
} {
  // Basic validation checks for realistic feedback
  if (!source.includes('main')) {
    return {
      success: false,
      lines: [],
      error: 'main.c: error: undefined reference to `main`\ncollect2: error: ld returned 1 exit status',
    };
  }

  // Check for unterminated string
  const openQuotesCount = (source.match(/(?<!\\)"/g) || []).length;
  if (openQuotesCount % 2 !== 0) {
    return {
      success: false,
      lines: [],
      error: 'main.c: error: missing terminating " character',
    };
  }

  // Regex to extract all printf calls: printf("...", args?)
  const printfRegex = /printf\s*\(\s*"((?:[^"\\]|\\.)*)"\s*(?:,\s*([^)]*))?\)\s*;/g;
  const matches = [...source.matchAll(printfRegex)];

  if (matches.length === 0) {
    // Check if there is an unclosed printf call without semicolon
    if (/printf\s*\([^;]*$/.test(source)) {
      return {
        success: false,
        lines: [],
        error: "main.c: error: expected ';' after printf call",
      };
    }
    return {
      success: true,
      lines: ['[Process finished with no output]'],
    };
  }

  let fullStdout = '';
  for (const match of matches) {
    const rawFormat = match[1];
    const argsRaw = match[2];

    let formatted = rawFormat
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '    ')
      .replace(/\\r/g, '')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');

    // Handle format specifiers if arguments are provided (e.g. printf("%d", 42))
    if (argsRaw && argsRaw.trim()) {
      const args = argsRaw.split(',').map((a) => a.trim().replace(/^"|"$/g, ''));
      let argIdx = 0;
      formatted = formatted.replace(/%(?:d|i|s|f|c)/g, () => {
        const val = args[argIdx++];
        return val !== undefined ? val : '';
      });
    }

    fullStdout += formatted;
  }

  const clean = fullStdout.endsWith('\n') ? fullStdout.slice(0, -1) : fullStdout;
  return {
    success: true,
    lines: clean.split('\n'),
  };
}

export function Experiment() {
  const reduced = useReducedMotion();
  const [printfText, setPrintfText] = useState<string>(DEFAULT_STRING);
  const [fullCode, setFullCode] = useState<string>(DEFAULT_CODE);
  const [editorMode, setEditorMode] = useState<'inline' | 'raw'>('inline');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasOutput, setHasOutput] = useState<boolean>(false);
  const [outputLines, setOutputLines] = useState<string[]>(['Hello, Devora!']);
  const [runError, setRunError] = useState<string | null>(null);
  const [isOutputExpanded, setIsOutputExpanded] = useState<boolean>(true);
  const timerRef = useRef<number | null>(null);

  // Sync inline printf text with full code
  const handleInlineChange = (newVal: string) => {
    setPrintfText(newVal);
    setFullCode(`#include <stdio.h>\n\nint main() {\n    printf("${newVal}");\n    return 0;\n}`);
  };

  // Sync full code with inline printf text
  const handleFullCodeChange = (newCode: string) => {
    setFullCode(newCode);
    const match = newCode.match(/printf\s*\(\s*"((?:[^"\\]|\\.)*)"/);
    if (match) {
      setPrintfText(match[1]);
    }
  };

  const handleRun = () => {
    if (isRunning) return;

    setIsRunning(true);
    setHasOutput(false);
    setRunError(null);

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setIsRunning(false);

      if (editorMode === 'inline') {
        const lines = interpretCString(printfText);
        setOutputLines(lines);
        setRunError(null);
        setHasOutput(true);
      } else {
        const result = parseFullCCode(fullCode);
        if (result.success) {
          setOutputLines(result.lines);
          setRunError(null);
          setHasOutput(true);
        } else {
          setRunError(result.error || 'Compilation error');
          setOutputLines([]);
          setHasOutput(true);
        }
      }

      setIsOutputExpanded(true);
    }, 600);
  };

  const handleReset = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    setPrintfText(DEFAULT_STRING);
    setFullCode(DEFAULT_CODE);
    setIsRunning(false);
    setHasOutput(false);
    setRunError(null);
    setOutputLines(['Hello, Devora!']);
  };

  const toggleOutput = () => {
    setIsOutputExpanded((prev) => !prev);
  };



  return (
    <section id="experiment" className={styles.section} aria-label="The Experiment">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionLabel}>06 / THE EXPERIMENT</span>
          <h2 className={styles.heading}>The experiment</h2>
          <p className={styles.description}>
            Experience how C translates human intentions into low-level runtime behavior.
            Type anything inside the inverted commas below and execute the code to see your custom text run.
          </p>
        </div>

        {/* Code Editor Panel */}
        <motion.div
          className={styles.editorPanel}
          variants={reduced ? undefined : fadeUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={viewportConfig}
        >
          {/* Header Bar */}
          <div className={styles.panelHeader}>
            <div className={styles.leftControls}>
              <div className={styles.windowDots} aria-hidden="true">
                <span className={`${styles.dot} ${styles.dotClose}`} />
                <span className={`${styles.dot} ${styles.dotMin}`} />
                <span className={`${styles.dot} ${styles.dotMax}`} />
              </div>

              <div className={styles.tabs}>
                <div className={styles.tab}>
                  <Code2 size={13} aria-hidden="true" />
                  <span>main.c</span>
                  <span className={styles.tabBadge} />
                </div>
              </div>

              {/* Mode Toggle: Inline String vs Raw Source */}
              <div className={styles.modeToggle} role="group" aria-label="Editor Mode">
                <button
                  type="button"
                  onClick={() => setEditorMode('inline')}
                  className={`${styles.modeBtn} ${
                    editorMode === 'inline' ? styles.modeBtnActive : ''
                  }`}
                  title="Edit string inside printf quotes"
                >
                  <Edit3 size={11} style={{ marginRight: 4, verticalAlign: -1 }} />
                  Editable String
                </button>
                <button
                  type="button"
                  onClick={() => setEditorMode('raw')}
                  className={`${styles.modeBtn} ${
                    editorMode === 'raw' ? styles.modeBtnActive : ''
                  }`}
                  title="Edit full C source code"
                >
                  Full Source
                </button>
              </div>
            </div>

            <div className={styles.rightControls}>
              <button
                type="button"
                id="experimentResetBtn"
                onClick={handleReset}
                disabled={isRunning}
                className={styles.resetBtn}
                title="Reset code to default"
                aria-label="Reset simulation"
              >
                <RotateCcw size={13} aria-hidden="true" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                id="experimentRunBtn"
                onClick={handleRun}
                disabled={isRunning}
                className={styles.runBtn}
                aria-label={isRunning ? 'Compiling program' : 'Run program'}
              >
                {isRunning ? (
                  <>
                    <Loader2 size={13} className={styles.spinner} aria-hidden="true" />
                    <span>Compiling...</span>
                  </>
                ) : (
                  <>
                    <Play size={13} fill="currentColor" aria-hidden="true" />
                    <span>{hasOutput ? 'Re-run' : 'Run'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Body */}
          <div className={styles.editorBody}>
            {editorMode === 'inline' ? (
              <table className={styles.codeTable} role="presentation">
                <tbody>
                  <tr className={styles.lineRow}>
                    <td className={styles.lineNum}>1</td>
                    <td className={styles.lineContent}>
                      <span className={styles.tokPreprocessor}>#include </span>
                      <span className={styles.tokPreprocessor}>&lt;stdio.h&gt;</span>
                    </td>
                  </tr>
                  <tr className={styles.lineRow}>
                    <td className={styles.lineNum}>2</td>
                    <td className={styles.lineContent}>&nbsp;</td>
                  </tr>
                  <tr className={styles.lineRow}>
                    <td className={styles.lineNum}>3</td>
                    <td className={styles.lineContent}>
                      <span className={styles.tokKeyword}>int</span>{' '}
                      <span className={styles.tokFunction}>main</span>
                      <span className={styles.tokPunctuation}>() {'{'}</span>
                    </td>
                  </tr>

                  {/* Line 4: Interactive Editable printf statement */}
                  <tr className={`${styles.lineRow} ${styles.interactiveLineRow}`}>
                    <td className={styles.lineNum}>4</td>
                    <td className={styles.lineContent}>
                      <span>    </span>
                      <span className={styles.tokFunction}>printf</span>
                      <span className={styles.tokPunctuation}>(</span>
                      <span className={styles.tokString}>&quot;</span>
                      <input
                        id="printfTextInput"
                        type="text"
                        value={printfText}
                        onChange={(e) => handleInlineChange(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleRun();
                          }
                        }}
                        className={styles.stringInput}
                        style={{
                          width: `${Math.max(printfText.length + 1, 14)}ch`,
                        }}
                        placeholder="Type anything here..."
                        aria-label="Editable string inside printf statement"
                        spellCheck={false}
                        autoComplete="off"
                      />
                      <span className={styles.tokString}>&quot;</span>
                      <span className={styles.tokPunctuation}>);</span>
                      <span
                        className={styles.editHintBadge}
                        title="Type any message inside inverted commas and click Run"
                      >
                        ✎ type inside quotes
                      </span>
                    </td>
                  </tr>

                  <tr className={styles.lineRow}>
                    <td className={styles.lineNum}>5</td>
                    <td className={styles.lineContent}>
                      <span>    </span>
                      <span className={styles.tokKeyword}>return</span>{' '}
                      <span className={styles.tokNumber}>0</span>
                      <span className={styles.tokPunctuation}>;</span>
                    </td>
                  </tr>
                  <tr className={styles.lineRow}>
                    <td className={styles.lineNum}>6</td>
                    <td className={styles.lineContent}>
                      <span className={styles.tokPunctuation}>{'}'}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className={styles.rawEditorWrapper}>
                <textarea
                  id="fullCodeTextarea"
                  value={fullCode}
                  onChange={(e) => handleFullCodeChange(e.target.value)}
                  className={styles.rawEditorTextarea}
                  spellCheck={false}
                  rows={8}
                  aria-label="Raw C source code editor"
                />
              </div>
            )}
          </div>

          {/* Terminal / Output Area */}
          <div className={styles.outputSection}>
            <div
              className={styles.outputBar}
              onClick={toggleOutput}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleOutput();
                }
              }}
              aria-expanded={isOutputExpanded}
              aria-label="Toggle execution output panel"
            >
              <div className={styles.outputBarTitle}>
                <Terminal size={13} aria-hidden="true" />
                <span>Output</span>
                {isRunning && (
                  <span className={`${styles.outputStatusBadge} ${styles.statusRunning}`}>
                    Compiling...
                  </span>
                )}
                {!isRunning && hasOutput && !runError && (
                  <span className={`${styles.outputStatusBadge} ${styles.statusSuccess}`}>
                    <CheckCircle2 size={11} aria-hidden="true" />
                    Exit 0
                  </span>
                )}
                {!isRunning && hasOutput && runError && (
                  <span className={`${styles.outputStatusBadge} ${styles.statusError}`}>
                    <AlertCircle size={11} aria-hidden="true" />
                    Exit 1 (Error)
                  </span>
                )}
                {!isRunning && !hasOutput && (
                  <span className={`${styles.outputStatusBadge} ${styles.statusIdle}`}>
                    Ready
                  </span>
                )}
              </div>

              <div className={styles.toggleIcon} aria-hidden="true">
                {isOutputExpanded ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
              </div>
            </div>

            <AnimatePresence initial={false}>
              {isOutputExpanded && (
                <motion.div
                  initial={reduced ? undefined : { opacity: 0, height: 0 }}
                  animate={reduced ? undefined : { opacity: 1, height: 'auto' }}
                  exit={reduced ? undefined : { opacity: 0, height: 0 }}
                  transition={transitions.fast}
                >
                  <div className={styles.outputContent}>
                    {isRunning ? (
                      <div className={styles.terminalCmd}>
                        <span>$ gcc -Wall -O2 main.c -o main &amp;&amp; ./main</span>
                        <div style={{ marginTop: '4px', color: '#93B5E1' }}>Linking objects...</div>
                      </div>
                    ) : hasOutput ? (
                      <ul className={styles.terminalLog}>
                        <li className={styles.terminalCmd}>
                          $ gcc -Wall -O2 main.c -o main &amp;&amp; ./main
                        </li>
                        {runError ? (
                          <li className={styles.terminalStderr}>{runError}</li>
                        ) : (
                          outputLines.map((line, idx) => (
                            <li key={idx} className={styles.terminalStdout}>
                              {line || '\u00A0'}
                            </li>
                          ))
                        )}
                        <li className={styles.terminalExit}>
                          {runError
                            ? '[Process terminated with error code 1]'
                            : '[Process completed with exit code 0]'}
                        </li>
                      </ul>
                    ) : (
                      <div className={styles.terminalCmd}>
                        <span>Click &quot;Run&quot; above to compile and execute main.c</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.simNotice}>
              <span>Dynamic standard I/O execution with custom escape-sequence processing</span>
              <span className={styles.simBadge}>DEVORA C RUNTIME</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Experiment;
