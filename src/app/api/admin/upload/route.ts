import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { adminAllowed, CONTENT_PATH, HERO_DIR } from "@/lib/admin";

export const dynamic = "force-dynamic";

const ALLOWED: Record<string, string> = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
};
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

/** Troca a imagem do hero: salva com nome novo (cache-busting) e atualiza o JSON. */
export async function POST(req: Request) {
  if (!adminAllowed()) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Arquivo ausente" }, { status: 400 });
  }
  const ext = ALLOWED[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Formato não suportado — use WebP, JPG ou PNG" },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Imagem acima de 8MB — comprima antes de enviar" },
      { status: 400 },
    );
  }

  let buffer = Buffer.from(await file.arrayBuffer());
  let finalExt = ext;

  // Converte para WebP otimizado (máx. 2560px) — mantém o site leve.
  try {
    const sharp = (await import("sharp")).default;
    buffer = Buffer.from(
      await sharp(buffer)
        .resize({ width: 2560, withoutEnlargement: true })
        .webp({ quality: 90 })
        .toBuffer(),
    );
    finalExt = "webp";
  } catch {
    // sharp indisponível — mantém o arquivo original.
  }

  const name = `scene-${Date.now()}.${finalExt}`;
  await fs.mkdir(HERO_DIR, { recursive: true });
  await fs.writeFile(path.join(HERO_DIR, name), buffer);

  // Atualiza o caminho no conteúdo e remove imagens antigas do hero.
  const content = JSON.parse(await fs.readFile(CONTENT_PATH, "utf-8"));
  const previous: string = content.hero.image ?? "";
  content.hero.image = `/hero/${name}`;
  await fs.writeFile(
    CONTENT_PATH,
    JSON.stringify(content, null, 2) + "\n",
    "utf-8",
  );

  if (previous.startsWith("/hero/")) {
    const prevFile = path.join(HERO_DIR, path.basename(previous));
    await fs.rm(prevFile, { force: true });
  }

  return NextResponse.json({ ok: true, image: content.hero.image });
}
