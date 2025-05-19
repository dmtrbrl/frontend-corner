import dotenv from "dotenv";
import { getSources } from "@shared/services";
import { weeksAgo, isPreview } from "./config";
import { parseFeed } from "./lib/parseFeed";
import { getLastPublishedIssue } from "./lib/getLastPublishedIssue";
import { getWeekRange } from "./lib/getWeekRange";
import { writeIssue } from "./storage/writeIssue";
import { Article, Issue } from "./types";
import { filterArticles } from "./lib/ai/filterArticles";
import { generateDescriptions } from "./lib/ai/generateDescription";
import { generateExtras } from "./lib/ai/generateExtras";

dotenv.config();

const formatDate = (date: Date) => date.toLocaleString("en-GB");

(async () => {
  try {
    const sources = await getSources();
    const { start, end } = getWeekRange(weeksAgo);

    console.log(`🗓️ Crawling from ${formatDate(start)} to ${formatDate(end)}`);

    const results = await Promise.allSettled(
      sources.map((source) => parseFeed(source, start, end))
    );

    const articles: Article[] = results
      .filter(
        (r): r is PromiseFulfilledResult<Article[]> => r.status === "fulfilled"
      )
      .flatMap((r) => r.value);

    console.log(`🔎 Fetched ${articles.length} articles from all feeds`);

    // Filter articles
    const keep = await filterArticles(
      articles.map((a) => ({ title: a.title, description: a.description }))
    );
    const selecteddArticles = articles.filter((_, i) => keep[i]);
    console.log(
      `🟢 Filtered: ${selecteddArticles.length} relevant articles selected`
    );

    // Generate descriptions
    const rawDescriptions = selecteddArticles.map((a) => a.description ?? "");
    const descriptions = await generateDescriptions(rawDescriptions);
    selecteddArticles.forEach((a, i) => (a.description = descriptions[i]));
    console.log(
      `✍️  Descriptions generated for ${descriptions.length} articles`
    );

    const { description, joke, challenge } = await generateExtras(
      selecteddArticles.map((a) => a.description)
    );

    console.log("📢 Issue Description:\n", description);
    console.log("😄 Joke of the Week:\n", joke);
    console.log("🎯 Challenge of the Week:\n", challenge);

    const lastPublishedIssue = await getLastPublishedIssue("data/issues");
    const issueNo = lastPublishedIssue ? lastPublishedIssue.no + 1 : 1;

    const issue: Issue = {
      no: issueNo,
      pubDate: end.toISOString(),
      articles: selecteddArticles,
      description,
      joke,
      challenge,
    };

    const filePath = await writeIssue(issue, isPreview);
    console.log(`💾 Issue saved: ${filePath}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("🚨 Error running crawler:", message);
  }
})();
