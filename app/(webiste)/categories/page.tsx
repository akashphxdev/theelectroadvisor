// app/(website)/categories/page.tsx
// ✅ Server Component — ISR: revalidate every 60 seconds

import CategoriesClient from "../../../components/Categoriesclient";

export interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  is_active: number;
}

export const revalidate = 60;

async function getCategories(): Promise<Category[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/web/categories`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    if (json.success) return json.data ?? [];
    return [];
  } catch {
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  return <CategoriesClient initialCategories={categories} />;
}