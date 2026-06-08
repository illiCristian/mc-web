"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { EASE } from "@/lib/motion";

/* Tags de tecnologías — elemento decorativo inferior. */
const techTags = ["Next.js", "UX/UI", "SEO", "Branding"] as const;

const fadeProps = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: EASE, delay },
});

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-24 md:pt-32 pb-16 overflow-hidden"
    >
      {/* Gradiente radial sutil arriba */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(10, 10, 10, 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-x w-full relative z-10">
        {/* Eyebrow */}
        <motion.div {...fadeProps(0.1)} className="eyebrow mb-6 md:mb-8">
          <span className="inline-block w-8 h-px bg-[var(--color-accent)]" />
          Estudio digital · Buenos Aires
        </motion.div>

        {/* Headline — el texto de max jerarquía de la sección. */}
        <h1 className="font-display text-display font-bold tracking-tight mb-10 md:mb-14">
          <AnimatedText
            text="Transformamos"
            as="span"
            className="block text-[var(--color-text-primary)]"
            mode="words"
            stagger={0.08}
            delay={0.2}
            yOffset={32}
            duration={0.5}
          />
          <AnimatedText
            text="ideas en digital."
            as="span"
            className="block text-outline"
            mode="words"
            stagger={0.08}
            delay={0.5}
            yOffset={32}
            duration={0.5}

          />
        </h1>

        {/* Subtexto + CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end">
          <motion.p
            {...fadeProps(0.95)}
            className="md:col-span-6 text-body-lg text-[var(--color-text-secondary)] max-w-xl"
          >
            Diseño y desarrollo productos digitales a medida. Sitios web,
            e-commerce, branding y SEO — con código propio y foco en
            resultados.
          </motion.p>

          <motion.div
            {...fadeProps(1.1)}
            className="md:col-span-6 flex flex-wrap items-center gap-3 md:justify-end"
          >
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm md:text-base font-medium bg-[var(--color-accent)] text-[var(--color-bg-primary)] rounded-sm transition-all duration-200 ease-out hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Ver servicios
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm md:text-base font-medium border border-[var(--color-text-primary)]/30 text-[var(--color-text-primary)] rounded-sm transition-all duration-200 ease-out hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Hablemos
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Tags de tecnologías */}
        <motion.div
          {...fadeProps(1.4)}
          className="mt-16 md:mt-24 flex flex-wrap items-center gap-2 md:gap-3"
          aria-label="Tecnologías y servicios"
        >
          <span className="text-eyebrow text-[var(--color-text-tertiary)] mr-2">
            Trabajamos con
          </span>
          {techTags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.5 + i * 0.08, ease: EASE }}
              className="px-3 py-1.5 text-xs font-mono border border-[var(--color-border-subtle)] rounded-sm text-[var(--color-text-secondary)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Número decorativo gigante de fondo */}
      <div
        aria-hidden
        className="absolute right-[-2vw] bottom-[-4vw] md:bottom-[-6vw] font-display font-bold text-[28vw] md:text-[20vw] leading-none text-[var(--color-accent)] opacity-[0.05] select-none pointer-events-none"
      >
        01
      </div>
    </section>
  );
}
