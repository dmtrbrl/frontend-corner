import dotenv from "dotenv";
import { weeksAgo, isPreview } from "./config";
import { parseFeed } from "./lib/parseFeed";
import { generateDescriptions } from "./lib/aiGenerateDescription";
import { getNextIssueNo } from "./lib/getNextIssueNo";
import { getWeekRange } from "./lib/getWeekRange";
import { readSources } from "./storage/readSources";
import { writeIssue } from "./storage/writeIssue";
import { Article, Issue } from "./types";

dotenv.config();

const formatDate = (date: Date) => date.toLocaleString("en-GB");

(async () => {
  try {
    const sources = await readSources();
    const { start, end } = getWeekRange(weeksAgo);

    console.log(`🗓️ Crawling from ${formatDate(start)} to ${formatDate(end)}`);

    const results = await Promise.allSettled(
      sources.map((source) => parseFeed(source, start, end))
    );

    const articles: Article[] = results
      .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
      .flatMap((r) => r.value);

    // Generate descriptions
    const rawDescriptions = articles.map((a) => a.description ?? "");
    const descriptions = await generateDescriptions(rawDescriptions);

    articles.forEach((a, i) => (a.description = descriptions[i]));

    const nextIssueNo = await getNextIssueNo("data/issues");

    const issue: Issue = {
      no: nextIssueNo,
      pubDate: end.toISOString(),
      title: `Weekly Digest #${nextIssueNo}`,
      articles,
    };

    await writeIssue(issue, isPreview);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("🚨 Error running crawler:", message);
  }
})();
