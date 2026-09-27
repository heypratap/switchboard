import {
  listFilesTool,
  readFileTool,
  searchFilesTool,
} from "./index.js";

export const toolRegistry = {
  list_files: listFilesTool,
  read_file: readFileTool,
  search_files: searchFilesTool,
};