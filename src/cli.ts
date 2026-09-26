import { intro, outro, select } from "@clack/prompts";
import { startAgent } from "./agent/index.js";
import { startPlan } from "./plan/index.js";
import { startAsk } from "./ask/index.js";

type Mode = "agent" | "plan" | "ask" | "exit";

async function showMainMenu(): Promise<Mode> {
  const mode = await select({
    message: "What do you want to do?",
    options: [
      {
        value: "agent",
        label: "Agent",
        hint: "Build and modify your project",
      },
      {
        value: "plan",
        label: "Plan",
        hint: "Create an implementation plan",
      },
      {
        value: "ask",
        label: "Ask",
        hint: "Understand your code",
      },
      {
        value: "exit",
        label: "Exit",
      },
    ],
  });

  return mode as Mode;
}

export async function startCLI() {
  intro("SWITCHBOARD");

  while (true) {
    const mode = await showMainMenu();

    switch (mode) {
      case "agent":
        await startAgent();
        break;

      case "plan":
        await startPlan();
        break;

      case "ask":
        await startAsk();
        break;

      case "exit":
        outro("Goodbye!");
        return;
    }
  }
}