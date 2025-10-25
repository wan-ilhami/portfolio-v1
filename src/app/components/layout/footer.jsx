'use client'
import Link from '../commons/link'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  const currentDayName = () => {
    const date = new Date()
    return date.toLocaleString('default', { weekday: 'long' })
  }

  return (
    <footer className="py-6 mb-5">
      {/* Divider */}
      <hr className="border-gray-200 dark:border-gray-700 mt-4 mb-6" />

      <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
        {/* Left side */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span>© {new Date().getFullYear()} Wan Ilhami,</span>
          <span
            className="animate-gradient bg-gradient-to-r from-pink-500 via-orange-400 via-yellow-400 via-green-400 via-cyan-400 via-blue-500 to-purple-500 dark:from-fuchsia-400 dark:via-purple-400 dark:via-indigo-400 dark:via-blue-400 dark:via-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent text-sm font-medium">
            Have a good {currentDayName()}!
          </span>
        </div>

        {/* Right side (socials) */}
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
          <Link
            href="https://github.com/wan-ilhami"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-primary"
          >
            <FaGithub className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/wan-ilhami"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-primary"
          >
            <FaLinkedin className="h-5 w-5" />
          </Link>
          <Link
            href="https://twitter.com/wanilhami"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-primary"
          >
            <FaTwitter className="h-5 w-5" />
          </Link>
          <Link
            href="https://instagram.com/wanilhami"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-primary"
          >
            <FaInstagram className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
