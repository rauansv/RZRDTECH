import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Technologies } from "@/components/sections/technologies";
import { Projects } from "@/components/sections/projects";
import { Differentials } from "@/components/sections/differentials";
import { CTA } from "@/components/sections/cta";
import { services, site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  slogan: site.slogan,
  sameAs: [site.socials.instagram, site.socials.linkedin, site.socials.github],
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title, description: s.description },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Structured data for rich search results.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Services />
      <Process />
      <Technologies />
      <Projects />
      <Differentials />
      <CTA />
    </>
  );
}
