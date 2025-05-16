import Parser from "rss-parser";
import { Article, Source } from "crawler/types";
import { cleanAuthor } from "./cleanAuthor";
import { cleanAndLimit } from "./cleanAndLimit";

const parser = new Parser({
  customFields: {
    item: ["author", "description", "content"],
  },
});

export const parseFeed = async (
  source: Source,
  startDate: Date,
  endDate: Date
): Promise<Article[]> => {
  try {
    const feed = await parser.parseURL(source.feedUrl);

    const articles: Article[] = feed.items.flatMap((item) => {
      if (!item.pubDate || !item.title || !item.link) return [];

      const pubDate = new Date(item.pubDate);
      if (pubDate < startDate || pubDate > endDate) return [];

      const img =
        item.enclosure?.type?.includes("image") && item.enclosure?.url
          ? item.enclosure.url
          : undefined;

      const description = cleanAndLimit(item.description ?? item.content ?? "");

      return [
        {
          title: item.title,
          url: item.link,
          author: cleanAuthor(item.author) ?? source.title,
          pubDate: pubDate.toISOString(),
          description,
          categories: item.categories || [],
          img,
        },
      ];
    });

    console.log(
      `📝 Found ${articles.length} article(s) from "${source.title}"`
    );

    return articles;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`❌ Failed to parse feed: ${source.feedUrl}`, message);
    return [];
  }
};
