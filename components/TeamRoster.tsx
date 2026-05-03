'use client'

import { motion } from 'framer-motion'
import SectionDivider from './ui/SectionDivider'
import PlayerCard from './ui/PlayerCard'

const PLAYERS = [
  { name: 'CYPHER_X', role: 'Fragger', kd: '2.45', winRate: 78, rating: 92, initials: 'CX', avatarColor: 'linear-gradient(135deg, #00F0FF55, #00F0FF22)' },
  { name: 'PHANTOM_7', role: 'IGL / Sniper', kd: '1.98', winRate: 71, rating: 88, initials: 'P7', avatarColor: 'linear-gradient(135deg, #FF00E555, #FF00E522)' },
  { name: 'NEON_RAGE', role: 'Entry Fragger', kd: '2.10', winRate: 68, rating: 84, initials: 'NR', avatarColor: 'linear-gradient(135deg, #FBFF0055, #FBFF0022)' },
  { name: 'VOIDWALKER', role: 'Support', kd: '1.55', winRate: 74, rating: 81, initials: 'VW', avatarColor: 'linear-gradient(135deg, #00F0FF33, #FF00E533)' },
  { name: 'GLITCH_K', role: 'Lurker', kd: '1.88', winRate: 65, rating: 79, initials: 'GK', avatarColor: 'linear-gradient(135deg, #FF00E555, #FBFF0022)' },
  { name: 'STATIC_V', role: 'Strategist', kd: '1.42', winRate: 80, rating: 86, initials: 'SV', avatarColor: 'linear-gradient(135deg, #00F0FF22, #00F0FF66)' },
  { name: 'ZERO_K', role: 'AWP / Carry', kd: '2.30', winRate: 73, rating: 90, initials: 'ZK', avatarColor: 'linear-gradient(135deg, #FBFF0044, #FF00E522)' },
  { name: 'MATRIX_88', role: 'Anchor', kd: '1.70', winRate: 69, rating: 77, initials: 'M8', avatarColor: 'linear-gradient(135deg, #FF00E533, #00F0FF33)' },
]

export default function TeamRoster() {
  return (
    <section id="roster" className="relative py-24 px-6">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(255,0,229,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionDivider number="02" label="Roster" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLAYERS.map((player, i) => (
            <motion.div
              key={player.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <PlayerCard {...player} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
