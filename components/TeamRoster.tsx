"use client";

import { motion } from "framer-motion";
import SectionDivider from "./ui/SectionDivider";
import type { Player } from "@/src/lib/getPlayers";

// Color palette for player cards (cycles if more than 8 players)
const CARD_COLORS = [
  "#00F0FF", "#FF00E5", "#FBFF00", "#00F0FF", "#FF00E5", "#00F0FF", "#FF00E5", "#FBFF00",
];

// Helper to generate initials from name
function getInitials(name: string): string {
  return name
    .split(/[\s_]+/)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

interface TeamRosterProps {
  players: Player[];
}

export default function TeamRoster({ players }: TeamRosterProps) {
  return (
    <section id="roster" className="relative py-24 px-6">
      {/* Background accent (same as original) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 50%, rgba(255,0,229,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionDivider number="02" title="ROSTER" color="#FF00E5" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {players.map((player, i) => {
            const color = CARD_COLORS[i % CARD_COLORS.length];
            const initials = getInitials(player.name);
            const kills = player.stats?.kills ?? 0;
            const wins = player.stats?.wins ?? 0;
            const ratio = wins > 0 ? (kills / wins).toFixed(1) : "—";

            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                {/* Player Card (glass with gradient accent) */}
                <div className="glass-panel p-5 flex flex-col items-center text-center card-hover gap-3">
                  {/* Avatar circle with gradient + glow */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${color}55, ${color}22)`,
                      border: `2px solid ${color}`,
                      boxShadow: `0 0 20px ${color}44`,
                    }}
                  >
                    {player.avatar ? (
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="font-display font-black text-2xl text-white">
                        {initials}
                      </span>
                    )}
                  </div>

                  {/* Name & Role */}
                  <div>
                    <h3 className="font-display font-bold text-lg text-white leading-tight">
                      {player.name}
                    </h3>
                    <p className="text-xs text-white/50 font-display tracking-[0.2em] uppercase mt-0.5">
                      {player.role}
                    </p>
                  </div>

                  {/* Stats: Kills / Wins / K/W Ratio */}
                  <div className="grid grid-cols-3 gap-3 w-full mt-2 text-center">
                    <div>
                      <p className="text-xl font-mono text-white">{kills}</p>
                      <p className="text-[9px] text-white/40 uppercase tracking-widest">Kills</p>
                    </div>
                    <div>
                      <p className="text-xl font-mono text-white">{wins}</p>
                      <p className="text-[9px] text-white/40 uppercase tracking-widest">Wins</p>
                    </div>
                    <div>
                      <p className="text-xl font-mono text-white">{ratio}</p>
                      <p className="text-[9px] text-white/40 uppercase tracking-widest">K/W</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}