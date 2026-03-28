// app/api/admin/articles/route.ts

import { NextRequest } from "next/server";
import pool from "@/config/db";
import { requireAdmin } from "@/lib/requireAdmin";

// GET - All articles
export async function GET(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const [rows] = await pool.query(
      `SELECT 
        a.id, a.title, a.slug, a.subtitle, a.image_url,
        a.published_at, a.read_time, a.featured, a.is_active,
        a.views, a.created_at, a.updated_at,
        c.name AS category_name,
        au.name AS author_name
      FROM tblarticles a
      LEFT JOIN tblcategories c ON a.category_id = c.id
      LEFT JOIN tblauthors au ON a.author_id = au.id
      ORDER BY a.created_at DESC`
    );
    return Response.json({ articles: rows });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

// POST - Create article
export async function POST(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const {
      title, slug, subtitle, content, image_url,
      category_id, author_id, published_at, read_time,
      featured, is_active, keywords,
    } = body;

    if (!title || !slug) {
      return Response.json({ error: "Title and slug are required" }, { status: 400 });
    }

    // Check duplicate slug
    const [existing] = await pool.query(
      "SELECT id FROM tblarticles WHERE slug = ?", [slug]
    ) as any[];
    if ((existing as any[]).length > 0) {
      return Response.json({ error: "Slug already exists" }, { status: 400 });
    }

    const [result] = await pool.query(
      `INSERT INTO tblarticles 
        (title, slug, subtitle, content, image_url, category_id, author_id, 
         published_at, read_time, featured, is_active, keywords, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        title, slug, subtitle || null, content || null, image_url || null,
        category_id || null, author_id || null,
        published_at || null, read_time || null,
        featured ? 1 : 0, is_active ? 1 : 0,
        keywords || null,
      ]
    ) as any[];

    return Response.json({ success: true, id: (result as any).insertId }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create article" }, { status: 500 });
  }
}