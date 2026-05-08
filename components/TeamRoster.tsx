"use client";

import { motion } from "framer-motion";
import PlayerCard from "./ui/PlayerCard";
import SectionDivider from "./ui/SectionDivider";
import type { Player } from "@/src/lib/getPlayers";

interface TeamRosterProps {
  players: Player[];
}

export default function TeamRoster({ players }: TeamRosterProps) {
  return (
    <section id="roster" className="relative py-24 px-6">
      {/* Background layer */}
      <div className="absolute inset-0 bg-[#0A0A0F]" />

      {/* Midground layer */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-[#00F0FF] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-[#FF00E5] rounded-full" />
      </div>

      {/* Content layer */}
      <div className="relative z-20">
        <SectionDivider number="02" title="ROSTER" />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}