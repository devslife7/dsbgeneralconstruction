import AboutSection from "@/components/home/AboutSection"
import Hero from "@/components/home/Hero"
import Services from "@/components/home/Services"
import SimplifiedContactSection from "@/components/home/SimplifiedContactSection"
import Points from "@/components/home/Points"
import Testimonials from "@/components/home/Testimonials"

export default function Home() {
  return (
    <>
      <Hero />
      <Points />
      <AboutSection />
      <Testimonials />
      <Services />
      <SimplifiedContactSection className="lg:mb-36 lg:mt-40" />
    </>
  )
}
