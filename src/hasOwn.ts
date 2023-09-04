export default function hasOwn(object: object, key: keyof any): boolean {
  return Object.prototype.hasOwnProperty.call(object, key);
}
