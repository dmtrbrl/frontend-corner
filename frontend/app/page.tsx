import { getLastPublishedIssue } from "@shared/services";
import { AppIssue } from "../components/AppIssue";

export default async function Home() {
  const issue = await getLastPublishedIssue();

  // Sort articles
  issue.articles = issue.articles.toSorted(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  return <AppIssue issue={issue} />;
}
