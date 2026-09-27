import { tool } from "ai";
import { z } from "zod";

import { readFile } from "../../filesystem/readFile.js";
import { resolveProjectPath } from "../../core/security/path.js";
import { actionTracker } from "./writeFileTool.js";

export const editFileTool = tool({
  description:
    "Stage an edit to an existing file by replacing an exact piece of text.",

  inputSchema: z.object({
    filePath: z
      .string()
      .describe("The absolute path of the file to edit."),

    oldContent: z
      .string()
      .describe("The exact text that should be replaced."),

    newContent: z
      .string()
      .describe("The replacement text."),
  }),

  execute: async ({
    filePath,
    oldContent,
    newContent,
  }) => {
    const safePath = resolveProjectPath(filePath);

    const currentContent = await readFile(safePath);

    if (!currentContent.includes(oldContent)) {
      return {
        success: false,
        error: "The specified text was not found in the file.",
      };
    }

    const updatedContent = currentContent.replace(
      oldContent,
      newContent
    );

    actionTracker.add({
      type: "write_file",
      filePath: safePath,
      content: updatedContent,
    });

    return {
      success: true,
      staged: true,
      filePath: safePath,
    };
  },
});