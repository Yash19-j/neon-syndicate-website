import { contentfulClient } from "./contentful";

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  image: string | null;
}

export async function getNews(): Promise<NewsArticle[]> {
  const res = await contentfulClient.getEntries({
    content_type: "newsArticle",
    order: ["-fields.date"],
  });

  return res.items.map((item: any) => ({
    id: item.sys.id,
    title: item.fields.title,
    slug: item.fields.slug,
    excerpt: extractTextFromRichText(item.fields.excerpt),
    date: item.fields.date,
    image: item.fields.image?.fields?.file?.url
      ? `https:${item.fields.image.fields.file.url}`
      : null,
  }));
}

// Helper: extract plain text from Rich Text field
function extractTextFromRichText(richText: any): string {
  if (!richText?.content) return "";
  return richText.content
    .map((block: any) =>
      block.content?.map((node: any) => node.value).join("")
    )
    .join(" ");
}