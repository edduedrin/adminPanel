"use strict";
function add(num1, num2) {
    return num1 + num2;
}
console.log(add(2, 3));
const sub = (num1, num2) => num2 - num1;
console.log(sub(3, 2));
const mult = function (num1, num2) {
    return num2 * num1;
};
console.log(mult(10, 5));
//required parameter
function addition(num1, num2, num3 = 10) {
    return num1 + num2 + num3;
}
console.log(addition(1, 1));
//optional parameter
function additions(num1, num2, num3) {
    return num3 ? num1 + num2 + num3 : num1 + num2;
}
console.log(additions(2, 3));
// rest parameter
function add2(num1, num2, ...num3) {
    return num1 + num2 + num3.reduce((a, b) => a + b, 0);
}
let numbers = [1, 2, 3, 4, 5];
console.log(add2(3, 2, 3, 4, 5, 6));
//generic function
function getItems(items) {
    return new Array().concat(items);
}
let concatResults = getItems([1, 2, 3, 4, 5]);
let concatString = getItems(["a", "b", "c", "d", "e", "f"]);
