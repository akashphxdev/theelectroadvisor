import { NextResponse } from "next/server";
import pool from "@/config/db";

export async function GET() {
  try {
    const [rows] = await pool.query(
      `SELECT 
        a.id, a.title, a.slug, a.subtitle, a.image_url, 
        a.read_time, a.views, a.published_at,
        c.name as category_name
       FROM tblarticles a
       JOIN tblcategories c ON a.category_id = c.id
       WHERE a.category_id = 16 AND a.is_active = 1
       ORDER BY a.published_at DESC`
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("Review fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}