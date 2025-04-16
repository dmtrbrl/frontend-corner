import { z } from "zod";

export const SourcesSchema = z.array(z.string().url());

export const ArticleSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  date: z.string().date(),
  url: z.string().url(),
  tags: z.array(z.string()),
});

export const IssueSchema = z.object({
  title: z.string(),
  date: z.string(),
  articles: z.array(ArticleSchema),
});
