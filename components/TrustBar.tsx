import { prisma } from "@/lib/prisma";

async function getClientNames(): Promise<string[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { published: true, category: { in: ["WEBSITE", "LANDING_PAGE"] } },
      orderBy: { order: "asc" },
      select: { title: true },
    });
    return rows.map((r) => r.title);
  } catch {
    return [];
  }
}

export default async function TrustBar() {
  const names = await getClientNames();

  if (names.length === 0) return null;

  return (
    <>
      <style>{`
        .trustbar { padding: 2.5rem 2rem; border-top: 1px solid rgba(18,33,27,0.08); border-bottom: 1px solid rgba(18,33,27,0.08); background: #f5f8f6; }
        .trustbar-inner { max-width: 1100px; margin: 0 auto; text-align: center; }
        .trustbar-label {
          font-family: 'Outfit', sans-serif; font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; color: rgba(18,33,27,0.4);
          margin-bottom: 1.1rem;
        }
        .trustbar-names {
          display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
          gap: 0.6rem 0;
        }
        .trustbar-name {
          font-family: 'Outfit', sans-serif; font-size: 0.92rem; font-weight: 500;
          color: rgba(18,33,27,0.55); padding: 0 1rem;
        }
        .trustbar-sep { color: rgba(18,33,27,0.18); font-size: 0.8rem; }
      `}</style>
      <div className="trustbar" data-reveal>
        <div className="trustbar-inner">
          <div className="trustbar-label">Trusted by businesses across Kenya</div>
          <div className="trustbar-names">
            {names.map((name, i) => (
              <span key={name} style={{ display: "flex", alignItems: "center" }}>
                <span className="trustbar-name">{name}</span>
                {i < names.length - 1 && <span className="trustbar-sep">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}