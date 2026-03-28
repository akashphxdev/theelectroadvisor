"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fff7ed 0%, #fff 50%, #fef3c7 100%)" }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Blurred blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #fed7aa55 0%, transparent 70%)", transform: "translate(-30%, -30%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #fde68a44 0%, transparent 70%)", transform: "translate(30%, 30%)" }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center max-w-xl w-full"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-orange-200 rounded-full px-4 py-1.5 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Page Not Found</span>
        </div>

        {/* 404 */}
        <div className="relative mb-6 select-none">
          <span
            className="font-extrabold leading-none tracking-tighter"
            style={{
              fontSize: "clamp(120px, 20vw, 200px)",
              color: "transparent",
              WebkitTextStroke: "2px #f97316",
              opacity: 0.12,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              whiteSpace: "nowrap",
              zIndex: 0,
            }}
          >
            404
          </span>
          <span
            className="relative z-10 font-extrabold leading-none tracking-tighter"
            style={{
              fontSize: "clamp(80px, 14vw, 140px)",
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
          Oops! This page doesn&apos;t exist.
        </h1>

        {/* Description */}
        <p className="text-base text-gray-500 leading-relaxed mb-10 max-w-sm">
          The page you&apos;re looking for might have been moved, renamed, or taken off our site.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-orange-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg group w-full sm:w-auto justify-center"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Back to Home
          </Link>

          <Link
            href="/categories"
            className="inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-gray-800 font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 border border-gray-200 shadow-sm group w-full sm:w-auto justify-center"
          >
            Browse Categories
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}