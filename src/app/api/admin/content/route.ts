import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import { adminAllowed, CONTENT_PATH } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!adminAllowed()) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const raw = await fs.readFile(CONTENT_PATH, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function PUT(req: Request) {
  if (!adminAllowed()) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const b = body as Record<string, unknown>;
  if (!b || typeof b !== "object" || !b.site || !b.hero || !b.projects) {
    return NextResponse.json(
      { error: "Estrutura inválida: esperados site, hero e projects" },
      { status: 400 },
    );
  }
  await fs.writeFile(CONTENT_PATH, JSON.stringify(body, null, 2) + "\n", "utf-8");
  return NextResponse.json({ ok: true });
}
