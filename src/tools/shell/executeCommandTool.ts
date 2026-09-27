import { tool } from "ai";
import { z } from "zod";

import { confirm } from "@clack/prompts";
import { exec } from "node:child_process";
import { promisify } from "node:util";

import { getProjectRoot } from "../../core/project/context.js";

const execAsync = promisify(exec);

export const executeCommandTool = tool({
  description:
    "Run a shell command inside the current project. Always ask the user for approval before executing.",

  inputSchema: z.object({
    command: z
      .string()
      .describe("The shell command to execute."),
  }),

  execute: async ({ command }) => {
    const approved = await confirm({
      message: `Run command: ${command}?`,
    });

    if (approved !== true) {
      return {
        success: false,
        rejected: true,
        message: "Command rejected by user.",
      };
    }

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: getProjectRoot(),
      });

      return {
        success: true,
        stdout,
        stderr,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: false,
        error: "Command execution failed.",
      };
    }
  },
});