export function prettify(text: string) {
  return text
    .replace("&#8211;", "–")
    .replace("&#8212;", "—")
    .replace(/(?<=\S)—(?=\S)/g, " – ")
    .trim();
}
