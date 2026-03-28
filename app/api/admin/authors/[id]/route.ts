import { NextRequest, NextResponse } from "next/server";
import pool from "@/config/db";

// GET /api/admin/authors/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows]: any = await pool.query(
      "SELECT id, name, bio, is_active, created_at FROM tblauthors WHERE id = ?",
      [id]
    );
    if (!rows.length) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }
    return NextResponse.json({ author: rows[0] });
  } catch (err) {
    console.error("GET /api/admin/authors/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch author" }, { status: 500 });
  }
}

// PUT /api/admin/authors/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, bio = "", is_active = 1 } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const [result]: any = await pool.query(
      "UPDATE tblauthors SET name = ?, bio = ?, is_active = ? WHERE id = ?",
      [name.trim(), bio, is_active ? 1 : 0, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT /api/admin/authors/[id] error:", err);
    return NextResponse.json({ error: "Failed to update author" }, { status: 500 });
  }
}

// DELETE /api/admin/authors/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [result]: any = await pool.query(
      "DELETE FROM tblauthors WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/authors/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete author" }, { status: 500 });
  }
}