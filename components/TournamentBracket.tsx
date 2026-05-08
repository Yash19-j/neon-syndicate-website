"use client";

import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";
import SectionDivider from "./ui/SectionDivider";
import type { Player } from "@/src/lib/getPlayers";

interface TournamentBracketProps {
  players: Player[];
}

// Helper to get player name or fallback
const playerName = (players: Player[], index: number) =>
  players[index]?.name ?? `Player ${index + 1}`;

interface Match {
  teamA: string;
  teamB: string;
  winner: string;
}

export default function TournamentBracket({ players }: TournamentBracketProps) {
  // Build the bracket matches (hardcoded winners for now)
  const quarters: Match[] = [
    { teamA: playerName(players, 0), teamB: playerName(players, 1), winner: playerName(players, 0) },
    { teamA: playerName(players, 2), teamB: playerName(players, 3), winner: playerName(players, 2) },
    { teamA: playerName(players, 4), teamB: playerName(players, 5), winner: playerName(players, 4) },
    { teamA: playerName(players, 6), teamB: playerName(players, 7), winner: playerName(players, 6) },
  ];

  const semis: Match[] = [
    { teamA: quarters[0].winner, teamB: quarters[1].winner, winner: quarters[0].winner },
    { teamA: quarters[2].winner, teamB: quarters[3].winner, winner: quarters[2].winner },
  ];

  const final: Match = {
    teamA: semis[0].winner,
    teamB: semis[1].winner,
    winner: semis[0].winner,
  };

  return (
    <section id="bracket" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0F]" />

      {/* Midground rotating ring */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/3 right-0 w-96 h-96 border border-[#FBFF00] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20">
        <SectionDivider number="03" title="BRACKET" />

        <div className="mt-16 overflow-x-auto pb-6">
          <div className="flex items-stretch gap-20 min-w-max px-6 mx-auto">
            {/* Quarter Finals */}
            <BracketRound
              title="Quarter Finals"
              matches={quarters}
              color="#00F0FF"
              connectorToNext={true}
            />

            {/* Semi Finals – aligned between quarter pairs */}
            <div className="flex flex-col justify-around h-[600px]">
              <h3 className="font-display text-xs tracking-widest text-[#FF00E5] uppercase mb-2">
                Semi Finals
              </h3>
              {semis.map((match, i) => (
                <motion.div
                  key={`sf-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <GlassCard className="min-w-[200px] p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-sm text-white">{match.teamA}</p>
                      {match.winner === match.teamA && <WinBadge color="#FF00E5" />}
                    </div>
                    <p className="text-[10px] text-white/20 font-display tracking-wider my-1 text-center">
                      VS
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-sm text-white">{match.teamB}</p>
                      {match.winner === match.teamB && <WinBadge color="#FF00E5" />}
                    </div>
                    {match.winner && (
                      <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: "#FF00E5", boxShadow: "0 0 6px #FF00E5" }}
                        />
                        <span className="text-[10px] font-mono text-[#FF00E5] uppercase">
                          Winner
                        </span>
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Grand Final */}
            <div className="flex flex-col justify-center h-[600px]">
              <h3 className="font-display text-xs tracking-widest text-[#FBFF00] uppercase mb-2">
                Grand Final
              </h3>
              <GlassCard className="min-w-[220px] p-4 border-[#FBFF00] shadow-[0_0_20px_rgba(251,255,0,0.4)]">
                <p className="font-mono text-sm text-white">{final.teamA}</p>
                <p className="text-[10px] text-white/30 font-display tracking-wider my-1">VS</p>
                <p className="font-mono text-sm text-white">{final.teamB}</p>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FBFF00] shadow-[0_0_6px_#FBFF00]" />
                  <span className="text-[10px] font-mono text-[#FBFF00] uppercase">
                    Winner: {final.winner}
                  </span>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Reusable round column ── */
function BracketRound({
  title,
  matches,
  color,
  connectorToNext,
}: {
  title: string;
  matches: Match[];
  color: string;
  connectorToNext?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between h-[600px]">
      <h3 className="font-display text-xs tracking-widest uppercase mb-1" style={{ color }}>
        {title}
      </h3>
      {matches.map((match, i) => (
        <motion.div
          key={`${title}-${i}`}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <GlassCard className="min-w-[200px] p-4">
            <div className="flex items-center justify-between">
              <p className="font-mono text-sm text-white">{match.teamA}</p>
              {match.winner === match.teamA && <WinBadge color={color} />}
            </div>
            <p className="text-[10px] text-white/20 font-display tracking-wider my-1 text-center">
              VS
            </p>
            <div className="flex items-center justify-between">
              <p className="font-mono text-sm text-white">{match.teamB}</p>
              {match.winner === match.teamB && <WinBadge color={color} />}
            </div>
            {match.winner && (
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
                />
                <span className="text-[10px] font-mono uppercase" style={{ color }}>
                  Winner
                </span>
              </div>
            )}
          </GlassCard>
          {connectorToNext && (
            <div
              className="absolute top-1/2 -right-10 w-10 h-0.5"
              style={{ backgroundColor: color, opacity: 0.3 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function WinBadge({ color }: { color: string }) {
  return (
    <span
      className="ml-2 text-[10px] font-display tracking-widest uppercase px-1.5 py-0.5 rounded-sm border"
      style={{ color, borderColor: color, boxShadow: `0 0 6px ${color}` }}
    >
      W
    </span>
  );
}