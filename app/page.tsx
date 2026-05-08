import Scanlines from '@/components/ui/Scanlines'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TeamRoster from '@/components/TeamRoster'
import TournamentBracket from '@/components/TournamentBracket'
import LatestNews from '@/components/LatestNews'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/components/AuthContext'
import AuthModal from '@/components/AuthModal'

import { getPlayers } from '@/src/lib/getPlayers';
import { getNews } from '@/src/lib/getNews';
import FeaturedMatch from "@/components/FeaturedMatch";

export default async function Page() {
  const players = await getPlayers();
  const news = await getNews();

  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedMatch players={players} />   {/* ← add players prop */}
      <TeamRoster players={players} />
      <TournamentBracket />
      <LatestNews news={news} />
      <CTA />
      <Footer />
    </>
  );
}