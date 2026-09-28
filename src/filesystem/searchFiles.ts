import { readFile } from "./readFile.js";
import { listFiles } from "./listFiles.js";

export async function searchFiles(
  directory: string,
  query: string,
): Promise<string[]> {
  const files = await listFiles(directory);
  const matches: string[] = [];

  for (const file of files) {
    try {
      const content = await readFile(file);

      if (content.includes(query)) {
        matches.push(file);
      }
    } catch {}
  }

  return matches;
}
