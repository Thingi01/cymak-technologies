import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteProjectButton from "./DeleteProjectButton";

const CATEGORY_LABELS: Record<string, string> = {
  WEBSITE: "Websites",
  LANDING_PAGE: "Landing Pages",
  DESIGN: "Graphic Design Samples",
};

export default async function ProjectsListPage() {
  const projects = await prisma.project.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });

  const grouped = projects.reduce<Record<string, typeof projects>>((acc, p) => {
    (acc[p.category] ??= []).push(p);
    return acc;
  }, {});

  return (
    <>
      <div className="adm-row">
        <div>
          <h1 className="adm-h1">Projects</h1>
          <p className="adm-sub" style={{ marginBottom: 0 }}>Manage your portfolio — websites, landing pages, and design samples.</p>
        </div>
        <Link href="/admin/projects/new" className="adm-btn">+ New Project</Link>
      </div>

      {projects.length === 0 ? (
        <div className="adm-card">
          <p className="adm-empty">No projects yet. Add your first one — the site will show fallback content until you do.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="adm-card">
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#12211b", fontSize: "1rem", marginBottom: "1rem" }}>
              {CATEGORY_LABELS[category] ?? category}
            </h2>
            <table className="adm-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.id}>
                    <td>{p.image && <img src={p.image} alt={p.title} className="adm-thumb" />}</td>
                    <td>
                      {p.title}
                      {p.featured && (
                        <span className="adm-badge adm-badge-new" style={{ marginLeft: "0.5rem" }}>Featured</span>
                      )}
                    </td>
                    <td>{p.type}</td>
                    <td>{p.order}</td>
                    <td>
                      <span className={`adm-badge ${p.published ? "adm-badge-published" : "adm-badge-draft"}`}>
                        {p.published ? "Published" : "Hidden"}
                      </span>
                    </td>
                    <td style={{ display: "flex", gap: "0.5rem" }}>
                      <Link href={`/admin/projects/${p.id}/edit`} className="adm-btn adm-btn-outline adm-btn-sm">Edit</Link>
                      <DeleteProjectButton id={p.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </>
  );
}