import { getAllIssueFileNames, getLastPublishedIssue } from "@shared/services";
import { IssuePage } from "@components/IssuePage";

export default async function Home() {
  const allIssues = await getAllIssueFileNames();
  const lastPublishedIssue = await getLastPublishedIssue();

  return <IssuePage issue={lastPublishedIssue} count={allIssues.length} />;
}
