import Image from "next/image";
import { prisma } from "@/lib/prisma";

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <>
      <style>{`
        .testi-section { padding: 7rem 2rem; background: #f5f8f6; }
        .testi-inner { max-width: 1100px; margin: 0 auto; }
        .testi-label { display: block; text-align: center; font-family: 'Outfit', sans-serif; font-size: 0.70rem; letter-spacing: 0.22em; text-transform: uppercase; color: #96701f; font-weight: 600; margin-bottom: 0.8rem; }
        .testi-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 900; text-align: center; color: #12211b; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 3.5rem; }

        .testi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1px; border: 1px solid rgba(18,33,27,0.10); border-radius: 16px; overflow: hidden; background: rgba(18,33,27,0.10); }
        .testi-card { padding: 2.25rem; background: #ffffff; display: flex; flex-direction: column; }
        .testi-quote-mark { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 900; color: #e7f1ea; line-height: 1; margin-bottom: 0.5rem; }
        .testi-quote { font-family: 'Outfit', sans-serif; font-size: 0.95rem; color: rgba(18,33,27,0.72); line-height: 1.75; font-weight: 400; margin-bottom: 1.75rem; flex: 1; }
        .testi-person { display: flex; align-items: center; gap: 0.85rem; }
        .testi-photo { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
        .testi-avatar-fallback {
          width: 44px; height: 44px; border-radius: 50%; background: #146c43; color: #fff;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1rem;
        }
        .testi-name { font-family: 'Outfit', sans-serif; font-size: 0.88rem; font-weight: 600; color: #12211b; }
        .testi-meta { font-family: 'Outfit', sans-serif; font-size: 0.78rem; color: rgba(18,33,27,0.45); }

        @media (max-width: 620px) { .testi-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section className="testi-section" id="testimonials">
        <div className="testi-inner">
          <span className="testi-label">Client Voices</span>
          <h2 className="testi-title">What Our Clients Say</h2>

          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div key={t.id} className="testi-card" data-reveal data-reveal-delay={Math.min(i + 1, 6)}>
                <div className="testi-quote-mark">&ldquo;</div>
                <p className="testi-quote">{t.quote}</p>
                <div className="testi-person">
                  {t.photo ? (
                    <Image src={t.photo} alt={t.clientName} width={44} height={44} className="testi-photo" />
                  ) : (
                    <div className="testi-avatar-fallback">{t.clientName.charAt(0)}</div>
                  )}
                  <div>
                    <div className="testi-name">{t.clientName}</div>
                    <div className="testi-meta">{t.role ? `${t.role}, ` : ""}{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}