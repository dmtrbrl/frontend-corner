import { Issue } from "crawler/types";
import { readdir, readFile } from "fs/promises";
import path from "path";

export async function getLastPublishedIssue(
  issuesDir: string
): Promise<Issue | null> {
  try {
    const files = await readdir(issuesDir);
    const jsonFiles = files.filter(
      (file) => file.endsWith(".json") && !file.endsWith(".preview.json")
    );

    let lastIssue: Issue | null = null;

    for (const file of jsonFiles) {
      try {
        const filePath = path.join(issuesDir, file);
        const content = await readFile(filePath, "utf-8");
        const data = JSON.parse(content);

        if (typeof data.no === "number") {
          if (!lastIssue || data.no > lastIssue.no) {
            lastIssue = data;
          }
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
