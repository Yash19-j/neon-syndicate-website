import { contentfulClient } from "./contentful";

export interface Player {
  id: string;
  name: string;
  role: string;
  avatar: string | null;
  stats: {
    kills: number;
    wins: number;
  };
}

export async function getPlayers(): Promise<Player[]> {
  const res = await contentfulClient.getEntries({
    content_type: "player",
    order: ["fields.name"],
  });

  return res.items.map((item: any) => ({
    id: item.sys.id,
    name: item.fields.name,
    role: item.fields.role,
    avatar: item.fields.avatar?.fields?.file?.url
      ? `https:${item.fields.avatar.fields.file.url}`
      : null,
    stats: item.fields.stats,
  }));
}