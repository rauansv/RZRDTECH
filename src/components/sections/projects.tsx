import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { projects, type Project } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <Section id="work">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Projetos Selecionados"
          title="Feitos para performar. Projetados para impressionar."
          description="Uma amostra do calibre dos produtos que construímos. Um portfólio dedicado está a caminho."
        />
      </div>

      <RevealGroup
        className="mt-14 grid gap-6 md:grid-cols-2"
        stagger={0.08}
      >
        {projects.map((p) => (
          <RevealItem key={p.title} className="h-full">
            <ProjectCard project={p} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href="#contact"
      className="glass glass-sheen group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-float)]"
    >
      {/* Abstract cover */}
      <div
        className={cn(
          "relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br",
          project.accent,
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(rgba(29,29,31,0.10) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            maskImage:
              "radial-gradient(120% 120% at 70% 20%, #000 20%, transparent 70%)",
          }}
        />
        {/* floating glass shapes */}
        <div className="absolute right-6 top-6 size-24 rounded-full bg-white/40 blur-md transition-transform duration-700 group-hover:scale-110" />
        <div className="glass absolute bottom-6 left-6 h-16 w-40 rounded-2xl" />
        <div className="glass absolute bottom-14 left-24 h-10 w-28 rounded-xl opacity-80" />
        <div className="absolute -bottom-8 right-10 h-24 w-24 rotate-12 rounded-3xl border border-white/60 bg-white/20 backdrop-blur-md transition-transform duration-700 group-hover:-translate-y-2" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-eyebrow">{project.category}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
              {project.title}
            </h3>
          </div>
          <span className="glass-strong glass-sheen inline-flex size-11 shrink-0 items-center justify-center rounded-full text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight className="size-5" />
          </span>
        </div>

        <p className="mt-3 text-[0.975rem] leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2 pt-0.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line/60 bg-white/50 px-3 py-1 text-xs font-medium text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
