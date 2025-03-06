// Types aliases
type stringOrNumber = string | number;
type stringOrNumberArray = (string | number)[];

interface Guitarist {
  name?: string;
  active: boolean;
  albums: stringOrNumberArray;
}

type userId = stringOrNumber;

// Literal types
let myName: "Hamza";
myName = "Ha";

let userName: "Hamza" | "rafya" | "hrafya";
userName = "hrafya";

// Functions
const add = (a: number, b: number): number => {
  return a + b;
};

const logMsg = (message: any): void => {
  console.log(message);
};

console.log(logMsg("Hello world"));

let substruct = function (c: number, d: number): number {
  return c - d;
};

console.log(substruct(8, 3));

type mathFunction = (a: number, b: number) => number;
// interface mathFunction {
//   (a: number, b: number): number;
// }

let multiply: mathFunction = function (c, d) {
  return c * d;
};

logMsg(multiply(2, 2));

// optional parameters
const addAll = (a: number, b: number, c?: number): number => {
  if (typeof c !== "undefined") {
    return a + b + c;
  }

  return a + b;
};

// default param value
const sumAll = (a: number, b: number, c: number = 2): number => {
  return a + b + c;
};

console.log(addAll(2, 3, 2));
console.log(addAll(2, 3));
console.log(sumAll(2, 3));

// Rest parameters

const total = (a: number, ...nums: number[]): number => {
  return a + nums.reduce((prev, curr) => prev + curr);
};

logMsg(total(10, 2, 3));

const createError = (errMsg: string): never => {
  throw new Error(errMsg);
};

const infinite = () => {
  let i: number = 1;

  while (true) {
    i++;
    if (i > 100) break;
  }
};

// Custom type guard
const isNumber = (value: any): boolean => {
  return typeof value === "number" ? true : false;
};

// use of the never type
const numberOrString = (value: number | string): string => {
  if (typeof value === "string") return "string";
  if (isNumber(value)) return "number";

  return createError("This should never happen!");
};
