import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { adminAllowed } from "@/lib/admin";

export const dynamic = "force-dynamic";

const exec = promisify(execFile);

async function git(...args: string[]) {
  return exec("git", args, { cwd: process.cwd(), windowsHide: true });
}

/** Publica as alterações: commit + push → o Render faz o deploy. */
export async function POST() {
  if (!adminAllowed()) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  try {
    const { stdout: status } = await git("status", "--porcelain");
    if (!status.trim()) {
      return NextResponse.json({
        ok: true,
        published: false,
        message: "Nenhuma alteração para publicar.",
      });
    }
    await git("add", "content/site.json", "public/hero");
    await git(
      "commit",
      "-m",
      "content: atualização via painel de edição",
    );
    await git("push", "origin", "main");
    return NextResponse.json({
      ok: true,
      published: true,
      message:
        "Publicado! O Render iniciou o deploy — o site atualiza em ~2-4 minutos.",
    });
  } catch (err) {
    const e = err as { stderr?: string; message?: string };
    return NextResponse.json(
      { error: e.stderr || e.message || "Falha ao publicar" },
      { status: 500 },
    );
  }
}
