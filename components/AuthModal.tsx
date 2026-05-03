'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff, User, Mail, Lock, Zap, AlertCircle } from 'lucide-react'
import { useAuth } from './AuthContext'

type Tab = 'signin' | 'signup'

interface FieldProps {
  id: string
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  icon: React.ReactNode
  autoComplete?: string
  showToggle?: boolean
  showPassword?: boolean
  onTogglePassword?: () => void
  error?: string
}

function AuthField({
  id, label, type, placeholder, value, onChange, icon,
  autoComplete, showToggle, showPassword, onTogglePassword, error,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-display text-[10px] tracking-[0.3em] text-white/50 uppercase">
        {label}
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-[#00F0FF]/40 pointer-events-none">{icon}</span>
        <input
          id={id}
          type={showToggle ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full bg-[#0A0A0F]/80 border rounded-sm px-10 py-3 text-sm font-sans text-white/90 placeholder-white/20 transition-all duration-200 outline-none ${
            error
              ? 'border-[#FF00E5]/70 focus:border-[#FF00E5] focus:shadow-[0_0_12px_rgba(255,0,229,0.2)]'
              : 'border-[#00F0FF]/20 focus:border-[#00F0FF]/70 focus:shadow-[0_0_12px_rgba(0,240,255,0.2)]'
          }`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 text-white/30 hover:text-[#00F0FF]/70 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            className="flex items-center gap-1.5 font-sans text-[11px] text-[#FF00E5]/80"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <AlertCircle size={10} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Validation ──────────────────────────────────────────────────
function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validateSignIn(email: string, password: string) {
  const errors: Record<string, string> = {}
  if (!email) errors.siEmail = 'Email is required.'
  else if (!validateEmail(email)) errors.siEmail = 'Enter a valid email address.'
  if (!password) errors.siPassword = 'Password is required.'
  else if (password.length < 6) errors.siPassword = 'Password must be at least 6 characters.'
  return errors
}

function validateSignUp(username: string, email: string, password: string, confirm: string) {
  const errors: Record<string, string> = {}
  if (!username.trim()) errors.suUsername = 'Choose a call sign.'
  else if (username.trim().length < 3) errors.suUsername = 'Call sign must be at least 3 characters.'
  else if (!/^[a-zA-Z0-9_]+$/.test(username)) errors.suUsername = 'Only letters, numbers, and underscores.'
  if (!email) errors.suEmail = 'Email is required.'
  else if (!validateEmail(email)) errors.suEmail = 'Enter a valid email address.'
  if (!password) errors.suPassword = 'Password is required.'
  else if (password.length < 8) errors.suPassword = 'Password must be at least 8 characters.'
  if (!confirm) errors.suConfirm = 'Please confirm your password.'
  else if (confirm !== password) errors.suConfirm = 'Passwords do not match.'
  return errors
}

export default function AuthModal() {
  const { isOpen, defaultTab, closeAuth } = useAuth()
  const [tab, setTab] = useState<Tab>(defaultTab)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Sign-in state
  const [siEmail, setSiEmail] = useState('')
  const [siPassword, setSiPassword] = useState('')
  const [siShowPw, setSiShowPw] = useState(false)

  // Sign-up state
  const [suUsername, setSuUsername] = useState('')
  const [suEmail, setSuEmail] = useState('')
  const [suPassword, setSuPassword] = useState('')
  const [suShowPw, setSuShowPw] = useState(false)
  const [suConfirm, setSuConfirm] = useState('')
  const [suShowConfirm, setSuShowConfirm] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Sync tab + reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setTab(defaultTab)
      setSubmitted(false)
      setLoading(false)
      setErrors({})
      // Small delay so the modal is rendered before focusing
      setTimeout(() => closeRef.current?.focus(), 50)
    }
  }, [isOpen, defaultTab])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeAuth()
  }

  const switchTab = (t: Tab) => {
    setTab(t)
    setErrors({})
    setSubmitted(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors =
      tab === 'signin'
        ? validateSignIn(siEmail, siPassword)
        : validateSignUp(suUsername, suEmail, suPassword, suConfirm)

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1400)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onKeyDown={handleKeyDown}
          role="presentation"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#0A0A0F]/92 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuth}
            aria-hidden="true"
          />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)' }}
            aria-hidden="true"
          />

          {/* Glow blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,0,229,0.05) 0%, transparent 70%)' }} aria-hidden="true" />

          {/* Modal Panel */}
          <motion.div
            className="relative z-10 w-full max-w-md glass-panel p-8 flex flex-col gap-6"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={tab === 'signup' ? 'Create account' : 'Sign in to Neon Syndicate'}
          >
            {/* Close button */}
            <button
              ref={closeRef}
              onClick={closeAuth}
              className="absolute top-4 right-4 p-1.5 text-white/30 hover:text-[#FF00E5] transition-colors rounded-sm focus:outline-none focus:ring-1 focus:ring-[#FF00E5]/50"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Logo */}
            <div className="flex flex-col items-center gap-1">
              <span className="font-display font-black text-lg tracking-widest text-[#00F0FF] neon-cyan-text">
                NEON<span className="text-white/70">SYNDICATE</span>
              </span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/50 to-transparent" />
            </div>

            {/* Tabs */}
            <div className="flex rounded-sm overflow-hidden border border-[#00F0FF]/20" role="tablist">
              {(['signup', 'signin'] as Tab[]).map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => switchTab(t)}
                  className="flex-1 py-2.5 font-display text-[11px] tracking-widest uppercase transition-all duration-200 focus:outline-none"
                  style={{
                    background: tab === t ? '#00F0FF' : 'transparent',
                    color: tab === t ? '#0A0A0F' : 'rgba(255,255,255,0.4)',
                    boxShadow: tab === t ? '0 0 16px rgba(0,240,255,0.5)' : 'none',
                  }}
                >
                  {t === 'signup' ? 'Join Syndicate' : 'Sign In'}
                </button>
              ))}
            </div>

            {/* Success / Form */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center gap-4 py-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  role="status"
                  aria-live="polite"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-14 h-14 rounded-full border border-[#00F0FF]/50 flex items-center justify-center"
                    style={{ boxShadow: '0 0 20px rgba(0,240,255,0.4)' }}
                  >
                    <Zap size={24} className="text-[#00F0FF]" fill="#00F0FF" />
                  </motion.div>
                  <p className="font-display font-black text-xl text-[#00F0FF] neon-cyan-text tracking-widest">
                    {tab === 'signup' ? 'WELCOME, RECRUIT' : 'ACCESS GRANTED'}
                  </p>
                  <p className="font-sans text-xs text-white/40 tracking-wider leading-relaxed max-w-xs">
                    {tab === 'signup'
                      ? 'Your application to Neon Syndicate has been received. Welcome to the arena.'
                      : 'Authentication successful. Entering the arena now.'}
                  </p>
                  <button
                    onClick={closeAuth}
                    className="mt-2 px-6 py-2.5 font-display text-[11px] tracking-widest text-[#0A0A0F] bg-[#00F0FF] rounded-sm uppercase hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all"
                  >
                    Continue
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key={tab}
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, x: tab === 'signup' ? -12 : 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: tab === 'signup' ? 12 : -12 }}
                  transition={{ duration: 0.22 }}
                >
                  {tab === 'signup' && (
                    <AuthField
                      id="su-username"
                      label="Call Sign / Username"
                      type="text"
                      placeholder="YourCallSign"
                      value={suUsername}
                      onChange={setSuUsername}
                      icon={<User size={14} />}
                      autoComplete="username"
                      error={errors.suUsername}
                    />
                  )}

                  <AuthField
                    id={tab === 'signup' ? 'su-email' : 'si-email'}
                    label="Email"
                    type="email"
                    placeholder="agent@neonsyndicate.gg"
                    value={tab === 'signup' ? suEmail : siEmail}
                    onChange={tab === 'signup' ? setSuEmail : setSiEmail}
                    icon={<Mail size={14} />}
                    autoComplete="email"
                    error={tab === 'signup' ? errors.suEmail : errors.siEmail}
                  />

                  <AuthField
                    id={tab === 'signup' ? 'su-password' : 'si-password'}
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={tab === 'signup' ? suPassword : siPassword}
                    onChange={tab === 'signup' ? setSuPassword : setSiPassword}
                    icon={<Lock size={14} />}
                    autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
                    showToggle
                    showPassword={tab === 'signup' ? suShowPw : siShowPw}
                    onTogglePassword={() =>
                      tab === 'signup' ? setSuShowPw((v) => !v) : setSiShowPw((v) => !v)
                    }
                    error={tab === 'signup' ? errors.suPassword : errors.siPassword}
                  />

                  {tab === 'signup' && (
                    <AuthField
                      id="su-confirm"
                      label="Confirm Password"
                      type="password"
                      placeholder="••••••••"
                      value={suConfirm}
                      onChange={setSuConfirm}
                      icon={<Lock size={14} />}
                      autoComplete="new-password"
                      showToggle
                      showPassword={suShowConfirm}
                      onTogglePassword={() => setSuShowConfirm((v) => !v)}
                      error={errors.suConfirm}
                    />
                  )}

                  {tab === 'signin' && (
                    <div className="flex justify-end -mt-1">
                      <button
                        type="button"
                        className="font-display text-[10px] tracking-widest text-white/30 hover:text-[#00F0FF] uppercase transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full py-3.5 font-display font-black text-sm tracking-widest uppercase rounded-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: loading ? 'rgba(0,240,255,0.3)' : '#00F0FF',
                      color: '#0A0A0F',
                      boxShadow: loading ? 'none' : '0 0 20px rgba(0,240,255,0.5)',
                    }}
                    whileHover={!loading ? { scale: 1.02, boxShadow: '0 0 32px rgba(0,240,255,0.8)' } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          className="inline-block w-3.5 h-3.5 border-2 border-[#0A0A0F]/40 border-t-[#0A0A0F] rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                        />
                        Processing...
                      </span>
                    ) : tab === 'signup' ? (
                      'Join Syndicate'
                    ) : (
                      'Enter Arena'
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-1">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="font-mono-custom text-[10px] text-white/20 tracking-widest">OR</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* Social login stub */}
                  <button
                    type="button"
                    className="w-full py-2.5 font-display text-[11px] tracking-widest uppercase border border-white/10 rounded-sm text-white/40 hover:border-white/25 hover:text-white/60 transition-all"
                  >
                    Continue with Discord
                  </button>

                  {/* Switch tab */}
                  <p className="text-center font-sans text-xs text-white/30">
                    {tab === 'signup' ? (
                      <>
                        Already a member?{' '}
                        <button
                          type="button"
                          onClick={() => switchTab('signin')}
                          className="text-[#00F0FF] hover:neon-cyan-text transition-colors font-display tracking-wider uppercase text-[11px]"
                        >
                          Sign In
                        </button>
                      </>
                    ) : (
                      <>
                        New recruit?{' '}
                        <button
                          type="button"
                          onClick={() => switchTab('signup')}
                          className="text-[#00F0FF] hover:neon-cyan-text transition-colors font-display tracking-wider uppercase text-[11px]"
                        >
                          Create Account
                        </button>
                      </>
                    )}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
