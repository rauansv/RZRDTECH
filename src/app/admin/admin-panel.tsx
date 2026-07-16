"use client";

import { useEffect, useRef, useState } from "react";
import {
  Save,
  Rocket,
  Image as ImageIcon,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Tipos (espelham content/site.json)                                  */
/* ------------------------------------------------------------------ */

type Content = {
  site: {
    name: string;
    domain: string;
    url: string;
    tagline: string;
    description: string;
    slogan: string;
    email: string;
    socials: { instagram: string; linkedin: string; github: string };
  };
  hero: {
    line1: string;
    line2Pre: string;
    line2Post: string;
    subtitle: string[];
    ctaLabel: string;
    image: string;
    pillars: { title: string; sub: string }[];
  };
  projects: {
    title: string;
    category: string;
    description: string;
    tech: string[];
    accent: string;
  }[];
};

type Status =
  | { kind: "idle" }
  | { kind: "busy"; text: string }
  | { kind: "ok"; text: string }
  | { kind: "error"; text: string };

/* ------------------------------------------------------------------ */
/* Painel                                                              */
/* ------------------------------------------------------------------ */

export function AdminPanel() {
  const [content, setContent] = useState<Content | null>(null);
  const [forbidden, setForbidden] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [imgBust, setImgBust] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then(async (r) => {
        if (r.status === 403) {
          setForbidden(true);
          return null;
        }
        return r.json();
      })
      .then((data) => data && setContent(data))
      .catch(() => setStatus({ kind: "error", text: "Falha ao carregar o conteúdo." }));
  }, []);

  async function save(): Promise<boolean> {
    if (!content) return false;
    setStatus({ kind: "busy", text: "Salvando…" });
    const r = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      setStatus({ kind: "error", text: e.error ?? "Falha ao salvar." });
      return false;
    }
    setStatus({ kind: "ok", text: "Salvo! Veja a prévia em localhost:3000." });
    return true;
  }

  async function publish() {
    if (!(await save())) return;
    setStatus({ kind: "busy", text: "Publicando (commit + push)…" });
    const r = await fetch("/api/admin/publish", { method: "POST" });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      setStatus({ kind: "error", text: data.error ?? "Falha ao publicar." });
      return;
    }
    setStatus({ kind: "ok", text: data.message });
  }

  async function uploadImage(file: File) {
    setStatus({ kind: "busy", text: "Enviando imagem…" });
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      setStatus({ kind: "error", text: data.error ?? "Falha no upload." });
      return;
    }
    setContent((c) => (c ? { ...c, hero: { ...c.hero, image: data.image } } : c));
    setImgBust(Date.now());
    setStatus({ kind: "ok", text: "Imagem do hero atualizada!" });
  }

  /* ---------------- estados de borda ---------------- */

  if (forbidden) {
    return (
      <Shell>
        <div className="glass glass-sheen mx-auto max-w-lg rounded-[var(--radius-lg)] p-8 text-center">
          <AlertCircle className="mx-auto size-10 text-accent" />
          <h1 className="mt-4 text-2xl font-semibold text-ink">
            Painel disponível apenas localmente
          </h1>
          <p className="mt-3 text-muted">
            Por segurança, a edição roda só no seu computador. Abra o projeto e
            rode <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm">npm run dev</code>,
            depois acesse <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm">localhost:3000/admin</code>.
          </p>
        </div>
      </Shell>
    );
  }

  if (!content) {
    return (
      <Shell>
        <div className="flex items-center justify-center gap-3 py-24 text-muted">
          <Loader2 className="size-5 animate-spin" /> Carregando conteúdo…
        </div>
      </Shell>
    );
  }

  const set = (fn: (c: Content) => Content) => setContent((c) => (c ? fn(structuredClone(c)) : c));

  return (
    <Shell>
      {/* Cabeçalho do painel */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow">Painel de Edição</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
            Conteúdo do site
          </h1>
          <p className="mt-2 max-w-xl text-muted">
            Altere textos, redes e imagens. <strong>Salvar</strong> atualiza a
            prévia local; <strong>Publicar</strong> envia o site ao ar.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          Ver prévia <ExternalLink className="size-3.5" />
        </a>
      </div>

      {/* Identidade */}
      <Panel title="Identidade" hint="Nome e textos institucionais">
        <Grid2>
          <Field label="Nome" value={content.site.name} onChange={(v) => set((c) => ((c.site.name = v), c))} />
          <Field label="Tagline" value={content.site.tagline} onChange={(v) => set((c) => ((c.site.tagline = v), c))} />
        </Grid2>
        <Field label="Slogan" value={content.site.slogan} onChange={(v) => set((c) => ((c.site.slogan = v), c))} />
        <Area label="Descrição (SEO e rodapé)" rows={3} value={content.site.description} onChange={(v) => set((c) => ((c.site.description = v), c))} />
      </Panel>

      {/* Contato & Redes */}
      <Panel title="Contato & Redes" hint="Links exibidos no rodapé e na seção de contato">
        <Grid2>
          <Field label="E-mail" type="email" value={content.site.email} onChange={(v) => set((c) => ((c.site.email = v), c))} />
          <Field label="Instagram (URL)" value={content.site.socials.instagram} onChange={(v) => set((c) => ((c.site.socials.instagram = v), c))} />
          <Field label="LinkedIn (URL)" value={content.site.socials.linkedin} onChange={(v) => set((c) => ((c.site.socials.linkedin = v), c))} />
          <Field label="GitHub (URL)" value={content.site.socials.github} onChange={(v) => set((c) => ((c.site.socials.github = v), c))} />
        </Grid2>
      </Panel>

      {/* Hero */}
      <Panel title="Hero" hint='O "A" depois de "DIGIT" vira o triângulo azul automaticamente'>
        <Grid2>
          <Field label="Linha 1" value={content.hero.line1} onChange={(v) => set((c) => ((c.hero.line1 = v), c))} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Linha 2 (antes do ▲)" value={content.hero.line2Pre} onChange={(v) => set((c) => ((c.hero.line2Pre = v), c))} />
            <Field label="Linha 2 (depois do ▲)" value={content.hero.line2Post} onChange={(v) => set((c) => ((c.hero.line2Post = v), c))} />
          </div>
        </Grid2>
        <Area
          label="Subtítulo (uma frase por linha)"
          rows={3}
          value={content.hero.subtitle.join("\n")}
          onChange={(v) => set((c) => ((c.hero.subtitle = v.split("\n").filter((l) => l.trim())), c))}
        />
        <Field label="Texto do botão" value={content.hero.ctaLabel} onChange={(v) => set((c) => ((c.hero.ctaLabel = v), c))} />

        {/* Imagem */}
        <div>
          <Label>Imagem do hero</Label>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${content.hero.image}${imgBust ? `?t=${imgBust}` : ""}`}
              alt="Prévia da imagem do hero"
              className="h-24 w-40 rounded-xl border object-cover shadow-sm"
            />
            <div>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm transition hover:shadow-md"
              >
                <ImageIcon className="size-4" /> Trocar imagem
              </button>
              <p className="mt-1.5 text-xs text-faint">WebP, JPG ou PNG · até 8MB · ideal 2560×1440</p>
              <input
                ref={fileRef}
                type="file"
                accept="image/webp,image/jpeg,image/png"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
              />
            </div>
          </div>
        </div>

        {/* Pilares */}
        <div>
          <Label>Pilares (cards abaixo do hero)</Label>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {content.hero.pillars.map((p, i) => (
              <div key={i} className="rounded-xl border bg-white/60 p-3">
                <Field label={`Título ${i + 1}`} small value={p.title} onChange={(v) => set((c) => ((c.hero.pillars[i].title = v), c))} />
                <div className="mt-2">
                  <Field label="Subtítulo" small value={p.sub} onChange={(v) => set((c) => ((c.hero.pillars[i].sub = v), c))} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* Projetos */}
      <Panel title="Projetos" hint="Cases exibidos na seção Projetos">
        <div className="space-y-4">
          {content.projects.map((p, i) => (
            <div key={i} className="rounded-xl border bg-white/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <Grid2 className="flex-1">
                  <Field label="Título" small value={p.title} onChange={(v) => set((c) => ((c.projects[i].title = v), c))} />
                  <Field label="Categoria" small value={p.category} onChange={(v) => set((c) => ((c.projects[i].category = v), c))} />
                </Grid2>
                <button
                  type="button"
                  onClick={() => set((c) => ((c.projects.splice(i, 1), c)))}
                  className="mt-6 rounded-full border p-2 text-faint transition hover:border-red-300 hover:text-red-500"
                  aria-label={`Remover projeto ${p.title}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="mt-3">
                <Area label="Descrição" small rows={2} value={p.description} onChange={(v) => set((c) => ((c.projects[i].description = v), c))} />
              </div>
              <div className="mt-3">
                <Field
                  label="Tecnologias (separadas por vírgula)"
                  small
                  value={p.tech.join(", ")}
                  onChange={(v) => set((c) => ((c.projects[i].tech = v.split(",").map((t) => t.trim()).filter(Boolean)), c))}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              set((c) => (
                c.projects.push({
                  title: "Novo Projeto",
                  category: "Categoria",
                  description: "Descrição do projeto.",
                  tech: ["Next.js"],
                  accent: "from-[#c9dcff] via-[#eaf1ff] to-[#f5f5f7]",
                }),
                c
              ))
            }
            className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm transition hover:shadow-md"
          >
            <Plus className="size-4" /> Adicionar projeto
          </button>
        </div>
      </Panel>

      {/* Barra de ações */}
      <div className="glass-strong glass-sheen sticky bottom-4 z-10 flex flex-wrap items-center gap-3 rounded-[var(--radius-lg)] p-4">
        <button
          type="button"
          onClick={save}
          disabled={status.kind === "busy"}
          className="inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-sm transition hover:shadow-md disabled:opacity-50"
        >
          <Save className="size-4" /> Salvar
        </button>
        <button
          type="button"
          onClick={publish}
          disabled={status.kind === "busy"}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 disabled:opacity-50"
        >
          <Rocket className="size-4" /> Publicar no site
        </button>
        <StatusLine status={status} />
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Blocos de UI                                                        */
/* ------------------------------------------------------------------ */

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-page space-y-8 pb-24 pt-32">{children}</div>
  );
}

function Panel({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="glass glass-sheen rounded-[var(--radius-lg)] p-6 sm:p-8">
      <h2 className="text-xl font-semibold tracking-tight text-ink">{title}</h2>
      {hint && <p className="mt-1 text-sm text-faint">{hint}</p>}
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

function Grid2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`grid gap-4 sm:grid-cols-2 ${className}`}>{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-eyebrow">{children}</span>;
}

const inputClass =
  "mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2.5 text-[0.95rem] text-ink shadow-sm outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20";

function Field({
  label, value, onChange, type = "text", small = false,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; small?: boolean;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} ${small ? "py-2 text-sm" : ""}`}
      />
    </label>
  );
}

function Area({
  label, value, onChange, rows = 3, small = false,
}: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; small?: boolean;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} resize-y ${small ? "py-2 text-sm" : ""}`}
      />
    </label>
  );
}

function StatusLine({ status }: { status: Status }) {
  if (status.kind === "idle") return null;
  const map = {
    busy: { icon: <Loader2 className="size-4 animate-spin" />, cls: "text-muted" },
    ok: { icon: <CheckCircle2 className="size-4" />, cls: "text-emerald-600" },
    error: { icon: <AlertCircle className="size-4" />, cls: "text-red-500" },
  } as const;
  const m = map[status.kind];
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium ${m.cls}`}>
      {m.icon} {status.text}
    </span>
  );
}
