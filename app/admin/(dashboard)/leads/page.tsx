"use client";

import React, { useEffect, useState } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: "NEW" | "READ" | "REPLIED" | "ARCHIVED";
  createdAt: string;
}

const STATUSES: Lead["status"][] = ["NEW", "READ", "REPLIED", "ARCHIVED"];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((r) => r.json())
      .then((data) => setLeads(data.leads ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: Lead["status"]) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function deleteLead(id: string) {
    if (!confirm("Delete this lead permanently?")) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
  }

  return (
    <>
      <h1 className="adm-h1">Leads</h1>
      <p className="adm-sub">Contact form submissions from your website.</p>

      <div className="adm-card">
        {loading ? (
          <p className="adm-empty">Loading...</p>
        ) : leads.length === 0 ? (
          <p className="adm-empty">No leads yet.</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Name / Email</th>
                <th>Service</th>
                <th>Status</th>
                <th>Received</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <React.Fragment key={lead.id}>
                  <tr style={{ cursor: "pointer" }} onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{lead.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "rgba(18,33,27,0.45)" }}>{lead.email}</div>
                    </td>
                    <td>{lead.service}</td>
                    <td>
                      <select
                        value={lead.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateStatus(lead.id, e.target.value as Lead["status"])}
                        className="adm-select"
                        style={{ width: "auto", padding: "0.3rem 0.6rem", fontSize: "0.78rem" }}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteLead(lead.id); }}
                        className="adm-btn adm-btn-danger adm-btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expanded === lead.id && (
                    <tr key={`${lead.id}-detail`}>
                      <td colSpan={5} style={{ background: "rgba(20,108,67,0.04)" }}>
                        <div style={{ whiteSpace: "pre-wrap", padding: "0.5rem 0" }}>{lead.message}</div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}