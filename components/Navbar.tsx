'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NeonButton from './ui/NeonButton'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Matches', href: '#featured-match' },
  { label: 'Roster', href: '#roster' },
  { label: 'News', href: '#news' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
      animate={{
        background: scrolled ? 'rgba(10,10,20,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
        borderBottom: scrolled ? '1px solid rgba(0,240,255,0.15)' : '1px solid transparent',
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#hero')}
          className="font-display font-black text-xl tracking-widest text-[#00F0FF] neon-cyan-text select-none"
        >
          NEON<span className="text-white/80">SYNDICATE</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-display text-xs tracking-widest text-white/60 hover:text-[#00F0FF] hover:neon-cyan-text uppercase transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <NeonButton variant="magenta" size="sm">
            Join Now
          </NeonButton>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-0.5 bg-[#00F0FF]"
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-[#00F0FF]"
            animate={{ opacity: mobileOpen ? 0 : 1 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-[#00F0FF]"
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden glass-panel mt-3 mx-0 p-4 flex flex-col gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-display text-sm tracking-widest text-white/70 hover:text-[#00F0FF] uppercase text-left transition-colors"
              >
                {link.label}
              </button>
            ))}
            <NeonButton variant="magenta" size="sm">
              Join Now
            </NeonButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
