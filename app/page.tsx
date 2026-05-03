import Scanlines from '@/components/ui/Scanlines'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeaturedMatch from '@/components/FeaturedMatch'
import TeamRoster from '@/components/TeamRoster'
import TournamentBracket from '@/components/TournamentBracket'
import LatestNews from '@/components/LatestNews'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <main className="relative bg-[#0A0A0F] text-white overflow-x-hidden">
      {/* Fixed scanline overlay */}
      <Scanlines />

      {/* Sticky navigation */}
      <Navbar />

      {/* Page sections */}
      <Hero />
      <FeaturedMatch />
      <TeamRoster />
      <TournamentBracket />
      <LatestNews />
      <CTA />
      <Footer />
    </main>
  )
}
