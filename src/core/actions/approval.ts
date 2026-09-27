import { confirm } from "@clack/prompts";

import type { FileWriteAction } from "./types.js";
import { executeAction } from "./executor.js";
import { createDiff } from "./diff.js";

export async function approveActions(
  actions: FileWriteAction[]
) {
  if (actions.length === 0) {
    return;
  }

  const uniquePaths = new Set(
    actions.map((action) => action.filePath)
  );

  if (uniquePaths.size !== actions.length) {
    throw new Error(
      "Multiple actions target the same file."
    );
  }

  console.log(
    `\nSwitchboard wants to change ${actions.length} file(s):\n`
  );

  for (const action of actions) {
    console.log(`File: ${action.filePath}`);

    const diff = await createDiff(action);

    console.log(diff);
    console.log();
  }

  const approved = await confirm({
    message: "Apply all changes?",
  });

  if (approved !== true) {
    console.log("\nChanges discarded.\n");
    return;
  }

  for (const action of actions) {
    await executeAction(action);
  }

  console.log("\nAll changes applied.\n");
}