"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Player } from "@/src/lib/getPlayers";

interface MatchTickerProps {
  finalistA: Player | null;
  finalistB: Player | null;
}

export default function MatchTicker({ finalistA, finalistB }: MatchTickerProps) {
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
  }, []);

  const nameA = finalistA?.name ?? "TBD";
  const nameB = finalistB?.name ?? "TBD";

  // Build dynamic ticker items – at least the Grand Final
  const tickerItems = [
    {
      label: nameA,
      vs: nameB,
      info: `Grand Final · May 30, 2 PM · ${timeLeft || "LOADING..."}`,
      status: "UPCOMING",
      color: "#FBFF00",
    },
  ];

  return (
    <motion.div
      className="glass-panel flex items-center gap-0 overflow-hidden w-[320px] sm:w-[420px]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      style={{ height: "44px" }}
    >
      {/* Live badge */}
      <div className="flex items-center gap-2 px-3 shrink-0 border-r border-white/10 h-full">
        <motion.div
          className="w-2 h-2 rounded-full bg-[#FF00E5]"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="font-display text-[9px] tracking-widest text-[#FF00E5] uppercase">
          Live
        </span>
      </div>

      {/* Scrolling ticker */}
      <div className="flex-1 overflow-hidden relative h-full">
        <div className="ticker-animate flex items-center h-full whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-5 font-mono-custom text-[11px]"
            >
              <span className="text-white/70">{item.label}</span>
              <span style={{ color: item.color }}>vs</span>
              <span className="text-white/70">{item.vs}</span>
              <span className="text-white/30 text-[10px]">·</span>
              <span className="text-white/40 text-[10px]">{item.info}</span>
              <span className="text-white/15 mx-3">|</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}