import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

import { StarBackground } from "@/components/StarBackground";

import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Playground } from "@/components/Playground";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground selection:bg-cyan-500/30">
      <StarBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Skills />
      <Playground />
      <Certifications />
      <Contact />
    </main>
  );
}
