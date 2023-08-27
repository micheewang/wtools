type Fixed = { fixed: (...args: any[]) => any };

type AnyFunction = ((...args: any[]) => any) & Fixed;

type FunctionLike = {
  __args?: any[];
  __fu?: AnyFunction;
  length: number;
};

const PLACE = Symbol("curry.place");

function parseArgs(args: any[], insert: any[], maxLength: number) {
  const copyedArgs = [];
  let insertIndex = 0;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === PLACE && insert.length > insertIndex) {
      copyedArgs[i] = insert[insertIndex++];
    } else {
      copyedArgs[i] = args[i];
    }
  }
  return copyedArgs.concat(insert.slice(insertIndex)).slice(0, maxLength);
}

const isArgsReady = (args: any[], length: number) =>
  !args.includes(PLACE) && args.length >= length;

/**
 * curry, but not support this
 * @example
 */
function curry(
  functionLike: FunctionLike | AnyFunction,
  length = functionLike.length,
): AnyFunction {
  const originFunction =
    (functionLike as FunctionLike).__fu ?? (functionLike as AnyFunction);
  const args = (functionLike as FunctionLike).__args ?? [];

  function curryFu(...fitArgs: any[]) {
    const newArgs = parseArgs(args, fitArgs, length);
    if (isArgsReady(newArgs, length)) {
      return originFunction(...newArgs);
    }
    return curry({ __args: newArgs, __fu: originFunction, length });
  }
  curryFu.__args = args;
  curryFu.__fu = originFunction;
  curryFu.fixed = () => originFunction.bind(null, ...args);
  return curryFu;
}

curry._ = PLACE;

export default curry;
