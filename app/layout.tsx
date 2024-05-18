import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter, Roboto, Titillium_Web } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto"
})
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-titillium"
})

export const metadata: Metadata = {
  title: "dsbgeneralconstruction",
  description: "Home improvement contractor"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <body className={`${inter.className} bg-custom-white`}> */}
      <body className={cn("bg-custom-white", inter.className, titillium.variable, roboto.variable)}>
        <Navbar />
        {/* <MobileNavBar /> */}
        {children}
        <Toaster richColors position="top-center" />
        <Footer />
      </body>
    </html>
  )
}
