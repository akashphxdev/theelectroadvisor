//app/api/utils/deleteUploadedFile.ts
import { unlink } from "fs/promises";
import path from "path";

export async function deleteUploadedFile(imagePath: string | null): Promise<void> {
  if (!imagePath) return;

  try {
    const filename = path.basename(imagePath);
    const isNewPath = imagePath.startsWith("/uploads/");

    // Path se directly subDir nikalo
    // e.g. "/uploads/categories/file.jpg" → ["", "uploads", "categories", "file.jpg"]
    const parts = imagePath.split("/").filter(Boolean);
    // parts[0] = "uploads", parts[1] = "categories" / "conent" / "archive-images"
    const subDir = isNewPath ? parts[1] : parts[0];

    const baseDir = isNewPath
      ? path.join(process.cwd(), "uploads", subDir)
      : path.join(process.cwd(), "public", subDir);

    await unlink(path.join(baseDir, filename));
  } catch {
    // silently ignore
  }
}