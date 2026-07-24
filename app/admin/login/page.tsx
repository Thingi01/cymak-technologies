"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>CYMAK Admin</h1>
        <p style={styles.subtitle}>Sign in to manage your site</p>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          placeholder="you@cymak.com"
          autoFocus
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          placeholder="••••••••"
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f8f6",
    padding: "1.5rem",
  },
  card: {
    width: "100%",
    maxWidth: 380,
    background: "#ffffff",
    border: "1px solid rgba(18,33,27,0.10)",
    borderRadius: 16,
    padding: "2.5rem",
    boxShadow: "0 12px 32px rgba(18,33,27,0.08)",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.6rem",
    fontWeight: 900,
    color: "#146c43",
    margin: 0,
  },
  subtitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.85rem",
    color: "rgba(18,33,27,0.5)",
    marginTop: "0.4rem",
    marginBottom: "2rem",
  },
  label: {
    display: "block",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.72rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(20,108,67,0.75)",
    fontWeight: 600,
    marginBottom: "0.4rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    marginBottom: "1.2rem",
    borderRadius: 8,
    border: "1px solid rgba(18,33,27,0.16)",
    background: "#ffffff",
    color: "#12211b",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
  },
  error: {
    color: "#dc2626",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.82rem",
    marginBottom: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.85rem",
    borderRadius: 8,
    border: "none",
    background: "#146c43",
    color: "#fff",
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
  },
};