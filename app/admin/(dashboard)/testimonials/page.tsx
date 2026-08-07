import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import DeleteTestimonialButton from "./DeleteTestimonialButton";

export default async function TestimonialsListPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <div className="adm-row">
        <div>
          <h1 className="adm-h1">Testimonials</h1>
          <p className="adm-sub" style={{ marginBottom: 0 }}>Manage client quotes shown on your homepage.</p>
        </div>
        <Link href="/admin/testimonials/new" className="adm-btn">+ New Testimonial</Link>
      </div>

      <div className="adm-card">
        {testimonials.length === 0 ? (
          <p className="adm-empty">No testimonials yet. Add your first one — the section stays hidden on the live site until you do.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Client</th>
                  <th>Company</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr key={t.id}>
                    <td>{t.photo && <Image src={t.photo} alt={t.clientName} width={40} height={40} className="adm-thumb" style={{ borderRadius: "50%" }} />}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{t.clientName}</div>
                      {t.role && <div style={{ fontSize: "0.76rem", color: "rgba(18,33,27,0.4)" }}>{t.role}</div>}
                    </td>
                    <td>{t.company}</td>
                    <td>{t.order}</td>
                    <td>
                      <span className={`adm-badge ${t.published ? "adm-badge-published" : "adm-badge-draft"}`}>
                        {t.published ? "Published" : "Hidden"}
                      </span>
                    </td>
                    <td style={{ display: "flex", gap: "0.5rem" }}>
                      <Link href={`/admin/testimonials/${t.id}/edit`} className="adm-btn adm-btn-outline adm-btn-sm">Edit</Link>
                      <DeleteTestimonialButton id={t.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}