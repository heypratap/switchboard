import { tool } from "ai";
import { z } from "zod";

import { searchFiles } from "../../filesystem/searchFiles.js";
import { getProjectRoot } from "../../core/project/context.js";

export const searchFilesTool = tool({
  description: "Search project files for matching text.",

  inputSchema: z.object({
    query: z
      .string()
      .describe("The text to search for inside project files."),
  }),

  execute: async ({ query }) => {
    const projectRoot = getProjectRoot();

    return await searchFiles(projectRoot, query);
  },
});