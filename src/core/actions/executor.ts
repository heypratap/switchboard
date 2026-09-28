import { writeFile } from "node:fs/promises";

import type { FileWriteAction } from "./types.js";

export async function executeAction(action: FileWriteAction) {
  try {
    switch (action.type) {
      case "write_file":
        await writeFile(
          action.filePath,
          action.content,
          "utf-8",
        );

        return {
          success: true,
          filePath: action.filePath,
        };
    }
  } catch (error) {
    return {
      success: false,
      filePath: action.filePath,
      error:
        error instanceof Error
          ? error.message
          : "Failed to execute file action.",
    };
  }
}