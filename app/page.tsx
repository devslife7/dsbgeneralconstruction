import AboutSection from "@/components/home/AboutSection"
import Hero from "@/components/home/Hero"
import Services from "@/components/home/Services"
import ContactSection from "@/components/home/ContactSection"
import Points from "@/components/home/Points"

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      {/* <Points /> */}
      <Services />
      <ContactSection className="lg:mb-36 lg:mt-40" />
    </>
  )
}
