import { motion } from 'framer-motion'
import { GoogleLogin } from '@react-oauth/google'

export default function AuthSection({ handleGoogleSuccess, handleGoogleError }) {
    return (
        <motion.div
            key="auth"
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
            <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Join the Conversation
            </h2>
            <p className="mb-6 text-sm" style={{ color: 'var(--secondary)' }}>
                Sign in with Google to share your thoughts and leave a message.
            </p>

            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
            />
        </motion.div>
    )
}