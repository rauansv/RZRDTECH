import { cn } from "@/lib/utils";

/**
 * Base liquid-glass surface. Composable via className.
 * `interactive` adds a soft lift on hover (CSS only — no JS cost).
 */
export function GlassCard({
  className,
  interactive = false,
  strong = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  interactive?: boolean;
  strong?: boolean;
}) {
  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass",
        "glass-sheen rounded-[var(--radius-lg)]",
        interactive &&
          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-float)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
