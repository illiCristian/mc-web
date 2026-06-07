"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { EASE } from "@/lib/motion";

export function CTA() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: EASE }}
          className="relative overflow-hidden bg-[var(--color-accent)] text-[var(--color-bg-primary)] rounded-sm"
        >
          {/* Decoración de fondo */}
          <div
            aria-hidden
            className="absolute -right-20 -top-20 w-72 h-72 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(10,10,10,0.15) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="absolute -left-10 -bottom-10 w-64 h-64 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(10,10,10,0.1) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 px-6 py-16 md:px-16 md:py-24 text-center md:text-left flex flex-col md:flex-row items-center md:items-center justify-between gap-8 md:gap-12">
            <div className="max-w-2xl">
              <h2 className="font-display text-h1 font-bold tracking-tight">
                <AnimatedText
                  text="¿Tenés un proyecto en mente?"
                  as="span"
                  className="block"
                  viewport
                  stagger={0.06}
                  delay={0.1}
                />
              </h2>
              <p className="mt-4 md:mt-6 text-body-lg text-[var(--color-bg-primary)]/70 max-w-xl">
                Contanos qué necesitás. Respondemos en menos de 24 hs con una
                propuesta concreta.
              </p>
            </div>

            <a
              href="#contacto"
              className="group inline-flex items-center gap-3 px-8 py-4 text-base md:text-lg font-medium bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] rounded-sm transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Hablemos
              <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:rotate-45" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
