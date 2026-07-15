import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform active:scale-[0.98] focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white shadow-[0_10px_30px_-10px_rgba(17,24,39,0.5)] hover:shadow-[0_16px_40px_-12px_rgba(17,24,39,0.55)] hover:-translate-y-0.5",
  secondary:
    "glass glass-sheen text-ink hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]",
  ghost:
    "text-ink hover:bg-white/60 hover:backdrop-blur-md",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & React.ComponentPropsWithoutRef<"a">)
  | ({ href?: undefined } & React.ComponentPropsWithoutRef<"button">)
);

export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        )}
      </span>
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as React.ComponentPropsWithoutRef<"a"> & {
      href: string;
    };
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ComponentPropsWithoutRef<"button">)}
    >
      {inner}
    </button>
  );
}
