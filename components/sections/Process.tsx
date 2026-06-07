"use client";

import { motion } from "framer-motion";
import { Compass, Lightbulb, Code2, Rocket } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { EASE, stagger } from "@/lib/motion";

/* Pasos del proceso. */
const steps = [
  {
    icon: Compass,
    title: "Diagnóstico",
    description:
      "Entendemos tu negocio, tus objetivos y tu audiencia. Armamos un brief estratégico claro y definimos el éxito del proyecto.",
  },
  {
    icon: Lightbulb,
    title: "Estrategia & Diseño",
    description:
      "Definimos la arquitectura de información, diseñamos cada pantalla y validamos con vos antes de escribir una línea de código.",
  },
  {
    icon: Code2,
    title: "Desarrollo",
    description:
      "Construimos con tecnología moderna, limpia y rápida. Iteramos en sprints cortos con demos semanales para que veas el progreso.",
  },
  {
    icon: Rocket,
    title: "Entrega & Soporte",
    description:
      "Lanzamos, medimos resultados y acompañamos. Soporte, mantenimiento y mejoras para que tu producto siga creciendo.",
  },
] as const;

export function Process() {
  return (
    <section id="proceso" className="py-24 md:py-32 relative">
      <div className="container-x">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <p className="eyebrow mb-6">
            <span className="inline-block w-8 h-px bg-[var(--color-accent)]" />
            02 — Cómo trabajamos
          </p>
          <h2 className="font-display text-h1 font-bold tracking-tight">
            <AnimatedText
              text="Un proceso claro. Sin sorpresas."
              as="span"
              className="block"
              viewport
              stagger={0.08}
              delay={0.1}
              yOffset={32}
            />
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Línea conectora horizontal (desktop) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-[var(--color-border-subtle)]"
          />
          {/* Línea conectora vertical (mobile + tablet) */}
          <div
            aria-hidden
            className="lg:hidden absolute top-0 bottom-0 left-6 w-px bg-[var(--color-border-subtle)]"
          />

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8"
          >
            {steps.map((s, i) => {
              const Icon = s.icon;
              const num = String(i + 1).padStart(2, "0");
              return (
                <motion.li
                  key={s.title}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: EASE },
                    },
                  }}
                  className="relative pl-16 lg:pl-0 lg:pt-16"
                >
                  {/* Icono numerado */}
                  <div className="absolute top-0 left-0 lg:relative lg:top-0 w-12 h-12 flex items-center justify-center bg-[var(--color-bg-primary)] lg:bg-[var(--color-bg-card)] border border-[var(--color-accent)] rounded-sm z-10">
                    <Icon
                      className="w-5 h-5 text-[var(--color-accent)]"
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Número grande decorativo */}
                  <div
                    aria-hidden
                    className="font-display text-6xl md:text-7xl font-bold text-[var(--color-accent)] opacity-20 mb-2"
                  >
                    {num}
                  </div>

                  {/* Título */}
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 text-[var(--color-text-primary)]">
                    {s.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-[var(--color-text-secondary)] text-body leading-relaxed">
                    {s.description}
                  </p>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
