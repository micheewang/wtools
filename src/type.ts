function type(value: any) {
  if (value === null) {
    return "null";
  }

  return typeof value;
}

type.isArray = function isArray(value: any): value is any[] {
  return Array.isArray(value);
};

type.isNull = function isNull(value: any): value is null {
  return type(value) === "null";
};

type.isUndefined = function isNull(value: any): value is undefined {
  return type(value) === "undefined";
};

type.isNil = function isNil(value: any): value is null | undefined {
  return type.isNull(value) || type.isUndefined(value);
};

type.isString = function isString(value: any): value is string {
  return type(value) === "string";
};

type.isNumber = function isNumber(value: any): value is number {
  return type(value) === "number";
};

type.isFunction = function isFunction(
  value: any,
): value is (...args: any[]) => any {
  return type(value) === "function";
};

type.isSymbol = function isSymbol(value: any): value is symbol {
  return type(value) === "symbol";
};

type.isBigint = function isBigint(value: any): value is bigint {
  return type(value) === "bigint";
};

type.isObject = function isObject(value: any): value is object {
  return type(value) === "object";
};

type.isBoolean = function isObject(value: any): value is boolean {
  return type(value) === "boolean";
};

export default type;
