import path from "path";
import { writeFile } from "fs/promises";
import { Issue } from "crawler/types";
import { ensureDir } from "./ensureDir";

export const writeIssue = async (issue: Issue, isPreview: boolean) => {
  const date = new Date(issue.pubDate);
  const yyyymmdd = date.toISOString().split("T")[0].replace(/-/g, "");
  const filename = `${yyyymmdd}${isPreview ? ".preview" : ""}.json`;

  const outputDir = "data/issues";
  await ensureDir(outputDir);

  const filePath = path.join(outputDir, filename);
  await writeFile(filePath, JSON.stringify(issue, null, 2), "utf-8");

  console.log(`✅ Issue saved to ${filePath}`);
};
