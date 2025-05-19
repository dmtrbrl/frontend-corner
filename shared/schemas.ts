import { z } from "zod";

export const SourceSchema = z.object({
  title: z.string(),
  feedUrl: z.string().url(),
});

export const SourcesSchema = z.array(SourceSchema);

export const ArticleSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  author: z.string(),
  pubDate: z.string().datetime(),
  description: z.string(),
  categories: z.array(z.string()).optional(),
  img: z.string().url().optional(),
});

export const IssueSchema = z.object({
  no: z.number(),
  pubDate: z.string().datetime(),
  articles: z.array(ArticleSchema),
  description: z.string().optional(),
  joke: z.string().optional(),
  challenge: z.string().optional(),
});
