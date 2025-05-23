import { OpenAI } from "openai";
import { prettify } from "../prettify";

type ExtrasOutput = {
  issueDescription: string;
  joke: string;
  challenge: string;
};

export async function generateExtras(
  summaries: string[],
  model = "gpt-4o"
): Promise<ExtrasOutput> {
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
      issueDescription: prettify(description ?? ""),
      joke: prettify(joke ?? ""),
      challenge: prettify(challenge ?? ""),
    };
  } catch (e) {
    throw new Error(
      `Failed to parse OpenAI extras output: ${e}\n\nRaw content:\n${content}`
    );
  }
}

function buildExtrasPrompt(summaries: string[]): string {
  return `You're helping create a weekly frontend developer digest.

    Based on the article summaries below, return a JSON array with exactly 3 items:

    1. A short issue description (under 100 words) summarizing the week's themes or highlights.
      ✳️ Do NOT start with phrases like "This week", "This issue", "In this issue", "In this edition" etc.
      ✳️ Make the description feel timeless and self-contained — suitable for an archive of weekly summaries.

    2. A frontend-related joke of the week. It should be short, fun, and understandable by developers who work with HTML, CSS, JS, Node.js, frontend frameforks, A11I, UI/UX.
      ✳️ It should be smart, NOT stupid (please keep dad jokes to yourself =))
      ✳️ It should be gender neutral

    3. A frontend challenge of the week — a fun and creative task that can be completed in 1–5 hours using HTML, CSS, and JS.
      ✳️ The challenge must not be specific to any framework (like React or Vue), but developers may optionally use one if they prefer.
      ✳️ It can be a recreation from scratch of some concept used in modern frameforks
      ✳️ It can be related to WebGL or Canvas
      ✳️ It can involve usage of native APIs (video, audio etc.)
      ✳️ It SHOULD NOT be boring

    Only return a valid JSON array: [description, joke, challenge]

    Article summaries:
    ${summaries.map((s, i) => `${i + 1}. ${s}`).join("\n")}`;
}
