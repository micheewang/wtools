import type from "./type";

/**
 * deepClone object
 */
export default function deepClone<T>(object: T): T {
  if (type(object) === "object") {
    const newItem: T = (type.isArray(object) ? [] : {}) as T;
    const keys = Object.keys(object as any) as (keyof T)[];
    for (const key of keys) {
      newItem[key] = type.isObject(object[key])
        ? deepClone(object[key])
        : object[key];
    }
    return newItem;
  }
  return object;
}
