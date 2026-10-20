import { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import styles from './FunctionCallVisualizerSection.module.css';

interface StepInfo {
  stepIndex: number;
  badge: string;
  description: string;
  activeNode: 'main-call' | 'args' | 'add-body' | 'process' | 'return-val' | 'main-result';
}

export function FunctionCallVisualizerSection() {
  // Dynamic user-customizable arguments
  const [argA, setArgA] = useState<number>(10);
  const [argB, setArgB] = useState<number>(20);

  // Playback state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const calculatedSum = argA + argB;

  const steps: StepInfo[] = [
    {
      stepIndex: 1,
      badge: 'Step 1 of 6 · Call Site in main()',
      description: `main() evaluates the call statement: int result = add(${argA}, ${argB});. Program counter prepares to transfer control.`,
      activeNode: 'main-call',
    },
    {
      stepIndex: 2,
      badge: 'Step 2 of 6 · Passing Arguments',
      description: `Concrete values ${argA} and ${argB} are copied across the calling convention boundary into formal parameters a and b.`,
      activeNode: 'args',
    },
    {
      stepIndex: 3,
      badge: 'Step 3 of 6 · Entering add() Body',
      description: `Execution enters the called function add(). The formal parameters hold a = ${argA} and b = ${argB}.`,
      activeNode: 'add-body',
    },
    {
      stepIndex: 4,
      badge: 'Step 4 of 6 · Evaluating Expression',
      description: `The expression a + b is evaluated inside the ALU: ${argA} + ${argB} yields ${calculatedSum}.`,
      activeNode: 'process',
    },
    {
      stepIndex: 5,
      badge: 'Step 5 of 6 · Return Statement Triggered',
      description: `return ${calculatedSum}; places the computed integer into the return register (e.g. %eax). Function stack frame unwinds.`,
      activeNode: 'return-val',
    },
    {
      stepIndex: 6,
      badge: 'Step 6 of 6 · Control Returns to main()',
      description: `Execution resumes in main(). The variable result receives ${calculatedSum}. Control continues to the next statement.`,
      activeNode: 'main-result',
    },
  ];

  const activeStepInfo = steps[currentStep - 1] || steps[0];

  // Auto-play timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1800);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, steps.length]);

  const handlePrevious = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.min(steps.length, prev + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(1);
  };

  const handleReplay = () => {
    setCurrentStep(1);
    setIsPlaying(true);
  };

  const handleResetInputs = () => {
    setArgA(10);
    setArgB(20);
    setCurrentStep(1);
    setIsPlaying(false);
  };

  return (
    <section className={styles.sectionWrapper} id="visual-function-flow">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.indexBadge}>06</span>
          <h2 className={styles.sectionTitle}>Visual Flow of Function Call</h2>
          <p className={styles.sectionSubtitle}>
            When a function is called, control moves to the function, the code executes, and the
            result is returned to the caller.
          </p>
        </div>

        {/* Interactive Arguments Customizer */}
        <div className={styles.argsControlBar}>
          <div className={styles.argsInputsGroup}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
              <Sparkles size={14} style={{ display: 'inline', marginRight: 4, color: '#2563eb' }} />
              Test with custom arguments:
            </span>

            <label className={styles.argInputLabel}>
              <span>Arg 1 (a):</span>
              <input
                type="number"
                value={argA}
                onChange={(e) => {
                  setArgA(parseInt(e.target.value) || 0);
                  setCurrentStep(1);
                  setIsPlaying(false);
                }}
                className={styles.argInputField}
              />
            </label>

            <label className={styles.argInputLabel}>
              <span>Arg 2 (b):</span>
              <input
                type="number"
                value={argB}
                onChange={(e) => {
                  setArgB(parseInt(e.target.value) || 0);
                  setCurrentStep(1);
                  setIsPlaying(false);
                }}
                className={styles.argInputField}
              />
            </label>
          </div>

          <button
            type="button"
            className={styles.argsResetBtn}
            onClick={handleResetInputs}
            title="Reset arguments to default (10, 20)"
          >
            Reset Arguments (10, 20)
          </button>
        </div>

        {/* ── VISUAL FLOW STAGE SVG ── */}
        <div className={styles.flowStageCard}>
          <div className={styles.diagramSvgWrapper}>
            <svg
              className={styles.diagramSvg}
              viewBox="0 0 920 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Arrowhead Markers */}
                <marker
                  id="flow-arrow-blue"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563EB" />
                </marker>
                <marker
                  id="flow-arrow-teal"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
                </marker>
                <marker
                  id="flow-arrow-green-dashed"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10B981" />
                </marker>
              </defs>

              {/* 1. Connector: Calling function (main) -> Called function (add) */}
              <path
                d="M 195 90 L 390 90"
                stroke={currentStep >= 2 ? '#2563EB' : '#94a3b8'}
                strokeWidth={currentStep >= 2 ? '2.4' : '1.8'}
                markerEnd="url(#flow-arrow-blue)"
              />

              {/* 2. Connector: Called function (add) -> Result in main */}
              <path
                d="M 590 90 L 710 90"
                stroke={currentStep >= 5 ? '#059669' : '#94a3b8'}
                strokeWidth={currentStep >= 5 ? '2.4' : '1.8'}
                markerEnd="url(#flow-arrow-teal)"
              />

              {/* 3. Return Loop Connector: Bottom of Result back to main() */}
              <path
                d="M 760 145 C 760 235, 150 235, 150 145"
                stroke={currentStep === 6 ? '#10B981' : '#cbd5e1'}
                strokeWidth={currentStep === 6 ? '2.2' : '1.6'}
                strokeDasharray="5 4"
                markerEnd="url(#flow-arrow-green-dashed)"
              />
              <text
                x="455"
                y="245"
                textAnchor="middle"
                style={{
                  fill: currentStep === 6 ? '#059669' : '#64748b',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Control returns to main()
              </text>

              {/* ==========================================================
                  NODE 1: main() - CALLING FUNCTION (Left Box)
                  ========================================================== */}
              <g>
                <rect
                  x="30"
                  y="45"
                  width="165"
                  height="90"
                  className={`${styles.nodeCallingBox} ${
                    currentStep === 1 || currentStep === 2 ? styles.nodeActiveGlow : ''
                  }`}
                  style={{
                    fill: currentStep === 1 || currentStep === 2 ? '#eff6ff' : '#ffffff',
                  }}
                />
                <text x="112" y="72" textAnchor="middle" className={styles.nodeHeaderBlue}>
                  main()
                </text>
                <text x="112" y="98" textAnchor="middle" className={styles.nodeCodeText}>
                  int result =
                </text>
                <text
                  x="112"
                  y="118"
                  textAnchor="middle"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    fontWeight: 700,
                    fill: currentStep >= 1 ? '#2563eb' : '#1e293b',
                  }}
                >
                  add({argA}, {argB});
                </text>
                {/* Subtitle tag below box */}
                <rect x="52" y="145" width="120" height="24" rx="12" fill="#dbeafe" />
                <text x="112" y="161" textAnchor="middle" fill="#1e40af" style={{ fontSize: 11, fontWeight: 700 }}>
                  Calling function
                </text>
              </g>

              {/* ==========================================================
                  ARGUMENTS PILL (Floating over Blue Connector)
                  ========================================================== */}
              <g>
                <rect
                  x="235"
                  y="55"
                  width="115"
                  height="45"
                  rx="10"
                  fill="#ffffff"
                  stroke={currentStep >= 2 ? '#2563eb' : '#cbd5e1'}
                  strokeWidth="1.6"
                  style={{
                    filter: currentStep === 2 ? 'drop-shadow(0 0 8px rgba(37,99,235,0.3))' : undefined,
                  }}
                />
                <text x="292" y="73" textAnchor="middle" style={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}>
                  Arguments
                </text>
                <text
                  x="292"
                  y="90"
                  textAnchor="middle"
                  style={{
                    fontSize: 12,
                    fill: currentStep >= 2 ? '#2563eb' : '#1e293b',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                  }}
                >
                  ({argA}, {argB})
                </text>
              </g>

              {/* ==========================================================
                  NODE 2: add() - CALLED FUNCTION (Center Box)
                  ========================================================== */}
              <g>
                <rect
                  x="390"
                  y="45"
                  width="200"
                  height="90"
                  className={`${styles.nodeCalledBox} ${
                    currentStep === 3 || currentStep === 4 ? styles.nodeAmberGlow : ''
                  }`}
                  style={{
                    fill: currentStep === 3 || currentStep === 4 ? '#fffbeb' : '#ffffff',
                  }}
                />
                <text x="490" y="72" textAnchor="middle" className={styles.nodeHeaderAmber}>
                  add()
                </text>
                <text
                  x="490"
                  y="98"
                  textAnchor="middle"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    fontWeight: 700,
                    fill: currentStep === 4 ? '#d97706' : '#1e293b',
                  }}
                >
                  {currentStep === 4 ? `${argA} + ${argB} → ${calculatedSum}` : 'return a + b;'}
                </text>
                <text x="490" y="118" textAnchor="middle" style={{ fontSize: 10, fill: '#64748b' }}>
                  {currentStep >= 3 ? `a = ${argA}, b = ${argB}` : 'Parameters: a, b'}
                </text>
                {/* Subtitle tag below box */}
                <rect x="430" y="145" width="120" height="24" rx="12" fill="#fef3c7" />
                <text x="490" y="161" textAnchor="middle" fill="#b45309" style={{ fontSize: 11, fontWeight: 700 }}>
                  Called function
                </text>
              </g>

              {/* ==========================================================
                  RETURNED VALUE PILL (Floating over Green Connector)
                  ========================================================== */}
              <g>
                <rect
                  x="615"
                  y="55"
                  width="95"
                  height="45"
                  rx="10"
                  fill="#ffffff"
                  stroke={currentStep >= 5 ? '#10b981' : '#cbd5e1'}
                  strokeWidth="1.6"
                  style={{
                    filter: currentStep === 5 ? 'drop-shadow(0 0 8px rgba(16,185,129,0.3))' : undefined,
                  }}
                />
                <text x="662" y="73" textAnchor="middle" style={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}>
                  Returned value
                </text>
                <text
                  x="662"
                  y="90"
                  textAnchor="middle"
                  style={{
                    fontSize: 13,
                    fill: currentStep >= 5 ? '#059669' : '#94a3b8',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                  }}
                >
                  {calculatedSum}
                </text>
              </g>

              {/* ==========================================================
                  NODE 3: main() - USE THE RESULT (Right Box)
                  ========================================================== */}
              <g>
                <rect
                  x="710"
                  y="45"
                  width="165"
                  height="90"
                  className={`${styles.nodeResultBox} ${
                    currentStep === 6 ? styles.nodeGreenGlow : ''
                  }`}
                  style={{
                    fill: currentStep === 6 ? '#ecfdf5' : '#ffffff',
                  }}
                />
                <text x="792" y="72" textAnchor="middle" className={styles.nodeHeaderGreen}>
                  main()
                </text>
                <text x="792" y="98" textAnchor="middle" className={styles.nodeCodeText}>
                  result = {currentStep === 6 ? calculatedSum : '?'};
                </text>
                <text x="792" y="118" textAnchor="middle" style={{ fontSize: 11, fill: '#059669', fontWeight: 600 }}>
                  {currentStep === 6 ? `Sum = ${calculatedSum}` : 'Awaiting return'}
                </text>
                {/* Subtitle tag below box */}
                <rect x="732" y="145" width="120" height="24" rx="12" fill="#d1fae5" />
                <text x="792" y="161" textAnchor="middle" fill="#065f46" style={{ fontSize: 11, fontWeight: 700 }}>
                  Use the result
                </text>
              </g>
            </svg>
          </div>

          {/* Explanation Banner */}
          <div className={styles.stepBanner}>
            <div className={styles.stepBannerLeft}>
              <span className={styles.stepPill}>{activeStepInfo.badge}</span>
              <p className={styles.stepDescription}>{activeStepInfo.description}</p>
            </div>
          </div>

          {/* Player Controls */}
          <div className={styles.playerControls}>
            <div className={styles.playbackButtons}>
              <button
                type="button"
                className={styles.ctrlBtn}
                onClick={handlePrevious}
                disabled={currentStep === 1}
                aria-label="Previous execution step"
              >
                <SkipBack size={14} />
                <span>Previous</span>
              </button>

              <button
                type="button"
                className={`${styles.ctrlBtn} ${styles.ctrlBtnPrimary}`}
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                <span>{isPlaying ? 'Pause' : 'Play Flow'}</span>
              </button>

              <button
                type="button"
                className={styles.ctrlBtn}
                onClick={handleNext}
                disabled={currentStep === steps.length}
                aria-label="Next execution step"
              >
                <span>Next</span>
                <SkipForward size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                className={styles.ctrlBtn}
                onClick={handleReset}
                title="Reset simulation to step 1"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
              <button
                type="button"
                className={styles.ctrlBtn}
                onClick={handleReplay}
                title="Replay call sequence"
              >
                <Play size={14} fill="currentColor" />
                <span>Replay</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
