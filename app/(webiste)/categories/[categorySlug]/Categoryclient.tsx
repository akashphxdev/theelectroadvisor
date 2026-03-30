"use client";

// app/(website)/categories/[categorySlug]/CategoryClient.tsx

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import type { Article, Category, Pagination } from "./page";

interface Props {
  category: Category;
  initialArticles: Article[];
  initialPagination: Pagination;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ArticleSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-2/3" />
      </div>
    </div>
  );
}

export default function CategoryClient({
  category,
  initialArticles,
  initialPagination,
}: Props) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Infinite scroll sentinel
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pagination.hasMore) {
          loadMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, pagination.hasMore]
  );

  async function loadMore() {
    if (loading || !pagination.hasMore) return;
    setLoading(true);
    try {
      const nextPage = pagination.page + 1;
      const res = await fetch(
        `/api/web/articles?category=${category.slug}&page=${nextPage}&limit=${pagination.limit}`
      );
      const json = await res.json();
      if (json.success) {
        setArticles((prev) => [...prev, ...json.data]);
        setPagination(json.pagination);
      }
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <main className="w-full min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-orange-500 transition-colors font-medium text-gray-500">
              Home
            </Link>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/categories" className="hover:text-orange-500 transition-colors font-medium text-gray-500">
              Categories
            </Link>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-400">{category.name}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">Category</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {category.name}
              </h1>
            </div>

            {/* Total count */}
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-2xl px-5 py-3 flex-shrink-0">
              <span className="text-3xl font-extrabold text-orange-500">
                {pagination.total}
              </span>
              <div>
                <p className="text-xs font-bold text-gray-900 leading-tight">Total</p>
                <p className="text-xs text-gray-400 leading-tight">Articles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── No articles ── */}
      {articles.length === 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-gray-400 font-medium">No articles found in this category yet.</p>
          <Link href="/categories" className="mt-4 inline-block text-orange-500 font-bold text-sm hover:underline">
            ← Back to Categories
          </Link>
        </div>
      )}

      {articles.length > 0 && (
        <>
          {/* ── Featured Card ── */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Featured</p>
            <Link
              href={`/categories/${category.slug}/${featured.slug}`}
              className="group relative flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="relative w-full lg:w-1/2 h-64 lg:h-80 overflow-hidden flex-shrink-0">
                <img
                  src={featured.image_url}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {featured.featured === 1 && (
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-50 text-orange-500">
                      FEATURED
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-7 lg:p-10 gap-4">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors">
                  {featured.title}
                </h2>
                {featured.subtitle && (
                  <p className="text-sm text-gray-500 leading-relaxed">{featured.subtitle}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap">
                  <span>{formatDate(featured.created_at)}</span>
                  {featured.read_time && (
                    <>
                      <span>·</span>
                      <span>{featured.read_time} read</span>
                    </>
                  )}
                  {featured.views > 0 && (
                    <>
                      <span>·</span>
                      <span>{featured.views.toLocaleString()} views</span>
                    </>
                  )}
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-bold text-orange-500 group-hover:gap-3 transition-all">
                  Read Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          </section>

          {/* ── Articles Grid ── */}
          {rest.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">All Articles</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((article) => (
                  <Link
                    key={article.id}
                    href={`/categories/${category.slug}/${article.slug}`}
                    className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
                  >
                    <div className="relative w-full h-48 overflow-hidden">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {article.featured === 1 && (
                        <div className="absolute top-3 left-3">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-50 text-orange-500">
                            FEATURED
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-4 gap-2">
                      <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.subtitle && (
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                          {article.subtitle}
                        </p>
                      )}
                      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                        <span>{formatDate(article.created_at)}</span>
                        <span className="flex items-center gap-1 text-orange-500 font-semibold">
                          {article.read_time ? `${article.read_time} read` : "Read"}
                          <svg
                            className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Infinite scroll sentinel ── */}
          <div
            ref={sentinelRef}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
          >
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <ArticleSkeleton key={i} />
                ))}
              </div>
            )}
            {!pagination.hasMore && articles.length > 6 && (
              <p className="text-center text-xs text-gray-400 font-medium py-6">
                You&apos;ve seen all {pagination.total} articles
              </p>
            )}
          </div>
        </>
      )}
    </main>
  );
}