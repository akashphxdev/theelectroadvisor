import { NextRequest, NextResponse } from "next/server";
import pool from "@/config/db";
import bcrypt from "bcryptjs";

// GET /api/admin/admins
export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, role, is_active, last_login, created_at FROM tbladmins ORDER BY created_at DESC"
    );
    return NextResponse.json({ admins: rows });
  } catch (err) {
    console.error("GET /api/admin/admins error:", err);
    return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 });
  }
}

// POST /api/admin/admins
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role = "admin", is_active = 1 } = body;

    if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!email?.trim()) return NextResponse.json({ error: "Email is required" }, { status: 400 });
    if (!password || password.length < 6) return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });

    // Check if email already exists
    const [existing]: any = await pool.query(
      "SELECT id FROM tbladmins WHERE email = ?",
      [email.trim().toLowerCase()]
    );
    if (existing.length > 0) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result]: any = await pool.query(
      "INSERT INTO tbladmins (name, email, password, role, is_active) VALUES (?, ?, ?, ?, ?)",
      [name.trim(), email.trim().toLowerCase(), hashedPassword, role, is_active ? 1 : 0]
    );

    return NextResponse.json({ success: true, id: result.insertId }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/admins error:", err);
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
  }
}