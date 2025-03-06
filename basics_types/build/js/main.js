"use strict";
let myName = "Hamza";
let meaningOfLife;
let isLoading;
let album;
let re = /\w+/g;
let postId; // Union types: when we need to declare a var with different types
let isActive; // Union types: when we need to declare a var with different types
myName = "Rafya";
meaningOfLife = 42;
isLoading = true;
album = true;
album = 42;
album = "Hello";
const sum = (a, b) => {
    return a + b;
};
console.log(sum(1, 2));
console.log(re);
