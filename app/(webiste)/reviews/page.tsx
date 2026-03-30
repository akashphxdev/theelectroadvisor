"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Article {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  image_url: string;
  read_time: string;
  views: number;
  published_at: string;
  category_name: string;
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
    <div className="skeleton-card">
      <div className="skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton-line w75" />
        <div className="skeleton-line w100" />
        <div className="skeleton-line w60" />
      </div>
    </div>
  );
}

export default function ReviewPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/web/review");
        const json = await res.json();
        if (json.success) {
          setArticles(json.data);
        } else {
          setError("Failed to load articles.");
        }
      } catch {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300;1,8..60,400&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* ── Skeleton ── */
        .skeleton-card {
          border-radius: 16px;
          border: 1.5px solid #f0ebe4;
          overflow: hidden;
          background: #fff;
          animation: pulse 1.5s ease-in-out infinite;
        }
        .skeleton-img { width: 100%; height: 192px; background: #f0ebe4; }
        .skeleton-body { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
        .skeleton-line { height: 12px; background: #f0ebe4; border-radius: 6px; }
        .skeleton-line.w75 { width: 75%; }
        .skeleton-line.w100 { width: 100%; background: #f5f0ea; }
        .skeleton-line.w60 { width: 60%; background: #f5f0ea; }

        /* ── Featured skeleton ── */
        .skeleton-featured {
          border-radius: 20px;
          border: 1.5px solid #f0ebe4;
          overflow: hidden;
          background: #fff;
          animation: pulse 1.5s ease-in-out infinite;
          display: flex;
          margin-bottom: 40px;
          min-height: 280px;
        }
        .skeleton-featured-img { background: #f0ebe4; flex-shrink: 0; width: 100%; }
        .skeleton-featured-body { flex: 1; padding: 36px 40px; display: flex; flex-direction: column; gap: 16px; }
        .skeleton-featured-line { border-radius: 6px; background: #f0ebe4; }

        /* ── Hover states ── */
        .article-card-link { display: flex; flex-direction: column; border-radius: 16px; border: 1.5px solid #f0ebe4; overflow: hidden; background: #fff; text-decoration: none; transition: box-shadow 0.25s, transform 0.25s; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
        .article-card-link:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.10); transform: translateY(-4px); }
        .article-card-link:hover .article-card-img { transform: scale(1.05); }
        .article-card-link:hover .article-card-title { color: #e85d26 !important; }
        .article-card-link:hover .read-arrow { transform: translateX(3px); }

        .featured-link { display: flex; flex-direction: row; flex-wrap: wrap; border-radius: 20px; overflow: hidden; border: 1.5px solid #f0ebe4; box-shadow: 0 2px 12px rgba(0,0,0,0.05); background: #fff; text-decoration: none; transition: box-shadow 0.3s, transform 0.3s; }
        .featured-link:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.12); transform: translateY(-2px); }
        .featured-link:hover .featured-img { transform: scale(1.05); }
        .featured-link:hover .featured-title { color: #e85d26 !important; }
        .featured-link:hover .featured-arrow { gap: 12px !important; }

        .breadcrumb-a { color: #999; text-decoration: none; transition: color 0.2s; }
        .breadcrumb-a:hover { color: #e85d26 !important; }

        /* ── Layout ── */
        .page-wrapper { width: 100%; min-height: 100vh; background: #faf7f4; font-family: 'DM Sans', sans-serif; }

        .header-section { width: 100%; background: #fff; border-bottom: 1px solid #f0ebe4; }
        .header-inner { max-width: 1280px; margin: 0 auto; padding: 36px 32px 32px; }

        .content-inner { max-width: 1280px; margin: 0 auto; padding: 40px 32px; }
        .featured-section { max-width: 1280px; margin: 0 auto; padding: 40px 32px 24px; }
        .grid-section { max-width: 1280px; margin: 0 auto; padding: 8px 32px 64px; }

        .header-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px; }

        .count-pill { display: flex; align-items: center; gap: 12px; background: #fff5f0; border: 1.5px solid #fde0d0; border-radius: 16px; padding: 14px 20px; flex-shrink: 0; }

        /* Featured image container */
        .featured-img-wrap { position: relative; width: 100%; max-width: 480px; overflow: hidden; flex-shrink: 0; }
        .featured-content { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 36px 40px; gap: 16px; min-width: 260px; }

        /* Article grid */
        .articles-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }

        /* Article card img wrap */
        .article-img-wrap { position: relative; width: 100%; overflow: hidden; flex-shrink: 0; }

        /* ── RESPONSIVE ── */

        /* Tablet: ≤ 768px */
        @media (max-width: 768px) {
          .header-inner { padding: 24px 20px 20px; }
          .featured-section { padding: 24px 20px 16px; }
          .grid-section { padding: 8px 20px 48px; }
          .content-inner { padding: 24px 20px; }

          .featured-link { flex-direction: column; }
          .featured-img-wrap { max-width: 100%; width: 100%; }
          .featured-content { padding: 24px 20px; gap: 12px; }

          .skeleton-featured { flex-direction: column; }
          .skeleton-featured-img { width: 100%; height: 220px; }
          .skeleton-featured-body { padding: 24px 20px; }

          .articles-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }

          .count-pill { padding: 10px 16px; }
        }

        /* Mobile: ≤ 480px */
        @media (max-width: 480px) {
          .header-inner { padding: 20px 16px 16px; }
          .featured-section { padding: 20px 16px 12px; }
          .grid-section { padding: 8px 16px 40px; }
          .content-inner { padding: 20px 16px; }

          .header-row { flex-direction: column; align-items: flex-start; }
          .count-pill { width: 100%; justify-content: center; }

          .featured-img-wrap { min-height: unset; }
          .featured-content { padding: 20px 16px; gap: 10px; }

          .articles-grid { grid-template-columns: 1fr; gap: 14px; }

          .article-img-wrap { height: 180px; }

          .skeleton-featured-img { height: 180px; }
          .skeleton-featured-body { padding: 20px 16px; }

          .featured-arrow-cta { font-size: 0.78rem !important; }
        }

        /* Very small: ≤ 360px */
        @media (max-width: 360px) {
          .header-inner, .featured-section, .grid-section, .content-inner { padding-left: 12px; padding-right: 12px; }
          .featured-content { padding: 16px 12px; }
        }
      `}</style>

      <main className="page-wrapper">

        {/* ── Header ── */}
        <section className="header-section">
          <div className="header-inner">
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
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Link href="/" className="breadcrumb-a">Home</Link>
                <span style={{ color: "#ccc" }}>›</span>
              </span>
              <span style={{ color: "#555", fontWeight: 600 }}>Reviews</span>
            </nav>

            <div className="header-row">
              <div>
                {/* Badge */}
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

                <h1
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.8rem, 5vw, 3rem)",
                    fontWeight: 900,
                    color: "#111",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  Reviews
                </h1>
              </div>

              {/* Article count pill */}
              {!loading && !error && (
                <div className="count-pill">
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "2rem",
                      fontWeight: 900,
                      color: "#e85d26",
                      lineHeight: 1,
                    }}
                  >
                    {articles.length}
                  </span>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#111", margin: 0, lineHeight: 1.3 }}>
                      Total
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#bbb", margin: 0, lineHeight: 1.3 }}>
                      Articles
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Loading ── */}
        {loading && (
          <div className="content-inner">
            <div className="skeleton-featured">
              <div className="skeleton-featured-img" style={{ minHeight: "280px" }} />
              <div className="skeleton-featured-body">
                <div className="skeleton-featured-line" style={{ height: "16px", width: "40%" }} />
                <div className="skeleton-featured-line" style={{ height: "28px", width: "80%" }} />
                <div className="skeleton-featured-line" style={{ height: "14px", width: "100%", background: "#f5f0ea" }} />
                <div className="skeleton-featured-line" style={{ height: "14px", width: "70%", background: "#f5f0ea" }} />
              </div>
            </div>
            <div className="articles-grid">
              {Array.from({ length: 3 }).map((_, i) => <ArticleSkeleton key={i} />)}
            </div>
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 20px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.1rem", fontStyle: "italic", fontWeight: 300, color: "#aaa", marginBottom: "20px" }}>
              {error}
            </p>
            <Link href="/" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "#e85d26", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              ← Back to Home
            </Link>
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && !error && articles.length === 0 && (
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 20px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.1rem", fontStyle: "italic", fontWeight: 300, color: "#aaa", marginBottom: "20px" }}>
              No review articles found yet.
            </p>
            <Link href="/" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "#e85d26", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              ← Back to Home
            </Link>
          </div>
        )}

        {/* ── Content ── */}
        {!loading && !error && articles.length > 0 && (
          <>
            {/* ── Featured ── */}
            <section className="featured-section">
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#bbb", marginBottom: "16px" }}>
                Featured
              </p>

              <Link href={`/review/${featured.slug}`} className="featured-link">
                {/* Image */}
                <div className="featured-img-wrap">
                  <img
                    src={featured.image_url}
                    alt={featured.title}
                    className="featured-img"
                    style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.5s ease" }}
                  />
                </div>

                {/* Content */}
                <div className="featured-content">
                  <h2
                    className="featured-title"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
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

                  {featured.subtitle && (
                    <p
                      style={{
                        fontFamily: "'Source Serif 4', Georgia, serif",
                        fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
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
                    <span>{formatDate(featured.published_at)}</span>
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

                  <div
                    className="featured-arrow featured-arrow-cta"
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

            {/* ── Grid ── */}
            {rest.length > 0 && (
              <section className="grid-section">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#bbb", marginBottom: "20px" }}>
                  All Articles
                </p>

                <div className="articles-grid">
                  {rest.map((article) => (
                    <Link key={article.id} href={`/review/${article.slug}`} className="article-card-link">
                      {/* Image */}
                      <div className="article-img-wrap">
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="article-card-img"
                          style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.5s ease" }}
                        />
                      </div>

                      {/* Body */}
                      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "16px 18px", gap: "8px" }}>
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

                        {/* Footer */}
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
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#bbb", fontWeight: 500 }}>
                            {formatDate(article.published_at)}
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
          </>
        )}
      </main>
    </>
  );
}