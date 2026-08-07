import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";

// This page pulls live data (project count, portfolio items, latest blog
// posts) from the database via Hero/Projects/Blog. Without this, Next.js
// statically renders the page once at build time and serves that same
// frozen HTML forever — admin changes would never appear until the next
// deployment.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <Projects />
      <About />
      <Contact />
      <Testimonials />
      <Blog />
      <Footer />
    </main>
  );
}