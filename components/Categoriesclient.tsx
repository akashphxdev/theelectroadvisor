"use client";

// app/(website)/categories/CategoriesClient.tsx

import Link from "next/link";
import { useState } from "react";
import type { Category } from "../app/(webiste)/categories/page";

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
    <main
      className="w-full min-h-screen"
      style={{ backgroundColor: "#faf7f4", fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300&family=DM+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* ── Header ── */}
      <section className="w-full bg-white border-b border-[#f0ebe4]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-9 pb-6 sm:pb-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-5 sm:mb-6 text-[0.78rem] font-medium text-[#aaa]">
            <Link
              href="/"
              className="text-[#999] no-underline transition-colors duration-200 hover:text-[#e85d26]"
            >
              Home
            </Link>
            <span className="text-[#ccc]">›</span>
            <span className="text-[#555] font-semibold">Categories</span>
          </nav>

          {/* Title + Search */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">
            {/* Title block */}
            <div>
              <p
                className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#e85d26] mb-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Browse
              </p>
              <h1
                className="font-black text-[#111] leading-[1.15] tracking-[-0.02em] mb-3"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.6rem, 5vw, 3rem)",
                }}
              >
                All Categories
              </h1>
              <p
                className="text-[0.95rem] sm:text-[1.05rem] font-light italic text-[#777] leading-relaxed m-0 border-l-[3px] border-[#e85d26] pl-3.5 max-w-[440px]"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
              >
                Explore every category — in-depth reviews, guides &amp; comparisons.
              </p>
            </div>

            {/* Search — full width on mobile */}
            <div className="relative w-full sm:w-60 flex-shrink-0">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-[#aaa] pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-[38px] pr-4 py-[11px] text-[0.82rem] font-medium text-[#333] bg-[#fdf8f4] border-[1.5px] border-[#ede5db] rounded-full outline-none transition-[border-color,box-shadow] duration-200 box-border focus:border-[#e85d26] focus:shadow-[0_0_0_3px_rgba(232,93,38,0.12)]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pb-20">

        {/* Count + clear */}
        <div className="flex items-center justify-between mb-5 sm:mb-7">
          <p
            className="text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[#bbb]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {filtered.length} {filtered.length === 1 ? "Category" : "Categories"}
          </p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-[0.78rem] font-bold text-[#e85d26] bg-transparent border-none cursor-pointer underline underline-offset-[3px]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Clear search
            </button>
          )}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 sm:py-24 text-center">
            <div className="w-[60px] h-[60px] rounded-2xl bg-[#f0ebe4] flex items-center justify-center mb-4">
              <svg
                className="w-7 h-7 text-[#ccc]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </div>
            <p
              className="text-[1.1rem] sm:text-[1.15rem] font-bold text-[#555] mb-1.5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              No results found
            </p>
            <p
              className="text-[0.88rem] sm:text-[0.92rem] italic text-[#aaa] font-light"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              No categories match &ldquo;{search}&rdquo;
            </p>
          </div>
        )}

        {/* Cards grid — 2 cols mobile → 3 tablet → 4 md → 5 desktop */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {filtered.map((cat, i) => {
              const theme = getTheme(i);
              const isHovered = hovered === cat.id;

              return (
                <Link
                  key={cat.id}
                  href={`/${cat.slug}`}
                  onMouseEnter={() => setHovered(cat.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="flex flex-col items-center rounded-[18px] sm:rounded-[20px] p-4 sm:p-5 no-underline cursor-pointer transition-all duration-[250ms] ease-in-out"
                  style={{
                    backgroundColor: isHovered ? theme.iconBg : "#ffffff",
                    border: `1.5px solid ${isHovered ? theme.border : "#f0ebe4"}`,
                    boxShadow: isHovered
                      ? `0 8px 32px ${theme.accent}22, 0 2px 8px ${theme.accent}11`
                      : "0 1px 4px rgba(0,0,0,0.04)",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2.5 sm:mb-3 transition-all duration-[250ms] ease-in-out relative"
                    style={{
                      backgroundColor: isHovered ? "#fff" : theme.bg,
                      boxShadow: isHovered ? `0 4px 16px ${theme.accent}33` : "none",
                    }}
                  >
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-7 h-7 sm:w-10 sm:h-10 object-contain transition-transform duration-[250ms] ease-in-out"
                      style={{ transform: isHovered ? "scale(1.15)" : "scale(1)" }}
                    />
                    {cat.is_active === 0 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gray-400 border-2 border-white" />
                    )}
                  </div>

                  {/* Category name */}
                  <p
                    className="text-[0.78rem] sm:text-[0.82rem] font-bold text-center leading-[1.3] m-0 transition-colors duration-200 tracking-[0.01em]"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: isHovered ? theme.text : "#111",
                    }}
                  >
                    {cat.name}
                  </p>

                  {/* Arrow on hover */}
                  <div
                    className="mt-2 overflow-hidden transition-all duration-[250ms] ease-in-out"
                    style={{
                      maxHeight: isHovered ? "20px" : "0px",
                      opacity: isHovered ? 1 : 0,
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke={theme.accent}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
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