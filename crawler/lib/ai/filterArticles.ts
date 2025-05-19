import { OpenAI } from "openai";

type ArticleInput = {
  title: string;
  description: string;
};

type Options = {
  maxBatchSize?: number;
  model?: string;
};

export async function filterArticles(
  articles: ArticleInput[],
  options: Options = {}
): Promise<boolean[]> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { maxBatchSize = 10, model = "gpt-4.1-nano" } = options;
  const results: boolean[] = [];

  for (let i = 0; i < articles.length; i += maxBatchSize) {
    const batch = articles.slice(i, i + maxBatchSize);
    const prompt = buildFilterPrompt(batch);

    const response = await openai.chat.completions.create({
      model,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `You are curating a weekly frontend development newsletter.

            Your task is to review each article and decide whether it should be included. Respond with ✅ Include or ❌ Exclude, and explain your reasoning briefly.

            You should INCLUDE:
            - Articles clearly related to frontend development (HTML, CSS, JS, animation, performance, browser APIs, frameworks)
            - Adjacent topics useful to frontend devs: WebGL, Three.js, UX/UI, design tokens, accessibility, developer workflows, developer experience, CSS color functions, PWAs, client-side auth flows, frontend testing, design systems, etc.
            - Project/collaboration tips for frontend teams
            - High-level frontend discussions, as long as they’re not vague fluff
            - JS concepts, SSR, CSR etc.

            You should EXCLUDE:
            - Pure backend/devops topics (e.g. Python, Go, server auth, infrastructure)
            - Articles with no connection to frontend work
            - Sales, promo, course launches, or generic startup news
            - Deep AI/ML content unless tied to frontend dev (e.g. AI for design systems)

            Use your judgment. It’s OK to include slightly tangential but interesting content if it’s likely relevant to frontend engineers.

            Respond like this:
            1. ✅ Include "article title" – because...
            2. ❌ Exclude "article title" – because...`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = response.choices[0].message.content ?? "";

    const batchResults = parseFilterResponse(text, batch.length);
    results.push(...batchResults);
  }

  return results;
}

function buildFilterPrompt(batch: ArticleInput[]): string {
  return (
    `Below is a list of articles with a title and description. For each, decide whether it should be included in a frontend development newsletter.\n\nRespond with ✅ Include or ❌ Exclude for each item.\n\n` +
    batch
      .map(
        (item, idx) =>
          `${
            idx + 1
          }.\nTitle: ${item.title.trim()}\nDescription: ${item.description?.trim()}`
      )
      .join("\n\n")
  );
}

function parseFilterResponse(
  responseText: string,
  expectedCount: number
): boolean[] {
  const lines = responseText
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, expectedCount);

  lines.forEach((l) => {
    console.log(l.replace(/^\d+\.\s*/, "").trim());
  });

  return lines.map((line) => line.includes("✅"));
}
