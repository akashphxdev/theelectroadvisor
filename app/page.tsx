"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Article {
  id: number;
  title: string;
  slug: string;
  subtitle?: string;
  image_url: string;
  read_time: string;
  views: number;
  published_at?: string;
  category_name: string;
  category_slug: string;
}

interface CategorySection {
  category_id: number;
  category_name: string;
  category_slug: string;
  category_image: string;
  articles: Article[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string;
}

interface HomepageData {
  featured: Article[];
  trending: Article[];
  latest: Article[];
  byCategory: CategorySection[];
  categories: Category[];
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

function img(url: string) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${url}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const ACCENT_COLORS = [
  "#f97316", "#3b82f6", "#8b5cf6", "#10b981",
  "#ef4444", "#f59e0b", "#6366f1", "#ec4899",
];
function accentColor(idx: number) { return ACCENT_COLORS[idx % ACCENT_COLORS.length]; }

const SLIDE_INTERVAL = 4500;

// ── Skeleton ───────────────────────────────────────────────────────────────────
function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-orange-50 animate-pulse rounded-md ${className}`} />;
}

// ── ComparisonCard ─────────────────────────────────────────────────────────────
function ComparisonCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/comparison/${article.slug}`}
      className="flex flex-col rounded-2xl overflow-hidden bg-white border border-orange-100 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group flex-1 min-w-0"
    >
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={img(article.image_url)}
          alt={article.title}
          className="w-full h-full object-fill block group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute top-3 left-3 bg-orange-500 text-white font-black text-[0.58rem] tracking-widest uppercase px-3 py-1 rounded-full shadow-lg font-sans">
           VS
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2.5 flex-1">
        <h3 className="font-serif text-[1.05rem] font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-orange-500 transition-colors">
          {article.title}
        </h3>
        {article.subtitle && (
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-sans">{article.subtitle}</p>
        )}
        <div className="mt-auto pt-3 border-t border-orange-100 flex items-center justify-between text-[0.72rem] font-sans">
          <span className="text-gray-300 font-medium">
            {article.published_at ? formatDate(article.published_at) : ""}
          </span>
          <span className="text-orange-500 font-bold">{article.read_time} read →</span>
        </div>
      </div>
    </Link>
  );
}

// ── ReviewCard ─────────────────────────────────────────────────────────────────
function ReviewCard({ article, idx }: { article: Article; idx: number }) {
  return (
    <Link
      href={`/review/${article.slug}`}
      className="flex gap-4 items-center bg-white rounded-2xl border border-orange-100 p-3.5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
    >
      <div className="relative w-[90px] h-[90px] rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={img(article.image_url)}
          alt={article.title}
          className="w-full h-full object-fill block group-hover:scale-105 transition-transform duration-300"
        />
        <div
          className="absolute bottom-1 right-1 text-white text-[0.5rem] font-black px-1.5 py-0.5 rounded-md font-sans"
          style={{ background: accentColor(idx + 2) }}
        >
          ★ REV
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-orange-500 transition-colors mb-2">
          {article.title}
        </h3>
        <div className="flex items-center gap-2 text-[0.68rem] text-gray-300 font-sans">
          <span>{article.read_time} read</span>
          <span>·</span>
          <span>{article.views.toLocaleString()} views</span>
        </div>
      </div>
    </Link>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [data, setData]               = useState<HomepageData | null>(null);
  const [comparisons, setComparisons] = useState<Article[]>([]);
  const [reviews, setReviews]         = useState<Article[]>([]);
  const [loading, setLoading]         = useState(true);
  const [heroIdx, setHeroIdx]         = useState(0);
  const [fading, setFading]           = useState(false);
  const timerRef                      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX                   = useRef<number | null>(null);

  // ── Fetch ──
  useEffect(() => {
    fetch("/api/web/homepage").then(r => r.json()).then(j => { if (j.success) setData(j.data); }).catch(() => {}).finally(() => setLoading(false));
    fetch("/api/web/comparison").then(r => r.json()).then(j => { if (j.success) setComparisons(j.data); }).catch(() => {});
    fetch("/api/web/review").then(r => r.json()).then(j => { if (j.success) setReviews(j.data); }).catch(() => {});
  }, []);

  const total = data?.featured?.length ?? 0;

  const goTo = useCallback((idx: number) => {
    if (!data || fading || idx === heroIdx) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setFading(true);
    setTimeout(() => { setHeroIdx((idx + total) % total); setFading(false); }, 320);
  }, [data, fading, heroIdx, total]);

  const next = useCallback(() => goTo((heroIdx + 1) % total), [goTo, heroIdx, total]);
  const prev = useCallback(() => goTo((heroIdx - 1 + total) % total), [goTo, heroIdx, total]);

  // Auto-slide
  useEffect(() => {
    if (!total) return;
    timerRef.current = setTimeout(next, SLIDE_INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [heroIdx, next, total]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const slide = data?.featured?.[heroIdx];

  return (
    <main className="w-full min-h-screen bg-white">
      <style>{`
        @keyframes progressBar { from { width: 0% } to { width: 100% } }
        .progress-bar { animation: progressBar ${SLIDE_INTERVAL}ms linear forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ══════════════════════════════════════
          MOBILE HERO CAROUSEL  (hidden lg+)
      ══════════════════════════════════════ */}
      <section
        className="lg:hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Image area */}
        <div
          className="relative w-full overflow-hidden bg-orange-50"
          style={{ height: "min(58vw, 300px)", minHeight: "210px" }}
        >
          {/* Slides */}
          {(data?.featured ?? []).map((a, i) => (
            <img
              key={a.id}
              src={img(a.image_url)}
              alt={a.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: i === heroIdx ? 1 : 0, zIndex: i === heroIdx ? 1 : 0 }}
            />
          ))}
          {loading && <div className="absolute inset-0 bg-orange-50 animate-pulse" />}

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent z-10" />

          {/* Category badge */}
          {slide && (
            <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 bg-black/35 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse inline-block" />
              <span className="font-bold text-[0.55rem] tracking-widest uppercase text-white/90 font-sans">
                {slide.category_name}
              </span>
            </div>
          )}

          {/* Prev / Next */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white active:scale-90 transition-transform cursor-pointer"
              >
                <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white active:scale-90 transition-transform cursor-pointer"
              >
                <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dot indicators */}
          {total > 1 && (
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
              {(data?.featured ?? []).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="h-1.5 rounded-full border-none cursor-pointer transition-all duration-300 p-0"
                  style={{ width: i === heroIdx ? "18px" : "6px", background: i === heroIdx ? "#f97316" : "rgba(255,255,255,0.5)" }}
                />
              ))}
            </div>
          )}

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
            <div key={heroIdx} className="progress-bar h-full bg-orange-400" style={{ width: "0%" }} />
          </div>
        </div>

        {/* Content */}
        <div className={`bg-white px-4 pt-4 pb-5 flex flex-col gap-3 transition-opacity duration-300 ${fading ? "opacity-50" : "opacity-100"}`}>
          {loading ? (
            <>
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-4/5 h-4" />
              <Skeleton className="w-3/5 h-3" />
            </>
          ) : slide ? (
            <>
              {/* Title */}
              <h1 className="font-serif text-[1.12rem] font-black text-gray-900 leading-snug tracking-tight">
                {slide.title.includes(":") ? (
                  <>
                    {slide.title.split(":")[0]}
                    <span className="text-orange-500">:</span>
                    {slide.title.split(":").slice(1).join(":")}
                  </>
                ) : slide.title}
              </h1>

              {/* Subtitle */}
              {slide.subtitle && (
                <p className="font-sans text-[0.8rem] text-gray-500 leading-relaxed line-clamp-2">
                  {slide.subtitle}
                </p>
              )}

              {/* Meta + CTA */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[0.67rem] text-gray-400 font-sans font-medium flex-wrap">
                  {slide.published_at && <span>{formatDate(slide.published_at)}</span>}
                  <span className="opacity-40">·</span>
                  <span>{slide.read_time} read</span>
                  <span className="opacity-40">·</span>
                  <span>{slide.views.toLocaleString()} views</span>
                </div>
                <Link
                  href={`/${slide.category_slug}/${slide.slug}`}
                  className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-[0.75rem] px-3.5 py-2 rounded-xl transition-all duration-200 font-sans flex-shrink-0 whitespace-nowrap"
                >
                  Read Article
                  <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </>
          ) : null}
        </div>
        <div className="h-px bg-orange-100 mx-4" />
      </section>

      {/* ══════════════════════════════════════
          DESKTOP HERO  (hidden below lg)
      ══════════════════════════════════════ */}
      <section className="hidden lg:flex items-center min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-orange-100/40 to-white">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 border border-orange-100 text-gray-500 shadow-md hover:shadow-lg hover:border-orange-300 transition-all duration-200 cursor-pointer"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 border border-orange-100 text-gray-500 shadow-md hover:shadow-lg hover:border-orange-300 transition-all duration-200 cursor-pointer"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        <div className="max-w-[1280px] mx-auto px-16 py-20 w-full">
          {loading || !slide ? (
            <div className="grid grid-cols-2 gap-16 items-center">
              <div className="flex flex-col gap-5">
                <Skeleton className="w-40 h-8 rounded-full" />
                <Skeleton className="w-full h-16" />
                <Skeleton className="w-11/12 h-16" />
                <Skeleton className="w-2/3 h-5" />
                <Skeleton className="w-36 h-12 rounded-xl" />
              </div>
              <Skeleton className="w-full h-[480px] rounded-3xl" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-16 items-center">
              {/* Left */}
              <div className={`flex flex-col gap-6 transition-all duration-300 ${fading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white border border-orange-200 rounded-full px-4 py-1.5 w-fit shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse inline-block" />
                  <span className="font-bold text-[0.65rem] tracking-widest uppercase text-gray-500 font-sans">
                    {slide.category_name}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-serif text-4xl xl:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                  {slide.title.includes(":") ? (
                    <>
                      {slide.title.split(":")[0]}
                      <span className="text-orange-500">:</span>
                      {slide.title.split(":").slice(1).join(":")}
                    </>
                  ) : slide.title}
                </h1>

                {/* Subtitle */}
                {slide.subtitle && (
                  <p className="font-serif text-base font-light italic text-gray-500 leading-relaxed max-w-xl">
                    {slide.subtitle.length > 160 ? slide.subtitle.slice(0, 160) + "…" : slide.subtitle}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center gap-3 flex-wrap text-xs text-gray-400 font-medium font-sans">
                  {slide.published_at && <span>{formatDate(slide.published_at)}</span>}
                  <span className="opacity-40">|</span>
                  <span>{slide.read_time} read</span>
                  <span className="opacity-40">|</span>
                  <span>{slide.views.toLocaleString()} views</span>
                </div>

                {/* CTA */}
                <Link
                  href={`/${slide.category_slug}/${slide.slug}`}
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-orange-500 text-white font-bold text-sm px-7 py-3.5 rounded-xl w-fit transition-all duration-200 font-sans tracking-wide"
                >
                  Read Full Article
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                {/* Dots */}
                {total > 1 && (
                  <div className="flex items-center gap-2">
                    {(data?.featured ?? []).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className="h-2 rounded-full border-none cursor-pointer transition-all duration-300 p-0"
                        style={{ width: i === heroIdx ? "28px" : "8px", background: i === heroIdx ? "#f97316" : "#e5e7eb" }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right image */}
              <div className={`relative transition-all duration-300 ${fading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={img(slide.image_url)}
                    alt={slide.title}
                    className="w-full h-[480px] object-fill block"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════
          CATEGORIES STRIP
      ══════════════════════════════════════ */}
      <section className="w-full bg-white px-4 sm:px-8 py-8 border-b border-orange-100">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
            <div>
              <p className="text-[0.65rem] font-bold tracking-widest uppercase text-orange-500 mb-1 font-sans">Explore</p>
              <h2 className="font-serif text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Browse by Category</h2>
            </div>
            <Link href="/categories" className="text-sm font-bold text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-1 font-sans">
              View all
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-36 h-28 rounded-2xl bg-orange-50 animate-pulse" />
                ))
              : data?.categories.map((cat) => (
                  <Link key={cat.id} href={`/${cat.slug}`} className="flex-shrink-0 group">
                    <div className="relative w-36 h-28 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-orange-400 group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 shadow-md">
                      <img src={img(cat.image_url)} alt={cat.name} className="w-full h-full object-fill block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-2.5">
                        <p className="font-bold text-xs text-white font-sans">{cat.name}</p>
                        <p className="text-[0.6rem] text-white/70 font-sans">Explore →</p>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TRENDING
      ══════════════════════════════════════ */}
      <section className="w-full bg-orange-50/50 px-4 sm:px-8 py-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2.5 mb-8">
            <svg width="20" height="20" fill="none" stroke="#e85d26" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Trending Right Now</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-white border border-orange-100">
                    <Skeleton className="w-full h-48 rounded-none" />
                    <div className="p-4 flex flex-col gap-2">
                      <Skeleton className="w-1/2 h-3" />
                      <Skeleton className="w-full h-4" />
                      <Skeleton className="w-3/4 h-4" />
                    </div>
                  </div>
                ))
              : (data?.trending ?? []).slice(0, 8).map((article) => (
                  <Link
                    key={article.id}
                    href={`/${article.category_slug}/${article.slug}`}
                    className="flex flex-col rounded-2xl overflow-hidden bg-white border border-orange-100 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="h-48 overflow-hidden flex-shrink-0">
                      <img src={img(article.image_url)} alt={article.title} className="w-full h-full object-fill block group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <span className="text-[0.6rem] font-bold tracking-widest uppercase text-orange-500 font-sans">{article.category_name}</span>
                      <h3 className="font-serif text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-orange-500 transition-colors">{article.title}</h3>
                      <div className="mt-auto pt-2.5 border-t border-orange-100 flex items-center gap-3 text-[0.7rem] text-gray-300 font-medium font-sans">
                        <span>🕒 {article.read_time}</span>
                        <span>👁 {article.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CATEGORY SECTIONS
      ══════════════════════════════════════ */}
      {!loading && data?.byCategory.map((catSection, idx) => {
        const featured = catSection.articles[0];
        const rest = catSection.articles.slice(1);
        const bg = idx % 2 === 0 ? "bg-white" : "bg-orange-50/40";
        return (
          <section key={catSection.category_id} className={`w-full ${bg} px-4 sm:px-8 py-12`}>
            <div className="max-w-[1280px] mx-auto">
              <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 rounded-full" style={{ background: accentColor(idx) }} />
                  <div>
                    <p className="text-[0.6rem] font-bold tracking-widest uppercase font-sans mb-0.5" style={{ color: accentColor(idx) }}>Category</p>
                    <h2 className="font-serif text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{catSection.category_name}</h2>
                  </div>
                </div>
                <Link href={`/${catSection.category_slug}`} className="text-sm font-bold text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-1 font-sans">
                  View all
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              {featured && (
                <div className={`grid gap-5 ${rest.length > 0 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
                  <Link
                    href={`/${catSection.category_slug}/${featured.slug}`}
                    className="relative rounded-2xl overflow-hidden block min-h-[300px] shadow-sm hover:shadow-xl transition-shadow duration-300 group"
                  >
                    <img src={img(featured.image_url)} alt={featured.title} className="absolute inset-0 w-full h-full object-fill group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-[0.6rem] font-bold tracking-widest uppercase text-white/60 mb-2 font-sans">
                        {featured.published_at ? formatDate(featured.published_at) : ""}
                      </p>
                      <h3 className="font-serif text-xl font-black text-white leading-snug mb-3 group-hover:text-orange-300 transition-colors">{featured.title}</h3>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white/80 font-sans">
                        Read More
                        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                  {rest.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {rest.map((article) => (
                        <Link
                          key={article.id}
                          href={`/${article.category_slug}/${article.slug}`}
                          className="flex items-center gap-3.5 bg-white rounded-2xl border border-orange-100 p-3 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 group"
                        >
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={img(article.image_url)} alt={article.title} className="w-full h-full object-fill block group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-orange-500 transition-colors mb-1.5">{article.title}</h3>
                            <div className="flex items-center gap-2 text-[0.68rem] text-gray-300 font-sans">
                              <span>{article.read_time} read</span>
                              <span>·</span>
                              <span>{article.views.toLocaleString()} views</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* ══════════════════════════════════════
          COMPARISON SECTION
      ══════════════════════════════════════ */}
      {comparisons.length > 0 && (
        <section className="w-full bg-orange-50/60 px-4 sm:px-8 py-12">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-1 h-9 rounded-full bg-gradient-to-b from-orange-500 to-orange-400" />
                <div>
                  <p className="text-[0.6rem] font-bold tracking-widest uppercase text-orange-500 mb-0.5 font-sans">Head-to-Head</p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight"> Comparisons</h2>
                </div>
              </div>
              <Link href="/comparison" className="text-sm font-bold text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-1 font-sans">
                View all
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {comparisons.map((article) => (
                <ComparisonCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          REVIEW SECTION
      ══════════════════════════════════════ */}
      {reviews.length > 0 && (
        <section className="w-full bg-white px-4 sm:px-8 py-12">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-1 h-9 rounded-full bg-amber-500" />
                <div>
                  <p className="text-[0.6rem] font-bold tracking-widest uppercase text-amber-500 mb-0.5 font-sans">In-Depth</p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">★ Reviews</h2>
                </div>
              </div>
              <Link href="/review" className="text-sm font-bold text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-1 font-sans">
                View all
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((article, i) => (
                <ReviewCard key={article.id} article={article} idx={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          LATEST ARTICLES
      ══════════════════════════════════════ */}
      <section className="w-full bg-orange-50/40 px-4 sm:px-8 py-12 pb-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Latest Articles</h2>
            <Link href="/categories" className="text-sm font-bold text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-1 font-sans">
              View all
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-white border border-orange-100">
                    <Skeleton className="w-full h-48 rounded-none" />
                    <div className="p-4 flex flex-col gap-2">
                      <Skeleton className="w-2/5 h-3" />
                      <Skeleton className="w-full h-4" />
                      <Skeleton className="w-3/5 h-3" />
                    </div>
                  </div>
                ))
              : data?.latest.map((article) => (
                  <Link
                    key={article.id}
                    href={`/${article.category_slug}/${article.slug}`}
                    className="flex flex-col rounded-2xl overflow-hidden bg-white border border-orange-100 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="h-48 overflow-hidden flex-shrink-0">
                      <img src={img(article.image_url)} alt={article.title} className="w-full h-full object-fill block group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <span className="text-[0.6rem] font-bold tracking-widest uppercase text-orange-500 font-sans">{article.category_name}</span>
                      <h3 className="font-serif text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-orange-500 transition-colors">{article.title}</h3>
                      <div className="mt-auto pt-2.5 border-t border-orange-100 flex items-center justify-between text-[0.7rem] font-sans">
                        <span className="text-gray-300 font-medium">{article.published_at ? formatDate(article.published_at) : ""}</span>
                        <span className="text-orange-500 font-bold">{article.read_time} read →</span>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </section>
    </main>
  );
}