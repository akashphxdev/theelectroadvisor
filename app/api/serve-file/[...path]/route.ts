//app/api/serve-file/[...path]/route.ts
import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: filePath } = await params;

  try {
    const fullPath = path.join(process.cwd(), "uploads", ...filePath);
    const buffer = await readFile(fullPath);

    const ext = filePath[filePath.length - 1].split(".").pop()?.toLowerCase();
    const mimeMap: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
    };

    return new Response(buffer, {
      headers: {
        "Content-Type": mimeMap[ext ?? ""] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}