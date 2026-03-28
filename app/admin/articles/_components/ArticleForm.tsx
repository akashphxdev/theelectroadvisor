// app/admin/articles/_components/ArticleForm.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/admin/editor/Editor"), { ssr: false });

type Category = { id: number; name: string };
type Author = { id: number; name: string };

type ArticleFormData = {
  title: string;
  slug: string;
  subtitle: string;
  content: string;
  image_url: string;
  category_id: string;
  author_id: string;
  published_at: string;
  read_time: string;
  keywords: string;
  is_active: boolean;
  featured: boolean;
};

type Props = {
  mode: "create" | "edit";
  articleId?: number;
  initialData?: Partial<ArticleFormData> & { image_url?: string };
};

const defaultForm: ArticleFormData = {
  title: "", slug: "", subtitle: "", content: "",
  image_url: "", category_id: "", author_id: "",
  published_at: "", read_time: "", keywords: "",
  is_active: true, featured: false,
};

export default function ArticleForm({ mode, articleId, initialData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<ArticleFormData>({ ...defaultForm, ...initialData });
  // initialContent is stable - Editor should NOT re-receive content on every form state change
  const initialContent = useRef<string>(initialData?.content || "").current;
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image_url || "");
  const [imageUploading, setImageUploading] = useState(false);
  const oldImageUrlRef = useRef<string>(initialData?.image_url || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchMeta = async () => {
      const [catRes, authRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/admin/authors"),
      ]);
      if (catRes.ok) { const d = await catRes.json(); setCategories(d.data || d.categories || []); }
      if (authRes.ok) { const d = await authRes.json(); setAuthors(d.authors || d.data || []); }
    };
    fetchMeta();
  }, []);

  // Auto-generate slug from title (only on create)
  useEffect(() => {
    if (mode !== "create") return;
    const slug = form.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setForm((prev) => ({ ...prev, slug }));
  }, [form.title]);

  const handleChange = (field: keyof ArticleFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file: File) => {
    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("target", "articles");
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setForm((prev) => ({ ...prev, image_url: data.path }));
      setImagePreview(data.path);
    } catch (err: any) {
      setError(err.message || "Image upload failed");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.title.trim()) { setError("Title required hai"); return; }
    if (!form.slug.trim()) { setError("Slug required hai"); return; }

    setSaving(true);
    try {
      const payload = {
        ...form,
        category_id: form.category_id || null,
        author_id: form.author_id || null,
        published_at: form.published_at || null,
        ...(mode === "edit" && { old_image_url: oldImageUrlRef.current }),
      };

      const res = await fetch(
        mode === "create" ? "/api/admin/articles" : `/api/admin/articles/${articleId}`,
        {
          method: mode === "create" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      router.push("/admin/articles");
    } catch (err: any) {
      setError(err.message || "Kuch gadbad ho gaya");
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "9px 12px", border: "1px solid #e2e2e6",
    borderRadius: "8px", fontSize: "14px", outline: "none",
    boxSizing: "border-box" as const, fontFamily: "sans-serif",
  };
  const labelStyle = {
    display: "block", fontSize: "13px", fontWeight: 600,
    color: "#444", marginBottom: "6px",
  };
  const sectionStyle = {
    background: "#fff", border: "1px solid #e2e2e6",
    borderRadius: "12px", padding: "20px", marginBottom: "16px",
  };

  const imageDisplaySrc = imagePreview
    ? imagePreview.startsWith("/uploads/")
      ? `/api/serve-file/${imagePreview.replace("/uploads/", "")}`
      : imagePreview
    : null;

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: "1100px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#111" }}>
            {mode === "create" ? "Create Article" : "Edit Article"}
          </h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
            {mode === "create" ? "Fill in the details below to publish a new article." : "Article details update karo."}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => router.push("/admin/articles")}
            style={{
              padding: "9px 16px", border: "1px solid #e2e2e6", borderRadius: "8px",
              background: "#fff", color: "#555", fontSize: "14px", cursor: "pointer",
            }}
          >Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={saving || imageUploading}
            style={{
              padding: "9px 18px", border: "none", borderRadius: "8px",
              background: "#111", color: "#fff", fontSize: "14px",
              fontWeight: 600, cursor: "pointer",
              opacity: saving || imageUploading ? 0.6 : 1,
            }}
          >
            {saving ? "Saving..." : mode === "create" ? "✓ Create Article" : "✓ Update Article"}
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px",
          padding: "12px 16px", color: "#dc2626", fontSize: "14px", marginBottom: "16px",
        }}>{error}</div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "16px" }}>
        {/* Left Column */}
        <div>
          {/* Featured Image */}
          <div style={sectionStyle}>
            <label style={labelStyle}>Featured Image</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: "2px dashed #e2e2e6", borderRadius: "10px",
                padding: "24px", textAlign: "center", cursor: "pointer",
                background: "#fafafa", transition: "border-color 0.2s",
                minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {imageUploading ? (
                <span style={{ color: "#888" }}>Uploading...</span>
              ) : imageDisplaySrc ? (
                <img src={imageDisplaySrc} alt="preview"
                  style={{ maxHeight: "180px", maxWidth: "100%", borderRadius: "8px", objectFit: "cover" }} />
              ) : (
                <div style={{ color: "#aaa" }}>
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>☁</div>
                  <div style={{ fontSize: "14px" }}>Click to upload image</div>
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>JPEG, PNG, GIF, WebP — max 5 MB</div>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }}
            />
            {imagePreview && (
              <button
                onClick={() => { setImagePreview(""); setForm((p) => ({ ...p, image_url: "" })); }}
                style={{
                  marginTop: "8px", padding: "6px 12px", border: "1px solid #fca5a5",
                  borderRadius: "6px", background: "#fff", color: "#dc2626",
                  fontSize: "12px", cursor: "pointer",
                }}
              >Remove Image</button>
            )}
          </div>

          {/* Article Details */}
          <div style={sectionStyle}>
            <h3 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: 700 }}>Article Details</h3>
            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Title *</label>
              <input style={inputStyle} placeholder="Article title"
                value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
            </div>
            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Slug</label>
              <input style={inputStyle} placeholder="auto-generated-slug"
                value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} />
            </div>
            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Subtitle</label>
              <input style={inputStyle} placeholder="Optional subtitle"
                value={form.subtitle} onChange={(e) => handleChange("subtitle", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Keywords</label>
              <input style={inputStyle} placeholder="comma, separated, keywords"
                value={form.keywords} onChange={(e) => handleChange("keywords", e.target.value)} />
            </div>
          </div>

          {/* Content Editor */}
          <div style={sectionStyle}>
            <label style={labelStyle}>Content</label>
            <Editor
              content={initialContent}
              onChange={(html: string) => handleChange("content", html)}
            />
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Taxonomy & Scheduling */}
          <div style={sectionStyle}>
            <h3 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: 700 }}>Taxonomy & Scheduling</h3>

            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Category</label>
              <select style={{ ...inputStyle, background: "#fff" }}
                value={form.category_id} onChange={(e) => handleChange("category_id", e.target.value)}>
                <option value="">— None —</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Author</label>
              <select style={{ ...inputStyle, background: "#fff" }}
                value={form.author_id} onChange={(e) => handleChange("author_id", e.target.value)}>
                <option value="">— None —</option>
                {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Published At</label>
              <input type="datetime-local" style={inputStyle}
                value={form.published_at} onChange={(e) => handleChange("published_at", e.target.value)} />
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Read Time</label>
              <input style={inputStyle} placeholder="e.g. 5 min"
                value={form.read_time} onChange={(e) => handleChange("read_time", e.target.value)} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input type="checkbox" checked={form.is_active}
                  onChange={(e) => handleChange("is_active", e.target.checked)}
                  style={{ width: "16px", height: "16px", accentColor: "#111" }} />
                <span style={{ fontSize: "14px", fontWeight: 500 }}>Active</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input type="checkbox" checked={form.featured}
                  onChange={(e) => handleChange("featured", e.target.checked)}
                  style={{ width: "16px", height: "16px", accentColor: "#111" }} />
                <span style={{ fontSize: "14px", fontWeight: 500 }}>Featured</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}