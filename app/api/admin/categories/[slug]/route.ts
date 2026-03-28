//app/api/admin/categories/[slug]/route.ts
import { deleteUploadedFile } from "@/lib/deleteUploadedFile";
import { NextRequest, NextResponse } from "next/server";
import db from "@/config/db";
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: currentSlug } = await params;
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const is_active = formData.get("is_active") ?? "1";
    const newImagePath = formData.get("image_path") as string | null; // 👈 upload API se mila path
    const removeImage = formData.get("remove_image");

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: "Name and slug required" },
        { status: 400 }
      );
    }

    // Slug conflict check
    if (slug !== currentSlug) {
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
    }

    // Purani image fetch karo
    const [rows]: any = await db.query(
      "SELECT image_url FROM tblcategories WHERE slug=?",
      [currentSlug]
    );
    const oldImagePath = rows[0]?.image_url || null;

    let updateQuery = "UPDATE tblcategories SET name=?, slug=?, is_active=?";
    let queryParams: any[] = [name, slug, is_active];

    if (newImagePath) {
      // ✅ Nai image upload ho chuki - purani delete karo
      await deleteUploadedFile(oldImagePath);
      updateQuery += ", image_url=?";
      queryParams.push(newImagePath);
    } else if (removeImage === "true") {
      // ✅ Image hatani hai
      await deleteUploadedFile(oldImagePath);
      updateQuery += ", image_url=NULL";
    }
    // ✅ Koi change nahi - image_url waise hi rahega

    updateQuery += " WHERE slug=?";
    queryParams.push(currentSlug);

    const [result]: any = await db.query(updateQuery, queryParams);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to update" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const [rows]: any = await db.query(
      "SELECT image_url FROM tblcategories WHERE slug=?",
      [slug]
    );

    const [result]: any = await db.query(
      "DELETE FROM tblcategories WHERE slug=?",
      [slug]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    // Image bhi delete karo
    await deleteUploadedFile(rows[0]?.image_url || null);

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete" },
      { status: 500 }
    );
  }
}