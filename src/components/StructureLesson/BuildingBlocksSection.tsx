import { motion } from 'framer-motion';
import {
  FileText,
  Cpu,
  Database,
  Play,
  CornerDownLeft,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { PROGRAM_COMPONENTS, type ProgramComponent } from '../../data/structureLessonData';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './BuildingBlocksSection.module.css';

interface BuildingBlocksSectionProps {
  activeComponentId: string;
  onSelectComponent: (componentId: string) => void;
}

export function BuildingBlocksSection({
  activeComponentId,
  onSelectComponent,
}: BuildingBlocksSectionProps) {
  const reduced = useReducedMotion();

  const getComponentIcon = (iconName: ProgramComponent['iconName']) => {
    switch (iconName) {
      case 'file-text':
        return <FileText size={17} className={styles.iconGraphic} aria-hidden="true" />;
      case 'cpu':
        return <Cpu size={17} className={styles.iconGraphic} aria-hidden="true" />;
      case 'database':
        return <Database size={17} className={styles.iconGraphic} aria-hidden="true" />;
      case 'play':
        return <Play size={17} className={styles.iconGraphic} aria-hidden="true" />;
      case 'corner-down-left':
        return <CornerDownLeft size={17} className={styles.iconGraphic} aria-hidden="true" />;
      case 'message-square':
        return <MessageSquare size={17} className={styles.iconGraphic} aria-hidden="true" />;
      default:
        return <FileText size={17} className={styles.iconGraphic} aria-hidden="true" />;
    }
  };

  const handleCardClick = (componentId: string) => {
    onSelectComponent(componentId);
    // Smoothly scroll down to the code explorer respecting sticky header
    const explorerEl = document.getElementById('code-explorer');
    if (explorerEl) {
      const navHeight = 110;
      const elementPosition = explorerEl.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="program-components"
      className={styles.sectionWrapper}
      aria-labelledby="blocks-heading"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIndex}>02</span>
            <span className={styles.eyebrowDivider}>/</span>
            <span>COMPONENTS</span>
          </div>

          <h2 id="blocks-heading" className={styles.mainHeading}>
            The building blocks.
          </h2>

          <p className={styles.subHeading}>
            Each part visually revealed &bull; Click any component to inspect its line and behavior in the
            interactive code explorer.
          </p>
        </div>

        {/* Compact, Structured 6-Component Grid */}
        <div className={styles.grid}>
          {PROGRAM_COMPONENTS.map((comp, idx) => {
            const isActive = comp.id === activeComponentId;

            return (
              <motion.div
                key={comp.id}
                className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                onClick={() => handleCardClick(comp.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(comp.id);
                  }
                }}
                initial={reduced ? undefined : { opacity: 0, y: 12 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                aria-label={`Inspect ${comp.title}`}
              >
                {/* Card Top: Restrained Icon & Component Index */}
                <div className={styles.cardHeader}>
                  <div className={`${styles.iconWrap} ${isActive ? styles.iconWrapActive : ''}`}>
                    {getComponentIcon(comp.iconName)}
                  </div>
                  <span className={styles.compIndex}>{comp.number}</span>
                </div>

                {/* Title & Short Concise Description */}
                <h3 className={styles.cardTitle}>{comp.title}</h3>
                <p className={styles.cardDesc}>{comp.shortRole}</p>

                {/* Compact Code Snippet */}
                <div className={styles.snippetWrap}>
                  <code className={styles.snippetCode}>{comp.snippet}</code>
                </div>

                {/* Card Bottom: Subtle Interactive Cue */}
                <div className={styles.cardFooter}>
                  <span className={styles.exploreText}>
                    {isActive ? 'Active in Explorer' : 'Inspect Line'}
                  </span>
                  <ArrowRight
                    size={13}
                    className={`${styles.cardArrow} ${isActive ? styles.arrowActive : ''}`}
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BuildingBlocksSection;
