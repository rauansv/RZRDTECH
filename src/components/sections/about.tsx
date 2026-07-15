import { Section, SectionHeading } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { values } from "@/lib/site";

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
        <SectionHeading
          eyebrow="Sobre a RZRD Tech"
          title="Um parceiro de software com engenharia em primeiro lugar."
          description="A RZRD Tech é uma software house premium. Projetamos e construímos os sistemas que movem as empresas modernas — unindo engenharia rigorosa ao acabamento de um produto de classe mundial."
        />

        <Reveal delay={0.1} className="lg:pb-2">
          <p className="text-lg leading-relaxed text-muted">
            Tecnologia deve ser uma vantagem competitiva, não um centro de
            custo. Fazemos parceria com times ambiciosos para transformar
            problemas complexos em software rápido, seguro e bonito — do tipo
            que valoriza cada vez mais conforme o seu negócio cresce.
          </p>
        </Reveal>
      </div>

      {/* Mission / Vision */}
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <Reveal>
          <GlassCard className="h-full p-8 sm:p-10">
            <span className="text-eyebrow">Missão</span>
            <p className="mt-4 text-2xl font-medium leading-snug tracking-tight text-ink sm:text-[1.7rem]">
              Construir software que realmente move negócios para a frente —
              medido por resultados, não por entregas.
            </p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.08}>
          <GlassCard className="h-full p-8 sm:p-10">
            <span className="text-eyebrow">Visão</span>
            <p className="mt-4 text-2xl font-medium leading-snug tracking-tight text-ink sm:text-[1.7rem]">
              Ser o parceiro de engenharia por trás da próxima geração de
              empresas de tecnologia que definem categorias.
            </p>
          </GlassCard>
        </Reveal>
      </div>

      {/* Values */}
      <RevealGroup className="mt-5 grid gap-5 md:grid-cols-3">
        {values.map((v) => (
          <RevealItem key={v.title}>
            <GlassCard interactive className="h-full p-8">
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {v.title}
              </h3>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-muted">
                {v.description}
              </p>
            </GlassCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
