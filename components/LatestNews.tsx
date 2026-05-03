'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import SectionDivider from './ui/SectionDivider'

interface Article {
  id: number
  title: string
  date: string
  tag: string
  gradient: string
  accent: string
  body: string
}

const NEWS: Article[] = [
  {
    id: 1,
    title: 'Neon Syndicate Clinches Season IV Grand Finals Spot',
    date: '2026-05-01',
    tag: 'Tournament',
    gradient: 'from-[#00F0FF]/20 via-[#0A0A20] to-[#0A0A20]',
    accent: '#00F0FF',
    body: 'After a dominant run through the upper bracket, Neon Syndicate secured their place in the Season IV Grand Finals with a flawless 2-0 sweep over Cyber Riot. CYPHER_X led the charge with an unprecedented 3.1 K/D across the series, while STATIC_V\'s strategy dismantled Cyber Riot\'s aggressive early-game rotation. The team will face off against Ghost Ctrl in the best-of-five final scheduled for May 10th on map NEO_TOKYO_2049.',
  },
  {
    id: 2,
    title: 'CYPHER_X Breaks All-Time K/D Record in Pro Circuit',
    date: '2026-04-28',
    tag: 'Player News',
    gradient: 'from-[#FF00E5]/20 via-[#0A0A20] to-[#0A0A20]',
    accent: '#FF00E5',
    body: 'In a record-shattering performance during the QF series, CYPHER_X registered a 3.41 K/D ratio over five maps — eclipsing the previous record of 3.28 set by ProdigyX back in Season II. "It\'s all about the read," CYPHER_X said in a post-match interview. "I study VODs for hours before every match. The opponents were predictable." The pro circuit committee has confirmed the record is official.',
  },
  {
    id: 3,
    title: 'New Map "NEO_TOKYO_2049" Added to Competitive Rotation',
    date: '2026-04-20',
    tag: 'Game Update',
    gradient: 'from-[#FBFF00]/20 via-[#0A0A20] to-[#0A0A20]',
    accent: '#FBFF00',
    body: 'The game developers have officially added NEO_TOKYO_2049 to the competitive map pool for Season IV. The map features a three-lane layout with vertical play opportunities on the central skyscraper section, multiple high-tech sniper nests, and a new real-time objective: the Relay Station. Teams have been given two weeks to study the map before it appears in official matches. Neon Syndicate\'s IGL PHANTOM_7 described it as "the most strategically rich map we\'ve seen in three seasons."',
  },
]

export default function LatestNews() {
  const [selected, setSelected] = useState<Article | null>(null)

  return (
    <section id="news" className="relative py-24 px-6">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 30% 60%, rgba(255,0,229,0.04) 0%, transparent 70%)' }}
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

        <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3">
          {NEWS.map((article, i) => (
            <motion.article
              key={article.id}
              role="button"
              tabIndex={0}
              aria-label={`Read article: ${article.title}`}
              className="glass-panel card-hover flex-shrink-0 w-72 md:w-auto flex flex-col overflow-hidden cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              onClick={() => setSelected(article)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelected(article) }}
            >
              {/* Image area */}
              <div className={`h-44 bg-gradient-to-br ${article.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }} />
                <div className="absolute top-3 left-3">
                  <span className="font-display text-[9px] tracking-widest uppercase px-2 py-1 rounded-sm"
                    style={{ border: `1px solid ${article.accent}55`, color: article.accent, background: `${article.accent}15` }}>
                    {article.tag}
                  </span>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16"
                  style={{ background: `radial-gradient(circle at 100% 100%, ${article.accent}30, transparent 70%)` }} />
                {/* Read indicator */}
                <div className="absolute bottom-3 right-3 font-mono-custom text-[9px] tracking-widest uppercase"
                  style={{ color: article.accent }}>
                  Read →
                </div>
              </div>

              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="font-display font-bold text-sm text-white leading-snug text-balance line-clamp-2">
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

      {/* Article detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#0A0A0F]/90 backdrop-blur-xl"
              onClick={() => setSelected(null)}
              aria-hidden="true"
            />
            <motion.div
              className="relative z-10 w-full max-w-lg glass-panel overflow-hidden"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
            >
              {/* Header image */}
              <div className={`h-40 bg-gradient-to-br ${selected.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }} />
                <div className="absolute top-4 left-4">
                  <span className="font-display text-[9px] tracking-widest uppercase px-2 py-1 rounded-sm"
                    style={{ border: `1px solid ${selected.accent}55`, color: selected.accent, background: `${selected.accent}15` }}>
                    {selected.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col gap-4">
                <h2 className="font-display font-black text-lg text-white leading-snug text-balance"
                  style={{ textShadow: `0 0 20px ${selected.accent}40` }}>
                  {selected.title}
                </h2>
                <p className="font-mono-custom text-[10px] text-white/30 tracking-widest">{selected.date}</p>
                <p className="font-sans text-sm text-white/60 leading-relaxed">{selected.body}</p>

                <button
                  onClick={() => setSelected(null)}
                  className="mt-2 self-start font-display text-[11px] tracking-widest uppercase px-5 py-2 rounded-sm border transition-all"
                  style={{ borderColor: `${selected.accent}60`, color: selected.accent }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 12px ${selected.accent}50` }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none' }}
                >
                  Close
                </button>
              </div>

              {/* Close X */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 p-1.5 text-white/40 hover:text-white transition-colors"
                aria-label="Close article"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
