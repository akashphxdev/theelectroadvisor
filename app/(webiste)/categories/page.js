// app/categories/page.tsx
import Link from "next/link";

const categories = [
  {
    name: "Smartphones",
    href: "/categories/smartphones",
    description: "Flagship killers, foldables & budget picks — every phone worth your money.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    accent: "#3b82f6",
    count: 48,
    badge: "Most Popular",
  },
  {
    name: "Laptops",
    href: "/categories/laptops",
    description: "From ultrabooks to gaming rigs — the best machines for every workflow.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    accent: "#8b5cf6",
    count: 36,
    badge: "Trending",
  },
  {
    name: "Audio",
    href: "/categories/audio",
    description: "Headphones, earbuds & speakers tested for every ear and every budget.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    accent: "#6366f1",
    count: 29,
    badge: null,
  },
  {
    name: "Wearables",
    href: "/categories/wearables",
    description: "Smartwatches and fitness trackers that actually improve your life.",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
    accent: "#10b981",
    count: 22,
    badge: null,
  },
  {
    name: "Smart Home",
    href: "/categories/smart-home",
    description: "Build a smarter home — speakers, bulbs, doorbells & everything in between.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    accent: "#f59e0b",
    count: 31,
    badge: "Editor's Pick",
  },
  {
    name: "Gaming",
    href: "/categories/gaming",
    description: "Consoles, accessories & peripherals for every kind of gamer.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    accent: "#ef4444",
    count: 27,
    badge: "Hot",
  },
  {
    name: "Cameras",
    href: "/categories/cameras",
    description: "Mirrorless, DSLR, action & compact — capture every moment in style.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    accent: "#ec4899",
    count: 19,
    badge: null,
  },
  {
    name: "Accessories",
    href: "/categories/accessories",
    description: "Chargers, hubs, cases & cables — the essentials that complete your setup.",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
    accent: "#f97316",
    count: 44,
    badge: null,
  },
];

const stats = [
  { value: "500+", label: "Products Reviewed" },
  { value: "8",    label: "Categories"        },
  { value: "2M+",  label: "Monthly Readers"   },
  { value: "100%", label: "Independent"       },
];

export default function CategoriesPage() {
  return (
    <main className="w-full min-h-screen bg-white">

      {/* ── Hero Banner ── */}
 {/* ── Hero Banner ── */}
<section className="w-full bg-white border-b border-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

    {/* Breadcrumb */}
    <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
      <Link href="/" className="hover:text-orange-500 transition-colors font-medium text-gray-500">Home</Link>
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <span className="text-gray-400">All Categories</span>
    </div>

    {/* Heading */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          All <span className="text-orange-500">Categories</span>
        </h1>
        <p className="text-base text-gray-500 mt-3 max-w-lg leading-relaxed">
          Honest, in-depth reviews across every major tech category — so you always buy right.
        </p>
      </div>

      {/* Total count badge */}
      <div className="flex-shrink-0 flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-2xl px-5 py-3">
        <span className="text-3xl font-extrabold text-orange-500">{categories.length}</span>
        <div>
          <p className="text-xs font-bold text-gray-900 leading-tight">Total</p>
          <p className="text-xs text-gray-400 leading-tight">Categories</p>
        </div>
      </div>
    </div>

  </div>
</section>
      {/* ── Category Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">Explore</p>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {categories.length} Categories
            </h2>
          </div>
          <p className="text-sm text-gray-400 hidden sm:block">
            Click any category to explore reviews & guides
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              {/* Image */}
              <div className="relative w-full h-44 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  style={{ transition: "transform 0.5s ease" }}
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to top, ${cat.accent}cc 0%, ${cat.accent}33 60%, transparent 100%)` }}
                />
                {/* Dark base overlay always */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Badge */}
                {cat.badge && (
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-white text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: cat.accent }}
                    >
                      {cat.badge}
                    </span>
                  </div>
                )}

                {/* Article count */}
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {cat.count} Reviews
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-4 gap-2">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-base font-extrabold text-gray-900 group-hover:transition-colors duration-200"
                    style={{ "--hover-color": cat.accent }}
                  >
                    <span className="group-hover:text-[var(--hover-color)] transition-colors duration-200">
                      {cat.name}
                    </span>
                  </h3>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0"
                    style={{ backgroundColor: `${cat.accent}20` }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke={cat.accent} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{cat.description}</p>

                {/* Bottom accent line */}
                <div
                  className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                  style={{ color: cat.accent }}
                >
                  <span>Explore {cat.name}</span>
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}