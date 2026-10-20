import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { TIME_MACHINE_PRESETS, type TimeMachinePreset } from '../../data/loopsLessonData';
import styles from './LoopTimeMachine.module.css';

export function LoopTimeMachine() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('for-basic');
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 0.5, 1, 1.5

  const currentPreset: TimeMachinePreset =
    TIME_MACHINE_PRESETS.find((p) => p.id === selectedPresetId) || TIME_MACHINE_PRESETS[0];

  const totalSteps = currentPreset.steps.length;
  const currentStep = currentPreset.steps[currentStepIdx] || currentPreset.steps[0];

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round(750 / playbackSpeed);
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, totalSteps]);

  const handlePresetChange = (presetId: string) => {
    setIsPlaying(false);
    setSelectedPresetId(presetId);
    setCurrentStepIdx(0);
  };

  const handleNext = () => {
    setIsPlaying(false);
    if (currentStepIdx < totalSteps - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setIsPlaying(false);
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handlePlayPause = () => {
    if (currentStepIdx >= totalSteps - 1) {
      // If at the end, restart and play
      setCurrentStepIdx(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const handleReplay = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
    setTimeout(() => setIsPlaying(true), 100);
  };

  // Split code into lines for display
  const codeLines = currentPreset.code.split('\n');

  // History of completed steps up to current
  const executedHistory = currentPreset.steps.slice(0, currentStepIdx + 1);

  return (
    <section className={styles.timeMachineSection} id="loop-time-machine">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>SIGNATURE INTERACTIVE FEATURE</span>
          </div>
          <h2 className={styles.mainHeading}>The Loop Time Machine</h2>
          <p className={styles.subHeading}>
            Step through deterministic C loop execution one instruction at a time. Observe how
            variables update, condition branches evaluate, and values stream to stdout.
          </p>

          {/* Preset Selector */}
          <div className={styles.presetsBar}>
            {TIME_MACHINE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`${styles.presetTab} ${
                  selectedPresetId === preset.id ? styles.presetTabActive : ''
                }`}
                onClick={() => handlePresetChange(preset.id)}
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        {/* ==========================================================
            3-REGION WORKSPACE: Source | Timeline | Memory & Output
            ========================================================== */}
        <div className={styles.workspaceGrid}>
          {/* ── REGION 1: SOURCE CODE ── */}
          <div className={styles.codeRegion}>
            <div className={styles.regionHeader}>
              <span>loops.c</span>
              <span>Step {currentStepIdx + 1} of {totalSteps}</span>
            </div>

            <div className={styles.codeScrollBody}>
              {codeLines.map((lineText, idx) => {
                const lineNum = idx + 1;
                const isCurrentActive = lineNum === currentStep.activeLine;
                return (
                  <div
                    key={lineNum}
                    className={`${styles.codeLine} ${isCurrentActive ? styles.activeCodeLine : ''}`}
                  >
                    <span className={styles.lineNum}>{lineNum}</span>
                    <span>{lineText}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── REGION 2: EXECUTION TIMELINE (SVG FLOW) ── */}
          <div className={styles.timelineRegion}>
            <div className={styles.regionTitleLight}>Execution Path</div>

            <div className={styles.svgTimelineContainer}>
              <svg
                className={styles.timelineSvg}
                viewBox="0 0 340 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <marker
                    id="tm-arrow"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
                  </marker>
                </defs>

                {/* Connecting lines */}
                <path d="M 75 40 L 105 40" stroke="#94a3b8" strokeWidth="1.6" markerEnd="url(#tm-arrow)" />
                <path d="M 175 40 L 205 40" stroke="#94a3b8" strokeWidth="1.6" markerEnd="url(#tm-arrow)" />
                <path d="M 240 60 L 240 95 L 205 95" stroke="#94a3b8" strokeWidth="1.6" markerEnd="url(#tm-arrow)" />
                <path d="M 135 95 L 90 95 C 75 95, 75 60, 105 45" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 140 60 L 140 135 L 175 135" stroke="#ef4444" strokeWidth="1.6" markerEnd="url(#tm-arrow)" />

                {/* Stage 1: Init */}
                <g>
                  <rect
                    x="15"
                    y="22"
                    width="60"
                    height="36"
                    rx="8"
                    fill={currentStep.stageName === 'Init' ? '#2563EB' : '#1e293b'}
                    stroke={currentStep.stageName === 'Init' ? '#93c5fd' : 'none'}
                    strokeWidth="2"
                  />
                  <text x="45" y="44" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle">
                    Init
                  </text>
                </g>

                {/* Stage 2: Condition */}
                <g>
                  <polygon
                    points="140,20 175,40 140,60 105,40"
                    fill={currentStep.stageName === 'Condition' ? '#2563EB' : '#ffffff'}
                    stroke={currentStep.stageName === 'Condition' ? '#3b82f6' : '#334155'}
                    strokeWidth="2"
                  />
                  <text
                    x="140"
                    y="43"
                    fill={currentStep.stageName === 'Condition' ? '#ffffff' : '#0f172a'}
                    fontSize="9"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    Condition
                  </text>
                </g>

                {/* Stage 3: Body */}
                <g>
                  <rect
                    x="205"
                    y="22"
                    width="65"
                    height="36"
                    rx="8"
                    fill={currentStep.stageName === 'Body' ? '#2563EB' : '#1e293b'}
                    stroke={currentStep.stageName === 'Body' ? '#93c5fd' : 'none'}
                    strokeWidth="2"
                  />
                  <text x="237" y="44" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle">
                    Body
                  </text>
                </g>

                {/* Stage 4: Update */}
                <g>
                  <rect
                    x="135"
                    y="78"
                    width="70"
                    height="34"
                    rx="8"
                    fill={currentStep.stageName === 'Update' ? '#2563EB' : '#1e293b'}
                    stroke={currentStep.stageName === 'Update' ? '#93c5fd' : 'none'}
                    strokeWidth="2"
                  />
                  <text x="170" y="99" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle">
                    Update
                  </text>
                </g>

                {/* Stage 5: Exit */}
                <g>
                  <rect
                    x="175"
                    y="120"
                    width="65"
                    height="30"
                    rx="6"
                    fill={currentStep.stageName === 'Exit' ? '#dc2626' : '#fff1f2'}
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                  />
                  <text
                    x="207"
                    y="139"
                    fill={currentStep.stageName === 'Exit' ? '#ffffff' : '#e11d48'}
                    fontSize="10"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    Exit
                  </text>
                </g>
              </svg>
            </div>

            {/* Current Step Explanation */}
            <div className={styles.stepExplanationCard}>
              <span className={styles.stepStageBadge}>
                {currentStep.stageName} · Step {currentStepIdx + 1}
              </span>
              <p className={styles.stepExplanationText}>{currentStep.explanation}</p>
            </div>
          </div>

          {/* ── REGION 3: LIVE MEMORY & TERMINAL OUTPUT ── */}
          <div className={styles.memoryRegion}>
            <div className={styles.regionTitleLight}>Live Memory Watch</div>

            <div className={styles.watchBlock}>
              <div className={styles.watchItem}>
                <span className={styles.watchLabel}>Variable (i):</span>
                <span className={styles.watchValue}>{currentStep.variableValue}</span>
              </div>

              <div className={styles.watchItem}>
                <span className={styles.watchLabel}>Condition State:</span>
                <span
                  className={`${styles.watchValue} ${
                    currentStep.conditionMet ? styles.watchValueTrue : styles.watchValueFalse
                  }`}
                >
                  {currentStep.conditionExpr}
                </span>
              </div>

              <div className={styles.watchItem}>
                <span className={styles.watchLabel}>Total Iterations:</span>
                <span className={styles.watchValue}>
                  {currentStep.outputList.length} completed
                </span>
              </div>
            </div>

            {/* Simulated Stdout Terminal */}
            <div className={styles.outputTerminalBox}>
              <div className={styles.outputTerminalHeader}>Terminal Output (stdout)</div>
              <div className={styles.outputTerminalContent}>
                {currentStep.outputList.length === 0 ? (
                  <span style={{ color: '#64748b', fontStyle: 'italic' }}>
                    [Waiting for first printf...]
                  </span>
                ) : (
                  currentStep.outputList.map((line, idx) => (
                    <div key={idx}>&gt; {line}</div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================
            EXECUTION CONTROLS BAR
            ========================================================== */}
        <div className={styles.controlsBar}>
          <div className={styles.navButtonGroup}>
            <button
              type="button"
              className={styles.controlBtn}
              onClick={handlePrevious}
              disabled={currentStepIdx === 0}
              aria-label="Previous execution step"
            >
              <SkipBack size={15} />
              <span>Previous</span>
            </button>

            <button
              type="button"
              className={`${styles.controlBtn} ${styles.playBtn}`}
              onClick={handlePlayPause}
              aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleNext}
              disabled={currentStepIdx >= totalSteps - 1}
              aria-label="Next execution step"
            >
              <span>Next</span>
              <SkipForward size={15} />
            </button>

            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleReset}
              aria-label="Reset execution"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleReplay}
              aria-label="Replay full execution"
            >
              <span>Replay</span>
            </button>
          </div>

          {/* Speed Selector */}
          <div className={styles.speedGroup}>
            <span className={styles.speedLabel}>Speed:</span>
            {[0.5, 1, 1.5].map((spd) => (
              <button
                key={spd}
                type="button"
                className={`${styles.speedBtn} ${
                  playbackSpeed === spd ? styles.speedBtnActive : ''
                }`}
                onClick={() => setPlaybackSpeed(spd)}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* ==========================================================
            LIVE ITERATION INSPECTOR TABLE (Click to scrub history)
            ========================================================== */}
        <div className={styles.inspectorContainer}>
          <h4 className={styles.inspectorTitle}>Execution Event History</h4>
          <p className={styles.inspectorSubtitle}>
            Click any recorded step in the table below to scrub the Time Machine directly to that point in execution.
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.inspectorTable}>
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Stage</th>
                  <th>Active Code Line</th>
                  <th>Variable i</th>
                  <th>Condition State</th>
                  <th>Output State</th>
                </tr>
              </thead>
              <tbody>
                {executedHistory.map((step) => {
                  const isCurrent = step.stepIndex === currentStepIdx;
                  return (
                    <tr
                      key={step.stepIndex}
                      className={`${styles.inspectorRow} ${
                        isCurrent ? styles.activeInspectorRow : ''
                      }`}
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStepIdx(step.stepIndex);
                      }}
                    >
                      <td>#{step.stepIndex + 1}</td>
                      <td>
                        <span
                          style={{
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: isCurrent ? '#2563EB' : '#e2e8f0',
                            color: isCurrent ? '#ffffff' : '#334155',
                            fontWeight: 700,
                            fontSize: '0.72rem',
                          }}
                        >
                          {step.stageName}
                        </span>
                      </td>
                      <td>
                        <code style={{ fontFamily: 'ui-monospace, monospace' }}>
                          {codeLines[step.activeLine - 1]?.trim() || `Line ${step.activeLine}`}
                        </code>
                      </td>
                      <td>i = {step.variableValue}</td>
                      <td>{step.conditionExpr}</td>
                      <td>
                        {step.outputList.length > 0 ? (
                          <span>[{step.outputList.join(', ')}]</span>
                        ) : (
                          <span style={{ color: '#94a3b8' }}>None</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
