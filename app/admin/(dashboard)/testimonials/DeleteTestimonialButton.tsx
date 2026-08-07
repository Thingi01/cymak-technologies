"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteTestimonialButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this testimonial permanently?")) return;
    setLoading(true);
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="adm-btn adm-btn-danger adm-btn-sm">
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}