export default function hasOwn(object: object, key: string) {
  return Object.prototype.hasOwnProperty.call(object, key);
}
