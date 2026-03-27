"use client";

import { useState, useEffect, useRef } from "react";

const slides = [
  { badge: "EXCLUSIVE FEATURE", titleStart: "The 10", titleAccent: "Best", titleEnd: "Smartphones of 2026", description: "From AI-powered cameras to foldable displays — the definitive list of phones worth your money.", cta: "Read Full Story", href: "/reviews/best-smartphones-2026", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80", imageAlt: "Best Smartphones 2026", bg: "from-orange-50 via-rose-50 to-white" },
  { badge: "TRENDING NOW", titleStart: "Top 7", titleAccent: "Laptops", titleEnd: "for Creators in 2026", description: "Ultra-thin, blazing fast, and built for the pros — here are the machines redefining portable power.", cta: "Explore Picks", href: "/reviews/best-laptops-2026", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", imageAlt: "Best Laptops 2026", bg: "from-blue-50 via-indigo-50 to-white" },
  { badge: "BUYING GUIDE", titleStart: "The", titleAccent: "Ultimate", titleEnd: "TWS Earbuds Guide 2026", description: "Noise cancellation, spatial audio, and 40-hour battery — we tested 30 pairs so you don't have to.", cta: "See Rankings", href: "/buying-guides/best-earbuds-2026", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", imageAlt: "Best Earbuds 2026", bg: "from-purple-50 via-pink-50 to-white" },
];

const categories = [
  { name: "Smartphones", href: "/categories/smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80", accent: "#3b82f6", border: "#93c5fd" },
  { name: "Laptops",     href: "/categories/laptops",     image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80", accent: "#8b5cf6", border: "#c4b5fd" },
  { name: "Wearables",   href: "/categories/wearables",   image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80", accent: "#10b981", border: "#6ee7b7" },
  { name: "Gaming",      href: "/categories/gaming",      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80", accent: "#ef4444", border: "#fca5a5" },
  { name: "Smart Home",  href: "/categories/smart-home",  image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", accent: "#f59e0b", border: "#fcd34d" },
  { name: "Audio",       href: "/categories/audio",       image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", accent: "#6366f1", border: "#a5b4fc" },
  { name: "Cameras",     href: "/categories/cameras",     image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", accent: "#ec4899", border: "#f9a8d4" },
  { name: "Accessories", href: "/categories/accessories", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80", accent: "#f97316", border: "#fdba74" },
];

const trendingArticles = [
  { category: "SMARTPHONES", title: "The 10 Best Smartphones of 2026",           href: "/reviews/best-smartphones-2026",          image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80", items: 10, views: "2.4M" },
  { category: "AUDIO",       title: "Top Noise-Canceling Headphones for Travel", href: "/reviews/best-noise-canceling-headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", items: 8,  views: "1.8M" },
  { category: "LAPTOPS",     title: "Best Gaming Laptops Under $1,500",          href: "/reviews/best-gaming-laptops",            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", items: 5,  views: "1.2M" },
  { category: "WEARABLES",   title: "Best Smartwatches to Buy in 2026",          href: "/reviews/best-smartwatches-2026",         image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80", items: 7,  views: "980K" },
  { category: "GAMING",      title: "Top Gaming Consoles Ranked for 2026",       href: "/reviews/best-gaming-consoles-2026",      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80", items: 6,  views: "870K" },
  { category: "CAMERAS",     title: "Best Mirrorless Cameras for Beginners",     href: "/reviews/best-mirrorless-cameras",        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", items: 9,  views: "760K" },
];

const reviews = [
  { title: "Samsung Galaxy S26 Ultra Review: AI Perfected",      href: "/reviews/samsung-galaxy-s26-ultra", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80", rating: 4.8, time: "2 days ago",  featured: true  },
  { title: "Sony WH-1000XM6: Still the King of ANC?",           href: "/reviews/sony-wh-1000xm6",          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", rating: 4.5, time: "4 days ago",  featured: false },
  { title: "MacBook Pro M4 Review: The Laptop That Does It All", href: "/reviews/macbook-pro-m4",           image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", rating: 4.9, time: "6 days ago",  featured: false },
  { title: "Apple Watch Ultra 3: Best Smartwatch of 2026?",      href: "/reviews/apple-watch-ultra-3",      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80", rating: 4.7, time: "1 week ago",  featured: false },
];

const popularLists = [
  { num: "01", title: "Top Noise-Canceling Headphones for Travel",  items: 8,  href: "/lists/noise-canceling-headphones" },
  { num: "02", title: "Best Gaming Laptops Under $1,500",           items: 5,  href: "/lists/gaming-laptops"             },
  { num: "03", title: "Smartwatches with the Best Battery Life",    items: 7,  href: "/lists/smartwatches-battery"       },
  { num: "04", title: "Essential Smart Home Devices for Beginners", items: 12, href: "/lists/smart-home-beginners"       },
];

const categoryArticles = [
  { category: "Smartphones", accent: "#3b82f6", href: "/categories/smartphones", articles: [ { title: "Top 10 Flagship Phones Worth It in 2026", href: "/reviews/flagship-phones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80", date: "Mar 26, 2026", badge: "EDITOR'S PICK" }, { title: "Samsung Galaxy S26 Ultra: AI Perfected", href: "/reviews/samsung-s26", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80", date: "Mar 24, 2026", badge: "REVIEW" }, { title: "Best Budget Phones Under $400 in 2026", href: "/reviews/budget-phones", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80", date: "Mar 22, 2026", badge: "BUYING GUIDE" }, { title: "iPhone 17 Pro vs Galaxy S26: Full Comparison", href: "/reviews/iphone-vs-galaxy", image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80", date: "Mar 20, 2026", badge: "VERSUS" } ] },
  { category: "Laptops", accent: "#8b5cf6", href: "/categories/laptops", articles: [ { title: "MacBook Pro M4: The Best Laptop for Creators", href: "/reviews/macbook-pro-m4", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", date: "Mar 25, 2026", badge: "EDITOR'S PICK" }, { title: "Best Gaming Laptops Under $1,500 in 2026", href: "/reviews/gaming-laptops", image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80", date: "Mar 23, 2026", badge: "BUYING GUIDE" }, { title: "Budget Laptops Under $600 That Punch Above Weight", href: "/reviews/budget-laptops", image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800&q=80", date: "Mar 21, 2026", badge: "RANKED" }, { title: "Dell XPS 15 vs HP Spectre x360: Which to Buy?", href: "/reviews/dell-vs-hp", image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80", date: "Mar 19, 2026", badge: "VERSUS" } ] },
  { category: "Audio", accent: "#6366f1", href: "/categories/audio", articles: [ { title: "Sony WH-1000XM6: Still the King of ANC?", href: "/reviews/sony-xm6", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", date: "Mar 24, 2026", badge: "REVIEW" }, { title: "Top 8 Noise-Canceling Headphones for Travel", href: "/reviews/nc-headphones", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80", date: "Mar 22, 2026", badge: "RANKED" }, { title: "Best TWS Earbuds Under $100 Right Now", href: "/reviews/tws-earbuds", image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&q=80", date: "Mar 20, 2026", badge: "BUYING GUIDE" }, { title: "Sony WF-1000XM6 vs AirPods Pro 3 Compared", href: "/reviews/sony-airpods", image: "https://images.unsplash.com/photo-1631176093617-5e001c40b3ff?w=800&q=80", date: "Mar 18, 2026", badge: "VERSUS" } ] },
  { category: "Wearables", accent: "#10b981", href: "/categories/wearables", articles: [ { title: "Apple Watch Ultra 3: Best Smartwatch of 2026?", href: "/reviews/apple-watch-ultra-3", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80", date: "Mar 23, 2026", badge: "REVIEW" }, { title: "Best Smartwatches with Longest Battery Life", href: "/reviews/smartwatches-battery", image: "https://images.unsplash.com/photo-1617625802912-cde586faf425?w=800&q=80", date: "Mar 21, 2026", badge: "RANKED" }, { title: "Fitness Trackers Worth Buying in 2026", href: "/reviews/fitness-trackers", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80", date: "Mar 19, 2026", badge: "BUYING GUIDE" }, { title: "Galaxy Watch 7 vs Apple Watch Ultra 3", href: "/reviews/galaxy-vs-apple-watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", date: "Mar 17, 2026", badge: "VERSUS" } ] },
  { category: "Gaming", accent: "#ef4444", href: "/categories/gaming", articles: [ { title: "PS6 vs Xbox Series X2: Which Console to Buy?", href: "/reviews/ps6-vs-xbox", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80", date: "Mar 25, 2026", badge: "VERSUS" }, { title: "Top Gaming Consoles Ranked for 2026", href: "/reviews/gaming-consoles", image: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?w=800&q=80", date: "Mar 23, 2026", badge: "RANKED" }, { title: "Best Gaming Accessories Under $50", href: "/reviews/gaming-accessories", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80", date: "Mar 21, 2026", badge: "BUYING GUIDE" }, { title: "Nintendo Switch 2 Full Review: Worth the Upgrade?", href: "/reviews/switch-2", image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80", date: "Mar 19, 2026", badge: "REVIEW" } ] },
  { category: "Cameras", accent: "#ec4899", href: "/categories/cameras", articles: [ { title: "Best Mirrorless Cameras for Beginners in 2026", href: "/reviews/mirrorless-cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", date: "Mar 24, 2026", badge: "BUYING GUIDE" }, { title: "Sony A7 V vs Canon EOS R6 Mark III Compared", href: "/reviews/sony-vs-canon", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80", date: "Mar 22, 2026", badge: "VERSUS" }, { title: "Best Action Cameras for Adventure in 2026", href: "/reviews/action-cameras", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80", date: "Mar 20, 2026", badge: "RANKED" }, { title: "Top Compact Cameras That Fit in Your Pocket", href: "/reviews/compact-cameras", image: "https://images.unsplash.com/photo-1487088678257-3a541e6e3922?w=800&q=80", date: "Mar 18, 2026", badge: "REVIEW" } ] },
  { category: "Smart Home", accent: "#f59e0b", href: "/categories/smart-home", articles: [ { title: "Top Smart Home Devices That Make Life Easier", href: "/reviews/smart-home-devices", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", date: "Mar 23, 2026", badge: "EDITOR'S PICK" }, { title: "Best Smart Speakers: Alexa vs Google vs Siri", href: "/reviews/smart-speakers", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80", date: "Mar 21, 2026", badge: "VERSUS" }, { title: "Essential Smart Home Devices for Beginners", href: "/reviews/smart-home-beginners", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80", date: "Mar 19, 2026", badge: "BUYING GUIDE" }, { title: "Best Smart Doorbells and Security Cameras 2026", href: "/reviews/smart-security", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80", date: "Mar 17, 2026", badge: "RANKED" } ] },
  { category: "Accessories", accent: "#f97316", href: "/categories/accessories", articles: [ { title: "Best Phone Accessories Worth Buying Right Now", href: "/reviews/phone-accessories", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80", date: "Mar 22, 2026", badge: "EDITOR'S PICK" }, { title: "Top Wireless Chargers for Every Budget in 2026", href: "/reviews/wireless-chargers", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80", date: "Mar 20, 2026", badge: "RANKED" }, { title: "Best USB-C Hubs and Docks for Laptops", href: "/reviews/usb-c-hubs", image: "https://images.unsplash.com/photo-1558618047-f4e80b34c4f1?w=800&q=80", date: "Mar 18, 2026", badge: "BUYING GUIDE" }, { title: "Power Banks That Are Actually Worth It in 2026", href: "/reviews/power-banks", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80", date: "Mar 16, 2026", badge: "REVIEW" } ] },
];

const badgeColors = {
  "EDITOR'S PICK": { bg: "#fff7ed", text: "#ea580c" },
  "REVIEW":        { bg: "#eff6ff", text: "#2563eb" },
  "BUYING GUIDE":  { bg: "#f0fdf4", text: "#16a34a" },
  "VERSUS":        { bg: "#fdf4ff", text: "#9333ea" },
  "RANKED":        { bg: "#fefce8", text: "#ca8a04" },
};

// ─── COMPARISON DATA ───────────────────────────────────────────────────────────
const homeComparisons = [
  {
    id: "iphone-vs-galaxy", category: "Smartphones", categoryColor: "#3b82f6", label: "Most Viewed", views: "3.2M",
    title: "iPhone 17 Pro vs Galaxy S26 Ultra",
    left:  { name: "iPhone 17 Pro",    brand: "Apple",   price: "$1,199", score: 9.4, image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=80", verdict: "Editor's Pick", verdictColor: "#f97316", winner: true  },
    right: { name: "Galaxy S26 Ultra", brand: "Samsung", price: "$1,299", score: 9.2, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80", verdict: "Best Android",  verdictColor: "#3b82f6", winner: false },
  },
  {
    id: "macbook-vs-xps", category: "Laptops", categoryColor: "#8b5cf6", label: "Staff Pick", views: "2.1M",
    title: "MacBook Pro M4 vs Dell XPS 15",
    left:  { name: "MacBook Pro M4", brand: "Apple", price: "$1,999", score: 9.6, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80", verdict: "Editor's Pick", verdictColor: "#f97316", winner: true  },
    right: { name: "Dell XPS 15",   brand: "Dell",  price: "$1,799", score: 8.9, image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80", verdict: "Best Windows",  verdictColor: "#3b82f6", winner: false },
  },
  {
    id: "airpods-vs-sony", category: "Audio", categoryColor: "#6366f1", label: "Trending", views: "1.8M",
    title: "AirPods Pro 3 vs Sony WF-1000XM6",
    left:  { name: "AirPods Pro 3",    brand: "Apple", price: "$279", score: 9.1, image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80", verdict: "Best ANC",   verdictColor: "#10b981", winner: false },
    right: { name: "Sony WF-1000XM6", brand: "Sony",  price: "$299", score: 9.3, image: "https://images.unsplash.com/photo-1631176093617-5e001c40b3ff?w=400&q=80", verdict: "Best Sound", verdictColor: "#f97316", winner: true  },
  },
  {
    id: "ps6-vs-xbox", category: "Gaming", categoryColor: "#ef4444", label: "Hot Right Now", views: "2.7M",
    title: "PS6 vs Xbox Series X2",
    left:  { name: "PlayStation 6",  brand: "Sony",      price: "$549", score: 9.5, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80", verdict: "Editor's Pick", verdictColor: "#f97316", winner: true  },
    right: { name: "Xbox Series X2", brand: "Microsoft", price: "$499", score: 9.1, image: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?w=400&q=80", verdict: "Best Value",    verdictColor: "#8b5cf6", winner: false },
  },
];

// ─── SCORE RING SVG ────────────────────────────────────────────────────────────
function ScoreRing({ score, winner }) {
  const size = 40;
  const r = 15;
  const circ = 2 * Math.PI * r;
  const filled = (score / 10) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <circle cx={20} cy={20} r={r} fill="none" stroke={winner ? "rgba(249,115,22,0.15)" : "rgba(156,163,175,0.2)"} strokeWidth="3" />
      <circle cx={20} cy={20} r={r} fill="none" stroke={winner ? "#f97316" : "#d1d5db"} strokeWidth="3"
        strokeDasharray={`${filled} ${circ - filled}`} strokeLinecap="round" transform="rotate(-90 20 20)" />
      <text x="20" y="20" textAnchor="middle" dominantBaseline="central"
        fontSize="10" fontWeight="700" fill={winner ? "#f97316" : "#9ca3af"}>{score}</text>
    </svg>
  );
}

// ─── COMPARISON CARD ──────────────────────────────────────────────────────────
function ComparisonCard({ c }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/comparisons/${c.id}`}
      className="group flex flex-col bg-white overflow-hidden"
      style={{
        borderRadius: "16px",
        border: "1px solid #eaeaea",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Orange top accent line */}
      <div style={{ height: "3px", background: "#f97316", borderRadius: "16px 16px 0 0", opacity: hovered ? 1 : 0.6, transition: "opacity 0.25s" }} />

      {/* Category + label */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2.5">
        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ color: c.categoryColor, background: `${c.categoryColor}12` }}>
          {c.category}
        </span>
        <span className="text-[10px] font-medium text-gray-400 tracking-wide">{c.label}</span>
      </div>

      {/* Title */}
      <p className="px-4 text-[12.5px] font-bold text-gray-900 leading-snug mb-3.5 line-clamp-2 pr-2">{c.title}</p>

      {/* Products — side by side */}
      <div className="px-4 flex gap-2.5 mb-0">
        {[c.left, c.right].map((p) => (
          <div key={p.name} className="flex-1 flex flex-col overflow-hidden"
            style={{
              borderRadius: "12px",
              border: p.winner ? "1.5px solid #fed7aa" : "1px solid #f0f0f0",
              background: p.winner ? "#fffbf7" : "#fafafa",
            }}>
            {/* Image */}
            <div className="relative overflow-hidden" style={{ height: "88px" }}>
              <img src={p.image} alt={p.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 55%)" }} />
              {p.winner && (
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md"
                  style={{ background: "#f97316", fontSize: "8.5px", fontWeight: 700, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  ★ Winner
                </div>
              )}
            </div>
            {/* Info */}
            <div className="px-2.5 py-2.5 flex flex-col gap-1.5">
              <p className="text-[8.5px] font-bold uppercase tracking-widest text-gray-400">{p.brand}</p>
              <p className="text-[11px] font-extrabold text-gray-900 leading-tight line-clamp-1">{p.name}</p>
              <div className="flex items-center justify-between gap-1">
                <ScoreRing score={p.score} winner={p.winner} />
                <p className="text-[13px] font-black" style={{ color: p.winner ? "#f97316" : "#374151" }}>{p.price}</p>
              </div>
              <span className="self-start text-[9px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${p.verdictColor}12`, color: p.verdictColor }}>
                {p.verdict}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto px-4 py-3 flex items-center justify-between"
        style={{ borderTop: "1px solid #f3f4f6", background: "#fafafa", marginTop: "12px" }}>
        <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
          <svg className="w-3 h-3 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          {c.views} views
        </span>
        <span className="text-[11px] font-bold flex items-center gap-1 transition-colors"
          style={{ color: hovered ? "#ea580c" : "#f97316" }}>
          Full breakdown
          <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </span>
      </div>
    </a>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [heroActive, setHeroActive] = useState(0);
  const [heroAnimating, setHeroAnimating] = useState(false);

  const goToSlide = (index) => {
    if (index === heroActive || heroAnimating) return;
    setHeroAnimating(true);
    setTimeout(() => { setHeroActive(index); setHeroAnimating(false); }, 300);
  };
  useEffect(() => {
    const t = setInterval(() => setHeroActive(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const [catActive, setCatActive] = useState(0);
  const trackRef = useRef(null);
  const catIntervalRef = useRef(null);
  const startCatAutoSlide = () => { catIntervalRef.current = setInterval(() => setCatActive(p => (p + 1) % categories.length), 2000); };

  useEffect(() => { startCatAutoSlide(); return () => { if (catIntervalRef.current) clearInterval(catIntervalRef.current); }; }, []);
  useEffect(() => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const cards = container.querySelectorAll(".cat-card");
    const card = cards[catActive];
    if (!card) return;
    container.scrollLeft += (card.getBoundingClientRect().left + card.offsetWidth / 2) - (container.getBoundingClientRect().left + container.offsetWidth / 2);
  }, [catActive]);

  const handleCatClick = (i) => { if (catIntervalRef.current) clearInterval(catIntervalRef.current); setCatActive(i); startCatAutoSlide(); };
  const slide = slides[heroActive];

  return (
    <main className="w-full min-h-screen bg-white">

      {/* HERO */}
      <section className={`w-full min-h-screen bg-gradient-to-br ${slide.bg} transition-all duration-700 flex items-center overflow-hidden relative`}>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen">
            <div className="flex flex-col gap-6" style={{ opacity: heroAnimating ? 0 : 1, transform: heroAnimating ? "translateY(16px)" : "translateY(0)", transition: "opacity 0.3s ease, transform 0.3s ease" }}>
              <div className="inline-flex items-center gap-2 bg-white border border-orange-200 rounded-full px-4 py-1.5 w-fit shadow-sm">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-gray-600 uppercase">{slide.badge}</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
                {slide.titleStart} <span className="text-orange-500">{slide.titleAccent}</span><br />{slide.titleEnd}
              </h1>
              <p className="text-lg text-gray-500 max-w-md leading-relaxed">{slide.description}</p>
              <a href={slide.href} className="inline-flex items-center gap-2 bg-gray-900 hover:bg-orange-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg w-fit group">
                {slide.cta}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
              <div className="flex items-center gap-2">
                {slides.map((_, i) => <button key={i} onClick={() => goToSlide(i)} className="rounded-full transition-all duration-300" style={{ width: i === heroActive ? "32px" : "8px", height: "8px", backgroundColor: i === heroActive ? "#f97316" : "#d1d5db" }} />)}
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end" style={{ opacity: heroAnimating ? 0 : 1, transform: heroAnimating ? "scale(0.95)" : "scale(1)", transition: "opacity 0.3s ease, transform 0.3s ease" }}>
              <div className="absolute -top-8 -right-8 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-30 pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 pointer-events-none" />
              <div className="relative w-full max-w-md lg:max-w-lg rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <img src={slide.image} alt={slide.imageAlt} className="w-full object-cover" style={{ height: "500px" }} />
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => goToSlide((heroActive - 1 + slides.length) % slides.length)} className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white border border-gray-100 rounded-full shadow items-center justify-center text-gray-500 hover:text-orange-500 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={() => goToSlide((heroActive + 1) % slides.length)} className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white border border-gray-100 rounded-full shadow items-center justify-center text-gray-500 hover:text-orange-500 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </button>
      </section>

      {/* CATEGORIES */}
      <section className="w-full bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div><p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Explore</p><h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Browse by Category</h2></div>
            <a href="/categories" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors">View all <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg></a>
          </div>
          <div ref={trackRef} className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollBehavior: "smooth" }}>
            {categories.map((cat, i) => {
              const isActive = i === catActive;
              return (
                <a key={cat.name} href={cat.href} onClick={e => { e.preventDefault(); handleCatClick(i); }} className="cat-card flex-shrink-0 group cursor-pointer">
                  <div className="relative w-36 h-28 rounded-xl overflow-hidden" style={{ boxShadow: isActive ? `0 12px 32px -4px ${cat.accent}66` : "0 2px 10px rgba(0,0,0,0.08)", transform: isActive ? "scale(1.07) translateY(-6px)" : "scale(1)", border: isActive ? `2.5px solid ${cat.border}` : "2.5px solid transparent", transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 transition-all duration-300" style={{ background: isActive ? `linear-gradient(to top, ${cat.accent}dd 0%, ${cat.accent}55 45%, transparent 100%)` : "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }} />
                    {isActive && <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-white font-bold uppercase tracking-wider" style={{ backgroundColor: cat.accent, fontSize: "10px" }}><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />Active</div>}
                    <div className="absolute bottom-0 left-0 right-0 px-2.5 py-2"><p className="text-xs font-bold text-white leading-tight">{cat.name}</p><p className="text-white/75 font-medium mt-0.5" style={{ fontSize: "10px" }}>Explore →</p></div>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-2 mt-5">
            {categories.map((cat, i) => <button key={i} onClick={() => handleCatClick(i)} className="rounded-full transition-all duration-300" style={{ width: i === catActive ? "24px" : "8px", height: "8px", backgroundColor: i === catActive ? cat.accent : "#d1d5db" }} />)}
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="w-full bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2"><svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg><h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Trending Right Now</h2></div>
            <a href="/trending" className="text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1">View all lists <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg></a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingArticles.map(article => (
              <a key={article.title} href={article.href} className="group flex flex-col cursor-pointer">
                <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3"><span className="bg-white text-gray-800 font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm" style={{ fontSize: "11px" }}>{article.category}</span></div>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors">{article.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>{article.items} Items</span>
                    <span className="flex items-center gap-1"><svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>{article.views} views</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      {categoryArticles.map((catSection, idx) => {
        const featured = catSection.articles[0];
        const rest = catSection.articles.slice(1);
        return (
          <section key={catSection.category} className={`w-full py-12 px-4 sm:px-6 lg:px-8 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3"><div className="w-1 h-8 rounded-full" style={{ backgroundColor: catSection.accent }} /><div><p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: catSection.accent }}>Category</p><h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{catSection.category}</h2></div></div>
                <a href={catSection.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors group">View all {catSection.category} <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg></a>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                <a href={featured.href} className="lg:col-span-3 group relative rounded-2xl overflow-hidden block" style={{ minHeight: "320px" }}>
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ minHeight: "320px" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4"><span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: badgeColors[featured.badge]?.bg || "#fff", color: badgeColors[featured.badge]?.text || "#000" }}>{featured.badge}</span></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5"><p className="text-white/60 text-xs mb-1.5">{featured.date}</p><h3 className="text-white text-xl font-extrabold leading-snug group-hover:text-orange-300 transition-colors">{featured.title}</h3><span className="inline-flex items-center gap-1 text-sm font-semibold text-white/80 mt-3 group-hover:text-orange-300 transition-colors">Read More <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></span></div>
                </a>
                <div className="lg:col-span-2 flex flex-col gap-4">
                  {rest.map(article => (
                    <a key={article.title} href={article.href} className="group flex items-center gap-4 bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"><img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>
                      <div className="flex-1 min-w-0"><span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1.5" style={{ backgroundColor: badgeColors[article.badge]?.bg || "#f3f4f6", color: badgeColors[article.badge]?.text || "#374151" }}>{article.badge}</span><h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">{article.title}</h3><p className="text-xs text-gray-400 mt-1">{article.date}</p></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* REVIEWS + LISTS */}
      <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-7"><h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Latest Reviews</h2><a href="/reviews" className="text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1">View all <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg></a></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reviews.map(review => (
                <a key={review.title} href={review.href} className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                  <div className="relative w-full h-52 overflow-hidden"><img src={review.image} alt={review.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><div className="absolute top-3 right-3 flex items-center gap-1 bg-white rounded-lg px-2.5 py-1 shadow-md"><svg className="w-3.5 h-3.5 text-orange-400 fill-orange-400" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg><span className="text-xs font-bold text-gray-800">{review.rating}</span></div></div>
                  <div className="p-4 flex flex-col gap-3"><h3 className={`text-sm font-bold leading-snug transition-colors ${review.featured ? "text-orange-500" : "text-gray-900 group-hover:text-orange-500"}`}>{review.title}</h3><div className="flex items-center justify-between text-xs text-gray-400"><span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{review.time}</span><span className="font-semibold text-orange-500">Read Review &rsaquo;</span></div></div>
                </a>
              ))}
            </div>
          </div>
          <div className="lg:w-72 flex-shrink-0">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">Popular Lists</h2>
            <div className="w-full h-px bg-gray-200 mb-4" />
            <div className="flex flex-col">
              {popularLists.map(item => (
                <a key={item.title} href={item.href} className="group flex items-start gap-4 py-5 border-b border-gray-100 last:border-0">
                  <span className="text-2xl font-extrabold text-gray-200 group-hover:text-orange-200 transition-colors leading-none flex-shrink-0 w-8">{item.num}</span>
                  <div><p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors">{item.title}</p><p className="text-xs text-gray-400 mt-1">{item.items} Items</p></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HEAD-TO-HEAD COMPARISONS — polished, editorial design
      ═══════════════════════════════════════════════════════════ */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8" style={{ background: "#f6f5f3" }}>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div style={{ width: "24px", height: "2px", background: "#f97316", borderRadius: "2px" }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange-500">Head-to-Head</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Latest <span className="text-orange-500">Comparisons</span>
              </h2>
              <p className="text-sm text-gray-500 mt-2 max-w-xs leading-relaxed">Real specs. Clear verdicts. We pick a winner every time.</p>
            </div>
            <a href="/comparisons"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-gray-800 hover:text-orange-500 transition-colors flex-shrink-0 self-start sm:self-end"
              style={{ borderBottom: "1.5px solid #d1d5db", paddingBottom: "2px" }}>
              View all comparisons
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>

          {/* Divider with stats */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 pb-8 mb-8" style={{ borderBottom: "1px solid #e2e0db" }}>
            {[["50+", "Comparisons"], ["15M+", "Total views"], ["8", "Categories"], ["Weekly", "New picks"]].map(([val, label]) => (
              <div key={label} className="flex flex-col">
                <span className="text-lg font-extrabold text-gray-900 leading-none">{val}</span>
                <span className="text-[11px] text-gray-400 font-medium mt-1">{label}</span>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {homeComparisons.map(c => <ComparisonCard key={c.id} c={c} />)}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 px-6 py-5 rounded-2xl bg-white"
            style={{ border: "1px solid #e5e3de" }}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#fff7ed" }}>
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Can't decide between two products?</p>
                <p className="text-xs text-gray-400 mt-0.5 max-w-xs">We benchmark them side-by-side and give you a clear answer — no sponsored opinions.</p>
              </div>
            </div>
            <a href="/comparisons"
              className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 group"
              style={{ background: "#111827", color: "#fff" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f97316"}
              onMouseLeave={e => e.currentTarget.style.background = "#111827"}>
              Browse All Comparisons
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}