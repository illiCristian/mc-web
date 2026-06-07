import { Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { siteConfig, currentYear } from "@/lib/site-config";

/* Footer con logo, links, redes y copyright. Server component. */
export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)]">
      <div className="container-x py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Logo + tagline */}
          <div className="md:col-span-5">
            <a
              href="#inicio"
              className="inline-block font-display text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-200 hover:text-[var(--color-accent)]"
            >
              {siteConfig.name}
              <span className="text-[var(--color-accent)]">.</span>
            </a>
            <p className="mt-4 text-[var(--color-text-secondary)] text-body max-w-sm">
              Estudio digital en Buenos Aires. Construimos productos digitales
              premium con código propio y diseño a medida.
            </p>
          </div>

          {/* Navegación */}
          <div className="md:col-span-3">
            <h4 className="text-eyebrow text-[var(--color-text-tertiary)] mb-6">
              Navegación
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Servicios", href: "#servicios" },
                { label: "Nosotros", href: "#nosotros" },
                { label: "Proceso", href: "#proceso" },
                { label: "Contacto", href: "#contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block text-sm text-[var(--color-text-secondary)] transition-all duration-200 ease-out hover:text-[var(--color-accent)] hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-4">
            <h4 className="text-eyebrow text-[var(--color-text-tertiary)] mb-6">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                >
                  {siteConfig.email}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                >
                  {siteConfig.whatsapp}
                </a>
              </li>
              <li className="text-sm text-[var(--color-text-secondary)]">
                {siteConfig.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[var(--color-border-subtle)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-tertiary)]">
            © {currentYear} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[var(--color-text-secondary)] transition-all duration-200 ease-out hover:text-[var(--color-accent)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[var(--color-text-secondary)] transition-all duration-200 ease-out hover:text-[var(--color-accent)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
