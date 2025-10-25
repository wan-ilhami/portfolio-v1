'use client'

import { useState, useEffect } from 'react'
import { PageSEO } from '../../components/commons/seo'
import CustomLink from '../../components/commons/link'
import { motion } from 'framer-motion'
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation'

const normalizePost = (post) => ({
  slug: post.slug || '',
  title: post.title || post.frontmatter?.title || 'Untitled',
  description: post.description || post.frontmatter?.summary || '',
  date: post.date || post.frontmatter?.date || '',
  tags: post.tags || post.frontmatter?.tags || []
})

const formatDate = (date) => {
  if (!date) return 'No date'
  const parsed = new Date(date)
  if (isNaN(parsed.getTime())) return 'Invalid date'
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function blogPage({ title = 'Blog' }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [isMounted, setIsMounted] = useState(false)


  useEffect(() => {

    fetch('/api/blog')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch posts')
        return res.json()
      })
      .then(data => {
        const normalized = data.map(normalizePost)
        setPosts(normalized)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading posts:', err)
        setError(err.message)
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
        setIsMounted(true)
      })
  }, [])

  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = `${post.title} ${post.description} ${post.tags.join(' ')}`
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const clearSearch = () => setSearchValue('')

  // Loading skeleton
  if (!isMounted || loading) {
    return (
      <div className="min-h-screen">
        <div className="w-full mx-auto px-4">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="relative flex flex-col items-center">
              {/* Spinner Circle */}
              <div className="h-12 w-12 border-4 border-gray-300 border-t-transparent 
                            dark:border-gray-700 dark:border-t-cyan-400 
                            rounded-full animate-spin"></div>

              {/* Optional Loading Text */}
              <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
                Loading posts...
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }


  if (error) {
    return (
      <>
        <PageSEO title="Blog - Error" description="Error loading posts" />
        <div className="min-h-screen">
          <div className="w-full mx-auto px-4">
            <div className="max-w-3xl mx-auto py-20 text-center">
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-3">
                  Oops! Something went wrong.
                </h2>
                <p className="text-red-500 dark:text-red-400">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white rounded-xl font-medium hover:opacity-90 transition"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const hasNoPosts = posts.length === 0
  const hasNoResults = filteredBlogPosts.length === 0 && searchValue

  return (
    <>
      <PageSEO
        title="Blog - Articles & Insights"
        description="Explore my latest insights, tutorials, and thoughts."
      />

      <div className="min-h-screen">
        <div className="w-full mx-auto px-4">
          <div className="space-y-6 mb-16">
            <header className="space-y-6 mb-16">
              <motion.header
                className="inline-block text-sm font-semibold uppercase tracking-widest"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                Blog Post
              </motion.header>

              {/* Main Title + Subtext */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight 
                 bg-gradient-to-r from-pink-500 via-orange-400 via-yellow-400 via-green-400 via-cyan-400 via-blue-500 to-purple-500 
                 dark:from-fuchsia-400 dark:via-purple-400 dark:via-indigo-400 dark:via-blue-400 dark:via-cyan-400 dark:to-emerald-400 
                 bg-clip-text text-transparent drop-shadow-sm"
                >
                  {title}
                </h1>
                </motion.header>

                <RoughNotation type="underline" color="#06b6d4" show={true} strokeWidth={2}>
                  <span className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium sm:text-right sm:max-w-xs inline-block">
                    Articles thoughtfully crafted to highlight innovation, technology, and creative insights shaping the digital world.
                  </span>
                </RoughNotation>

              </div>
            </header>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* 🔍 Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <div
                  className="relative flex items-center rounded-2xl bg-white/70 dark:bg-black backdrop-blur-lg
                             border border-gray-200 dark:border-gray-800 shadow-sm focus-within:ring-2 
                             focus-within:ring-indigo-400/50 transition-all duration-300"
                >
                  {/* Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-4 h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
                  </svg>

                  {/* Input */}
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full bg-transparent pl-12 pr-10 py-3 rounded-2xl 
                               text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 
                               focus:outline-none"
                  />

                  {/* Clear button */}
                  {searchValue && (
                    <button
                      onClick={clearSearch}
                      aria-label="Clear search"
                      className="absolute right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* 📰 Articles */}
              <section className="space-y-5">
                {hasNoPosts ? (
                  <p className="text-center text-gray-500 dark:text-gray-400">No posts available yet.</p>
                ) : hasNoResults ? (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No results for "{searchValue}".
                  </p>
                ) : (
                  filteredBlogPosts.map((post, idx) => (
                    <motion.article
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative overflow-hidden rounded-2xl border border-gray-200 
                                 dark:border-gray-800 bg-gradient-to-br from-white via-gray-50 to-gray-100 
                                 dark:from-[#161616] dark:via-[#1a1a1a] dark:to-[#121212] 
                                 hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] hover:scale-[1.015]
                                 transition-all duration-300 ease-out"
                    >
                      <div className="p-8">
                        <CustomLink href={`/blog/${post.slug}`}>
                          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 
                                         group-hover:text-transparent bg-clip-text bg-gradient-to-r 
                                         from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-300">
                            {post.title}
                          </h2>


                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                            <span>{formatDate(post.date)}</span>
                            {post.tags?.length > 0 && (
                              <div className="flex gap-2 flex-wrap">
                                {post.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full text-xs font-medium 
                                             bg-gradient-to-r from-indigo-500/10 to-cyan-400/10 
                                             border border-purple-500/30 text-purple-600 dark:text-purple-300"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {post.description && (
                            <p className="mt-4 text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
                              {post.description}
                            </p>
                          )}
                        </CustomLink>
                      </div>
                    </motion.article>
                  ))
                )}
              </section>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}