import { getSources } from "@shared/services";
import Parser from "rss-parser";
import getLastWeekRange from "./utils/getLastWeekRange";
import cleanAuthor from "./utils/cleanAuthor";

const parser = new Parser({
  customFields: {
    item: ["author", "description"],
  },
});

const parseFeed = async (title: string, feedUrl: string) => {
  try {
    const feed = await parser.parseURL(feedUrl);
    console.log(`🔗 Feed: ${title}`);

    const { start, end } = getLastWeekRange();

    feed.items.forEach((item) => {
      if (!item.pubDate) return;

      const pubDate = new Date(item.pubDate);
      const preview = item.enclosure?.type?.includes("image")
        ? item.enclosure?.url
        : undefined;
      const author = cleanAuthor(item.author) || title;

      if (pubDate >= start && pubDate <= end) {
        console.log(
          `✅ ${item.title} : ${item.link} : ${item.categories} : ${preview} : ${author}`
        );
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`❌ Failed to parse feed: ${feedUrl}`, message);
  }
};

const formatDate = (date: Date) => date.toLocaleString("en-GB");

const run = async () => {
  try {
    const sources = await getSources();
    const { start, end } = getLastWeekRange();
    console.log(`🗓️ Crawling from ${formatDate(start)} to ${formatDate(end)}`);

    const results = await Promise.allSettled(
      sources.map(({ title, feedUrl }) => parseFeed(title, feedUrl))
    );
    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length > 0) {
      console.warn(`⚠️ ${failed.length} feed(s) failed to parse.`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("🚨 Error running crawler:", message);
  }
};

run();
