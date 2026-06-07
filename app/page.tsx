import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

/* Página principal: importa todas las secciones en orden.
   Cada sección es self-contained y maneja su propio espaciado. */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="inicio" className="relative z-10">
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
