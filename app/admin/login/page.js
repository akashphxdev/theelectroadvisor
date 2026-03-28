"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      document.cookie = `adminToken=${data.token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
      router.push("/admin");
    } catch {
      setError("Server error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 font-sans relative overflow-hidden">

      {/* Subtle background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange-50 blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-orange-50 blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute top-8 right-8 w-24 h-24 rounded-full border border-orange-100 pointer-events-none" />
      <div className="absolute top-14 right-14 w-10 h-10 rounded-full border border-orange-100 pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 bg-orange-500 flex items-center justify-center rounded-lg shadow-lg shadow-orange-500/30">
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
            </svg>
          </div>
          <span className="text-gray-900 text-xs font-bold tracking-[3px] uppercase">
            The Electro Advisor
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-gray-600 uppercase">Admin Portal</span>
          </div>
          <h1 className="text-gray-900 text-2xl font-extrabold tracking-tight leading-tight">
            Sign in to continue
          </h1>
          <p className="text-gray-400 text-sm mt-1.5">Enter your credentials to access the dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-gray-500 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@electroadvisor.com"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused("")}
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-gray-50 border text-gray-900 text-sm placeholder-gray-300 outline-none rounded-xl transition-all duration-200"
              style={{
                borderColor: focused === "email" ? "#f97316" : "#e5e7eb",
                boxShadow: focused === "email" ? "0 0 0 3px rgba(249,115,22,0.08)" : "none",
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-bold tracking-[1.5px] uppercase text-gray-500 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 pr-11 bg-gray-50 border text-gray-900 text-sm placeholder-gray-300 outline-none rounded-xl transition-all duration-200"
                style={{
                  borderColor: focused === "password" ? "#f97316" : "#e5e7eb",
                  boxShadow: focused === "password" ? "0 0 0 3px rgba(249,115,22,0.08)" : "none",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 border border-red-200 bg-red-50 px-4 py-3 rounded-xl text-red-500 text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
                <line x1="12" y1="8" x2="12" y2="12" strokeWidth="1.8" />
                <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold tracking-[2px] uppercase py-3.5 flex items-center justify-center gap-2.5 transition-all duration-200 rounded-xl mt-2"
            style={{ boxShadow: loading ? "none" : "0 4px 20px rgba(0,0,0,0.12)" }}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating
              </>
            ) : (
              <>
                Sign In
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>

        <p className="text-center text-gray-300 text-xs mt-8 tracking-wide">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}