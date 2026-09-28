import chalk from "chalk";
import { confirm } from "@clack/prompts";

import type { FileWriteAction } from "./types.js";
import { executeAction } from "./executor.js";
import { createDiff } from "./diff.js";

function printDiff(diff: string) {
  for (const line of diff.split("\n")) {
    if (line.startsWith("+") && !line.startsWith("+++")) {
      console.log(chalk.green(line));
    } else if (line.startsWith("-") && !line.startsWith("---")) {
      console.log(chalk.red(line));
    } else if (line.startsWith("@@")) {
      console.log(chalk.cyan(line));
    } else {
      console.log(line);
    }
  }
}

export async function applyActions(
  actions: FileWriteAction[],
): Promise<void> {
  for (const action of actions) {
    const result = await executeAction(action);

    if (!result.success) {
      console.log(
        chalk.red(
          `Failed to update ${result.filePath}: ${result.error}`,
        ),
      );

      continue;
    }

    console.log(
      chalk.green(`Updated ${result.filePath}`),
    );
  }
}

export async function approveActions(
  actions: FileWriteAction[],
) {
  if (actions.length === 0) {
    return;
  }

  const uniquePaths = new Set(
    actions.map((action) => action.filePath),
  );

  if (uniquePaths.size !== actions.length) {
    throw new Error(
      "Multiple actions target the same file.",
    );
  }

  console.log(
    `\nSwitchboard wants to change ${actions.length} file(s):\n`,
  );

  for (const action of actions) {
    console.log(`File: ${action.filePath}`);

    const diff = await createDiff(action);

    printDiff(diff);

    console.log();
  }

  const approved = await confirm({
    message: "Apply all changes?",
  });

  if (approved !== true) {
    console.log("\nChanges discarded.\n");
    return;
  }

  await applyActions(actions);

  console.log("\nAll changes applied.\n");
}