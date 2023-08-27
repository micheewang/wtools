import type from "./type";

/**
 * deepClone object
 */
export default function deepClone<T>(copyed: T): T {
  if (type(copyed) === "object") {
    const newItem: T = (type.isArray(copyed) ? [] : {}) as T;
    const keys = Object.keys(copyed as any) as (keyof T)[];
    for (const key of keys) {
      newItem[key] = type.isObject(copyed[key])
        ? deepClone(copyed[key])
        : copyed[key];
    }
    return newItem;
  }
  return copyed;
}
