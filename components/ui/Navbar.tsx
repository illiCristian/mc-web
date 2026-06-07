"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";
import { fadeUp, stagger } from "@/lib/motion";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /* Sticky background: aparece al pasar los 60px de scroll. */
  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Bloquea scroll del body cuando el menú mobile está abierto. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Focus trap + Escape: aplica solo cuando el menú mobile está abierto. */
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    if (!menu) return;

    const trigger = document.activeElement as HTMLElement;

    const getFocusable = (): HTMLElement[] =>
      Array.from(
        menu.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      );

    // Foco inicial al primer elemento
    getFocusable()[0]?.focus();

    const handleKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      const active = document.activeElement as HTMLElement;

      if (e.shiftKey && (active === first || !menu.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !menu.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      trigger?.focus();
    };
  }, [open]);

  const handleLinkClick = (): void => setOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-out",
        scrolled
          ? "bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-b border-[var(--color-border-subtle)]"
          : "bg-transparent",
      )}
    >
      <nav
        className="container-x flex items-center justify-between h-16 md:h-20"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <a
          href="#inicio"
          className="font-display text-xl md:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
        >
          {siteConfig.name}
          <span className="text-[var(--color-accent)]">.</span>
        </a>

        {/* Links desktop (≥1024px) */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text-primary)] group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-accent)] group-hover:w-full transition-all duration-200" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop (≥1024px) */}
        <a
          href="#contacto"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-[var(--color-text-primary)]/30 text-[var(--color-text-primary)] rounded-sm transition-all duration-200 ease-out hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)] hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Hablemos
          <ArrowUpRight className="w-4 h-4" />
        </a>

        {/* Botón hamburguesa (mobile + tablet) */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 text-[var(--color-text-primary)] transition-transform duration-200 active:scale-[0.98]"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Overlay mobile full-screen */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-16 md:top-20 bg-[var(--color-bg-primary)] z-40 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={stagger}
              className="container-x flex flex-col gap-1 pt-8"
            >
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={fadeUp}>
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block py-4 font-display text-4xl font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border-subtle)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={fadeUp} className="mt-8">
                <a
                  href="#contacto"
                  onClick={handleLinkClick}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-[var(--color-accent)] text-[var(--color-bg-primary)] rounded-sm transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Hablemos
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
