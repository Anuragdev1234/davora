import { useState, useMemo, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Code2,
  Network,
  RotateCcw,
  ArrowRight,
  X,
  Layers,
} from 'lucide-react';
import { fadeUp, pathDraw, viewportConfig } from '../../utils/motion';
import { useReducedMotion, useViewportWidth } from '../../hooks/useMotion';
import {
  diagramNodes,
  diagramConnections,
  diagramGroups,
  type DiagramNode,
} from '../../data/theoryDiagram';
import styles from './TheoryDiagram.module.css';

export function TheoryDiagram() {
  const reduced = useReducedMotion();
  const width = useViewportWidth();

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('pointer');
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [activeGroupFilter, setActiveGroupFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'diagram' | 'list'>('diagram');

  const diagramRef = useRef<HTMLDivElement>(null);

  // Responsive view mode switch
  useEffect(() => {
    if (width <= 640 && viewMode === 'diagram') {
      setViewMode('list');
    }
  }, [width, viewMode]);

  // Map nodes by id for quick lookup
  const nodeMap = useMemo(() => {
    const map = new Map<string, DiagramNode>();
    diagramNodes.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  // Determine active/connected IDs
  const { connectedNodeIds, connectedConnectionIds } = useMemo(() => {
    const nodeIds = new Set<string>();
    const connIds = new Set<string>();

    if (selectedNodeId) {
      nodeIds.add(selectedNodeId);
      diagramConnections.forEach((conn) => {
        if (conn.from === selectedNodeId) {
          connIds.add(conn.id);
          nodeIds.add(conn.to);
        } else if (conn.to === selectedNodeId) {
          connIds.add(conn.id);
          nodeIds.add(conn.from);
        }
      });
    } else if (selectedConnectionId) {
      connIds.add(selectedConnectionId);
      const conn = diagramConnections.find((c) => c.id === selectedConnectionId);
      if (conn) {
        nodeIds.add(conn.from);
        nodeIds.add(conn.to);
      }
    }

    return { connectedNodeIds: nodeIds, connectedConnectionIds: connIds };
  }, [selectedNodeId, selectedConnectionId]);

  // Selected node or connection details
  const activeNode = selectedNodeId ? nodeMap.get(selectedNodeId) : null;
  const activeConnection = selectedConnectionId
    ? diagramConnections.find((c) => c.id === selectedConnectionId)
    : null;

  const handleSelectNode = (id: string) => {
    setSelectedNodeId(id);
    setSelectedConnectionId(null);
  };

  const handleSelectConnection = (id: string) => {
    setSelectedConnectionId(id);
    setSelectedNodeId(null);
  };

  const handleClearSelection = () => {
    setSelectedNodeId(null);
    setSelectedConnectionId(null);
  };

  // Keyboard navigation across nodes
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClearSelection();
      return;
    }

    const visibleNodes = diagramNodes.filter(
      (n) => activeGroupFilter === 'all' || n.group === activeGroupFilter
    );
    if (!visibleNodes.length) return;

    const currentIndex = visibleNodes.findIndex((n) => n.id === selectedNodeId);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % visibleNodes.length;
      handleSelectNode(visibleNodes[nextIndex].id);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + visibleNodes.length) % visibleNodes.length;
      handleSelectNode(visibleNodes[prevIndex].id);
    }
  };

  return (
    <section id="theory" className={styles.section} aria-label="Interactive Theory Concept Map">
      <div className="container">
        {/* Header */}
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className={styles.sectionLabel}>02.5 / INTERACTIVE THEORY</span>
          <h2 className={styles.heading}>The Architecture of C Execution.</h2>
          <p className={styles.subheading}>
            Select any concept or connecting path below to inspect how source statements,
            memory models, control flow, and hardware boundaries interlock in C.
          </p>
        </motion.div>

        {/* Toolbar & Filters */}
        <div className={styles.toolbar}>
          <div className={styles.groupFilters} role="tablist" aria-label="Filter theory concepts by group">
            <button
              type="button"
              className={`${styles.filterBtn} ${activeGroupFilter === 'all' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveGroupFilter('all')}
              role="tab"
              aria-selected={activeGroupFilter === 'all'}
            >
              All Concepts ({diagramNodes.length})
            </button>
            {Object.entries(diagramGroups).map(([groupKey, group]) => {
              const count = diagramNodes.filter((n) => n.group === groupKey).length;
              return (
                <button
                  key={groupKey}
                  type="button"
                  className={`${styles.filterBtn} ${
                    activeGroupFilter === groupKey ? styles.filterBtnActive : ''
                  }`}
                  onClick={() => setActiveGroupFilter(groupKey)}
                  role="tab"
                  aria-selected={activeGroupFilter === groupKey}
                >
                  {group.label} ({count})
                </button>
              );
            })}
          </div>

          <div className={styles.toolbarActions}>
            <button
              type="button"
              className={styles.viewToggleBtn}
              onClick={() => setViewMode(viewMode === 'diagram' ? 'list' : 'diagram')}
              aria-label="Toggle between visual diagram and structured list"
            >
              {viewMode === 'diagram' ? (
                <>
                  <Layers size={13} aria-hidden="true" />
                  <span>List View</span>
                </>
              ) : (
                <>
                  <Network size={13} aria-hidden="true" />
                  <span>Diagram View</span>
                </>
              )}
            </button>

            {(selectedNodeId || selectedConnectionId) && (
              <button
                type="button"
                className={styles.resetBtn}
                onClick={handleClearSelection}
                aria-label="Reset selection"
              >
                <RotateCcw size={12} aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* ── DIAGRAM VIEW ── */}
        {viewMode === 'diagram' ? (
          <div className={styles.interactiveLayout}>
            {/* SVG Diagram Canvas */}
            <div
              ref={diagramRef}
              className={styles.diagramContainer}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              role="region"
              aria-label="Interactive concept diagram canvas. Use arrow keys to navigate nodes or click any node."
            >
              {/* Background Quadrants */}
              <div className={styles.groupRegionsOverlay} aria-hidden="true">
                <div className={styles.groupQuadrant}>C Instruction</div>
                <div className={styles.groupQuadrant}>Memory Architecture</div>
                <div className={styles.groupQuadrant}>Control Flow</div>
                <div className={styles.groupQuadrant}>Operating System &amp; Hardware</div>
              </div>

              {/* SVG Connectors Canvas */}
              <svg
                className={styles.svgOverlay}
                viewBox="0 0 1000 625"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <marker
                    id="arrowActive"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#9BC44A" />
                  </marker>
                  <marker
                    id="arrowMuted"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 2 L 6 5 L 0 8 z" fill="#C8CAC4" />
                  </marker>
                </defs>

                {/* Draw all connection paths */}
                {diagramConnections.map((conn) => {
                  const fromNode = nodeMap.get(conn.from);
                  const toNode = nodeMap.get(conn.to);
                  if (!fromNode || !toNode) return null;

                  // Coordinates in 1000 x 625 viewBox
                  const x1 = fromNode.x * 10;
                  const y1 = fromNode.y * 6.25;
                  const x2 = toNode.x * 10;
                  const y2 = toNode.y * 6.25;

                  const midX = (x1 + x2) / 2;
                  const midY = (y1 + y2) / 2;
                  const dx = x2 - x1;
                  const dy = y2 - y1;
                  // Organic curve offset
                  const cx = midX - dy * 0.12;
                  const cy = midY + dx * 0.12;

                  const pathD = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

                  const isConnActive =
                    connectedConnectionIds.has(conn.id) || selectedConnectionId === conn.id;
                  const isConnDimmed =
                    (selectedNodeId || selectedConnectionId) && !isConnActive;

                  return (
                    <g key={conn.id}>
                      {/* Wide clickable stroke hit area */}
                      <path
                        d={pathD}
                        className={styles.connectorHitArea}
                        onClick={() => handleSelectConnection(conn.id)}
                      >
                        <title>{`${fromNode.label} → ${toNode.label}`}</title>
                      </path>

                      {/* Visible stroke path */}
                      <motion.path
                        d={pathD}
                        className={`${styles.connectorLine} ${
                          conn.important ? styles.connectorImportant : ''
                        } ${isConnActive ? styles.connectorActive : ''} ${
                          isConnDimmed ? styles.connectorDimmed : ''
                        }`}
                        markerEnd={isConnActive ? 'url(#arrowActive)' : 'url(#arrowMuted)'}
                        variants={reduced ? undefined : pathDraw}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                      />

                      {/* Traveling signal dot along active connections */}
                      {isConnActive && !reduced && (
                        <circle r="3.5" className={styles.signalDot}>
                          <animateMotion path={pathD} dur="2.4s" repeatCount="indefinite" />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* HTML Nodes Layer */}
              <div className={styles.nodesLayer}>
                {diagramNodes.map((node) => {
                  const isVisibleInFilter =
                    activeGroupFilter === 'all' || node.group === activeGroupFilter;
                  const isSelected = selectedNodeId === node.id;
                  const isConnected = connectedNodeIds.has(node.id) && !isSelected;
                  const isDimmed =
                    (selectedNodeId || selectedConnectionId) && !isSelected && !isConnected;

                  return (
                    <div
                      key={node.id}
                      className={`${styles.nodeItem} ${isSelected ? styles.nodeActive : ''} ${
                        isConnected ? styles.nodeConnected : ''
                      } ${isDimmed || !isVisibleInFilter ? styles.nodeDimmed : ''}`}
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                      }}
                    >
                      <button
                        type="button"
                        className={styles.nodeButton}
                        onClick={() => handleSelectNode(node.id)}
                        aria-pressed={isSelected}
                        aria-label={`Concept: ${node.label}, Group: ${node.group}`}
                      >
                        <span className={styles.nodeDot} aria-hidden="true" />
                        <span className={styles.nodeLabel}>{node.label}</span>
                        <span className={styles.nodeBadge}>
                          {node.group === 'instruction'
                            ? 'expr'
                            : node.group === 'memory'
                            ? 'mem'
                            : node.group === 'control'
                            ? 'flow'
                            : 'sys'}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Adjacent Detail / Inspector Panel */}
            <aside className={styles.inspectorPanel} aria-label="Concept Details and Relationships">
              <AnimatePresence mode="wait">
                {activeNode ? (
                  <motion.div
                    key={`node-${activeNode.id}`}
                    initial={reduced ? undefined : { opacity: 0, y: 10 }}
                    animate={reduced ? undefined : { opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.inspectorHeader}>
                      <div>
                        <span className={styles.inspectorGroupTag}>
                          {diagramGroups[activeNode.group]?.label || activeNode.group}
                        </span>
                        <h3 className={styles.inspectorTitle}>{activeNode.label}</h3>
                      </div>
                      <button
                        type="button"
                        className={styles.inspectorCloseBtn}
                        onClick={handleClearSelection}
                        aria-label="Clear selection"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div style={{ marginTop: 'var(--space-4)' }}>
                      <p className={styles.inspectorExplanation}>{activeNode.explanation}</p>
                    </div>

                    {/* Related Connected Concepts */}
                    <div className={styles.relatedSection}>
                      <span className={styles.relatedSectionTitle}>Connected Concepts</span>
                      <div className={styles.relatedPillsWrap}>
                        {diagramConnections
                          .filter((c) => c.from === activeNode.id || c.to === activeNode.id)
                          .map((conn) => {
                            const partnerId = conn.from === activeNode.id ? conn.to : conn.from;
                            const partner = nodeMap.get(partnerId);
                            if (!partner) return null;
                            return (
                              <button
                                key={conn.id}
                                type="button"
                                className={styles.relatedPill}
                                onClick={() => handleSelectNode(partner.id)}
                              >
                                <span>{partner.label}</span>
                                <ArrowRight size={11} aria-hidden="true" />
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    {/* Code Example if present */}
                    {activeNode.codeExample && (
                      <div className={styles.codeBox}>
                        <div className={styles.codeBoxHeader}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Code2 size={12} aria-hidden="true" />
                            <span>Example Syntax</span>
                          </div>
                          <span>C99 / C11</span>
                        </div>
                        <pre className={styles.codeSnippet}>
                          <code>{activeNode.codeExample}</code>
                        </pre>
                      </div>
                    )}
                  </motion.div>
                ) : activeConnection ? (
                  <motion.div
                    key={`conn-${activeConnection.id}`}
                    initial={reduced ? undefined : { opacity: 0, y: 10 }}
                    animate={reduced ? undefined : { opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.inspectorHeader}>
                      <div>
                        <span className={styles.inspectorGroupTag}>Architectural Relationship</span>
                        <h3 className={styles.inspectorTitle}>
                          {nodeMap.get(activeConnection.from)?.label} →{' '}
                          {nodeMap.get(activeConnection.to)?.label}
                        </h3>
                      </div>
                      <button
                        type="button"
                        className={styles.inspectorCloseBtn}
                        onClick={handleClearSelection}
                        aria-label="Clear selection"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div style={{ marginTop: 'var(--space-4)' }}>
                      <p className={styles.inspectorExplanation}>{activeConnection.explanation}</p>
                    </div>

                    <div className={styles.relatedSection}>
                      <span className={styles.relatedSectionTitle}>Inspect Connected Nodes</span>
                      <div className={styles.relatedPillsWrap}>
                        <button
                          type="button"
                          className={styles.relatedPill}
                          onClick={() => handleSelectNode(activeConnection.from)}
                        >
                          <span>{nodeMap.get(activeConnection.from)?.label}</span>
                        </button>
                        <button
                          type="button"
                          className={styles.relatedPill}
                          onClick={() => handleSelectNode(activeConnection.to)}
                        >
                          <span>{nodeMap.get(activeConnection.to)?.label}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className={styles.inspectorEmptyState}>
                    <div className={styles.emptyStateIcon}>
                      <Sparkles size={20} aria-hidden="true" />
                    </div>
                    <h4 className={styles.emptyStateTitle}>Select Any Concept</h4>
                    <p className={styles.emptyStateDesc}>
                      Click any node or connector line in the diagram to reveal its computational
                      behavior, related hardware bridges, and example C snippets.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </aside>
          </div>
        ) : (
          /* ── STRUCTURED ACCESSIBLE LIST VIEW (MOBILE / DESKTOP FALLBACK) ── */
          <div className={styles.listViewContainer}>
            {Object.entries(diagramGroups).map(([groupKey, group]) => {
              const nodesInGroup = diagramNodes.filter((n) => n.group === groupKey);
              return (
                <div key={groupKey} className={styles.listGroupBlock}>
                  <h3 className={styles.listGroupHeading}>{group.label}</h3>
                  <p className={styles.listGroupDesc}>{group.description}</p>
                  <div className={styles.listItemsGrid}>
                    {nodesInGroup.map((n) => (
                      <div
                        key={n.id}
                        className={styles.listItemCard}
                        onClick={() => {
                          handleSelectNode(n.id);
                          setViewMode('diagram');
                        }}
                      >
                        <div className={styles.listItemTitle}>{n.label}</div>
                        <p className={styles.listItemSnippet}>{n.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default TheoryDiagram;
