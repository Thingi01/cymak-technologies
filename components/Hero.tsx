"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animFrame: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = [];
    const colors = ["rgba(192,132,252,", "rgba(232,121,249,", "rgba(96,165,250,"];

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")"; ctx.fill();
        particles.forEach((p2, j) => {
          if (j <= i) return;
          const dx = p.x - p2.x, dy = p.y - p2.y, dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 130) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(217,70,239,${0.10 * (1 - dist / 130)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
      });
      animFrame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animFrame); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <style>{`
        .hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; }
        .hero-canvas { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.55; }
        .hero-glow-1 {
          position: absolute; width: 700px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(147,51,234,0.16) 0%, transparent 70%);
          top: -150px; left: -150px; pointer-events: none;
        }
        .hero-glow-2 {
          position: absolute; width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%);
          bottom: -80px; right: -80px; pointer-events: none;
        }
        .hero-glow-3 {
          position: absolute; width: 400px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(217,70,239,0.10) 0%, transparent 70%);
          top: 40%; right: 10%; pointer-events: none;
        }
        .hero-inner {
          position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; padding: 8rem 2rem 4rem;
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.38rem 1rem; border-radius: 100px;
          border: 1px solid rgba(217,70,239,0.30); background: rgba(147,51,234,0.09);
          font-family: 'Outfit', sans-serif; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase; color: #e879f9; margin-bottom: 1.5rem;
          animation: fadeUp 0.8s ease both;
        }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #e879f9; box-shadow: 0 0 10px #e879f9; animation: pulseDot 2.2s infinite; }
        @keyframes pulseDot { 0%,100% { opacity:1;transform:scale(1); } 50% { opacity:0.35;transform:scale(0.8); } }
        .hero-h1 {
          font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 5.5vw, 4.8rem); font-weight: 900;
          line-height: 1.04; letter-spacing: -0.02em; color: #fff; margin-bottom: 1.5rem;
          animation: fadeUp 0.8s 0.1s ease both;
        }
        .hero-h1 .grad {
          background: linear-gradient(135deg, #c084fc 0%, #e879f9 45%, #60a5fa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmerText 5s linear infinite;
        }
        @keyframes shimmerText { 0% { background-position:0% center; } 100% { background-position:200% center; } }
        .hero-sub {
          font-family: 'Outfit', sans-serif; font-size: 1.05rem; font-weight: 300; line-height: 1.8;
          color: rgba(255,255,255,0.60); max-width: 480px; margin-bottom: 2.5rem;
          animation: fadeUp 0.8s 0.2s ease both;
        }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; animation: fadeUp 0.8s 0.3s ease both; }
        .h-btn-primary {
          padding: 0.88rem 2rem; border-radius: 8px;
          background: linear-gradient(135deg, #9333ea, #d946ef);
          color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.92rem; font-weight: 600;
          text-decoration: none; border: none; cursor: pointer; transition: all 0.3s;
          box-shadow: 0 0 32px rgba(147,51,234,0.38); letter-spacing: 0.02em;
        }
        .h-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 55px rgba(217,70,239,0.50); }
        .h-btn-secondary {
          padding: 0.88rem 2rem; border-radius: 8px; border: 1px solid rgba(96,165,250,0.35);
          background: rgba(37,99,235,0.09); color: #93c5fd;
          font-family: 'Outfit', sans-serif; font-size: 0.92rem; font-weight: 500;
          text-decoration: none; cursor: pointer; transition: all 0.3s;
        }
        .h-btn-secondary:hover { background: rgba(59,130,246,0.18); border-color: #60a5fa; color: #fff; box-shadow: 0 0 28px rgba(59,130,246,0.28); }
        .hero-stats {
          display: flex; gap: 2.5rem; margin-top: 3.5rem; padding-top: 2rem;
          border-top: 1px solid rgba(168,85,247,0.14); animation: fadeUp 0.8s 0.4s ease both;
        }
        .stat-num {
          font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 800; line-height: 1;
          background: linear-gradient(135deg, #c084fc, #e879f9); -webkit-background-clip: text;
          -webkit-text-fill-color: transparent; background-clip: text;
        }
        .stat-label { font-family: 'Outfit', sans-serif; font-size: 0.72rem; color: rgba(255,255,255,0.38); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.3rem; }

        /* Visual orb */
        .hero-visual { display: flex; align-items: center; justify-content: center; animation: fadeUp 0.9s 0.2s ease both; }
        .orb-wrap { position: relative; width: 380px; height: 380px; }
        .orb-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(168,85,247,0.18);
        }
        .orb-r1 { inset: 0; animation: spinOrb 22s linear infinite; }
        .orb-r2 { inset: 44px; animation: spinOrb 16s linear infinite reverse; border-color: rgba(217,70,239,0.14); }
        .orb-r3 { inset: 88px; animation: spinOrb 28s linear infinite; border-color: rgba(96,165,250,0.12); }
        @keyframes spinOrb { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        .orb-dot {
          position: absolute; width: 9px; height: 9px; border-radius: 50%;
          top: -4.5px; left: 50%; margin-left: -4.5px;
        }
        .orb-dot-1 { background: #c084fc; box-shadow: 0 0 14px #c084fc; }
        .orb-dot-2 { background: #e879f9; box-shadow: 0 0 14px #e879f9; }
        .orb-dot-3 { background: #60a5fa; box-shadow: 0 0 14px #60a5fa; }
        .orb-center {
          position: absolute; inset: 110px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(147,51,234,0.28), rgba(217,70,239,0.20), rgba(37,99,235,0.20));
          border: 1px solid rgba(217,70,239,0.28);
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(10px);
          box-shadow: inset 0 0 50px rgba(147,51,234,0.18), 0 0 70px rgba(147,51,234,0.22);
        }
        .orb-text {
          font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 900; letter-spacing: -0.02em;
          background: linear-gradient(135deg, #c084fc, #e879f9, #60a5fa);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; text-align: center; }
          .hero-sub { margin: 0 auto 2.5rem; }
          .hero-actions { justify-content: center; }
          .hero-stats { justify-content: center; }
          .hero-visual { display: none; }
        }
      `}</style>

      <section className="hero" id="home">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-glow-1" /><div className="hero-glow-2" /><div className="hero-glow-3" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge"><div className="badge-dot" />Technology Solutions Partner</div>
            <h1 className="hero-h1">
              Build Digital Foundations<br />That <span className="grad">Drive Growth</span>
            </h1>
            <p className="hero-sub">
              CYMAK Technologies delivers secure, scalable, and future-ready digital solutions — from web development to graphic design and SEO optimization.
            </p>
            <div className="hero-actions">
              <a href="#services" className="h-btn-primary">Explore Services</a>
              <a href="#contact" className="h-btn-secondary">Start a Project →</a>
            </div>
            <div className="hero-stats">
              <div><div className="stat-num">5+</div><div className="stat-label">Live Projects</div></div>
              <div><div className="stat-num">100%</div><div className="stat-label">Client Focus</div></div>
              <div><div className="stat-num">4</div><div className="stat-label">Core Services</div></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orb-wrap">
              <div className="orb-ring orb-r1"><div className="orb-dot orb-dot-1" /></div>
              <div className="orb-ring orb-r2"><div className="orb-dot orb-dot-2" /></div>
              <div className="orb-ring orb-r3"><div className="orb-dot orb-dot-3" /></div>
              <div className="orb-center"><span className="orb-text">CYM</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}