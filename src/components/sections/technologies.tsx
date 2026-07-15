import { Section, SectionHeading } from "@/components/ui/section";
import { Icon, type IconName } from "@/components/ui/icon";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { technologies } from "@/lib/site";

export function Technologies() {
  return (
    <Section id="tech">
      <SectionHeading
        eyebrow="Tecnologia"
        title="Uma stack moderna e comprovada em produção."
        description="Escolhemos ferramentas rápidas, confiáveis e feitas para durar — as mesmas tecnologias que movem os melhores softwares do mundo."
      />

      <RevealGroup
        className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        stagger={0.04}
      >
        {technologies.map((t) => (
          <RevealItem key={t.name} className="h-full">
            <div className="glass glass-sheen group flex h-full items-center gap-4 rounded-[var(--radius-md)] px-5 py-4 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[var(--shadow-float)]">
              <div className="glass-strong inline-flex size-11 items-center justify-center rounded-xl transition-transform duration-400 group-hover:scale-105">
                <Icon
                  name={t.icon as IconName}
                  className="size-5 text-ink"
                  strokeWidth={1.6}
                />
              </div>
              <span className="font-medium tracking-tight text-ink">
                {t.name}
              </span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
