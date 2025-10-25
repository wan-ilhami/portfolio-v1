'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function SunIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8a4.25 4.25 0 0 1 4.25 4.25 4.25 4.25 0 0 1-4.25 4.25A4.25 4.25 0 0 1 8 12.25Z" />
      <path d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061" />
    </svg>
  )
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  
  if (!mounted) {
    return (
      <div className="group flex items-center justify-center rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10">
        <div className="h-5 w-5">
          <svg className="animate-spin h-5 w-5 text-zinc-600 dark:text-zinc-300" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
              fill="none"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>
    )
  }

  const isDark = resolvedTheme === 'dark'
  const nextTheme = isDark ? 'light' : 'dark'

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} mode`}
      className="group flex items-center justify-center rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm transition hover:ring-2 dark:bg-zinc-800/90 dark:ring-white/10"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <SunIcon className="h-5 w-5 stroke-zinc-200" />
          ) : (
            <MoonIcon className="h-5 w-5 stroke-zinc-600" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}