import { generateText } from "ai";

import { model } from "./model.js";
import { getAgentContext } from "./context.js";

import { listFilesTool } from "../tools/filesystem/listFilesTool.js";
import { readFileTool } from "../tools/filesystem/readFileTool.js";
import { searchFilesTool } from "../tools/filesystem/searchFilesTool.js";
import { writeFileTool } from "../tools/filesystem/writeFileTool.js";
import { editFileTool } from "../tools/filesystem/editFileTool.js";
import { executeCommandTool } from "../tools/shell/executeCommandTool.js";

let conversation: Array<{
  role: "user" | "assistant";
  content: string;
}> = [];

export async function runAgent(prompt: string) {
  conversation.push({
    role: "user",
    content: prompt,
  });

  const result = await generateText({
    model,
    system: getAgentContext(),
    messages: conversation,

    tools: {
      list_files: listFilesTool,
      read_file: readFileTool,
      search_files: searchFilesTool,
      write_file: writeFileTool,
      edit_file: editFileTool,
      execute_command: executeCommandTool,
    },

    stopWhen: ({ steps }) => steps.length >= 5,
    maxOutputTokens: 1000,
  });

  conversation.push({
    role: "assistant",
    content: result.text,
  });

  return result.text;
}