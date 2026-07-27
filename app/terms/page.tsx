import Link from "next/link";

export const metadata = {
  title: "Terms of Service — CYMAK Technologies",
  description: "The terms governing use of the CYMAK Technologies website and our services.",
};

export default function TermsPage() {
  return (
    <>
      <style>{`
        .legal-page { min-height: 100vh; padding: 9rem 2rem 7rem; background: #ffffff; }
        .legal-inner { max-width: 720px; margin: 0 auto; }
        .legal-back {
          display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2.5rem;
          font-family: 'Outfit', sans-serif; font-size: 0.82rem; font-weight: 500;
          color: #146c43; text-decoration: none;
        }
        .legal-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 900; color: #12211b; letter-spacing: -0.02em; margin-bottom: 0.5rem; }
        .legal-updated { font-family: 'Outfit', sans-serif; font-size: 0.82rem; color: rgba(18,33,27,0.42); margin-bottom: 3rem; }
        .legal-h2 { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: #12211b; margin: 2.5rem 0 0.85rem; }
        .legal-p { font-family: 'Outfit', sans-serif; font-size: 0.95rem; color: rgba(18,33,27,0.68); line-height: 1.8; margin-bottom: 1rem; }
        .legal-ul { font-family: 'Outfit', sans-serif; font-size: 0.95rem; color: rgba(18,33,27,0.68); line-height: 1.8; margin: 0.5rem 0 1rem 1.4rem; }
        .legal-ul li { margin-bottom: 0.4rem; }
        .legal-a { color: #146c43; text-decoration: underline; text-underline-offset: 2px; }
      `}</style>

      <div className="legal-page">
        <div className="legal-inner">
          <Link href="/" className="legal-back">← Back to home</Link>
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-updated">Last updated: July 2026</p>

          <p className="legal-p">
            These terms govern your use of cymak-technologies.vercel.app and any services you engage
            CYMAK Technologies (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) to provide. By using our
            site or engaging our services, you agree to these terms.
          </p>

          <h2 className="legal-h2">Our services</h2>
          <p className="legal-p">
            CYMAK Technologies provides web development, SEO optimization, graphic and digital design,
            and systems/infrastructure services. The exact scope, timeline, and price of any project
            are agreed separately with each client, typically in writing, before work begins. These
            website terms don&apos;t override a signed project agreement — where the two conflict, your
            signed agreement takes precedence.
          </p>

          <h2 className="legal-h2">Quotes and payment</h2>
          <p className="legal-p">
            Pricing shown on our Pricing page is indicative and may vary based on your specific
            requirements. A formal quote will be provided before any project begins. Payment terms
            (deposits, milestones, final payment) are agreed on a per-project basis.
          </p>

          <h2 className="legal-h2">Intellectual property</h2>
          <p className="legal-p">
            Upon full payment for a completed project, ownership of the final deliverables (e.g. the
            website, designs) transfers to the client, unless otherwise agreed in writing. We retain
            the right to showcase completed work in our portfolio, unless a client requests
            confidentiality in writing.
          </p>
          <p className="legal-p">
            Any underlying tools, frameworks, or proprietary code libraries we use to build client
            projects remain our intellectual property and are not transferred as part of a project.
          </p>

          <h2 className="legal-h2">Website use</h2>
          <p className="legal-p">
            You may browse and use this website for lawful purposes only. You may not attempt to gain
            unauthorized access to any part of our systems, including our admin panel or database.
          </p>

          <h2 className="legal-h2">No warranty</h2>
          <p className="legal-p">
            This website is provided &quot;as is&quot;. While we make reasonable efforts to keep it
            accurate and available, we don&apos;t guarantee uninterrupted or error-free operation.
          </p>

          <h2 className="legal-h2">Limitation of liability</h2>
          <p className="legal-p">
            To the extent permitted by law, CYMAK Technologies is not liable for indirect, incidental,
            or consequential damages arising from your use of this website. For contracted project
            work, liability terms are governed by the relevant signed agreement.
          </p>

          <h2 className="legal-h2">Governing law</h2>
          <p className="legal-p">
            These terms are governed by the laws of Kenya. Any disputes will be subject to the
            jurisdiction of Kenyan courts.
          </p>

          <h2 className="legal-h2">Changes to these terms</h2>
          <p className="legal-p">
            We may update these terms from time to time. Continued use of our website after changes
            are posted constitutes acceptance of the updated terms.
          </p>

          <h2 className="legal-h2">Contact us</h2>
          <p className="legal-p">
            Questions about these terms? Email us at{" "}
            <a href="mailto:cymaktechnologiesltd@gmail.com" className="legal-a">cymaktechnologiesltd@gmail.com</a>.
          </p>
        </div>
      </div>
    </>
  );
}