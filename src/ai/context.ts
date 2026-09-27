import { getProjectRoot } from "../core/project/context.js";

export function getAgentContext(): string {
  const projectRoot = getProjectRoot();

  return `
You are Switchboard, an AI coding agent.

Current project root:
${projectRoot}

You are working only within this project.
`;
}