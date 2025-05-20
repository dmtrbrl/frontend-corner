import { readdir, readFile } from "fs/promises";
import path from "path";
import { IssueSchema, SourcesSchema } from "./schemas";
import { Issue, Sources } from "@shared/types";

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

export async function getIssue(fileName: string): Promise<Issue | null> {
  try {
    const issuePath = path.resolve(`data/issues/${fileName}`);

    const raw = await readFile(issuePath, "utf-8");
    const json = JSON.parse(raw);
    const issue = IssueSchema.parse(json);

    return issue;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getLastPublishedIssue(): Promise<Issue | null> {
  try {
    const issuesDir = "data/issues";
    const files = await readdir(issuesDir);

    const jsonFiles = files
      .filter((f) => /^\d{8}\.json$/.test(f))
      .sort()
      .reverse();

    const latestFile = jsonFiles[0];
    if (!latestFile) return null;

    const issue = await getIssue(latestFile);
    return issue;
  } catch (err) {
    console.warn(
      `Failed to load last published issue: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
    return null;
  }
}
