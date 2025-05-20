import dotenv from "dotenv";
import { getIssue, getLastPublishedIssue, getSources } from "@shared/services";
import { weeksAgo } from "./config";
import { parseFeed } from "./lib/parseFeed";
import { getWeekRange } from "./lib/getWeekRange";
import { writeIssue } from "./lib/writeIssue";
import { Article, Issue } from "@shared/types";
import { filterArticles } from "./lib/ai/filterArticles";
import { generateDescriptions } from "./lib/ai/generateDescription";
import { generateExtras } from "./lib/ai/generateExtras";
import { checkIfFileExists } from "./lib/checkIfFileExists";
import { prettify } from "./lib/prettify";

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

    // Prettify selected article titles
    selecteddArticles.forEach((a) => (a.title = prettify(a.title)));

    // Generate article descriptions
    const rawDescriptions = selecteddArticles.map((a) => a.description ?? "");
    const descriptions = await generateDescriptions(rawDescriptions);
    selecteddArticles.forEach(
      (a, i) => (a.description = prettify(descriptions[i]))
    );
    console.log(
      `✍️  Descriptions generated for ${descriptions.length} articles`
    );

    const { issueDescription, joke, challenge } = await generateExtras(
      selecteddArticles.map((a) => a.description)
    );

    console.log("📢 Issue Description:\n", issueDescription);
    console.log("😄 Joke of the Week:\n", joke);
    console.log("🎯 Challenge of the Week:\n", challenge);

    const issueDate = end.toISOString().split("T")[0].replace(/-/g, "");
    const fileName = `${issueDate}.json`;

    let issueNo: number;

    const issuePath = `data/issues/${fileName}`;
    const exists = await checkIfFileExists(issuePath);

    if (exists) {
      const existingIssue = await getIssue(fileName);
      issueNo = existingIssue?.no ?? 1;
    } else {
      const lastIssue = await getLastPublishedIssue();
      issueNo = lastIssue ? lastIssue.no + 1 : 1;
    }

    const issue: Issue = {
      no: issueNo,
      pubDate: end.toISOString(),
      articles: selecteddArticles,
      description: issueDescription,
      joke,
      challenge,
    };

    const filePath = await writeIssue(fileName, issue);
    console.log(`💾 Issue saved: ${filePath}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("🚨 Error running crawler:", message);
  }
})();
