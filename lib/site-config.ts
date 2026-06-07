/* Configuración central del sitio — fácil de editar. */

export const siteConfig = {
  name: "Antigravity",
  tagline: "Estudio digital · Buenos Aires",
  description:
    "Estudio digital en Buenos Aires. Diseño UX/UI, desarrollo web, e-commerce, branding y SEO.",
  email: "hola@antigravity.studio",
  whatsapp: "+54 9 11 0000 0000",
  whatsappLink: "https://wa.me/5491100000000",
  location: "Buenos Aires, Argentina",
  social: {
    instagram: "https://instagram.com/antigravity",
    linkedin: "https://linkedin.com/company/antigravity",
  },
} as const;

/* Año dinámico para el footer */
export const currentYear = new Date().getFullYear();
