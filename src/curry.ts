type AnyFunction = (...args: any[]) => any;

type FunctionLike = {
  __args: any[];
  __fn: AnyFunction;
  // same as length, but has higher priority.
  __length?: number;
  length?: number;
};

type FunctionLikeExecutable = {
  (...args: any[]): any;
  __args: any[];
  __fn: AnyFunction;
  __length: number;
  fixed(): AnyFunction;
};

const _ = Symbol("curry.place");

function mixArgs(args: any[], fitArgs: any[]) {
  const newArgs = [];
  let insertIndex = 0;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === _ && fitArgs.length > insertIndex) {
      newArgs[i] = fitArgs[insertIndex++];
    } else {
      newArgs[i] = args[i];
    }
  }
  return newArgs.concat(fitArgs.slice(insertIndex));
}

const isArgsReady = (args: any[], length: number) =>
  !args.includes(_) && args.length >= length;

/**
 * curry, but not support this
 * @example
 */
function curry(
  anyFunction: FunctionLike | FunctionLikeExecutable | AnyFunction,
  argLength?: number,
): FunctionLikeExecutable {
  const fn = (anyFunction as FunctionLike).__fn ?? anyFunction;
  const args = (anyFunction as FunctionLike).__args ?? [];
  const length =
    argLength ??
    (anyFunction as FunctionLike).__length ??
    (anyFunction as AnyFunction).length;

  if (length === 0) {
    throw new Error(
      "The length of the parameter that needs to be curried is 0," +
        " please check whether the input function contains parameters," +
        " if it is Rest parameters, please use the second parameter.",
    );
  }

  const functionLikeExecutable: FunctionLikeExecutable = (
    ...fitArgs: any[]
  ) => {
    const newArgs = mixArgs(args, fitArgs);
    if (isArgsReady(newArgs, length)) {
      return fn(...newArgs);
    }
    return curry({ __args: newArgs, __fn: fn, __length: length });
  };
  functionLikeExecutable.__args = args;
  functionLikeExecutable.__fn = fn;
  functionLikeExecutable.__length = length;
  functionLikeExecutable.fixed = () => {
    if (args.includes(_)) {
      return (...fitArgs: any[]) => fn(...mixArgs(args, fitArgs));
    }
    return fn.bind(null, ...args);
  };
  return functionLikeExecutable;
}

curry._ = _;

export default curry;
