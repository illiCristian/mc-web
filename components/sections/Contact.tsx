"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Check,
  AlertCircle,
} from "lucide-react";
import {
  contactSchema,
  projectTypeLabels,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site-config";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Select, type SelectOption } from "@/components/ui/Select";
import { cn } from "@/lib/cn";

type FormStatus = "idle" | "submitting" | "success" | "error";

/* Opciones del select derivadas del schema (single source of truth) */
const projectTypeOptions: Array<SelectOption<ContactFormValues["projectType"]>> = (
  Object.entries(projectTypeLabels) as Array<
    [ContactFormValues["projectType"], string]
  >
).map(([value, label]) => ({ value, label }));

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  /* Handler de envío. Hoy solo loguea; listo para conectar con Resend. */
  const onSubmit = async (data: ContactFormValues): Promise<void> => {
    setStatus("submitting");
    try {
      // TODO: reemplazar por fetch('/api/contact', ...) cuando esté listo
      console.log("[Contact form submission]", data);
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  const retry = (): void => setStatus("idle");

  return (
    <section
      id="contacto"
      className="py-24 md:py-32 relative border-t border-[var(--color-border-subtle)]"
    >
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Columna izquierda: título + datos */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">
              <span className="inline-block w-8 h-px bg-[var(--color-accent)]" />
              03 — Contacto
            </p>
            <h2 className="font-display text-h1 font-bold tracking-tight">
              <AnimatedText
                text="Empecemos a trabajar juntos."
                as="span"
                className="block"
                viewport
                stagger={0.08}
                delay={0.1}
              />
            </h2>
            <p className="mt-6 text-body-lg text-[var(--color-text-secondary)] max-w-md">
              Escribinos y contanos sobre tu proyecto. Respondemos en menos de
              24 hs con ideas concretas, presupuesto y próximos pasos.
            </p>

            {/* Datos de contacto */}
            <ul className="mt-10 space-y-4">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center gap-3 text-[var(--color-text-primary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                >
                  <span className="w-10 h-10 flex items-center justify-center border border-[var(--color-border-subtle)] rounded-sm transition-colors duration-200 group-hover:border-[var(--color-accent)]">
                    <Mail className="w-4 h-4" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm md:text-base">
                    {siteConfig.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-[var(--color-text-primary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                >
                  <span className="w-10 h-10 flex items-center justify-center border border-[var(--color-border-subtle)] rounded-sm transition-colors duration-200 group-hover:border-[var(--color-accent)]">
                    <Phone className="w-4 h-4" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm md:text-base">
                    {siteConfig.whatsapp}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-[var(--color-text-primary)]">
                <span className="w-10 h-10 flex items-center justify-center border border-[var(--color-border-subtle)] rounded-sm">
                  <MapPin className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <span className="text-sm md:text-base">
                  {siteConfig.location}
                </span>
              </li>
            </ul>
          </div>

          {/* Columna derecha: formulario */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Formulario de contacto"
              className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-sm p-6 md:p-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Nombre */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-eyebrow text-[var(--color-text-tertiary)]"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    placeholder="Tu nombre"
                    className="w-full bg-transparent border-b border-[var(--color-border-medium)] py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors duration-200"
                    {...register("name")}
                  />
                  {errors.name && (
                    <span
                      id="name-error"
                      className="text-xs text-red-600 flex items-center gap-1.5"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-eyebrow text-[var(--color-text-tertiary)]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="tu@email.com"
                    className="w-full bg-transparent border-b border-[var(--color-border-medium)] py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors duration-200"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span
                      id="email-error"
                      className="text-xs text-red-600 flex items-center gap-1.5"
                      role="alert"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Tipo de proyecto */}
              <div className="flex flex-col gap-2 mt-5">
                <label
                  htmlFor="projectType"
                  className="text-eyebrow text-[var(--color-text-tertiary)]"
                >
                  Tipo de proyecto
                </label>
                <Controller
                  name="projectType"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Select<ContactFormValues["projectType"]>
                      id="projectType"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      options={projectTypeOptions}
                      placeholder="Seleccioná un servicio"
                      invalid={!!fieldState.error}
                      describedBy={
                        fieldState.error ? "projectType-error" : undefined
                      }
                    />
                  )}
                />
                {errors.projectType && (
                  <span
                    id="projectType-error"
                    className="text-xs text-red-600 flex items-center gap-1.5"
                    role="alert"
                  >
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.projectType.message}
                  </span>
                )}
              </div>

              {/* Mensaje */}
              <div className="flex flex-col gap-2 mt-5">
                <label
                  htmlFor="message"
                  className="text-eyebrow text-[var(--color-text-tertiary)]"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  placeholder="Contanos brevemente sobre tu proyecto, objetivos y plazos..."
                  className="w-full bg-transparent border-b border-[var(--color-border-medium)] py-2.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors duration-200 resize-none"
                  {...register("message")}
                />
                {errors.message && (
                  <span
                    id="message-error"
                    className="text-xs text-red-600 flex items-center gap-1.5"
                    role="alert"
                  >
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit + privacy */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-[var(--color-text-tertiary)]">
                  Al enviar aceptás nuestra política de privacidad.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className={cn(
                    "group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium",
                    "bg-[var(--color-accent)] text-[var(--color-bg-primary)] rounded-sm",
                    "transition-all duration-200 ease-out",
                    "hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 active:scale-[0.98]",
                    "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0",
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        aria-hidden
                        className="w-4 h-4 border-2 border-[var(--color-bg-primary)]/30 border-t-[var(--color-bg-primary)] rounded-full animate-spin"
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45" />
                    </>
                  )}
                </button>
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 flex items-center gap-2 px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-sm text-emerald-600 text-sm"
                    role="status"
                  >
                    <Check className="w-4 h-4 shrink-0" />
                    ¡Mensaje enviado! Te respondemos en menos de 24 hs.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-sm text-red-600 text-sm"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Algo salió mal, intentá de nuevo.
                    <button
                      type="button"
                      onClick={retry}
                      className="ml-auto underline hover:no-underline transition-all duration-200"
                    >
                      Reintentar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
