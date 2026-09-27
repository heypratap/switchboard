import { tool } from "ai";
import { z } from "zod";
import { readFile } from "../../filesystem/readFile.js";

export const readFileTool = tool({
  description: "Read the contents of a file.",

  inputSchema: z.object({
    filePath: z
      .string()
      .describe("The absolute path of the file to read."),
  }),

  execute: async ({ filePath }) => {
    return await readFile(filePath);
  },
});