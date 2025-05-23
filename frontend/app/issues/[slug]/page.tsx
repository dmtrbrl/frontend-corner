import { getIssue } from "@shared/services";
import { IssuePage } from "@components/IssuePage";
import { redirect } from "next/navigation";

type Props = {
  params: { slug: number };
};

export default async function Issue({ params }: Props) {
  const { slug } = await params;
  const issue = await getIssue(slug);

  if (!issue) {
    redirect("/"); // Redirects to the homepage
  }

  return <IssuePage issue={issue} />;
}
