import { weeksAgo, isPreview } from "./config";
import extractArticles from "./lib/feed/extractArticles";
import { getNextIssueNo } from "./lib/issue/getNextIssueNo";
import { getWeekRange } from "./lib/issue/getWeekRange";
import { readSources } from "./storage/readSources";
import { writeIssue } from "./storage/writeIssue";
import { Issue } from "./types";

const formatDate = (date: Date) => date.toLocaleString("en-GB");

(async () => {
  try {
    const sources = await readSources();
    const { start, end } = getWeekRange(weeksAgo);

    console.log(`🗓️ Crawling from ${formatDate(start)} to ${formatDate(end)}`);

    const results = await Promise.allSettled(
      sources.map((source) => extractArticles(source, start, end))
    );

    const articles = results
      .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
      .flatMap((r) => r.value);

    const nextIssueNo = await getNextIssueNo("data/issues");

    const issue: Issue = {
      no: nextIssueNo,
      pubDate: end.toISOString(),
      title: `Weekly Digest – ${formatDate(start)} → ${formatDate(end)}`,
      articles,
    };

    await writeIssue(issue, isPreview);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("🚨 Error running crawler:", message);
  }
})();
