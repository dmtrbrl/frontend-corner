import { OpenAI } from "openai";

type Options = {
  maxBatchSize?: number;
  model?: string;
};

const parseDescriptions = (
  responseText: string,
  expectedCount: number
): string[] => {
  const lines = responseText
    .split(/\n(?=\d+\.)/)
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);

  if (lines.length < expectedCount) {
    return responseText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .slice(0, expectedCount);
  }

  return lines.slice(0, expectedCount);
};

const buildReviewOrGeneratePrompt = (batch: string[]): string => {
  return (
    `
    Review or generate short descriptions for the following items.
    If the input is already a short, well-written article description, lightly refine it. If it's too long, generate a new one based on the key ideas.

    Guidelines:
    - Each description should be clear, editorial-style, and max 50 words.
    - Avoid personal phrasing like “I”, “we”, or “A developer shares…”
    - Use neutral or informative tones, but vary the structure. The line should not begin with “A…” or “An…” if possible.
    - Allow sentence fragments, questions, or verbs at the start for variety — e.g., “Exploring…”, “What happens when…”, “CSS tricks for…”
    - Avoid sounding robotic, dry, or overly formal
    - Aim for a friendly, readable tone for a modern web dev audience

    Here are the items:\n\n
    ` + batch.map((text, idx) => `${idx + 1}. ${text}`).join("\n\n")
  );
};

const generateBatchWithRetry = async (
  openai: OpenAI,
  batch: string[],
  model: string,
  attempt = 1
): Promise<string[]> => {
  const prompt = buildReviewOrGeneratePrompt(batch);

  const response = await openai.chat.completions.create({
    model,
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that reviews or generates article descriptions for a frontend development newsletter.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const text = response.choices[0].message.content ?? "";
  const parsed = parseDescriptions(text, batch.length);

  const hasEmpty = parsed.some((desc) => !desc.trim());

  if (hasEmpty && attempt < 3) {
    console.warn(
      `Retrying batch (attempt ${attempt + 1}) due to empty description.`
    );
    return generateBatchWithRetry(openai, batch, model, attempt + 1);
  }

  return parsed;
};

export const generateDescriptions = async (
  rawDescriptions: string[],
  options: Options = {}
): Promise<string[]> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { maxBatchSize = 10, model = "gpt-4.1-nano" } = options;
  const descriptions: string[] = [];

  for (let i = 0; i < rawDescriptions.length; i += maxBatchSize) {
    const batch = rawDescriptions.slice(i, i + maxBatchSize);
    const generated = await generateBatchWithRetry(openai, batch, model);
    descriptions.push(...generated);
  }

  return descriptions;
};
