import { htmlToText } from "html-to-text";

function stripHtml(html: string): string {
  const rawText = htmlToText(html, {
    wordwrap: false,
    selectors: [
      {
        selector: "a",
        options: { ignoreHref: true, hideLinkHrefIfSameAsText: true },
      },
      { selector: "img", format: "skip" },
      { selector: "picture", format: "skip" },
      { selector: "script", format: "skip" },
      { selector: "style", format: "skip" },
      { selector: "iframe", format: "skip" },
    ],
  });

  const cleanText = rawText.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();

  return cleanText;
}

function limitWords(text: string, maxWords: number) {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();

  const limitedWords = words.slice(0, maxWords);
  return limitedWords.join(" ") + "...";
}

export function cleanAndLimit(text: string, maxWords = 150) {
  if (!text) return "";
  return limitWords(stripHtml(text), maxWords);
}
