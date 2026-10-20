import { motion } from 'framer-motion';
import {
  Terminal,
  Cpu,
  Layers,
  FileCode,
  Database,
  Gamepad2,
  Network,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import { fadeUp, viewportConfig } from '../../utils/motion';
import { useReducedMotion } from '../../hooks/useMotion';
import styles from './WhereCIsUsedSection.module.css';

interface DomainItem {
  id: string;
  title: string;
  description: string;
  icon: typeof Terminal;
}

const DOMAINS: DomainItem[] = [
  {
    id: 'os',
    title: 'Operating Systems',
    description:
      'Used in kernels, operating-system components, and system utilities. Linux contains substantial amounts of C code.',
    icon: Terminal,
  },
  {
    id: 'embedded',
    title: 'Embedded Systems',
    description:
      'Used in microcontrollers, firmware, IoT devices, and electronics with limited resources.',
    icon: Cpu,
  },
  {
    id: 'system-software',
    title: 'System Software',
    description:
      'Used to develop device drivers, system utilities, and other low-level software.',
    icon: Layers,
  },
  {
    id: 'compilers',
    title: 'Compiler Development',
    description:
      'Used to implement compilers, language tools, and related infrastructure.',
    icon: FileCode,
  },
  {
    id: 'databases',
    title: 'Database Systems',
    description:
      'Used in database engines and performance-sensitive data processing components.',
    icon: Database,
  },
  {
    id: 'graphics',
    title: 'Game and Graphics Technology',
    description:
      'Used in selected game engines, rendering infrastructure, and performance-critical components.',
    icon: Gamepad2,
  },
  {
    id: 'networking',
    title: 'Networking',
    description:
      'Used in network utilities, protocol implementations, and communication software.',
    icon: Network,
  },
  {
    id: 'scientific',
    title: 'Scientific Computing',
    description:
      'Used in numerical software, simulations, and performance-sensitive scientific applications.',
    icon: Activity,
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    description:
      'Used to develop low-level analysis tools, security utilities, and network diagnostics.',
    icon: ShieldCheck,
  },
];

export function WhereCIsUsedSection() {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className={styles.section}
      variants={reduced ? undefined : fadeUp}
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={viewportConfig}
      aria-labelledby="where-c-is-used-heading"
    >
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>06 / REAL-WORLD IMPACT</span>
        <h2 id="where-c-is-used-heading" className={styles.heading}>
          The language beneath the systems.
        </h2>
        <p className={styles.subheading}>
          C remains valuable wherever developers need efficient execution, control over memory,
          or direct interaction with system-level interfaces.
        </p>
      </div>

      <div className={styles.domainGrid} role="list" aria-label="Industries and Systems Powered by C">
        {DOMAINS.map((domain) => {
          const Icon = domain.icon;
          return (
            <div key={domain.id} className={styles.domainCard} role="listitem">
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <Icon size={14} aria-hidden="true" />
                </div>
                <h3 className={styles.cardTitle}>{domain.title}</h3>
              </div>
              <p className={styles.cardText}>{domain.description}</p>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

export default WhereCIsUsedSection;
