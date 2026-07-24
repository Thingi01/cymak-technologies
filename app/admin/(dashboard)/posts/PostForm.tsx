"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "../ImageUploadField";

export interface PostFormData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  author: string;
  coverImage: string | null;
  published: boolean;
}

const CATEGORIES = ["Web Development", "SEO Optimization", "Graphic Design", "Systems & Infrastructure", "General"];

export default function PostForm({ initial }: { initial?: PostFormData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [form, setForm] = useState<PostFormData>(
    initial ?? {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "General",
      readTime: "3 min read",
      author: "CYMAK Technologies",
      coverImage: null,
      published: false,
    }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof PostFormData>(key: K, value: PostFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(title: string) {
    update("title", title);
    // Auto-generate slug only while creating a new post and the user hasn't
    // manually touched the slug field yet.
    if (!isEdit) {
      update("slug", slugify(title));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/admin/posts/${initial!.id}` : "/api/admin/posts";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save post");
      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="adm-card" style={{ maxWidth: 720 }}>
      {error && <p className="adm-error">{error}</p>}

      <div className="adm-field">
        <label className="adm-label">Title</label>
        <input
          className="adm-input"
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
        />
      </div>

      <div className="adm-field">
        <label className="adm-label">Slug (URL path)</label>
        <input
          className="adm-input"
          value={form.slug}
          onChange={(e) => update("slug", slugify(e.target.value))}
          required
        />
      </div>

      <div className="adm-field">
        <label className="adm-label">Excerpt</label>
        <input
          className="adm-input"
          value={form.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          required
        />
      </div>

      <div className="adm-field">
        <label className="adm-label">Content (Markdown / MDX)</label>
        <textarea
          className="adm-textarea"
          style={{ minHeight: 320 }}
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          required
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div className="adm-field">
          <label className="adm-label">Category</label>
          <select className="adm-select" value={form.category} onChange={(e) => update("category", e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="adm-field">
          <label className="adm-label">Read Time</label>
          <input className="adm-input" value={form.readTime} onChange={(e) => update("readTime", e.target.value)} />
        </div>
      </div>

      <div className="adm-field">
        <label className="adm-label">Author</label>
        <input className="adm-input" value={form.author} onChange={(e) => update("author", e.target.value)} />
      </div>

      <ImageUploadField value={form.coverImage} onChange={(url) => update("coverImage", url)} folder="blog" />

      <div className="adm-field">
        <label className="adm-checkbox-row">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => update("published", e.target.checked)}
          />
          Published (visible on the live site)
        </label>
      </div>

      <button type="submit" disabled={saving} className="adm-btn">
        {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Post"}
      </button>
    </form>
  );
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
