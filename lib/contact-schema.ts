import { z } from "zod";

/* Esquema de validación para el formulario de contacto.
   Coincide con los campos definidos en la sección Contact. */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre es demasiado largo"),
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Ingresá un email válido"),
  projectType: z.enum(
    ["web", "landing", "ecommerce", "branding", "seo", "otro"],
    { message: "Elegí un tipo de proyecto" },
  ),
  message: z
    .string()
    .min(10, "Contanos un poco más (mínimo 10 caracteres)")
    .max(2000, "El mensaje es demasiado largo"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/* Etiquetas legibles para el select */
export const projectTypeLabels: Record<ContactFormValues["projectType"], string> = {
  web: "Sitio web institucional",
  landing: "Landing page",
  ecommerce: "E-commerce",
  branding: "Branding",
  seo: "SEO / Posicionamiento",
  otro: "Otro",
};
