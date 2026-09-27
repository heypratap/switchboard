import { readFile as readFileFromDisk } from "node:fs/promises";

export async function readFile(filePath: string): Promise<string> {
  return await readFileFromDisk(filePath, "utf-8");
}