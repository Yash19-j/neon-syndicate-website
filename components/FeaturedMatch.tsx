'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionDivider from './ui/SectionDivider'
import GlassCard from './ui/GlassCard'
import NeonButton from './ui/NeonButton'
import type { Player } from '@/src/lib/getPlayers'

interface FeaturedMatchProps {
  players: Player[]
  finalistA: Player | null
  finalistB: Player | null
  matchDate: string | null
  map: string | null
}

// Helper to generate initials from a name
function initials(name: string): string {
  return name
    .split(/[\s_]+/)
    .map(w => w[0]?.toUpperCase())
    .join('')
    .slice(0, 2)
}

// ── countdown hook (hydration‑safe) ──────────────────────
function useCountdown(targetMs: number) {
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    let diff = targetMs - Date.now()
    if (diff < 0) diff = 0
    setRemaining(diff)

    const interval = setInterval(() => {
      diff = targetMs - Date.now()
      if (diff < 0) diff = 0
      setRemaining(diff)
    }, 1000)

    return () => clearInterval(interval)
  }, [targetMs])

  if (remaining === null) return 'LOADING...'
  if (remaining <= 0) return 'LIVE NOW'

  const totalSeconds = Math.floor(remaining / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const parts = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0 || days > 0) parts.push(`${hours.toString().padStart(2, '0')}h`)
  parts.push(`${minutes.toString().padStart(2, '0')}m`)
  parts.push(`${seconds.toString().padStart(2, '0')}s`)
  return parts.join(' ')
}

// ── viewer count hook ───────────────────────────────────
function useViewerCount(base: number) {
  const [count, setCount] = useState(base)
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + Math.floor((Math.random() - 0.3) * 20))
    }, 3000)
    return () => clearInterval(id)
  }, [])
  return count.toLocaleString()
}

export default function FeaturedMatch({
  players,
  finalistA,
  finalistB,
  matchDate,
  map,
}: FeaturedMatchProps) {
  const targetTime = matchDate ? new Date(matchDate).getTime() : Date.now() + 2 * 60 * 60 * 1000
  const countdown = useCountdown(targetTime)
  const isLive = countdown === 'LIVE NOW'
  const viewers = useViewerCount(14_280)

  const playerA = finalistA ?? {
    id: '1',
    name: 'TBD',
    role: 'Player',
    avatar: null,
    stats: { kills: 0, wins: 0 },
  }
  const playerB = finalistB ?? {
    id: '2',
    name: 'TBD',
    role: 'Player',
    avatar: null,
    stats: { kills: 0, wins: 0 },
  }

  const A_COLOR = '#00F0FF'
  const B_COLOR = '#FF00E5'
  const mapName = map ?? 'NEO_TOKYO_2049'

  return (
    <section id="featured-match" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0F]" />
      {/* Midground rings */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] border border-[#00F0FF] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] border border-[#FF00E5] rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionDivider number="01" title="FEATURED MATCH" color="#00F0FF" />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 mt-16">
          {/* left player card */}
          <div className="flex-1 flex flex-col justify-center">
            <FeaturedPlayerCard player={playerA} color={A_COLOR} />
          </div>

          {/* central match card */}
          <GlassCard className="flex-[2] flex flex-col items-center justify-center p-8 gap-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-[#00F0FF]/8 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#FF00E5]/8 to-transparent pointer-events-none" />

            {/* teams */}
            <div className="flex items-center justify-center gap-6 w-full">
              <div className="flex flex-col items-center gap-3 flex-1">
                <div
                  className="w-16 h-16 rounded-sm flex items-center justify-center font-display font-black text-xl text-white"
                  style={{
                    background: `linear-gradient(135deg, ${A_COLOR}40, ${A_COLOR}15)`,
                    border: `2px solid ${A_COLOR}`,
                    boxShadow: `0 0 20px ${A_COLOR}44`,
                  }}
                >
                  {initials(playerA.name)}
                </div>
                <p className="font-display font-700 text-xs tracking-widest text-white/80 text-center">
                  {playerA.name}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="font-display font-black text-4xl md:text-6xl text-[#FBFF00] drop-shadow-[0_0_20px_rgba(251,255,0,0.6)]">
                  VS
                </span>
                <p className="font-mono-custom text-[9px] tracking-widest text-white/30">GRAND FINAL</p>
              </div>

              <div className="flex flex-col items-center gap-3 flex-1">
                <div
                  className="w-16 h-16 rounded-sm flex items-center justify-center font-display font-black text-xl text-white"
                  style={{
                    background: `linear-gradient(135deg, ${B_COLOR}40, ${B_COLOR}15)`,
                    border: `2px solid ${B_COLOR}`,
                    boxShadow: `0 0 20px ${B_COLOR}44`,
                  }}
                >
                  {initials(playerB.name)}
                </div>
                <p className="font-display font-700 text-xs tracking-widest text-white/80 text-center">
                  {playerB.name}
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />

            {/* map + countdown */}
            <div className="flex flex-col items-center gap-3">
              <p className="font-mono-custom text-[#00F0FF]/50 text-xs tracking-widest uppercase">
                MAP: {mapName}
              </p>
              {isLive ? (
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    className="flex items-center gap-2 px-4 py-2 rounded-sm border border-[#FF00E5]/60 bg-[#FF00E5]/10"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#FF00E5]" />
                    <span className="font-display font-bold text-[#FF00E5] tracking-widest text-sm">
                      LIVE NOW
                    </span>
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
                  <p className="font-mono-custom text-white/30 text-[10px] tracking-widest uppercase">
                    Match starts in
                  </p>
                  <p className="font-display font-black text-3xl md:text-4xl text-[#FBFF00] drop-shadow-[0_0_15px_rgba(251,255,0,0.6)] tracking-widest">
                    {countdown}
                  </p>
                  <p className="font-mono-custom text-[10px] text-white/20 tracking-widest">
                    {viewers} registered to watch
                  </p>
                </div>
              )}
            </div>

            {/* best of 3 */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map(g => (
                <div
                  key={g}
                  className="w-8 h-8 rounded-sm border border-white/10 flex items-center justify-center"
                >
                  <span className="font-mono-custom text-[10px] text-white/30">G{g}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* right player card */}
          <div className="flex-1 flex flex-col justify-center">
            <FeaturedPlayerCard player={playerB} color={B_COLOR} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── player card with avatar support ──────────────────────
function FeaturedPlayerCard({ player, color }: { player: Player; color: string }) {
  const kills = player.stats?.kills ?? 0
  const wins = player.stats?.wins ?? 0
  const ratio = wins > 0 ? (kills / wins).toFixed(1) : '—'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <GlassCard className="w-full p-6 flex flex-col items-center card-hover">
        {/* Avatar – show image if available, otherwise initials */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-4 overflow-hidden"
          style={{
            background: player.avatar ? 'transparent' : `linear-gradient(135deg, ${color}33, ${color}88)`,
            border: `2px solid ${color}`,
            boxShadow: `0 0 20px ${color}44`,
          }}
        >
          {player.avatar ? (
            <img
              src={player.avatar}
              alt={player.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-display font-black text-3xl text-white">
              {initials(player.name)}
            </span>
          )}
        </div>

        <h3 className="font-orbitron font-bold text-xl text-white">{player.name}</h3>
        <p className="text-xs text-[#A0A0C0] font-display tracking-[0.3em] uppercase mt-1">
          {player.role}
        </p>

        <div className="w-full mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-mono text-white">{kills}</p>
            <p className="text-[10px] text-[#A0A0C0] uppercase tracking-widest mt-1">Kills</p>
          </div>
          <div>
            <p className="text-2xl font-mono text-white">{wins}</p>
            <p className="text-[10px] text-[#A0A0C0] uppercase tracking-widest mt-1">Wins</p>
          </div>
          <div>
            <p className="text-2xl font-mono text-white">{ratio}</p>
            <p className="text-[10px] text-[#A0A0C0] uppercase tracking-widest mt-1">K/W</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}