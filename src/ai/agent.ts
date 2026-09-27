import { generateText } from "ai";
import { model } from "./model.js";
import { getAgentContext } from "./context.js";
import { writeFileTool } from "../tools/filesystem/writeFileTool.js";
import { listFilesTool } from "../tools/filesystem/listFilesTool.js";
import { readFileTool } from "../tools/filesystem/readFileTool.js";
import { searchFilesTool } from "../tools/filesystem/searchFilesTool.js";
import { editFileTool } from "../tools/filesystem/editFileTool.js";
import { executeCommandTool } from "../tools/shell/executeCommandTool.js";

export async function runAgent(prompt: string) {
  const result = await generateText({
    model,

    system: getAgentContext(),

    prompt,

   tools: {
  list_files: listFilesTool,
  read_file: readFileTool,
  search_files: searchFilesTool,
  write_file: writeFileTool,
  edit_file: editFileTool,
  execute_command: executeCommandTool,
},

    stopWhen: ({ steps }) => steps.length >= 3,

    maxOutputTokens: 1000,
  });

  return result.text;
}