import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import pool from "@/config/db";

export const revalidate = 60;

interface Article {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  content: string;
  image_url: string;
  read_time: string;
  featured: number;
  views: number;
  created_at: string;
  published_at: string;
  category_name: string;
  category_slug: string;
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const [rows]: any = await pool.execute(
      `SELECT 
        a.id, a.title, a.slug, a.subtitle, a.content, a.image_url,
        a.read_time, a.featured, a.views, a.created_at, a.published_at,
        c.name AS category_name, c.slug AS category_slug
       FROM tblarticles a
       LEFT JOIN tblcategories c ON a.category_id = c.id
       WHERE a.slug = ? AND a.is_active = 1
       LIMIT 1`,
      [slug]
    );
    if (!rows.length) return null;
    await pool.execute(
      `UPDATE tblarticles SET views = views + 1 WHERE slug = ?`,
      [slug]
    );
    return rows[0];
  } catch (err) {
    console.error("getArticle error:", err);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const [rows]: any = await pool.execute(
      `SELECT a.slug AS articleSlug, c.slug AS categorySlug
       FROM tblarticles a
       LEFT JOIN tblcategories c ON a.category_id = c.id
       WHERE a.is_active = 1`
    );
    return rows.map((row: any) => ({
      categorySlug: row.categorySlug,
      articleSlug: row.articleSlug,
    }));
  } catch {
    return [];
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string; articleSlug: string }>;
}): Promise<Metadata> {
  const { articleSlug } = await params;
  const article = await getArticle(articleSlug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.subtitle,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ categorySlug: string; articleSlug: string }>;
}) {
  const { articleSlug } = await params;
  const article = await getArticle(articleSlug);
  if (!article) notFound();

  return (
    <main className="w-full min-h-screen bg-white">

      {/* ── Hero Image ── */}
      <div className="w-full h-72 sm:h-96 overflow-hidden relative">
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* ── Article Container ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-orange-500 transition-colors font-medium text-gray-500">
              Home
            </Link>
            <span>›</span>
            <Link href="/categories" className="hover:text-orange-500 transition-colors font-medium text-gray-500">
              Categories
            </Link>
            <span>›</span>
            <Link
              href={`/categories/${article.category_slug}`}
              className="hover:text-orange-500 transition-colors font-medium text-gray-500"
            >
              {article.category_name}
            </Link>
            <span>›</span>
            <span className="text-gray-400 line-clamp-1">{article.title}</span>
          </div>

          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">
              {article.category_name}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
            {article.title}
          </h1>

          {/* Subtitle */}
          {article.subtitle && (
            <p className="text-lg text-gray-500 leading-relaxed mb-6">
              {article.subtitle}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap pb-6 border-b border-gray-100 mb-8">
            <span>{formatDate(article.created_at)}</span>
            {article.read_time && (
              <>
                <span>·</span>
                <span>{article.read_time} read</span>
              </>
            )}
            {article.views > 0 && (
              <>
                <span>·</span>
                <span>{article.views.toLocaleString()} views</span>
              </>
            )}
          </div>

          {/* ── Content ── */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-extrabold prose-headings:text-gray-900
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:shadow-md
              prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* ── Back Button ── */}
          <div className="mt-12 pt-6 border-t border-gray-100">
            <Link
              href={`/categories/${article.category_slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-500 hover:gap-3 transition-all"
            >
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Back to {article.category_name}
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}