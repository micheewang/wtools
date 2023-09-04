import { describe, expect, test } from "@jest/globals";
import { removeArrayItem } from "../src";

describe("remove array item", () => {
  const array = [{}, {}, {}];
  const replaceIndex = 1;

  test("remove array item", () => {
    const newArray = removeArrayItem(array, array[replaceIndex]);
    expect(newArray).not.toBe(array);
    expect(newArray.length).toBe(array.length - 1);
    expect(newArray[0]).toBe(array[0]);
    expect(newArray[1]).toBe(array[2]);
  });

  test("remove null item", () => {
    const newArray = removeArrayItem(array, {});
    expect(newArray).not.toBe(array);
    expect(newArray.length).toBe(array.length);
    newArray.forEach((item, i) => {
      expect(item).toBe(array[i]);
    });
  });
});
