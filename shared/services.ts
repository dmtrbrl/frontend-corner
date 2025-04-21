import { readFile } from "fs/promises";
import path from "path";
import { SourcesSchema } from "./schemas";

export const getSources = async () => {
  const sourcesPath = path.resolve("data/sources.json");
  const raw = await readFile(sourcesPath, "utf-8");
  const json = JSON.parse(raw);
  const sources = SourcesSchema.parse(json);

  return sources;
};
