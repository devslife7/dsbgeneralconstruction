import { socialMediaLinks } from "@/lib/data/socialMediaLinks"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const renderSocialLinks = () => {
    return socialMediaLinks.map((link, index) => (
      <Link
        key={index}
        className="text-xl text-gray-500 hover:text-white"
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
    <footer className="bg-gray-900">
      <div className="my-container mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-16">
        <div className="py-20 md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <h2 className="mb-8 self-center text-xl font-semibold text-white lg:text-2xl">
                <span className="text-primary">DSB</span> General Construction
              </h2>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">Resources</h2>
              <ul className="font-medium text-gray-500">
                <li className="mb-4">
                  <a href="/admin" className="hover:cursor-pointer hover:underline">
                    Admin
                  </a>
                </li>
                <li>
                  <a className="hover:cursor-pointer hover:underline">About</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">Follow us</h2>
              <ul className="font-medium text-gray-500">
                <li className="mb-4">
                  <a href="https://www.facebook.com/" target="_blank" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank" className="hover:underline ">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">Legal</h2>
              <ul className="font-medium text-gray-500">
                <li className="mb-4">
                  <a className="hover:cursor-pointer hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a className="hover:cursor-pointer hover:underline">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © {currentYear}{" "}
            <a href="#" className="hover:underline">
              DSB General Contruction
            </a>
            . All Rights Reserved.
          </span>
          <div className="mt-4 flex space-x-4 sm:mt-0 sm:justify-center">{renderSocialLinks()}</div>
        </div>
      </div>
    </footer>
  )
}
