'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PlayerCardProps {
  name: string
  role: string
  kd: string
  winRate: number
  rating: number
  avatarColor: string
  initials: string
  className?: string
}

export default function PlayerCard({
  name,
  role,
  kd,
  winRate,
  rating,
  avatarColor,
  initials,
  className,
}: PlayerCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-panel card-hover p-4 flex items-center gap-4',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center font-display font-900 text-base text-white"
        style={{
          background: avatarColor,
          border: '2px solid #00F0FF',
          boxShadow: '0 0 10px rgba(0,240,255,0.4)',
        }}
      >
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-display font-700 text-sm text-white truncate neon-cyan-text">{name}</p>
        <p className="font-sans text-xs text-white/50 uppercase tracking-wider mb-2">{role}</p>

        {/* Stat bars */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono-custom text-[10px] text-white/40 w-12">K/D</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00F0FF] to-[#00F0FF]/40"
                style={{ width: `${Math.min((parseFloat(kd) / 3) * 100, 100)}%` }}
              />
            </div>
            <span className="font-mono-custom text-[10px] text-[#00F0FF] w-8 text-right">{kd}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono-custom text-[10px] text-white/40 w-12">WIN%</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FF00E5] to-[#FF00E5]/40"
                style={{ width: `${winRate}%` }}
              />
            </div>
            <span className="font-mono-custom text-[10px] text-[#FF00E5] w-8 text-right">{winRate}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono-custom text-[10px] text-white/40 w-12">RTG</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FBFF00] to-[#FBFF00]/40"
                style={{ width: `${rating}%` }}
              />
            </div>
            <span className="font-mono-custom text-[10px] text-[#FBFF00] w-8 text-right">{rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
