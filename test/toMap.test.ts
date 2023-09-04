import { describe, expect, test } from "@jest/globals";
import { toMap } from "../src";

describe("to Map", () => {
  const array = [
    { key: 1, value: "key1" },
    { key: 2, value: "key2" },
  ];

  test("basic function", () => {
    expect(toMap(array, "key").get(2)?.value).toBe("key2");
  });

  test("don't copy object", () => {
    expect(toMap(array, "key").get(2)).toBe(array[1]);
  });
});
