"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";
import PlayerCard from "./ui/PlayerCard";
import SectionDivider from "./ui/SectionDivider";
import type { Player } from "@/src/lib/getPlayers";

interface FeaturedMatchProps {
  players: Player[];        // full roster (still needed by other sections)
  finalistA: Player | null; // Grand Final player 1
  finalistB: Player | null; // Grand Final player 2
}

export default function FeaturedMatch({
  players,
  finalistA,
  finalistB,
}: FeaturedMatchProps) {
  // ── Countdown timer (unchanged) ──
  const targetTime = Date.now() + 2 * 60 * 60 * 1000;

  function formatTime(ms: number) {
    if (ms <= 0) return "LIVE NOW";
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  const [timeLeft, setTimeLeft] = useState(() =>
    formatTime(targetTime - Date.now())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        setTimeLeft("LIVE NOW");
        clearInterval(interval);
        return;
      }
      setTimeLeft(formatTime(diff));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  // ── Finalists → displayed players (with fallback) ──
  const playerA = finalistA ?? {
    id: "1",
    name: "TBD",
    role: "Finalist",
    avatar: null,
    stats: { kills: 0, wins: 0 },
  };
  const playerB = finalistB ?? {
    id: "2",
    name: "TBD",
    role: "Finalist",
    avatar: null,
    stats: { kills: 0, wins: 0 },
  };

  return (
    <section id="featured-match" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0F]" />
      {/* Midground rotating rings */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] border border-[#00F0FF] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] border border-[#FF00E5] rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20">
        <SectionDivider number="01" title="FEATURED MATCH" color="#00F0FF" />
        
        <div className="max-w-7xl mx-auto mt-16 flex flex-col lg:flex-row items-center justify-center gap-10">
          {/* Player A (Finalist) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-xs"
          >
            <PlayerCard player={playerA} />
          </motion.div>

          {/* VS Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-sm"
          >
            <GlassCard className="p-10 text-center">
              <p className="text-6xl font-orbitron font-black text-[#FBFF00] drop-shadow-[0_0_15px_rgba(251,255,0,0.6)]">
                VS
              </p>
              <p className="text-sm text-[#A0A0C0] mt-4 font-mono tracking-widest uppercase">
                NEO TOKYO 2049
              </p>
              <p
                className={`text-2xl font-mono mt-4 ${
                  timeLeft === "LIVE NOW"
                    ? "text-[#FF00E5] animate-pulse"
                    : "text-[#00F0FF]"
                }`}
              >
                {timeLeft}
              </p>
            </GlassCard>
          </motion.div>

          {/* Player B (Finalist) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-xs"
          >
            <PlayerCard player={playerB} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}