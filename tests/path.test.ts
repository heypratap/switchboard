import { describe, expect, it } from "vitest";

import { resolveProjectPath } from "../src/core/security/path.js";

describe("resolveProjectPath", () => {
  it("allows paths inside the project", () => {
    const result = resolveProjectPath("src/index.ts");

    expect(result).toContain("switchboard");
    expect(result).toContain("src");
  });

  it("rejects paths outside the project", () => {
    expect(() => {
      resolveProjectPath("../secret.txt");
    }).toThrow("Access denied");
  });
});