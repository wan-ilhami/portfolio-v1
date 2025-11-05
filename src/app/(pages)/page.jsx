'use client';
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoughNotation } from 'react-rough-notation'
import { Sparkles, Code2, BookOpen, FileText, ArrowRight } from 'lucide-react'
import ActionCard from '../components/commons/action.card.jsx'
import BlogPostCard from '../components/commons/blog.post.card.jsx'



// Main Home Component
const HomePage = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMac, setIsMac] = useState(false)
  const MAX_DISPLAY = 3

  useEffect(() => {
    setIsMac(/(Mac|iPhone|iPad|iPod)/i.test(navigator.platform))
  }, [])

  useEffect(() => {
    setIsMounted(true)
    fetch('/api/blog')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch posts')
        return res.json()
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid API response format')
        }
        const validPosts = data.filter(post => {
          return post?.slug && post?.frontmatter?.date && post?.frontmatter?.title
        })
        setPosts(validPosts)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading posts:', err)
        setError('Failed to load articles. Please try again later.')
        setLoading(false)
      })
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen" >
      <div className="w-full mx-auto px-4">
        {/* Hero Section */}
        <div className="space-y-6 mb-16">
          <motion.header
            className="inline-block text-sm font-semibold uppercase tracking-widest"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Welcome
          </motion.header>

          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              <span style={{ color: 'var(--foreground)' }}>I'm </span>
              <span className="bg-gradient-to-r from-pink-500 via-orange-400 via-yellow-400 via-green-400 via-cyan-400 via-blue-500 to-purple-500 dark:from-fuchsia-400 dark:via-purple-400 dark:via-indigo-400 dark:via-blue-400 dark:via-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Wan Ilhami
              </span>
            </h1>
          </motion.header>

          <div className="space-y-4 max-w-3xl">
            <p className="text-xl font-medium leading-relaxed" style={{ color: 'var(--foreground)' }}>
              Full Stack Developer crafting scalable web applications with modern technologies.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--secondary)' }}>
              I build end-to-end solutions that combine{' '}
              <RoughNotation
                type="underline"
                show={true}
                color="rgb(59, 130, 246)"
                animationDuration={800}
                animationDelay={300}
              >
                intuitive user experiences
              </RoughNotation>{' '}
              with{' '}
              <RoughNotation
                type="underline"
                show={true}
                color="rgb(59, 130, 246)"
                animationDuration={800}
                animationDelay={600}
              >
                robust backend architecture
              </RoughNotation>
              . Passionate about clean code, performance optimization, and leveraging cloud infrastructure to solve real-world problems.
            </p>
          </div>

          {/* Quote Section */}
          <div
            className="pt-4 space-y-3"
          >
            <p className="text-base leading-relaxed italic max-w-2xl" style={{ color: 'var(--secondary)' }}>
              "Building the web one line at a time. I believe in creating{' '}
              <RoughNotation
                type="circle"
                show={true}
                color="#EC4899"
                animationDelay={800}
                animationDuration={2000}
                strokeWidth={2}
              >
                meaningful
              </RoughNotation>
              {' '}digital experiences that solve real problems and inspire users."
            </p>
            <p className="text-sm" style={{ color: 'var(--secondary)' }}>
              Every project is an opportunity to learn, grow, and push the boundaries of what's possible.
            </p>
          </div>


          {/* Keyboard Shortcut */}
          <motion.div
            className="pt-4 hidden md:flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ color: 'var(--secondary)' }}
          >
            <span className="text-sm">Press</span>
            <kbd className="px-2 py-1 text-sm font-semibold rounded-md" style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}>
              {isMac ? '⌘' : 'Ctrl'}
            </kbd>
            <span className="text-sm">+</span>
            <kbd className="px-2 py-1 text-sm font-semibold rounded-md" style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}>
              K
            </kbd>
            <span className="text-sm">to start</span>
          </motion.div>

          {/* Enhanced Divider */}
          <motion.div
            className="space-y-2 pt-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            style={{ originX: 0 }}
          >
            <div className="h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-transparent dark:from-cyan-400 dark:via-fuchsia-400 dark:to-transparent rounded-full max-w-xl" />
            <div className="h-px bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-transparent dark:from-cyan-400/30 dark:via-fuchsia-400/30 dark:to-transparent max-w-xl" />
          </motion.div>
        </div>

        {/* Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          <ActionCard
            href="/projects"
            icon={Code2}
            iconColor="text-green-600"
            title="What I've Built"
            linkText="Projects"
            linkColor="text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300"
            gradient="from-pink-600 to-purple-600"
          />
          <ActionCard
            href="/about"
            icon={BookOpen}
            iconColor="text-pink-600"
            title="Read My Story"
            linkText="About"
            linkColor="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
            gradient="from-fuchsia-600 to-emerald-600"
          />
          <ActionCard
            href="/Wan_Ilhami_Mahfudz_Resume-v1.1.pdf"
            icon={FileText}
            iconColor="text-amber-600"
            title="Hire Me!"
            linkText="Resume"
            linkColor="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            gradient="from-blue-600 to-cyan-600"
            isExternal
          />
        </motion.div>

        {/* Latest Articles Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Section Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5" style={{ color: 'var(--accent)' }} />
              <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--secondary)' }}>
                Latest Articles
              </h2>
            </div>

            <motion.div
              className="space-y-2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ originX: 0 }}
            >
              <div className="h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-transparent dark:from-cyan-400 dark:via-fuchsia-400 dark:to-transparent rounded-full max-w-xl" />
              <div className="h-px bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-transparent dark:from-cyan-400/30 dark:via-fuchsia-400/30 dark:to-transparent max-w-xl" />
            </motion.div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-12 w-12 border-4 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: 'var(--border)', borderTopColor: 'transparent' }} />
                <p className="text-sm font-medium" style={{ color: 'var(--secondary)' }}>
                  Loading articles...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <p className="text-red-500 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && !posts.length && (
            <div className="text-center py-20">
              <p style={{ color: 'var(--secondary)' }}>No posts found.</p>
            </div>
          )}

          {/* Blog Posts Grid */}
          {!loading && posts.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {posts.slice(0, MAX_DISPLAY).map((post, index) => (
                    <BlogPostCard key={post.slug} post={post} index={index} />
                  ))}
                </AnimatePresence>
              </div>

              {/* View All Link */}
              {posts.length > MAX_DISPLAY && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-end pt-4"
                >
                  <a
                    href="/blog"
                    className="inline-flex items-center gap-2 text-base font-semibold transition-all duration-200 group"
                    style={{ color: 'var(--primary)' }}
                  >
                    View All Articles
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              )}
            </>
          )}
        </motion.section>
      </div>
    </div>
  )
}

export default HomePage