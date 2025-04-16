import { getSources } from "@shared/services";
import Parser from "rss-parser";

const parser = new Parser();

const getLastWeekRange = () => {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

  // End = this Sunday 23:59:59
  const end = new Date(now);
  const daysToAdd = (7 - day) % 7; // how many days to add to get to Sunday
  end.setDate(end.getDate() + daysToAdd);
  end.setHours(23, 59, 59, 999);

  // Start = previous Monday 00:00:00
  const start = new Date(end);
  start.setDate(end.getDate() - 6); // Go back to Monday
  start.setHours(0, 0, 0, 0);

  return { start, end };
};

const parseFeed = async (feedUrl: string) => {
  try {
    const feed = await parser.parseURL(feedUrl);
    console.log(`\n🔗 Feed: ${feed.title}`);

    const { start, end } = getLastWeekRange();

    feed.items.forEach((item) => {
      if (!item.pubDate) return;

      const pubDate = new Date(item.pubDate);
      if (pubDate >= start && pubDate <= end) {
        console.log(`✅ ${item.title} : ${item.link}`);
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
      sources.map((url) => parseFeed(url))
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
