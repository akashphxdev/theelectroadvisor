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
    <div className="rounded-2xl border border-[#f0ebe4] overflow-hidden bg-white animate-pulse">
      <div className="w-full h-48 bg-[#f0ebe4]" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3.5 bg-[#f0ebe4] rounded-md w-3/4" />
        <div className="h-3 bg-[#f5f0ea] rounded-md w-full" />
        <div className="h-3 bg-[#f5f0ea] rounded-md w-3/5" />
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300;1,8..60,400&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .article-card-link:hover .article-card-img { transform: scale(1.05); }
        .article-card-link:hover .article-card-title { color: #e85d26 !important; }
        .article-card-link:hover .read-arrow { transform: translateX(3px); }
        .featured-link:hover .featured-img { transform: scale(1.05); }
        .featured-link:hover .featured-title { color: #e85d26 !important; }
        .featured-link:hover .featured-arrow { gap: 12px !important; }
        .breadcrumb-a:hover { color: #e85d26 !important; }
      `}</style>

      <main className="w-full min-h-screen bg-[#faf7f4] font-['DM_Sans',sans-serif]">

        {/* ── Header ── */}
        <section className="w-full bg-white border-b border-[#f0ebe4]">
          <div className="max-w-[1280px] mx-auto px-8 pt-9 pb-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-6 text-[0.78rem] font-medium font-['DM_Sans',sans-serif] flex-wrap">
              {[
                { href: "/", label: "Home" },
                { href: "/categories", label: "Categories" },
              ].map((crumb, i) => (
                <span key={i} className="flex items-center gap-2">
                  <Link
                    href={crumb.href}
                    className="breadcrumb-a text-[#999] no-underline transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                  <span className="text-[#ccc]">›</span>
                </span>
              ))}
              <span className="text-[#555] font-semibold">{category.name}</span>
            </nav>

            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                {/* Category badge */}
                <div className="inline-flex items-center gap-1.5 bg-[#fff5f0] border border-[#fde0d0] rounded-full px-3 py-1 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e85d26] inline-block" />
                  <span className="text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[#e85d26] font-['DM_Sans',sans-serif]">
                    Category
                  </span>
                </div>

                {/* Category name */}
                <h1
                  className="font-black text-[#111] leading-[1.15] tracking-[-0.02em] m-0"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                  }}
                >
                  {category.name}
                </h1>
              </div>

              {/* Article count pill */}
              <div className="flex items-center gap-3 bg-[#fff5f0] border-[1.5px] border-[#fde0d0] rounded-2xl px-5 py-3.5 shrink-0">
                <span
                  className="text-[2rem] font-black text-[#e85d26] leading-none"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {pagination.total}
                </span>
                <div>
                  <p className="font-['DM_Sans',sans-serif] text-[0.75rem] font-bold text-[#111] m-0 leading-[1.3]">
                    Total
                  </p>
                  <p className="font-['DM_Sans',sans-serif] text-[0.72rem] text-[#bbb] m-0 leading-[1.3]">
                    Articles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── No articles ── */}
        {articles.length === 0 && (
          <div className="max-w-[1280px] mx-auto px-8 py-24 text-center">
            <p
              className="text-[1.1rem] font-light italic text-[#aaa] mb-5"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              No articles found in this category yet.
            </p>
            <Link
              href="/categories"
              className="font-['DM_Sans',sans-serif] text-[0.82rem] font-bold text-[#e85d26] underline underline-offset-[3px]"
            >
              ← Back to Categories
            </Link>
          </div>
        )}

        {articles.length > 0 && (
          <>
            {/* ── Featured Card ── */}
            <section className="max-w-[1280px] mx-auto px-8 pt-10 pb-6">
              <p className="font-['DM_Sans',sans-serif] text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#bbb] mb-4">
                Featured
              </p>

              <Link
                href={`/${category.slug}/${featured.slug}`}
                className="featured-link flex flex-row flex-wrap rounded-[20px] overflow-hidden border-[1.5px] border-[#f0ebe4] bg-white no-underline transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
              >
                {/* Image */}
                <div className="relative w-full max-w-[480px] min-h-[280px] overflow-hidden shrink-0">
                  <img
                    src={featured.image_url}
                    alt={featured.title}
                    className="featured-img w-full h-full object-cover block transition-transform duration-500 ease-in-out"
                  />
                  {featured.featured === 1 && (
                    <div className="absolute top-3.5 left-3.5">
                      <span className="font-['DM_Sans',sans-serif] text-[0.65rem] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full bg-[#e85d26] text-white">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center px-10 py-9 gap-4 min-w-[260px]">
                  <h2
                    className="featured-title font-black text-[#111] leading-[1.2] tracking-[-0.02em] m-0 transition-colors duration-200"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    }}
                  >
                    {featured.title}
                  </h2>

                  {featured.subtitle && (
                    <p
                      className="text-[1rem] font-light italic text-[#777] leading-[1.6] m-0 border-l-[3px] border-[#e85d26] pl-3.5"
                      style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                    >
                      {featured.subtitle}
                    </p>
                  )}

                  <div className="flex items-center gap-1.5 flex-wrap font-['DM_Sans',sans-serif] text-[0.75rem] text-[#aaa] font-medium">
                    <span>{formatDate(featured.created_at)}</span>
                    {featured.read_time && (
                      <>
                        <span className="opacity-40">|</span>
                        <span>{featured.read_time} read</span>
                      </>
                    )}
                    {featured.views > 0 && (
                      <>
                        <span className="opacity-40">|</span>
                        <span>{featured.views.toLocaleString()} views</span>
                      </>
                    )}
                  </div>

                  <div className="featured-arrow inline-flex items-center gap-2 font-['DM_Sans',sans-serif] text-[0.8rem] font-bold text-[#e85d26] transition-all duration-200 tracking-[0.04em]">
                    Read Article
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            </section>

            {/* ── Articles Grid ── */}
            {rest.length > 0 && (
              <section className="max-w-[1280px] mx-auto px-8 pb-10">
                <p className="font-['DM_Sans',sans-serif] text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#bbb] mb-5">
                  All Articles
                </p>

                <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                  {rest.map((article) => (
                    <Link
                      key={article.id}
                      href={`/${category.slug}/${article.slug}`}
                      className="article-card-link flex flex-col rounded-2xl border border-[#f0ebe4] overflow-hidden bg-white no-underline transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                    >
                      {/* Image */}
                      <div className="relative w-full h-48 overflow-hidden shrink-0">
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="article-card-img w-full h-full object-cover block transition-transform duration-500 ease-in-out"
                        />
                        {article.featured === 1 && (
                          <div className="absolute top-2.5 left-2.5">
                            <span className="font-['DM_Sans',sans-serif] text-[0.62rem] font-bold tracking-[0.1em] uppercase px-2.5 py-[3px] rounded-full bg-[#e85d26] text-white">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card body */}
                      <div className="flex flex-col flex-1 px-[18px] py-4 gap-2">
                        <h3
                          className="article-card-title font-bold text-[#111] leading-[1.3] m-0 transition-colors duration-200 line-clamp-2"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "1rem",
                          }}
                        >
                          {article.title}
                        </h3>

                        {article.subtitle && (
                          <p
                            className="text-[0.82rem] font-light italic text-[#999] leading-[1.5] m-0 line-clamp-2"
                            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                          >
                            {article.subtitle}
                          </p>
                        )}

                        {/* Footer meta */}
                        <div className="mt-auto pt-3 border-t border-[#f0ebe4] flex items-center justify-between">
                          <span className="font-['DM_Sans',sans-serif] text-[0.72rem] text-[#bbb] font-medium">
                            {formatDate(article.created_at)}
                          </span>
                          <span className="inline-flex items-center gap-1 font-['DM_Sans',sans-serif] text-[0.72rem] font-bold text-[#e85d26]">
                            {article.read_time ? `${article.read_time} read` : "Read"}
                            <svg
                              className="read-arrow transition-transform duration-200"
                              width="12"
                              height="12"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
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
            <div ref={sentinelRef} className="max-w-[1280px] mx-auto px-8 pb-16">
              {loading && (
                <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <ArticleSkeleton key={i} />
                  ))}
                </div>
              )}
              {!pagination.hasMore && articles.length > 6 && (
                <div className="flex items-center gap-4 py-6">
                  <div className="flex-1 h-px bg-[#ede7df]" />
                  <p
                    className="text-[0.85rem] italic font-light text-[#bbb] m-0 whitespace-nowrap"
                    style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                  >
                    You seen all {pagination.total} articles
                  </p>
                  <div className="flex-1 h-px bg-[#ede7df]" />
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}