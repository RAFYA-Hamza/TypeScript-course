"use strict";
// Arrays
let stringArr = ["one", "hey", "two"];
let guittars = ["Strat", "Les Paul", 5150];
let mixedData = ["EVH", 1984, true];
stringArr[0] = "Hamza";
stringArr.push("hey");
guittars[0] = 1984;
guittars.unshift("Jim");
let test = [];
let bands = [];
bands.push("hello world!");
//==> Tuple
let myTuple = ["Hamza", 1999, true];
let mixed = ["John", 42, false];
myTuple = mixed;
mixed = myTuple;
// Objects
let myObj;
myObj = [];
console.log(typeof myObj);
myObj = bands;
myObj = {};
const exampleObj = {
    props1: "Hamza",
    props2: false,
};
exampleObj.props1 = 23;
exampleObj.props1 = "Rafya";
let evh = {
    name: "Eddie",
    active: true,
    albums: ["Dv", 42, 1999],
};
let JP = {
    name: "Jimmy",
    active: true,
    albums: ["I", "II", "IV"],
};
const greetGuitarist = (guitarist) => {
    if (guitarist.name) {
        return `Hello ${guitarist.name.toUpperCase()}!`;
    }
    return "Hello!";
};
console.log(greetGuitarist(JP));
