import type { Variants, Transition } from "framer-motion";

/* Curva de easing "ease-out-expo" — entradas rápidas con desaceleración suave. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Transición base: 400ms (límite de "no perecible"). */
const baseTransition: Transition = {
  duration: 0.4,
  ease: EASE,
};

/* Variante fadeUp: 24px de entrada, opacidad 0 → 1, 400ms. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

/* Variante stagger: 80ms entre hijos. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/* Variante fadeUp con delay configurable (para encadenar). */
export const fadeUpDelayed = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...baseTransition, delay },
  },
});

/* Viewport config estándar para whileInView. */
export const defaultViewport = {
  once: true,
  margin: "-80px",
} as const;
