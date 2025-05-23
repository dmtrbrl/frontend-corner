import { getAllIssueFileNames, getLastPublishedIssue } from "@shared/services";
import { IssuePage } from "@components/IssuePage";

export default async function Home() {
  const allIssues = await getAllIssueFileNames();
  const issue = await getLastPublishedIssue();

  return <IssuePage issue={issue} count={allIssues.length} />;
}
