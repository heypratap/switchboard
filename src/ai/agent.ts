import { generateText } from "ai";
import { model } from "./model.js";
import { getAgentContext } from "./context.js";

import { listFilesTool } from "../tools/filesystem/listFilesTool.js";
import { readFileTool } from "../tools/filesystem/readFileTool.js";
import { searchFilesTool } from "../tools/filesystem/searchFilesTool.js";

export async function runAgent(prompt: string) {
  const result = await generateText({
    model,

    system: getAgentContext(),

    prompt,

    tools: {
      list_files: listFilesTool,
      read_file: readFileTool,
      search_files: searchFilesTool,
    },

    stopWhen: ({ steps }) => steps.length >= 3,

    maxOutputTokens: 1000,
  });

  return result.text;
}