import { readFile } from "node:fs/promises";

import type { FileWriteAction } from "./types.js";

export async function createDiff(action: FileWriteAction) {
  let existingContent = "";

  try {
    existingContent = await readFile(action.filePath, "utf-8");
  } catch {
    // File does not exist yet.
  }

  if (existingContent === action.content) {
    return "No changes.";
  }

  return [
    `--- ${action.filePath}`,
    "+++ proposed",
    "",
    "Current:",
    existingContent || "(file does not exist)",
    "",
    "Proposed:",
    action.content,
  ].join("\n");
}