export function getWeekRange(weeksAgo = 0) {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

  // End = this Sunday 23:59:59
  const end = new Date(now);
  const daysToAdd = (7 - day) % 7; // how many days to add to get to Sunday
  end.setDate(end.getDate() + daysToAdd - 7 * weeksAgo);
  end.setHours(23, 59, 59, 999);

  // Start = Monday of that same week
  const start = new Date(end);
  start.setDate(end.getDate() - 6);
  start.setHours(0, 0, 0, 0);

  return { start, end };
}
