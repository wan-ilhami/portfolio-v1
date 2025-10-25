'use client'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ScrollProgressBar() {
  const [scroll, setScroll] = useState(0)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScroll(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 🧠 Avoid rendering until theme is ready (prevents mismatch)
  if (!mounted) {
    return (
      <div className="fixed top-0 left-0 w-full h-[5px] z-50 bg-transparent">
        <div className="h-full bg-transparent transition-none duration-0" />
      </div>
    )
  }

  const isDark = (theme || resolvedTheme) === 'dark'

  return (
    <div className="fixed top-0 left-0 w-full h-[5px] z-50 bg-transparent">
      <div
        className={`h-full transition-none duration-0 ${
          isDark
            ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 shadow-[0_0_8px_rgba(0,0,255,0.6)]'
            : 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 shadow-[0_0_8px_rgba(255,100,0,0.5)]'
        }`}
        style={{ width: `${scroll}%` }}
      />
    </div>
  )
}
