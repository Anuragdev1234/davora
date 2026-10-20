import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  BookOpen,
  Terminal,
  Layers,
  Sparkles,
} from 'lucide-react';
import { fadeUp, pathDraw, viewportConfig } from '../../utils/motion';
import { useReducedMotion, useViewportWidth } from '../../hooks/useMotion';
import { timelineMilestones, type TimelineMilestone } from '../../data/timeline';
import styles from './History.module.css';

const ARTIFACT_PILLARS = [
  {
    icon: Cpu,
    title: 'PDP-11 Origin',
    subtitle: 'Dennis Ritchie, 1972',
  },
  {
    icon: Terminal,
    title: 'Unix Core',
    subtitle: 'Rewritten in C, 1973',
  },
  {
    icon: BookOpen,
    title: 'K&R White Book',
    subtitle: 'Reference Bible, 1978',
  },
  {
    icon: Layers,
    title: 'ANSI X3.159',
    subtitle: 'C89 Standardization',
  },
  {
    icon: Sparkles,
    title: 'ISO C23',
    subtitle: 'Modern Type & Embed',
  },
];

export function History() {
  const reduced = useReducedMotion();
  const width = useViewportWidth();
  const isMobile = width <= 840;

  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isStandard = (year: string) => year.startsWith('C');

  const handleSelectMilestone = (idx: number) => {
    setActiveMilestoneIndex(idx);
    if (scrollContainerRef.current && !isMobile) {
      const cardWidth = 280 + 16;
      scrollContainerRef.current.scrollTo({
        left: idx * cardWidth - 100,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeMilestoneIndex - 1);
    handleSelectMilestone(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(timelineMilestones.length - 1, activeMilestoneIndex + 1);
    handleSelectMilestone(nextIdx);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <section id="history" className={styles.section} aria-label="History of C">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className={styles.sectionLabel}>03 / HISTORY OF C</span>
          <h2 className={styles.heading}>A small language. An enormous legacy.</h2>
          <p className={styles.subheading}>
            From minicomputers at Bell Labs to modern operating systems, browsers, and embedded silicon.
            Explore the key milestones that shaped 50+ years of computing.
          </p>
        </motion.div>

        {/* Historical Highlights Row (Artifacts & Pillars) */}
        <motion.div
          className={styles.artifactsRow}
          variants={fadeUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView="visible"
          viewport={viewportConfig}
        >
          {ARTIFACT_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div key={i} className={styles.artifactPill}>
                <div className={styles.artifactIconWrap}>
                  <Icon size={16} aria-hidden="true" />
                </div>
                <div className={styles.artifactText}>
                  <span className={styles.artifactTitle}>{pillar.title}</span>
                  <span className={styles.artifactSubtitle}>{pillar.subtitle}</span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Timeline Toolbar & Legend */}
        <div className={styles.timelineToolbar}>
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={styles.legendDotHistorical} aria-hidden="true" />
              <span>Historical Era</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDotStandard} aria-hidden="true" />
              <span>ISO / ANSI Standards</span>
            </div>
          </div>

          <div className={styles.navControls}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
              {activeMilestoneIndex + 1} / {timelineMilestones.length}
            </span>
            <button
              type="button"
              className={styles.navBtn}
              onClick={handlePrev}
              disabled={activeMilestoneIndex === 0}
              aria-label="Previous milestone"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className={styles.navBtn}
              onClick={handleNext}
              disabled={activeMilestoneIndex === timelineMilestones.length - 1}
              aria-label="Next milestone"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* DESKTOP TIMELINE */}
        {!isMobile ? (
          <div
            ref={scrollContainerRef}
            className={styles.desktopTimeline}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="Timeline navigation track. Use left and right arrow keys to navigate."
          >
            <div className={styles.timelineTrack}>
              <div className={styles.axisSvgContainer} aria-hidden="true">
                <svg width="100%" height="72" viewBox="0 0 2600 72" fill="none">
                  <motion.line
                    x1="20"
                    y1="36"
                    x2="2580"
                    y2="36"
                    stroke="#C8CAC4"
                    strokeWidth="2"
                    variants={reduced ? undefined : pathDraw}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                  />
                </svg>
              </div>

              {timelineMilestones.map((m: TimelineMilestone, idx: number) => {
                const isActive = activeMilestoneIndex === idx;
                const standard = isStandard(m.year);
                const isTop = m.side === 'top';

                const CardElement = (
                  <div
                    className={`${styles.milestoneCard} ${standard ? styles.cardStandard : ''} ${
                      isActive ? styles.cardActive : ''
                    }`}
                    onClick={() => handleSelectMilestone(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectMilestone(idx);
                      }
                    }}
                    aria-selected={isActive}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.yearBadge}>{m.year}</span>
                      <span className={standard ? styles.standardBadge : styles.historicalBadge}>
                        {standard ? 'Standard' : 'Epoch'}
                      </span>
                    </div>
                    <div className={styles.cardTitle}>{m.title}</div>
                    <p className={`${styles.cardDesc} ${isActive ? styles.cardDescExpanded : ''}`}>
                      {m.description}
                    </p>
                    {isActive && (
                      <div className={styles.cardExpandedDetails}>
                        <span>Active Timeline Focus</span>
                      </div>
                    )}
                  </div>
                );

                return (
                  <div key={m.year} className={styles.milestoneCol}>
                    {/* Top row */}
                    <div className={styles.topCardArea}>{isTop ? CardElement : null}</div>

                    {/* Middle axis row with dot and stems */}
                    <div className={styles.axisArea}>
                      {isTop && (
                        <div
                          className={`${styles.stemTop} ${isActive ? styles.stemActive : ''}`}
                          aria-hidden="true"
                        />
                      )}

                      <button
                        type="button"
                        className={styles.milestoneDotBtn}
                        onClick={() => handleSelectMilestone(idx)}
                        aria-label={`Milestone ${m.year}: ${m.title}`}
                      >
                        <span
                          className={`${styles.milestoneDot} ${
                            standard ? styles.dotStandard : styles.dotHistorical
                          } ${isActive ? styles.dotActive : ''}`}
                        />
                        <span
                          className={`${styles.dotYearLabel} ${
                            isTop ? styles.dotYearLabelBottom : styles.dotYearLabelTop
                          }`}
                        >
                          {m.year}
                        </span>
                      </button>

                      {!isTop && (
                        <div
                          className={`${styles.stemBottom} ${isActive ? styles.stemActive : ''}`}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Bottom row */}
                    <div className={styles.bottomCardArea}>{!isTop ? CardElement : null}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* MOBILE VERTICAL TIMELINE */
          <div className={styles.mobileTimeline} role="list" aria-label="Timeline milestones list">
            <div className={styles.mobileAxisLine} aria-hidden="true" />
            {timelineMilestones.map((m: TimelineMilestone, idx: number) => {
              const isActive = activeMilestoneIndex === idx;
              const standard = isStandard(m.year);

              return (
                <div
                  key={m.year}
                  className={styles.mobileMilestoneItem}
                  role="listitem"
                  onClick={() => handleSelectMilestone(idx)}
                >
                  <div className={styles.mobileDotContainer}>
                    <span
                      className={`${styles.milestoneDot} ${
                        standard ? styles.dotStandard : styles.dotHistorical
                      } ${isActive ? styles.dotActive : ''}`}
                    />
                  </div>
                  <div className={styles.mobileCardWrapper}>
                    <div
                      className={`${styles.milestoneCard} ${standard ? styles.cardStandard : ''} ${
                        isActive ? styles.cardActive : ''
                      }`}
                    >
                      <div className={styles.cardHeader}>
                        <span className={styles.yearBadge}>{m.year}</span>
                        <span className={standard ? styles.standardBadge : styles.historicalBadge}>
                          {standard ? 'Standard' : 'Epoch'}
                        </span>
                      </div>
                      <div className={styles.cardTitle}>{m.title}</div>
                      <p className={`${styles.cardDesc} ${isActive ? styles.cardDescExpanded : ''}`}>
                        {m.description}
                      </p>
                    </div>
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

export default History;
