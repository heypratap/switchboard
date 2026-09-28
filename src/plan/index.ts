
import { text } from "@clack/prompts";

import { runPlan } from "../ai/plan.js";

export async function startPlan() {
  while (true) {
    const prompt = await text({
      message: "What would you like me to plan?",
      placeholder: "Describe the feature you want to build...",
    });

    if (typeof prompt !== "string" || prompt.trim() === "") {
      continue;
    }

    if (prompt.toLowerCase() === "exit") {
      break;
    }

    try {
      const response = await runPlan(prompt);

      console.log("\nSwitchboard — Plan:\n");
      console.log(response);
      console.log();
    } catch (error) {
  console.log("\nSwitchboard:\n");
  console.log("Plan generation failed.");

  if (error instanceof Error) {
    if (
      error.message.includes("high demand") ||
      error.message.includes("503")
    ) {
      console.log(
        "The Gemini model is temporarily experiencing high demand. Please try again later."
      );
    } else if (
      error.message.includes("quota") ||
      error.message.includes("429")
    ) {
      console.log(
        "Gemini free-tier quota has been reached. Please try again later."
      );
    } else {
      console.log("Something went wrong while contacting the AI model.");
    }
  }

  console.log();
}

      
  }
}