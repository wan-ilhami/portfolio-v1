'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const Experience = ({ title, company, location, range, url, ...rest }) => {
  const points = Object.entries(rest)
    .filter(([key]) => key.startsWith('text') && rest[key])
    .map(([_, value]) => value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="
        border-b border-gray-200 dark:border-gray-700 
        pb-8 last:border-0 last:pb-0
        bg-[var(--background)]
        transition-colors duration-300
      "
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}{' '}
          <span className="text-[#7B0323] dark:text-[#D875C7]">
            @{' '}
            <Link
              href={url}
              className="
                relative text-[#7B0323] dark:text-[#D875C7]
                hover:text-[#8B1874] dark:hover:text-[#E16EDC]
                transition-colors duration-300
                after:absolute after:left-0 after:-bottom-0.5
                after:h-[2px] after:w-0 after:bg-current
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              {company}
            </Link>
          </span>
        </h3>
        <span className="mt-1 sm:mt-0 text-sm font-mono text-gray-500 dark:text-gray-400">
          {range}
        </span>
      </div>

      {/* Location */}
      {location && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {location}
        </p>
      )}

      {/* Bullet Points */}
      <ul className="space-y-1 prose dark:prose-invert max-w-none xl:col-span-2 text-sm text-gray-700 dark:text-gray-300">
        {points.map((text, idx) => (
          <li key={idx} className="flex items-start">
            <span className="mr-2 text-[#8B1874] dark:text-[#E16EDC]">•</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="
          origin-center w-1/2 mx-auto h-px 
          bg-gradient-to-r from-transparent via-[#8B1874] to-transparent 
          dark:via-[#E16EDC] my-6
        "
      />
    </motion.div>
  )
}

export default Experience
