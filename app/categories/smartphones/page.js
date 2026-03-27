// app/categories/smartphones/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const articles = [
  {
    title: "Top 10 Flagship Phones Worth It in 2026",
    href: "/reviews/flagship-phones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    date: "Mar 26, 2026",
    dateTs: 20260326,
    badge: "EDITOR'S PICK",
    description: "The ultimate roundup of the best flagship smartphones money can buy in 2026.",
    views: "2.4M",
    readTime: "8 min",
  },
  {
    title: "Samsung Galaxy S26 Ultra: AI Perfected",
    href: "/reviews/samsung-s26",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80",
    date: "Mar 24, 2026",
    dateTs: 20260324,
    badge: "REVIEW",
    description: "Samsung's most powerful phone yet — we put its AI camera and performance to the test.",
    views: "1.8M",
    readTime: "10 min",
  },
  {
    title: "Best Budget Phones Under $400 in 2026",
    href: "/reviews/budget-phones",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
    date: "Mar 22, 2026",
    dateTs: 20260322,
    badge: "BUYING GUIDE",
    description: "You don't need to spend a fortune — these phones punch way above their price tag.",
    views: "1.1M",
    readTime: "6 min",
  },
  {
    title: "iPhone 17 Pro vs Galaxy S26: Full Comparison",
    href: "/reviews/iphone-vs-galaxy",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80",
    date: "Mar 20, 2026",
    dateTs: 20260320,
    badge: "VERSUS",
    description: "Two titans go head-to-head — camera, battery, performance, and value compared.",
    views: "3.1M",
    readTime: "12 min",
  },
  {
    title: "Best Foldable Phones of 2026: Are They Worth It?",
    href: "/reviews/best-foldables-2026",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    date: "Mar 18, 2026",
    dateTs: 20260318,
    badge: "RANKED",
    description: "Foldables have matured — here's whether the Galaxy Z Fold 7 and Pixel 9 Fold are worth your cash.",
    views: "890K",
    readTime: "9 min",
  },
  {
    title: "Google Pixel 9 Pro Full Review",
    href: "/reviews/pixel-9-pro",
    image: "https://images.unsplash.com/photo-1544866092-1935c5ef2a8f?w=800&q=80",
    date: "Mar 15, 2026",
    dateTs: 20260315,
    badge: "REVIEW",
    description: "Google's cleanest Android experience yet — with AI features that actually make sense.",
    views: "760K",
    readTime: "8 min",
  },
  {
    title: "Mid-Range Phones That Beat Flagships in 2026",
    href: "/reviews/mid-range-phones",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80",
    date: "Mar 12, 2026",
    dateTs: 20260312,
    badge: "BUYING GUIDE",
    description: "These $400–$600 phones are so good they make flagships look overpriced.",
    views: "650K",
    readTime: "7 min",
  },
  {
    title: "OnePlus 13 vs Nothing Phone 3: Which to Buy?",
    href: "/reviews/oneplus-vs-nothing",
    image: "https://images.unsplash.com/photo-1551355738-1875b8d09f99?w=800&q=80",
    date: "Mar 10, 2026",
    dateTs: 20260310,
    badge: "VERSUS",
    description: "Two fan-favorite brands clash — design, software, and camera quality put to the test.",
    views: "540K",
    readTime: "10 min",
  },
];

const badgeColors = {
  "EDITOR'S PICK": { bg: "#fff7ed", text: "#ea580c" },
  "REVIEW":        { bg: "#eff6ff", text: "#2563eb" },
  "BUYING GUIDE":  { bg: "#f0fdf4", text: "#16a34a" },
  "VERSUS":        { bg: "#fdf4ff", text: "#9333ea" },
  "RANKED":        { bg: "#fefce8", text: "#ca8a04" },
};

export default function SmartphonesPage() {
  const [sort, setSort] = useState("newest");

  const sorted = [...articles].sort((a, b) =>
    sort === "newest" ? b.dateTs - a.dateTs : a.dateTs - b.dateTs
  );

  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <main className="w-full min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-orange-500 transition-colors font-medium text-gray-500">Home</Link>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/categories" className="hover:text-orange-500 transition-colors font-medium text-gray-500">Categories</Link>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-400">Smartphones</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-blue-500 uppercase">Category</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Smart<span className="text-blue-500">phones</span>
              </h1>
              <p className="text-base text-gray-500 mt-3 max-w-lg leading-relaxed">
                Flagship killers, foldables & budget picks — every phone worth your money.
              </p>
            </div>

            {/* Article count + Sort */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-3">
                <span className="text-3xl font-extrabold text-blue-500">{articles.length}</span>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">Total</p>
                  <p className="text-xs text-gray-400 leading-tight">Articles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sort Bar */}
          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sort by:</span>
            <div className="flex items-center gap-2">
              {[
                { value: "newest", label: "Newest First" },
                { value: "oldest", label: "Oldest First" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    sort === opt.value
                      ? "bg-blue-500 text-white shadow-sm"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Card ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Featured</p>
        <Link
          href={featured.href}
          className="group relative flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
        >
          <div className="relative w-full lg:w-1/2 h-64 lg:h-80 overflow-hidden flex-shrink-0">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: badgeColors[featured.badge]?.bg,
                  color: badgeColors[featured.badge]?.text,
                }}
              >
                {featured.badge}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center p-7 lg:p-10 gap-4">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 leading-snug group-hover:text-blue-500 transition-colors">
              {featured.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">{featured.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.readTime} read</span>
              <span>·</span>
              <span>{featured.views} views</span>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 group-hover:gap-3 transition-all">
              Read Article
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </Link>
      </section>

      {/* ── Articles Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">All Articles</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article) => (
            <Link
              key={article.title}
              href={article.href}
              className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: badgeColors[article.badge]?.bg,
                      color: badgeColors[article.badge]?.text,
                    }}
                  >
                    {article.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-4 gap-2">
                <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-blue-500 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{article.description}</p>
                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>{article.date}</span>
                  <span className="flex items-center gap-1 text-blue-500 font-semibold">
                    {article.readTime} read
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}