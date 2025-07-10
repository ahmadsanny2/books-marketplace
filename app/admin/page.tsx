// app/admin/page.tsx
import { redirect } from "next/navigation";

export default function AdminRedirect() {
    redirect("/login");
}
