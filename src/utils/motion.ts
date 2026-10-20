/**
 * DEVORA — Shared Animation System
 * 
 * Centralized motion variants and timing conventions.
 * Framer Motion owns component animations.
 * GSAP owns scroll-driven sequences and SVG path drawing.
 */
import type { Variants, Transition } from 'framer-motion';

/* ── Easing ── */
export const easing = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  gentle: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  spring: { type: 'spring' as const, stiffness: 100, damping: 20, mass: 0.8 },
  springSnappy: { type: 'spring' as const, stiffness: 200, damping: 25, mass: 0.6 },
};

/* ── Duration Scales ── */
export const duration = {
  micro: 0.15,
  fast: 0.2,
  normal: 0.35,
  content: 0.6,
  slow: 0.9,
  hero: 1.1,
};

/* ── Standard Transitions ── */
export const transitions: Record<string, Transition> = {
  micro: { duration: duration.micro, ease: easing.out },
  fast: { duration: duration.fast, ease: easing.out },
  normal: { duration: duration.normal, ease: easing.out },
  content: { duration: duration.content, ease: easing.out },
  slow: { duration: duration.slow, ease: easing.out },
  spring: easing.spring,
  springSnappy: easing.springSnappy,
};

/* ── Viewport config for whileInView ── */
export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: '-50px',
};

/* ── Entrance Variants ── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.content,
      ease: easing.out,
      delay: i * 0.08,
    },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: {
      duration: duration.content,
      ease: easing.out,
      delay: i * 0.08,
    },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.slow,
      ease: easing.out,
      delay: i * 0.08,
    },
  }),
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.content,
      ease: easing.out,
      delay: i * 0.08,
    },
  }),
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.content,
      ease: easing.out,
      delay: i * 0.08,
    },
  }),
};

/* ── Hero-specific variants ── */
export const heroLineReveal: Variants = {
  hidden: { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: 0.8,
      ease: easing.out,
      delay: 0.3 + i * 0.12,
    },
  }),
};

export const heroVisualReveal: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: easing.out,
      delay: 0.6,
    },
  },
};

/* ── Stagger Container ── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

/* ── SVG Path Draw ── */
export const pathDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 1.2,
        ease: easing.inOut,
        delay: i * 0.15,
      },
      opacity: {
        duration: 0.3,
        delay: i * 0.15,
      },
    },
  }),
};

/* ── Node Interactions ── */
export const nodeHover = {
  scale: 1.05,
  transition: transitions.fast,
};

export const nodeTap = {
  scale: 0.97,
  transition: transitions.micro,
};

export const nodeSelect: Variants = {
  inactive: {
    scale: 1,
    boxShadow: '0 0 0 0px rgba(197, 233, 123, 0)',
  },
  active: {
    scale: 1.02,
    boxShadow: '0 0 0 3px rgba(197, 233, 123, 0.6)',
    transition: transitions.normal,
  },
};

/* ── Connector Interactions ── */
export const connectorVariants: Variants = {
  inactive: {
    stroke: '#C8CAC4',
    strokeWidth: 1,
    opacity: 0.5,
  },
  active: {
    stroke: '#C5E97B',
    strokeWidth: 2,
    opacity: 1,
    transition: transitions.normal,
  },
  dimmed: {
    stroke: '#E2E3DE',
    strokeWidth: 0.5,
    opacity: 0.25,
    transition: transitions.normal,
  },
};

/* ── Reduced-motion check ── */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
