import path from "node:path";

/**
 * O painel /admin só opera localmente (npm run dev) — nada de tokens ou
 * senhas expostos em produção. Em produção as rotas respondem 403.
 */
export function adminAllowed(): boolean {
  return process.env.NODE_ENV !== "production";
}

export const CONTENT_PATH = path.join(process.cwd(), "content", "site.json");
export const HERO_DIR = path.join(process.cwd(), "public", "hero");
