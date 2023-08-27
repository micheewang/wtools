/**
 * replace array item
 */
export default function replaceArrayItem<T>(
  array: T[],
  replaced: T,
  newItem: T,
): T[] {
  return array.map((item) => (item === replaced ? newItem : item));
}
