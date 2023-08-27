/**
 * array to map by key
 */
export default function toMap<T extends {}>(array: T[], key: keyof T) {
  return array.reduce((previousValue, currentValue) => {
    previousValue.set(currentValue[key], currentValue);
    return previousValue;
  }, new Map<T[keyof T], T>());
}
