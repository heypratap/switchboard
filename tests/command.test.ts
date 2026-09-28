import { describe, expect, it } from "vitest";

import { validateCommand } from "../src/core/security/command.js";

describe("validateCommand", () => {
  it("allows normal development commands", () => {
    expect(validateCommand("npm run typecheck").allowed).toBe(true);
    expect(validateCommand("git status").allowed).toBe(true);
  });

  it("blocks dangerous commands", () => {
    expect(validateCommand("shutdown /s").allowed).toBe(false);
    expect(validateCommand("format C:").allowed).toBe(false);
    expect(validateCommand("rmdir /s project").allowed).toBe(false);
  });
});
