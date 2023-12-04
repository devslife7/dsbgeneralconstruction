import { cn } from "@/lib/utils"
import { CloseSVG, HomeWorkSVG } from "@/public/svgs"
import { Dialog } from "@headlessui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
    }

    return (
        <Dialog
            as="div"
            className="transition-all lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
        >
            <Dialog.Panel className="fixed top-0 bottom-0 right-0 z-10 w-full overflow-y-auto bg-custom-white px-6 py-6 max-w-[15rem] sm:ring-1 sm:ring-gray-900/10 ">
                <div className="flex items-center justify-between mt-6 ">
                    <HomeWorkSVG className="text-4xl text-primary" />
                    <button type="button" className="rounded-md" onClick={closeMobileMenu}>
                        <span className="sr-only">Close menu</span>
                        <CloseSVG className="mr-1 text-3xl opacity-70" aria-hidden="true" />
                    </button>
                </div>
                <div className="flow-root mt-10">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="py-6">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    className={cn(
                                        "-mx-2 block px-3 py-5 font-medium leading-7 text-lg text-center opacity-60",
                                        { "text-primary opacity-100": pathname === link.href }
                                    )}
                                    onClick={closeMobileMenu}
                                    href={link.href}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    )
}
