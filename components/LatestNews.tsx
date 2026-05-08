"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "./ui/GlassCard";
import SectionDivider from "./ui/SectionDivider";
import type { NewsArticle } from "@/src/lib/getNews";

interface LatestNewsProps {
  news: NewsArticle[];
}

export default function LatestNews({ news }: LatestNewsProps) {
  const [selected, setSelected] = useState<NewsArticle | null>(null);

  return (
    <section id="news" className="relative py-24 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0F]" />
      {/* Midground */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 right-0 w-80 h-80 border border-[#FBFF00] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-20">
        <SectionDivider number="04" title="NEWS" />

        <div className="flex gap-6 overflow-x-auto pb-4 max-w-7xl mx-auto mt-16 scrollbar-hide">
          {news.map((article, index) => (
            <motion.div
              key={article.id}
              className="min-w-[280px] flex-shrink-0 cursor-pointer"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelected(article)}
            >
              <GlassCard className="card-hover overflow-hidden flex flex-col">
                {/* Image */}
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-[#00F0FF]/20 to-[#FF00E5]/20" />
                )}
                {/* Text block */}
                <div className="p-5 flex flex-col gap-2">
                  <p className="text-xs text-[#A0A0C0] font-mono">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <h3 className="font-orbitron text-lg text-white leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pop‑up */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />

            {/* Card */}
            <motion.div
              className="relative w-full max-w-lg glass-panel p-8 shadow-[0_0_30px_rgba(0,240,255,0.15)] max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-[#FF00E5] text-2xl leading-none"
              >
                ×
              </button>

              {selected.image && (
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />
              )}

              <h2 className="font-display text-2xl text-[#00F0FF] neon-cyan-text">
                {selected.title}
              </h2>
              <p className="text-xs text-white/40 font-mono mt-1">
                {new Date(selected.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              {/* Full description (plain long text) */}
              <p className="text-sm text-white/70 mt-6 leading-relaxed whitespace-pre-line">
                {selected.excerpt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}