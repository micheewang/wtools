import { describe, expect, test, jest } from "@jest/globals";
import { EventEmitter } from "../src";

describe("EventEmitter", () => {
  const eventEmitter = new EventEmitter<{
    test(a: string, b: number): void;
  }>();

  test("on & off & emit", () => {
    const fn = jest.fn();
    const flag = eventEmitter.on("test", fn);
    expect(fn).toBeCalledTimes(0);
    eventEmitter.emit("test", "1", 1);
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith("1", 1);
    eventEmitter.off(flag);
    eventEmitter.emit("test", "1", 1);
    expect(fn).toBeCalledTimes(1);
  });
});
