"use client"

import Button, { buttonStyles } from "@/components/ui/button"
import { BackArrowSVG, RefreshSVG } from "@/public/svgs"
import Link from "next/link"

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <section className="my-container grid min-h-[600px] place-content-center bg-custom-white text-center">
      <p className="mb-6 text-2xl font-semibold tracking-tight text-primary">There was a problem</p>

      <p className="mb-6 text-6xl font-semibold">{error.message}</p>
      <p className="mb-6 text-6xl font-semibold">{error.stack}</p>
      <p className="mb-12 mt-4 text-gray-500">
        Please try again later or contact support if the problem persists.
      </p>

      <div className="flex justify-center gap-6">
        <Button onClick={reset}>
          <RefreshSVG />
          Try again
        </Button>
        <Link href="/" className={buttonStyles({ variant: "inverted" })}>
          <BackArrowSVG />
          Go Home
        </Link>
      </div>
    </section>
  )
}
