import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

/* Fuentes de Google cargadas vía next/font (sin FOUT, sin CLS) */
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* Metadata global (SEO + OpenGraph) */
export const metadata: Metadata = {
  metadataBase: new URL("https://antigravity.studio"),
  title: {
    default: "CIMA Digital — Diseño y desarrollo web premium",
    template: "%s · CIMA Digital",
  },
  description:
    "Estudio digital en Buenos Aires. Diseño UX/UI, desarrollo web, e-commerce, branding y SEO. Código propio, sin plantillas.",
  keywords: [
    "agencia digital",
    "diseño web",
    "desarrollo web",
    "buenos aires",
    "ux ui",
    "ecommerce",
    "branding",
    "seo",
  ],
  authors: [{ name: "CIMA Digital" }],
  creator: "CIMA Digital",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://CIMA Digital.studio",
    siteName: "CIMA Digital",
    title: "CIMA Digital — Diseño y desarrollo web premium",
    description:
      "Estudio digital en Buenos Aires. Diseño UX/UI, desarrollo web, e-commerce, branding y SEO.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CIMA Digital — Diseño y desarrollo web premium",
    description:
      "Estudio digital en Buenos Aires. Diseño UX/UI, desarrollo web, e-commerce, branding y SEO.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="grain antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
