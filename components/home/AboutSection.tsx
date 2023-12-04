import KitchenBg from "@/public/images/kitchen-bg.webp"
import Image from "next/image"
import Button, { buttonStyles } from "../ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AboutSection() {
    return (
        <div className="grid my-12 text-center my-container lg:text-left lg:grid-cols-2">
            <div className="w-full max-w-lg m-auto space-y-8 lg:order-1 lg:space-y-10 lg:max-xl:ml-6">
                <div className="text-3xl font-medium lg:font-normal lg:text-5xl">
                    The Leading Bay Area Remodeling Company
                </div>
                <p className="text-lg font-light opacity-70">
                    Our home renovation business is making waves in the Bay Area with our unique blend of
                    creativity and craftsmanship. From kitchen makeovers that leave taste buds tingling to
                    bathroom remodels that feel like a spa day at home.
                </p>
                <Link href="/about" className={cn(buttonStyles(), "font-light lg:text-lg mt-10")}>
                More About Us
            </Link>

            </div>
            <Image
                src={KitchenBg}
                height={900}
                alt="kitchen"
                className="mx-auto mt-10 lg:mx-0 lg:mt-0"
            />
        </div>
    )
}
