import AboutSection from "@/components/home/AboutSection"
import Hero from "@/components/home/Hero"
import Services from "@/components/home/Services"
import ContactSection from "@/components/home/ContactSection"
import KeyPoints from "@/components/home/KeyPoints"

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <KeyPoints />
      <Services />
      <ContactSection className="lg:mb-36 lg:mt-40" />
    </>
  )
}
