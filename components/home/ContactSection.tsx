import ContactForm from "./ContactForm"

export default function Contact() {
    return (
        <section id="contact" className="grid my-2 my-container py-14 lg:mb-36 lg:grid-cols-2 lg:mt-40">
            <div className=" xl:pl-20">
                <h2 className="text-3xl font-semibold opacity-70 mb-2 lg:text-5xl lg:mb-4">
                    Let's Discuss <br /> Your Next Project
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
        </section>
    )
}
