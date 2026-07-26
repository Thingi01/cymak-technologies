"use client";

import { useState } from "react";

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: "blog" | "projects";
}

export default function ImageUploadField({ value, onChange, folder = "projects" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="adm-field">
      <label className="adm-label">Image</label>
      {value && (
        <div style={{ marginBottom: "0.75rem" }}>
          {/*
            eslint-disable-next-line @next/next/no-img-element --
            This preview intentionally shows the upload at its natural
            aspect ratio (just capped at 220px wide). next/image needs a
            fixed width/height or a fill parent with a locked ratio,
            neither of which fits an arbitrary-shaped admin preview.
          */}
          <img src={value} alt="Preview" style={{ maxWidth: 220, borderRadius: 8, display: "block" }} />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="adm-btn adm-btn-outline adm-btn-sm"
            style={{ marginTop: "0.5rem" }}
          >
            Remove image
          </button>
        </div>
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="adm-input" />
      {uploading && <p style={{ color: "rgba(18,33,27,0.5)", fontSize: "0.8rem", marginTop: "0.4rem" }}>Uploading & processing...</p>}
      {error && <p className="adm-error" style={{ marginTop: "0.4rem" }}>{error}</p>}
    </div>
  );
}