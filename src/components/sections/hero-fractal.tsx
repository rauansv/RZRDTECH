"use client";

import { useId } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { heroFractal } from "@/lib/site";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero editorial — headline "MATÉRIA DIGIT▲L" sobre a base clara, com a
 * cena do cristal (extraída do Figma) como poster. Mesma composição em
 * todas as telas, escalada com fluidez.
 */
export function HeroFractal() {
  return (
    <section id="top" className="relative">
      <div className="container-page pb-16 pt-32 sm:pb-20 lg:pt-40">
        <motion.h1
          className="font-hero-display text-ink text-[clamp(2.9rem,9vw,6.5rem)]"
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
          className="font-hero-ui mt-6 max-w-2xl text-[1.05rem] font-medium leading-relaxed text-muted sm:text-lg"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          {heroFractal.subtitle.join(" ")}
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease }}
        >
          <Button href={heroFractal.cta.href} size="lg" withArrow>
            {heroFractal.cta.label}
          </Button>
        </motion.div>

        {/* Poster com a cena do cristal */}
        <motion.div
          className="relative mt-12 overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-float)]"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
        >
          <div className="relative aspect-[4/3] sm:aspect-video">
            <Image
              src={heroFractal.image}
              alt="Cristal facetado iridescente sobre uma fita roxa — matéria digital RZRD"
              fill
              priority
              sizes="(min-width: 80rem) 76rem, 92vw"
              className="object-cover object-[62%_50%] sm:object-center"
            />
          </div>
        </motion.div>

        {/* Pilares */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {heroFractal.bar.items.map((item, i) => (
            <motion.div
              key={item.title}
              className="glass glass-sheen rounded-2xl px-5 py-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 + i * 0.08, ease }}
            >
              <p className="font-hero-ui text-[0.95rem] font-semibold text-ink">
                {item.title}
              </p>
              <p className="font-hero-ui mt-0.5 text-sm text-faint">
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Triângulo azul que substitui o "A" — mesmo artifício do template. */
function Tri() {
  // id único por instância para o gradiente do SVG.
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
