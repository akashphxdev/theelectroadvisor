import { NextResponse } from "next/server";
import pool from "@/config/db";

export async function GET() {
  try {
    // Run all queries in parallel
    const [
      [articleRows],
      [categoryRows],
      [authorRows],
      [viewRows],
      [recentRows],
      [categoryStatsRows],
      [publishedTodayRows],
      [draftRows],
      [reviewRows],
    ] = await Promise.all([
      // Total articles
      pool.query("SELECT COUNT(*) as total FROM tblarticles"),
      // Total categories
      pool.query("SELECT COUNT(*) as total FROM tblcategories"),
      // Total authors
      pool.query("SELECT COUNT(*) as total FROM tblauthors"),
      // Total views
      pool.query("SELECT SUM(views) as total FROM tblarticles"),
      // Recent 6 articles with category and author name
      pool.query(`
        SELECT 
          a.id, a.title, a.slug, a.is_active, a.featured,
          a.views, a.created_at, a.published_at,
          c.name as category_name,
          au.name as author_name
        FROM tblarticles a
        LEFT JOIN tblcategories c ON a.category_id = c.id
        LEFT JOIN tblauthors au ON a.author_id = au.id
        ORDER BY a.created_at DESC
        LIMIT 6
      `),
      // Top categories with article count and total views
      pool.query(`
        SELECT 
          c.id, c.name,
          COUNT(a.id) as article_count,
          COALESCE(SUM(a.views), 0) as total_views
        FROM tblcategories c
        LEFT JOIN tblarticles a ON a.category_id = c.id
        GROUP BY c.id, c.name
        ORDER BY article_count DESC
        LIMIT 6
      `),
      // Published today
      pool.query(`
        SELECT COUNT(*) as total FROM tblarticles 
        WHERE is_active = 1 AND DATE(published_at) = CURDATE()
      `),
      // Draft (is_active = 0, no published_at)
      pool.query(`
        SELECT COUNT(*) as total FROM tblarticles 
        WHERE is_active = 0 AND published_at IS NULL
      `),
      // Pending review (is_active = 0, has published_at set)
      pool.query(`
        SELECT COUNT(*) as total FROM tblarticles 
        WHERE is_active = 0 AND published_at IS NOT NULL
      `),
    ]);

    const totalArticles = (articleRows as any)[0].total;
    const totalCategories = (categoryRows as any)[0].total;
    const totalAuthors = (authorRows as any)[0].total;
    const totalViews = (viewRows as any)[0].total || 0;
    const publishedToday = (publishedTodayRows as any)[0].total;
    const draftCount = (draftRows as any)[0].total;
    const reviewCount = (reviewRows as any)[0].total;

    // Format views
    const formatViews = (n: number) => {
      if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
      if (n >= 1000) return (n / 1000).toFixed(1) + "K";
      return String(n);
    };

    // Category stats with percentage
    const catStats = recentRows as any[];
    const maxArticles = Math.max(...(categoryStatsRows as any[]).map((c: any) => c.article_count), 1);
    const topCategories = (categoryStatsRows as any[]).map((c: any) => ({
      name: c.name,
      articles: c.article_count,
      views: formatViews(Number(c.total_views)),
      pct: Math.round((c.article_count / maxArticles) * 100),
    }));

    // Recent articles
    const recentArticles = (recentRows as any[]).map((a: any) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      category: a.category_name || "Uncategorized",
      author: a.author_name || "Unknown",
      status: a.is_active ? "Published" : (a.published_at ? "Review" : "Draft"),
      views: a.views ? formatViews(Number(a.views)) : "—",
      date: a.created_at
        ? new Date(a.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        : "—",
    }));

    return NextResponse.json({
      stats: {
        totalArticles,
        totalCategories,
        totalAuthors,
        totalViews: formatViews(Number(totalViews)),
        publishedToday,
        draftCount,
        reviewCount,
      },
      recentArticles,
      topCategories,
    });
  } catch (err) {
    console.error("GET /api/admin/dashboard error:", err);
    return NextResponse.json({ error: "Failed to load dashboard data" }, { status: 500 });
  }
}