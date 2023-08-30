/**
 * array to map by key
 */
export default function toMap<T extends {}>(array: T[], key: keyof T) {
  const map = new Map<T[keyof T], T>();
  array.forEach((currentValue) => {
    map.set(currentValue[key], currentValue);
  });
  return map;
}
