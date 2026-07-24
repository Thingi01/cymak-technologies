/**
 * Seeds the Project table with the content that used to be hardcoded in
 * components/Projects.tsx, so the site looks identical after switching to
 * the database — you can then edit/reorder/add through /admin/projects.
 *
 * Usage:
 *   npx tsx scripts/seed-projects.ts
 *
 * Safe to re-run: it upserts on (category, title).
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const websites = [
  {
    type: "Full Website", title: "Mush Tech Solution",
    description: "Corporate website for a Nairobi-based advanced security & IT services company. Features service listings, product gallery, WhatsApp CTA, and contact integration.",
    tags: ["HTML/CSS", "JavaScript", "Responsive", "WhatsApp API"],
    link: "https://mushtechsolution-website.vercel.app/",
  },
  {
    type: "Portfolio Website", title: "Cyrus Maina — Developer Portfolio",
    description: "Personal portfolio site showcasing development skills, projects, and professional profile. Clean, modern design built for career growth.",
    tags: ["React", "JavaScript", "Responsive", "Vercel"],
    link: "https://my-portifolio-cyrus.vercel.app/",
  },
  {
    type: "Full Website", title: "Saferon Systems Limited",
    description: "Corporate site for a 30+ year veteran in electronic security and IT solutions in Nairobi. Built to reflect institutional trust and extensive service offerings.",
    tags: ["HTML/CSS", "Responsive", "Multi-section", "Vercel"],
    link: "https://saferon-systemsltd.vercel.app/",
  },
];

const landingPages = [
  {
    type: "Landing Page", title: "LUXURE — Black November Drop",
    description: "High-converting luxury fashion landing page with countdown timer, product showcase, and flash sale mechanics for a limited drop campaign.",
    tags: ["HTML/CSS/JS", "Countdown Timer", "E-commerce UX", "Conversion Optimized"],
    link: "https://luxury-landing-page-teal.vercel.app/",
  },
  {
    type: "Landing Page", title: "TechDeals — Dell XPS 13 Product Page",
    description: "Single-product sales landing page for the Dell XPS 13 9380. Clean spec breakdown, trust signals, and direct purchase CTA optimized for conversions.",
    tags: ["HTML/CSS/JS", "Product Page", "Sales Focused", "Mobile-Ready"],
    link: "https://tech-deals-alpha.vercel.app/",
  },
];

// Note: these point at the existing /public/images/designs files, which
// still ship in the repo. Re-upload through /admin/projects if you'd rather
// have them served from Vercel Blob instead.
const designSamples = [
  { type: "Event Flyer", title: "Event Flyer", description: "Bold, eye-catching event flyer designed for maximum social media engagement and shareability.", image: "/images/designs/mtlongonot.png" },
  { type: "Promotional Poster", title: "Promotional Poster", description: "High-impact promotional poster crafted to communicate offers clearly and drive audience action.", image: "/images/designs/marketing.png" },
  { type: "Social Media Flyer", title: "Social Media Flyer", description: "Clean, branded social media flyer optimized for Instagram and Facebook with strong visual hierarchy.", image: "/images/designs/mushtech.png" },
  { type: "Digital Poster", title: "Digital Poster", description: "Professional digital poster designed to build brand presence and capture attention across platforms.", image: "/images/designs/ack.png" },
];

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  let order = 0;
  for (const p of websites) {
    await prisma.project.upsert({
      where: { id: `seed-website-${slugify(p.title)}` },
      update: { ...p, order },
      create: { id: `seed-website-${slugify(p.title)}`, category: "WEBSITE", order, published: true, ...p },
    });
    order++;
  }

  order = 0;
  for (const p of landingPages) {
    await prisma.project.upsert({
      where: { id: `seed-landing-${slugify(p.title)}` },
      update: { ...p, order },
      create: { id: `seed-landing-${slugify(p.title)}`, category: "LANDING_PAGE", order, published: true, ...p },
    });
    order++;
  }

  order = 0;
  for (const p of designSamples) {
    await prisma.project.upsert({
      where: { id: `seed-design-${slugify(p.title)}` },
      update: { ...p, order },
      create: { id: `seed-design-${slugify(p.title)}`, category: "DESIGN", order, published: true, tags: [], ...p },
    });
    order++;
  }

  console.log("✔ Seeded projects table with original portfolio content.");
  await prisma.$disconnect();
}

function slugify(input: string): string {
  return input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
