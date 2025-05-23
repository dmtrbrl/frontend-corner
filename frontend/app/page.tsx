import { getLastPublishedIssue } from "@shared/services";
import { IssuePage } from "@components/IssuePage";

export default async function Home() {
  const issue = await getLastPublishedIssue();

  return <IssuePage issue={issue} />;
}
