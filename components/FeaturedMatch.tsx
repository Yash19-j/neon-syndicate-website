'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionDivider from './ui/SectionDivider'
import GlassCard from './ui/GlassCard'
import PlayerCard from './ui/PlayerCard'
import NeonButton from './ui/NeonButton'

const TEAM_A = { name: 'TEAM ALPHA', abbr: 'TA', color: '#00F0FF', gradient: 'from-[#00F0FF]/30 to-[#00F0FF]/5' }
const TEAM_B = { name: 'TEAM OMEGA', abbr: 'TO', color: '#FF00E5', gradient: 'from-[#FF00E5]/30 to-[#FF00E5]/5' }

function useCountdown(targetMs: number) {
  const [remaining, setRemaining] = useState(targetMs)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (remaining <= 0) return 'LIVE NOW'

  const h = Math.floor(remaining / 3_600_000)
  const m = Math.floor((remaining % 3_600_000) / 60_000)
  const s = Math.floor((remaining % 60_000) / 1000)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function useViewerCount(base: number) {
  const [count, setCount] = useState(base)
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + Math.floor((Math.random() - 0.3) * 20))
    }, 3000)
    return () => clearInterval(id)
  }, [])
  return count.toLocaleString()
}

export default function FeaturedMatch() {
  const countdown = useCountdown(2 * 60 * 60 * 1000)
  const isLive = countdown === 'LIVE NOW'
  const viewers = useViewerCount(14_280)

  return (
    <section id="featured-match" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionDivider number="01" label="Featured Match" />
        </motion.div>

        {/* Layout: PlayerCard — MatchCard — PlayerCard */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          {/* Team A star player */}
          <div className="flex-1 flex flex-col justify-center">
            <PlayerCard
              name="CYPHER_X"
              role="Fragger"
              kd="2.45"
              winRate={78}
              rating={92}
              avatarColor="linear-gradient(135deg, #00F0FF33, #00F0FF88)"
              initials="CX"
            />
          </div>

          {/* Central match card */}
          <GlassCard className="flex-[2] flex flex-col items-center justify-center p-8 gap-6 relative overflow-hidden">
            {/* Glow layers */}
            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-[#00F0FF]/8 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#FF00E5]/8 to-transparent pointer-events-none" />

            {/* Teams */}
            <div className="flex items-center justify-center gap-6 w-full">
              {/* Team A */}
              <div className="flex flex-col items-center gap-3 flex-1">
                <div
                  className="w-16 h-16 rounded-sm flex items-center justify-center font-display font-black text-xl text-white"
                  style={{
                    background: `linear-gradient(135deg, ${TEAM_A.color}40, ${TEAM_A.color}15)`,
                    border: `2px solid ${TEAM_A.color}`,
                    boxShadow: `0 0 20px ${TEAM_A.color}44`,
                  }}
                >
                  {TEAM_A.abbr}
                </div>
                <p className="font-display font-700 text-xs tracking-widest text-white/80 text-center">{TEAM_A.name}</p>
              </div>

              {/* VS */}
              <div className="flex flex-col items-center gap-2">
                <span
                  className="font-display font-black text-4xl md:text-6xl text-[#FBFF00] neon-yellow-text"
                >
                  VS
                </span>
                <p className="font-mono-custom text-[9px] tracking-widest text-white/30">GRAND FINAL</p>
              </div>

              {/* Team B */}
              <div className="flex flex-col items-center gap-3 flex-1">
                <div
                  className="w-16 h-16 rounded-sm flex items-center justify-center font-display font-black text-xl text-white"
                  style={{
                    background: `linear-gradient(135deg, ${TEAM_B.color}40, ${TEAM_B.color}15)`,
                    border: `2px solid ${TEAM_B.color}`,
                    boxShadow: `0 0 20px ${TEAM_B.color}44`,
                  }}
                >
                  {TEAM_B.abbr}
                </div>
                <p className="font-display font-700 text-xs tracking-widest text-white/80 text-center">{TEAM_B.name}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />

            {/* Map + Countdown */}
            <div className="flex flex-col items-center gap-3">
              <p className="font-mono-custom text-[#00F0FF]/50 text-xs tracking-widest uppercase">
                MAP: NEO_TOKYO_2049
              </p>
              {isLive ? (
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    className="flex items-center gap-2 px-4 py-2 rounded-sm border border-[#FF00E5]/60 bg-[#FF00E5]/10"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#FF00E5]" />
                    <span className="font-display font-bold text-[#FF00E5] tracking-widest text-sm">LIVE NOW</span>
                  </motion.div>
                  <p className="font-mono-custom text-[10px] text-white/30 tracking-widest">
                    {viewers} viewers
                  </p>
                  <NeonButton variant="cyan" size="sm">
                    Watch Stream
                  </NeonButton>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <p className="font-mono-custom text-white/30 text-[10px] tracking-widest uppercase">Match starts in</p>
                  <p className="font-display font-black text-3xl md:text-4xl text-[#FBFF00] neon-yellow-text tracking-widest">
                    {countdown}
                  </p>
                  <p className="font-mono-custom text-[10px] text-white/20 tracking-widest">
                    {viewers} registered to watch
                  </p>
                </div>
              )}
            </div>

            {/* Best of */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((g) => (
                <div
                  key={g}
                  className="w-8 h-8 rounded-sm border border-white/10 flex items-center justify-center"
                >
                  <span className="font-mono-custom text-[10px] text-white/30">G{g}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Team B star player */}
          <div className="flex-1 flex flex-col justify-center">
            <PlayerCard
              name="PHANTOM_7"
              role="IGL / Sniper"
              kd="1.98"
              winRate={71}
              rating={88}
              avatarColor="linear-gradient(135deg, #FF00E533, #FF00E588)"
              initials="P7"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
