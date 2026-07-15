"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/ui/wordmark";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-page">
        <div
          className={cn(
            "mt-3 flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5",
            scrolled
              ? "glass glass-sheen shadow-[var(--shadow-glass)]"
              : "border border-transparent",
          )}
        >
          <a
            href="#top"
            className="rounded-full px-1 py-1 text-lg"
            aria-label={`${site.name} início`}
          >
            <Wordmark />
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href="#contact" size="md" withArrow>
              Solicitar Orçamento
            </Button>
          </div>

          <button
            className="glass glass-sheen inline-flex size-11 items-center justify-center rounded-full text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="container-page md:hidden"
          >
            <div className="glass glass-sheen mt-2 flex flex-col gap-1 rounded-[var(--radius-lg)] p-3">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-white/60 hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
              <div className="p-1 pt-2">
                <Button
                  href="#contact"
                  className="w-full"
                  withArrow
                  onClick={() => setOpen(false)}
                >
                  Solicitar Orçamento
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
