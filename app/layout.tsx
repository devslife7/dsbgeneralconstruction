import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import type { Metadata } from "next"
import { Inter, Roboto, Titillium_Web } from "next/font/google"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
})
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-titillium",
})

export const metadata: Metadata = {
  title: "dsbgeneralconstruction",
  description: "Home improvement contractor",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <body className={`${inter.className} bg-custom-white`}> */}
      <body className={cn("bg-custom-white", inter.className, titillium.variable, roboto.variable)}>
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
