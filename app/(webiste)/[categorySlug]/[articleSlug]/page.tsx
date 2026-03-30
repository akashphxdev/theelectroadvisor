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
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:wght@400;500;600&display=swap');

        .article-content {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 1.125rem;
          line-height: 1.85;
          color: #1a1a1a;
        }
        .article-content p {
          margin-bottom: 1.6em;
          font-weight: 300;
          letter-spacing: 0.01em;
        }
        .article-content h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #111;
          margin: 2.4em 0 0.8em;
          line-height: 1.25;
          position: relative;
          padding-left: 1.25rem;
        }
        .article-content h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.15em;
          bottom: 0.15em;
          width: 3px;
          background: #e85d26;
          border-radius: 2px;
        }
        .article-content h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 2em 0 0.6em;
          line-height: 1.3;
        }
        .article-content blockquote {
          border-left: none;
          margin: 2.5em 0;
          padding: 1.5rem 2rem;
          background: #fdf6f2;
          border-radius: 12px;
          position: relative;
        }
        .article-content blockquote::before {
          content: '"';
          font-family: 'Playfair Display', serif;
          font-size: 5rem;
          color: #e85d26;
          opacity: 0.25;
          position: absolute;
          top: -0.5rem;
          left: 1rem;
          line-height: 1;
        }
        .article-content blockquote p {
          font-style: italic;
          font-size: 1.2rem;
          color: #444;
          margin-bottom: 0;
          position: relative;
          z-index: 1;
        }
        .article-content ul {
          list-style: none;
          padding: 0;
          margin: 1.5em 0;
        }
        .article-content ul li {
          padding-left: 1.5rem;
          position: relative;
          margin-bottom: 0.6em;
          color: #333;
        }
        .article-content ul li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #e85d26;
          font-size: 0.85em;
          top: 0.1em;
        }
        .article-content ol {
          counter-reset: item;
          list-style: none;
          padding: 0;
        }
        .article-content ol li {
          counter-increment: item;
          padding-left: 2.5rem;
          position: relative;
          margin-bottom: 0.8em;
        }
        .article-content ol li::before {
          content: counter(item, decimal-leading-zero);
          position: absolute;
          left: 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: #e85d26;
          top: 0.25em;
          letter-spacing: 0.05em;
        }
        .article-content a {
          color: #e85d26;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
          transition: opacity 0.2s;
        }
        .article-content a:hover {
          opacity: 0.75;
        }
        .article-content strong {
          font-weight: 600;
          color: #111;
        }
        .article-content em {
          font-style: italic;
        }
        .article-content img {
          width: 75%;
          max-width: 560px;
          border-radius: 14px;
          margin: 1.75em auto;
          display: block;
        }
        .article-content code {
          font-size: 0.88em;
          background: #f4f0ec;
          padding: 0.15em 0.45em;
          border-radius: 4px;
          font-family: 'SF Mono', 'Fira Code', monospace;
          color: #c0392b;
        }
        .article-content pre {
          background: #1a1a1a;
          color: #f0ebe4;
          padding: 1.5rem;
          border-radius: 12px;
          overflow-x: auto;
          margin: 2em 0;
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .article-content pre code {
          background: none;
          color: inherit;
          padding: 0;
        }
        .article-content hr {
          border: none;
          border-top: 1px solid #e8e0d8;
          margin: 3em 0;
        }

        /* First paragraph drop cap */
        .article-content > p:first-of-type::first-letter {
          float: left;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 4.5rem;
          font-weight: 900;
          line-height: 0.75;
          margin: 0.05em 0.1em 0 0;
          color: #e85d26;
        }

        .breadcrumb-link:hover {
          color: #e85d26;
        }
        .back-btn:hover .back-arrow {
          transform: translateX(-4px);
        }
      `}</style>

      <main
        className="w-full min-h-screen"
        style={{ background: "#faf7f4", fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── Hero ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "480px",
            overflow: "hidden",
          }}
        >
          {/* Full cover image */}
          <img
            src={article.image_url}
            alt={article.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />

          {/* Strong bottom gradient so text is readable */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.82) 100%)",
            }}
          />

          {/* Top-left breadcrumb nav on hero */}
          <div
            style={{
              position: "absolute",
              top: "24px",
              left: "0",
              right: "0",
              padding: "0 32px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.75)",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              flexWrap: "wrap",
            }}
          >
            {[
              { href: "/", label: "Home" },
              { href: "/categories", label: "Categories" },
              { href: `/categories/${article.category_slug}`, label: article.category_name },
            ].map((crumb, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Link
                  href={crumb.href}
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {crumb.label}
                </Link>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
              </span>
            ))}
            <span
              style={{
                color: "rgba(255,255,255,0.45)",
                maxWidth: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {article.title}
            </span>
          </div>

          {/* Bottom overlay: category + title + subtitle */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "0 32px 36px",
              maxWidth: "1152px",
              margin: "0 auto",
            }}
          >
            {/* Category badge */}
            <Link
              href={`/categories/${article.category_slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#e85d26",
                color: "#fff",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                padding: "5px 14px",
                borderRadius: "100px",
                textDecoration: "none",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.8)",
                  display: "inline-block",
                }}
              />
              {article.category_name}
            </Link>

            {/* Title on hero */}
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                margin: "0 0 10px",
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                maxWidth: "820px",
              }}
            >
              {article.title}
            </h1>

            {/* Meta row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexWrap: "wrap",
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.78rem",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}
            >
              <span>{formatDate(article.created_at)}</span>
              {article.read_time && (
                <>
                  <span style={{ opacity: 0.4 }}>|</span>
                  <span>{article.read_time} read</span>
                </>
              )}
              {article.views > 0 && (
                <>
                  <span style={{ opacity: 0.4 }}>|</span>
                  <span>{article.views.toLocaleString()} views</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Article Card ── */}
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative"
          style={{ marginTop: "0px", paddingBottom: "80px" }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              boxShadow:
                "0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.10)",
              overflow: "hidden",
            }}
          >
            {/* Header section with warm tint */}
            <div
              style={{
                background: "linear-gradient(135deg, #fff 0%, #fdf8f4 100%)",
                padding: "36px 48px 28px",
                borderBottom: "1px solid #f0ebe4",
              }}
            >
              {/* Subtitle only */}
              {article.subtitle && (
                <p
                  style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: "1.2rem",
                    fontWeight: 300,
                    color: "#666",
                    lineHeight: 1.6,
                    margin: "0",
                    fontStyle: "italic",
                    borderLeft: "3px solid #e85d26",
                    paddingLeft: "16px",
                  }}
                >
                  {article.subtitle}
                </p>
              )}

              {/* Meta row — only show if no subtitle to avoid blank header */}
              {!article.subtitle && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    flexWrap: "wrap",
                    fontSize: "0.8rem",
                    color: "#888",
                    fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <span>{formatDate(article.created_at)}</span>
                  {article.read_time && (
                    <>
                      <span style={{ color: "#ddd", margin: "0 4px" }}>|</span>
                      <span>{article.read_time} read</span>
                    </>
                  )}
                  {article.views > 0 && (
                    <>
                      <span style={{ color: "#ddd", margin: "0 4px" }}>|</span>
                      <span>{article.views.toLocaleString()} views</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* ── Content Body ── */}
            <div style={{ padding: "44px 48px 52px" }}>
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* ── Divider ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  margin: "52px 0 36px",
                }}
              >
                <div style={{ flex: 1, height: "1px", background: "#ede7df" }} />
                <span
                  style={{
                    fontSize: "1.2rem",
                    color: "#e85d26",
                    opacity: 0.4,
                    letterSpacing: "0.2em",
                  }}
                >
                  ✦
                </span>
                <div style={{ flex: 1, height: "1px", background: "#ede7df" }} />
              </div>

              {/* ── Back Button ── */}
              <Link
                href={`/categories/${article.category_slug}`}
                className="back-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                  background: "#fdf6f2",
                  border: "1.5px solid #f0e5dc",
                  borderRadius: "100px",
                  padding: "12px 22px",
                  transition: "all 0.2s",
                }}
              >
                <svg
                  className="back-arrow"
                  style={{ transition: "transform 0.2s" }}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e85d26"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                <span
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#e85d26",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Back to {article.category_name}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}