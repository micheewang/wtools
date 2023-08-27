export default function replaceArrayItem<T>(
  array: T[],
  replacedItem: T,
  newItem: T,
): T[] {
  return array.map((item) => (item === replacedItem ? newItem : item));
}
