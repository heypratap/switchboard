import path from "node:path";

export function getProjectRoot(): string {
  return process.cwd();
}

export function getProjectName(): string {
  return path.basename(getProjectRoot());
}