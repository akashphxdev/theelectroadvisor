// // app/api/admin/articles/[id]/route.ts

// import { NextRequest } from "next/server";
// import pool from "@/config/db";
// import { requireAdmin } from "@/lib/requireAdmin";
// import {  deleteUploadedFile} from "@/lib/deleteUploadedFile";

// type Params = { params: Promise<{ id: string }> };

// // GET - Single article
// export async function GET(request: NextRequest, { params }: Params) {
//   const authError = await requireAdmin(request);
//   if (authError) return authError;

//   const { id } = await params;

//   try {
//     const [rows] = await pool.query(
//       `SELECT * FROM tblarticles WHERE id = ?`, [id]
//     ) as any[];

//     if ((rows as any[]).length === 0) {
//       return Response.json({ error: "Article not found" }, { status: 404 });
//     }

//     return Response.json({ article: (rows as any[])[0] });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Failed to fetch article" }, { status: 500 });
//   }
// }

// // PUT - Update article
// export async function PUT(request: NextRequest, { params }: Params) {
//   const authError = await requireAdmin(request);
//   if (authError) return authError;

//   const { id } = await params;

//   try {
//     const body = await request.json();
//     const {
//       title, slug, subtitle, content, image_url,
//       category_id, author_id, published_at, read_time,
//       featured, is_active, keywords, old_image_url,
//     } = body;

//     if (!title || !slug) {
//       return Response.json({ error: "Title and slug are required" }, { status: 400 });
//     }

//     // Check duplicate slug (exclude current article)
//     const [existing] = await pool.query(
//       "SELECT id FROM tblarticles WHERE slug = ? AND id != ?", [slug, id]
//     ) as any[];
//     if ((existing as any[]).length > 0) {
//       return Response.json({ error: "Slug already exists" }, { status: 400 });
//     }

//     // Delete old image if new image uploaded
//     if (old_image_url && old_image_url !== image_url) {
//       await deleteUploadedFile(old_image_url);
//     }

//     await pool.query(
//       `UPDATE tblarticles SET
//         title = ?, slug = ?, subtitle = ?, content = ?, image_url = ?,
//         category_id = ?, author_id = ?, published_at = ?, read_time = ?,
//         featured = ?, is_active = ?, keywords = ?, updated_at = NOW()
//        WHERE id = ?`,
//       [
//         title, slug, subtitle || null, content || null, image_url || null,
//         category_id || null, author_id || null,
//         published_at || null, read_time || null,
//         featured ? 1 : 0, is_active ? 1 : 0,
//         keywords || null, id,
//       ]
//     );

//     return Response.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Failed to update article" }, { status: 500 });
//   }
// }

// // DELETE - Delete article + image
// export async function DELETE(request: NextRequest, { params }: Params) {
//   const authError = await requireAdmin(request);
//   if (authError) return authError;

//   const { id } = await params;

//   try {
//     // Get image_url before deleting
//     const [rows] = await pool.query(
//       "SELECT image_url FROM tblarticles WHERE id = ?", [id]
//     ) as any[];

//     if ((rows as any[]).length === 0) {
//       return Response.json({ error: "Article not found" }, { status: 404 });
//     }

//     const imageUrl = (rows as any[])[0].image_url;

//     // Delete from DB
//     await pool.query("DELETE FROM tblarticles WHERE id = ?", [id]);

//     // Delete image file
//     if (imageUrl) {
//       await deleteUploadedFile(imageUrl);
//     }

//     return Response.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Failed to delete article" }, { status: 500 });
//   }
// }




// app/api/admin/articles/[id]/route.ts

import { NextRequest } from "next/server";
import pool from "@/config/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { deleteUploadedFile } from "@/lib/deleteUploadedFile";

type Params = { params: Promise<{ id: string }> };

// GET - Single article
export async function GET(request: NextRequest, { params }: Params) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM tblarticles WHERE id = ?`, [id]
    ) as any[];

    if ((rows as any[]).length === 0) {
      return Response.json({ error: "Article not found" }, { status: 404 });
    }

    return Response.json({ article: (rows as any[])[0] });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}

// PUT - Update article
export async function PUT(request: NextRequest, { params }: Params) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;

  try {
    const body = await request.json();
    const {
      title, slug, subtitle, content, image_url,
      category_id, author_id, published_at, read_time,
      featured, is_active, keywords, old_image_url,
    } = body;

    if (!title || !slug) {
      return Response.json({ error: "Title and slug are required" }, { status: 400 });
    }

    // Check duplicate slug (exclude current article)
    const [existing] = await pool.query(
      "SELECT id FROM tblarticles WHERE slug = ? AND id != ?", [slug, id]
    ) as any[];
    if ((existing as any[]).length > 0) {
      return Response.json({ error: "Slug already exists" }, { status: 400 });
    }

    // Delete old image if new image uploaded
    if (old_image_url && old_image_url !== image_url) {
      await deleteUploadedFile(old_image_url);
    }

    await pool.query(
      `UPDATE tblarticles SET
        title = ?, slug = ?, subtitle = ?, content = ?, image_url = ?,
        category_id = ?, author_id = ?, published_at = ?, read_time = ?,
        featured = ?, is_active = ?, keywords = ?, updated_at = NOW()
       WHERE id = ?`,
      [
        title, slug, subtitle || null, content || null, image_url || null,
        category_id || null, author_id || null,
        published_at || null, read_time || null,
        featured ? 1 : 0, is_active ? 1 : 0,
        keywords || null, id,
      ]
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update article" }, { status: 500 });
  }
}

// Helper: HTML content se saari local image srcs nikalo
function extractLocalImageSrcs(html: string): string[] {
  if (!html) return [];
  const srcs: string[] = [];
  // Match all img src attributes
  const regex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const src = match[1];
    // Sirf local uploaded images — external URLs skip karo
    if (
      src &&
      !src.startsWith("http://") &&
      !src.startsWith("https://") &&
      !src.startsWith("data:")
    ) {
      srcs.push(src);
    }
  }
  return srcs;
}

// DELETE - Delete article + featured image + all content images
export async function DELETE(request: NextRequest, { params }: Params) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;

  try {
    // Get image_url AND content before deleting
    const [rows] = await pool.query(
      "SELECT image_url, content FROM tblarticles WHERE id = ?", [id]
    ) as any[];

    if ((rows as any[]).length === 0) {
      return Response.json({ error: "Article not found" }, { status: 404 });
    }

    const { image_url: imageUrl, content } = (rows as any[])[0];

    // Delete from DB first
    await pool.query("DELETE FROM tblarticles WHERE id = ?", [id]);

    // Delete featured image
    if (imageUrl) {
      await deleteUploadedFile(imageUrl);
    }

    // Delete all images inside content
    const contentImageSrcs = extractLocalImageSrcs(content || "");
    await Promise.all(contentImageSrcs.map((src) => deleteUploadedFile(src)));

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to delete article" }, { status: 500 });
  }
}