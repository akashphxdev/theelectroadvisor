// app/admin/articles/[id]/edit/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ArticleForm from "../../_components/ArticleForm";

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/admin/articles/${id}`);
        if (res.status === 401) { router.push("/admin/login"); return; }
        if (!res.ok) { router.push("/admin/articles"); return; }
        const data = await res.json();
        const a = data.article;

        // Format datetime-local value
        const publishedAt = a.published_at
          ? new Date(a.published_at).toISOString().slice(0, 16)
          : "";

        setInitialData({
          title: a.title || "",
          slug: a.slug || "",
          subtitle: a.subtitle || "",
          content: a.content || "",
          image_url: a.image_url || "",
          category_id: a.category_id ? String(a.category_id) : "",
          author_id: a.author_id ? String(a.author_id) : "",
          published_at: publishedAt,
          read_time: a.read_time || "",
          keywords: a.keywords || "",
          is_active: Boolean(a.is_active),
          featured: Boolean(a.featured),
        });
      } catch {
        router.push("/admin/articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "60px", textAlign: "center", color: "#888", fontFamily: "sans-serif" }}>
        Loading...
      </div>
    );
  }

  if (!initialData) return null;

  return <ArticleForm mode="edit" articleId={Number(id)} initialData={initialData} />;
}