"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        width: "100%",
        padding: "0.6rem 0.75rem",
        borderRadius: 8,
        border: "1px solid rgba(18,33,27,0.16)",
        background: "transparent",
        color: "rgba(18,33,27,0.6)",
        fontFamily: "'Outfit', sans-serif",
        fontSize: "0.82rem",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {loading ? "Signing out..." : "Sign Out"}
    </button>
  );
}