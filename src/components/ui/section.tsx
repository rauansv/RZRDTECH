import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("section relative", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 self-start rounded-full border border-line/70 bg-white/50 px-3.5 py-1.5 text-eyebrow backdrop-blur-sm data-[center=true]:self-center"
          data-center={align === "center"}
        >
          <span className="size-1.5 rounded-full bg-accent/70" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-h2 text-gradient">{title}</h2>
      {description && (
        <p className="text-lg leading-relaxed text-muted sm:text-xl">
          {description}
        </p>
      )}
    </Reveal>
  );
}
