import path from "path";
import { writeFile } from "fs/promises";
import { Issue } from "@shared/types";
import { ensureDir } from "./ensureDir";

export async function writeIssue(filename: string, issue: Issue) {
  const outputDir = "data/issues";
  await ensureDir(outputDir);

  const filePath = path.join(outputDir, filename);
  await writeFile(filePath, JSON.stringify(issue, null, 2), "utf-8");

  return filePath;
}
