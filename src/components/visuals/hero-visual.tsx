"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Sparkles, Activity, ShieldCheck, Cpu } from "lucide-react";

const spring = { stiffness: 120, damping: 18, mass: 0.6 };

function useParallax(
  x: MotionValue<number>,
  y: MotionValue<number>,
  depth: number,
) {
  const tx = useSpring(useTransform(x, (v) => v * depth), spring);
  const ty = useSpring(useTransform(y, (v) => v * depth), spring);
  return { tx, ty };
}

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const slab = useParallax(mx, my, 14);
  const orb = useParallax(mx, my, 30);
  const chipA = useParallax(mx, my, 42);
  const chipB = useParallax(mx, my, 34);
  const chipC = useParallax(mx, my, 50);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="relative mx-auto aspect-square w-full max-w-[560px] [perspective:1400px]"
      aria-hidden
    >
      {/* Aurora glow behind everything */}
      <div className="animate-aurora absolute inset-[-12%] -z-10">
        <div className="absolute left-[12%] top-[10%] size-64 rounded-full bg-[#a9c8ff] opacity-45 blur-[70px]" />
        <div className="absolute right-[8%] top-[28%] size-72 rounded-full bg-[#d4c9ff] opacity-40 blur-[80px]" />
        <div className="absolute bottom-[6%] left-[26%] size-64 rounded-full bg-[#bfeadd] opacity-35 blur-[80px]" />
      </div>

      {/* Main glass slab */}
      <motion.div
        style={{ x: slab.tx, y: slab.ty }}
        className="animate-float-slow absolute inset-[8%] [transform-style:preserve-3d]"
      >
        <div className="glass glass-sheen relative h-full w-full overflow-hidden rounded-[2rem] [transform:rotateX(6deg)_rotateY(-10deg)] shadow-[var(--shadow-float)]">
          {/* top reflection sweep */}
          <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-[8deg] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-md" />

          {/* inner glow orb */}
          <motion.div
            style={{ x: orb.tx, y: orb.ty }}
            className="absolute -right-10 -top-8 size-48 rounded-full bg-gradient-to-br from-[#7db2ff] to-[#c6b8ff] opacity-70 blur-[6px]"
          >
            <div className="absolute left-6 top-5 size-16 rounded-full bg-white/60 blur-md" />
          </motion.div>

          {/* dotted grid */}
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(29,29,31,0.14) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(120% 120% at 30% 20%, #000 30%, transparent 75%)",
            }}
          />

          {/* abstract "signal" bars */}
          <div className="absolute bottom-9 left-9 right-9 flex items-end gap-2.5">
            {[38, 62, 46, 78, 54, 88, 66, 96, 72].map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-full bg-gradient-to-t from-ink/70 to-accent/60"
                initial={{ height: 6, opacity: 0 }}
                animate={{ height: h, opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.6 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ maxHeight: 120 }}
              />
            ))}
          </div>

          {/* header line */}
          <div className="absolute left-9 top-8 flex items-center gap-2.5">
            <span className="size-2.5 rounded-full bg-accent/80" />
            <span className="h-2 w-24 rounded-full bg-ink/15" />
            <span className="h-2 w-10 rounded-full bg-ink/10" />
          </div>
        </div>
      </motion.div>

      {/* Floating glass chips */}
      <motion.div
        style={{ x: chipA.tx, y: chipA.ty }}
        className="animate-float-slower absolute left-[-4%] top-[22%]"
      >
        <Chip icon={<Sparkles className="size-4 text-accent" />} label="IA nativa" />
      </motion.div>

      <motion.div
        style={{ x: chipB.tx, y: chipB.ty }}
        className="animate-float-slow absolute right-[-6%] top-[14%]"
      >
        <Chip
          icon={<Activity className="size-4 text-accent" />}
          label="99,99% de uptime"
        />
      </motion.div>

      <motion.div
        style={{ x: chipC.tx, y: chipC.ty }}
        className="animate-float-slower absolute bottom-[10%] right-[2%]"
      >
        <Chip
          icon={<ShieldCheck className="size-4 text-accent" />}
          label="Seguro por padrão"
        />
      </motion.div>

      <motion.div
        style={{ x: chipA.tx, y: chipB.ty }}
        className="animate-float-slow absolute bottom-[16%] left-[-2%]"
      >
        <Chip icon={<Cpu className="size-4 text-accent" />} label="Pronto para edge" />
      </motion.div>
    </motion.div>
  );
}

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="glass glass-sheen flex items-center gap-2 rounded-full px-3.5 py-2 shadow-[var(--shadow-glass)]">
      {icon}
      <span className="text-sm font-medium text-ink">{label}</span>
    </div>
  );
}
