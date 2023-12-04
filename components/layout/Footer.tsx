import Link from "next/link"
import { socialMediaLinks } from "@/lib/data/socialMediaLinks"

export default function Footer() {
    const renderSocialLinks = () => {
        return socialMediaLinks.map((link, index) => (
            <Link
                key={index}
                className="text-3xl hover:text-primary"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
            >
                {link.icon}
            </Link>
        ))
    }

    return (
        <footer className="sticky mt-auto top-full bg-custom-black text-custom-white">
            <div className="flex flex-col items-center justify-center my-container h-52 gap-y-4 md:flex-row md:justify-between">
                <div className="text-xl text-center">
                    <span className="text-primary">DSB</span> General Construction
                </div>
                <div className="text-center ">
                    Copyright © 2023 <span className="text-primary">DSB</span> General Construction. All
                    rights reserved.
                </div>
                <div className="flex justify-center gap-x-6">{renderSocialLinks()}</div>
            </div>
        </footer>
    )
}
