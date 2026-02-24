"use client";
import { useState } from "react";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const phone = "254740027395";
  const message = encodeURIComponent("Hello CYMAK Technologies, I'm interested in your services.");
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <>
      <style>{`
        .wa-wrap {
          position: fixed; bottom: 2rem; right: 2rem; z-index: 999;
          display: flex; align-items: center; gap: 0.75rem;
          flex-direction: row-reverse;
        }
        .wa-btn {
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, #25d366, #128c7e);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45);
          text-decoration: none; flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s;
          animation: waPulse 2.5s ease-in-out infinite;
        }
        .wa-btn:hover {
          transform: scale(1.12);
          box-shadow: 0 6px 30px rgba(37, 211, 102, 0.65);
          animation: none;
        }
        .wa-btn svg { width: 28px; height: 28px; fill: #fff; }
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.45); }
          50%       { box-shadow: 0 4px 32px rgba(37,211,102,0.70), 0 0 0 8px rgba(37,211,102,0.10); }
        }
        .wa-tooltip {
          background: rgba(9,9,26,0.95); backdrop-filter: blur(12px);
          border: 1px solid rgba(37,211,102,0.25); border-radius: 10px;
          padding: 0.55rem 1rem; white-space: nowrap;
          transition: opacity 0.25s, transform 0.25s;
          opacity: 0; transform: translateX(8px); pointer-events: none;
        }
        .wa-tooltip.show { opacity: 1; transform: translateX(0); }
        .wa-tooltip-title {
          font-family: 'Outfit', sans-serif; font-size: 0.78rem; font-weight: 600;
          color: #fff; display: block; margin-bottom: 0.1rem;
        }
        .wa-tooltip-sub {
          font-family: 'Outfit', sans-serif; font-size: 0.68rem; font-weight: 300;
          color: rgba(37,211,102,0.80); display: block;
        }
      `}</style>

      <div className="wa-wrap">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-btn"
          aria-label="Chat on WhatsApp"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* WhatsApp SVG icon */}
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        <div className={`wa-tooltip${hovered ? " show" : ""}`}>
          <span className="wa-tooltip-title">Chat with us</span>
          <span className="wa-tooltip-sub">Typically replies within minutes</span>
        </div>
      </div>
    </>
  );
}