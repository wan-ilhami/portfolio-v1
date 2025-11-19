'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import projectsData from './projects.data'
import ProjectCard from '@/app/components/commons/project.card'
import { PageSEO } from '../../components/commons/seo'
import { usePathname } from 'next/navigation'

const ProjectsPage = () => {
  const pathname = usePathname()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Full-stack', 'Backend', 'Frontend', 'Design', 'AI/ML', 'DevOps', 'Cloud']

  // Fixed filter logic to handle array categories
  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => 
        Array.isArray(p.category) 
          ? p.category.includes(selectedCategory)
          : p.category === selectedCategory
      )

  return (
    <>
      <PageSEO title="Projects - Wan Ilhami" description="project huhu" pathname={pathname} />
      <div className="min-h-screen">
        <div className="w-full mx-auto px-4">
          {/* Header Section */}
          <motion.header
            className="space-y-6 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span
              className="inline-block text-sm font-semibold uppercase tracking-widest"
              style={{ color: 'var(--secondary)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              What I've Built
            </motion.span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
              Active Projects
            </h1>

            <p className="text-md max-w-lg" style={{ color: 'var(--secondary)' }}>
              Explore a curated collection of my latest work, showcasing my expertise across full-stack development, design, and innovative solutions.
            </p>

            {/* Enhanced Divider */}
            <motion.div
              className="space-y-2 pt-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              style={{ originX: 0 }}
            >
              <div className="h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-transparent dark:from-cyan-400 dark:via-fuchsia-400 dark:to-transparent rounded-full max-w-xl"></div>
              <div className="h-px bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-transparent dark:from-cyan-400/30 dark:via-fuchsia-400/30 dark:to-transparent max-w-xl"></div>
            </motion.div>
          </motion.header>

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              {categories.map((category) => {
                const isSelected = selectedCategory === category
                // Count projects in this category
                const count = category === 'All' 
                  ? projectsData.length
                  : projectsData.filter(p => 
                      Array.isArray(p.category) 
                        ? p.category.includes(category)
                        : p.category === category
                    ).length

                return (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 15 }}
                    className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                      ${isSelected
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-sm shadow-gray-500/30'
                        : 'bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                      }
                      ${count === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={count === 0}
                  >
                    {category}
                    {count > 0 && (
                      <span className={`ml-2 text-xs ${isSelected ? 'text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
                        ({count})
                      </span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.title} {...project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <div className="inline-block p-6 rounded-2xl bg-gray-100 dark:bg-gray-800/50 mb-4">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
                No Projects Found
              </h3>
              <p className="text-md mb-6" style={{ color: 'var(--secondary)' }}>
                No projects in the "{selectedCategory}" category yet. Check back soon!
              </p>
              <motion.button
                onClick={() => setSelectedCategory('All')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium shadow-lg"
              >
                View All Projects
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProjectsPage