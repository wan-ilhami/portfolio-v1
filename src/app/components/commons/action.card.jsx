import { motion } from "framer-motion"
import { Sparkles, Code2, BookOpen, FileText, ArrowRight } from 'lucide-react'

// Action Card Component
const ActionCard = ({ href, icon: Icon, iconColor, title, linkText, linkColor, gradient, isExternal = false }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -4 }}
    whileTap={{ scale: 0.98 }}
    className="group relative"
  >
    <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${gradient} opacity-50 blur transition duration-500 group-hover:opacity-100`} />
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="relative flex items-center justify-between rounded-2xl border px-6 py-5 leading-none transition-all duration-300"
      style={{
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)'
      }}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className="font-semibold text-md" style={{ color: 'var(--foreground)' }}>
          {title}
        </span>
      </div>
      <span className={`flex items-center gap-2 font-medium transition duration-200 ${linkColor}`}>
        {linkText}
        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </span>
    </a>
  </motion.div>
)
export default ActionCard