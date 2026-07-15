import { cn } from "@/lib/utils";

/** RZRD Tech wordmark — crisp, tight, engineered. */
export function Wordmark({
  className,
  showTech = true,
}: {
  className?: string;
  showTech?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-2 font-semibold text-ink",
        className,
      )}
      aria-label="RZRD Tech"
    >
      <span className="text-[1.35em] font-bold leading-none tracking-[-0.06em]">
        RZRD
      </span>
      {showTech && (
        <span className="relative top-[-0.12em] text-[0.62em] font-medium uppercase tracking-[0.34em] text-ink-faint">
          Tech
        </span>
      )}
    </span>
  );
}
