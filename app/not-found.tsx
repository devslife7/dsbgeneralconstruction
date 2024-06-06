import { buttonVariants } from "@/components/ui/button"
import { BackArrowSVG } from "@/public/svgs"
import Link from "next/link"

export default function NotFound() {
  return (
    <section className="grid min-h-[600px] place-content-center bg-custom-white px-4">
      <div className="space-y-8 text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

        <p className="mt-4 text-gray-500">Page not found.</p>

        <Link href="/" className={buttonVariants()}>
          <BackArrowSVG />
          Go Home
        </Link>
      </div>
    </section>
  )
}
