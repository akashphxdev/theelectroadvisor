import { NextResponse } from "next/server";
import pool from "@/config/db";

// GET /api/web/homepage
// Fetches ONLY what homepage needs — no extra data
export async function GET() {
  try {
    // 1. Hero slider — featured=1, latest 3 only
    const [featured] = await pool.query(
      `SELECT 
        a.id, a.title, a.slug, a.subtitle, a.image_url,
        a.read_time, a.views, a.published_at,
        c.name as category_name, c.slug as category_slug
       FROM tblarticles a
       JOIN tblcategories c ON a.category_id = c.id
       WHERE a.is_active = 1 AND a.featured = 1
       ORDER BY a.published_at DESC
       LIMIT 3`
    );

    // 2. Trending section — top 6 by views
    const [trending] = await pool.query(
      `SELECT 
        a.id, a.title, a.slug, a.image_url,
        a.read_time, a.views,
        c.name as category_name, c.slug as category_slug
       FROM tblarticles a
       JOIN tblcategories c ON a.category_id = c.id
       WHERE a.is_active = 1
       ORDER BY a.views DESC
       LIMIT 6`
    );

    // 3. Latest reviews — newest 4 only
    const [latest] = await pool.query(
      `SELECT 
        a.id, a.title, a.slug, a.image_url,
        a.read_time, a.views, a.published_at,
        c.name as category_name, c.slug as category_slug
       FROM tblarticles a
       JOIN tblcategories c ON a.category_id = c.id
       WHERE a.is_active = 1
       ORDER BY a.published_at DESC
       LIMIT 4`
    );

    // 4. Categories strip — all active (for browse section)
    const [categories] = await pool.query(
      `SELECT id, name, slug, image_url
       FROM tblcategories
       WHERE is_active = 1
       ORDER BY created_at ASC`
    ) as any[];

    // 5. Category sections — latest 4 articles per category
    //    Using a single query with ROW_NUMBER for performance
    const [byCategoryRaw] = await pool.query(
      `SELECT 
        a.id, a.title, a.slug, a.image_url,
        a.read_time, a.views, a.published_at,
        c.id as category_id, c.name as category_name,
        c.slug as category_slug, c.image_url as category_image,
        ROW_NUMBER() OVER (PARTITION BY a.category_id ORDER BY a.published_at DESC) as rn
       FROM tblarticles a
       JOIN tblcategories c ON a.category_id = c.id
       WHERE a.is_active = 1`
    ) as any[];

    // Filter top 4 per category in JS (avoids subquery complexity)
    const top4PerCategory = (byCategoryRaw as any[]).filter((r) => r.rn <= 4);

    // Group by category
    const categoryMap = new Map<number, CategorySection>();
    for (const row of top4PerCategory) {
      if (!categoryMap.has(row.category_id)) {
        categoryMap.set(row.category_id, {
          category_id:    row.category_id,
          category_name:  row.category_name,
          category_slug:  row.category_slug,
          category_image: row.category_image,
          articles: [],
        });
      }
      categoryMap.get(row.category_id)!.articles.push({
        id:            row.id,
        title:         row.title,
        slug:          row.slug,
        image_url:     row.image_url,
        read_time:     row.read_time,
        views:         row.views,
        published_at:  row.published_at,
        category_name: row.category_name,
        category_slug: row.category_slug,
      });
    }

    // Keep same order as categories list
    const byCategory = (categories as any[])
      .map((cat) => categoryMap.get(cat.id))
      .filter(Boolean);

    return NextResponse.json({
      success: true,
      data: {
        featured,    // 3 articles — hero slider
        trending,    // 6 articles — trending section (only needed fields)
        latest,      // 4 articles — latest reviews section
        byCategory,  // 4 articles per category — category sections
        categories,  // all categories — browse strip
      },
    });
  } catch (error) {
    console.error("Homepage fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// ── Types (for reference) ──────────────────────────────────────────────────────
interface CategorySection {
  category_id: number;
  category_name: string;
  category_slug: string;
  category_image: string;
  articles: object[];
}