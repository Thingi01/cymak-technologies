import Image from "next/image";
import { prisma } from "@/lib/prisma";

interface TrustEntry {
  title: string;
  logo: string | null;
}

async function getClients(): Promise<TrustEntry[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { published: true, category: { in: ["WEBSITE", "LANDING_PAGE"] } },
      orderBy: { order: "asc" },
      select: { title: true, logo: true },
    });
    return rows;
  } catch {
    return [];
  }
}

export default async function TrustBar() {
  const clients = await getClients();

  if (clients.length === 0) return null;

  // Duplicate the list so the marquee loops seamlessly — when the first
  // copy scrolls fully offscreen, the second copy is already in the exact
  // same visual position, so the loop point is invisible.
  const track = [...clients, ...clients];

  return (
    <>
      <style>{`
        .trustbar { padding: 2.25rem 0; border-top: 1px solid rgba(18,33,27,0.08); border-bottom: 1px solid rgba(18,33,27,0.08); background: #f5f8f6; overflow: hidden; }
        .trustbar-label {
          text-align: center;
          font-family: 'Outfit', sans-serif; font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; color: rgba(18,33,27,0.4);
          margin-bottom: 1.1rem;
        }
        .trustbar-track-wrap {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .trustbar-track {
          display: flex; align-items: center; width: max-content;
          animation: trustbarScroll 32s linear infinite;
        }
        .trustbar-track:hover { animation-play-state: paused; }
        .trustbar-item { display: flex; align-items: center; padding: 0 1.5rem; }
        .trustbar-name {
          font-family: 'Outfit', sans-serif; font-size: 0.95rem; font-weight: 600;
          color: #96701f; white-space: nowrap;
        }
        .trustbar-logo { height: 30px; width: auto; object-fit: contain; opacity: 0.85; }
        .trustbar-sep { color: rgba(150,112,31,0.35); font-size: 0.8rem; margin-left: 1.5rem; }

        @keyframes trustbarScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .trustbar-track { animation: none; }
          .trustbar-track-wrap { overflow-x: auto; }
        }
      `}</style>
      <div className="trustbar" data-reveal>
        <div className="trustbar-label">Trusted by businesses across Kenya</div>
        <div className="trustbar-track-wrap">
          <div className="trustbar-track">
            {track.map((client, i) => (
              <span key={`${client.title}-${i}`} style={{ display: "flex", alignItems: "center" }}>
                <span className="trustbar-item">
                  {client.logo ? (
                    <Image src={client.logo} alt={client.title} width={120} height={30} className="trustbar-logo" />
                  ) : (
                    <span className="trustbar-name">{client.title}</span>
                  )}
                </span>
                <span className="trustbar-sep">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}