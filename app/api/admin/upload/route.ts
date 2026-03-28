//app/api/admin/upload/route.ts
import { requireAdmin } from "@/lib/requireAdmin";
import { mkdir, access, unlink, writeFile } from "fs/promises";
import { NextRequest } from "next/server";
import path from "path";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const EXT_MAP: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/webp": ".webp",
};

async function saveBuffer(buffer: Buffer, mimeType: string, relativeDir: string): Promise<string> {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const datetime =
    `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}` +
    `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}` +
    `${String(now.getMilliseconds()).padStart(3, "0")}`;
  const randomSuffix = Math.random().toString(36).slice(2, 8);
  const ext = EXT_MAP[mimeType] || ".jpg";
  const filename = `${datetime}-${randomSuffix}${ext}`;

  const dir = path.join(process.cwd(), "uploads", relativeDir);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${relativeDir}/${filename}`;
}

// ── POST: Upload image ──────────────────────────────────────────
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof Response) return auth;

  try {
    const contentType = request.headers.get("content-type") ?? "";

    // Branch A: JSON body mein URL diya ho
    if (contentType.includes("application/json")) {
      const body = await request.json();
      const { url: imageUrl, target } = body as { url?: unknown; target?: unknown };

      if (!imageUrl || typeof imageUrl !== "string") {
        return Response.json({ error: "No URL provided" }, { status: 400 });
      }

      let parsed: URL;
      try {
        parsed = new URL(imageUrl);
      } catch {
        return Response.json({ error: "Invalid URL" }, { status: 400 });
      }

      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return Response.json({ error: "Invalid URL protocol" }, { status: 400 });
      }

      let fetchRes: Response;
      try {
        fetchRes = await fetch(imageUrl, { redirect: "follow" });
      } catch {
        return Response.json({ error: "Failed to fetch image from URL" }, { status: 400 });
      }

      if (!fetchRes.ok) {
        return Response.json({ error: "Remote server returned an error" }, { status: 400 });
      }

      const mimeType = (fetchRes.headers.get("content-type") ?? "").split(";")[0].trim();
      if (!ALLOWED_TYPES.includes(mimeType)) {
        return Response.json({ error: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP" }, { status: 400 });
      }

      const buffer = Buffer.from(await fetchRes.arrayBuffer());
      if (buffer.length > MAX_SIZE) {
        return Response.json({ error: "File too large. Maximum size is 5MB" }, { status: 400 });
      }

      const relativeDir = String(target ?? "").trim() === "content" ? "content" : "archive-images";
      const savedPath = await saveBuffer(buffer, mimeType, relativeDir);
      return Response.json({ path: savedPath });
    }

    // Branch B: Form data se file upload
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const target = String(formData.get("target") ?? "").trim();

    if (!file || !file.size) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json({ error: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return Response.json({ error: "File too large. Maximum size is 5MB" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeDir = target;
    const savedPath = await saveBuffer(buffer, file.type, relativeDir);
    return Response.json({ path: savedPath });

  } catch {
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}

// ── DELETE: Image delete ────────────────────────────────────────
export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof Response) return auth;

  try {
    const { path: imagePath } = await request.json();

    if (!imagePath || typeof imagePath !== "string") {
      return Response.json({ error: "No path provided" }, { status: 400 });
    }

    const filename = path.basename(imagePath);
    const isNewArchive = imagePath.startsWith("/uploads/archive-images/");
    const isNewContent = imagePath.startsWith("/uploads/content/");
    const isLegacyArchive = imagePath.startsWith("/archive-images/");
    const isLegacyContent = imagePath.startsWith("/content/");
    const isValid = isNewArchive || isNewContent || isLegacyArchive || isLegacyContent;

    if (!isValid || filename.includes("..")) {
      return Response.json({ error: "Invalid path" }, { status: 400 });
    }

    const relativeDir = isNewContent || isLegacyContent ? "content" : "archive-images";
    const baseDir = isNewArchive || isNewContent
      ? path.join(process.cwd(), "uploads", relativeDir)
      : path.join(process.cwd(), "public", relativeDir);

    const filePath = path.join(baseDir, filename);
    await access(filePath);
    await unlink(filePath);

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}