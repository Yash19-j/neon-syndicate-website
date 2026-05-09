'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import SectionDivider from './ui/SectionDivider'
import type { NewsArticle } from '@/src/lib/getNews'

const ACCENTS = ['#00F0FF', '#FF00E5', '#FBFF00']
const GRADIENTS = [
  'from-[#00F0FF]/20 via-[#0A0A20] to-[#0A0A20]',
  'from-[#FF00E5]/20 via-[#0A0A20] to-[#0A0A20]',
  'from-[#FBFF00]/20 via-[#0A0A20] to-[#0A0A20]',
]

interface LatestNewsProps {
  news: NewsArticle[]
}

export default function LatestNews({ news }: LatestNewsProps) {
  const [selected, setSelected] = useState<NewsArticle | null>(null)

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
          <SectionDivider number="04" title="NEWS" color="#00F0FF" />
        </motion.div>

        <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 mt-16">
          {news.map((article, i) => {
            const accent = ACCENTS[i % ACCENTS.length]
            const gradient = GRADIENTS[i % GRADIENTS.length]

            return (
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setSelected(article)
                }}
              >
                {/* Image / gradient area – no tag */}
                <div className="h-44 relative overflow-hidden">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                  )}

                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                    }}
                  />

                  {/* Corner glow */}
                  <div
                    className="absolute bottom-0 right-0 w-16 h-16"
                    style={{
                      background: `radial-gradient(circle at 100% 100%, ${accent}30, transparent 70%)`,
                    }}
                  />

                  {/* Read indicator */}
                  <div
                    className="absolute bottom-3 right-3 font-mono-custom text-[9px] tracking-widest uppercase"
                    style={{ color: accent }}
                  >
                    Read →
                  </div>
                </div>

                {/* Card text */}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h3 className="font-display font-bold text-sm text-white leading-snug text-balance line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="font-mono-custom text-[10px] text-white/30 mt-auto tracking-widest">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>

      {/* Article detail modal – also no tag */}
      <AnimatePresence>
        {selected && (() => {
          const selectedIndex = news.findIndex((n) => n.id === selected.id)
          const selectedAccent = ACCENTS[selectedIndex % ACCENTS.length]
          const selectedGradient = GRADIENTS[selectedIndex % GRADIENTS.length]

          return (
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
                {/* Modal header image / gradient – no tag */}
                <div className="h-40 relative overflow-hidden">
                  {selected.image ? (
                    <img
                      src={selected.image}
                      alt={selected.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedGradient}`} />
                  )}

                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                    }}
                  />
                </div>

                {/* Modal content */}
                <div className="p-7 flex flex-col gap-4">
                  <h2
                    className="font-display font-black text-lg text-white leading-snug text-balance"
                    style={{ textShadow: `0 0 20px ${selectedAccent}40` }}
                  >
                    {selected.title}
                  </h2>
                  <p className="font-mono-custom text-[10px] text-white/30 tracking-widest">
                    {new Date(selected.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="font-sans text-sm text-white/60 leading-relaxed whitespace-pre-line">
                    {selected.excerpt}
                  </p>

                  <button
                    onClick={() => setSelected(null)}
                    className="mt-2 self-start font-display text-[11px] tracking-widest uppercase px-5 py-2 rounded-sm border transition-all"
                    style={{
                      borderColor: `${selectedAccent}60`,
                      color: selectedAccent,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 12px ${selectedAccent}50`
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
                    }}
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
          )
        })()}
      </AnimatePresence>
    </section>
  )
}