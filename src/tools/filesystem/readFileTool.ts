import { tool } from "ai";
import { z } from "zod";
import { resolveProjectPath } from "../../core/security/path.js";
import { readFile } from "../../filesystem/readFile.js";

export const readFileTool = tool({
  description: "Read the contents of a file.",

  inputSchema: z.object({
    filePath: z
      .string()
      .describe("The absolute path of the file to read."),
  }),

  execute: async ({ filePath }) => {
  const safePath = resolveProjectPath(filePath);

  return await readFile(safePath);
},
});