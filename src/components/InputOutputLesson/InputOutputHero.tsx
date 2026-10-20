import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Monitor, Keyboard } from 'lucide-react';
import { InteractiveKeyboard } from './InteractiveKeyboard';
import { HERO_CODE_LINES } from '../../data/inputOutputLessonData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './InputOutputHero.module.css';

interface ConnectorCoords {
  inputToScanf: string;
  promptToTerminal: string;
  outputToTerminal: string;
}

interface InputOutputHeroProps {
  onStageSelect?: (stage: 'prompt' | 'input' | 'processing' | 'output') => void;
  selectedStage?: 'prompt' | 'input' | 'processing' | 'output';
}

export function InputOutputHero({
  onStageSelect,
  selectedStage = 'input',
}: InputOutputHeroProps) {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  // User input state
  const [userInput, setUserInput] = useState<string>('10 20');
  const [internalStage, setInternalStage] = useState<'prompt' | 'input' | 'processing' | 'output'>(selectedStage);

  const activeStage = selectedStage ?? internalStage;

  const handleStageChange = (stage: 'prompt' | 'input' | 'processing' | 'output') => {
    setInternalStage(stage);
    if (onStageSelect) {
      onStageSelect(stage);
    }
  };

  // Parse user input into two integers (simulating scanf("%d %d", &a, &b) == 2)
  const trimmed = userInput.trim();
  const tokens = trimmed.length > 0 ? trimmed.split(/\s+/) : [];
  const isValidTwoInts =
    tokens.length === 2 &&
    !isNaN(Number(tokens[0])) &&
    !isNaN(Number(tokens[1])) &&
    tokens[0] !== '' &&
    tokens[1] !== '';

  const numA = isValidTwoInts ? parseInt(tokens[0], 10) : null;
  const numB = isValidTwoInts ? parseInt(tokens[1], 10) : null;
  const calculatedSum = isValidTwoInts && numA !== null && numB !== null ? numA + numB : null;
  const hasInputError = trimmed.length > 0 && !isValidTwoInts;

  // Active characters for keyboard highlighting
  const activeChars = Array.from(new Set(userInput.split('')));

  // Connector paths state
  const [connectors, setConnectors] = useState<ConnectorCoords>({
    inputToScanf: '',
    promptToTerminal: '',
    outputToTerminal: '',
  });

  // Calculate dynamic connector paths using real DOM element positions
  const updateConnectors = useCallback(() => {
    if (!stageRef.current) return;
    const stageRect = stageRef.current.getBoundingClientRect();

    const elInputBox = document.getElementById('hero-user-input-field');
    const elLineScanf = document.getElementById('hero-code-scanf');
    const elLinePrompt = document.getElementById('hero-code-prompt');
    const elTermPrompt = document.getElementById('hero-terminal-prompt');
    const elLineOutput = document.getElementById('hero-code-output');
    const elTermOutput = document.getElementById('hero-terminal-output');

    if (elInputBox && elLineScanf && elLinePrompt && elTermPrompt && elLineOutput && elTermOutput) {
      const rInput = elInputBox.getBoundingClientRect();
      const rScanf = elLineScanf.getBoundingClientRect();
      const rPrompt = elLinePrompt.getBoundingClientRect();
      const rTermP = elTermPrompt.getBoundingClientRect();
      const rOutput = elLineOutput.getBoundingClientRect();
      const rTermO = elTermOutput.getBoundingClientRect();

      // 1. Blue path: User Input field right edge -> Code line scanf left edge
      const x1 = rInput.right - stageRect.left;
      const y1 = rInput.top + rInput.height / 2 - stageRect.top;
      const x2 = rScanf.left - stageRect.left;
      const y2 = rScanf.top + rScanf.height / 2 - stageRect.top;
      const dx1 = (x2 - x1) * 0.55;
      const path1 = `M ${x1} ${y1} C ${x1 + dx1} ${y1}, ${x2 - dx1} ${y2}, ${x2} ${y2}`;

      // 2. Amber path: Code line prompt right edge -> Terminal Prompt left edge
      const px1 = rPrompt.right - stageRect.left;
      const py1 = rPrompt.top + rPrompt.height / 2 - stageRect.top;
      const px2 = rTermP.left - stageRect.left;
      const py2 = rTermP.top + 38 - stageRect.top;
      const pdx = (px2 - px1) * 0.5;
      const path2 = `M ${px1} ${py1} C ${px1 + pdx} ${py1}, ${px2 - pdx} ${py2}, ${px2} ${py2}`;

      // 3. Emerald path: Code line output right edge -> Terminal Output left edge
      const ox1 = rOutput.right - stageRect.left;
      const oy1 = rOutput.top + rOutput.height / 2 - stageRect.top;
      const ox2 = rTermO.left - stageRect.left;
      const oy2 = rTermO.top + 38 - stageRect.top;
      const odx = (ox2 - ox1) * 0.5;
      const path3 = `M ${ox1} ${oy1} C ${ox1 + odx} ${oy1}, ${ox2 - odx} ${oy2}, ${ox2} ${oy2}`;

      setConnectors({
        inputToScanf: path1,
        promptToTerminal: path2,
        outputToTerminal: path3,
      });
    }
  }, []);

  useEffect(() => {
    updateConnectors();
    const handleResize = () => updateConnectors();
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(updateConnectors, 250);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [updateConnectors, userInput]);

  // Keyboard click handler
  const handleKeyboardPress = (char: string) => {
    if (char === 'DEL') {
      setUserInput((prev) => prev.slice(0, -1));
    } else if (char === 'ENTER') {
      handleStageChange('output');
    } else {
      setUserInput((prev) => prev + char);
    }
  };

  return (
    <section className={styles.heroSection} aria-label="Input and Output in C Interactive Lesson">
      {/* Background Architectural Terrain */}
      <div className={styles.terrainBackground} aria-hidden="true" />

      <div className={styles.container}>
        {/* Top Eyebrow Meta Header */}
        <div className={styles.metaHeader}>
          <div className={styles.brandGroup}>
            <span className={styles.brandLogo}>DEVORA</span>
            <span className={styles.brandSubtitle}>C PROGRAMMING</span>
          </div>

          <div className={styles.lessonBadge}>
            <span>LESSON 07 · INPUT AND OUTPUT IN C</span>
          </div>
        </div>

        {/* 3-Column Hero Layout */}
        <div className={styles.heroStage} ref={stageRef}>
          {/* Dynamic SVG Connectors */}
          <svg className={styles.connectorsSvg} aria-hidden="true">
            <defs>
              <marker
                id="arrow-blue"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#3B82F6" />
              </marker>
              <marker
                id="arrow-amber"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#F59E0B" />
              </marker>
              <marker
                id="arrow-emerald"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#10B981" />
              </marker>
            </defs>

            {/* Blue Connector: User Input -> scanf() */}
            {connectors.inputToScanf && (
              <path
                d={connectors.inputToScanf}
                className={styles.connectorPath}
                stroke="#3B82F6"
                strokeWidth={activeStage === 'input' ? '2.8' : '1.8'}
                strokeOpacity={activeStage === 'input' ? '1' : '0.65'}
                markerEnd="url(#arrow-blue)"
              />
            )}

            {/* Amber Connector: printf() prompt -> Terminal Prompt */}
            {connectors.promptToTerminal && (
              <path
                d={connectors.promptToTerminal}
                className={styles.connectorPath}
                stroke="#F59E0B"
                strokeWidth={activeStage === 'prompt' ? '2.8' : '1.8'}
                strokeOpacity={activeStage === 'prompt' ? '1' : '0.65'}
                markerEnd="url(#arrow-amber)"
              />
            )}

            {/* Emerald Connector: printf() sum -> Terminal Output */}
            {connectors.outputToTerminal && (
              <path
                d={connectors.outputToTerminal}
                className={styles.connectorPath}
                stroke="#10B981"
                strokeWidth={activeStage === 'output' ? '2.8' : '1.8'}
                strokeOpacity={activeStage === 'output' ? '1' : '0.65'}
                markerEnd="url(#arrow-emerald)"
              />
            )}
          </svg>

          {/* ==========================================================
              ZONE 1 (LEFT): Editorial Heading, Concept Cards, Input, Keyboard
              ========================================================== */}
          <div className={styles.leftColumn}>
            <motion.h1
              className={styles.headline}
              initial={reduced ? undefined : { opacity: 0, y: 15 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.titleLine}>Input and</span>
              <span className={styles.titleLine}>Output in C</span>
            </motion.h1>

            <motion.p
              className={styles.leadDescription}
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              Input and output (I/O) in C are the operations used to receive data from a user or another source
              and display or send the results to a destination.
            </motion.p>

            {/* Two Concept Cards */}
            <div className={styles.conceptsContainer}>
              {/* Input Concept */}
              <div
                className={styles.conceptCard}
                onClick={() => handleStageChange('input')}
                role="button"
                tabIndex={0}
              >
                <div className={`${styles.conceptIconBadge} ${styles.conceptInputBadge}`}>
                  <Keyboard size={15} />
                </div>
                <div className={styles.conceptContent}>
                  <h4 className={styles.conceptTitle}>Input</h4>
                  <p className={styles.conceptSubtitle}>
                    Data provided to a program, usually through the keyboard.
                  </p>
                </div>
              </div>

              {/* Output Concept */}
              <div
                className={styles.conceptCard}
                onClick={() => handleStageChange('output')}
                role="button"
                tabIndex={0}
              >
                <div className={`${styles.conceptIconBadge} ${styles.conceptOutputBadge}`}>
                  <Monitor size={15} />
                </div>
                <div className={styles.conceptContent}>
                  <h4 className={styles.conceptTitle}>Output</h4>
                  <p className={styles.conceptSubtitle}>
                    Information produced by a program, usually displayed on the screen.
                  </p>
                </div>
              </div>
            </div>

            {/* User Input Interactive Panel */}
            <div
              className={`${styles.userInputCard} ${activeStage === 'input' ? styles.userInputCardActive : ''}`}
              id="hero-user-input"
            >
              <div className={styles.userInputCardHeader}>
                <div className={styles.userInputIconBadge}>
                  <Keyboard size={15} />
                </div>
                <div>
                  <h4 className={styles.userInputTitle}>User Input</h4>
                  <p className={styles.userInputSubtitle}>Data entered by the user through the keyboard.</p>
                </div>
              </div>

              {/* Real Interactive Text Input */}
              <div className={styles.inputFieldWrapper} id="hero-user-input-field">
                <input
                  type="text"
                  className={styles.inputField}
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                    handleStageChange('input');
                  }}
                  placeholder="Enter two integers (e.g. 10 20)"
                  aria-label="Interactive standard input stream (stdin)"
                />
              </div>

              {/* Quick Presets for Learner Testing */}
              <div className={styles.quickPillValues}>
                <span className={styles.quickPillLabel}>Test:</span>
                <button
                  type="button"
                  className={styles.quickPillBtn}
                  onClick={() => {
                    setUserInput('10 20');
                    handleStageChange('input');
                  }}
                >
                  10 20
                </button>
                <button
                  type="button"
                  className={styles.quickPillBtn}
                  onClick={() => {
                    setUserInput('7 8');
                    handleStageChange('input');
                  }}
                >
                  7 8
                </button>
                <button
                  type="button"
                  className={styles.quickPillBtn}
                  onClick={() => {
                    setUserInput('15 45');
                    handleStageChange('input');
                  }}
                >
                  15 45
                </button>
                <button
                  type="button"
                  className={styles.quickPillBtn}
                  onClick={() => {
                    setUserInput('abc');
                    handleStageChange('input');
                  }}
                  title="Simulate scanf validation failure"
                >
                  abc (invalid)
                </button>
              </div>

              {/* 3D Mechanical Keyboard Visualizer */}
              <InteractiveKeyboard
                activeKeys={activeChars}
                onKeyPress={handleKeyboardPress}
              />
            </div>
          </div>

          {/* ==========================================================
              ZONE 2 (CENTER): Primary Dark Code Editor
              ========================================================== */}
          <div className={styles.centerColumn}>
            <div className={styles.codeEditorCard}>
              <div className={styles.editorTitleBar}>
                <div className={styles.macControls}>
                  <span className={`${styles.macDot} ${styles.macDotRed}`} />
                  <span className={`${styles.macDot} ${styles.macDotAmber}`} />
                  <span className={`${styles.macDot} ${styles.macDotGreen}`} />
                </div>
                <div className={styles.editorFileName}>main.c</div>
                <div style={{ width: 40 }} />
              </div>

              <div className={styles.codeBody}>
                {HERO_CODE_LINES.map((item) => {
                  if (item.lineNum === 6) {
                    // Line 6: printf("Enter two integers: ");
                    return (
                      <div className={styles.codeLine} key={item.lineNum}>
                        <span className={styles.lineNum}>{item.lineNum}</span>
                        <span
                          id="hero-code-prompt"
                          className={`${styles.pillHighlight} ${styles.pillPrompt} ${
                            activeStage === 'prompt' ? styles.pillActive : ''
                          }`}
                          onClick={() => handleStageChange('prompt')}
                        >
                          <span className={styles.syntaxFunc}>printf</span>
                          <span className={styles.syntaxPunct}>(</span>
                          <span className={styles.syntaxString}>"Enter two integers: "</span>
                          <span className={styles.syntaxPunct}>);</span>
                        </span>
                      </div>
                    );
                  }

                  if (item.lineNum === 7) {
                    // Line 7: scanf("%d %d", &a, &b);
                    return (
                      <div className={styles.codeLine} key={item.lineNum}>
                        <span className={styles.lineNum}>{item.lineNum}</span>
                        <span
                          id="hero-code-scanf"
                          className={`${styles.pillHighlight} ${styles.pillInput} ${
                            activeStage === 'input' ? styles.pillActive : ''
                          }`}
                          onClick={() => handleStageChange('input')}
                        >
                          <span className={styles.syntaxFunc}>scanf</span>
                          <span className={styles.syntaxPunct}>(</span>
                          <span className={styles.syntaxString}>"%d %d"</span>
                          <span className={styles.syntaxPunct}>, &a, &b);</span>
                        </span>
                      </div>
                    );
                  }

                  if (item.lineNum === 9) {
                    // Line 9: sum = a + b;
                    return (
                      <div className={styles.codeLine} key={item.lineNum}>
                        <span className={styles.lineNum}>{item.lineNum}</span>
                        <span
                          id="hero-code-processing"
                          className={`${styles.pillHighlight} ${styles.pillProcessing} ${
                            activeStage === 'processing' ? styles.pillActive : ''
                          }`}
                          onClick={() => handleStageChange('processing')}
                        >
                          <span className={styles.codeText}>sum = a + b;</span>
                        </span>
                      </div>
                    );
                  }

                  if (item.lineNum === 10) {
                    // Line 10: printf("Sum = %d\n", sum);
                    return (
                      <div className={styles.codeLine} key={item.lineNum}>
                        <span className={styles.lineNum}>{item.lineNum}</span>
                        <span
                          id="hero-code-output"
                          className={`${styles.pillHighlight} ${styles.pillOutput} ${
                            activeStage === 'output' ? styles.pillActive : ''
                          }`}
                          onClick={() => handleStageChange('output')}
                        >
                          <span className={styles.syntaxFunc}>printf</span>
                          <span className={styles.syntaxPunct}>(</span>
                          <span className={styles.syntaxString}>"Sum = %d\n"</span>
                          <span className={styles.syntaxPunct}>, sum);</span>
                        </span>
                      </div>
                    );
                  }

                  // Non-interactive code lines with clean syntax coloring
                  return (
                    <div className={styles.codeLine} key={item.lineNum}>
                      <span className={styles.lineNum}>{item.lineNum}</span>
                      <span className={styles.codeText}>
                        {item.lineNum === 1 && (
                          <>
                            <span className={styles.syntaxPreproc}>#include</span>{' '}
                            <span className={styles.syntaxString}>&lt;stdio.h&gt;</span>
                          </>
                        )}
                        {item.lineNum === 3 && (
                          <>
                            <span className={styles.syntaxType}>int</span>{' '}
                            <span className={styles.syntaxFunc}>main</span>
                            <span className={styles.syntaxPunct}>(</span>
                            <span className={styles.syntaxType}>void</span>
                            <span className={styles.syntaxPunct}>) {'{'}</span>
                          </>
                        )}
                        {item.lineNum === 4 && (
                          <>
                            {'    '}
                            <span className={styles.syntaxType}>int</span> a, b, sum;
                          </>
                        )}
                        {item.lineNum === 12 && (
                          <>
                            {'    '}
                            <span className={styles.syntaxKeyword}>return</span>{' '}
                            <span className={styles.syntaxNum}>0</span>;
                          </>
                        )}
                        {item.lineNum === 13 && '}'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ==========================================================
              ZONE 3 (RIGHT): Input Prompt & Program Output Terminals
              ========================================================== */}
          <div className={styles.rightColumn}>
            {/* Terminal 1: Input Prompt */}
            <div
              className={`${styles.terminalCard} ${
                activeStage === 'prompt' ? styles.terminalCardActive : ''
              }`}
              id="hero-terminal-prompt"
              onClick={() => handleStageChange('prompt')}
              role="button"
              tabIndex={0}
            >
              <div className={styles.terminalCardHeader}>
                <div className={`${styles.terminalIconBadge} ${styles.promptIconBadge}`}>
                  <Terminal size={15} />
                </div>
                <div className={styles.terminalMeta}>
                  <h4 className={styles.terminalTitle}>Input Prompt (Output)</h4>
                  <p className={styles.terminalSubtitle}>
                    Program asks for input using <code>printf()</code>.
                  </p>
                </div>
              </div>

              <div className={styles.terminalScreen}>
                <div className={styles.terminalScreenHeader}>
                  <span className={`${styles.terminalDot} ${styles.macDotRed}`} />
                  <span className={`${styles.terminalDot} ${styles.macDotAmber}`} />
                  <span className={`${styles.terminalDot} ${styles.macDotGreen}`} />
                </div>
                <div className={styles.terminalContent}>
                  <span className={styles.terminalPromptLine}>Enter two integers: </span>
                  <span className={styles.terminalValueEntered}>{userInput}</span>
                  <span className={styles.cursorBlink} />
                </div>
              </div>
            </div>

            {/* Terminal 2: Program Output */}
            <div
              className={`${styles.terminalCard} ${
                activeStage === 'output' || activeStage === 'processing'
                  ? styles.terminalCardActive
                  : ''
              }`}
              id="hero-terminal-output"
              onClick={() => handleStageChange('output')}
              role="button"
              tabIndex={0}
            >
              <div className={styles.terminalCardHeader}>
                <div className={`${styles.terminalIconBadge} ${styles.outputIconBadge}`}>
                  <Monitor size={15} />
                </div>
                <div className={styles.terminalMeta}>
                  <h4 className={styles.terminalTitle}>Program Output</h4>
                  <p className={styles.terminalSubtitle}>
                    Result is displayed using <code>printf()</code>.
                  </p>
                </div>
              </div>

              <div className={styles.terminalScreen}>
                <div className={styles.terminalScreenHeader}>
                  <span className={`${styles.terminalDot} ${styles.macDotRed}`} />
                  <span className={`${styles.terminalDot} ${styles.macDotAmber}`} />
                  <span className={`${styles.terminalDot} ${styles.macDotGreen}`} />
                </div>
                <div className={styles.terminalContent}>
                  <div className={styles.terminalPromptLine}>
                    Enter two integers:{' '}
                    <span className={styles.terminalValueEntered}>{userInput || '...'}</span>
                  </div>

                  {isValidTwoInts && (
                    <div className={styles.terminalResultLine}>
                      Sum = {calculatedSum}
                    </div>
                  )}

                  {hasInputError && (
                    <div className={styles.terminalErrorLine}>
                      Invalid input.
                    </div>
                  )}

                  {!hasInputError && !isValidTwoInts && (
                    <div style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.8rem' }}>
                      [Waiting for 2 integers...]
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
