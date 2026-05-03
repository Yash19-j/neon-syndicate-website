'use client'

import { motion } from 'framer-motion'
import SectionDivider from './ui/SectionDivider'

const NEWS = [
  {
    id: 1,
    title: 'Neon Syndicate Clinches Season IV Grand Finals Spot',
    date: '2026-05-01',
    tag: 'Tournament',
    gradient: 'from-[#00F0FF]/20 via-[#0A0A20] to-[#0A0A20]',
    accent: '#00F0FF',
  },
  {
    id: 2,
    title: 'CYPHER_X Breaks All-Time K/D Record in Pro Circuit',
    date: '2026-04-28',
    tag: 'Player News',
    gradient: 'from-[#FF00E5]/20 via-[#0A0A20] to-[#0A0A20]',
    accent: '#FF00E5',
  },
  {
    id: 3,
    title: 'New Map "NEO_TOKYO_2049" Added to Competitive Rotation',
    date: '2026-04-20',
    tag: 'Game Update',
    gradient: 'from-[#FBFF00]/20 via-[#0A0A20] to-[#0A0A20]',
    accent: '#FBFF00',
  },
]

export default function LatestNews() {
  return (
    <section id="news" className="relative py-24 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 30% 60%, rgba(255,0,229,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionDivider number="04" label="News" />
        </motion.div>

        {/* Horizontal scroll on mobile, 3-col on desktop */}
        <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3">
          {NEWS.map((article, i) => (
            <motion.article
              key={article.id}
              className="glass-panel card-hover flex-shrink-0 w-72 md:w-auto flex flex-col overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              {/* Image placeholder */}
              <div
                className={`h-44 bg-gradient-to-br ${article.gradient} relative overflow-hidden`}
              >
                {/* Grid overlay on image */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }}
                />
                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span
                    className="font-display text-[9px] tracking-widest uppercase px-2 py-1 rounded-sm"
                    style={{
                      border: `1px solid ${article.accent}55`,
                      color: article.accent,
                      background: `${article.accent}15`,
                    }}
                  >
                    {article.tag}
                  </span>
                </div>
                {/* Decorative corner accent */}
                <div
                  className="absolute bottom-0 right-0 w-16 h-16"
                  style={{
                    background: `radial-gradient(circle at 100% 100%, ${article.accent}30, transparent 70%)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="font-display font-700 text-sm text-white leading-snug text-balance line-clamp-2">
                  {article.title}
                </h3>
                <p className="font-mono-custom text-[10px] text-white/30 mt-auto tracking-widest">
                  {article.date}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
