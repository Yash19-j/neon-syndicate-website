"use client";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import type { Player } from "@/src/lib/getPlayers";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <GlassCard className="flex items-center gap-4 p-6 card-hover group">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full border-2 border-[#00F0FF] overflow-hidden flex-shrink-0 bg-[#0A0A1F] group-hover:border-[#FF00E5] transition-colors duration-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
          {player.avatar ? (
            <img
              src={player.avatar}
              alt={player.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#00F0FF] font-orbitron text-xl">
              {player.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-orbitron text-lg text-white truncate">
            {player.name}
          </h3>
          <p className="text-sm text-[#A0A0C0]">{player.role}</p>

          {/* Stats */}
          <div className="mt-2 flex gap-3 text-xs font-mono">
            <span className="text-[#00F0FF]">
              K: {player.stats?.kills ?? 0}
            </span>
            <span className="text-[#FF00E5]">
              W: {player.stats?.wins ?? 0}
            </span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}