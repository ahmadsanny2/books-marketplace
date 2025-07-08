import React, { ReactNode } from "react";
import Link from "next/link";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow px-6 py-8">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
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
