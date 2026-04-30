import { Variants, Transition } from 'framer-motion';

// ===============================
// CUSTOM EASING FUNCTIONS
// ===============================

export const easings = {
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  spring: { type: 'spring', stiffness: 100, damping: 15 },
  smooth: { type: 'spring', stiffness: 80, damping: 20 },
} as const;

// ===============================
// TRANSITION PRESETS
// ===============================

export const transitions: Record<string, Transition> = {
  fast: { duration: 0.3, ease: easings.easeOutCubic },
  medium: { duration: 0.5, ease: easings.easeOutExpo },
  slow: { duration: 0.8, ease: easings.easeOutExpo },
  spring: easings.spring,
  smooth: easings.smooth,
};

// Mobile-optimized transitions (faster and lighter)
export const mobileTransitions: Record<string, Transition> = {
  fast: { duration: 0.2, ease: easings.easeOutCubic },
  medium: { duration: 0.3, ease: easings.easeOutCubic },
  slow: { duration: 0.5, ease: easings.easeOutCubic },
};

// ===============================
// FADE ANIMATIONS
// ===============================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.medium,
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.medium,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.medium,
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.medium,
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.medium,
  },
};

// ===============================
// SCALE ANIMATIONS
// ===============================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.smooth,
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.medium,
  },
};

// ===============================
// SLIDE ANIMATIONS
// ===============================

export const slideInUp: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: transitions.medium,
  },
};

export const slideInDown: Variants = {
  hidden: { y: -60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: transitions.medium,
  },
};

// ===============================
// STAGGER CONTAINER
// ===============================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.medium,
  },
};

// ===============================
// PAGE TRANSITIONS
// ===============================

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: easings.easeOutCubic,
    },
  },
};

// Advanced page transitions with beautiful effects
export const pageSlideUp: Variants = {
  initial: {
    opacity: 0,
    y: 60,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -60,
    scale: 0.96,
    transition: {
      duration: 0.4,
      ease: easings.easeOutCubic,
    },
  },
};

export const pageFadeScale: Variants = {
  initial: {
    opacity: 0,
    scale: 0.92,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.08,
    transition: {
      duration: 0.3,
      ease: easings.easeOutCubic,
    },
  },
};

export const pageSlideLeft: Variants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.4,
      ease: easings.easeOutCubic,
    },
  },
};

// ===============================
// HOVER & TAP ANIMATIONS
// ===============================

export const hoverScale = {
  scale: 1.05,
  transition: transitions.fast,
};

export const tapScale = {
  scale: 0.95,
};

export const hoverLift = {
  y: -4,
  transition: transitions.fast,
};

// ===============================
// VIEWPORT CONFIGS
// ===============================

export const viewportConfig = {
  once: true,
  amount: 0.3 as const,
  margin: '0px 0px -100px 0px',
};

export const viewportConfigLarge = {
  once: true,
  amount: 0.2 as const,
  margin: '0px 0px -150px 0px',
};

// ===============================
// UTILITY FUNCTIONS
// ===============================

/**
 * Creates a stagger animation with custom delay
 */
export const createStagger = (staggerDelay: number = 0.1, delayChildren: number = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/**
 * Creates a custom fade animation with direction
 */
export const createFadeAnimation = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 40,
  duration: number = 0.5
): Variants => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
    }
  };

  return {
    hidden: { opacity: 0, ...getInitialPosition() },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration, ease: easings.easeOutExpo },
    },
  };
};

/**
 * Checks if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Checks if device is mobile for performance optimization
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Returns appropriate animation based on user preference and device
 */
export const getAnimation = (animation: Variants): Variants => {
  if (prefersReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    };
  }
  
  // Simplify animations on mobile for better performance
  if (isMobileDevice()) {
    return {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easings.easeOutCubic } },
    };
  }
  
  return animation;
};

// ===============================
// ENHANCED STAGGER PATTERNS
// ===============================

/**
 * Wave stagger - creates a wave-like reveal effect
 */
export const waveStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

/**
 * Progressive stagger - faster as it goes
 */
export const progressiveStagger = (itemCount: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15 / itemCount,
      delayChildren: 0.1,
    },
  },
});

// ===============================
// SCROLL-BASED ANIMATIONS
// ===============================

/**
 * Parallax scroll effect
 */
export const parallaxVariants = {
  initial: { y: 0 },
  animate: (custom: number = 50) => ({
    y: custom,
    transition: {
      duration: 0,
    },
  }),
};

/**
 * Progressive reveal on scroll
 */
export const revealOnScroll: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easings.easeOutExpo,
    },
  },
};

/**
 * Slide reveal with clip path
 */
export const clipReveal: Variants = {
  hidden: {
    clipPath: 'inset(0 100% 0 0)',
  },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 0.8,
      ease: easings.easeOutExpo,
    },
  },
};

// ===============================
// MICRO-INTERACTIONS
// ===============================

/**
 * Pulse animation for attention
 */
export const pulse = {
  scale: [1, 1.02, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

/**
 * Bounce on hover
 */
export const bounceHover = {
  y: [-2, 0, -2],
  transition: {
    duration: 0.6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

/**
 * Glow effect on hover
 */
export const glowHover = {
  boxShadow: [
    "0 0 0 rgba(59, 130, 246, 0)",
    "0 0 20px rgba(59, 130, 246, 0.3)",
    "0 0 0 rgba(59, 130, 246, 0)",
  ],
  transition: {
    duration: 1.5,
    repeat: Infinity,
  },
};

/**
 * Icon rotate on reveal
 */
export const iconRotate: Variants = {
  hidden: {
    opacity: 0,
    rotate: -180,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.easeOutExpo,
    },
  },
};

/**
 * Card lift with shadow
 */
export const cardLift = {
  y: -8,
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
  transition: transitions.fast,
};

// ===============================
// TEXT ANIMATIONS
// ===============================

/**
 * Split text reveal - for word-by-word animation
 */
export const textRevealContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const textRevealWord: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: easings.easeOutCubic,
    },
  },
};

// ===============================
// IMAGE ANIMATIONS
// ===============================

/**
 * Image reveal with scale
 */
export const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.2,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easings.easeOutExpo,
    },
  },
};

/**
 * Image hover effect
 */
export const imageHover = {
  scale: 1.05,
  filter: "brightness(1.1)",
  transition: {
    duration: 0.4,
    ease: easings.easeOutCubic,
  },
};

// ===============================
// SECTION TRANSITIONS
// ===============================

/**
 * Section fade in
 */
export const sectionFadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easings.easeOutCubic,
    },
  },
};

/**
 * Section slide up
 */
export const sectionSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easings.easeOutExpo,
    },
  },
};

// ===============================
// CAROUSEL ANIMATIONS
// ===============================

/**
 * Smooth carousel slide
 */
export const carouselSlide = (direction: number, isRTL: boolean = false) => ({
  enter: {
    x: direction > 0 ? (isRTL ? -1000 : 1000) : (isRTL ? 1000 : -1000),
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    x: direction > 0 ? (isRTL ? 1000 : -1000) : (isRTL ? -1000 : 1000),
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: easings.easeOutCubic,
    },
  },
});

/**
 * Crossfade transition
 */
export const crossfade: Variants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

// ===============================
// ENHANCED PAGE TRANSITIONS
// ===============================

/**
 * Smooth fade with subtle slide
 */
export const smoothPageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: {
      duration: 0.4,
      ease: easings.easeOutCubic,
    },
  },
};

/**
 * Curtain reveal effect
 */
export const curtainReveal: Variants = {
  initial: {
    clipPath: 'inset(0 0 100% 0)',
  },
  animate: {
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 0.8,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    clipPath: 'inset(100% 0 0 0)',
    transition: {
      duration: 0.6,
      ease: easings.easeOutCubic,
    },
  },
};

/**
 * Zoom fade transition
 */
export const zoomFade: Variants = {
  initial: {
    opacity: 0,
    scale: 0.94,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.06,
    transition: {
      duration: 0.3,
      ease: easings.easeOutCubic,
    },
  },
};

// ===============================
// LANGUAGE SWITCHER ANIMATIONS
// ===============================

/**
 * Language switch overlay
 */
export const languageOverlay: Variants = {
  initial: {
    clipPath: 'circle(0% at 50% 50%)',
    opacity: 0,
  },
  animate: {
    clipPath: 'circle(150% at 50% 50%)',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    clipPath: 'circle(0% at 50% 50%)',
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOutCubic,
    },
  },
};

/**
 * Language button animation
 */
export const languageButton: Variants = {
  idle: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: transitions.fast,
  },
  tap: {
    scale: 0.95,
  },
};

// ===============================
// ENHANCED STAGGER FOR SECTIONS
// ===============================

/**
 * Fast sequential reveal
 */
export const fastStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

/**
 * Delayed cascade effect
 */
export const cascadeStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

/**
 * Advanced stagger with scale
 */
export const scaleStaggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.easeOutExpo,
    },
  },
};

// ===============================
// BLUR ANIMATIONS (Modern Effect)
// ===============================

/**
 * Blur fade in
 */
export const blurFadeIn: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: easings.easeOutExpo,
    },
  },
};

/**
 * Blur slide up
 */
export const blurSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: easings.easeOutExpo,
    },
  },
};

// ===============================
// ENHANCED HERO ANIMATIONS
// ===============================

/**
 * Hero title reveal
 */
export const heroTitleReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easings.easeOutExpo,
    },
  },
};

/**
 * Hero image parallax
 */
export const heroImageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
    y: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easings.easeOutExpo,
    },
  },
};
