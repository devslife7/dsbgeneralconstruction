import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonStyles } from "@/components/ui/button"
import { servicesData } from "@/lib/data/services"

export default function page() {
  const renderServices = () => (
    <div className="grid xl:container max-sm:space-y-4 sm:grid-cols-2 sm:gap-4 lg:mx-auto lg:grid-cols-3 xl:px-8">
      {servicesData.map((service, idx) => {
        return (
          <div key={idx} className="relative text-center sm:max-w-sm sm:pb-20">
            <div className="relative mx-auto h-[12rem] max-w-xl sm:h-[18rem] sm:max-w-sm">
              <Image
                src={service.src}
                alt={service.title}
                fill
                sizes="auto"
                className="object-cover"
                priority={idx < 4}
              />
            </div>
            <div className="my-container hidden sm:block">
              <h2 className="mb-6 mt-10 text-2xl font-medium opacity-80">{service.title}</h2>
              <p className="font-light  opacity-60">{service.Description}</p>
            </div>

            <div className="my-container absolute inset-0 flex items-center justify-center bg-black/30 text-3xl font-medium text-white sm:hidden">
              {service.title}
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="space-y-10 pt-10 lg:pt-20">
      <div className="my-container">
        <h1 className="mb-2 text-center text-3xl font-semibold opacity-80 lg:text-4xl">Our Services</h1>
        <p className="text-center font-light opacity-60">Let us help you make your dreams a reality.</p>
      </div>

      {renderServices()}

      <div className="bg-black py-20 text-center text-white lg:mt-20">
        <h2 className="text-2xl font-semibold">
          Create your dream home. <br /> Tell us about your project <br /> today.
        </h2>

        <div className="my-container text-center">
          <Link href="/contact" className={cn(buttonStyles(), "mt-10 font-light lg:text-lg")}>
            Get A Free Estimate
          </Link>
        </div>
      </div>
    </div>
  )
}
