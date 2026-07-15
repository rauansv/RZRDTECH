import { Section, SectionHeading } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Icon, type IconName } from "@/components/ui/icon";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { differentials } from "@/lib/site";

export function Differentials() {
  return (
    <Section id="differentials" className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-80 max-w-4xl rounded-full bg-[radial-gradient(closest-side,rgba(122,164,255,0.16),transparent)] blur-2xl"
      />
      <SectionHeading
        eyebrow="Por que a RZRD"
        title="A diferença está na engenharia."
        description="Seis princípios que separam o software que apenas funciona do software que perdura."
        align="center"
      />

      <RevealGroup
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.06}
      >
        {differentials.map((d) => (
          <RevealItem key={d.title} className="h-full">
            <GlassCard interactive className="h-full p-8">
              <div className="flex items-center gap-4">
                <span className="glass-strong glass-sheen inline-flex size-12 items-center justify-center rounded-2xl">
                  <Icon
                    name={d.icon as IconName}
                    className="size-[22px] text-accent"
                    strokeWidth={1.6}
                  />
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-ink">
                  {d.title}
                </h3>
              </div>
              <p className="mt-5 text-[0.975rem] leading-relaxed text-muted">
                {d.description}
              </p>
            </GlassCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
