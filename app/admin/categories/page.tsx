"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  is_active: number;
  created_at: string;
  image_url: string | null;
}

interface MessageState {
  text: string;
  type: "success" | "error" | "";
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<MessageState>({ text: "", type: "" });

  // ✅ Fix 1: useCallback mein wrap — stable reference
  const showMessage = useCallback((text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  }, []);

  // ✅ Fix 2: fetchCategories useCallback mein — delete ke baad call ke liye
  const fetchCategories = useCallback(async () => {
    setFetchLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.success) setCategories(data.data as Category[]);
      else showMessage("Failed to load categories", "error");
    } catch {
      showMessage("Failed to load categories", "error");
    } finally {
      setFetchLoading(false);
    }
  }, [showMessage]);

  // ✅ Fix 3: useEffect mein inline async load + cancelled flag (cleanup)
  // setState sirf async callback ke andar call ho raha hai — synchronous nahi
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setFetchLoading(true);
      try {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        if (cancelled) return;
        if (data.success) setCategories(data.data as Category[]);
        else showMessage("Failed to load categories", "error");
      } catch {
        if (!cancelled) showMessage("Failed to load categories", "error");
      } finally {
        if (!cancelled) setFetchLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [showMessage]);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`/api/admin/categories/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showMessage(data.message as string, "success");
        fetchCategories();
      } else {
        showMessage(data.message as string, "error");
      }
    } catch {
      showMessage("Failed to delete", "error");
    }
  };

  const isValidImageUrl = (url: string | null | undefined): boolean => {
    if (!url || typeof url !== "string" || url.trim() === "") return false;
    return true;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        <Link
          href="/admin/categories/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
        >
          + Add Category
        </Link>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`mb-4 p-3 rounded text-sm font-medium ${
          message.type === "success"
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-red-100 text-red-700 border border-red-300"
        }`}>
          {message.text}
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-700">All Categories</h2>
          <span className="text-sm text-gray-400">Total: {categories.length}</span>
        </div>

        {fetchLoading ? (
          <div className="text-center py-10 text-gray-400 text-sm">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-medium w-12">#</th>
                <th className="px-6 py-3 font-medium">Icon</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Slug</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Created At</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400 text-sm">
                    No categories found.{" "}
                    <Link href="/admin/categories/create" className="text-blue-500 underline">
                      Add one now!
                    </Link>
                  </td>
                </tr>
              ) : (
                categories.map((cat: Category, i: number) => (
                  <tr key={cat.slug} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-500">{i + 1}</td>
                    <td className="px-6 py-4">
                      {isValidImageUrl(cat.image_url) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cat.image_url!}
                          alt={cat.name}
                          width={36}
                          height={36}
                          className="rounded-md object-cover border border-gray-200 w-9 h-9"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = "none";
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="w-9 h-9 rounded-md bg-gray-100 items-center justify-center text-gray-300 text-lg border border-gray-200"
                        style={{ display: isValidImageUrl(cat.image_url) ? "none" : "flex" }}
                      >
                        🖼️
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{cat.name}</td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {cat.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        cat.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        {cat.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      {new Date(cat.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit", month: "short", year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/categories/edit/${cat.slug}`}
                          className="border border-gray-300 text-gray-600 px-3 py-1 rounded text-xs font-medium hover:bg-gray-100 transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(cat.slug)}
                          className="border border-gray-300 text-gray-600 px-3 py-1 rounded text-xs font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}