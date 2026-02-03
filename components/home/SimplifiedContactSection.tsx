import { cn } from "@/lib/utils"
import ContactForm from "./ContactForm"

export default function SimplifiedContactSection({ className }: { className?: string }) {
  return (
    <section id="contact" className={cn("grid my-2 my-container py-14 gap-8 lg:grid-cols-2 lg:gap-12", className)}>
      <div className="xl:pl-20 flex flex-col">
        <h2 className="text-3xl font-semibold opacity-70 mb-6 leading-tight lg:text-5xl lg:mb-8 lg:leading-tight">
          Let&#39;s Discuss <br /> Your Next Project
        </h2>
        <p className="opacity-60 mb-6 text-base leading-relaxed lg:text-lg lg:mb-8">
          Call or text us to set up a free
          <br />
          in-home consultation.
        </p>
        <p className="opacity-60 text-lg lg:text-xl">123-456-7890</p>
        <p className="mb-4 opacity-60 text-lg lg:text-xl">email@email.com</p>
        <h3 className="font-medium text-lg opacity-70 lg:text-2xl ">Service Areas:</h3>
        <p className="opacity-60 mb-8 lg:text-lg">
          Northern Virginia, Fairfax, Alexandria, <br />
          Arlington, Springfield, Annandale
        </p>
      </div>

      <div className="w-full flex items-start">
        <div className="w-full">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
