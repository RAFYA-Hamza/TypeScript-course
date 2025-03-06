let myName: string = "Hamza";
let meaningOfLife: number;
let isLoading: boolean;
let album: any;

let re: RegExp = /\w+/g;

let postId: string | number; // Union types: when we need to declare a var with different types
let isActive: boolean | number; // Union types: when we need to declare a var with different types

myName = "Rafya";
meaningOfLife = 42;
isLoading = true;

album = true;
album = 42;
album = "Hello";

const sum = (a: number, b: number) => {
  return a + b;
};

console.log(sum(1, 2));
console.log(re);
