"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUpDelayed, defaultViewport } from "@/lib/motion";
import { cn } from "@/lib/cn";

/* Card de servicio. Animación: fadeUp con delay escalonado por index. */
export interface ServiceCardProps {
  index: number;
  title: string;
  description: string;
  items: readonly string[];
}

export function ServiceCard({
  index,
  title,
  description,
  items,
}: ServiceCardProps) {
  const num = String(index).padStart(2, "0");

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeUpDelayed((index - 1) * 0.05)}
      className={cn(
        "group relative bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-sm p-6 md:p-8",
        "transition-all duration-200 ease-out hover:border-[var(--color-accent)] hover:-translate-y-0.5",
      )}
    >
      {/* Header con número y label */}
      <div className="flex items-start justify-between mb-6">
        <span className="font-mono text-sm text-[var(--color-accent)]">
          ({num})
        </span>
        <span
          aria-hidden
          className="text-xs text-[var(--color-text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          Servicio →
        </span>
      </div>

      {/* Título */}
      <h3 className="font-display text-xl md:text-2xl font-bold mb-3 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
        {title}
      </h3>

      {/* Descripción */}
      <p className="text-[var(--color-text-secondary)] text-base leading-relaxed mb-6">
        {description}
      </p>

      {/* Lista de sub-ítems */}
      <ul className="space-y-2 border-t border-[var(--color-border-subtle)] pt-5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]"
          >
            <Check
              className="w-4 h-4 mt-0.5 text-[var(--color-accent)] shrink-0"
              strokeWidth={2.5}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
