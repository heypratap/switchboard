import { writeFile } from "node:fs/promises";

import type { FileWriteAction } from "./types.js";

export async function executeAction(action: FileWriteAction) {
  switch (action.type) {
    case "write_file":
      await writeFile(
        action.filePath,
        action.content,
        "utf-8"
      );

      return {
        success: true,
        filePath: action.filePath,
      };
  }
}