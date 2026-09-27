import { tool } from "ai";
import { z } from "zod";
import { resolveProjectPath } from "../../core/security/path.js";
import { ActionTracker } from "../../core/actions/tracker.js";

export const actionTracker = new ActionTracker();

export const writeFileTool = tool({
  description:
    "Stage a file write operation. The file will not be changed until the user approves the action.",

  inputSchema: z.object({
    filePath: z
      .string()
      .describe("The absolute path of the file to write."),

    content: z
      .string()
      .describe("The complete content that should be written to the file."),
  }),

 execute: async ({ filePath, content }) => {
  const safePath = resolveProjectPath(filePath);

  actionTracker.add({
    type: "write_file",
    filePath: safePath,
    content,
  });

  return {
    success: true,
    staged: true,
    filePath: safePath,
  };
},
});