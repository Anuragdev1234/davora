import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, RefreshCw, Power, ArrowRight } from 'lucide-react';
import { LOOP_FLOW_NODES, LOOP_TYPES_OVERVIEW } from '../../data/loopsLessonData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './LoopFlowAndTypesSection.module.css';

export function LoopFlowAndTypesSection() {
  const reduced = useReducedMotion();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-cond');

  const selectedNode =
    LOOP_FLOW_NODES.find((n) => n.id === selectedNodeId) || LOOP_FLOW_NODES[1];

  const handleScrollToLesson = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getLoopIcon = (id: string, color: string) => {
    switch (id) {
      case 'type-for':
        return <Clock size={16} color={color} />;
      case 'type-while':
        return <RefreshCw size={16} color={color} />;
      case 'type-do-while':
        return <Power size={16} color={color} />;
      default:
        return null;
    }
  };

  return (
    <section className={styles.sectionWrapper} id="loop-flow-overview">
      <div className={styles.container}>
        {/* ==========================================================
            PANEL 01: How Does a Loop Work? (Interactive SVG Flowchart)
            ========================================================== */}
        <motion.div
          className={styles.panelCard}
          initial={reduced ? undefined : { opacity: 0, y: 15 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.panelHeader}>
            <div className={styles.headerTop}>
              <span className={styles.indexBadge}>01</span>
              <h3 className={styles.panelTitle}>How Does a Loop Work?</h3>
            </div>
            <p className={styles.panelSubtitle}>A loop follows a simple sequence of steps.</p>
          </div>

          <div className={styles.flowchartArea}>
            <div className={styles.svgFlowWrapper}>
              <svg
                className={styles.flowSvg}
                viewBox="0 0 580 185"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Arrowhead Markers */}
                  <marker
                    id="arrow-neutral"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
                  </marker>
                  <marker
                    id="arrow-true"
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
                    id="arrow-false"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#E11D48" />
                  </marker>
                </defs>

                {/* 1. Connector: Init -> Condition */}
                <path
                  d="M 120 90 L 145 90"
                  stroke="#475569"
                  strokeWidth="1.8"
                  markerEnd="url(#arrow-neutral)"
                />

                {/* 2. Connector: Condition -> Body (True Branch) */}
                <path
                  d="M 205 59 L 205 35 L 270 35"
                  stroke="#2563EB"
                  strokeWidth="2"
                  markerEnd="url(#arrow-true)"
                />
                <text x="211" y="48" className={`${styles.branchLabel} ${styles.branchLabelTrue}`}>
                  True
                </text>

                {/* 3. Connector: Body -> Update */}
                <path
                  d="M 390 35 L 420 35"
                  stroke="#475569"
                  strokeWidth="1.8"
                  markerEnd="url(#arrow-neutral)"
                />

                {/* 4. Return Loop Connector: Update -> Condition */}
                <path
                  d="M 480 55 C 480 82, 420 90, 270 90"
                  stroke="#2563EB"
                  strokeWidth="1.8"
                  strokeDasharray="4 3"
                  markerEnd="url(#arrow-true)"
                />

                {/* 5. Connector: Condition -> Exit (False Branch) */}
                <path
                  d="M 205 121 L 205 142"
                  stroke="#E11D48"
                  strokeWidth="2"
                  markerEnd="url(#arrow-false)"
                />
                <text x="166" y="134" className={`${styles.branchLabel} ${styles.branchLabelFalse}`}>
                  False
                </text>

                {/* NODE 1: Initialize the variable */}
                <g
                  className={styles.nodeGroup}
                  onClick={() => setSelectedNodeId('node-init')}
                  role="button"
                  tabIndex={0}
                >
                  <rect
                    x="15"
                    y="70"
                    width="105"
                    height="40"
                    className={`${styles.nodePill} ${
                      selectedNodeId === 'node-init' ? styles.nodePillActive : ''
                    }`}
                  />
                  <text x="67" y="87" className={styles.nodeTextLight}>
                    Initialize
                  </text>
                  <text x="67" y="100" className={styles.nodeTextLight}>
                    the variable
                  </text>
                </g>

                {/* NODE 2: Check the condition (Diamond) */}
                <g
                  className={styles.nodeGroup}
                  onClick={() => setSelectedNodeId('node-cond')}
                  role="button"
                  tabIndex={0}
                >
                  <polygon
                    points="205,59 265,90 205,121 145,90"
                    className={`${styles.nodeDiamond} ${
                      selectedNodeId === 'node-cond' ? styles.nodeDiamondActive : ''
                    }`}
                  />
                  <text x="205" y="87" className={styles.nodeTextDark}>
                    Check
                  </text>
                  <text x="205" y="100" className={styles.nodeTextDark}>
                    the condition
                  </text>
                </g>

                {/* NODE 3: Execute the loop body */}
                <g
                  className={styles.nodeGroup}
                  onClick={() => setSelectedNodeId('node-body')}
                  role="button"
                  tabIndex={0}
                >
                  <rect
                    x="275"
                    y="15"
                    width="115"
                    height="40"
                    className={`${styles.nodePill} ${
                      selectedNodeId === 'node-body' ? styles.nodePillActive : ''
                    }`}
                  />
                  <text x="332" y="32" className={styles.nodeTextLight}>
                    Execute
                  </text>
                  <text x="332" y="45" className={styles.nodeTextLight}>
                    the loop body
                  </text>
                </g>

                {/* NODE 4: Update the variable */}
                <g
                  className={styles.nodeGroup}
                  onClick={() => setSelectedNodeId('node-update')}
                  role="button"
                  tabIndex={0}
                >
                  <rect
                    x="425"
                    y="15"
                    width="110"
                    height="40"
                    className={`${styles.nodePill} ${
                      selectedNodeId === 'node-update' ? styles.nodePillActive : ''
                    }`}
                  />
                  <text x="480" y="32" className={styles.nodeTextLight}>
                    Update
                  </text>
                  <text x="480" y="45" className={styles.nodeTextLight}>
                    the variable
                  </text>
                </g>

                {/* NODE 5: Exit the loop */}
                <g
                  className={styles.nodeGroup}
                  onClick={() => setSelectedNodeId('node-exit')}
                  role="button"
                  tabIndex={0}
                >
                  <rect
                    x="155"
                    y="142"
                    width="100"
                    height="32"
                    className={styles.nodeExit}
                  />
                  <text x="205" y="162" className={styles.nodeTextExit}>
                    Exit the loop
                  </text>
                </g>
              </svg>
            </div>

            {/* Selected Node Details Box */}
            <div className={styles.flowExplanationBox}>
              <div className={styles.flowExplanationContent}>
                <h5>{selectedNode.label}</h5>
                <p>{selectedNode.explanation}</p>
              </div>
              <code className={styles.flowCodeSnippet}>{selectedNode.codeMapping}</code>
            </div>

            {/* Reference Note Callout */}
            <div className={styles.flowNoteCard}>
              <strong>Note:</strong> This is a general model for a condition-controlled loop. A{' '}
              <em>do-while</em> loop checks its condition after executing the body for the first
              time.
            </div>
          </div>
        </motion.div>

        {/* ==========================================================
            PANEL 02: Types of Loops in C (Three Interactive Modules)
            ========================================================== */}
        <motion.div
          className={styles.panelCard}
          initial={reduced ? undefined : { opacity: 0, y: 15 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className={styles.panelHeader}>
            <div className={styles.headerTop}>
              <span className={styles.indexBadge}>02</span>
              <h3 className={styles.panelTitle}>Types of Loops in C</h3>
            </div>
            <p className={styles.panelSubtitle}>C provides three main looping statements.</p>
          </div>

          <div className={styles.typesGrid}>
            {LOOP_TYPES_OVERVIEW.map((item) => (
              <div
                key={item.id}
                className={styles.typeCard}
                onClick={() => handleScrollToLesson(item.targetSectionId)}
                role="button"
                tabIndex={0}
                style={{ borderLeft: `3px solid ${item.color}` }}
              >
                <div className={styles.typeCardHeader}>
                  <div className={styles.typeTitleRow}>
                    <div
                      className={styles.typeIconBadge}
                      style={{ background: item.accentBg }}
                    >
                      {getLoopIcon(item.id, item.color)}
                    </div>
                    <div>
                      <h4 className={styles.typeName}>{item.name}</h4>
                      <p className={styles.typeSubtitle}>{item.subtitle}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.typeCodeBox}>{item.codeSnippet}</div>

                <div className={styles.typeActionLink} style={{ color: item.color }}>
                  <span>Explore full lesson</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
