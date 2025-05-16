import { readdir, readFile } from "fs/promises";
import path from "path";

export async function getNextIssueNo(issuesDir: string): Promise<number> {
  try {
    const files = await readdir(issuesDir);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    let maxNo = 0;

    for (const file of jsonFiles) {
      try {
        const filePath = path.join(issuesDir, file);
        const content = await readFile(filePath, "utf-8");
        const data = JSON.parse(content);

        if (typeof data.no === "number") {
          maxNo = Math.max(maxNo, data.no);
        }
      } catch (err) {
        console.warn(
          `Skipping invalid JSON in file ${file}: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      }
    }

    // If no valid "no" values found, fallback to 1
    return maxNo > 0 ? maxNo + 1 : 1;
  } catch (err) {
    console.error(
      `Failed to read issues directory: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
    // If directory doesn't exist or unreadable, start from 1
    return 1;
  }
}
