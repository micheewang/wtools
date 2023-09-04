import { jest, describe, expect, test } from "@jest/globals";
import { curry } from "../src";

describe("curry test", () => {
  test("basic function", () => {
    const fn = jest.fn();
    const f1 = curry(fn, 3)(1, 2);
    expect(fn).toBeCalledTimes(0);
    f1(3);
    expect(fn).toBeCalledWith(1, 2, 3);
  });

  test("curry with placeholder", () => {
    const fn = jest.fn();
    const f1 = curry(fn, 3)(curry._, 2);
    expect(fn).toBeCalledTimes(0);
    f1(3, 1);
    expect(fn).toBeCalledWith(3, 2, 1);
  });

  test("fixed arguments", () => {
    const fn = jest.fn();
    const f1 = curry(fn, 3)(1, 2);
    expect(fn).toBeCalledTimes(0);
    const f2 = f1.fixed();
    expect(fn).toBeCalledTimes(0);
    f2(3);
    expect(fn).toBeCalledWith(1, 2, 3);
    const f3 = curry(fn, 3)(curry._, 2);
    f3(1, 4);
    expect(fn).toBeCalledWith(1, 2, 4);
    const f4 = f3.fixed();
    f4(1, 0, 3);
    expect(fn).toBeCalledWith(1, 2, 0, 3);
  });

  test("overload arguments", () => {
    const fn = jest.fn();
    const f1 = curry(fn, 3)(1, 2);
    expect(fn).toBeCalledTimes(0);
    f1(3, 4);
    expect(fn).toBeCalledWith(1, 2, 3, 4);
  });

  test("function like", () => {
    const fn = jest.fn();
    const f1 = curry({ __length: 3, __args: [], __fn: fn })(1, 2);
    expect(fn).toBeCalledTimes(0);
    f1(3);
    expect(fn).toBeCalledWith(1, 2, 3);
  });
});
