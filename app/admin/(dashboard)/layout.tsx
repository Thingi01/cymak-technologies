import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LogoutButton from "./LogoutButton";
import "../admin.css";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="adm-shell">
      <aside className="adm-sidebar">
        <div className="adm-sidebar-logo">CYMAK Admin</div>
        <div className="adm-sidebar-user">{session.name}</div>

        <nav className="adm-nav">
  <Link href="/admin" className="adm-nav-link">Dashboard</Link>
  <Link href="/admin/posts" className="adm-nav-link">Blog Posts</Link>
  <Link href="/admin/projects" className="adm-nav-link">Projects</Link>
  <Link href="/admin/testimonials" className="adm-nav-link">Testimonials</Link>
  <Link href="/admin/leads" className="adm-nav-link">Leads</Link>
</nav>

        <div className="adm-sidebar-foot">
          <LogoutButton />
        </div>

        <Link href="/" className="adm-sidebar-back">← Back to site</Link>
      </aside>

      <main className="adm-main">{children}</main>
    </div>
  );
}