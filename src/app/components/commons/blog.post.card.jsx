import { motion } from 'framer-motion'
import { BsCalendarDate } from 'react-icons/bs'

// Blog Post Card Component
const BlogPostCard = ({ post, index }) => {
  const { slug, frontmatter } = post
  const { date, title, summary, tags = [] } = frontmatter || {}

  const formattedDate = (() => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch (e) {
      return date
    }
  })()

  return (
    <motion.a
      href={`/blog/${slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group block h-full"
    >
      <article 
        className="h-full overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg hover:border-cyan-400 dark:hover:border-cyan-500 p-6 flex flex-col"
        style={{
          backgroundColor: 'var(--background)',
          borderColor: 'var(--border)'
        }}
      >
        {/* Date */}
        <div className="flex items-center gap-2 mb-4">
          <BsCalendarDate className="h-4 w-4" style={{ color: 'var(--accent)' }} />
          <time
            dateTime={date}
            className="text-sm font-medium"
            style={{ color: 'var(--secondary)' }}
          >
            {formattedDate}
          </time>
        </div>

        {/* Title */}
        <h3 
          className="text-xl font-bold mb-3 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:via-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
          style={{ color: 'var(--foreground)' }}
        >
          {title}
        </h3>

        {/* Summary */}
        <p 
          className="text-sm leading-relaxed mb-4 line-clamp-3 flex-grow"
          style={{ color: 'var(--secondary)' }}
        >
          {summary}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'var(--muted)',
                  color: 'var(--foreground)',
                  borderColor: 'var(--border)'
                }}
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                style={{ color: 'var(--secondary)' }}
              >
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </article>
    </motion.a>
  )
}
export default BlogPostCard