import { contentfulClient } from './contentful'
import type { Player } from './getPlayers'

export interface Match {
  id: string
  round: string
  order: number
  teamA: Player | null
  teamB: Player | null
  winner: Player | null
  matchDate: string | null
  map: string | null
}

export async function getMatches(): Promise<Match[]> {
  const res = await contentfulClient.getEntries({
    content_type: 'match',
    order: ['fields.order'],
    include: 2, // resolve linked Player entries
  })

  return res.items.map((item: any) => {
    const fields = item.fields
    return {
      id: item.sys.id,
      round: fields.round,
      order: fields.order,
      teamA: mapPlayer(fields.teamA),
      teamB: mapPlayer(fields.teamB),
      winner: mapPlayer(fields.winner),
      matchDate: fields.matchDate ?? null,
      map: fields.map ?? null,
    }
  })
}

function mapPlayer(playerField: any): Player | null {
  if (!playerField || !playerField.sys) return null
  const f = playerField.fields
  return {
    id: playerField.sys.id,
    name: f.name,
    role: f.role,
    avatar: f.avatar?.fields?.file?.url ? `https:${f.avatar.fields.file.url}` : null,
    stats: f.stats ?? { kills: 0, wins: 0 },
  }
}