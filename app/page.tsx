import { getPlayers } from '@/src/lib/getPlayers'
import { getNews } from '@/src/lib/getNews'
import { getMatches } from '@/src/lib/getMatches'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeaturedMatch from '@/components/FeaturedMatch'
import TeamRoster from '@/components/TeamRoster'
import TournamentBracket from '@/components/TournamentBracket'
import LatestNews from '@/components/LatestNews'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export const revalidate = 60

export default async function Page() {
  const players = await getPlayers()
  const news = await getNews()
  const matches = await getMatches()

  // Find the Grand Final match (CMS "round" field might be "Final")
  const finalMatch = matches.find(m => m.round.toLowerCase().includes('final')) ?? null

  // Finalists come from the Grand Final's teamA / teamB
  const finalistA = finalMatch?.teamA ?? players[0] ?? null
  const finalistB = finalMatch?.teamB ?? players[4] ?? null

  return (
    <>
      <Navbar />
      <Hero finalistA={finalistA} finalistB={finalistB} />
      <FeaturedMatch
        players={players}
        finalistA={finalistA}
        finalistB={finalistB}
        matchDate={finalMatch?.matchDate ?? null}
        map={finalMatch?.map ?? null}
      />
      <TeamRoster players={players} />
      <TournamentBracket matches={matches} />
      <LatestNews news={news} />
      <CTA />
      <Footer />
    </>
  )
}