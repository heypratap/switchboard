import path from "node:path";

import { getProjectRoot } from "../project/context.js";

export function resolveProjectPath(filePath: string): string {
  const projectRoot = path.resolve(getProjectRoot());

  const resolvedPath = path.resolve(projectRoot, filePath);

  const relativePath = path.relative(
    projectRoot,
    resolvedPath
  );

  if (
    relativePath.startsWith("..") ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(
      "Access denied: path is outside the project."
    );
  }

  return resolvedPath;
}