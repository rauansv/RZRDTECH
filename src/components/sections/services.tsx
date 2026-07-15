import { Section, SectionHeading } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Icon, type IconName } from "@/components/ui/icon";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { services } from "@/lib/site";

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Serviços"
        title="Tudo que você precisa para entregar software de classe mundial."
        description="Um time sênior em toda a stack — do primeiro protótipo a sistemas que escalam para milhões."
      />

      <RevealGroup
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.06}
      >
        {services.map((s) => (
          <RevealItem key={s.title} className="h-full">
            <SpotlightCard className="h-full p-7">
              <div className="flex h-full flex-col">
                <div className="glass-strong glass-sheen inline-flex size-12 items-center justify-center rounded-2xl">
                  <Icon
                    name={s.icon as IconName}
                    className="size-[22px] text-ink"
                    strokeWidth={1.6}
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">
                  {s.description}
                </p>
              </div>
            </SpotlightCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
