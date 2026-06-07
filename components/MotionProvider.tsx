"use client";

import { MotionConfig } from "framer-motion";

/* Provider que aplica la transición base a todos los componentes motion
   y respeta prefers-reduced-motion a nivel global. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
