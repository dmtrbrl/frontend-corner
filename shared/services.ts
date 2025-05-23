import { readdir, readFile } from "fs/promises";
import path from "path";
import { IssueSchema, SourcesSchema } from "./schemas";
import { Archive, Issue, Sources } from "@shared/types";

export async function getSources(): Promise<Sources> {
  try {
    const sourcesPath = path.resolve("data/sources.json");
    const raw = await readFile(sourcesPath, "utf-8");
    const json = JSON.parse(raw);
    const sources = SourcesSchema.parse(json);

    return sources;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAllIssueFileNames(): Promise<string[] | null> {
  try {
    const issuesDir = "data/issues";
    const files = await readdir(issuesDir);

    const jsonFiles = files
      .filter((f) => /^\d{8}\.json$/.test(f))
      .sort((a, b) => b.localeCompare(a))
      .reverse();

    return jsonFiles;
  } catch (error) {
    console.error(
      `Failed to load last published issue: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return null;
  }
}

export async function getAllIssues(): Promise<Archive> {
  const allFiles = await getAllIssueFileNames();
  if (!allFiles) return [];

  const issues: Archive = await Promise.all(
    allFiles.map(async (_, i) => {
      const issue = await getIssue(i + 1);
      return {
        no: issue?.no,
        pubDate: issue?.pubDate,
        description: issue?.description,
      };
    })
  );

  return issues.sort((a, b) =>
    (b.pubDate ?? "").localeCompare(a.pubDate ?? "")
  );
}

export async function getIssue(no: number | string): Promise<Issue | null> {
  try {
    const i = Number(no) - 1;

    const allFiles = await getAllIssueFileNames();
    if (!allFiles) return null;

    const fileName = allFiles[i];
    if (!fileName) return null;

    const issuePath = path.resolve(`data/issues/${fileName}`);

    const raw = await readFile(issuePath, "utf-8");
    const json = JSON.parse(raw);
    const issue = IssueSchema.parse(json);

    if (issue) {
      // Sort articles
      issue.articles = issue.articles.sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );
    }

    return issue;
  } catch (error) {
    console.warn(
      `Failed to load issue #${no}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return null;
  }
}

export async function getLastPublishedIssue(): Promise<Issue | null> {
  try {
    const jsonFiles = await getAllIssueFileNames();
    if (!jsonFiles) return null;

    const issue = await getIssue(jsonFiles.length);
    return issue;
  } catch (error) {
    console.warn(
      `Failed to load last published issue: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return null;
  }
}
