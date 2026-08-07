"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "../ImageUploadField";

export interface TestimonialFormData {
  id?: string;
  clientName: string;
  role: string;
  company: string;
  quote: string;
  photo: string | null;
  published: boolean;
  order: number;
}

export default function TestimonialForm({ initial }: { initial?: TestimonialFormData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [form, setForm] = useState<TestimonialFormData>(
    initial ?? {
      clientName: "",
      role: "",
      company: "",
      quote: "",
      photo: null,
      published: true,
      order: 0,
    }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof TestimonialFormData>(key: K, value: TestimonialFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/admin/testimonials/${initial!.id}` : "/api/admin/testimonials";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save testimonial");
      router.push("/admin/testimonials");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="adm-card" style={{ maxWidth: 640 }}>
      {error && <p className="adm-error">{error}</p>}

      <div className="adm-form-row-2">
        <div className="adm-field">
          <label className="adm-label">Client Name</label>
          <input className="adm-input" value={form.clientName} onChange={(e) => update("clientName", e.target.value)} required />
        </div>
        <div className="adm-field">
          <label className="adm-label">Role (optional)</label>
          <input className="adm-input" value={form.role} onChange={(e) => update("role", e.target.value)} placeholder="e.g. Owner" />
        </div>
      </div>

      <div className="adm-field">
        <label className="adm-label">Company</label>
        <input className="adm-input" value={form.company} onChange={(e) => update("company", e.target.value)} required />
      </div>

      <div className="adm-field">
        <label className="adm-label">Quote</label>
        <textarea
          className="adm-textarea"
          style={{ minHeight: 120, fontFamily: "inherit" }}
          value={form.quote}
          onChange={(e) => update("quote", e.target.value)}
          required
        />
      </div>

      <ImageUploadField value={form.photo} onChange={(url) => update("photo", url)} folder="testimonials" />

      <div className="adm-field">
        <label className="adm-label">Display Order (lower shows first)</label>
        <input
          type="number"
          className="adm-input"
          value={form.order}
          onChange={(e) => update("order", Number(e.target.value))}
        />
      </div>

      <div className="adm-field">
        <label className="adm-checkbox-row">
          <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} />
          Published (visible on the live site)
        </label>
      </div>

      <button type="submit" disabled={saving} className="adm-btn">
        {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Testimonial"}
      </button>
    </form>
  );
}