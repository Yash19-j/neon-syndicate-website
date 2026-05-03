'use client'

import { motion } from 'framer-motion'

export default function MatchTicker() {
  return (
    <motion.div
      className="glass-panel px-4 py-3 flex items-center gap-3 w-fit"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {/* Live indicator */}
      <div className="flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full bg-[#FF00E5]"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <span className="font-display text-[10px] tracking-widest text-[#FF00E5] uppercase">Live</span>
      </div>
      <div className="w-px h-5 bg-white/20" />
      <span className="font-mono-custom text-xs text-white/80 tracking-wider">
        TEAM ALPHA <span className="text-[#FBFF00]">vs</span> TEAM OMEGA
      </span>
      <div className="w-px h-5 bg-white/20" />
      <span className="font-mono-custom text-xs text-[#00F0FF]">02:30:45</span>
    </motion.div>
  )
}
