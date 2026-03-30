"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

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

interface Props {
  articles: Article[];
  baseUrl: string;
}

function img(url: string, baseUrl: string) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${baseUrl}${url}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const INTERVAL = 4000; // 4 seconds auto-slide

export default function MobileHeroCarousel({ articles, baseUrl }: Props) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const total = articles.length;

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === current) return;
      setIsAnimating(true);
      setCurrent((index + total) % total);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating, current, total]
  );

  const next = useCallback(() => goTo((current + 1) % total), [current, total, goTo]);
  const prev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo]);

  // Auto-slide
  useEffect(() => {
    timerRef.current = setTimeout(next, INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, next]);

  // Touch / swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  if (!total) return null;

  const article = articles[current];

  return (
    <div className="relative lg:hidden overflow-hidden bg-white">
      {/* ── IMAGE ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "min(58vw, 320px)", minHeight: "220px" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {articles.map((a, i) => (
          <img
            key={a.id}
            src={img(a.image_url, baseUrl)}
            alt={a.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent z-10" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse inline-block" />
          <span className="font-bold text-[0.55rem] tracking-widest uppercase text-white/90 font-sans">
            {article.category_name}
          </span>
        </div>

        {/* Prev / Next arrow buttons */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white active:scale-90 transition-transform"
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white active:scale-90 transition-transform"
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators + progress bar */}
        {total > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {articles.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width: i === current ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "9999px",
                  background: i === current ? "#f97316" : "rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </div>
        )}

        {/* Auto-slide progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
          <div
            key={current}
            className="h-full bg-orange-400 origin-left"
            style={{
              animation: `slideProgress ${INTERVAL}ms linear forwards`,
            }}
          />
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div
        className="bg-white px-4 pt-4 pb-5 flex flex-col gap-3 transition-opacity duration-300"
        style={{ opacity: isAnimating ? 0.6 : 1 }}
      >
        {/* Title */}
        <h1 className="font-serif text-[1.15rem] font-black text-gray-900 leading-snug tracking-tight">
          {article.title.includes(":") ? (
            <>
              {article.title.split(":")[0]}
              <span className="text-orange-500">:</span>
              {article.title.split(":").slice(1).join(":")}
            </>
          ) : article.title}
        </h1>

        {/* Subtitle */}
        {article.subtitle && (
          <p className="font-sans text-xs text-gray-500 leading-relaxed line-clamp-2">
            {article.subtitle}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 text-[0.65rem] text-gray-400 font-sans font-medium flex-wrap">
          {article.published_at && <span>{formatDate(article.published_at)}</span>}
          <span className="opacity-40">·</span>
          <span>{article.read_time} read</span>
          <span className="opacity-40">·</span>
          <span>{article.views.toLocaleString()} views</span>
        </div>

        {/* CTA */}
        <div className="pt-1">
          <Link
            href={`/${article.category_slug}/${article.slug}`}
            className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 font-sans"
          >
            Read Article
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="h-px bg-orange-100 mx-4" />

      {/* Progress bar keyframe */}
      <style>{`
        @keyframes slideProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}