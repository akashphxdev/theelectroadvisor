// "use client";
// import { useEffect, useState, use } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";

// interface Props {
//   params: Promise<{ slug: string }>;
// }

// export default function EditCategoryPage({ params }: Props) {
//   const { slug } = use(params);
//   const router = useRouter();
//   const [form, setForm] = useState({ name: "", slug: "", is_active: 1 });
//   const [existingImage, setExistingImage] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [removeExisting, setRemoveExisting] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [notFound, setNotFound] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         const res = await fetch("/api/admin/categories");
//         const data = await res.json();
//         if (data.success) {
//           const cat = data.data.find((c: any) => c.slug === slug);
//           if (cat) {
//             setForm({ name: cat.name, slug: cat.slug, is_active: cat.is_active });
//             setExistingImage(cat.image_url || null);
//           } else {
//             setNotFound(true);
//           }
//         }
//       } catch {
//         setNotFound(true);
//       }
//       setFetchLoading(false);
//     };
//     fetchCategory();
//   }, [slug]);

//   const showMessage = (text: string, type: "success" | "error") => {
//     setMessage({ text, type });
//     setTimeout(() => setMessage({ text: "", type: "" }), 3000);
//   };

//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const name = e.target.value;
//     const autoSlug = name
//       .toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^a-z0-9-]/g, "");
//     setForm({ ...form, name, slug: autoSlug });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!file.type.startsWith("image/")) {
//       showMessage("Only image files are allowed", "error");
//       return;
//     }
//     if (file.size > 2 * 1024 * 1024) {
//       showMessage("Image size must be less than 2MB", "error");
//       return;
//     }
//     setImageFile(file);
//     setImagePreview(URL.createObjectURL(file));
//     setRemoveExisting(false);
//   };

//   const handleRemoveNew = () => {
//     setImageFile(null);
//     setImagePreview(null);
//   };

//   const handleRemoveExisting = () => {
//     setRemoveExisting(true);
//     setExistingImage(null);
//   };

//   const uploadImage = async (file: File): Promise<string | null> => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("target", "categories");
//     const res = await fetch("/api/admin/upload", {
//       method: "POST",
//       body: formData,
//     });
//     const data = await res.json();
//     return data.path ?? null;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       let imagePath: string | null = null;

//       if (imageFile) {
//         imagePath = await uploadImage(imageFile);
//         if (!imagePath) {
//           showMessage("Image upload failed", "error");
//           setLoading(false);
//           return;
//         }
//       }

//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("slug", form.slug);
//       formData.append("is_active", String(form.is_active));
//       if (imagePath) formData.append("image_path", imagePath);
//       if (removeExisting) formData.append("remove_image", "true");

//       const res = await fetch(`/api/admin/categories/${slug}`, {
//         method: "PUT",
//         body: formData,
//       });

//       const data = await res.json();
//       if (data.success) {
//         showMessage(data.message, "success");
//         setTimeout(() => router.push("/admin/categories"), 1500);
//       } else {
//         showMessage(data.message, "error");
//         setLoading(false);
//       }
//     } catch {
//       showMessage("Something went wrong", "error");
//       setLoading(false);
//     }
//   };

//   if (fetchLoading) {
//     return (
//       <div className="p-6 flex items-center justify-center min-h-40">
//         <div className="flex items-center gap-2 text-gray-400 text-sm">
//           <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//           </svg>
//           Loading...
//         </div>
//       </div>
//     );
//   }

//   if (notFound) {
//     return (
//       <div className="p-6 text-center">
//         <p className="text-gray-500 mb-4 text-sm">Category not found.</p>
//         <Link href="/admin/categories" className="text-blue-500 underline text-sm">
//           ← Back to Categories
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Edit Category</h1>
//           <p className="text-sm text-gray-400 mt-1">Update the details for this category</p>
//         </div>
//         <Link href="/admin/categories" className="text-sm text-gray-500 hover:text-gray-800 transition">
//           ← Back to Categories
//         </Link>
//       </div>

//       {/* Message */}
//       {message.text && (
//         <div className={`mb-5 p-3 rounded-md text-sm font-medium ${
//           message.type === "success"
//             ? "bg-green-50 text-green-700 border border-green-200"
//             : "bg-red-50 text-red-700 border border-red-200"
//         }`}>
//           {message.text}
//         </div>
//       )}

//       <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-2xl">

//         {/* Current slug info */}
//         <div className="mb-5 p-3 bg-gray-50 rounded-lg border border-gray-200">
//           <p className="text-xs text-gray-400">Editing category with slug:</p>
//           <p className="text-sm font-mono text-gray-600 mt-0.5">{slug}</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category Name <span className="text-red-400">*</span>
//             </label>
//             <input
//               type="text"
//               value={form.name}
//               onChange={handleNameChange}
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               placeholder="e.g. Electronics"
//             />
//           </div>

//           {/* Slug */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Slug <span className="text-red-400">*</span>
//             </label>
//             <input
//               type="text"
//               value={form.slug}
//               onChange={(e) => setForm({ ...form, slug: e.target.value })}
//               required
//               className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 bg-gray-50 font-mono placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               placeholder="e.g. electronics"
//             />
//             <p className="text-xs text-gray-400 mt-1.5">
//               Auto-generated from name. You can also edit it manually.
//             </p>
//           </div>

//           {/* Status */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//             <select
//               value={form.is_active}
//               onChange={(e) => setForm({ ...form, is_active: Number(e.target.value) })}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//             >
//               <option value={1}>Active</option>
//               <option value={0}>Inactive</option>
//             </select>
//           </div>

//           {/* Category Icon */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Category Icon{" "}
//               <span className="text-gray-400 font-normal">(optional)</span>
//             </label>

//             {imagePreview ? (
//               // Nai image preview
//               <div className="flex items-center gap-4">
//                 <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
//                   <Image
//                     src={imagePreview}
//                     alt="New preview"
//                     fill
//                     sizes="96px"
//                     className="object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleRemoveNew}
//                     className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
//                   >
//                     <span className="text-white text-xs font-medium">Remove</span>
//                   </button>
//                 </div>
//                 <div className="text-xs text-gray-400">
//                   <p className="text-green-600 font-medium">✓ New image selected</p>
//                   <p>This will replace the existing icon</p>
//                 </div>
//               </div>

//             ) : existingImage ? (
//               // Existing image DB se
//               <div className="flex items-center gap-4">
//                 <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
//                   <img
//                       src={existingImage}
//                       alt="Current icon"
//                       className="object-cover w-full h-full"
//                     />
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <p className="text-xs text-gray-500">Current icon</p>
//                   <label className="cursor-pointer text-xs text-blue-600 hover:underline font-medium">
//                     Change Image
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleImageChange}
//                     />
//                   </label>
//                   <button
//                     type="button"
//                     onClick={handleRemoveExisting}
//                     className="text-xs text-red-500 hover:underline font-medium text-left"
//                   >
//                     Remove Image
//                   </button>
//                 </div>
//               </div>

//             ) : (
//               // Koi image nahi - upload box
//               <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
//                 <div className="flex flex-col items-center gap-1 text-gray-400">
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//                       d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                     />
//                   </svg>
//                   <span className="text-sm">Click to upload image</span>
//                   <span className="text-xs">PNG, JPG, WEBP — Max 2MB</span>
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImageChange}
//                 />
//               </label>
//             )}
//           </div>

//           {/* Buttons */}
//           <div className="border-t border-gray-100 pt-4 flex gap-3">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
//             >
//               {loading ? (
//                 <span className="flex items-center gap-2">
//                   <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                   </svg>
//                   Updating...
//                 </span>
//               ) : (
//                 "Update Category"
//               )}
//             </button>
//             <Link
//               href="/admin/categories"
//               className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
//             >
//               Cancel
//             </Link>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }



"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

const PROTECTED_SLUGS = ["reviews", "comparsion"];

export default function EditCategoryPage({ params }: Props) {
  const { slug } = use(params);
  const router = useRouter();
  const isProtected = PROTECTED_SLUGS.includes(slug);

  const [form, setForm] = useState({ name: "", slug: "", is_active: 1 });
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeExisting, setRemoveExisting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        if (data.success) {
          const cat = data.data.find((c: any) => c.slug === slug);
          if (cat) {
            setForm({ name: cat.name, slug: cat.slug, is_active: cat.is_active });
            setExistingImage(cat.image_url || null);
          } else {
            setNotFound(true);
          }
        }
      } catch {
        setNotFound(true);
      }
      setFetchLoading(false);
    };
    fetchCategory();
  }, [slug]);

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProtected) return; // 🔒 Protected - change mat karo
    const name = e.target.value;
    const autoSlug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setForm({ ...form, name, slug: autoSlug });
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
    setRemoveExisting(false);
  };

  const handleRemoveNew = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleRemoveExisting = () => {
    setRemoveExisting(true);
    setExistingImage(null);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("target", "categories");
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
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
      if (removeExisting) formData.append("remove_image", "true");

      const res = await fetch(`/api/admin/categories/${slug}`, {
        method: "PUT",
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

  if (fetchLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-40">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading...
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4 text-sm">Category not found.</p>
        <Link href="/admin/categories" className="text-blue-500 underline text-sm">
          ← Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Edit Category</h1>
          <p className="text-sm text-gray-400 mt-1">Update the details for this category</p>
        </div>
        <Link href="/admin/categories" className="text-sm text-gray-500 hover:text-gray-800 transition">
          ← Back to Categories
        </Link>
      </div>

      {/* 🔒 Protected Category Warning Banner */}
      {isProtected && (
        <div className="mb-5 p-4 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-3">
          <div className="mt-0.5">
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-11a7 7 0 100 14A7 7 0 0012 4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v4" />
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-700">🔒 Protected Category</p>
            <p className="text-xs text-amber-600 mt-0.5">
              This is a system category. <strong>Name</strong> and <strong>Slug</strong> cannot be changed.
              Only the <strong>icon/image</strong> can be updated.
            </p>
          </div>
        </div>
      )}

      {/* Message */}
      {message.text && (
        <div className={`mb-5 p-3 rounded-md text-sm font-medium ${
          message.type === "success"
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-2xl">

        {/* Current slug info */}
        <div className="mb-5 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-400">Editing category with slug:</p>
          <p className="text-sm font-mono text-gray-600 mt-0.5">{slug}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name <span className="text-red-400">*</span>
              {isProtected && (
                <span className="ml-2 text-xs text-amber-600 font-normal bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  🔒 Locked
                </span>
              )}
            </label>
            <input
              type="text"
              value={form.name}
              onChange={handleNameChange}
              required
              disabled={isProtected}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none transition ${
                isProtected
                  ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed select-none"
                  : "border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }`}
              placeholder="e.g. Electronics"
            />
            {isProtected && (
              <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
                🔒 Name cannot be changed for this category
              </p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug <span className="text-red-400">*</span>
              {isProtected && (
                <span className="ml-2 text-xs text-amber-600 font-normal bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  🔒 Locked
                </span>
              )}
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => {
                if (!isProtected) setForm({ ...form, slug: e.target.value });
              }}
              required
              disabled={isProtected}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm font-mono placeholder-gray-400 focus:outline-none transition ${
                isProtected
                  ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed select-none"
                  : "border-gray-300 text-gray-600 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }`}
              placeholder="e.g. electronics"
            />
            {isProtected ? (
              <p className="text-xs text-amber-600 mt-1.5">
                🔒 Slug cannot be changed for this category
              </p>
            ) : (
              <p className="text-xs text-gray-400 mt-1.5">
                Auto-generated from name. You can also edit it manually.
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: Number(e.target.value) })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          {/* Category Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Icon{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
              {isProtected && (
                <span className="ml-2 text-xs text-green-600 font-normal bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                  ✅ Editable
                </span>
              )}
            </label>

            {imagePreview ? (
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
                  <Image
                    src={imagePreview}
                    alt="New preview"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveNew}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <span className="text-white text-xs font-medium">Remove</span>
                  </button>
                </div>
                <div className="text-xs text-gray-400">
                  <p className="text-green-600 font-medium">✓ New image selected</p>
                  <p>This will replace the existing icon</p>
                </div>
              </div>

            ) : existingImage ? (
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={existingImage}
                    alt="Current icon"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-500">Current icon</p>
                  <label className="cursor-pointer text-xs text-blue-600 hover:underline font-medium">
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleRemoveExisting}
                    className="text-xs text-red-500 hover:underline font-medium text-left"
                  >
                    Remove Image
                  </button>
                </div>
              </div>

            ) : (
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
            )}
          </div>

          {/* Buttons */}
          <div className="border-t border-gray-100 pt-4 flex gap-3">
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
                  Updating...
                </span>
              ) : (
                "Update Category"
              )}
            </button>
            <Link
              href="/admin/categories"
              className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
            >
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}