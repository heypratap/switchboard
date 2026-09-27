import { text } from "@clack/prompts";
import { runAgent } from "../ai/agent.js";
import { approveActions } from "../core/actions/approval.js";
import { actionTracker } from "../tools/filesystem/writeFileTool.js";

export async function startAgent() {
  while (true) {
    const prompt = await text({
      message: "What would you like me to do?",
      placeholder: "Ask Switchboard to work on your project...",
    });

    if (typeof prompt !== "string" || prompt.trim() === "") {
      continue;
    }

    if (prompt.toLowerCase() === "exit") {
      break;
    }

    try {
      const response = await runAgent(prompt);
      console.log("\nSwitchboard:\n");
console.log(response);

const actions = actionTracker.getActions();

await approveActions(actions);

actionTracker.clear();

console.log();
      console.log();
    } catch (error) {
      console.log("\nSwitchboard:\n");
      console.log("AI request failed.");

      if (
        error instanceof Error &&
        error.message.includes("quota")
      ) {
        console.log(
          "Gemini free-tier quota has been reached. Please try again later."
        );
      } else {
        console.log("Something went wrong while contacting the AI model.");
      }

      console.log();
    }
  }
}