import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LogoutButton from "./LogoutButton";
import "../admin.css";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#f5f8f6" }}>
      <aside
        style={{
          width: 220,
          borderRight: "1px solid rgba(18,33,27,0.10)",
          background: "#ffffff",
          padding: "1.5rem 1rem",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            color: "#146c43",
            fontSize: "1.1rem",
            marginBottom: "0.3rem",
            padding: "0 0.5rem",
          }}
        >
          CYMAK Admin
        </div>
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.72rem",
            color: "rgba(18,33,27,0.45)",
            marginBottom: "1.8rem",
            padding: "0 0.5rem",
          }}
        >
          {session.name}
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <NavLink href="/admin">Dashboard</NavLink>
          <NavLink href="/admin/posts">Blog Posts</NavLink>
          <NavLink href="/admin/projects">Projects</NavLink>
          <NavLink href="/admin/leads">Leads</NavLink>
        </nav>

        <div style={{ marginTop: "2rem", padding: "0 0.5rem" }}>
          <LogoutButton />
        </div>

        <div style={{ marginTop: "1.5rem", padding: "0 0.5rem" }}>
          <Link
            href="/"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(18,33,27,0.4)",
              textDecoration: "none",
            }}
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      <main style={{ flex: 1, padding: "2rem 2.5rem", overflowX: "auto" }}>{children}</main>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "0.88rem",
        fontWeight: 500,
        color: "rgba(18,33,27,0.65)",
        textDecoration: "none",
        padding: "0.6rem 0.75rem",
        borderRadius: 8,
        display: "block",
      }}
    >
      {children}
    </Link>
  );
}