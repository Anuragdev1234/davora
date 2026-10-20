import { useState } from 'react';
import styles from './DecisionFlowchart.module.css';

interface DecisionFlowchartProps {
  isConditionTrue?: boolean;
  onConditionToggle?: (val: boolean) => void;
}

export function DecisionFlowchart({
  isConditionTrue: externalCondition,
  onConditionToggle,
}: DecisionFlowchartProps) {
  const [internalCondition, setInternalCondition] = useState<boolean>(true);

  const isTrue = externalCondition !== undefined ? externalCondition : internalCondition;

  const handleToggle = (val: boolean) => {
    setInternalCondition(val);
    if (onConditionToggle) {
      onConditionToggle(val);
    }
  };

  return (
    <div className={styles.flowchartCard} aria-label="Interactive Decision Flowchart: How if-else Works">
      <div className={styles.cardHeader}>
        <h4 className={styles.cardTitle}>How if-else Works</h4>
        <div className={styles.toggleContainer}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${isTrue ? styles.toggleBtnActiveTrue : ''}`}
            onClick={() => handleToggle(true)}
            aria-pressed={isTrue}
          >
            True (Yes)
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${!isTrue ? styles.toggleBtnActiveFalse : ''}`}
            onClick={() => handleToggle(false)}
            aria-pressed={!isTrue}
          >
            False (No)
          </button>
        </div>
      </div>

      <div className={styles.svgWrapper}>
        <svg
          viewBox="0 0 340 230"
          className={styles.flowchartSvg}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker
              id="flow-arrow-neutral"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748b" />
            </marker>
            <marker
              id="flow-arrow-green"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
            </marker>
            <marker
              id="flow-arrow-red"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#ef4444" />
            </marker>
          </defs>

          {/* 1. START Node */}
          <rect
            x="125"
            y="8"
            width="90"
            height="26"
            rx="6"
            fill="#dbeafe"
            stroke="#93c5fd"
            strokeWidth="1.5"
            className={styles.nodeRect}
          />
          <text x="170" y="21" fill="#1e40af" className={styles.nodeText}>
            Start
          </text>

          {/* Path: Start -> Decision Diamond */}
          <path
            d="M 170 34 L 170 54"
            stroke="#64748b"
            className={styles.pathLine}
            markerEnd="url(#flow-arrow-neutral)"
          />

          {/* 2. DECISION DIAMOND: Condition is true? */}
          <polygon
            points="170,54 235,84 170,114 105,84"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            className={styles.nodeRect}
          />
          <text x="170" y="80" fill="#334155" className={styles.nodeText} style={{ fontSize: '10.5px' }}>
            Condition
          </text>
          <text x="170" y="94" fill="#334155" className={styles.nodeText} style={{ fontSize: '10.5px' }}>
            is true?
          </text>

          {/* 3. YES BRANCH (Left) */}
          <path
            d="M 105 84 L 62 84 L 62 120"
            stroke="#10b981"
            className={`${styles.pathLine} ${isTrue ? styles.pathActive : styles.pathDimmed}`}
            markerEnd="url(#flow-arrow-green)"
          />
          <text
            x="84"
            y="76"
            fill="#10b981"
            className={styles.branchLabel}
          >
            Yes
          </text>

          {/* Node: Execute if block */}
          <rect
            x="18"
            y="120"
            width="88"
            height="32"
            rx="6"
            fill={isTrue ? '#dcfce7' : '#f0fdf4'}
            stroke={isTrue ? '#10b981' : '#bbf7d0'}
            strokeWidth={isTrue ? '2' : '1.5'}
            className={styles.nodeRect}
          />
          <text x="62" y="131" fill="#166534" className={styles.nodeText} style={{ fontSize: '10px' }}>
            Execute
          </text>
          <text x="62" y="143" fill="#166534" className={styles.nodeText} style={{ fontSize: '10px' }}>
            if block
          </text>

          {/* 4. NO BRANCH (Right) */}
          <path
            d="M 235 84 L 278 84 L 278 120"
            stroke="#ef4444"
            className={`${styles.pathLine} ${!isTrue ? styles.pathActive : styles.pathDimmed}`}
            markerEnd="url(#flow-arrow-red)"
          />
          <text
            x="256"
            y="76"
            fill="#ef4444"
            className={styles.branchLabel}
          >
            No
          </text>

          {/* Node: Execute else block */}
          <rect
            x="234"
            y="120"
            width="88"
            height="32"
            rx="6"
            fill={!isTrue ? '#fee2e2' : '#fef2f2'}
            stroke={!isTrue ? '#ef4444' : '#fecaca'}
            strokeWidth={!isTrue ? '2' : '1.5'}
            className={styles.nodeRect}
          />
          <text x="278" y="131" fill="#991b1b" className={styles.nodeText} style={{ fontSize: '10px' }}>
            Execute
          </text>
          <text x="278" y="143" fill="#991b1b" className={styles.nodeText} style={{ fontSize: '10px' }}>
            else block
          </text>

          {/* 5. CONVERGENCE TO NEXT STATEMENT */}
          {/* Path from if block */}
          <path
            d="M 62 152 L 62 185 L 115 185"
            stroke="#10b981"
            className={`${styles.pathLine} ${isTrue ? styles.pathActive : styles.pathDimmed}`}
            markerEnd="url(#flow-arrow-neutral)"
          />

          {/* Path from else block */}
          <path
            d="M 278 152 L 278 185 L 225 185"
            stroke="#ef4444"
            className={`${styles.pathLine} ${!isTrue ? styles.pathActive : styles.pathDimmed}`}
            markerEnd="url(#flow-arrow-neutral)"
          />

          {/* Node: Next Statement */}
          <rect
            x="115"
            y="172"
            width="110"
            height="26"
            rx="6"
            fill="#dbeafe"
            stroke="#93c5fd"
            strokeWidth="1.5"
            className={styles.nodeRect}
          />
          <text x="170" y="185" fill="#1e40af" className={styles.nodeText}>
            Next Statement
          </text>
        </svg>
      </div>
    </div>
  );
}
