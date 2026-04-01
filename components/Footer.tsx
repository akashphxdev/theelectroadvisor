"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

const companyLinks = [
  { label: "About Us", href: "/about" },
];

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/web/categories");
        const json = await res.json();
        if (json.success) {
          setCategories(json.data.slice(0, 4));
        }
      } catch {
        /* silent */
      }
    };
    fetchCategories();
  }, []);

  return (
    <footer
      className="w-full bg-white border-t border-[#f0ebe4]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Main content */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* ── Brand column ── */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-flex items-center gap-2 w-fit group">
              <div className="w-8 h-8 bg-[#e85d26] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 transition-colors">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span
                className="font-extrabold text-xl text-[#111] tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                TheElectro<span className="text-[#e85d26]">Advisor</span>
              </span>
            </Link>

            <p
              className="text-[0.88rem] text-[#999] leading-relaxed max-w-[300px] m-0"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 300, fontStyle: "italic" }}
            >
              Your trusted source for in-depth gadget reviews, buying guides, and
              the latest technology news. We help you make informed decisions.
            </p>
          </div>

          {/* ── Categories column ── */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#111] m-0">
              Categories
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {categories.length > 0
                ? categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/${cat.slug}`}
                        className="text-[0.85rem] font-medium text-[#888] no-underline inline-flex items-center gap-1.5 hover:text-[#e85d26] transition-colors duration-200"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#e85d26] opacity-50 flex-shrink-0 inline-block" />
                        {cat.name}
                      </Link>
                    </li>
                  ))
                : Array.from({ length: 4 }).map((_, i) => (
                    <li key={i}>
                      <div
                        className="h-3.5 rounded bg-[#f0ebe4] animate-pulse"
                        style={{ width: `${60 + i * 10}%` }}
                      />
                    </li>
                  ))}
            </ul>
          </div>

          {/* ── Company column ── */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#111] m-0">
              Company
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.85rem] font-medium text-[#888] no-underline inline-flex items-center gap-1.5 hover:text-[#e85d26] transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#e85d26] opacity-50 flex-shrink-0 inline-block" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#f0ebe4]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap">

          {/* Copyright */}
          <div className="flex items-center gap-2 text-[0.75rem] text-[#bbb] font-medium">
            <div className="w-[22px] h-[22px] bg-[#111] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[10px] font-bold">E</span>
            </div>
            © 2026 TheElectroAdvisor. All rights reserved.
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-4 sm:gap-5 flex-wrap justify-center">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-[0.75rem] font-medium text-[#bbb] no-underline hover:text-[#e85d26] transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}