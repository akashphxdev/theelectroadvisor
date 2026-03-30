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
    <div
      style={{
        borderRadius: "16px",
        border: "1.5px solid #f0ebe4",
        overflow: "hidden",
        background: "#fff",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    >
      <div style={{ width: "100%", height: "192px", background: "#f0ebe4" }} />
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ height: "14px", background: "#f0ebe4", borderRadius: "6px", width: "75%" }} />
        <div style={{ height: "12px", background: "#f5f0ea", borderRadius: "6px", width: "100%" }} />
        <div style={{ height: "12px", background: "#f5f0ea", borderRadius: "6px", width: "60%" }} />
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

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .article-card-link:hover .article-card-img {
          transform: scale(1.05);
        }
        .article-card-link:hover .article-card-title {
          color: #e85d26 !important;
        }
        .article-card-link:hover .read-arrow {
          transform: translateX(3px);
        }
        .featured-link:hover .featured-img {
          transform: scale(1.05);
        }
        .featured-link:hover .featured-title {
          color: #e85d26 !important;
        }
        .featured-link:hover .featured-arrow {
          gap: 12px !important;
        }
        .breadcrumb-a:hover {
          color: #e85d26 !important;
        }
      `}</style>

      <main
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "#faf7f4",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ── Header ── */}
        <section
          style={{
            width: "100%",
            background: "#fff",
            borderBottom: "1px solid #f0ebe4",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "36px 32px 32px",
            }}
          >
            {/* Breadcrumb */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "24px",
                fontSize: "0.78rem",
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                flexWrap: "wrap",
              }}
            >
              {[
                { href: "/", label: "Home" },
                { href: "/categories", label: "Categories" },
              ].map((crumb, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Link
                    href={crumb.href}
                    className="breadcrumb-a"
                    style={{ color: "#999", textDecoration: "none", transition: "color 0.2s" }}
                  >
                    {crumb.label}
                  </Link>
                  <span style={{ color: "#ccc" }}>›</span>
                </span>
              ))}
              <span style={{ color: "#555", fontWeight: 600 }}>{category.name}</span>
            </nav>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <div>
                {/* Category badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "#fff5f0",
                    border: "1px solid #fde0d0",
                    borderRadius: "100px",
                    padding: "4px 12px",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#e85d26",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#e85d26",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Category
                  </span>
                </div>

                {/* Category name — Playfair */}
                <h1
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 900,
                    color: "#111",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  {category.name}
                </h1>
              </div>

              {/* Article count pill */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#fff5f0",
                  border: "1.5px solid #fde0d0",
                  borderRadius: "16px",
                  padding: "14px 20px",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: "#e85d26",
                    lineHeight: 1,
                  }}
                >
                  {pagination.total}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#111",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    Total
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      color: "#bbb",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    Articles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── No articles ── */}
        {articles.length === 0 && (
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "96px 32px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
                fontWeight: 300,
                color: "#aaa",
                marginBottom: "20px",
              }}
            >
              No articles found in this category yet.
            </p>
            <Link
              href="/categories"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#e85d26",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              ← Back to Categories
            </Link>
          </div>
        )}

        {articles.length > 0 && (
          <>
            {/* ── Featured Card ── */}
            <section
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                padding: "40px 32px 24px",
              }}
            >
              {/* Section label */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#bbb",
                  marginBottom: "16px",
                }}
              >
                Featured
              </p>

              <Link
                href={`/${category.slug}/${featured.slug}`}
                className="featured-link"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1.5px solid #f0ebe4",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  background: "#fff",
                  textDecoration: "none",
                  transition: "box-shadow 0.3s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Image */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "480px",
                    minHeight: "280px",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={featured.image_url}
                    alt={featured.title}
                    className="featured-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.5s ease",
                    }}
                  />
                  {featured.featured === 1 && (
                    <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          padding: "4px 12px",
                          borderRadius: "100px",
                          background: "#e85d26",
                          color: "#fff",
                        }}
                      >
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "36px 40px",
                    gap: "16px",
                    minWidth: "260px",
                  }}
                >
                  {/* Title — Playfair */}
                  <h2
                    className="featured-title"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                      fontWeight: 900,
                      color: "#111",
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                      margin: 0,
                      transition: "color 0.2s",
                    }}
                  >
                    {featured.title}
                  </h2>

                  {/* Subtitle — Source Serif italic */}
                  {featured.subtitle && (
                    <p
                      style={{
                        fontFamily: "'Source Serif 4', Georgia, serif",
                        fontSize: "1rem",
                        fontWeight: 300,
                        fontStyle: "italic",
                        color: "#777",
                        lineHeight: 1.6,
                        margin: 0,
                        borderLeft: "3px solid #e85d26",
                        paddingLeft: "14px",
                      }}
                    >
                      {featured.subtitle}
                    </p>
                  )}

                  {/* Meta */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexWrap: "wrap",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: "#aaa",
                      fontWeight: 500,
                    }}
                  >
                    <span>{formatDate(featured.created_at)}</span>
                    {featured.read_time && (
                      <>
                        <span style={{ opacity: 0.4 }}>|</span>
                        <span>{featured.read_time} read</span>
                      </>
                    )}
                    {featured.views > 0 && (
                      <>
                        <span style={{ opacity: 0.4 }}>|</span>
                        <span>{featured.views.toLocaleString()} views</span>
                      </>
                    )}
                  </div>

                  {/* Read link */}
                  <div
                    className="featured-arrow"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "#e85d26",
                      transition: "gap 0.2s",
                      letterSpacing: "0.04em",
                    }}
                  >
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
              <section
                style={{
                  maxWidth: "1280px",
                  margin: "0 auto",
                  padding: "8px 32px 40px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#bbb",
                    marginBottom: "20px",
                  }}
                >
                  All Articles
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {rest.map((article) => (
                    <Link
                      key={article.id}
                      href={`/${category.slug}/${article.slug}`}
                      className="article-card-link"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "16px",
                        border: "1.5px solid #f0ebe4",
                        overflow: "hidden",
                        background: "#fff",
                        textDecoration: "none",
                        transition: "box-shadow 0.25s, transform 0.25s",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.10)";
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      }}
                    >
                      {/* Image */}
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "192px",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="article-card-img"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            transition: "transform 0.5s ease",
                          }}
                        />
                        {article.featured === 1 && (
                          <div style={{ position: "absolute", top: "10px", left: "10px" }}>
                            <span
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.62rem",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                padding: "3px 10px",
                                borderRadius: "100px",
                                background: "#e85d26",
                                color: "#fff",
                              }}
                            >
                              Featured
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card body */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                          padding: "16px 18px",
                          gap: "8px",
                        }}
                      >
                        {/* Title — Playfair */}
                        <h3
                          className="article-card-title"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "#111",
                            lineHeight: 1.3,
                            margin: 0,
                            transition: "color 0.2s",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {article.title}
                        </h3>

                        {/* Subtitle — Source Serif */}
                        {article.subtitle && (
                          <p
                            style={{
                              fontFamily: "'Source Serif 4', Georgia, serif",
                              fontSize: "0.82rem",
                              fontWeight: 300,
                              fontStyle: "italic",
                              color: "#999",
                              lineHeight: 1.5,
                              margin: 0,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {article.subtitle}
                          </p>
                        )}

                        {/* Footer meta */}
                        <div
                          style={{
                            marginTop: "auto",
                            paddingTop: "12px",
                            borderTop: "1px solid #f0ebe4",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.72rem",
                              color: "#bbb",
                              fontWeight: 500,
                            }}
                          >
                            {formatDate(article.created_at)}
                          </span>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              color: "#e85d26",
                            }}
                          >
                            {article.read_time ? `${article.read_time} read` : "Read"}
                            <svg
                              className="read-arrow"
                              style={{ transition: "transform 0.2s" }}
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
            <div
              ref={sentinelRef}
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                padding: "0 32px 64px",
              }}
            >
              {loading && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {Array.from({ length: 3 }).map((_, i) => (
                    <ArticleSkeleton key={i} />
                  ))}
                </div>
              )}
              {!pagination.hasMore && articles.length > 6 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "24px 0",
                  }}
                >
                  <div style={{ flex: 1, height: "1px", background: "#ede7df" }} />
                  <p
                    style={{
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: "0.85rem",
                      fontStyle: "italic",
                      fontWeight: 300,
                      color: "#bbb",
                      margin: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    You've seen all {pagination.total} articles
                  </p>
                  <div style={{ flex: 1, height: "1px", background: "#ede7df" }} />
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}