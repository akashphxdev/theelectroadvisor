// import { NextRequest, NextResponse } from "next/server";
// import pool from "@/config/db";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     const { slug } = params;

//     const [rows]: any = await pool.execute(
//       `SELECT 
//         a.id, a.title, a.slug, a.subtitle, a.content, a.image_url,
//         a.read_time, a.featured, a.views, a.created_at, a.published_at,
//         c.name AS category_name, c.slug AS category_slug
//        FROM tblarticles a
//        LEFT JOIN tblcategories c ON a.category_id = c.id
//        WHERE a.slug = ? AND a.is_active = 1
//        LIMIT 1`,
//       [slug]
//     );

//     if (!rows.length) {
//       return NextResponse.json({ success: false, message: "Article not found" }, { status: 404 });
//     }

//     // Increment views
//     await pool.execute(`UPDATE tblarticles SET views = views + 1 WHERE slug = ?`, [slug]);

//     return NextResponse.json({ success: true, data: rows[0] });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
//   }
// }