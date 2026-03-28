// app/admin/articles/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Article = {
  id: number;
  title: string;
  slug: string;
  subtitle: string | null;
  image_url: string | null;
  category_name: string | null;
  author_name: string | null;
  published_at: string | null;
  read_time: string | null;
  featured: number;
  is_active: number;
  views: number;
  created_at: string;
};

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/articles");
      if (res.status === 401) { router.push("/admin/login"); return; }
      const data = await res.json();
      setArticles(data.articles || []);
    } catch {
      console.error("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArticles(); }, []);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Delete failed");
      }
    } catch {
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    (a.category_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (a.author_name || "").toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#111" }}>Articles</h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
            {articles.length} total articles
          </p>
        </div>
        <Link href="/admin/articles/create">
          <button style={{
            background: "#111", color: "#fff", border: "none",
            padding: "10px 18px", borderRadius: "8px", fontWeight: 600,
            fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px"
          }}>
            + New Article
          </button>
        </Link>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%", maxWidth: "360px", padding: "9px 14px",
            border: "1px solid #e2e2e6", borderRadius: "8px",
            fontSize: "14px", outline: "none", boxSizing: "border-box",
          }}
        />
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>Loading articles...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
          {search ? "No articles found." : "No articles found."}
        </div>
      ) : (
        <div style={{ overflowX: "auto", border: "1px solid #e2e2e6", borderRadius: "12px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "#f8f8fa", borderBottom: "1px solid #e2e2e6" }}>
                {["Image", "Title", "Category", "Author", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} style={{
                    padding: "12px 16px", textAlign: "left", fontWeight: 600,
                    color: "#555", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px"
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((article, i) => (
                <tr key={article.id} style={{
                  borderBottom: i < filtered.length - 1 ? "1px solid #f0f0f2" : "none",
                  background: "#fff",
                }}>
                  {/* Image */}
                  <td style={{ padding: "12px 16px" }}>
                    {article.image_url ? (
                      <img
                        src={article.image_url.startsWith("/uploads/")
                          ? `/api/serve-file/${article.image_url.replace("/uploads/", "")}`
                          : article.image_url}
                        alt={article.title}
                        style={{ width: "52px", height: "40px", objectFit: "cover", borderRadius: "6px" }}
                      />
                    ) : (
                      <div style={{
                        width: "52px", height: "40px", borderRadius: "6px",
                        background: "#f0f0f2", display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: "18px"
                      }}>📄</div>
                    )}
                  </td>

                  {/* Title */}
                  <td style={{ padding: "12px 16px", maxWidth: "240px" }}>
                    <div style={{ fontWeight: 600, color: "#111", marginBottom: "2px",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {article.title}
                    </div>
                    <div style={{ color: "#888", fontSize: "12px" }}>{article.slug}</div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: "12px 16px", color: "#555" }}>
                    {article.category_name || "—"}
                  </td>

                  {/* Author */}
                  <td style={{ padding: "12px 16px", color: "#555" }}>
                    {article.author_name || "—"}
                  </td>

                  {/* Status */}
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{
                        display: "inline-block", padding: "2px 8px", borderRadius: "99px", fontSize: "11px",
                        fontWeight: 600, width: "fit-content",
                        background: article.is_active ? "#dcfce7" : "#f3f4f6",
                        color: article.is_active ? "#16a34a" : "#6b7280",
                      }}>
                        {article.is_active ? "Active" : "Inactive"}
                      </span>
                      {article.featured ? (
                        <span style={{
                          display: "inline-block", padding: "2px 8px", borderRadius: "99px", fontSize: "11px",
                          fontWeight: 600, width: "fit-content", background: "#fef9c3", color: "#ca8a04",
                        }}>Featured</span>
                      ) : null}
                    </div>
                  </td>

                  {/* Date */}
                  <td style={{ padding: "12px 16px", color: "#555", whiteSpace: "nowrap" }}>
                    {formatDate(article.created_at)}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Link href={`/admin/articles/${article.id}/edit`}>
                        <button style={{
                          padding: "6px 12px", border: "1px solid #e2e2e6",
                          borderRadius: "6px", background: "#fff", color: "#111",
                          fontSize: "12px", fontWeight: 500, cursor: "pointer",
                        }}>Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id, article.title)}
                        disabled={deletingId === article.id}
                        style={{
                          padding: "6px 12px", border: "1px solid #fca5a5",
                          borderRadius: "6px", background: "#fff", color: "#dc2626",
                          fontSize: "12px", fontWeight: 500, cursor: "pointer",
                          opacity: deletingId === article.id ? 0.5 : 1,
                        }}
                      >
                        {deletingId === article.id ? "..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}