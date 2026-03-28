import { NextRequest, NextResponse } from "next/server";
import pool from "@/config/db";

// GET /api/admin/authors
export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, bio, is_active, created_at FROM tblauthors ORDER BY created_at DESC"
    );
    return NextResponse.json({ authors: rows });
  } catch (err) {
    console.error("GET /api/admin/authors error:", err);
    return NextResponse.json({ error: "Failed to fetch authors" }, { status: 500 });
  }
}

// POST /api/admin/authors
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, bio = "", is_active = 1 } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const [result]: any = await pool.query(
      "INSERT INTO tblauthors (name, bio, is_active) VALUES (?, ?, ?)",
      [name.trim(), bio, is_active ? 1 : 0]
    );

    return NextResponse.json({ success: true, id: result.insertId }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/authors error:", err);
    return NextResponse.json({ error: "Failed to create author" }, { status: 500 });
  }
}