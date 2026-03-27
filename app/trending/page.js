// app/trending/page.tsx
import Link from "next/link";

const trendingArticles = [
  {
    rank: 1,
    category: "SMARTPHONES",
    title: "The 10 Best Smartphones of 2026",
    href: "/reviews/best-smartphones-2026",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    items: 10,
    views: "2.4M",
    badge: "🔥 On Fire",
    badgeColor: "#ef4444",
    description: "From AI-powered cameras to foldable displays — the definitive list of phones worth your money.",
    time: "2 days ago",
  },
  {
    rank: 2,
    category: "AUDIO",
    title: "Top Noise-Canceling Headphones for Travel",
    href: "/reviews/best-noise-canceling-headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    items: 8,
    views: "1.8M",
    badge: "Trending",
    badgeColor: "#f97316",
    description: "We tested 20+ pairs so you don't have to — here are the best ANC headphones for long flights.",
    time: "4 days ago",
  },
  {
    rank: 3,
    category: "LAPTOPS",
    title: "Best Gaming Laptops Under $1,500",
    href: "/reviews/best-gaming-laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    items: 5,
    views: "1.2M",
    badge: "Trending",
    badgeColor: "#f97316",
    description: "High refresh rates, powerful GPUs and great build quality — all without breaking the bank.",
    time: "6 days ago",
  },
  {
    rank: 4,
    category: "WEARABLES",
    title: "Best Smartwatches to Buy in 2026",
    href: "/reviews/best-smartwatches-2026",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
    items: 7,
    views: "980K",
    badge: null,
    badgeColor: null,
    description: "Health tracking, battery life, design — every angle covered to help you pick the right wrist companion.",
    time: "1 week ago",
  },
  {
    rank: 5,
    category: "GAMING",
    title: "Top Gaming Consoles Ranked for 2026",
    href: "/reviews/best-gaming-consoles-2026",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    items: 6,
    views: "870K",
    badge: null,
    badgeColor: null,
    description: "PS6, Xbox Series X2, Nintendo Switch 2 — we rank every current-gen console by value and performance.",
    time: "1 week ago",
  },
  {
    rank: 6,
    category: "CAMERAS",
    title: "Best Mirrorless Cameras for Beginners",
    href: "/reviews/best-mirrorless-cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    items: 9,
    views: "760K",
    badge: null,
    badgeColor: null,
    description: "Great image quality doesn't have to be complicated — these cameras make photography approachable.",
    time: "2 weeks ago",
  },
  {
    rank: 7,
    category: "SMART HOME",
    title: "Top Smart Home Devices That Make Life Easier",
    href: "/reviews/smart-home-devices",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    items: 12,
    views: "650K",
    badge: null,
    badgeColor: null,
    description: "From smart bulbs to robot vacuums — the gadgets that genuinely save you time and effort.",
    time: "2 weeks ago",
  },
  {
    rank: 8,
    category: "ACCESSORIES",
    title: "Best Phone Accessories Worth Buying Right Now",
    href: "/reviews/phone-accessories",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
    items: 10,
    views: "540K",
    badge: null,
    badgeColor: null,
    description: "Cases, chargers, stands and more — the accessories that actually add value to your daily setup.",
    time: "3 weeks ago",
  },
];

const categoryAccents = {
  SMARTPHONES: "#3b82f6",
  AUDIO:       "#6366f1",
  LAPTOPS:     "#8b5cf6",
  WEARABLES:   "#10b981",
  GAMING:      "#ef4444",
  CAMERAS:     "#ec4899",
  "SMART HOME":"#f59e0b",
  ACCESSORIES: "#f97316",
};

export default function TrendingPage() {
  const featured = trendingArticles[0];
  const rest = trendingArticles.slice(1);

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
            <span className="text-gray-400">Trending</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1 mb-3">
                <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">Right Now</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Trending <span className="text-orange-500">Articles</span>
              </h1>
              <p className="text-base text-gray-500 mt-3 max-w-lg leading-relaxed">
                The most-read reviews and buying guides this week — ranked by real readers.
              </p>
            </div>

            <div className="flex-shrink-0 flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-2xl px-5 py-3">
              <span className="text-3xl font-extrabold text-orange-500">{trendingArticles.length}</span>
              <div>
                <p className="text-xs font-bold text-gray-900 leading-tight">Total</p>
                <p className="text-xs text-gray-400 leading-tight">Articles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured #1 ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">
          # 1 — Most Read This Week
        </p>
        <Link
          href={featured.href}
          className="group relative flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
        >
          {/* Image */}
          <div className="relative w-full lg:w-1/2 h-64 lg:h-80 overflow-hidden flex-shrink-0">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span
                className="text-white text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: featured.badgeColor }}
              >
                {featured.badge}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-7 lg:p-10 gap-4">
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: categoryAccents[featured.category] || "#f97316" }}
            >
              {featured.category}
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors">
              {featured.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">{featured.description}</p>
            <div className="flex items-center gap-5 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {featured.views} views
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {featured.items} Items
              </span>
              <span>{featured.time}</span>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-bold text-orange-500 group-hover:gap-3 transition-all">
              Read Full Article
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </Link>
      </section>

      {/* ── Rest of List ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">
          More Trending
        </p>

        <div className="flex flex-col divide-y divide-gray-100">
          {rest.map((article) => (
            <Link
              key={article.rank}
              href={article.href}
              className="group flex items-center gap-5 py-5 hover:bg-orange-50/40 -mx-3 px-3 rounded-2xl transition-colors duration-200"
            >
              {/* Rank */}
              <span className="text-3xl font-extrabold text-gray-100 group-hover:text-orange-200 transition-colors w-10 flex-shrink-0 text-center leading-none">
                {String(article.rank).padStart(2, "0")}
              </span>

              {/* Thumbnail */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: categoryAccents[article.category] || "#f97316" }}
                >
                  {article.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug mt-0.5 group-hover:text-orange-500 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-1 hidden sm:block">
                  {article.description}
                </p>
              </div>

              {/* Meta */}
              <div className="hidden sm:flex flex-col items-end gap-1.5 flex-shrink-0 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {article.views}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {article.items} Items
                </span>
                <span>{article.time}</span>
              </div>

              {/* Arrow */}
              <svg className="w-4 h-4 text-gray-300 group-hover:text-orange-400 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}