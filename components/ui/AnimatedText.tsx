"use client";

import { motion, type Variants } from "framer-motion";
import { EASE, defaultViewport } from "@/lib/motion";
import { cn } from "@/lib/cn";

/* Componente reutilizable para texto animado.
   - Modo "words" (palabra por palabra) o "chars" (letra por letra).
   - Se dispara al cargar (viewport=false) o al entrar en viewport (viewport=true).
   - Permite colorear palabras individuales (wordColors). */

type SplitMode = "words" | "chars";
type AnimatedTag = "h1" | "h2" | "h3" | "p" | "span" | "div";

export interface AnimatedTextProps {
  text: string;
  className?: string;
  mode?: SplitMode;
  /** Si true, dispara al entrar en viewport. Default: false. */
  viewport?: boolean;
  /** Delay antes de iniciar (segundos). */
  delay?: number;
  /** Stagger entre hijos (segundos). Default: 0.08 (80ms). */
  stagger?: number;
  /** Duración de cada fragmento (segundos). Default: 0.4 (400ms). */
  duration?: number;
  /** Eje Y desde donde entra (px). Default: 24. */
  yOffset?: number;
  /** Color por palabra. Slots vacíos se ignoran. */
  wordColors?: (string | undefined)[];
  as?: AnimatedTag;
}

function buildItem(yOffset: number, duration: number): Variants {
  return {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE },
    },
  };
}

function buildContainer(stagger: number, delay: number): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

function splitTokens(text: string, mode: SplitMode): string[] {
  if (mode === "words") return text.split(/(\s+)/);
  return Array.from(text);
}

export function AnimatedText({
  text,
  className,
  mode = "words",
  viewport = false,
  delay = 0,
  stagger = 0.08,
  duration = 0.4,
  yOffset = 24,
  wordColors,
  as: Tag = "h2",
}: AnimatedTextProps) {
  const tokens = splitTokens(text, mode);
  const containerVariants = buildContainer(stagger, delay);
  const itemVariants = buildItem(yOffset, duration);

  const motionProps = viewport
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: defaultViewport,
        variants: containerVariants,
      }
    : {
        initial: "hidden",
        animate: "visible",
        variants: containerVariants,
      };

  // Índice de la palabra real (sin contar espacios)
  const wordIndex = (i: number): number =>
    mode === "words"
      ? tokens.slice(0, i).filter((t) => t.trim().length > 0).length
      : i;

  return (
    <Tag className={cn("inline-block", className)} aria-label={text}>
      <motion.span
        className="inline-block"
        aria-hidden="true"
        {...motionProps}
      >
        {tokens.map((token, i) => {
          if (token.match(/^\s+$/)) {
            return (
              <span key={`s-${i}`} className="inline-block" style={{ whiteSpace: "pre-wrap" }}>
                {token}
              </span>
            );
          }
          const idx = wordIndex(i);
          const color = wordColors?.[idx];
          return (
            <motion.span
              key={`t-${i}`}
              variants={itemVariants}
              className="inline-block"
              style={color ? { color } : undefined}
            >
              {token}
            </motion.span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
