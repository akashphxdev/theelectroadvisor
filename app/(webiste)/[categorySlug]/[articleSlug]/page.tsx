// "use client";

// // app/[categorySlug]/[articleSlug]/page.tsx

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";

// interface Article {
//   id: number;
//   title: string;
//   slug: string;
//   subtitle: string;
//   content: string;
//   image_url: string;
//   read_time: string;
//   featured: number;
//   views: number;
//   created_at: string;
//   published_at: string;
//   category_name: string;
//   category_slug: string;
// }

// function formatDate(dateStr: string) {
//   return new Date(dateStr).toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
// }

// // ── Skeleton ──────────────────────────────────────────────────────────────────
// function ArticleSkeleton() {
//   return (
//     <main className="w-full min-h-screen bg-[#faf7f4]">
//       <div className="w-full h-[480px] bg-[#ede7df] animate-pulse" />
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden px-8 md:px-12 pt-11 pb-14 mt-0">
//           <div className="h-6 w-4/5 bg-[#ede7df] rounded-lg mb-10 animate-pulse" />
//           {[95, 88, 72, 90, 65, 80, 55, 78].map((w, i) => (
//             <div
//               key={i}
//               className="h-4 bg-[#ede7df] rounded-md mb-4 animate-pulse"
//               style={{ width: `${w}%` }}
//             />
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

// // ── Error State ───────────────────────────────────────────────────────────────
// function ArticleError({ message }: { message: string }) {
//   return (
//     <main className="w-full min-h-screen bg-[#faf7f4] flex items-center justify-center">
//       <div className="text-center px-6 py-10">
//         <div className="text-5xl mb-4">📄</div>
//         <p className="text-lg text-gray-500 mb-3">{message}</p>
//         <Link
//           href="/categories"
//           className="text-[#e85d26] underline text-sm hover:opacity-75 transition-opacity"
//         >
//           ← Back to Categories
//         </Link>
//       </div>
//     </main>
//   );
// }

// // ── Main Page ─────────────────────────────────────────────────────────────────
// export default function ArticlePage() {
//   const params = useParams();
//   const articleSlug = params?.articleSlug as string;

//   const [article, setArticle] = useState<Article | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!articleSlug) return;

//     const fetchArticle = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await fetch(`/api/web/articles/${articleSlug}`);

//         if (!res.ok) {
//           setError(res.status === 404 ? "Article not found." : "Failed to load article.");
//           return;
//         }

//         const json = await res.json();

//         if (!json.success || !json.data) {
//           setError("Article not found.");
//           return;
//         }

//         setArticle(json.data); // ✅ matches API response shape
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError("Something went wrong. Please refresh.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticle();
//   }, [articleSlug]);

//   if (loading) return <ArticleSkeleton />;
//   if (error || !article) return <ArticleError message={error ?? "Article not found."} />;

//   return (
//     <>
//       {/* Google Fonts + article-content prose styles (can't be replaced by Tailwind) */}
//       <style>{`
        
//         .article-content {
         
//           font-size: 1.125rem;
//           line-height: 1.85;
//           color: #1a1a1a;
//         }
//         .article-content p { margin-bottom: 1.6em; font-weight: 300; letter-spacing: 0.01em; }
//         .article-content h2 {
//           font-family: 'Playfair Display', Georgia, serif;
//           font-size: 1.75rem; font-weight: 700; color: #111;
//           margin: 2.4em 0 0.8em; line-height: 1.25;
//           position: relative; padding-left: 1.25rem;
//         }
//         .article-content h2::before {
//           content: ''; position: absolute; left: 0; top: 0.15em; bottom: 0.15em;
//           width: 3px; background: #e85d26; border-radius: 2px;
//         }
//         .article-content h3 {
//           font-family: 'Playfair Display', Georgia, serif;
//           font-size: 1.35rem; font-weight: 700; color: #1a1a1a;
//           margin: 2em 0 0.6em; line-height: 1.3;
//         }
//         .article-content blockquote {
//           border-left: none; margin: 2.5em 0; padding: 1.5rem 2rem;
//           background: #fdf6f2; border-radius: 12px; position: relative;
//         }
//         .article-content blockquote::before {
//           content: '"'; font-family: 'Playfair Display', serif;
//           font-size: 5rem; color: #e85d26; opacity: 0.25;
//           position: absolute; top: -0.5rem; left: 1rem; line-height: 1;
//         }
//         .article-content blockquote p { font-style: italic; font-size: 1.2rem; color: #444; margin-bottom: 0; position: relative; z-index: 1; }
//         .article-content ul { list-style: none; padding: 0; margin: 1.5em 0; }
//         .article-content ul li { padding-left: 1.5rem; position: relative; margin-bottom: 0.6em; color: #333; }
//         .article-content ul li::before { content: '→'; position: absolute; left: 0; color: #e85d26; font-size: 0.85em; top: 0.1em; }
//         .article-content ol { counter-reset: item; list-style: none; padding: 0; }
//         .article-content ol li { counter-increment: item; padding-left: 2.5rem; position: relative; margin-bottom: 0.8em; }
//         .article-content ol li::before {
//           content: counter(item, decimal-leading-zero); position: absolute; left: 0;
//           font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 600;
//           color: #e85d26; top: 0.25em; letter-spacing: 0.05em;
//         }
//         .article-content a { color: #e85d26; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; transition: opacity 0.2s; }
//         .article-content a:hover { opacity: 0.75; }
//         .article-content strong { font-weight: 600; color: #111; }
//         .article-content em { font-style: italic; }
//         .article-content img { width: 75%; max-width: 560px; border-radius: 14px; margin: 1.75em auto; display: block; }
//         .article-content code { font-size: 0.88em; background: #f4f0ec; padding: 0.15em 0.45em; border-radius: 4px; font-family: 'SF Mono','Fira Code',monospace; color: #c0392b; }
//         .article-content pre { background: #1a1a1a; color: #f0ebe4; padding: 1.5rem; border-radius: 12px; overflow-x: auto; margin: 2em 0; font-size: 0.9rem; line-height: 1.6; }
//         .article-content pre code { background: none; color: inherit; padding: 0; }
//         .article-content hr { border: none; border-top: 1px solid #e8e0d8; margin: 3em 0; }
//         .article-content > p:first-of-type::first-letter {
//           float: left; font-family: 'Playfair Display', Georgia, serif;
//           font-size: 4.5rem; font-weight: 900; line-height: 0.75;
//           margin: 0.05em 0.1em 0 0; color: #e85d26;
//         }
//         .back-btn:hover .back-arrow { transform: translateX(-4px); }
//       `}</style>

//       <main className="w-full min-h-screen bg-[#faf7f4] font-sans">

//         {/* ── Hero ── */}
//         <div className="relative w-full h-[480px] overflow-hidden">

//           {/* Cover image */}
//           <img
//             src={article.image_url}
//             alt={article.title}
//             className="absolute inset-0 w-full h-full object-cover object-top"
//           />

//           {/* Gradient overlay */}
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/55 to-black/80" />

//           {/* Breadcrumb */}
//           <div className="absolute top-6 left-0 right-0 px-8 flex items-center flex-wrap gap-2 text-[0.78rem] text-white/75 font-medium">
//             {[
//               { href: "/", label: "Home" },
//               { href: "/categories", label: "Categories" },
//               { href: `/${article.category_slug}`, label: article.category_name },
//             ].map((crumb, i) => (
//               <span key={i} className="flex items-center gap-2">
//                 <Link href={crumb.href} className="text-white/75 hover:text-white transition-colors no-underline">
//                   {crumb.label}
//                 </Link>
//                 <span className="text-white/40">›</span>
//               </span>
//             ))}
//             <span className="text-white/45 max-w-[200px] truncate">{article.title}</span>
//           </div>

//           {/* Hero bottom */}
//           <div className="absolute bottom-0 left-0 right-0 px-8 pb-9 max-w-[1152px] mx-auto">

//             {/* Category badge */}
//             <Link
//               href={`/${article.category_slug}`}
//               className="inline-flex items-center gap-1.5 bg-[#e85d26] text-white text-[0.68rem] font-bold tracking-[0.13em] uppercase px-3.5 py-[5px] rounded-full no-underline mb-3.5 hover:opacity-90 transition-opacity"
//             >
//               <span className="w-[5px] h-[5px] rounded-full bg-white/80 inline-block" />
//               {article.category_name}
//             </Link>

//             {/* Title */}
//             <h1 className="font-['Playfair_Display'] text-[clamp(1.6rem,3.5vw,2.6rem)] font-black text-white leading-[1.2] tracking-[-0.02em] mb-2.5 max-w-[820px] [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]">
//               {article.title}
//             </h1>

//             {/* Meta */}
//             <div className="flex items-center flex-wrap gap-1.5 text-white/70 text-[0.78rem] font-medium">
//               <span>{formatDate(article.created_at)}</span>
//               {article.read_time && (
//                 <>
//                   <span className="opacity-40">|</span>
//                   <span>{article.read_time} read</span>
//                 </>
//               )}
//               {article.views > 0 && (
//                 <>
//                   <span className="opacity-40">|</span>
//                   <span>{article.views.toLocaleString()} views</span>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ── Article Card ── */}
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//           <div className="bg-white rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.04),0_20px_60px_rgba(0,0,0,0.10)] overflow-hidden">

//             {/* Card header */}
//             <div className="bg-gradient-to-br from-white to-[#fdf8f4] px-8 md:px-12 pt-9 pb-7 border-b border-[#f0ebe4]">
//               {article.subtitle ? (
//                 <p className="font-['Source_Serif_4'] text-xl font-light text-gray-500 leading-relaxed italic border-l-[3px] border-[#e85d26] pl-4 m-0">
//                   {article.subtitle}
//                 </p>
//               ) : (
//                 <div className="flex items-center flex-wrap gap-1.5 text-sm text-gray-400 font-medium">
//                   <span>{formatDate(article.created_at)}</span>
//                   {article.read_time && (
//                     <>
//                       <span className="text-gray-200 mx-1">|</span>
//                       <span>{article.read_time} read</span>
//                     </>
//                   )}
//                   {article.views > 0 && (
//                     <>
//                       <span className="text-gray-200 mx-1">|</span>
//                       <span>{article.views.toLocaleString()} views</span>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Content body */}
//             <div className="px-8 md:px-12 pt-11 pb-14">
//               <div
//                 className="article-content"
//                 dangerouslySetInnerHTML={{ __html: article.content }}
//               />

//               {/* Divider */}
//               <div className="flex items-center gap-4 my-14">
//                 <div className="flex-1 h-px bg-[#ede7df]" />
//                 <span className="text-xl text-[#e85d26] opacity-40 tracking-widest">✦</span>
//                 <div className="flex-1 h-px bg-[#ede7df]" />
//               </div>

//               {/* Back Button */}
//               <Link
//                 href={`/${article.category_slug}`}
//                 className="back-btn inline-flex items-center gap-2.5 no-underline bg-[#fdf6f2] border-[1.5px] border-[#f0e5dc] rounded-full px-5 py-3 transition-all hover:bg-[#fbeee6] hover:border-[#e85d26]/30"
//               >
//                 <svg
//                   className="back-arrow transition-transform"
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#e85d26"
//                   strokeWidth="2.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M19 12H5M12 5l-7 7 7 7" />
//                 </svg>
//                 <span className="text-[0.82rem] font-bold text-[#e85d26] tracking-[0.06em] uppercase">
//                   Back to {article.category_name}
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }



// app/[categorySlug]/[articleSlug]/page.tsx
// ✅ Server Component — ISR 60s

import { notFound } from "next/navigation";
import ArticleClient from "./ArticleClient";

export interface Article {
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

export const revalidate = 60; // ✅ ISR — 60 seconds

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/web/articles/${slug}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const json = await res.json();
    if (!json.success || !json.data) return null;

    return json.data;
  } catch {
    return null;
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ categorySlug: string; articleSlug: string }>;
}) {
  const { articleSlug } = await params;

  const article = await getArticle(articleSlug);

  if (!article) notFound();

  return <ArticleClient article={article} />;
}