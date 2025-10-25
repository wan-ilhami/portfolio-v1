'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import projectsData from './projects.data'
import ProjectCard from '@/app/components/commons/project.card'
import { PageSEO } from '../../components/commons/seo'
import { usePathname } from 'next/navigation'


// Main Projects Component
const ProjectsPage = () => {
  const pathname = usePathname()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Full-stack', 'Backend', 'Frontend', 'Design', 'AI/ML', 'DevOps', 'Cloud']

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory)

  return (
    <>
      <PageSEO title="Projects - Wan Ilhami" description="project huhu" pathname={pathname} />
      <div className="min-h-screen" >
        <div className="w-full mx-auto px-4 ">
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
                      }`}
                  >
                    {category}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.title} {...project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-md" style={{ color: 'var(--secondary)' }}>
                Oppss Sorry, no projects yet.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProjectsPage