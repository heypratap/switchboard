import { text } from "@clack/prompts";

import { runAsk } from "../ai/ask.js";

export async function startAsk() {
  while (true) {
    const prompt = await text({
      message: "What would you like to know?",
      placeholder: "Ask something about your project...",
    });

    if (typeof prompt !== "string" || prompt.trim() === "") {
      continue;
    }

    if (prompt.toLowerCase() === "exit") {
      break;
    }

    try {
      const response = await runAsk(prompt);

      console.log("\nSwitchboard — Ask:\n");
      console.log(response);
      console.log();
    } catch (error) {
      console.log("\nSwitchboard:\n");
      console.log("Question failed.");

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