"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/section";
import { processSteps } from "@/lib/site";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Processo"
        title="Um caminho comprovado da ideia ao impacto."
        description="Um processo transparente e repetível que reduz o risco da entrega e mantém você no controle em cada etapa."
      />

      <div ref={ref} className="relative mt-16 pl-2">
        {/* Track */}
        <div className="absolute left-[calc(0.5rem+23px)] top-2 bottom-2 w-px -translate-x-1/2 bg-line/70" />
        {/* Animated progress fill */}
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-[calc(0.5rem+23px)] top-2 bottom-2 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-accent to-accent-soft"
        />

        <ol className="flex flex-col gap-8">
          {processSteps.map((step, i) => (
            <motion.li
              key={step.no}
              initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex items-start gap-6"
            >
              <div className="glass-strong glass-sheen relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full font-mono text-sm font-medium text-ink">
                {step.no}
              </div>
              <div className="flex-1 pt-1.5">
                <h3 className="text-xl font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-2xl text-[0.975rem] leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
