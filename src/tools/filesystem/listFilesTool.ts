import { tool } from "ai";
import { z } from "zod";

import { listFiles } from "../../filesystem/listFiles.js";
import { getProjectRoot } from "../../core/project/context.js";

export const listFilesTool = tool({
  description: "List all files in the current project.",

  inputSchema: z.object({}),

  execute: async () => {
    const projectRoot = getProjectRoot();

    return await listFiles(projectRoot);
  },
});