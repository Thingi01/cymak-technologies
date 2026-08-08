import Image from "next/image";
import { prisma } from "@/lib/prisma";

interface TrustEntry {
  title: string;
  logo: string;
}

async function getClients(): Promise<TrustEntry[]> {
  try {
    const rows = await prisma.project.findMany({
      where: {
        published: true,
        category: { in: ["WEBSITE", "LANDING_PAGE"] },
        logo: { not: null },
      },
      orderBy: { order: "asc" },
      select: { title: true, logo: true },
    });
    // logo is guaranteed non-null by the where clause above.
    return rows.map((r) => ({ title: r.title, logo: r.logo as string }));
  } catch {
    return [];
  }
}

export default async function TrustBar() {
  const clients = await getClients();

  if (clients.length === 0) return null;

  // The seamless-loop trick (animate 0 -> -100/repeats%) only looks
  // continuous if the track is comfortably wider than the viewport. With
  // few logos, a single duplication isn't enough on wide screens — you'd
  // see the whole "loop" at once. So we scale how many times the list
  // repeats based on how few items there are, aiming for at least ~16
  // items in the track regardless of how many real logos exist.
  const MIN_TRACK_ITEMS = 16;
  const repeats = Math.max(2, Math.ceil(MIN_TRACK_ITEMS / clients.length));
  const track = Array.from({ length: repeats }, () => clients).flat();
  const loopPercent = 100 / repeats;

  return (
    <>
      <style>{`
        .trustbar { padding: 2.5rem 0; border-top: 1px solid rgba(18,33,27,0.08); border-bottom: 1px solid rgba(18,33,27,0.08); background: #f5f8f6; overflow: hidden; }
        .trustbar-label {
          text-align: center;
          font-family: 'Outfit', sans-serif; font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; color: rgba(18,33,27,0.4);
          margin-bottom: 1.5rem;
        }
        .trustbar-track-wrap {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .trustbar-track {
          display: flex; align-items: center; width: max-content;
          animation: trustbarScroll ${Math.max(20, repeats * 10)}s linear infinite;
        }
        .trustbar-track:hover { animation-play-state: paused; }
        .trustbar-item {
          display: flex; align-items: center; justify-content: center;
          padding: 0 2.25rem; height: 64px;
        }
        .trustbar-logo { max-height: 64px; max-width: 160px; width: auto; height: auto; object-fit: contain; }

        @keyframes trustbarScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${loopPercent}%); }
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
              <div key={`${client.title}-${i}`} className="trustbar-item">
                <Image src={client.logo} alt={client.title} width={160} height={64} className="trustbar-logo" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}