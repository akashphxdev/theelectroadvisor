"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", slug: "", is_active: 1 });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setForm({ ...form, name, slug });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showMessage("Only image files are allowed", "error");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showMessage("Image size must be less than 2MB", "error");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

 const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("target", "categories");
  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
  const data = await res.json();
  return data.path ?? null;
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imagePath: string | null = null;

      if (imageFile) {
        imagePath = await uploadImage(imageFile);
        if (!imagePath) {
          showMessage("Image upload failed", "error");
          setLoading(false);
          return;
        }
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append("is_active", String(form.is_active));
      if (imagePath) formData.append("image_path", imagePath);

      const res = await fetch("/api/admin/categories", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        showMessage(data.message, "success");
        setTimeout(() => router.push("/admin/categories"), 1500);
      } else {
        showMessage(data.message, "error");
        setLoading(false);
      }
    } catch {
      showMessage("Something went wrong", "error");
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Category</h1>
          <p className="text-sm text-gray-400 mt-1">
            Fill in the details to create a new category
          </p>
        </div>
        <Link
          href="/admin/categories"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          ← Back to Categories
        </Link>
      </div>

      {/* Message */}
      {message.text && (
        <div
          className={`mb-5 p-3 rounded-md text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={handleNameChange}
              required
              autoFocus
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="e.g. Electronics"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-mono"
              placeholder="e.g. electronics"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              Auto-generated from name. You can also edit it manually.
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={form.is_active}
              onChange={(e) =>
                setForm({ ...form, is_active: Number(e.target.value) })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          {/* Icon Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Icon{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>

            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                <div className="flex flex-col items-center gap-1 text-gray-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">Click to upload image</span>
                  <span className="text-xs">PNG, JPG, WEBP — Max 2MB</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            ) : (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 group">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  sizes="128px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <span className="text-white text-xs font-medium">Remove</span>
                </button>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create Category"
                )}
              </button>
              <Link
                href="/admin/categories"
                className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </Link>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}