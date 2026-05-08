"use client";

import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";
import SectionDivider from "./ui/SectionDivider";
import type { NewsArticle } from "@/src/lib/getNews";

interface LatestNewsProps {
  news: NewsArticle[];
}

export default function LatestNews({ news }: LatestNewsProps) {
  return (
    <section id="news" className="relative py-24 px-6">
      {/* Background layer */}
      <div className="absolute inset-0 bg-[#0A0A0F]" />

      {/* Midground layer */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 right-0 w-80 h-80 border border-[#FBFF00] rounded-full" />
      </div>

      {/* Content layer */}
      <div className="relative z-20">
        <SectionDivider number="04" title="NEWS" />

        <div className="flex gap-6 overflow-x-auto pb-4 max-w-7xl mx-auto mt-16 scrollbar-hide">
          {news.map((article, index) => (
            <motion.div
              key={article.id}
              className="min-w-[320px] flex-shrink-0"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="card-hover overflow-hidden">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-[#00F0FF]/20 to-[#FF00E5]/20 rounded-t-2xl" />
                )}
                <div className="p-6">
                  <p className="text-xs text-[#A0A0C0] font-mono">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <h3 className="font-orbitron text-lg text-white mt-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#A0A0C0] mt-2 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}