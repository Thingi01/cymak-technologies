import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      
      <Services />
      <Projects />
      <About />
      <Contact />
      <Blog />
      <Footer />
    </main>
  );
}
