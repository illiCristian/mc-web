"use client";

import { motion } from "framer-motion";
import { Code2, Users, Layers, Headphones } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { EASE, stagger } from "@/lib/motion";

/* Diferenciadores: ícono + título + descripción. */
const differentiators = [
  {
    icon: Code2,
    title: "Código propio, sin plantillas",
    description:
      "Cada proyecto se construye desde cero. Sin WordPress genérico, sin temas comprados. Tu sitio es realmente tuyo.",
  },
  {
    icon: Users,
    title: "Diseño UX pensado desde el usuario",
    description:
      "Investigación, prototipado y testeo antes de escribir una línea de código. Lo que diseñamos siempre responde a un porqué.",
  },
  {
    icon: Layers,
    title: "Stack moderno y escalable",
    description:
      "Next.js, TypeScript, Tailwind. Stack actual pensado para crecer sin reescrituras dolorosas ni deuda técnica.",
  },
  {
    icon: Headphones,
    title: "Acompañamiento real post-entrega",
    description:
      "No desaparecemos después del lanzamiento. Soporte, iteraciones y mejoras continuas para que tu producto evolucione.",
  },
] as const;

export function WhyUs() {
  return (
    <section
      id="nosotros"
      className="py-24 md:py-32 relative bg-[var(--color-bg-secondary)] border-y border-[var(--color-border-subtle)]"
    >
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Columna izquierda: título + bajada */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">
              <span className="inline-block w-8 h-px bg-[var(--color-accent)]" />
              Por qué elegirnos
            </p>
            <h2 className="font-display text-h2 font-bold tracking-tight">
              <AnimatedText
                text="No somos una agencia más. Somos tu equipo de producto."
                as="span"
                className="block"
                viewport
                stagger={0.06}
                delay={0.1}
                yOffset={32}
              />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.4, ease: EASE }}
              className="mt-6 text-body-lg text-[var(--color-text-secondary)] max-w-md"
            >
              Trabajamos con pocas marcas a la vez, con dedicación full-time y
              procesos claros. El resultado: productos digitales que se
              sienten hechos a medida — porque lo están.
            </motion.p>
          </div>

          {/* Columna derecha: lista de diferenciadores */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="lg:col-span-7 space-y-8"
          >
            {differentiators.map((d) => {
              const Icon = d.icon;
              return (
                <motion.li
                  key={d.title}
                  variants={{
                    hidden: { opacity: 0, x: 16 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.4, ease: EASE },
                    },
                  }}
                  className="flex gap-6 md:gap-8 pb-8 border-b border-[var(--color-border-subtle)] last:border-0 last:pb-0"
                >
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-[var(--color-border-medium)] rounded-sm bg-[var(--color-bg-card)]">
                    <Icon
                      className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-accent)]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-2xl font-bold mb-2 text-[var(--color-text-primary)]">
                      {d.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-body leading-relaxed">
                      {d.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
