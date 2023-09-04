import { describe, expect, test } from "@jest/globals";
import { deepClone } from "../src";

describe("deep clone", () => {
  const object = {
    object: [
      { key: 1, value: "key1" },
      { key: 2, value: "key2" },
    ],
    string: "string",
    number: 1,
    symbol: Symbol(),
    function: () => null,
    bigint: 1n,
    undefined: undefined,
    null: null,
    boolean: true,
  };

  test("basic function", () => {
    const clone = deepClone(object);
    expect(clone).toEqual(object);
    expect(clone).not.toBe(object);
    expect(clone.object).not.toBe(object.object);
    expect(clone.symbol).toBe(object.symbol);
    expect(clone.function).toBe(object.function);
    expect(clone.function).toBe(object.function);
  });
});
