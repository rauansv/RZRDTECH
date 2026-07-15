import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { HeroVisual } from "@/components/visuals/hero-visual";
import { stats } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pt-44"
    >
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-edges absolute inset-0 opacity-70" />
        <div className="absolute left-1/2 top-[-10%] size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(122,164,255,0.22),transparent)] blur-2xl" />
        <div className="absolute right-[-10%] top-[30%] size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(200,180,255,0.18),transparent)] blur-2xl" />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div className="flex flex-col items-start">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line/70 bg-white/50 px-3.5 py-1.5 text-eyebrow backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-accent" />
                Software House Premium
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-display mt-6 max-w-[16ch] text-gradient">
                Desenvolvemos software que move negócios para a frente.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                Criamos softwares sob medida, soluções de IA, plataformas web,
                aplicativos mobile e sistemas corporativos projetados para
                resolver problemas reais de negócio.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="#contact" size="lg" withArrow>
                  Solicitar Orçamento
                </Button>
                <Button href="#work" size="lg" variant="secondary">
                  Ver Projetos
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <dl className="mt-14 grid w-full max-w-lg grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col gap-1">
                    <dt className="order-2 text-sm text-faint">{s.label}</dt>
                    <dd className="order-1 text-2xl font-semibold tracking-tight text-ink">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Visual */}
          <div className="relative">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
