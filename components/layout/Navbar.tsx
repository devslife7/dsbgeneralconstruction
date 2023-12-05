"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import MobileNav from "./MobileNav"
import { LogoSVG, MenuSVG } from "@/public/svgs"
import { NavLink } from "@/types"

const navLinks: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Work",
    href: "/work",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollNav, setScrollNav] = useState(false)
  const pathname = usePathname()
  const isHome = () => pathname !== "/"

  useEffect(() => {
    window.addEventListener("scroll", changeNav)
  }, [])

  const changeNav = () => {
    if (window.scrollY >= 100) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  }

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true)
  }

  const renderNavLinks = () => {
    const isActive = (link: string) => (pathname === link ? "text-primary" : "hover:text-gray-400")
    return navLinks.map((link, index) => (
      <Link
        key={index}
        href={link.href}
        className={`px-0 leading-7 transition-all font-extralight ${isActive(link.href)}`}
      >
        {link.label}
      </Link>
    ))
  }

  return (
    <>
      <div className="h-32"></div>
      <header className="fixed top-0 z-10 w-full transition-all duration-300 ease-in-out bg-custom-white">
        <nav className="flex items-center justify-between h-32 my-container">
          <div className="mt-6 lg:mt-0 lg:flex-1">
            <Link href="/" className="text-xl font-semibold opacity-80 leading-none">
              <LogoSVG className="text-primary inline-block mb-2 mr-2 text-3xl" />
              <span className="text-primary">DSB</span> General Construction
            </Link>
            <p className="mt-2 text-sm break-normal lg:hidden lg:ml-5 font-extralight">123-456-7890</p>
          </div>
          <div className="hidden lg:flex lg:gap-x-7">{renderNavLinks()}</div>

          <p className="hidden break-normal lg:block bg-blue lg:ml-7 font-extralight">123-456-7890</p>
          <button className="p-2.5 lg:hidden" onClick={handleMobileMenuOpen}>
            <span className="sr-only">Open main menu</span>
            <MenuSVG className="text-3xl opacity-80" aria-hidden="true" />
          </button>
        </nav>
        {mobileMenuOpen && (
          <MobileNav
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            navLinks={navLinks}
          />
        )}
      </header>
    </>
  )
}
