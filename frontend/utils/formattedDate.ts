export const formattedDate = (date: string) => {
  const rawDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(rawDate);

  return formattedDate;
};
