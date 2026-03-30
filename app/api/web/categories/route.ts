import { NextResponse } from "next/server";
import pool from "@/config/db";

export async function GET() {
  try {
    const [rows] = await pool.query(
      `SELECT 
        id, 
        name, 
        slug, 
        image_url,
        is_active
       FROM tblcategories 
       WHERE is_active = 1
       ORDER BY name ASC`
    );

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Categories fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}