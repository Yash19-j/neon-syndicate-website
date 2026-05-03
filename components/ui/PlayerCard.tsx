'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  name, role, kd, winRate, rating, avatarColor, initials, className,
}: PlayerCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      className={cn('glass-panel p-4 flex flex-col gap-3 cursor-pointer relative overflow-hidden', className)}
      style={{ minHeight: '130px' }}
      whileHover={{ borderColor: '#00F0FF', boxShadow: '0 0 18px rgba(0,240,255,0.3)', y: -3 }}
      transition={{ duration: 0.25 }}
      onClick={() => setExpanded((v) => !v)}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${name} — ${role}. Click to ${expanded ? 'collapse' : 'expand'} stats.`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpanded((v) => !v) }}
    >
      {/* Top row: avatar + name */}
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-display font-black text-sm text-white"
          style={{ background: avatarColor, border: '2px solid #00F0FF', boxShadow: '0 0 10px rgba(0,240,255,0.35)' }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-sm text-white/90 truncate neon-cyan-text">{name}</p>
          <p className="font-sans text-[10px] text-white/40 uppercase tracking-wider">{role}</p>
        </div>
        <motion.span
          className="font-mono-custom text-[10px] text-white/20 shrink-0"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          ▾
        </motion.span>
      </div>

      {/* Stat bars — always visible */}
      <div className="flex flex-col gap-1.5">
        <StatBar label="K/D" value={kd} pct={Math.min((parseFloat(kd) / 3) * 100, 100)} color="#00F0FF" />
        <StatBar label="WIN%" value={`${winRate}%`} pct={winRate} color="#FF00E5" />
        <StatBar label="RTG" value={String(rating)} pct={rating} color="#FBFF00" />
      </div>

      {/* Expanded detail panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { label: 'Matches', value: '214' },
                { label: 'Headshots', value: `${Math.round(winRate * 0.65)}%` },
                { label: 'Avg Damage', value: `${Math.round(parseFloat(kd) * 320)}` },
                { label: 'MVP Rate', value: `${Math.round(winRate * 0.4)}%` },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="font-mono-custom text-[9px] text-white/30 tracking-widest uppercase">{s.label}</span>
                  <span className="font-display font-bold text-xs text-white/80">{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function StatBar({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono-custom text-[9px] text-white/30 w-10 tracking-widest">{label}</span>
      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${color}, ${color}60)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className="font-mono-custom text-[9px] w-8 text-right" style={{ color }}>{value}</span>
    </div>
  )
}
