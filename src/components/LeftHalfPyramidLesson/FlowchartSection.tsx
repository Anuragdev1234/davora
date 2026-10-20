import { useState } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';
import styles from './FlowchartSection.module.css';

interface FlowchartSectionProps {
  activeNodeId?: string;
  onSelectNode?: (id: string) => void;
}

interface FlowNode {
  id: string;
  name: string;
  type: 'stadium' | 'rect' | 'diamond' | 'parallelogram';
  desc: string;
  trueTarget?: string;
  falseTarget?: string;
}

const FLOWCHART_NODES: FlowNode[] = [
  {
    id: 'start',
    name: 'Start',
    type: 'stadium',
    desc: 'Operating system loads the binary and begins execution at main(void).',
  },
  {
    id: 'input-n',
    name: 'Input n (1..10)',
    type: 'parallelogram',
    desc: 'Prompt the user for total rows n and read via scanf("%d", &n).',
  },
  {
    id: 'valid-n',
    name: '1 <= n <= 10 ?',
    type: 'diamond',
    desc: 'Validate user input: verify n is an integer between 1 and 10.',
    trueTarget: 'init-i (Proceed to initialize outer loop)',
    falseTarget: 'end (Print error and return 1)',
  },
  {
    id: 'init-i',
    name: 'i = 1',
    type: 'rect',
    desc: 'Initialize the outer row counter: i = 1 (first row at the top).',
  },
  {
    id: 'cond-i',
    name: 'i <= n ?',
    type: 'diamond',
    desc: 'Outer loop condition: Is row counter i still within total rows n?',
    trueTarget: 'init-j (Begin row generation: spaces then stars)',
    falseTarget: 'end (All rows printed, terminate with code 0)',
  },
  {
    id: 'init-j',
    name: 'j = 1 (Spaces)',
    type: 'rect',
    desc: 'Initialize first inner loop counter j = 1 to print leading whitespace.',
  },
  {
    id: 'cond-j',
    name: 'j <= n - i ?',
    type: 'diamond',
    desc: 'Inner loop 1 condition: Are there still leading space units remaining for row i?',
    trueTarget: 'print-space (Emit two space characters "  ")',
    falseTarget: 'init-k (All spaces printed; start printing stars)',
  },
  {
    id: 'print-space',
    name: 'Print "  "',
    type: 'parallelogram',
    desc: 'Output two spaces to indent the terminal cursor to the right.',
  },
  {
    id: 'inc-j',
    name: 'j++',
    type: 'rect',
    desc: 'Increment space counter j by 1 and re-evaluate j <= n - i.',
  },
  {
    id: 'init-k',
    name: 'k = 1 (Stars)',
    type: 'rect',
    desc: 'Initialize second inner loop counter k = 1 to print row i asterisks.',
  },
  {
    id: 'cond-k',
    name: 'k <= i ?',
    type: 'diamond',
    desc: 'Inner loop 2 condition: Have we printed all i asterisks for this row?',
    trueTarget: 'print-star (Emit star and space "* ")',
    falseTarget: 'print-newline (Row finished; advance cursor to next line)',
  },
  {
    id: 'print-star',
    name: 'Print "* "',
    type: 'parallelogram',
    desc: 'Output one asterisk followed by a space to standard output.',
  },
  {
    id: 'inc-k',
    name: 'k++',
    type: 'rect',
    desc: 'Increment star counter k by 1 and re-evaluate k <= i.',
  },
  {
    id: 'print-newline',
    name: 'Print "\\n"',
    type: 'parallelogram',
    desc: 'Send newline character to standard output to start a new console row.',
  },
  {
    id: 'inc-i',
    name: 'i++',
    type: 'rect',
    desc: 'Increment row counter i = i + 1 to prepare for the next lower row.',
  },
  {
    id: 'end',
    name: 'Stop / Return 0',
    type: 'stadium',
    desc: 'Execution terminates cleanly, returning exit code 0 to the OS.',
  },
];

export function FlowchartSection({
  activeNodeId,
  onSelectNode,
}: FlowchartSectionProps) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeIndex = activeNodeId
    ? Math.max(
        0,
        FLOWCHART_NODES.findIndex((n) => n.id === activeNodeId)
      )
    : internalActiveIndex;

  const currentNode = FLOWCHART_NODES[activeIndex] || FLOWCHART_NODES[0];

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % FLOWCHART_NODES.length;
    setInternalActiveIndex(nextIdx);
    onSelectNode?.(FLOWCHART_NODES[nextIdx].id);
  };

  const handlePrev = () => {
    const prevIdx =
      (activeIndex - 1 + FLOWCHART_NODES.length) % FLOWCHART_NODES.length;
    setInternalActiveIndex(prevIdx);
    onSelectNode?.(FLOWCHART_NODES[prevIdx].id);
  };

  const handleReset = () => {
    setInternalActiveIndex(0);
    setIsPlaying(false);
    onSelectNode?.(FLOWCHART_NODES[0].id);
  };

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      const timer = setInterval(() => {
        setInternalActiveIndex((prev) => {
          if (prev >= FLOWCHART_NODES.length - 1) {
            clearInterval(timer);
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1;
          onSelectNode?.(FLOWCHART_NODES[next].id);
          return next;
        });
      }, 1500);
    } else {
      setIsPlaying(false);
    }
  };

  const isNodeActive = (id: string) => currentNode.id === id;

  const getNodeColor = (id: string) => {
    return isNodeActive(id) ? '#2563eb' : '#27272a';
  };

  const getNodeFill = (id: string) => {
    return isNodeActive(id) ? '#eff6ff' : '#ffffff';
  };

  return (
    <section className={styles.section} id="flowchart-section" aria-label="05 Visualize the Logic">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionNumber}>05 / Visualize the Logic</div>
          <h2 className={styles.sectionTitle}>Dual-Loop Architecture Flowchart</h2>
          <p className={styles.sectionDesc}>
            Trace the dual inner loops: Outer loop tracks row <code>i</code>. First inner loop prints <code>n - i</code> spaces,
            then second inner loop prints <code>i</code> stars, concluded by <code>\n</code> before incrementing <code>i</code>.
          </p>
        </div>

        {/* Stepper Controls Bar */}
        <div className={styles.controlsBar}>
          <div className={styles.controlsLeft}>
            <button
              type="button"
              className={styles.controlBtn}
              onClick={handlePrev}
              aria-label="Previous flowchart node"
            >
              <ArrowLeft size={14} />
              <span>Previous</span>
            </button>

            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleNext}
              aria-label="Next flowchart node"
            >
              <span>Next</span>
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              className={styles.controlBtn}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause trace' : 'Auto trace'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'Pause' : 'Auto Trace'}</span>
            </button>

            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleReset}
              aria-label="Reset flowchart trace"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>

          <div className={styles.nodeTracker}>
            Active Node: <strong>{currentNode.name}</strong> ({activeIndex + 1} of{' '}
            {FLOWCHART_NODES.length})
          </div>
        </div>

        {/* Two-Column Flowchart Viewport + Node Explainer */}
        <div className={styles.flowchartGrid}>
          <div className={styles.svgViewport}>
            <svg
              className={styles.flowchartSvg}
              viewBox="0 0 680 1280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* DEFINITIONS / ARROW MARKERS */}
              <defs>
                <marker
                  id="left-arrowhead"
                  markerWidth="8"
                  markerHeight="6"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="#71717a" />
                </marker>
                <marker
                  id="left-arrowhead-active"
                  markerWidth="8"
                  markerHeight="6"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="#2563eb" />
                </marker>
              </defs>

              {/* CONNECTING ARROWS */}
              {/* 1. Start -> Input n */}
              <path d="M 340 55 L 340 90" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />

              {/* 2. Input n -> Valid n */}
              <path d="M 340 140 L 340 175" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />

              {/* 3. Valid n -> Init i (True: down) */}
              <path d="M 340 245 L 340 280" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />
              <text x="350" y="265" fill="#16a34a" fontSize="11" fontWeight="700">True</text>

              {/* 3b. Valid n -> End (False: far right and down) */}
              <path d="M 430 210 L 620 210 L 620 1210 L 420 1210" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#left-arrowhead)" />
              <text x="445" y="202" fill="#dc2626" fontSize="11" fontWeight="700">False (Exit 1)</text>

              {/* 4. Init i -> Cond i */}
              <path d="M 340 330 L 340 365" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />

              {/* 5. Cond i -> Init j (True: down) */}
              <path d="M 340 435 L 340 470" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />
              <text x="350" y="455" fill="#16a34a" fontSize="11" fontWeight="700">True</text>

              {/* 5b. Cond i -> End (False: right and down) */}
              <path d="M 430 400 L 570 400 L 570 1210 L 420 1210" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#left-arrowhead)" />
              <text x="445" y="392" fill="#dc2626" fontSize="11" fontWeight="700">False (i &gt; n)</text>

              {/* 6. Init j -> Cond j */}
              <path d="M 340 520 L 340 555" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />

              {/* 7. Cond j -> Print space (True: down) */}
              <path d="M 340 625 L 340 660" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />
              <text x="350" y="645" fill="#16a34a" fontSize="11" fontWeight="700">True</text>

              {/* 8. Print space -> Inc j */}
              <path d="M 340 705 L 340 735" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />

              {/* 9. Inc j -> Loopback to Cond j (left and up) */}
              <path d="M 270 755 L 180 755 L 180 590 L 240 590" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />

              {/* 7b. Cond j -> Init k (False: right and down) */}
              <path d="M 440 590 L 500 590 L 500 815 L 420 815" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />
              <text x="448" y="582" fill="#dc2626" fontSize="11" fontWeight="700">False (j &gt; n - i)</text>

              {/* 10. Init k -> Cond k */}
              <path d="M 340 840 L 340 875" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />

              {/* 11. Cond k -> Print star (True: down) */}
              <path d="M 340 945 L 340 980" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />
              <text x="350" y="965" fill="#16a34a" fontSize="11" fontWeight="700">True</text>

              {/* 12. Print star -> Inc k */}
              <path d="M 340 1025 L 340 1055" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />

              {/* 13. Inc k -> Loopback to Cond k (left and up) */}
              <path d="M 270 1075 L 180 1075 L 180 910 L 250 910" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />

              {/* 11b. Cond k -> Print newline (False: right and down) */}
              <path d="M 430 910 L 490 910 L 490 1135 L 420 1135" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />
              <text x="438" y="902" fill="#dc2626" fontSize="11" fontWeight="700">False (k &gt; i)</text>

              {/* 14. Print newline -> Inc i */}
              <path d="M 340 1160 L 340 1180" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />

              {/* 15. Inc i -> Loopback to Cond i (far left and up) */}
              <path d="M 270 1200 L 90 1200 L 90 400 L 250 400" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#left-arrowhead)" />

              {/* 1. START (Stadium: cx=340, cy=35) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('start')}>
                <rect
                  x="265"
                  y="15"
                  width="150"
                  height="40"
                  rx="20"
                  fill={getNodeFill('start')}
                  stroke={getNodeColor('start')}
                  strokeWidth={isNodeActive('start') ? 2.5 : 1.5}
                />
                <text x="340" y="40" textAnchor="middle" fill={getNodeColor('start')} fontSize="13" fontWeight="600">
                  Start
                </text>
              </g>

              {/* 2. INPUT N (Parallelogram: cx=340, cy=115) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('input-n')}>
                <polygon
                  points="260,90 440,90 420,140 240,140"
                  fill={getNodeFill('input-n')}
                  stroke={getNodeColor('input-n')}
                  strokeWidth={isNodeActive('input-n') ? 2.5 : 1.5}
                />
                <text x="340" y="120" textAnchor="middle" fill={getNodeColor('input-n')} fontSize="13" fontWeight="600">
                  Input n (1..10)
                </text>
              </g>

              {/* 3. VALID N (Diamond: cx=340, cy=210) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('valid-n')}>
                <polygon
                  points="340,175 430,210 340,245 250,210"
                  fill={getNodeFill('valid-n')}
                  stroke={getNodeColor('valid-n')}
                  strokeWidth={isNodeActive('valid-n') ? 2.5 : 1.5}
                />
                <text x="340" y="214" textAnchor="middle" fill={getNodeColor('valid-n')} fontSize="12" fontWeight="600">
                  1 &le; n &le; 10 ?
                </text>
              </g>

              {/* 4. INIT I (Rect: cx=340, cy=305) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('init-i')}>
                <rect
                  x="260"
                  y="280"
                  width="160"
                  height="50"
                  rx="6"
                  fill={getNodeFill('init-i')}
                  stroke={getNodeColor('init-i')}
                  strokeWidth={isNodeActive('init-i') ? 2.5 : 1.5}
                />
                <text x="340" y="310" textAnchor="middle" fill={getNodeColor('init-i')} fontSize="13" fontWeight="600">
                  i = 1
                </text>
              </g>

              {/* 5. COND I (Diamond: cx=340, cy=400) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('cond-i')}>
                <polygon
                  points="340,365 430,400 340,435 250,400"
                  fill={getNodeFill('cond-i')}
                  stroke={getNodeColor('cond-i')}
                  strokeWidth={isNodeActive('cond-i') ? 2.5 : 1.5}
                />
                <text x="340" y="405" textAnchor="middle" fill={getNodeColor('cond-i')} fontSize="13" fontWeight="600">
                  i &le; n ?
                </text>
              </g>

              {/* 6. INIT J (Rect: cx=340, cy=495) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('init-j')}>
                <rect
                  x="250"
                  y="470"
                  width="180"
                  height="50"
                  rx="6"
                  fill={getNodeFill('init-j')}
                  stroke={getNodeColor('init-j')}
                  strokeWidth={isNodeActive('init-j') ? 2.5 : 1.5}
                />
                <text x="340" y="500" textAnchor="middle" fill={getNodeColor('init-j')} fontSize="13" fontWeight="600">
                  j = 1 (Spaces)
                </text>
              </g>

              {/* 7. COND J (Diamond: cx=340, cy=590) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('cond-j')}>
                <polygon
                  points="340,555 440,590 340,625 240,590"
                  fill={getNodeFill('cond-j')}
                  stroke={getNodeColor('cond-j')}
                  strokeWidth={isNodeActive('cond-j') ? 2.5 : 1.5}
                />
                <text x="340" y="594" textAnchor="middle" fill={getNodeColor('cond-j')} fontSize="12" fontWeight="600">
                  j &le; n - i ?
                </text>
              </g>

              {/* 8. PRINT SPACE (Parallelogram: cx=340, cy=682) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('print-space')}>
                <polygon
                  points="270,660 430,660 410,705 250,705"
                  fill={getNodeFill('print-space')}
                  stroke={getNodeColor('print-space')}
                  strokeWidth={isNodeActive('print-space') ? 2.5 : 1.5}
                />
                <text x="340" y="688" textAnchor="middle" fill={getNodeColor('print-space')} fontSize="13" fontWeight="600">
                  Print &quot;  &quot;
                </text>
              </g>

              {/* 9. INC J (Rect: cx=340, cy=755) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('inc-j')}>
                <rect
                  x="270"
                  y="735"
                  width="140"
                  height="40"
                  rx="6"
                  fill={getNodeFill('inc-j')}
                  stroke={getNodeColor('inc-j')}
                  strokeWidth={isNodeActive('inc-j') ? 2.5 : 1.5}
                />
                <text x="340" y="760" textAnchor="middle" fill={getNodeColor('inc-j')} fontSize="13" fontWeight="600">
                  j++
                </text>
              </g>

              {/* 10. INIT K (Rect: cx=340, cy=815) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('init-k')}>
                <rect
                  x="250"
                  y="790"
                  width="180"
                  height="50"
                  rx="6"
                  fill={getNodeFill('init-k')}
                  stroke={getNodeColor('init-k')}
                  strokeWidth={isNodeActive('init-k') ? 2.5 : 1.5}
                />
                <text x="340" y="820" textAnchor="middle" fill={getNodeColor('init-k')} fontSize="13" fontWeight="600">
                  k = 1 (Stars)
                </text>
              </g>

              {/* 11. COND K (Diamond: cx=340, cy=910) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('cond-k')}>
                <polygon
                  points="340,875 430,910 340,945 250,910"
                  fill={getNodeFill('cond-k')}
                  stroke={getNodeColor('cond-k')}
                  strokeWidth={isNodeActive('cond-k') ? 2.5 : 1.5}
                />
                <text x="340" y="915" textAnchor="middle" fill={getNodeColor('cond-k')} fontSize="13" fontWeight="600">
                  k &le; i ?
                </text>
              </g>

              {/* 12. PRINT STAR (Parallelogram: cx=340, cy=1002) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('print-star')}>
                <polygon
                  points="270,980 430,980 410,1025 250,1025"
                  fill={getNodeFill('print-star')}
                  stroke={getNodeColor('print-star')}
                  strokeWidth={isNodeActive('print-star') ? 2.5 : 1.5}
                />
                <text x="340" y="1008" textAnchor="middle" fill={getNodeColor('print-star')} fontSize="13" fontWeight="600">
                  Print &quot;* &quot;
                </text>
              </g>

              {/* 13. INC K (Rect: cx=340, cy=1075) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('inc-k')}>
                <rect
                  x="270"
                  y="1055"
                  width="140"
                  height="40"
                  rx="6"
                  fill={getNodeFill('inc-k')}
                  stroke={getNodeColor('inc-k')}
                  strokeWidth={isNodeActive('inc-k') ? 2.5 : 1.5}
                />
                <text x="340" y="1080" textAnchor="middle" fill={getNodeColor('inc-k')} fontSize="13" fontWeight="600">
                  k++
                </text>
              </g>

              {/* 14. PRINT NEWLINE (Parallelogram: cx=340, cy=1135) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('print-newline')}>
                <polygon
                  points="260,1115 440,1115 420,1160 240,1160"
                  fill={getNodeFill('print-newline')}
                  stroke={getNodeColor('print-newline')}
                  strokeWidth={isNodeActive('print-newline') ? 2.5 : 1.5}
                />
                <text x="340" y="1142" textAnchor="middle" fill={getNodeColor('print-newline')} fontSize="13" fontWeight="600">
                  Print &quot;\n&quot;
                </text>
              </g>

              {/* 15. INC I (Rect: cx=340, cy=1200) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('inc-i')}>
                <rect
                  x="270"
                  y="1180"
                  width="140"
                  height="40"
                  rx="6"
                  fill={getNodeFill('inc-i')}
                  stroke={getNodeColor('inc-i')}
                  strokeWidth={isNodeActive('inc-i') ? 2.5 : 1.5}
                />
                <text x="340" y="1205" textAnchor="middle" fill={getNodeColor('inc-i')} fontSize="13" fontWeight="600">
                  i++
                </text>
              </g>

              {/* 16. END (Stadium: cx=340, cy=1255) */}
              <g className={styles.nodeGroup} onClick={() => onSelectNode?.('end')}>
                <rect
                  x="265"
                  y="1235"
                  width="150"
                  height="40"
                  rx="20"
                  fill={getNodeFill('end')}
                  stroke={getNodeColor('end')}
                  strokeWidth={isNodeActive('end') ? 2.5 : 1.5}
                />
                <text x="340" y="1260" textAnchor="middle" fill={getNodeColor('end')} fontSize="13" fontWeight="600">
                  Stop / Return 0
                </text>
              </g>
            </svg>
          </div>

          {/* Right Explainer Box */}
          <div className={styles.explainerCard}>
            <div className={styles.explainerHeader}>
              <span className={styles.explainerTitle}>{currentNode.name}</span>
              <span className={styles.explainerBadge}>{currentNode.type}</span>
            </div>

            <p className={styles.explainerBody}>{currentNode.desc}</p>

            {(currentNode.trueTarget || currentNode.falseTarget) && (
              <div className={styles.branchTargets}>
                {currentNode.trueTarget && (
                  <div className={styles.branchItem}>
                    <span className={styles.branchTagTrue}>TRUE:</span>
                    <span className={styles.branchDesc}>{currentNode.trueTarget}</span>
                  </div>
                )}
                {currentNode.falseTarget && (
                  <div className={styles.branchItem}>
                    <span className={styles.branchTagFalse}>FALSE:</span>
                    <span className={styles.branchDesc}>{currentNode.falseTarget}</span>
                  </div>
                )}
              </div>
            )}

            <div className={styles.shapeLegend}>
              <div className={styles.shapeLegendTitle}>Standard Flowchart Symbols</div>
              <div className={styles.shapeLegendGrid}>
                <div><strong>Stadium:</strong> Start / Stop</div>
                <div><strong>Parallelogram:</strong> Input / Output</div>
                <div><strong>Rectangle:</strong> Process / Assignment</div>
                <div><strong>Diamond:</strong> Branch / Decision</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
