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
    desc: 'The operating system starts process execution at main(void).',
  },
  {
    id: 'input-n',
    name: 'Input n (1..10)',
    type: 'parallelogram',
    desc: 'Read the desired row count n from standard input via scanf("%d", &n).',
  },
  {
    id: 'init-i',
    name: 'i = n',
    type: 'rect',
    desc: 'Initialize the reverse outer loop row counter: i = n (starts at the maximum width row).',
  },
  {
    id: 'cond-i',
    name: 'i >= 1 ?',
    type: 'diamond',
    desc: 'Reverse outer condition: Is counter i still greater than or equal to 1?',
    trueTarget: 'init-j (Generate row with i stars)',
    falseTarget: 'end (All rows finished, i reached 0)',
  },
  {
    id: 'init-j',
    name: 'j = 1',
    type: 'rect',
    desc: 'Initialize the inner loop column counter j = 1 for the current row.',
  },
  {
    id: 'cond-j',
    name: 'j <= i ?',
    type: 'diamond',
    desc: 'Inner loop condition: Have we printed all i stars required for this decreasing row?',
    trueTarget: 'print-star (Print next star)',
    falseTarget: 'print-newline (Row finished)',
  },
  {
    id: 'print-star',
    name: 'Print "* "',
    type: 'parallelogram',
    desc: 'Output one star and space to the standard console stream.',
  },
  {
    id: 'inc-j',
    name: 'j++',
    type: 'rect',
    desc: 'Increment inner counter j by 1 and return to check inner condition j <= i.',
  },
  {
    id: 'print-newline',
    name: 'Print "\\n"',
    type: 'parallelogram',
    desc: 'Send a newline character to advance the console cursor to the next row.',
  },
  {
    id: 'dec-i',
    name: 'i--',
    type: 'rect',
    desc: 'Decrement reverse outer counter i by 1 (i = i - 1) to prepare the next shorter row.',
  },
  {
    id: 'loopback',
    name: 'Loop Back',
    type: 'rect',
    desc: 'Return control flow to evaluate outer condition i >= 1 for the next row.',
  },
  {
    id: 'end',
    name: 'Stop / End',
    type: 'stadium',
    desc: 'Execution terminates cleanly with status code 0 (return 0).',
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
          <div className={styles.sectionNumber}>05 / Visualize the Reverse Logic</div>
          <h2 className={styles.sectionTitle}>Interactive Logic Flowchart</h2>
          <p className={styles.sectionDesc}>
            The flowchart traces the exact reverse loop control flow: starting outer counter at N,
            printing I stars in the inner loop, and decrementing I after each newline until reaching 0.
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
              viewBox="0 0 540 840"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* DEFINITIONS / ARROW MARKERS */}
              <defs>
                <marker
                  id="inv-arrowhead"
                  markerWidth="8"
                  markerHeight="6"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="#71717a" />
                </marker>
                <marker
                  id="inv-arrowhead-active"
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
              <path d="M 270 50 L 270 85" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#inv-arrowhead)" />

              {/* 2. Input n -> init i (i = n) */}
              <path d="M 270 130 L 270 165" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#inv-arrowhead)" />

              {/* 3. init i -> cond i (i >= 1) */}
              <path d="M 270 205 L 270 240" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#inv-arrowhead)" />

              {/* 4. cond i -> init j (True: down) */}
              <path d="M 270 300 L 270 340" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#inv-arrowhead)" />
              <text x="280" y="325" fill="#16a34a" fontSize="11" fontWeight="700">True</text>

              {/* 4b. cond i -> End (False: right and down) */}
              <path d="M 345 270 L 460 270 L 460 760 L 335 760" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#inv-arrowhead)" />
              <text x="360" y="262" fill="#dc2626" fontSize="11" fontWeight="700">False (i &lt; 1)</text>

              {/* 5. init j -> cond j */}
              <path d="M 270 380 L 270 415" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#inv-arrowhead)" />

              {/* 6. cond j -> print star (True: down) */}
              <path d="M 270 475 L 270 510" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#inv-arrowhead)" />
              <text x="280" y="495" fill="#16a34a" fontSize="11" fontWeight="700">True</text>

              {/* 7. print star -> inc j */}
              <path d="M 270 550 L 270 585" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#inv-arrowhead)" />

              {/* 8. inc j -> loopback to cond j (left and up) */}
              <path d="M 210 605 L 140 605 L 140 445 L 205 445" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#inv-arrowhead)" />

              {/* 6b. cond j -> print newline (False: right and down) */}
              <path d="M 335 445 L 390 445 L 390 645 L 335 645" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#inv-arrowhead)" />
              <text x="345" y="437" fill="#dc2626" fontSize="11" fontWeight="700">False (j &gt; i)</text>

              {/* 9. print newline -> dec i */}
              <path d="M 270 665 L 270 690" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#inv-arrowhead)" />

              {/* 10. dec i -> loopback to cond i (far left and up) */}
              <path d="M 210 710 L 80 710 L 80 270 L 195 270" stroke="#71717a" strokeWidth="1.5" markerEnd="url(#inv-arrowhead)" />

              {/* NODES GEOMETRY */}
              {/* 1. START (Stadium: cx=270, cy=30) */}
              <g onClick={() => onSelectNode?.('start')} style={{ cursor: 'pointer' }}>
                <rect
                  x="210"
                  y="10"
                  width="120"
                  height="40"
                  rx="20"
                  fill={getNodeFill('start')}
                  stroke={getNodeColor('start')}
                  strokeWidth={isNodeActive('start') ? 2.5 : 1.5}
                />
                <text x="270" y="35" textAnchor="middle" fill="#18181b" fontSize="13" fontWeight="600">Start</text>
              </g>

              {/* 2. INPUT n (Parallelogram) */}
              <g onClick={() => onSelectNode?.('input-n')} style={{ cursor: 'pointer' }}>
                <polygon
                  points="210,130 350,130 330,85 190,85"
                  fill={getNodeFill('input-n')}
                  stroke={getNodeColor('input-n')}
                  strokeWidth={isNodeActive('input-n') ? 2.5 : 1.5}
                />
                <text x="270" y="112" textAnchor="middle" fill="#18181b" fontSize="13" fontWeight="600">Input n (1..10)</text>
              </g>

              {/* 3. INIT i (Rectangle: i = n) */}
              <g onClick={() => onSelectNode?.('init-i')} style={{ cursor: 'pointer' }}>
                <rect
                  x="200"
                  y="165"
                  width="140"
                  height="40"
                  rx="4"
                  fill={getNodeFill('init-i')}
                  stroke={getNodeColor('init-i')}
                  strokeWidth={isNodeActive('init-i') ? 2.5 : 1.5}
                />
                <text x="270" y="190" textAnchor="middle" fill="#18181b" fontSize="13" fontWeight="600">i = n</text>
              </g>

              {/* 4. COND i (Diamond: i >= 1 ?) */}
              <g onClick={() => onSelectNode?.('cond-i')} style={{ cursor: 'pointer' }}>
                <polygon
                  points="270,240 345,270 270,300 195,270"
                  fill={getNodeFill('cond-i')}
                  stroke={getNodeColor('cond-i')}
                  strokeWidth={isNodeActive('cond-i') ? 2.5 : 1.5}
                />
                <text x="270" y="274" textAnchor="middle" fill="#18181b" fontSize="13" fontWeight="600">i &gt;= 1 ?</text>
              </g>

              {/* 5. INIT j (Rectangle: j = 1) */}
              <g onClick={() => onSelectNode?.('init-j')} style={{ cursor: 'pointer' }}>
                <rect
                  x="205"
                  y="340"
                  width="130"
                  height="40"
                  rx="4"
                  fill={getNodeFill('init-j')}
                  stroke={getNodeColor('init-j')}
                  strokeWidth={isNodeActive('init-j') ? 2.5 : 1.5}
                />
                <text x="270" y="365" textAnchor="middle" fill="#18181b" fontSize="13" fontWeight="600">j = 1</text>
              </g>

              {/* 6. COND j (Diamond: j <= i ?) */}
              <g onClick={() => onSelectNode?.('cond-j')} style={{ cursor: 'pointer' }}>
                <polygon
                  points="270,415 345,445 270,475 195,445"
                  fill={getNodeFill('cond-j')}
                  stroke={getNodeColor('cond-j')}
                  strokeWidth={isNodeActive('cond-j') ? 2.5 : 1.5}
                />
                <text x="270" y="449" textAnchor="middle" fill="#18181b" fontSize="13" fontWeight="600">j &lt;= i ?</text>
              </g>

              {/* 7. PRINT STAR (Parallelogram) */}
              <g onClick={() => onSelectNode?.('print-star')} style={{ cursor: 'pointer' }}>
                <polygon
                  points="215,550 345,550 325,510 195,510"
                  fill={getNodeFill('print-star')}
                  stroke={getNodeColor('print-star')}
                  strokeWidth={isNodeActive('print-star') ? 2.5 : 1.5}
                />
                <text x="270" y="535" textAnchor="middle" fill="#18181b" fontSize="13" fontWeight="600">Print "* "</text>
              </g>

              {/* 8. INC j (Rectangle) */}
              <g onClick={() => onSelectNode?.('inc-j')} style={{ cursor: 'pointer' }}>
                <rect
                  x="210"
                  y="585"
                  width="120"
                  height="40"
                  rx="4"
                  fill={getNodeFill('inc-j')}
                  stroke={getNodeColor('inc-j')}
                  strokeWidth={isNodeActive('inc-j') ? 2.5 : 1.5}
                />
                <text x="270" y="610" textAnchor="middle" fill="#18181b" fontSize="13" fontWeight="600">j++</text>
              </g>

              {/* 9. PRINT NEWLINE (Parallelogram) */}
              <g onClick={() => onSelectNode?.('print-newline')} style={{ cursor: 'pointer' }}>
                <polygon
                  points="215,665 345,665 325,625 195,625"
                  fill={getNodeFill('print-newline')}
                  stroke={getNodeColor('print-newline')}
                  strokeWidth={isNodeActive('print-newline') ? 2.5 : 1.5}
                />
                <text x="270" y="650" textAnchor="middle" fill="#18181b" fontSize="13" fontWeight="600">Print "\n"</text>
              </g>

              {/* 10. DEC i (Rectangle: i--) */}
              <g onClick={() => onSelectNode?.('dec-i')} style={{ cursor: 'pointer' }}>
                <rect
                  x="210"
                  y="690"
                  width="120"
                  height="40"
                  rx="4"
                  fill={getNodeFill('dec-i')}
                  stroke={getNodeColor('dec-i')}
                  strokeWidth={isNodeActive('dec-i') ? 2.5 : 1.5}
                />
                <text x="270" y="715" textAnchor="middle" fill="#18181b" fontSize="13" fontWeight="600">i--</text>
              </g>

              {/* 11. END / STOP (Stadium: cx=270, cy=760) */}
              <g onClick={() => onSelectNode?.('end')} style={{ cursor: 'pointer' }}>
                <rect
                  x="205"
                  y="740"
                  width="130"
                  height="40"
                  rx="20"
                  fill={getNodeFill('end')}
                  stroke={getNodeColor('end')}
                  strokeWidth={isNodeActive('end') ? 2.5 : 1.5}
                />
                <text x="270" y="765" textAnchor="middle" fill="#18181b" fontSize="13" fontWeight="600">Stop</text>
              </g>
            </svg>
          </div>

          {/* Node Explainer Card */}
          <div className={styles.explainerCard}>
            <div className={styles.explainerHeader}>
              <span className={styles.explainerBadge}>Node Inspector</span>
              <span style={{ fontSize: '0.75rem', color: '#71717a' }}>{currentNode.type}</span>
            </div>

            <h3 className={styles.explainerTitle}>{currentNode.name}</h3>
            <p className={styles.explainerDesc}>{currentNode.desc}</p>

            {(currentNode.trueTarget || currentNode.falseTarget) && (
              <div className={styles.branchExplanation}>
                <div style={{ fontWeight: 700, color: '#374151' }}>Decision Branches:</div>
                {currentNode.trueTarget && (
                  <div className={styles.branchItem}>
                    <span className={styles.branchTrue}>&bull; True:</span>
                    <span>{currentNode.trueTarget}</span>
                  </div>
                )}
                {currentNode.falseTarget && (
                  <div className={styles.branchItem}>
                    <span className={styles.branchFalse}>&bull; False:</span>
                    <span>{currentNode.falseTarget}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
