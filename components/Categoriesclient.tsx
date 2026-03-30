"use client";

// app/(website)/categories/CategoriesClient.tsx

import Link from "next/link";
import { useState } from "react";
import type { Category } from "./page";

// Soft pastel palette — each card gets its own tinted bg + icon tint
const palette = [
  { bg: "#EFF6FF", iconBg: "#DBEAFE", border: "#BFDBFE", accent: "#2563EB", text: "#1D4ED8" },
  { bg: "#F5F3FF", iconBg: "#EDE9FE", border: "#C4B5FD", accent: "#7C3AED", text: "#6D28D9" },
  { bg: "#ECFDF5", iconBg: "#D1FAE5", border: "#6EE7B7", accent: "#059669", text: "#047857" },
  { bg: "#FFF7ED", iconBg: "#FED7AA", border: "#FDBA74", accent: "#EA580C", text: "#C2410C" },
  { bg: "#FFF1F2", iconBg: "#FFE4E6", border: "#FECDD3", accent: "#E11D48", text: "#BE123C" },
  { bg: "#F0FDFA", iconBg: "#CCFBF1", border: "#99F6E4", accent: "#0D9488", text: "#0F766E" },
  { bg: "#FDF4FF", iconBg: "#F3E8FF", border: "#E9D5FF", accent: "#9333EA", text: "#7E22CE" },
  { bg: "#FFFBEB", iconBg: "#FEF3C7", border: "#FDE68A", accent: "#D97706", text: "#B45309" },
  { bg: "#F0F9FF", iconBg: "#E0F2FE", border: "#BAE6FD", accent: "#0284C7", text: "#0369A1" },
  { bg: "#FFF0F6", iconBg: "#FCE7F3", border: "#FBCFE8", accent: "#DB2777", text: "#BE185D" },
];

function getTheme(index: number) {
  return palette[index % palette.length];
}

function SkeletonCard() {
  return (
    <div className="rounded-3xl bg-gray-100 animate-pulse overflow-hidden">
      <div className="p-6 flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-2xl bg-gray-200" />
        <div className="h-4 w-24 bg-gray-200 rounded-full" />
        <div className="h-3 w-16 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}

interface Props {
  initialCategories: Category[];
}

export default function CategoriesClient({ initialCategories }: Props) {
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = initialCategories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="w-full min-h-screen" style={{ backgroundColor: "#F8F9FC", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap');`}</style>

      {/* ── Header ── */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-5 font-medium tracking-wide">
            <Link href="/" className="hover:text-orange-500 transition-colors text-gray-400">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-500">Categories</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-orange-500 mb-2">Browse</p>
              <h1
                className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                All Categories
              </h1>
              <p className="text-sm text-gray-500 mt-2 max-w-md leading-relaxed">
                Explore every category — in-depth reviews, guides & comparisons.
              </p>
            </div>

            {/* Search + count */}
            <div className="flex flex-col sm:items-end gap-3">
              {/* Search */}
              <div className="relative w-full sm:w-60">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Section label */}
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            {filtered.length} {filtered.length === 1 ? "Category" : "Categories"}
          </h2>
          {search && (
            <button onClick={() => setSearch("")} className="text-xs text-orange-500 font-semibold hover:underline">
              Clear search
            </button>
          )}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
            <p className="text-gray-500 font-semibold">No results for &quot;{search}&quot;</p>
          </div>
        )}

        {/* Cards */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((cat, i) => {
              const theme = getTheme(i);
              const isHovered = hovered === cat.id;

              return (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  onMouseEnter={() => setHovered(cat.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="group flex flex-col items-center rounded-3xl p-5 cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? theme.iconBg : "#FFFFFF",
                    border: `1.5px solid ${isHovered ? theme.border : "#F1F5F9"}`,
                    boxShadow: isHovered
                      ? `0 8px 32px ${theme.accent}22, 0 2px 8px ${theme.accent}11`
                      : "0 1px 4px rgba(0,0,0,0.05)",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  {/* Icon container */}
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? "#FFFFFF" : theme.bg,
                      boxShadow: isHovered ? `0 4px 16px ${theme.accent}33` : "none",
                    }}
                  >
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-10 h-10 object-contain transition-transform duration-300"
                      style={{
                        transform: isHovered ? "scale(1.15)" : "scale(1)",
                      }}
                    />

                    {/* Inactive dot */}
                    {cat.is_active === 0 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gray-400 border-2 border-white" />
                    )}
                  </div>

                  {/* Name */}
                  <p
                    className="text-[13px] font-700 text-center leading-tight transition-colors duration-200"
                    style={{
                      fontWeight: 700,
                      color: isHovered ? theme.text : "#111827",
                    }}
                  >
                    {cat.name}
                  </p>

                  {/* Arrow on hover */}
                  <div
                    className="mt-2 transition-all duration-300 overflow-hidden"
                    style={{
                      maxHeight: isHovered ? "20px" : "0px",
                      opacity: isHovered ? 1 : 0,
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke={theme.accent} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}