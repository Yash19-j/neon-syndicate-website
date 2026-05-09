"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NeonButton from "./ui/NeonButton";
import { useAuth } from "./AuthContext";
import type { Player } from "@/src/lib/getPlayers";
import MatchTicker from "./ui/MatchTicker";

interface HeroProps {
  finalistA: Player | null;
  finalistB: Player | null;
}

export default function Hero({ finalistA, finalistB }: HeroProps) {
  const { openAuth } = useAuth();

  const handleScroll = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

  // Countdown timer for the ticker (you can adjust the target date)
  const [timeLeft, setTimeLeft] = useState("");

  const targetTime = new Date("2026-05-30T14:00:00Z").getTime();

  function formatTime(ms: number) {
    if (ms <= 0) return "LIVE NOW";
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    const update = () => setTimeLeft(formatTime(targetTime - Date.now()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  const nameA = finalistA?.name ?? "TBD";
  const nameB = finalistB?.name ?? "TBD";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden dark-grid-bg"
    >
      {/* Background neon skyline gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,240,255,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 30% at 80% 80%, rgba(255,0,229,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Rotating rings */}
      {[180, 120, 80].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#00F0FF]/10"
          style={{
            width: `${size}vw`,
            height: `${size}vw`,
            maxWidth: `${size * 8}px`,
            maxHeight: `${size * 8}px`,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 40 + i * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Magenta ring */}
      <motion.div
        className="absolute rounded-full border border-[#FF00E5]/8"
        style={{
          width: "100vw",
          height: "100vw",
          maxWidth: "900px",
          maxHeight: "900px",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-mono-custom text-[#00F0FF]/60 text-xs tracking-[0.4em] uppercase mb-4">
            Est. 2026 — Season IV
          </p>
          <h1
            className="font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-tight text-[#00F0FF] neon-cyan-text glitch-text text-balance"
            data-text="NEON SYNDICATE"
          >
            NEON SYNDICATE
          </h1>
        </motion.div>

        <motion.p
          className="font-sans text-base sm:text-xl text-white/60 tracking-widest uppercase max-w-lg text-pretty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Dominate the digital arena
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <NeonButton variant="cyan" size="lg" onClick={() => handleScroll("#featured-match")}>
            Watch Live
          </NeonButton>
          <NeonButton variant="magenta" size="lg" onClick={() => openAuth("signup")}>
            Join Team
          </NeonButton>
        </motion.div>
      </div>

      {/* Bottom-left: MatchTicker with CMS finalists */}
      <div className="absolute bottom-10 left-6 z-10">
        <MatchTicker finalistA={finalistA} finalistB={finalistB} />
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        className="absolute bottom-10 right-6 z-10 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#00F0FF]/40" />
        <span className="font-mono-custom text-[9px] text-[#00F0FF]/40 tracking-widest uppercase rotate-90 origin-center mt-4">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}