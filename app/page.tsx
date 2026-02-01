import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Impact from "./components/Impact";
import FeaturedProject from "./components/FeaturedProject";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <main className="w-full">
      {/* Section 1: Home */}
      <section id="home">
        <Hero />
      </section>
      
      {/* Section 2: About Us */}
      <section id="about">
        <About />
      </section>
      
      {/* Section 3: What We Do */}
      <section id="services">
        <Services />
      </section>
      
      {/* Section 4: Why Choose Us */}
      <section id="why-choose">
        <Impact />
      </section>
      
      {/* Section 5: Partnership / Become a Partner */}
      <section id="partnership">
        <FeaturedProject />
      </section>
      
      {/* Section 6: Contact Us */}
      <section id="contact">
        <Contact />
      </section>
      

      {/* Section 7: Footer */}
      <Footer />
    </main>
  );
}
