import { cn } from "@/lib/utils"
import ContactForm from "./ContactForm"

export default function SimplifiedContactSection({ className }: { className?: string }) {
  return (
    <section className={cn("my-container py-14", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-semibold opacity-70 lg:text-4xl">
          Get in Touch
        </h2>
        <p className="mb-8 opacity-60 lg:text-lg">
          Have a project in mind? Send us a message and we'll get back to you as soon as possible.
        </p>
        <div className="mx-auto max-w-xl">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
