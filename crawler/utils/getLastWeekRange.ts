export default () => {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

  // End = this Sunday 23:59:59
  const end = new Date(now);
  const daysToAdd = (7 - day) % 7; // how many days to add to get to Sunday
  end.setDate(end.getDate() + daysToAdd);
  end.setHours(23, 59, 59, 999);

  // Start = previous Monday 00:00:00
  const start = new Date(end);
  start.setDate(end.getDate() - 6); // Go back to Monday
  start.setHours(0, 0, 0, 0);

  return { start, end };
};
