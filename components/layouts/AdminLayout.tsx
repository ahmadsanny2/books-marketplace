"use client"

import React, { ReactNode, useState } from "react";
import Link from "next/link";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [aside, setAside] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={` bg-white shadow px-2 lg:px-6 py-8 ${(aside) ? "max-lg:fixed max-lg:z-50 max-lg:h-full" : ""}`}>
        <div className="flex justify-between">
          <h2 className={`text-xl font-bold mb-8 ${(aside) ? "" : "max-lg:hidden"}`}>Admin Panel</h2>
          <div className="hidden max-lg:block cursor-pointer text-2xl" onClick={() => setAside(!aside)}>{aside ? "<" : ">"}</div>
        </div>
        <nav className={`space-y-4 ${(aside) ? "fixed h-full" : "max-lg:hidden"}`}>
          <Link href="/admin/dashboard" className="block text-gray-700 font-medium">
            Dashboard
          </Link>
          <Link href="/admin/manage-products" className="block text-gray-600 hover:text-gray-800">
            Produk
          </Link>
          <Link href="/admin/users" className="block text-gray-600 hover:text-gray-800">
            Pengguna
          </Link>
          <Link href="/admin/settings" className="block text-gray-600 hover:text-gray-800">
            Pengaturan
          </Link>
        </nav>

      </aside>

      {/* Halaman */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
