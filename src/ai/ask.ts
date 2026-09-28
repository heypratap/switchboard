import { generateText } from "ai";

import { model } from "./model.js";
import { getAgentContext } from "./context.js";

import { listFilesTool } from "../tools/filesystem/listFilesTool.js";
import { readFileTool } from "../tools/filesystem/readFileTool.js";
import { searchFilesTool } from "../tools/filesystem/searchFilesTool.js";

export async function runAsk(prompt: string) {
  const result = await generateText({
    model,

    system: `
${getAgentContext()}

You are operating in ASK mode.

Your job is to answer questions about the current project.

Rules:
- This is a read-only mode.
- Do NOT modify files.
- Do NOT execute shell commands.
- Use the available tools to inspect the project when necessary.
- Base your answers on the actual project files.
- Explain your answer clearly and directly.
- If you cannot find enough information in the project, say so.
- Never invent project details.
`,

    prompt,

    tools: {
      list_files: listFilesTool,
      read_file: readFileTool,
      search_files: searchFilesTool,
    },

    stopWhen: ({ steps }) => steps.length >= 10,

    maxOutputTokens: 1500,
  });

  return result.text;
}