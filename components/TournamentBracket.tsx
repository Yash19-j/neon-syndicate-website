'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionDivider from './ui/SectionDivider'
import type { Match } from '@/src/lib/getMatches'

interface TournamentBracketProps {
  matches: Match[]
}

// ── Bracket Node (original look) ──────────────────────────
function BracketNode({
  match,
  size = 'sm',
}: {
  match: Match
  size?: 'sm' | 'md' | 'lg'
}) {
  const [hovered, setHovered] = useState(false)
  const padding = size === 'lg' ? 'p-4' : 'p-3'
  const nameSize = size === 'lg' ? 'text-sm' : 'text-xs'
  const minW = size === 'lg' ? 'min-w-[180px]' : 'min-w-[150px]'

  const teamAName = match.teamA?.name ?? 'TBD'
  const teamBName = match.teamB?.name ?? 'TBD'
  const winnerName = match.winner?.name ?? undefined

  return (
    <motion.div
      className={`glass-panel ${padding} ${minW} flex flex-col gap-2 cursor-default`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        borderColor: hovered ? '#00F0FF' : 'rgba(0,240,255,0.25)',
        boxShadow: hovered
          ? '0 0 20px rgba(0,240,255,0.35)'
          : '0 0 0px transparent',
      }}
      transition={{ duration: 0.25 }}
    >
      {/* Team A */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`font-display font-700 ${nameSize} truncate ${
            winnerName === teamAName ? 'text-[#00F0FF]' : 'text-white/50'
          }`}
        >
          {teamAName}
        </span>
        {winnerName === teamAName && <WinBadge color="#00F0FF" />}
      </div>

      <div className="h-px bg-white/10" />

      {/* Team B */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`font-display font-700 ${nameSize} truncate ${
            winnerName === teamBName ? 'text-[#FF00E5]' : 'text-white/50'
          }`}
        >
          {teamBName}
        </span>
        {winnerName === teamBName && <WinBadge color="#FF00E5" />}
      </div>

      {winnerName && (
        <div className="mt-1 pt-1 border-t border-white/5">
          <span className="font-mono-custom text-[8px] text-[#FBFF00] tracking-widest">
            WINNER: {winnerName}
          </span>
        </div>
      )}
      {!winnerName && hovered && (
        <div className="mt-1 pt-1 border-t border-white/5">
          <span className="font-mono-custom text-[8px] text-white/30 tracking-widest">
            UPCOMING
          </span>
        </div>
      )}
    </motion.div>
  )
}

function WinBadge({ color }: { color: string }) {
  return (
    <span
      className="text-[10px] font-display font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-sm border bg-white/5"
      style={{ color, borderColor: color, boxShadow: `0 0 6px ${color}` }}
    >
      W
    </span>
  )
}

// ── SVG Connectors (unchanged) ────────────────────────────
function BracketConnectors({ count, color = '#00F0FF' }: { count: number; color?: string }) {
  const totalHeight = count * 110
  const spacing = totalHeight / count

  return (
    <svg className="hidden lg:block shrink-0" width="48" height={totalHeight}>
      {Array.from({ length: count / 2 }, (_, i) => {
        const y1 = (i * 2 + 0.5) * spacing
        const y2 = (i * 2 + 1.5) * spacing
        const yMid = (i * 2 + 1) * spacing
        return (
          <g key={i}>
            <line x1="0" y1={y1} x2="24" y2={y1} stroke={color} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="24" y1={y1} x2="24" y2={y2} stroke={color} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="24" y1={y2} x2="0" y2={y2} stroke={color} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="24" y1={yMid} x2="48" y2={yMid} stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
          </g>
        )
      })}
    </svg>
  )
}

export default function TournamentBracket({ matches }: TournamentBracketProps) {
  // Group matches by round name (case‑insensitive)
  const qf = matches
    .filter(m => m.round.toLowerCase().includes('quarter'))
    .sort((a, b) => a.order - b.order)
  const sf = matches
    .filter(m => m.round.toLowerCase().includes('semi'))
    .sort((a, b) => a.order - b.order)
  const finalMatch = matches.find(m => m.round.toLowerCase().includes('final'))

  return (
    <section id="bracket" className="relative py-24 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 80% 50%, rgba(0,240,255,0.04) 0%, transparent 70%)',
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionDivider number="03" title="BRACKET" color="#FBFF00" />
        </motion.div>

        <div className="overflow-x-auto pb-4 mt-16">
          <div className="flex items-center gap-0 min-w-[700px] mx-auto">
            {/* Quarterfinals */}
            <div className="flex flex-col justify-around gap-4 flex-shrink-0" style={{ minHeight: '440px' }}>
              <p className="font-mono-custom text-[9px] text-[#00F0FF]/40 tracking-widest uppercase mb-2 text-center">
                Quarterfinals
              </p>
              {qf.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <BracketNode match={m} />
                </motion.div>
              ))}
            </div>

            <BracketConnectors count={4} />

            {/* Semifinals */}
            <div className="flex flex-col justify-around gap-4 flex-shrink-0" style={{ minHeight: '440px' }}>
              <p className="font-mono-custom text-[9px] text-[#00F0FF]/40 tracking-widest uppercase mb-2 text-center">
                Semifinals
              </p>
              {sf.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <BracketNode match={m} size="md" />
                </motion.div>
              ))}
            </div>

            <BracketConnectors count={2} color="#FBFF00" />

            {/* Grand Final */}
            <div className="flex flex-col justify-center gap-4 flex-shrink-0" style={{ minHeight: '440px' }}>
              <p className="font-mono-custom text-[9px] text-[#FBFF00]/60 tracking-widest uppercase mb-2 text-center">
                Grand Final
              </p>
              {finalMatch && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div
                    className="glass-panel p-4 min-w-[180px] relative overflow-hidden"
                    style={{
                      border: '1px solid rgba(251,255,0,0.4)',
                      boxShadow: '0 0 30px rgba(251,255,0,0.15)',
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FBFF00] to-transparent" />
                    <p className="font-display font-700 text-xs text-[#00F0FF] mb-1">
                      {finalMatch.teamA?.name ?? 'TBD'}
                    </p>
                    <div className="h-px bg-[#FBFF00]/20 my-2" />
                    <p className="font-display font-700 text-xs text-[#FF00E5] mb-3">
                      {finalMatch.teamB?.name ?? 'TBD'}
                    </p>
                    <div className="flex items-center gap-1.5">
                      {finalMatch.winner ? (
                        <span className="font-mono-custom text-[9px] text-[#FBFF00] tracking-widest">
                          WINNER: {finalMatch.winner.name}
                        </span>
                      ) : (
                        <>
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-[#FBFF00]"
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                          />
                          <span className="font-mono-custom text-[9px] text-[#FBFF00] tracking-widest">
                            UPCOMING
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}