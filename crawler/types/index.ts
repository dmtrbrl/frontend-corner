import { z } from "zod";
import {
  ArticleSchema,
  IssueSchema,
  SourceSchema,
  SourcesSchema,
} from "@shared/schemas";

export type Source = z.infer<typeof SourceSchema>;
export type Sources = z.infer<typeof SourcesSchema>;
export type Article = z.infer<typeof ArticleSchema>;
export type Issue = z.infer<typeof IssueSchema>;
