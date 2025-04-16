export default (author: string): string | undefined => {
  if (!author) return undefined;

  // Remove email addresses
  author = author.replace(/\S+@\S+\.\S+/, "").trim();

  // Extract name from parentheses if available
  const match = author.match(/\(([^)]+)\)/);
  if (match) return match[1].trim();

  // Fallback: return whatever remains after stripping
  return author.replace(/[()]/g, "").trim();
};
