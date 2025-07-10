import type { Metadata } from "next";
import { getAllIssueFileNames, getIssue } from "@shared/services";
import { IssuePage } from "@components/IssuePage";
import { redirect } from "next/navigation";
import { baseMetadata } from "frontend/utils/baseMetadata";

export async function generateStaticParams() {
  const files = await getAllIssueFileNames();

  return (
    files?.map((_, i) => ({
      slug: `${i + 1}`,
    })) ?? []
  );
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const issue = await getIssue(slug);

  if (!issue) {
    return null;
  }

  const issueTitle = `Frontend Corner – Issue #${issue.no}`;
  const issueDescription = issue.description;
  const issueUrl = `https://www.frontendcorner.com/issue/${issue.no}`;

  return {
    title: issueTitle,
    description: issueDescription,
    openGraph: {
      ...baseMetadata.openGraph,
      title: issueTitle,
      description: issueDescription,
      url: issueUrl,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: issueTitle,
      description: issueDescription,
    },
  };
}

export default async function Issue({ params }: { params: Params }) {
  const { slug } = await params;
  const allIssues = await getAllIssueFileNames();
  const issue = await getIssue(slug);

  if (!issue) {
    redirect("/"); // Redirects to the homepage
  }

  return <IssuePage issue={issue} count={allIssues.length} />;
}
