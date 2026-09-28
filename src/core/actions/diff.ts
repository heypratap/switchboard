import { readFile } from "node:fs/promises";
import { createTwoFilesPatch } from "diff";

import type { FileWriteAction } from "./types.js";

export async function createDiff(action: FileWriteAction) {
  let existingContent = "";

  try {
    existingContent = await readFile(action.filePath, "utf-8");
  } catch {}

  if (existingContent === action.content) {
    return "No changes.";
  }

  return createTwoFilesPatch(
    action.filePath,
    action.filePath,
    existingContent,
    action.content,
    "Current",
    "Proposed",
  );
}
