"use client"

import { buttonStyles } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Error() {
  return (
    <section className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

        <p className="mt-4 text-gray-500">We can't find that page.</p>

        <div className="bg-red-400">
          <Link href="/" className={buttonStyles()}>
            Go Back Home
          </Link>
          <Link
            href="/work"
            className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Reload
          </Link>
        </div>
      </div>
    </section>
  )
}
