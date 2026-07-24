"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "../ImageUploadField";

export interface ProjectFormData {
  id?: string;
  category: "WEBSITE" | "LANDING_PAGE" | "DESIGN";
  type: string;
  title: string;
  description: string;
  tags: string[];
  image: string | null;
  link: string | null;
  order: number;
  published: boolean;
}

export default function ProjectForm({ initial }: { initial?: ProjectFormData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [form, setForm] = useState<ProjectFormData>(
    initial ?? {
      category: "WEBSITE",
      type: "Full Website",
      title: "",
      description: "",
      tags: [],
      image: null,
      link: "",
      order: 0,
      published: true,
    }
  );
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) update("tags", [...form.tags, t]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    update("tags", form.tags.filter((t) => t !== tag));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/admin/projects/${initial!.id}` : "/api/admin/projects";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save project");
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="adm-card" style={{ maxWidth: 640 }}>
      {error && <p className="adm-error">{error}</p>}

      <div className="adm-field">
        <label className="adm-label">Category</label>
        <select className="adm-select" value={form.category} onChange={(e) => update("category", e.target.value as ProjectFormData["category"])}>
          <option value="WEBSITE">Website</option>
          <option value="LANDING_PAGE">Landing Page</option>
          <option value="DESIGN">Graphic Design Sample</option>
        </select>
      </div>

      <div className="adm-field">
        <label className="adm-label">Type Label (e.g. "Full Website", "Event Flyer")</label>
        <input className="adm-input" value={form.type} onChange={(e) => update("type", e.target.value)} required />
      </div>

      <div className="adm-field">
        <label className="adm-label">Title</label>
        <input className="adm-input" value={form.title} onChange={(e) => update("title", e.target.value)} required />
      </div>

      <div className="adm-field">
        <label className="adm-label">Description</label>
        <textarea className="adm-textarea" style={{ minHeight: 100 }} value={form.description} onChange={(e) => update("description", e.target.value)} />
      </div>

      {form.category !== "DESIGN" && (
        <div className="adm-field">
          <label className="adm-label">Live Link (optional)</label>
          <input className="adm-input" value={form.link ?? ""} onChange={(e) => update("link", e.target.value)} placeholder="https://" />
        </div>
      )}

      {form.category !== "DESIGN" && (
        <div className="adm-field">
          <label className="adm-label">Tags</label>
          <div className="adm-tag-input-row">
            <input
              className="adm-input"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
              placeholder="e.g. React"
            />
            <button type="button" onClick={addTag} className="adm-btn adm-btn-outline adm-btn-sm">Add</button>
          </div>
          <div>
            {form.tags.map((t) => (
              <span key={t} className="adm-tag-chip">
                {t}
                <button type="button" onClick={() => removeTag(t)}>×</button>
              </span>
            ))}
          </div>
        </div>
      )}

      <ImageUploadField value={form.image} onChange={(url) => update("image", url)} folder="projects" />

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
        {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Project"}
      </button>
    </form>
  );
}
