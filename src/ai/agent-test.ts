import "dotenv/config";

import { runAgent } from "./agent.js";

async function main() {
  const response = await runAgent(
    "Find where startAgent is defined in this project and tell me which file contains it."
  );

  console.log("\nSwitchboard:\n");
  console.log(response);
}

main();