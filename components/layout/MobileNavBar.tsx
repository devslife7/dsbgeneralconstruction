"use client"

import { cn } from "@/lib/utils"
import { LogoSVG, MenuSVG } from "@/public/svgs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"

const navLinks = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Work",
    href: "/work"
  },
  {
    label: "Services",
    href: "/services"
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Contact",
    href: "/contact"
  }
]

export default function Navbar() {
  const linksRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollNav, setScrollNav] = useState(false)
  const pathname = usePathname()

  const handleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const toggleMenu = (e: any) => {
    // navLinks?.classList.toggle("top-[9%]")
    linksRef?.current?.classList.toggle("top-100")
  }

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true)
  }

  const openMenu = () => {
    setOpen(!open)
  }

  const renderNavLinks = () => {
    const isActive = (link: string) => (pathname === link ? "text-primary" : "hover:text-gray-400")
    return navLinks.map((link, index) => (
      <Link
        key={index}
        href={link.href}
        className={`px-0 font-extralight leading-7 transition-all ${isActive(link.href)}`}
      >
        {link.label}
      </Link>
    ))
  }

  return (
    <>
      <div className="h-24"></div>
      <nav className="fixed left-0 top-0 z-20 w-full bg-white p-5 md:flex md:justify-between">
        <div className="z-20 flex items-center justify-between ">
          <span className="cursor-pointer text-2xl">
            <img
              className="inline h-10"
              src="https://tailwindcss.com/_next/static/media/social-square.b622e290e82093c36cca57092ffe494f.jpg"
            />
            tailwind
          </span>
          <span className="mx-2 block cursor-pointer text-3xl md:hidden">
            <div onClick={openMenu} className="h-full w-full bg-green-200">
              MENU
            </div>
          </span>
        </div>
        {renderNavLinks()}
      </nav>
      <div>
        <ul
          className={cn(
            "opacity-1 absolute left-0 top-0 z-10 w-full -translate-y-[100%] bg-red-300 text-center transition-all duration-200 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:py-0 md:pl-0",
            { " translate-y-[4.5rem] ": open }
          )}
        >
          <li className="mx-4 my-6 md:my-0">
            <a href="/" className="text-xl duration-500">
              Home
            </a>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <a href="/services" className="text-xl duration-500">
              Services
            </a>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <a href="/contact" className="text-xl duration-500">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
