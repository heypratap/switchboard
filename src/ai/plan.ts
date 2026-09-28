import { generateText } from "ai";

import { model } from "./model.js";
import { getAgentContext } from "./context.js";

import { listFilesTool } from "../tools/filesystem/listFilesTool.js";
import { readFileTool } from "../tools/filesystem/readFileTool.js";
import { searchFilesTool } from "../tools/filesystem/searchFilesTool.js";

export async function runPlan(prompt: string) {
  const result = await generateText({
    model,

    system: `
${getAgentContext()}

You are operating in PLAN mode.

Your job is to analyze the user's request and create a clear implementation plan.

Rules:
- Do NOT modify files.
- Do NOT execute shell commands.
- You may inspect project files using the available tools.
- Understand the existing project before creating the plan.
- After inspecting the project, you MUST provide a final written plan.
- Never finish with only a tool call.
- Clearly explain:
  1. What needs to be built
  2. Which files need to change
  3. What should be implemented in each file
  4. The order of implementation
  5. Important technical considerations
`,

    prompt,

    tools: {
      list_files: listFilesTool,
      read_file: readFileTool,
      search_files: searchFilesTool,
    },

    stopWhen: ({ steps }) => steps.length >= 10,

    maxOutputTokens: 2000,
  });

  console.log("DEBUG steps:", result.steps.length);
  console.log("DEBUG text:", JSON.stringify(result.text));

  return result.text;
}