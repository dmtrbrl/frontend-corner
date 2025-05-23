import { getIssue } from "@shared/services";
import { IssuePage } from "@components/IssuePage";
import { redirect } from "next/navigation";

type Params = Promise<{ slug: string }>;

export default async function Issue({ params }: { params: Params }) {
  const { slug } = await params;
  const issue = await getIssue(slug);

  if (!issue) {
    redirect("/"); // Redirects to the homepage
  }

  return <IssuePage issue={issue} />;
}
