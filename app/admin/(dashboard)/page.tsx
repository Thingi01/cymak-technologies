import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [postCount, publishedPostCount, projectCount, newLeadCount, totalLeadCount] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.project.count(),
    prisma.contactSubmission.count({ where: { status: "NEW" } }),
    prisma.contactSubmission.count(),
  ]);

  const recentLeads = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <>
      <h1 className="adm-h1">Dashboard</h1>
      <p className="adm-sub">Overview of your site content and incoming leads.</p>

      <div className="adm-stat-grid">
        <div className="adm-card">
          <div className="adm-stat-num">{publishedPostCount}</div>
          <div className="adm-stat-label">Published Posts</div>
        </div>
        <div className="adm-card">
          <div className="adm-stat-num">{postCount - publishedPostCount}</div>
          <div className="adm-stat-label">Draft Posts</div>
        </div>
        <div className="adm-card">
          <div className="adm-stat-num">{projectCount}</div>
          <div className="adm-stat-label">Portfolio Items</div>
        </div>
        <div className="adm-card">
          <div className="adm-stat-num">{newLeadCount}</div>
          <div className="adm-stat-label">New Leads</div>
        </div>
        <div className="adm-card">
          <div className="adm-stat-num">{totalLeadCount}</div>
          <div className="adm-stat-label">Total Leads</div>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-row">
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "1.1rem", margin: 0 }}>
            Recent Leads
          </h2>
          <Link href="/admin/leads" className="adm-btn adm-btn-outline adm-btn-sm">View all →</Link>
        </div>

        {recentLeads.length === 0 ? (
          <p className="adm-empty">No leads yet.</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Status</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.service}</td>
                  <td>
                    <span className={`adm-badge adm-badge-${lead.status.toLowerCase()}`}>{lead.status}</span>
                  </td>
                  <td>{lead.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
