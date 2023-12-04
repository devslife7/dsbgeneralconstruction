// import Link from "next/link"
// import { socialMediaLinks } from "@/lib/data/socialMediaLinks"
import ContactForm from "@/components/home/ContactForm"
import ContactSection from "@/components/home/ContactSection"

export default function Contact() {
  return (
    <div>
      <div id="contact" className="grid my-2 my-container py-14 lg:grid-cols-2">
        <div className=" xl:pl-20">
          <h2 className="text-3xl font-semibold opacity-70 mb-2 lg:text-5xl lg:mb-4">
            Let&#39;s Discuss <br /> Your Next Project
          </h2>
          <p className="opacity-60 mb-4 lg:text-lg">
            Fill out the form, call or text us to <br /> set up a free in-home consultation.
          </p>
          <p className="opacity-60 text-lg lg:text-xl">123-456-7890</p>
          <p className="mb-4 opacity-60 text-lg lg:text-xl">email@email.com</p>
          <h3 className="font-medium text-lg opacity-70 lg:text-2xl ">Service Areas:</h3>
          <p className="opacity-60 mb-8 lg:text-lg">
            Northern Virginia, Fairfax, Alexandria, <br />
            Arlington, Sprinfield, Annandale{" "}
          </p>
        </div>

        <div className="w-full">
          <ContactForm />
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d36093.48986257273!2d-77.15705092411386!3d38.872872950293186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1693938889264!5m2!1sen!2sus"
        width="100%"
        height="500"
        loading="lazy"
        className="mb-10"
      ></iframe>
    </div>
  )
}
