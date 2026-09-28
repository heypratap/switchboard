
import { startAgent } from "./agent/index.js";
import { startPlan } from "./plan/index.js";
import { startAsk } from "./ask/index.js";
import { outro, select } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";
type Mode = "agent" | "plan" | "ask" | "exit";

function showBanner() {
  console.log(
    chalk.gray(
      figlet.textSync("SWITCHBOARD", {
        font: "ANSI Shadow",
        horizontalLayout: "default",
        verticalLayout: "default",
      }),
    ),
  );

  console.log(
    chalk.dim("AI Coding Agent CLI"),
  );

  console.log();
}

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
  showBanner();

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