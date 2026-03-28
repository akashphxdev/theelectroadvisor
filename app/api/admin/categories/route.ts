import { NextRequest, NextResponse } from "next/server";
import db from "@/config/db";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tblcategories ORDER BY id DESC"
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const is_active = formData.get("is_active") ?? "1";
    const image_path = formData.get("image_path") as string | null; // 👈 upload API se mila path

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: "Name and slug required" },
        { status: 400 }
      );
    }

    // Slug duplicate check
    const [existing]: any = await db.query(
      "SELECT id FROM tblcategories WHERE slug=?",
      [slug]
    );
    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 400 }
      );
    }

    await db.query(
      "INSERT INTO tblcategories (name, slug, is_active, image_url) VALUES (?, ?, ?, ?)",
      [name, slug, is_active, image_path ?? null]
    );

    return NextResponse.json({ success: true, message: "Category created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to create" },
      { status: 500 }
    );
  }
}