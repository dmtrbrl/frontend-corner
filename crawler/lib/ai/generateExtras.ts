import { OpenAI } from "openai";

type ExtrasOutput = {
  description: string;
  joke: string;
  challenge: string;
};

export const generateExtras = async (
  summaries: string[],
  model = "gpt-4o"
): Promise<ExtrasOutput> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = buildExtrasPrompt(summaries);

  const response = await openai.chat.completions.create({
    model,
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:
          "You are a friendly, frontend-savvy newsletter assistant. Output should be a valid JSON array: [description, joke, challenge].",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.choices[0].message.content ?? "";

  const jsonBlock = content.match(/```json\s*([\s\S]+?)\s*```/);
  try {
    const raw = jsonBlock?.[1] ?? content; // fallback to raw
    const [description, joke, challenge] = JSON.parse(raw);
    return {
      description: (description ?? "").trim(),
      joke: (joke ?? "").trim(),
      challenge: (challenge ?? "").trim(),
    };
  } catch (e) {
    throw new Error(
      `Failed to parse OpenAI extras output: ${e}\n\nRaw content:\n${content}`
    );
  }
};

const buildExtrasPrompt = (summaries: string[]): string => {
  return `You're helping create a weekly frontend developer digest.

    Based on the article summaries below, return a JSON array with exactly 3 items:

    1. A short issue description (under 100 words) summarizing the week's themes or highlights.
      ✳️ Do NOT start with phrases like "This week", "This issue", "In this issue", "In this edition" etc.
      ✳️ Make the description feel timeless and self-contained — suitable for an archive of weekly summaries.

    2. A frontend-related joke of the week. It should be short, fun, and understandable by developers who work with HTML, CSS, or JavaScript.
      ✳️ The joke should not be old and stupid

    3. A frontend challenge of the week — a fun and creative task that can be completed in 2–5 hours using HTML, CSS, and/or JavaScript.
      ✳️ The challenge must not be specific to any framework (like React or Vue), but developers may optionally use one if they prefer.

    Only return a valid JSON array: [description, joke, challenge]

    Article summaries:
    ${summaries.map((s, i) => `${i + 1}. ${s}`).join("\n")}`;
};
