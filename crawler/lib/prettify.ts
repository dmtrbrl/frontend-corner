export function prettify(text: string) {
  return text
    .replace("&#8211;", "–")
    .replace("&#8212;", "—")
    .replace("&#8217;", "’")
    .replace("&ldquo;", "“")
    .replace("&rdquo;", "”")
    .replace(/(?<=\S)—(?=\S)/g, " – ")
    .trim();
}
