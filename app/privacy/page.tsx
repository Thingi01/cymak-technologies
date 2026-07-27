import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — CYMAK Technologies",
  description: "How CYMAK Technologies collects, uses, and protects your information.",
};

export default function PrivacyPage() {
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
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Last updated: July 2026</p>

          <p className="legal-p">
            CYMAK Technologies (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates cymak-technologies.vercel.app.
            This page explains what information we collect when you use our site, how we use it, and
            the choices you have.
          </p>

          <h2 className="legal-h2">Information we collect</h2>
          <p className="legal-p">When you submit our contact form, we collect:</p>
          <ul className="legal-ul">
            <li>Your name and email address</li>
            <li>The service you&apos;re interested in</li>
            <li>The message you write to us</li>
          </ul>
          <p className="legal-p">
            This information is stored in our database so we can respond to your enquiry and keep a
            record of past conversations. We also use Google Analytics to understand how visitors use
            our site (pages visited, general location, device type). Google Analytics uses cookies to
            do this — see Google&apos;s own privacy policy for how they handle that data.
          </p>

          <h2 className="legal-h2">How we use your information</h2>
          <ul className="legal-ul">
            <li>To respond to enquiries submitted through our contact form</li>
            <li>To send you a confirmation email when you contact us, via our email provider, Resend</li>
            <li>To understand overall site usage and improve our content and services</li>
          </ul>
          <p className="legal-p">
            We do not sell, rent, or trade your personal information to third parties for marketing
            purposes.
          </p>

          <h2 className="legal-h2">Third-party services we use</h2>
          <ul className="legal-ul">
            <li><strong>Vercel</strong> — hosts our website and application infrastructure</li>
            <li><strong>Neon / PostgreSQL</strong> — stores contact form submissions and site content</li>
            <li><strong>Vercel Blob</strong> — stores images uploaded through our admin panel</li>
            <li><strong>Resend</strong> — sends email notifications related to contact form submissions</li>
            <li><strong>Google Analytics</strong> — provides anonymized site usage statistics</li>
          </ul>
          <p className="legal-p">
            Each of these providers has its own privacy practices governing how they handle data on
            our behalf.
          </p>

          <h2 className="legal-h2">Data retention</h2>
          <p className="legal-p">
            We retain contact form submissions to maintain a record of client communications. If
            you&apos;d like your information removed from our records, contact us using the details
            below and we will action your request.
          </p>

          <h2 className="legal-h2">Your rights</h2>
          <p className="legal-p">
            You may request access to, correction of, or deletion of any personal information we hold
            about you by emailing us. We will respond within a reasonable timeframe.
          </p>

          <h2 className="legal-h2">Changes to this policy</h2>
          <p className="legal-p">
            We may update this policy from time to time. Changes will be posted on this page with an
            updated revision date.
          </p>

          <h2 className="legal-h2">Contact us</h2>
          <p className="legal-p">
            Questions about this policy? Email us at{" "}
            <a href="mailto:cymaktechnologiesltd@gmail.com" className="legal-a">cymaktechnologiesltd@gmail.com</a>.
          </p>
        </div>
      </div>
    </>
  );
}