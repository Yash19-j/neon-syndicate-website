import { getPlayers } from "@/src/lib/getPlayers";
import { getNews } from "@/src/lib/getNews";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedMatch from "@/components/FeaturedMatch";
import TeamRoster from "@/components/TeamRoster";
import TournamentBracket from "@/components/TournamentBracket";
import LatestNews from "@/components/LatestNews";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const revalidate = 60; // ISR: checks Contentful every 60 seconds

export default async function Page() {
  const players = await getPlayers();
  const news = await getNews();

  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedMatch />
      <TeamRoster players={players} />
      <TournamentBracket />
      <LatestNews news={news} />
      <CTA />
      <Footer />
    </>
  );
}