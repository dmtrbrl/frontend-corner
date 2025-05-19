import { IssueSchema } from "@shared/schemas";
import { Issue } from "@shared/types";
import { readdir, readFile } from "fs/promises";
import path from "path";

export async function getLastPublishedIssue(): Promise<Issue | null> {
  try {
    const issuesDir = "data/issues";
    const files = await readdir(issuesDir);

    let lastIssue: Issue | null = null;

    for (const file of files) {
      try {
        const filePath = path.join(issuesDir, file);
        const content = await readFile(filePath, "utf-8");
        const data = IssueSchema.parse(content);

        if (!lastIssue || data.no > lastIssue.no) {
          lastIssue = data;
        }
      } catch (err) {
        console.warn(
          `Skipping invalid JSON in file ${file}: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      }
    }

    return lastIssue;
  } catch (err) {
    console.warn(
      `Failed to read issues directory: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
    return null;
  }
}
