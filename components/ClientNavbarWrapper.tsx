// components/ClientNavbarWrapper.tsx
"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "./navbar"
import Link from "next/link"

export default function ClientNavbarWrapper() {
    const pathname = usePathname()
    const showOtherMenu = pathname.startsWith("/admin")

    return (
        <Navbar
            otherMenu={
                showOtherMenu ? (
                    // <nav className="space-y-4">
                    //     <Link href="/admin/dashboard" className="block text-gray-700 font-medium">
                    //         Dashboard
                    //     </Link>
                    //     <Link href="/admin/manage-products" className="block text-gray-600 hover:text-gray-800">
                    //         Produk
                    //     </Link>
                    //     <Link href="/admin/users" className="block text-gray-600 hover:text-gray-800">
                    //         Pengguna
                    //     </Link>
                    //     <Link href="/admin/settings" className="block text-gray-600 hover:text-gray-800">
                    //         Pengaturan
                    //     </Link>
                    // </nav>
                    <div className=""></div>
                ) : null
            }
        />
    )
}
