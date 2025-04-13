import fs from "fs";
import path from "path";
import { SourcesSchema } from "@shared/schemas";

const sourcesPath = path.resolve("data/sources.json");
const raw = fs.readFileSync(sourcesPath, "utf-8");
const json = JSON.parse(raw);
const sources = SourcesSchema.parse(json);

const parsedSources = SourcesSchema.parse(sources);

console.log(parsedSources);
