'use client';

import AdminLayout from "@/components/layouts/AdminLayout";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
    const supabase = useSupabaseClient(); // ✅
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login");
            }
        };

        checkAuth();
    }, []);

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold">Books Store</h1>
        </AdminLayout>
    );
}
