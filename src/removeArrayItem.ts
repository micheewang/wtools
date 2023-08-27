export default function removeArrayItem<T>(array: T[], removed: T) {
  return array.filter((item) => item !== removed);
}
