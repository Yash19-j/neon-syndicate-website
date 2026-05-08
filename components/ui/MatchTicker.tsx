'use client'

import { motion } from 'framer-motion'

const TICKER_ITEMS = [
  { label: 'CYBER PHEONIX', vs: 'RAZOR EDGE', info: 'Grand Final · JUNE 30', status: 'UPCOMING', color: '#FBFF00' },
  { label: 'VOID STAR', vs: '3.41 K/D', info: 'New Pro Circuit Record', status: 'RECORD', color: '#FF00E5' },
  { label: 'STROM HAWK', vs: 'RAZOR EDGE', info: 'SF Result · 1-2', status: 'RESULT', color: '#00F0FF' },
  { label: 'CYBER PHEONIX', vs: 'NEON_VIPER', info: 'SF Result · 2-0', status: 'RESULT', color: '#00F0FF' },
]

export default function MatchTicker() {
  return (
    <motion.div
      className="glass-panel flex items-center gap-0 overflow-hidden w-[320px] sm:w-[420px]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      style={{ height: '44px' }}
    >
      {/* Live badge */}
      <div className="flex items-center gap-2 px-3 shrink-0 border-r border-white/10 h-full">
        <motion.div
          className="w-2 h-2 rounded-full bg-[#FF00E5]"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="font-display text-[9px] tracking-widest text-[#FF00E5] uppercase">Live</span>
      </div>

      {/* Scrolling ticker — pure CSS so no Framer Motion color issues */}
      <div className="flex-1 overflow-hidden relative h-full">
        <div className="ticker-animate flex items-center h-full whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-5 font-mono-custom text-[11px]">
              <span className="text-white/70">{item.label}</span>
              <span style={{ color: item.color }}>vs</span>
              <span className="text-white/70">{item.vs}</span>
              <span className="text-white/30 text-[10px]">·</span>
              <span className="text-white/40 text-[10px]">{item.info}</span>
              <span className="text-white/15 mx-3">|</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
