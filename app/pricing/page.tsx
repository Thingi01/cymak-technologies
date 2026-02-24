import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — CYMAK Technologies",
  description:
    "Transparent pricing for web development, graphic design, and SEO optimization services from CYMAK Technologies.",
};

const webPlans = [
  {
    name: "Starter",
    price: "25,000",
    desc: "Perfect for small businesses and personal brands needing a clean online presence.",
    features: [
      "Up to 5 pages",
      "Mobile responsive design",
      "Contact form",
      "Basic SEO setup",
      "1 round of revisions",
      "2 weeks delivery",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Business",
    price: "55,000",
    desc: "Ideal for growing businesses that need a professional, feature-rich website.",
    features: [
      "Up to 10 pages",
      "Mobile responsive design",
      "Contact form + WhatsApp integration",
      "On-page SEO optimization",
      "Blog setup",
      "Google Analytics integration",
      "3 rounds of revisions",
      "3 weeks delivery",
    ],
    cta: "Most Popular",
    highlight: true,
  },
  {
    name: "Premium",
    price: "120,000",
    desc: "For established businesses needing a powerful, custom-built web solution.",
    features: [
      "Unlimited pages",
      "Custom design & animations",
      "E-commerce / booking system",
      "Advanced SEO optimization",
      "Blog + content management",
      "Google Analytics + Search Console",
      "Performance optimization",
      "Unlimited revisions",
      "4 weeks delivery",
      "1 month post-launch support",
    ],
    cta: "Let's Talk",
    highlight: false,
  },
];

const designPlans = [
  {
    name: "Basic",
    price: "1,200",
    desc: "Quick turnaround for single design needs.",
    features: [
      "1 design (flyer, poster, or graphic)",
      "2 concepts to choose from",
      "1 round of revisions",
      "High-res PNG + PDF delivery",
      "2 days delivery",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Standard",
    price: "6,500",
    desc: "Best for social media campaigns and content creators.",
    features: [
      "Up to 5 designs",
      "3 concepts per design",
      "2 rounds of revisions",
      "High-res PNG + PDF + editable file",
      "Social media sizing included",
      "4 days delivery",
    ],
    cta: "Most Popular",
    highlight: true,
  },
  {
    name: "Brand Pack",
    price: "20,000",
    desc: "Complete visual identity package for businesses launching or rebranding.",
    features: [
      "Logo design (3 variations)",
      "Color palette & typography guide",
      "10 social media templates",
      "Business card design",
      "Letterhead design",
      "Unlimited revisions",
      "All source files included",
      "7 days delivery",
    ],
    cta: "Let's Talk",
    highlight: false,
  },
];

const seoPlans = [
  {
    name: "Audit",
    price: "8,000",
    desc: "One-time deep dive into your website's SEO health with a clear action plan.",
    features: [
      "Full technical SEO audit",
      "Keyword research report",
      "Competitor analysis",
      "On-page SEO review",
      "Detailed recommendations report",
      "One-time payment",
    ],
    cta: "Get Audited",
    highlight: false,
    period: "once",
  },
  {
    name: "Growth",
    price: "15,000",
    desc: "Monthly SEO management for businesses serious about ranking on Google.",
    features: [
      "Everything in Audit",
      "On-page optimization",
      "2 blog articles/month",
      "Google Search Console management",
      "Monthly performance report",
      "Local SEO optimization",
      "3 month minimum",
    ],
    cta: "Most Popular",
    highlight: true,
    period: "month",
  },
  {
    name: "Authority",
    price: "25,000",
    desc: "Aggressive SEO strategy for businesses targeting competitive keywords.",
    features: [
      "Everything in Growth",
      "4 blog articles/month",
      "Link building campaign",
      "Technical SEO fixes",
      "Google Business Profile optimization",
      "Weekly performance reports",
      "Dedicated SEO manager",
      "6 month minimum",
    ],
    cta: "Let's Talk",
    highlight: false,
    period: "month",
  },
];

type Plan = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
  period?: string;
};

function PricingGrid({ plans, color }: { plans: Plan[]; color: string }) {
  return (
    <div className="pricing-grid">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`pricing-card${plan.highlight ? " pricing-card--highlight" : ""}`}
          style={{ "--pc": color } as React.CSSProperties}
        >
          {plan.highlight && (
            <div className="pricing-badge">Most Popular</div>
          )}
          <div className="pc-name">{plan.name}</div>
          <div className="pc-price-wrap">
            <span className="pc-currency">Ksh</span>
            <span className="pc-price">{plan.price}</span>
            {plan.period && (
              <span className="pc-period">/{plan.period}</span>
            )}
          </div>
          <p className="pc-desc">{plan.desc}</p>
          <div className="pc-divider" />
          <ul className="pc-features">
            {plan.features.map((f) => (
              <li key={f} className="pc-feature">
                <span className="pc-check">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/#contact"
            className={`pc-cta${plan.highlight ? " pc-cta--highlight" : ""}`}
          >
            {plan.cta === "Most Popular" ? "Get Started" : plan.cta} →
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <style>{`
        .pricing-page { min-height: 100vh; padding: 9rem 2rem 7rem; }
        .pricing-inner { max-width: 1200px; margin: 0 auto; }

        /* Header */
        .pr-label { display: block; font-family: 'Outfit', sans-serif; font-size: 0.70rem; letter-spacing: 0.22em; text-transform: uppercase; color: #e879f9; font-weight: 600; margin-bottom: 0.8rem; text-align: center; }
        .pr-title { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 1rem; text-align: center; }
        .pr-sub { font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.48); font-weight: 300; line-height: 1.75; max-width: 500px; margin: 0 auto 1.5rem; text-align: center; }
        .pr-note { text-align: center; font-family: 'Outfit', sans-serif; font-size: 0.78rem; color: rgba(255,255,255,0.28); font-weight: 300; margin-bottom: 5rem; }
        .pr-note span { color: rgba(232,121,249,0.60); }

        /* Service section */
        .pr-section { margin-bottom: 5rem; }
        .pr-section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2.5rem; }
        .pr-section-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(168,85,247,0.25), transparent); }
        .pr-section-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 800; color: #fff; letter-spacing: -0.02em; white-space: nowrap; }
        .pr-section-icon { font-size: 1.2rem; }

        /* Grid */
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }

        /* Card */
        .pricing-card {
          background: rgba(9,9,26,0.85); border: 1px solid rgba(168,85,247,0.14);
          border-radius: 16px; padding: 2.2rem; display: flex; flex-direction: column;
          position: relative; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .pricing-card:hover {
          border-color: rgba(168,85,247,0.30);
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(147,51,234,0.15);
        }
        .pricing-card--highlight {
          border-color: rgba(217,70,239,0.40) !important;
          background: rgba(15,9,30,0.95) !important;
          box-shadow: 0 0 50px rgba(147,51,234,0.18), inset 0 0 30px rgba(147,51,234,0.05);
        }
        .pricing-card--highlight:hover {
          border-color: rgba(217,70,239,0.65) !important;
          box-shadow: 0 20px 60px rgba(147,51,234,0.28) !important;
        }

        /* Badge */
        .pricing-badge {
          position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
          font-family: 'Outfit', sans-serif; font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          background: linear-gradient(135deg, #9333ea, #d946ef);
          color: #fff; padding: 0.28rem 1rem; border-radius: 0 0 8px 8px;
        }

        .pc-name { font-family: 'Outfit', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(232,121,249,0.70); margin-bottom: 1rem; margin-top: 0.5rem; }
        .pc-price-wrap { display: flex; align-items: baseline; gap: 0.3rem; margin-bottom: 0.75rem; }
        .pc-currency { font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 500; color: rgba(255,255,255,0.50); }
        .pc-price { font-family: 'Playfair Display', serif; font-size: 2.6rem; font-weight: 900; color: #fff; line-height: 1; letter-spacing: -0.02em; }
        .pc-period { font-family: 'Outfit', sans-serif; font-size: 0.82rem; color: rgba(255,255,255,0.35); font-weight: 300; }
        .pc-desc { font-family: 'Outfit', sans-serif; font-size: 0.845rem; color: rgba(255,255,255,0.45); line-height: 1.7; font-weight: 300; margin-bottom: 1.25rem; }
        .pc-divider { height: 1px; background: linear-gradient(90deg, rgba(168,85,247,0.20), transparent); margin-bottom: 1.25rem; }

        /* Features */
        .pc-features { list-style: none; padding: 0; margin: 0 0 2rem; display: flex; flex-direction: column; gap: 0.6rem; flex: 1; }
        .pc-feature { display: flex; align-items: flex-start; gap: 0.65rem; font-family: 'Outfit', sans-serif; font-size: 0.845rem; color: rgba(255,255,255,0.58); font-weight: 300; line-height: 1.4; }
        .pc-check { color: #d946ef; font-size: 0.75rem; font-weight: 700; flex-shrink: 0; margin-top: 2px; }

        /* CTA */
        .pc-cta {
          display: block; text-align: center; padding: 0.82rem;
          border-radius: 8px; border: 1px solid rgba(168,85,247,0.28);
          background: rgba(147,51,234,0.08);
          font-family: 'Outfit', sans-serif; font-size: 0.88rem; font-weight: 600;
          color: #c084fc; text-decoration: none; letter-spacing: 0.02em;
          transition: all 0.25s; margin-top: auto;
        }
        .pc-cta:hover { background: rgba(147,51,234,0.20); border-color: rgba(217,70,239,0.50); color: #fff; }
        .pc-cta--highlight {
          background: linear-gradient(135deg, #9333ea, #d946ef) !important;
          border-color: transparent !important; color: #fff !important;
          box-shadow: 0 0 28px rgba(147,51,234,0.35);
        }
        .pc-cta--highlight:hover { box-shadow: 0 0 45px rgba(217,70,239,0.50) !important; transform: translateY(-1px); }

        /* Bottom note */
        .pr-bottom { margin-top: 4rem; padding: 2.5rem; border-radius: 16px; border: 1px solid rgba(168,85,247,0.14); background: rgba(9,9,26,0.60); display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
        .pr-bottom-text { font-family: 'Outfit', sans-serif; }
        .pr-bottom-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 800; color: #fff; margin-bottom: 0.4rem; }
        .pr-bottom-sub { font-size: 0.88rem; color: rgba(255,255,255,0.45); font-weight: 300; line-height: 1.6; }
        .pr-bottom-btn { flex-shrink: 0; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2rem; border-radius: 8px; background: linear-gradient(135deg, #9333ea, #d946ef); color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 600; text-decoration: none; box-shadow: 0 0 28px rgba(147,51,234,0.28); transition: all 0.3s; white-space: nowrap; }
        .pr-bottom-btn:hover { transform: translateY(-2px); box-shadow: 0 0 48px rgba(217,70,239,0.45); }

        @media (max-width: 900px) { .pricing-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; } }
        @media (max-width: 600px) { .pr-bottom { flex-direction: column; text-align: center; } .pr-bottom-btn { width: 100%; justify-content: center; } }
      `}</style>

      <div className="pricing-page">
        <div className="pricing-inner">

          {/* Header */}
          <span className="pr-label">Transparent Pricing</span>
          <h1 className="pr-title">Simple, Clear Pricing</h1>
          <p className="pr-sub">
            No hidden fees, no surprises. Choose a plan that fits your needs or contact us for a custom quote.
          </p>
          <p className="pr-note">
            All prices are in <span>Kenyan Shillings (KES)</span> and exclude VAT where applicable.
          </p>

          {/* Web Development */}
          <div className="pr-section">
            <div className="pr-section-header">
              <span className="pr-section-icon">⬡</span>
              <h2 className="pr-section-title">Web Development</h2>
              <div className="pr-section-line" />
            </div>
            <PricingGrid plans={webPlans} color="#9333ea" />
          </div>

          {/* Graphic Design */}
          <div className="pr-section">
            <div className="pr-section-header">
              <span className="pr-section-icon">◈</span>
              <h2 className="pr-section-title">Graphic Design</h2>
              <div className="pr-section-line" />
            </div>
            <PricingGrid plans={designPlans} color="#d946ef" />
          </div>

          {/* SEO */}
          <div className="pr-section">
            <div className="pr-section-header">
              <span className="pr-section-icon">✦</span>
              <h2 className="pr-section-title">SEO Optimization</h2>
              <div className="pr-section-line" />
            </div>
            <PricingGrid plans={seoPlans} color="#2563eb" />
          </div>

          {/* Bottom CTA */}
          <div className="pr-bottom">
            <div className="pr-bottom-text">
              <div className="pr-bottom-title">Need a custom package?</div>
              <p className="pr-bottom-sub">
                Every business is different. Get in touch and we'll build a package tailored exactly to your needs and budget.
              </p>
            </div>
            <Link href="/#contact" className="pr-bottom-btn">
              Request Custom Quote →
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}