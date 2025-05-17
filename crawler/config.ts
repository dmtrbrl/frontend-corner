export const issuesOutputDir = "data/issues";
export const weeksAgo = Number(process.env.WEEKS_AGO) || 0;
export const isPreview = weeksAgo === 0;
