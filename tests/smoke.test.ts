import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("test infrastructure", () => {
  it("resolves @/ path alias", () => {
    expect(cn("a", "b")).toBe("a b");
  });
});
