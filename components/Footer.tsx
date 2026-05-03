'use client'

import { motion } from 'framer-motion'

const SOCIALS = [
  { label: 'TW', name: 'Twitter / X' },
  { label: 'YT', name: 'YouTube' },
  { label: 'DC', name: 'Discord' },
  { label: 'TK', name: 'TikTok' },
]

const LINKS = [
  { label: 'About', href: '#hero' },
  { label: 'Matches', href: '#featured-match' },
  { label: 'Roster', href: '#roster' },
  { label: 'Bracket', href: '#bracket' },
  { label: 'News', href: '#news' },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleLink = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-[#00F0FF]/10 bg-[#06060F] px-6 py-14">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div>
            <p className="font-display font-black text-2xl tracking-widest text-[#00F0FF] neon-cyan-text">
              NEON<span className="text-white/70">SYNDICATE</span>
            </p>
            <p className="font-mono-custom text-[10px] text-white/30 tracking-widest uppercase mt-1">
              Dominate the Digital Arena
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
            {LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLink(link.href)}
                className="font-display text-xs tracking-widest text-white/40 hover:text-[#00F0FF] uppercase transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <motion.button
                key={s.label}
                aria-label={s.name}
                className="w-9 h-9 rounded-sm border border-white/10 flex items-center justify-center font-display font-700 text-[10px] text-white/40"
                whileHover={{
                  borderColor: '#00F0FF',
                  color: '#00F0FF',
                  boxShadow: '0 0 12px rgba(0,240,255,0.4)',
                }}
                transition={{ duration: 0.2 }}
              >
                {s.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono-custom text-[10px] text-white/20 tracking-widest">
            &copy; Neon Syndicate 2026. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono-custom text-[10px] text-white/20 tracking-widest">
              Privacy &nbsp;|&nbsp; Terms
            </span>
            <motion.button
              onClick={scrollTop}
              className="w-9 h-9 rounded-sm border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]/60"
              whileHover={{
                borderColor: '#00F0FF',
                color: '#00F0FF',
                boxShadow: '0 0 12px rgba(0,240,255,0.4)',
                y: -2,
              }}
              aria-label="Back to top"
              title="Back to top"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
