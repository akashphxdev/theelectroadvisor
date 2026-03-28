// lib/requireAdmin.ts - Koi change nahi chahiye
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function requireAdmin(request: NextRequest): Promise<Response | null> {
  const token = request.cookies.get("adminToken")?.value;

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return null;
  } catch {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}