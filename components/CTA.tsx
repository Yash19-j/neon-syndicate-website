'use client'

import { motion } from 'framer-motion'
import NeonButton from './ui/NeonButton'
import Particles from './ui/Particles'
import { useAuth } from './AuthContext'

export default function CTA() {
  const { openAuth } = useAuth()
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Animated gradient background — uses CSS keyframes to avoid Framer Motion color issues */}
      <div
        className="absolute inset-0 pointer-events-none cta-pulse-bg"
        aria-hidden="true"
      />

      {/* Grid */}
      <div className="absolute inset-0 dark-grid-bg opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Glitch accent lines */}
      {[15, 40, 65, 85].map((top, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent pointer-events-none"
          style={{ top: `${top}%` }}
          animate={{ opacity: [0, 0.6, 0], scaleX: [0.5, 1, 0.5] }}
          transition={{ duration: 4, delay: i * 1.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <Particles count={32} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono-custom text-[#FF00E5]/60 text-xs tracking-[0.4em] uppercase mb-4">
            Season IV — Open Recruitment
          </p>
          <h2
            className="font-display font-black text-5xl sm:text-7xl lg:text-8xl leading-none tracking-tight text-[#00F0FF] neon-cyan-text text-balance glitch-text"
            data-text="READY TO RUMBLE"
          >
            READY TO
            <br />
            RUMBLE
          </h2>
        </motion.div>

        <motion.p
          className="font-sans text-base text-white/50 tracking-widest uppercase max-w-md text-pretty"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Prove your skills. Join the elite. Dominate the digital arena.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <NeonButton variant="cyan" size="lg" onClick={() => openAuth('signup')}>
            Join Syndicate
          </NeonButton>
          <NeonButton variant="magenta" size="lg" onClick={() => openAuth('signin')}>
            Sign In
          </NeonButton>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          {[
            { label: 'Active Players', value: '2,400+' },
            { label: 'Tournaments Won', value: '47' },
            { label: 'Win Rate', value: '73%' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-display font-black text-2xl text-[#FBFF00] neon-yellow-text">
                {stat.value}
              </span>
              <span className="font-mono-custom text-[10px] text-white/30 tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
