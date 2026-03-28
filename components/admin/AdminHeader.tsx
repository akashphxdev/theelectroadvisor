"use client";

export default function AdminHeader() {
  return (
    <div className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Overview</h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Admin</span>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}