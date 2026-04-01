// app/admin/articles/[id]/edit/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ArticleForm from "../../_components/ArticleForm";

// ✅ Fix 1: initialData ka proper type define kiya (null nahi)
interface ArticleFormData {
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
}

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  // ✅ Fix 2: useState<ArticleFormData | null> — typed properly
  const [initialData, setInitialData] = useState<ArticleFormData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/admin/articles/${id}`);
        if (res.status === 401) { router.push("/admin/login"); return; }
        if (!res.ok) { router.push("/admin/articles"); return; }

        const data = await res.json();
        // ✅ Fix 3: API response 'a' typed as Record<string, unknown>
        const a = data.article as Record<string, unknown>;

        const publishedAt = a.published_at
          ? new Date(a.published_at as string).toISOString().slice(0, 16)
          : "";

        // ✅ Fix 4: setInitialData ko typed object pass kiya
        setInitialData({
          title:       typeof a.title === "string"      ? a.title      : "",
          slug:        typeof a.slug === "string"       ? a.slug       : "",
          subtitle:    typeof a.subtitle === "string"   ? a.subtitle   : "",
          content:     typeof a.content === "string"    ? a.content    : "",
          image_url:   typeof a.image_url === "string"  ? a.image_url  : "",
          category_id: a.category_id != null            ? String(a.category_id) : "",
          author_id:   a.author_id != null              ? String(a.author_id)   : "",
          published_at: publishedAt,
          read_time:   typeof a.read_time === "string"  ? a.read_time  : "",
          keywords:    typeof a.keywords === "string"   ? a.keywords   : "",
          is_active:   Boolean(a.is_active),
          featured:    Boolean(a.featured),
        });
      } catch {
        router.push("/admin/articles");
      } finally {
        setLoading(false);
      }
    };

    // ✅ Fix 5: id check — agar id nahi hai toh fetch mat karo
    if (id) fetchArticle();
  }, [id, router]); // ✅ Fix 6: router bhi deps mein add kiya

  if (loading) {
    return (
      <div style={{ padding: "60px", textAlign: "center", color: "#888", fontFamily: "sans-serif" }}>
        Loading...
      </div>
    );
  }

  if (!initialData) return null;

  return (
    <ArticleForm
      mode="edit"
      articleId={Number(id)}
      initialData={initialData}
    />
  );
}