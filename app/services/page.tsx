import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonStyles } from "@/components/ui/button"
import { servicesData } from "@/lib/data/services"

export default function page() {
  const renderServices = () => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 xl:container lg:mx-auto xl:px-8 max-sm:space-y-4">
      {servicesData.map((service, idx) => {
        return (
          <div key={idx} className="text-center sm:max-w-sm sm:pb-20 relative">
            <div className="h-[12rem] sm:h-[18rem] max-w-xl sm:max-w-sm relative mx-auto bg-red-200">
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
              <h2 className="opacity-80 text-2xl font-medium mb-6 mt-10">{service.title}</h2>
              <p className="opacity-60  font-light">{service.Description}</p>
            </div>

            <div className="my-container sm:hidden absolute inset-0 flex items-center justify-center bg-black/30 text-3xl text-white font-medium">
              {service.title}
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="pt-10 lg:py-20 space-y-10">
      <div className="my-container">
        <h1 className="text-3xl text-center font-semibold opacity-80 mb-2 lg:text-4xl">Our Services</h1>
        <p className="text-center opacity-60 font-light">Let us help you make your dreams a reality.</p>
      </div>

      {renderServices()}

      <div className="text-center lg:mt-20 bg-black text-white py-20">
        <h2 className="font-semibold text-2xl">
          Create your dream home. <br /> Tell us about your project <br /> today.
        </h2>

        <div className="my-container text-center">
          <Link href="/contact" className={cn(buttonStyles(), "font-light lg:text-lg mt-10")}>
            Get A Free Estimate
          </Link>
        </div>
      </div>
    </div>
  )
}
