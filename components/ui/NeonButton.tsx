'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NeonButtonProps {
  children: React.ReactNode
  variant?: 'cyan' | 'magenta'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function NeonButton({
  children,
  variant = 'cyan',
  size = 'md',
  className,
  onClick,
  href,
  type = 'button',
  disabled = false,
}: NeonButtonProps) {
  const base =
    'inline-flex items-center justify-center font-display font-bold uppercase tracking-widest rounded-sm cursor-pointer select-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-10 py-4 text-base',
  }

  const variants = {
    cyan: 'bg-[#00F0FF] text-[#0A0A0F] border border-[#00F0FF] hover:shadow-[0_0_24px_rgba(0,240,255,0.8)]',
    magenta:
      'bg-transparent text-[#FF00E5] border border-[#FF00E5] hover:bg-[#FF00E5]/10 hover:shadow-[0_0_24px_rgba(255,0,229,0.6)]',
  }

  if (href) {
    return (
      <a href={href} className="inline-block">
        <motion.span
          className={cn(base, sizes[size], variants[variant], className)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {children}
        </motion.span>
      </a>
    )
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={cn(base, sizes[size], variants[variant], className)}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
