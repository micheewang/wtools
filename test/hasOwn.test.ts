import { describe, test, expect } from "@jest/globals";
import { hasOwn } from "../src";

describe("type", () => {
  const object = {
    string: 1,
    1: 1,
    [Symbol.for("type")]: 1,
  };

  test("type of", () => {
    expect(hasOwn(object, "string")).toBe(true);
    expect(hasOwn(object, 1)).toBe(true);
    expect(hasOwn(object, Symbol.for("type"))).toBe(true);
    expect(hasOwn(object, "toString")).toBe(false);
  });
});
