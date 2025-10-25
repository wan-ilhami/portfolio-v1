'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Send, LogOut } from 'lucide-react'
import { RoughNotation } from "react-rough-notation"
import { PageSEO } from '../../components/commons/seo'
import { usePathname } from 'next/navigation'
import AuthSection from '../../components/commons/login.auth'

export default function GuestbookPage() {
    const pathname = usePathname()
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState(null)
    const [formData, setFormData] = useState({ message: '' })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [authLoading, setAuthLoading] = useState(false)
    const [deletingId, setDeletingId] = useState(null)
    const [initialLoading, setInitialLoading] = useState(true)
    const [mounted, setMounted] = useState(false)

    // Initialize guestbook (load messages and user)
    useEffect(() => {
        const initializeGuestbook = async () => {
            try {
                setInitialLoading(true)
                
                // Load messages from database
                const messagesRes = await fetch('/api/messages')
                if (!messagesRes.ok) throw new Error('Failed to fetch messages')
                const messagesData = await messagesRes.json()
                setMessages(messagesData)
                
                // Load user from localStorage
                const savedUser = localStorage.getItem('guestbook_user')
                if (savedUser) {
                    try {
                        setUser(JSON.parse(savedUser))
                    } catch (error) {
                        console.error('Error loading user from cache:', error)
                        localStorage.removeItem('guestbook_user')
                    }
                }
            } catch (error) {
                console.error('Failed to initialize guestbook:', error)
                setMessages([])
            } finally {
                setInitialLoading(false)
                setMounted(true)
            }
        }
        
        initializeGuestbook()
    }, [])

    const handleGoogleSuccess = async (credentialResponse) => {
        setAuthLoading(true)
        try {
            const response = await fetch('/api/auth/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential: credentialResponse.credential })
            })

            const data = await response.json()

            if (data.success) {
                const userData = {
                    name: data.user.name,
                    email: data.user.email,
                    picture: data.user.picture,
                    provider: 'google'
                }
                setUser(userData)
                localStorage.setItem('guestbook_user', JSON.stringify(userData))
            } else {
                console.error('Authentication failed:', data.error)
            }
        } catch (error) {
            console.error('Error validating token:', error)
        } finally {
            setAuthLoading(false)
        }
    }

    const handleGoogleError = () => {
        console.log('Google login failed')
        setAuthLoading(false)
    }

    const handleLogout = () => {
        setUser(null)
        setFormData({ message: '' })
        localStorage.removeItem('guestbook_user')
    }

    const handleInputChange = (e) => {
        const { value } = e.target
        setFormData(prev => ({ ...prev, message: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.message.trim() || !user) return

        setLoading(true)
        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    message: formData.message,
                    picture: user.picture,
                    provider: user.provider
                })
            })

            if (!res.ok) throw new Error('Failed to post message')
            const newMessage = await res.json()
            setMessages(prev => [newMessage, ...prev])
            setFormData({ message: '' })
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (error) {
            console.error('Failed to post message:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        setDeletingId(id)
        try {
            const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Failed to delete')
            setTimeout(() => {
                setMessages(prev => prev.filter(msg => msg.id !== id))
                setDeletingId(null)
            }, 300)
        } catch (error) {
            console.error('Failed to delete message:', error)
            setDeletingId(null)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now - date
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return 'just now'
        if (diffMins < 60) return `${diffMins}m ago`
        if (diffHours < 24) return `${diffHours}h ago`
        if (diffDays < 7) return `${diffDays}d ago`

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    if (!mounted) return null

    return (
        <>
            <PageSEO title="Guestbook - Wan Ilhami" description="Come laai" pathname={pathname} />
            <div className="min-h-screen">
                <div className="w-full mx-auto px-4">
                    {/* Header Section */}
                    <motion.header
                        className="space-y-6 mb-2"
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
                            Guest Book
                        </motion.span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
                            Feedback board
                        </h1>
                    </motion.header>

                    <p className="text-md max-w-lg mb-8" style={{ color: 'var(--secondary)' }}>
                        Leave a note, share your impressions, or drop by to say hi —
                        <br />
                        <RoughNotation
                            type="underline"
                            show={true}
                            color="#06b6d4"
                            strokeWidth={2}
                            padding={2}
                            animationDelay={500}
                            animationDuration={1200}
                        >
                            your words make this journey special.
                        </RoughNotation>
                    </p>

                    {/* Form Section */}
                    <motion.section
                        className="mb-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <AnimatePresence mode="wait">
                            {!user ? (
                                <AuthSection
                                    handleGoogleSuccess={handleGoogleSuccess}
                                    handleGoogleError={handleGoogleError}
                                />
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="rounded-lg p-8"
                                    style={{
                                        backgroundColor: 'var(--muted)',
                                        border: '1px solid var(--border)'
                                    }}
                                >
                                    <div className="flex items-center justify-between mb-8 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
                                        <div className="flex items-center gap-4">
                                            {user.picture && (
                                                <img
                                                    src={user.picture}
                                                    alt={user.name}
                                                    className="w-12 h-12 rounded-full"
                                                />
                                            )}
                                            <div>
                                                <p className="font-semibold text-lg" style={{ color: 'var(--foreground)' }}>
                                                    {user.name}
                                                </p>
                                                <p className="text-sm" style={{ color: 'var(--secondary)' }}>
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <motion.button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                                            style={{ color: 'var(--secondary)' }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </motion.button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="relative">
                                            <textarea
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="Share your thoughts..."
                                                className="w-full p-4 rounded-lg resize-none border-2 transition-all focus:outline-none"
                                                style={{
                                                    backgroundColor: 'var(--background)',
                                                    color: 'var(--foreground)',
                                                    borderColor: 'var(--border)'
                                                }}
                                                rows="5"
                                                maxLength="500"
                                            />
                                            <div className="absolute bottom-3 right-3 text-xs" style={{ color: 'var(--secondary)' }}>
                                                {formData.message.length} / 500
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {success && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="rounded-lg p-4 text-sm font-medium flex items-center gap-3"
                                                    style={{
                                                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                                        color: '#22c55e',
                                                        border: '1px solid rgba(34, 197, 94, 0.3)'
                                                    }}
                                                >
                                                    <span className="text-lg">✓</span>
                                                    Message posted successfully!
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <motion.button
                                            onClick={handleSubmit}
                                            disabled={loading || !formData.message.trim()}
                                            className="w-full font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            style={{
                                                backgroundColor: (loading || !formData.message.trim()) ? 'var(--border)' : 'var(--foreground)',
                                                color: 'var(--background)'
                                            }}
                                            whileHover={{ scale: (!loading && formData.message.trim()) ? 1.01 : 1 }}
                                        >
                                            {loading ? (
                                                <>
                                                    <motion.span
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity }}
                                                    >
                                                        ⌛
                                                    </motion.span>
                                                    Posting...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    Post Message
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.section>

                    {/* Messages Section */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="space-y-2">
                            <AnimatePresence mode="popLayout">
                                {initialLoading ? (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="rounded-lg p-12 text-center"
                                        style={{
                                            backgroundColor: 'var(--muted)',
                                            border: '2px dashed var(--border)'
                                        }}
                                    >
                                        <p style={{ color: 'var(--secondary)' }}>
                                            Loading messages...
                                        </p>
                                    </motion.div>
                                ) : messages.length === 0 ? (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="rounded-lg p-12 text-center"
                                        style={{
                                            backgroundColor: 'var(--muted)',
                                            border: '2px dashed var(--border)'
                                        }}
                                    >
                                        <p style={{ color: 'var(--secondary)' }}>
                                            No messages yet. Be the first to share your thoughts.
                                        </p>
                                    </motion.div>
                                ) : (
                                    messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className={`group rounded-lg p-6 border transition-all ${deletingId === msg.id ? 'opacity-50 scale-95' : ''
                                                }`}
                                            style={{
                                                backgroundColor: 'var(--muted)',
                                                borderColor: 'var(--border)'
                                            }}
                                        >
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-base" style={{ color: 'var(--foreground)' }}>
                                                        {msg.name}
                                                    </p>
                                                    <p className="text-xs" style={{ color: 'var(--secondary)' }}>
                                                        {formatDate(msg.createdAt)}
                                                    </p>
                                                </div>

                                                {user?.email === msg.email && (
                                                    <motion.button
                                                        onClick={() => handleDelete(msg.id)}
                                                        whileHover={{ scale: 1.1 }}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-opacity opacity-0 group-hover:opacity-100"
                                                        style={{ color: 'var(--secondary)' }}
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                        Delete
                                                    </motion.button>
                                                )}
                                            </div>

                                            <p className="text-base leading-relaxed" style={{ color: 'var(--foreground)' }}>
                                                {msg.message}
                                            </p>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.section>
                </div>
            </div>
        </>
    )
}