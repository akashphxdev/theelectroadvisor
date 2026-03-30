// app/(website)/categories/[categorySlug]/page.tsx
// ✅ Server Component — ISR 60s

import { notFound } from "next/navigation";
import CategoryClient from "./Categoryclient";

export interface Article {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  image_url: string;
  read_time: string;
  views: number;
  featured: number;
  published_at: string;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export const revalidate = 60;

async function getCategoryArticles(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/web/articles?category=${slug}&page=1&limit=6`,
      { next: { revalidate: 60 } }
    );
    const json = await res.json();
    if (!json.success) return null;
    return json;
  } catch {
    return null;
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params; // ✅ FIX

  const data = await getCategoryArticles(categorySlug);

  if (!data) notFound();

  return (
    <CategoryClient
      category={data.category}
      initialArticles={data.data}
      initialPagination={data.pagination}
    />
  );
}