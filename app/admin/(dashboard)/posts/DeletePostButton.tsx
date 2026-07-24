"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePostButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this post permanently? This cannot be undone.")) return;
    setLoading(true);
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="adm-btn adm-btn-danger adm-btn-sm">
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
