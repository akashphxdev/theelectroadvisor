"use client";

import { useState } from "react";

// ─── ALL COMPARISONS DATA ─────────────────────────────────────────────────────

const allComparisons = [
  {
    id: "iphone-vs-galaxy",
    category: "Smartphones",
    title: "iPhone 17 Pro vs Galaxy S26 Ultra",
    views: "3.2M",
    date: "Mar 25, 2026",
    left: {
      name: "iPhone 17 Pro",
      brand: "Apple",
      price: "$1,199",
      image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=80",
      score: 9.4,
      verdict: "EDITOR'S PICK",
      specs: [
        { label: "Chip",    value: "A19 Pro",      winner: true  },
        { label: "Camera",  value: "48MP Triple",  winner: false },
        { label: "Battery", value: "3,900 mAh",    winner: false },
        { label: "RAM",     value: "8 GB",         winner: false },
        { label: "Display", value: "6.3\" OLED",   winner: false },
        { label: "OS",      value: "iOS 19",       winner: false },
      ],
      pros: ["Best-in-class performance", "Compact & premium build", "Seamless ecosystem"],
      cons: ["Smaller battery", "No S Pen"],
      href: "/reviews/iphone-17-pro",
    },
    right: {
      name: "Galaxy S26 Ultra",
      brand: "Samsung",
      price: "$1,299",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80",
      score: 9.2,
      verdict: "BEST ANDROID",
      specs: [
        { label: "Chip",    value: "Snapdragon 8", winner: false },
        { label: "Camera",  value: "200MP Triple", winner: true  },
        { label: "Battery", value: "5,000 mAh",   winner: true  },
        { label: "RAM",     value: "12 GB",        winner: true  },
        { label: "Display", value: "6.9\" AMOLED", winner: true  },
        { label: "OS",      value: "Android 16",  winner: false },
      ],
      pros: ["Insane 200MP camera", "S Pen included", "Bigger battery"],
      cons: ["Bulky & heavy", "Very expensive"],
      href: "/reviews/samsung-galaxy-s26-ultra",
    },
  },
  {
    id: "macbook-vs-xps",
    category: "Laptops",
    title: "MacBook Pro M4 vs Dell XPS 15",
    views: "2.1M",
    date: "Mar 23, 2026",
    left: {
      name: "MacBook Pro M4",
      brand: "Apple",
      price: "$1,999",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
      score: 9.6,
      verdict: "EDITOR'S PICK",
      specs: [
        { label: "Chip",    value: "M4 Pro",       winner: true  },
        { label: "RAM",     value: "24 GB",        winner: false },
        { label: "Battery", value: "22 hrs",       winner: true  },
        { label: "Display", value: "14.2\" XDR",   winner: false },
        { label: "Weight",  value: "3.5 lbs",      winner: true  },
        { label: "GPU",     value: "20-core",      winner: false },
      ],
      pros: ["Insane battery life", "Silent performance", "Best-in-class display"],
      cons: ["No discrete GPU", "Limited ports"],
      href: "/reviews/macbook-pro-m4",
    },
    right: {
      name: "Dell XPS 15",
      brand: "Dell",
      price: "$1,799",
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80",
      score: 8.9,
      verdict: "BEST WINDOWS",
      specs: [
        { label: "Chip",    value: "Core Ultra 9", winner: false },
        { label: "RAM",     value: "32 GB DDR5",   winner: true  },
        { label: "Battery", value: "13 hrs",       winner: false },
        { label: "Display", value: "15.6\" OLED",  winner: true  },
        { label: "Weight",  value: "4.2 lbs",      winner: false },
        { label: "GPU",     value: "RTX 4070",     winner: true  },
      ],
      pros: ["Discrete RTX GPU", "More RAM", "Windows flexibility"],
      cons: ["Shorter battery", "Runs warm under load"],
      href: "/reviews/dell-xps-15",
    },
  },
  {
    id: "airpods-vs-sony",
    category: "Earbuds",
    title: "AirPods Pro 3 vs Sony WF-1000XM6",
    views: "1.8M",
    date: "Mar 21, 2026",
    left: {
      name: "AirPods Pro 3",
      brand: "Apple",
      price: "$279",
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80",
      score: 9.1,
      verdict: "BEST ANC",
      specs: [
        { label: "ANC",     value: "Adaptive",    winner: true  },
        { label: "Battery", value: "6.5 + 24hr",  winner: false },
        { label: "Codec",   value: "AAC, LC3",    winner: false },
        { label: "Water",   value: "IP57",        winner: true  },
        { label: "Chip",    value: "Apple H3",    winner: false },
        { label: "Spatial", value: "Personalized",winner: true  },
      ],
      pros: ["Best ANC in class", "Apple ecosystem", "Personalized spatial audio"],
      cons: ["No hi-res codec", "Apple lock-in"],
      href: "/reviews/airpods-pro-3",
    },
    right: {
      name: "Sony WF-1000XM6",
      brand: "Sony",
      price: "$299",
      image: "https://images.unsplash.com/photo-1631176093617-5e001c40b3ff?w=400&q=80",
      score: 9.3,
      verdict: "BEST SOUND",
      specs: [
        { label: "ANC",     value: "Dual Sensor", winner: false },
        { label: "Battery", value: "8 + 24hr",    winner: true  },
        { label: "Codec",   value: "LDAC, LC3",   winner: true  },
        { label: "Water",   value: "IPX4",        winner: false },
        { label: "Chip",    value: "QN3",         winner: true  },
        { label: "Spatial", value: "360 Reality", winner: false },
      ],
      pros: ["Best audio quality", "LDAC hi-res support", "Longer battery"],
      cons: ["Slightly bulkier", "Android-first features"],
      href: "/reviews/sony-wf-1000xm6",
    },
  },
  {
    id: "applewatch-vs-galaxy",
    category: "Smartwatches",
    title: "Apple Watch Ultra 3 vs Galaxy Watch 7",
    views: "1.4M",
    date: "Mar 19, 2026",
    left: {
      name: "Apple Watch Ultra 3",
      brand: "Apple",
      price: "$799",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80",
      score: 9.3,
      verdict: "EDITOR'S PICK",
      specs: [
        { label: "Display", value: "49mm OLED",  winner: true  },
        { label: "Battery", value: "36 hrs",     winner: false },
        { label: "GPS",     value: "Dual-freq",  winner: true  },
        { label: "Water",   value: "100m WR",    winner: true  },
        { label: "Chip",    value: "S10",        winner: true  },
        { label: "Build",   value: "Titanium",   winner: true  },
      ],
      pros: ["Premium titanium build", "Best GPS accuracy", "Deep water resistance"],
      cons: ["Very expensive", "Apple ecosystem only"],
      href: "/reviews/apple-watch-ultra-3",
    },
    right: {
      name: "Galaxy Watch 7",
      brand: "Samsung",
      price: "$649",
      image: "https://images.unsplash.com/photo-1617625802912-cde586faf425?w=400&q=80",
      score: 8.8,
      verdict: "BEST VALUE",
      specs: [
        { label: "Display", value: "47mm AMOLED", winner: false },
        { label: "Battery", value: "40 hrs",      winner: true  },
        { label: "GPS",     value: "Multi-band",  winner: false },
        { label: "Water",   value: "5ATM",        winner: false },
        { label: "Chip",    value: "Exynos W1000",winner: false },
        { label: "Build",   value: "Aluminum",    winner: false },
      ],
      pros: ["Longer battery life", "More affordable", "Android compatible"],
      cons: ["Less durable build", "Shorter water resistance"],
      href: "/reviews/galaxy-watch-7",
    },
  },
  {
    id: "sony-vs-canon",
    category: "Cameras",
    title: "Sony A7 V vs Canon EOS R6 Mark III",
    views: "980K",
    date: "Mar 17, 2026",
    left: {
      name: "Sony A7 V",
      brand: "Sony",
      price: "$3,299",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
      score: 9.5,
      verdict: "EDITOR'S PICK",
      specs: [
        { label: "Sensor",  value: "61MP FF BSI",   winner: true  },
        { label: "Video",   value: "8K RAW",        winner: true  },
        { label: "AF",      value: "AI Real-time",  winner: true  },
        { label: "Stab.",   value: "8.5-stop IBIS", winner: true  },
        { label: "Buffer",  value: "Unlimited JPEG",winner: true  },
        { label: "EVF",     value: "9.44M dot",     winner: true  },
      ],
      pros: ["61MP resolution", "8K RAW video", "Industry-best AF"],
      cons: ["Very pricey", "Large body"],
      href: "/reviews/sony-a7v",
    },
    right: {
      name: "Canon EOS R6 III",
      brand: "Canon",
      price: "$2,799",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80",
      score: 9.1,
      verdict: "BEST VALUE",
      specs: [
        { label: "Sensor",  value: "40MP FF CMOS",  winner: false },
        { label: "Video",   value: "6K RAW",        winner: false },
        { label: "AF",      value: "Dual Pixel II", winner: false },
        { label: "Stab.",   value: "8-stop IBIS",   winner: false },
        { label: "Buffer",  value: "High-speed",    winner: false },
        { label: "EVF",     value: "5.76M dot",     winner: false },
      ],
      pros: ["More affordable", "Excellent color science", "Compact body"],
      cons: ["Lower resolution", "6K not 8K"],
      href: "/reviews/canon-eos-r6-iii",
    },
  },
  {
    id: "sony-xm6-vs-bose",
    category: "Headphones",
    title: "Sony WH-1000XM6 vs Bose QC Ultra",
    views: "1.1M",
    date: "Mar 15, 2026",
    left: {
      name: "Sony WH-1000XM6",
      brand: "Sony",
      price: "$349",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      score: 9.4,
      verdict: "EDITOR'S PICK",
      specs: [
        { label: "ANC",     value: "Dual Sensor",  winner: true  },
        { label: "Battery", value: "40 hrs",       winner: true  },
        { label: "Codec",   value: "LDAC, LC3",    winner: true  },
        { label: "Driver",  value: "40mm Dynamic", winner: true  },
        { label: "Weight",  value: "250g",         winner: true  },
        { label: "Folds",   value: "Yes",          winner: false },
      ],
      pros: ["LDAC hi-res audio", "40hr battery", "Best overall ANC"],
      cons: ["Plasticky build feel", "Ear cups get warm"],
      href: "/reviews/sony-wh-1000xm6",
    },
    right: {
      name: "Bose QC Ultra",
      brand: "Bose",
      price: "$379",
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80",
      score: 9.0,
      verdict: "BEST COMFORT",
      specs: [
        { label: "ANC",     value: "CustomTune",   winner: false },
        { label: "Battery", value: "24 hrs",       winner: false },
        { label: "Codec",   value: "aptX, AAC",    winner: false },
        { label: "Driver",  value: "35mm Dynamic", winner: false },
        { label: "Weight",  value: "254g",         winner: false },
        { label: "Folds",   value: "Yes",          winner: true  },
      ],
      pros: ["Best-in-class comfort", "Premium build quality", "Immersive audio mode"],
      cons: ["Shorter battery", "No hi-res codec"],
      href: "/reviews/bose-qc-ultra",
    },
  },
  {
    id: "ps6-vs-xbox",
    category: "Gaming",
    title: "PS6 vs Xbox Series X2",
    views: "2.7M",
    date: "Mar 13, 2026",
    left: {
      name: "PS6",
      brand: "Sony",
      price: "$549",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
      score: 9.5,
      verdict: "EDITOR'S PICK",
      specs: [
        { label: "CPU",     value: "Zen 5 8-core",  winner: false },
        { label: "GPU",     value: "RDNA 4 18 TF",  winner: true  },
        { label: "Storage", value: "2TB NVMe",      winner: false },
        { label: "Output",  value: "8K / 120Hz",   winner: true  },
        { label: "RAM",     value: "16 GB GDDR7",   winner: false },
        { label: "Drive",   value: "UHD Blu-ray",   winner: false },
      ],
      pros: ["More GPU power", "8K output support", "Exclusive titles"],
      cons: ["No Game Pass", "Higher price"],
      href: "/reviews/ps6",
    },
    right: {
      name: "Xbox Series X2",
      brand: "Microsoft",
      price: "$499",
      image: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?w=400&q=80",
      score: 9.1,
      verdict: "BEST VALUE",
      specs: [
        { label: "CPU",     value: "Zen 5 8-core",  winner: false },
        { label: "GPU",     value: "RDNA 4 15 TF",  winner: false },
        { label: "Storage", value: "2TB NVMe",      winner: false },
        { label: "Output",  value: "4K 120Hz",      winner: false },
        { label: "RAM",     value: "16 GB GDDR7",   winner: false },
        { label: "Drive",   value: "UHD Blu-ray",   winner: false },
      ],
      pros: ["Game Pass value", "More affordable", "PC cross-play"],
      cons: ["Less GPU power", "Fewer exclusives"],
      href: "/reviews/xbox-series-x2",
    },
  },
  {
    id: "ipad-vs-tab",
    category: "Tablets",
    title: "iPad Pro M4 vs Galaxy Tab S10 Ultra",
    views: "870K",
    date: "Mar 11, 2026",
    left: {
      name: "iPad Pro M4",
      brand: "Apple",
      price: "$1,099",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
      score: 9.5,
      verdict: "EDITOR'S PICK",
      specs: [
        { label: "Chip",    value: "Apple M4",         winner: true  },
        { label: "Display", value: "13\" OLED XDR",    winner: true  },
        { label: "RAM",     value: "16 GB",            winner: false },
        { label: "Battery", value: "10 hrs",           winner: false },
        { label: "Camera",  value: "12MP Wide",        winner: false },
        { label: "Pencil",  value: "Apple Pencil Pro", winner: true  },
      ],
      pros: ["M4 chip is unmatched", "Stunning OLED XDR display", "Best stylus experience"],
      cons: ["No USB-A port", "iPadOS limitations"],
      href: "/reviews/ipad-pro-m4",
    },
    right: {
      name: "Galaxy Tab S10 Ultra",
      brand: "Samsung",
      price: "$1,199",
      image: "https://images.unsplash.com/photo-1589739900579-a4f8ced6f1a8?w=400&q=80",
      score: 9.0,
      verdict: "BEST ANDROID",
      specs: [
        { label: "Chip",    value: "Snapdragon 8 Elite", winner: false },
        { label: "Display", value: "14.6\" AMOLED",      winner: false },
        { label: "RAM",     value: "12 GB",              winner: false },
        { label: "Battery", value: "11,200 mAh",         winner: true  },
        { label: "Camera",  value: "13MP Wide",          winner: true  },
        { label: "Pencil",  value: "S Pen included",     winner: false },
      ],
      pros: ["Massive 14.6\" screen", "S Pen in box", "Bigger battery"],
      cons: ["More expensive", "Android tablet apps still limited"],
      href: "/reviews/galaxy-tab-s10-ultra",
    },
  },
];

const categories = ["All", "Smartphones", "Laptops", "Earbuds", "Smartwatches", "Cameras", "Headphones", "Gaming", "Tablets"];

const badgeColors = {
  "EDITOR'S PICK": { bg: "#fff7ed", text: "#ea580c" },
  "BEST ANDROID":  { bg: "#eff6ff", text: "#2563eb" },
  "BEST WINDOWS":  { bg: "#eff6ff", text: "#2563eb" },
  "BEST SOUND":    { bg: "#eff6ff", text: "#2563eb" },
  "BEST ANC":      { bg: "#f0fdf4", text: "#16a34a" },
  "BEST VALUE":    { bg: "#fdf4ff", text: "#9333ea" },
  "BEST COMFORT":  { bg: "#fefce8", text: "#ca8a04" },
  "BEST ANDROID":  { bg: "#eff6ff", text: "#2563eb" },
};

// ─── FULL COMPARISON CARD ────────────────────────────────────────────────────

function FullComparisonCard({ c }) {
  const leftWins = c.left.score >= c.right.score;
  const winner = leftWins ? c.left : c.right;
  const loser  = leftWins ? c.right : c.left;

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">

      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full">{c.category}</span>
          <h3 className="text-sm font-extrabold text-gray-800">{c.title}</h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {c.views}
          </span>
          <span>{c.date}</span>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-2 divide-x divide-gray-100">
        {[c.left, c.right].map((p, i) => {
          const isWinner = i === 0 ? leftWins : !leftWins;
          return (
            <div key={p.name} className="flex flex-col">
              {/* Winner bar */}
              {isWinner && <div className="h-0.5 bg-orange-500 w-full" />}

              <div className="p-4 flex flex-col gap-3">
                {/* Image + score */}
                <div className="relative w-full rounded-xl overflow-hidden bg-gray-50" style={{ height: "140px" }}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-white/95 rounded-md px-1.5 py-1 shadow-sm">
                    <svg className="w-3 h-3 fill-orange-400" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="text-xs font-extrabold text-gray-900">{p.score}</span>
                  </div>
                  {isWinner && (
                    <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Winner
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: badgeColors[p.verdict]?.bg || "#f3f4f6", color: badgeColors[p.verdict]?.text || "#374151" }}>
                      {p.verdict}
                    </span>
                  </div>
                </div>

                {/* Name & price */}
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{p.brand}</p>
                  <p className="text-sm font-extrabold text-gray-900 leading-tight">{p.name}</p>
                  <p className="text-base font-black text-orange-500 mt-0.5">{p.price}</p>
                </div>

                {/* Specs */}
                <div className="flex flex-col gap-1.5 border-t border-gray-100 pt-2.5">
                  {p.specs.map((s) => (
                    <div key={s.label} className="flex justify-between items-center gap-2">
                      <span className="text-[10px] text-gray-400">{s.label}</span>
                      <span
                        className="text-[10px] font-bold text-right"
                        style={{ color: s.winner ? "#f97316" : "#1f2937" }}
                      >
                        {s.winner && "✓ "}{s.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pros */}
                <div className="border-t border-gray-100 pt-2.5">
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-green-600 mb-1.5">Pros</p>
                  <ul className="flex flex-col gap-1">
                    {p.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-1.5 text-[10px] text-gray-600">
                        <svg className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-red-500 mb-1.5">Cons</p>
                  <ul className="flex flex-col gap-1">
                    {p.cons.map((con) => (
                      <li key={con} className="flex items-start gap-1.5 text-[10px] text-gray-600">
                        <svg className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href={p.href}
                  className="mt-auto w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border"
                  style={
                    isWinner
                      ? { backgroundColor: "#f97316", color: "#fff", borderColor: "#f97316" }
                      : { backgroundColor: "transparent", color: "#f97316", borderColor: "#f97316" }
                  }
                >
                  Read Review
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verdict footer */}
      <div className="flex items-center justify-between bg-orange-50 border-t border-orange-100 px-5 py-3">
        <p className="text-xs text-gray-700">
          <span className="font-extrabold text-orange-500">{winner.name}</span>{" "}
          <span className="text-gray-500">wins this round with a score of</span>{" "}
          <span className="font-extrabold text-gray-900">{winner.score}/10</span>
        </p>
        <a href={`/comparisons/${c.id}`} className="text-xs font-bold text-orange-500 hover:underline flex-shrink-0">
          Full comparison →
        </a>
      </div>
    </div>
  );
}

// ─── COMPARISONS PAGE ────────────────────────────────────────────────────────

export default function ComparisonsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allComparisons.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="w-full min-h-screen bg-gray-50">

      {/* ── Page Hero ── */}
      <section className="w-full bg-white border-b border-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-2 flex items-center gap-2">
                <span className="w-4 h-px bg-orange-400 inline-block" />
                Head-to-Head
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Product <span className="text-orange-500">Comparisons</span>
              </h1>
              <p className="text-gray-400 text-sm mt-2 max-w-lg">
                We pit the best products head-to-head with real specs, honest scores, and clear verdicts — so you can buy with confidence.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 w-full sm:w-64">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search comparisons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { label: "Total Comparisons", value: allComparisons.length },
              { label: "Categories",         value: categories.length - 1 },
              { label: "Products Tested",    value: allComparisons.length * 2 },
              { label: "Total Views",        value: "15M+" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-2xl font-extrabold text-gray-900">{s.value}</span>
                <span className="text-xs text-gray-400 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section className="w-full bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-200"
              style={
                activeCategory === cat
                  ? { backgroundColor: "#f97316", color: "#fff", borderColor: "#f97316" }
                  : { backgroundColor: "transparent", color: "#6b7280", borderColor: "#e5e7eb" }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="w-full py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="font-bold text-lg text-gray-500">No comparisons found</p>
              <p className="text-sm mt-1">Try a different category or search term.</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-gray-400 font-medium mb-6">{filtered.length} comparison{filtered.length !== 1 ? "s" : ""} found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((c) => (
                  <FullComparisonCard key={c.id} c={c} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

    </main>
  );
}