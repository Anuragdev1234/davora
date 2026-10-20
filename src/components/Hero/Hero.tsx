import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  heroLineReveal,
  heroVisualReveal,
  fadeUp,
  fadeIn,
} from '../../utils/motion';
import { useReducedMotion, useScrollTo, useMousePosition } from '../../hooks/useMotion';
import styles from './Hero.module.css';

export function Hero() {
  const reduced = useReducedMotion();
  const scrollTo = useScrollTo();
  const heroRef = useRef<HTMLElement | null>(null);
  const mouse = useMousePosition(heroRef);

  // Subtle parallax offset from mouse
  const px = (mouse.x - 0.5) * 12;
  const py = (mouse.y - 0.5) * 12;

  return (
    <section id="hero" className={styles.section} ref={heroRef}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Section label */}
          <motion.span
            className={styles.sectionLabel}
            variants={fadeIn}
            initial={reduced ? undefined : 'hidden'}
            animate="visible"
            custom={0}
          >
            01 / THE LOGIC CORE
          </motion.span>

          {/* Headline */}
          <h1 className={styles.headline}>
            {['Think beyond', 'the syntax.', 'Understand', 'the system.'].map(
              (line, i) => (
                <motion.span
                  key={i}
                  className={styles.headlineLine}
                  variants={heroLineReveal}
                  initial={reduced ? undefined : 'hidden'}
                  animate="visible"
                  custom={i}
                >
                  {line}
                </motion.span>
              )
            )}
          </h1>

          {/* Supporting text */}
          <motion.p
            className={styles.supporting}
            variants={fadeUp}
            initial={reduced ? undefined : 'hidden'}
            animate="visible"
            custom={5}
          >
            Discover C through the logic, ideas, and mechanisms
            that make software work.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className={styles.ctas}
            variants={fadeUp}
            initial={reduced ? undefined : 'hidden'}
            animate="visible"
            custom={6}
          >
            <button
              className="btn btn-primary"
              onClick={() => scrollTo('twoworlds')}
            >
              Explore Devora
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => scrollTo('experiment')}
            >
              Try It
            </button>
          </motion.div>
        </div>

        {/* Logic Core Visual */}
        <motion.div
          className={styles.visual}
          variants={heroVisualReveal}
          initial={reduced ? undefined : 'hidden'}
          animate="visible"
          style={reduced ? undefined : { transform: `translate(${px}px, ${py}px)` }}
        >
          <div className={styles.coreLabel}>The Logic Core</div>

          <div className={styles.sculptureWrapper}>
            <img
              src="/images/devora-logic-core-c-icon.png"
              alt="The Logic Core — C Computational Architecture"
              className={styles.sculptureImage}
              width={765}
              height={585}
              loading="eager"
              decoding="async"
            />
          </div>

          <div className={styles.coreAnnotation}>
            <span className={styles.annotationDot} />
            The computational architecture. Core abstraction: Castle.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
