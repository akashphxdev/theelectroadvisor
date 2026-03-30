// app/api/web/articles/route.ts

import { NextRequest, NextResponse } from "next/server";
import pool from "@/config/db"; // ✅ yaha change kiya

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");
    const page  = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "6");
    const offset = (page - 1) * limit;

    if (!categorySlug) {
      return NextResponse.json(
        { success: false, message: "category param required" },
        { status: 400 }
      );
    }

    // 1. Category fetch
    const [catRows]: any = await pool.query(
      `SELECT id, name, slug, image_url 
       FROM tblcategories 
       WHERE slug = ? AND is_active = 1 
       LIMIT 1`,
      [categorySlug]
    );

    if (!catRows.length) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    const category = catRows[0];

    // 2. Total count
    const [countRows]: any = await pool.query(
      `SELECT COUNT(*) as total 
       FROM tblarticles 
       WHERE category_id = ? AND is_active = 1`,
      [category.id]
    );

    const total = countRows[0]?.total ?? 0;

    // 3. Articles fetch
    const [articles]: any = await pool.query(
      `SELECT 
        id, title, slug, subtitle, image_url,
        read_time, views, featured, published_at, created_at
       FROM tblarticles
       WHERE category_id = ? AND is_active = 1
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [category.id, limit, offset]
    );

    return NextResponse.json({
      success: true,
      category,
      data: articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: offset + limit < total,
      },
    });

  } catch (err) {
    console.error("Articles API error:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}