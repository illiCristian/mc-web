# Antigravity — Landing

Landing page de la agencia, construida con Next.js 15, TypeScript y Tailwind v4. Diseño 100% custom, sin componentes de terceros.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript (strict)
- **Estilos:** Tailwind CSS v4 (CSS-first config, sin `tailwind.config.js`)
- **Animaciones:** Framer Motion
- **Formularios:** React Hook Form + Zod
- **Íconos:** Lucide React
- **Fuentes:** Syne (display) + DM Sans (body) vía `next/font/google`

## Estructura

```
/
├── app/
│   ├── globals.css        # Design tokens + estilos base
│   ├── layout.tsx         # Fuentes, metadata, viewport
│   └── page.tsx           # Compone todas las secciones
├── components/
│   ├── sections/          # Hero, Services, WhyUs, Process, CTA, Contact
│   └── ui/                # Navbar, Footer, AnimatedText, ServiceCard
├── lib/
│   ├── cn.ts              # Helper para combinar clases
│   ├── contact-schema.ts  # Esquema Zod del formulario
│   └── site-config.ts     # Datos del sitio (nombre, redes, contacto)
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Empezar

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el dev server
npm run dev

# 3. Abrir en el navegador
# http://localhost:3000
```

## Scripts disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run start      # Servidor de producción
npm run lint       # ESLint
npm run typecheck  # Verificación de tipos
```

## Personalización rápida

### Colores y tipografía

Toda la paleta y las fuentes están definidas como CSS variables en `app/globals.css` dentro del bloque `@theme`. Cambiá los valores ahí y se propagan a todo el sitio.

```css
@theme {
  --color-accent: #0a0a0a;     /* Color de acento (negro — fondo claro, texto oscuro) */
  --color-bg-primary: #0a0a0a; /* Fondo principal */
  --color-text-primary: #ffffff;
  /* ... */
}
```

### Datos del sitio

Editá `lib/site-config.ts` para cambiar el nombre de la agencia, mail, WhatsApp, redes, etc.

### Contenido de las secciones

Cada sección tiene su data hardcodeada en su archivo (ej. la lista de servicios está en `components/sections/Services.tsx`). Modificalas directamente ahí.

## Conectar el formulario con Resend

El formulario hoy hace `console.log` de los datos. Para enviar emails reales:

1. Instalá Resend:
   ```bash
   npm install resend
   ```

2. Creá `app/api/contact/route.ts` con un handler que use Resend.

3. En `components/sections/Contact.tsx`, reemplazá el bloque de `console.log` por un `fetch('/api/contact', ...)`.

4. Agregá `RESEND_API_KEY` a tu `.env.local`.

## Decisiones técnicas

- **Sin `tailwind.config.js`:** Tailwind v4 usa config-first CSS vía `@theme`. Más simple, menos archivos.
- **CSS variables:** Permite cambiar el tema sin recompilar y mantiene los valores accesibles desde JS.
- **Componentes `use client` solo donde hace falta:** Hero, Navbar y todas las secciones que animan son client components. El resto (Footer, layout) se renderiza en el server.
- **Grain texture:** generada con SVG inline en CSS (sin assets externos).
- **Sin imágenes:** todo es CSS, gradientes y SVG. Cero peso, cero dependencias visuales externas.

## Próximos pasos sugeridos

- [ ] Conectar el formulario con Resend o similar
- [ ] Agregar sección de casos de éxito / portfolio
- [ ] Implementar i18n (inglés/español)
- [ ] Agregar un blog con MDX
- [ ] Configurar analytics (Plausible, Umami, etc.)
