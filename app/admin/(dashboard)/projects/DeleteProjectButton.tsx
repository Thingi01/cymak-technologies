"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this project permanently?")) return;
    setLoading(true);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="adm-btn adm-btn-danger adm-btn-sm">
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
