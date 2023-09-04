import { describe, expect, test } from "@jest/globals";
import { type } from "../src";

describe("type", () => {
  test("basic function", () => {
    expect(type("string")).toBe("string");
    expect(type(1)).toBe("number");
    expect(type(NaN)).toBe("number");
    expect(type(1n)).toBe("bigint");
    expect(type(Symbol())).toBe("symbol");
    expect(type(true)).toBe("boolean");
    expect(type(undefined)).toBe("undefined");
    expect(type(null)).toBe("null");
    expect(type(NaN)).toBe("number");
    expect(type(() => {})).toBe("function");
    expect(type({})).toBe("object");
  });
});
