"use client";

import { useId } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { heroFractal } from "@/lib/site";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero cinematográfico — reconstrução fiel do template "Daily Hero 33 /
 * Arkkhe" com conteúdo RZRD. A cena (cristal, fita, cards, números) vem de
 * uma única imagem extraída do Figma e limpa; TODA a tipografia e UI são
 * reconstruídas em código, posicionadas sobre um stage 16:9 que escala em
 * sincronia perfeita com o fundo (container query units).
 */
export function HeroFractal() {
  return (
    <section id="top" className="relative">
      <DesktopStage />
      <MobileHero />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: full-bleed 16:9 stage with overlaid UI                     */
/* ------------------------------------------------------------------ */

function DesktopStage() {
  return (
    <div className="hero-stage hidden lg:block">
      {/* Scene */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease }}
      >
        <Image
          src="/hero/scene.webp"
          alt="Cristal facetado iridescente sobre uma fita roxa — matéria digital RZRD"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Headline */}
      <motion.h1
        className="font-hero-display absolute left-[3.4%] top-[15.5%] text-white [font-size:6.3cqw]"
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.15, ease }}
      >
        <span className="block">{heroFractal.line1}</span>
        <span className="block pl-[2.1cqw]">
          {heroFractal.line2Pre}
          <Tri />
          {heroFractal.line2Post}
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="font-hero-ui absolute left-[8.4%] top-[44%] font-medium leading-[1.6] text-white [font-size:1.55cqw] [text-shadow:0_1px_14px_rgba(20,60,140,0.25)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease }}
      >
        {heroFractal.subtitle.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </motion.p>

      {/* CTA — sized to fully cover the baked "Discover Now" pill */}
      <motion.a
        href={heroFractal.cta.href}
        className="font-hero-ui absolute left-[7.3%] top-[61.8%] flex h-[13%] min-w-[18.5%] items-center justify-center rounded-full bg-white px-[2.4cqw] font-semibold text-[#1d1d1f] shadow-[0_18px_50px_-12px_rgba(30,60,140,0.45)] transition-transform duration-300 hover:scale-[1.04] [font-size:1.28cqw]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease }}
      >
        {heroFractal.cta.label}
      </motion.a>

      {/* Card hotspots (baked cards → live links) */}
      <CardHotspot area="left-[62.6%] top-[9%] h-[24.6%] w-[14.2%]" label="Ver soluções de IA" />
      <CardHotspot area="left-[68.2%] top-[34.8%] h-[20.9%] w-[11%]" label="Ver plataformas web e apps" />
      <CardHotspot area="left-[65.1%] top-[55.9%] h-[23.7%] w-[13.2%]" label="Ver cloud e automação" />

      {/* Bottom glass bar */}
      <motion.div
        className="absolute bottom-[2.6%] left-[2.6%] flex h-[10%] w-[60.5%] items-center gap-[2.6cqw] rounded-[1.4cqw] border border-white/35 bg-white/20 px-[2.2cqw] shadow-[0_8px_40px_-12px_rgba(30,60,140,0.35)] backdrop-blur-lg"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.65, ease }}
      >
        <p className="font-hero-ui shrink-0 font-bold uppercase leading-[1.25] tracking-wider text-white [font-size:0.95cqw]">
          {heroFractal.bar.label.split(" ").map((w) => (
            <span key={w} className="block">
              {w}
            </span>
          ))}
        </p>
        {heroFractal.bar.items.map((item) => (
          <div key={item.title} className="font-hero-ui min-w-0">
            <p className="font-semibold text-white [font-size:1.1cqw]">
              {item.title}
            </p>
            <p className="mt-[0.2cqw] text-white/75 [font-size:0.9cqw]">
              {item.sub}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function CardHotspot({ area, label }: { area: string; label: string }) {
  return (
    <a
      href="#services"
      aria-label={label}
      className={`absolute rounded-[2.2cqw] border border-transparent transition-all duration-300 hover:border-white/70 hover:shadow-[0_0_0_4px_rgba(255,255,255,0.15)] ${area}`}
    />
  );
}

/** Triângulo azul que substitui o "A" — mesmo artifício do template. */
function Tri() {
  // id único por instância: um gradiente definido dentro de um contêiner
  // display:none (variante desktop/mobile oculta) não resolve para as demais.
  const id = useId();
  return (
    <svg
      viewBox="0 0 100 90"
      aria-hidden
      className="mx-[0.02em] inline-block h-[0.74em] w-[0.82em] -translate-y-[0.02em] -rotate-6"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4d8dff" />
          <stop offset="1" stopColor="#0f62fe" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        d="M50 4 L96 82 L4 82 Z M50 34 L74 68 L26 68 Z"
        fill={`url(#${id})`}
        stroke={`url(#${id})`}
        strokeWidth="7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: editorial stack + scene as poster                           */
/* ------------------------------------------------------------------ */

function MobileHero() {
  return (
    <div className="container-page pb-16 pt-32 lg:hidden">
      <motion.h1
        className="font-hero-display text-ink text-[clamp(2.9rem,13vw,4.5rem)]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="block">{heroFractal.line1}</span>
        <span className="block">
          {heroFractal.line2Pre}
          <Tri />
          {heroFractal.line2Post}
        </span>
      </motion.h1>

      <motion.p
        className="font-hero-ui mt-5 max-w-md text-[1.05rem] font-medium leading-relaxed text-muted"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
      >
        {heroFractal.subtitle.join(" ")}
      </motion.p>

      <motion.div
        className="mt-7"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.28, ease }}
      >
        <Button href={heroFractal.cta.href} size="lg" withArrow>
          {heroFractal.cta.label}
        </Button>
      </motion.div>

      {/* Scene poster */}
      <motion.div
        className="relative mt-10 overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-float)]"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease }}
      >
        <div className="relative aspect-[4/3]">
          <Image
            src="/hero/scene.webp"
            alt="Cristal facetado iridescente sobre uma fita roxa — matéria digital RZRD"
            fill
            priority
            sizes="92vw"
            className="object-cover object-[62%_50%]"
          />
        </div>
      </motion.div>

      {/* Pillars */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {heroFractal.bar.items.map((item) => (
          <div
            key={item.title}
            className="glass glass-sheen rounded-2xl px-4 py-3.5"
          >
            <p className="font-hero-ui text-sm font-semibold text-ink">
              {item.title}
            </p>
            <p className="font-hero-ui mt-0.5 text-xs text-faint">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
