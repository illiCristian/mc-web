import { ServiceCard } from "@/components/ui/ServiceCard";
import { AnimatedText } from "@/components/ui/AnimatedText";

/* Data de los servicios. Editar acá para cambiar el contenido. */
const services = [
  {
    title: "Diseño & Desarrollo Web",
    description:
      "Sitios institucionales, landings de presentación y sitios corporativos a medida. Hecho a mano, sin plantillas.",
    items: [
      "Sitios institucionales & landings",
      "Aplicaciones web a medida",
      "Performance y accesibilidad",
      "CMS y panel de autogestión",
    ],
  },
  {
    title: "E-commerce",
    description:
      "Tiendas online con foco en conversión y experiencia de compra. Integraciones con medios de pago y logística.",
    items: [
      "Tiendas online a medida",
      "Shopify, Tiendanube y headless",
      "Medios de pago y envíos",
      "Estrategia de conversión",
    ],
  },
  {
    title: "Diseño de Productos Digitales",
    description:
      "Diseño UX/UI, prototipos interactivos y sistemas de diseño escalables para productos digitales.",
    items: [
      "Investigación y arquitectura",
      "Wireframes y prototipos",
      "UI visual y design systems",
      "Pruebas con usuarios",
    ],
  },
  {
    title: "Branding",
    description:
      "Identidad visual completa, naming y guías de marca. Sistemas versátiles listos para todos los soportes.",
    items: [
      "Naming e identidad verbal",
      "Logo y sistema visual",
      "Manual de marca",
      "Papelería y templates",
    ],
  },
  {
    title: "Auditorías & Asesoramiento",
    description:
      "Diagnóstico técnico y estratégico. Analizamos tu proyecto y armamos una hoja de ruta de mejoras concreta.",
    items: [
      "Auditoría técnica",
      "Auditoría UX y SEO",
      "Hoja de ruta priorizada",
      "Mentoring para equipos",
    ],
  },
  {
    title: "SEO & Posicionamiento",
    description:
      "Optimización técnica, estrategia de contenidos y keywords para que tu sitio aparezca donde están tus clientes.",
    items: [
      "SEO técnico on-page",
      "Estrategia de contenidos",
      "Keyword research",
      "Reportes y seguimiento",
    ],
  },
] as const;

export function Services() {
  return (
    <section id="servicios" className="py-24 md:py-32 relative">
      <div className="container-x">
        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="eyebrow mb-6">
            <span className="inline-block w-8 h-px bg-[var(--color-accent)]" />
            01 — Lo que hacemos
          </p>
          <h2 className="font-display text-h1 font-bold tracking-tight">
            <AnimatedText
              text="Servicios que construyen negocios reales."
              as="span"
              className="block"
              viewport
              stagger={0.08}
              delay={0.1}
              yOffset={32}
              wordColors={[
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                "var(--color-accent)",
              ]}
            />
          </h2>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              index={i + 1}
              title={s.title}
              description={s.description}
              items={s.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
