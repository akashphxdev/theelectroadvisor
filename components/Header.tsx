"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  is_active: number;
}

export default function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch("/api/web/categories")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setCategories(json.data ?? []);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [searchOpen]);

  // Hover handlers with small delay to prevent flicker
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setCategoryOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setCategoryOpen(false);
    }, 120);
  };

  const activeCategories = categories.filter((c) => c.is_active === 1).slice(0, 6);

  return (
    <header
      className={`w-full bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md border-b border-[#f0ebe4]" : "border-b border-[#f0ebe4]"
      }`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-8 h-8 bg-[#e85d26] rounded-lg flex items-center justify-center shadow-sm group-hover:bg-orange-600 transition-colors">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span
              className="text-[#111] font-extrabold text-xl tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Electro<span className="text-[#e85d26]">Advisor</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">

            {/* Categories Dropdown — HOVER for dropdown, CLICK to navigate */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/categories"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  categoryOpen
                    ? "bg-orange-50 text-[#e85d26]"
                    : "text-[#555] hover:bg-[#fdf8f4] hover:text-[#e85d26]"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h8" />
                </svg>
                Categories
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${categoryOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Dropdown Panel */}
              <div
                className={`absolute top-full left-0 mt-2 w-72 bg-white border border-[#f0ebe4] rounded-2xl shadow-2xl py-3 z-50 transition-all duration-200 ${
                  categoryOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <p className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#aaa] px-4 pb-2">
                  Browse Categories
                </p>
                <div className="flex flex-col gap-0.5 px-2">
                  {activeCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-[#555] hover:bg-[#fdf8f4] hover:text-[#e85d26] transition-all duration-150"
                      onClick={() => setCategoryOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-2 mx-4 pt-3 border-t border-[#f0ebe4]">
                  <Link
                    href="/categories"
                    className="flex items-center justify-between text-xs font-bold text-[#e85d26] hover:text-orange-600 transition-colors"
                    onClick={() => setCategoryOpen(false)}
                  >
                    View all categories
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {[
              { label: "Reviews",    href: "/reviews"    },
              { label: "Comparison", href: "/comparison" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-[#555] hover:bg-[#fdf8f4] hover:text-[#e85d26] transition-all duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Search */}
            <div className="hidden md:flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2 bg-[#fdf8f4] border border-[#ede5db] rounded-xl px-3 py-1.5 w-56 transition-all duration-300">
                  <svg className="w-4 h-4 text-[#aaa] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search reviews..."
                    className="bg-transparent text-sm text-[#333] placeholder-[#aaa] outline-none w-full"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                  />
                  <button
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    className="text-[#aaa] hover:text-[#555]"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-[#fdf8f4] text-[#777] hover:text-[#e85d26] transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-[#fdf8f4] text-[#555] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#f0ebe4] px-4 py-3">

          {/* Mobile Search */}
          <div className="flex items-center gap-2 bg-[#fdf8f4] border border-[#ede5db] rounded-xl px-3 py-2 mb-3">
            <svg className="w-4 h-4 text-[#aaa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search reviews..."
              className="bg-transparent text-sm text-[#333] placeholder-[#aaa] outline-none w-full"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          {/* Mobile Categories Grid */}
          <div className="mb-3">
            <p className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#aaa] mb-2">
              Categories
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {activeCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${cat.slug}`}
                  className="flex items-center px-3 py-2 rounded-xl bg-[#fdf8f4] text-sm font-medium text-[#555] hover:bg-orange-50 hover:text-[#e85d26] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div className="border-t border-[#f0ebe4] pt-3 flex flex-col gap-0.5">
            {[
              { label: "Reviews",    href: "/reviews"    },
              { label: "Comparison", href: "/comparison" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="block py-2 px-2 text-sm font-semibold text-[#555] hover:text-[#e85d26] transition-colors rounded-lg hover:bg-[#fdf8f4]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}