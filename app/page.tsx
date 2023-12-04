import AboutSection from "@/components/home/AboutSection"
import Hero from "@/components/home/Hero"
// import KeyPoints from "@/components/home/KeyPoints"
import Services from "@/components/home/Services"
import ContactSection from "@/components/home/ContactSection"
import Points from "@/components/home/Points"

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      {/* <KeyPoints /> */}
      <Points />
      <Services />
      <ContactSection />
    </>
  )
}
