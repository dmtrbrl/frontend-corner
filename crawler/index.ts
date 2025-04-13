import { getSources } from "@shared/services";

const run = async () => {
  const sources = await getSources();

  console.log(sources);
};

run();
