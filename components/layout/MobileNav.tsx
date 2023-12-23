import { cn } from "@/lib/utils"
import { CloseSVG, HomeWorkSVG } from "@/public/svgs"
import { Dialog } from "@headlessui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

type Props = {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (val: boolean) => void
  navLinks: {
    href: string
    label: string
  }[]
}

export default function MobileNav({ mobileMenuOpen, setMobileMenuOpen, navLinks }: Props) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const handleNav = () => {
    console.log("handleNav")
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className="fixed h-24 w-full bg-white shadow-xl">
      <div className="hidden h-full w-full items-center justify-between px-4 sm:flex 2xl:px-16">
        <ul className="hidden sm:flex">
          <Link href="/about">
            <li className="ml-10 text-xl uppercase hover:border-b">About us</li>
          </Link>
          <Link href="/contact">
            <li className="ml-10 text-xl uppercase hover:border-b">Contact us</li>
          </Link>
          <Link href="/work">
            <li className="ml-10 text-xl uppercase hover:border-b">Work</li>
          </Link>
        </ul>
      </div>
      <div onClick={handleNav} className="cursor pointer pl-24 sm:hidden">
        MENU
      </div>
    </nav>
    // <Dialog as="div" className="transition-all lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
    //   <Dialog.Panel className="fixed bottom-0 right-0 top-0 z-10 w-full max-w-[15rem] overflow-y-auto bg-custom-white p-6 sm:ring-1 sm:ring-gray-900/10 ">
    //     <div className="mt-6 flex items-center justify-between ">
    //       <HomeWorkSVG className="text-4xl text-primary" />
    //       <button type="button" className="rounded-md" onClick={closeMobileMenu}>
    //         <CloseSVG className=" text-3xl opacity-70" aria-hidden="true" />
    //         <span className="sr-only">Close menu</span>
    //       </button>
    //     </div>
    //     <div className="mt-10 flow-root">
    //       <div className="-my-6 divide-y divide-gray-500/10">
    //         <div className="py-6">
    //           {navLinks.map((link, index) => (
    //             <Link
    //               key={index}
    //               className={cn(
    //                 "-mx-2 block px-3 py-5 text-center text-lg font-medium leading-7 opacity-60",
    //                 { "text-primary opacity-100": pathname === link.href }
    //               )}
    //               //   onClick={closeMobileMenu}
    //               href={link.href}
    //             >
    //               {link.label}
    //             </Link>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </Dialog.Panel>
    // </Dialog>
  )
}
