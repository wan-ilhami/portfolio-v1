'use client'
import React from 'react'
import { Github, ExternalLink, Folder, Award } from 'lucide-react'
import { motion } from 'framer-motion'

const ProjectCard = ({
  title,
  description,
  href,
  github,
  technologies = [],
  category,
  index = 0,
}) => {
  const getCategoryColor = (cat) => {
    const colors = {
      'Full-stack': 'from-slate-600 to-slate-800 dark:from-slate-400 dark:to-slate-600',
      'Backend': 'from-indigo-700 to-purple-800 dark:from-indigo-400 dark:to-purple-500',
      'Frontend': 'from-rose-600 to-red-800 dark:from-rose-400 dark:to-red-500',
      'Design': 'from-green-600 to-teal-800 dark:from-green-400 dark:to-teal-500',
      'AI/ML': 'from-fuchsia-700 to-violet-900 dark:from-fuchsia-400 dark:to-violet-600',
      'DevOps': 'from-sky-600 to-blue-800 dark:from-sky-400 dark:to-blue-500',
      'Cloud': 'from-blue-500 to-gray-700 dark:from-blue-400 dark:to-gray-500',
    }
    return colors[cat] || 'from-gray-500 to-gray-700 dark:from-gray-400 dark:to-gray-600'
  }

  const isAwardWinning = description.includes('🏆')

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full group"
    >
      <div
        className="relative h-full flex flex-col rounded-2xl border p-6 backdrop-blur-md overflow-hidden transition-all duration-500
          bg-white/90 dark:bg-zinc-900/80 
          border-gray-200 dark:border-zinc-700
          shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20
          dark:shadow-zinc-900 dark:hover:shadow-cyan-400/20 
          hover:border-cyan-400 dark:hover:border-cyan-500"
      >
        {/* Award Badge */}
        {isAwardWinning && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-3 right-3 z-10"
          >
            <div className="p-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
              <Award className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        )}

        {/* Top Section */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className={`p-3 rounded-xl bg-gradient-to-br ${getCategoryColor(category)} shadow-md`}
          >
            <Folder className="w-6 h-6 text-white" />
          </motion.div>

          <div className="flex flex-row gap-2">
            {href && (
              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 shadow-sm hover:shadow-md transition-all duration-300"
                aria-label="View project"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 shadow-sm hover:shadow-md transition-all duration-300"
                aria-label="View source code"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Category Badge */}
        {category && (
          <div className="mb-3">
            <span
              className={`inline-block text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(
                category
              )} text-white shadow-md`}
            >
              {category}
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent group-hover:from-cyan-500 group-hover:via-fuchsia-500 group-hover:to-blue-500 transition-all duration-300">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5 flex-grow line-clamp-4 text-gray-700 dark:text-gray-300">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {technologies.map((tech, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border shadow-sm hover:shadow-md transition-all duration-300
                bg-zinc-100 dark:bg-zinc-800 
                text-zinc-700 dark:text-zinc-300
                border-gray-200 dark:border-zinc-700
                hover:border-cyan-300 dark:hover:border-cyan-600"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Glow Effects */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.12), transparent 70%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
      </div>
    </motion.div>
  )
}

export default ProjectCard
