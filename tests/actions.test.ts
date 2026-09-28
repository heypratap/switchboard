import { describe, expect, it } from "vitest";
import { readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { applyActions } from "../src/core/actions/approval.js";

import { ActionTracker } from "../src/core/actions/tracker.js";
import { createDiff } from "../src/core/actions/diff.js";
import { executeAction } from "../src/core/actions/executor.js";

describe("Action pipeline", () => {
  it("tracks a file write action", () => {
    const tracker = new ActionTracker();

    tracker.add({
      type: "write_file",
      filePath: "src/test-action.txt",
      content: "Hello Switchboard!",
    });

    const actions = tracker.getActions();

    expect(actions).toHaveLength(1);
    expect(actions[0]?.content).toBe("Hello Switchboard!");
  });

  it("creates a diff for a new file", async () => {
    const filePath = path.resolve("src/test-diff.txt");

    const diff = await createDiff({
      type: "write_file",
      filePath,
      content: "Hello Switchboard!",
    });

    expect(diff).toContain("Hello Switchboard!");
    expect(diff).toContain("---");
    expect(diff).toContain("+++");
  });

  it("executes a file write action", async () => {
    const filePath = path.resolve("src/test-executor.txt");

    const result = await executeAction({
      type: "write_file",
      filePath,
      content: "Created by the executor.",
    });

    expect(result.success).toBe(true);

    const content = await readFile(filePath, "utf-8");

    expect(content).toBe("Created by the executor.");

    await unlink(filePath);
  });
});
it("applies approved actions", async () => {
  const filePath = path.resolve("src/test-approved-action.txt");

  await applyActions([
    {
      type: "write_file",
      filePath,
      content: "Approved by the user.",
    },
  ]);

  const content = await readFile(filePath, "utf-8");

  expect(content).toBe("Approved by the user.");

  await unlink(filePath);
});