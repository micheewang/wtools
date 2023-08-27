import { describe, expect, test } from "@jest/globals";
import { replaceArrayItem } from "../src";

describe("replace array item", () => {
  const array = [{}, {}, {}];
  const replaceIndex = 1;
  const newItem = {};

  test("basic function", () => {
    const newArray = replaceArrayItem(array, array[replaceIndex], newItem);
    expect(newArray).not.toBe(array);
    for (const key of array.keys()) {
      if (key === replaceIndex) {
        expect(newArray[key]).not.toBe(array[key]);
        expect(newArray[key]).toBe(newItem);
      } else {
        expect(newArray[key]).toBe(array[key]);
      }
    }
  });
});
