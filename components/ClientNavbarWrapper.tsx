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
                  
                    <div className="">Logout</div>
                ) : null
            }
        />
    )
}
