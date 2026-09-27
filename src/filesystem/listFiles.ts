import { readdir } from "node:fs/promises";
import path from "node:path";

const IGNORED_DIRECTORIES = new Set([
  "node_modules",
  ".git",
  "dist",
]);

export async function listFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });

  const files: string[] = [];

  for (const entry of entries) {
    if (
      entry.isDirectory() &&
      IGNORED_DIRECTORIES.has(entry.name)
    ) {
      continue;
    }

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      const nestedFiles = await listFiles(fullPath);
      files.push(...nestedFiles);
    } else {
      files.push(fullPath);
    }
  }

  return files;
}