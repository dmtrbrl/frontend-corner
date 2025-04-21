import { readFile } from "fs/promises";
import path from "path";
import { SourcesSchema } from "@shared/schemas";

export const readSources = async () => {
  const sourcesPath = path.resolve("data/sources.json");
  const raw = await readFile(sourcesPath, "utf-8");
  const parsed = JSON.parse(raw);
  return SourcesSchema.parse(parsed);
};
