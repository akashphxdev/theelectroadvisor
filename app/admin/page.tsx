"use client";

import { useState, useEffect } from "react";

// ✅ Fix 1: Proper typed color array
const categoryColors: string[] = [
  "#3b82f6", "#8b5cf6", "#6366f1", "#ef4444",
  "#10b981", "#ec4899", "#f97316", "#f59e0b",
];

// ✅ Fix 2: Index signature added to statusStyle
const statusStyle: Record<string, { bg: string; text: string }> = {
  Published: { bg: "bg-green-50",  text: "text-green-700"  },
  Draft:     { bg: "bg-gray-100",  text: "text-gray-500"   },
  Review:    { bg: "bg-yellow-50", text: "text-yellow-700" },
};

// ✅ Fix 3: StatCard props interface defined
interface StatCardProps {
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: React.ReactNode;
  color: string;
  bg: string;
  loading: boolean;
}

// ✅ Fix 4: DashboardData interface defined
interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  status: string;
  views: number;
  date: string;
}

interface Category {
  name: string;
  articles: number;
  views: number;
  pct: number;
}

interface DashboardData {
  stats: {
    totalArticles: number;
    totalCategories: number;
    totalAuthors: number;
    totalViews: number;
  };
  recentArticles: Article[];
  topCategories: Category[];
}

// ✅ Fix 5: quickLinks moved inside component OR icons extracted as variables
// Keeping it outside but using a function to avoid JSX-at-module-level issues
const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const AuthorIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);

const quickLinks = [
  { label: "New Article",   href: "/admin/articles/create",    color: "#3b82f6", icon: <PlusIcon /> },
  { label: "Add Category",  href: "/admin/categories/create",  color: "#8b5cf6", icon: <PlusIcon /> },
  { label: "Add Author",    href: "/admin/authors",            color: "#10b981", icon: <AuthorIcon /> },
];

function StatCard({ label, value, change, up, icon, color, bg, loading }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: bg, color }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        {loading ? (
          <div className="h-7 w-16 bg-gray-100 rounded animate-pulse mt-1" />
        ) : (
          <p className="text-2xl font-extrabold text-gray-900 mt-0.5">{value}</p>
        )}
        <p
          className="text-xs mt-1 flex items-center gap-1"
          style={{ color: up ? "#16a34a" : "#9ca3af" }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          {change}
        </p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  // ✅ Fix 6: data state properly typed
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((d: DashboardData) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load dashboard.");
        setLoading(false);
      });
  }, []);

  const stats: StatCardProps[] = data
    ? [
        {
          label: "Total Articles",
          value: String(data.stats.totalArticles),
          change: "All time",
          up: true,
          color: "#3b82f6",
          bg: "#eff6ff",
          loading: false,
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
        },
        {
          label: "Categories",
          value: String(data.stats.totalCategories),
          change: "All time",
          up: true,
          color: "#8b5cf6",
          bg: "#f5f3ff",
          loading: false,
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          ),
        },
        {
          label: "Authors",
          value: String(data.stats.totalAuthors),
          change: "All time",
          up: true,
          color: "#10b981",
          bg: "#ecfdf5",
          loading: false,
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
        },
        {
          label: "Total Views",
          value: String(data.stats.totalViews),
          change: "All articles",
          up: true,
          color: "#f97316",
          bg: "#fff7ed",
          loading: false,
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          ),
        },
      ]
    : [];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">{today}</p>
        </div>
        <a
          href="/admin/articles/create"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors w-fit"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Article
        </a>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                <div className="h-7 w-14 bg-gray-100 rounded animate-pulse" />
                <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ))
        ) : (
          stats.map((s) => <StatCard key={s.label} {...s} />)
        )}
      </div>

      {/* Main area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Articles Table */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Recent Articles</h2>
            <a href="/admin/articles" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              View all →
            </a>
          </div>

          {loading ? (
            <div className="space-y-0">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-gray-50">
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-3/4 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 w-1/3 bg-gray-100 rounded animate-pulse" />
                  </div>
                  <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-5 w-12 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : data?.recentArticles?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <svg className="w-10 h-10 mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm">No articles yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-50">
                    <th className="text-left px-6 py-3">Title</th>
                    <th className="text-left px-4 py-3">Category</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Views</th>
                    <th className="text-left px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data?.recentArticles.map((a: Article) => {
                    const s = statusStyle[a.status] ?? statusStyle["Draft"];
                    return (
                      <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3.5">
                          <p className="font-medium text-gray-900 line-clamp-1 max-w-xs">{a.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{a.author}</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                            {a.category}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-gray-500 text-xs">{a.views}</td>
                        <td className="px-4 py-3.5 text-gray-400 text-xs whitespace-nowrap">{a.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-5">

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((q) => (
                <a
                  key={q.label}
                  href={q.href}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group text-center"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: q.color }}
                  >
                    {q.icon}
                  </div>
                  <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-900 leading-tight">
                    {q.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Top Categories</h2>
              <a href="/admin/categories/create" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                View all →
              </a>
            </div>
            {loading ? (
              <div className="space-y-4">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between">
                      <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                      <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3.5">
                {(data?.topCategories ?? []).map((c: Category, i: number) => (
                  <div key={c.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-700">{c.name}</span>
                      <span className="text-xs text-gray-400">{c.articles} articles · {c.views} views</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${c.pct}%`,
                          // ✅ Fix 7: nullish fallback for array index access
                          backgroundColor: categoryColors[i % categoryColors.length] ?? "#3b82f6",
                        }}
                      />
                    </div>
                  </div>
                ))}
                {(!data?.topCategories || data.topCategories.length === 0) && (
                  <p className="text-xs text-gray-400 text-center py-4">No categories yet</p>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}