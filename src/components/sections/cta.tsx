import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export function CTA() {
  return (
    <section id="contact" className="section relative">
      <Container>
        <Reveal>
          <div className="glass-strong glass-sheen relative overflow-hidden rounded-[var(--radius-2xl)] px-6 py-20 text-center sm:px-16 sm:py-28">
            {/* Ambient glow */}
            <div
              aria-hidden
              className="animate-aurora pointer-events-none absolute inset-0 -z-10"
            >
              <div className="absolute left-[15%] top-[10%] size-72 rounded-full bg-[#a9c8ff] opacity-40 blur-[80px]" />
              <div className="absolute right-[12%] bottom-[5%] size-72 rounded-full bg-[#d4c9ff] opacity-40 blur-[80px]" />
            </div>

            <span className="text-eyebrow">Vamos conversar</span>
            <h2 className="text-display mx-auto mt-6 max-w-[18ch] text-gradient">
              Vamos construir o seu próximo software.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Conte o que você está construindo. Vamos mostrar como a RZRD Tech
              pode torná-lo mais rápido, mais seguro e realmente de classe
              mundial.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={`mailto:${site.email}`} size="lg" withArrow>
                Fale Conosco
              </Button>
              <Button
                href={`mailto:${site.email}`}
                size="lg"
                variant="secondary"
              >
                {site.email}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
