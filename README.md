1️⃣ What is the difference between var, let, and const?

Ans: Var:

It is the old way of declaring variables.
It has function scope, not block scope.
It can be redeclared and updated.

Ex:
var x = 5; var x = 15; (allowed)

let:

Introduced in ES6.
It has block scope (works inside {}).
It cannot be redeclared, but it can be updated.

Ex:
let x = 5; x = 15; (allowed)

const:

Also introduced in ES6.
It has block scope.
It cannot be redeclared or updated.

Ex:
const x = 5; x = 15 (not allowed)
2️⃣ What is the spread operator (...)?

Ans:  The spread operator (...) is used to expand or copy elements of an array or object.

Ex:

const arr1 = [1,2,3]; const arr2 = [...arr1,4,5]; console.log(arr2);

output:[1,2,3,4,5]

3️⃣ What is the difference between map(), filter(), and forEach()?

Ans: map()
Creates a new array by transforming each element.

const number = [1,2,3]; const doubled = number.map(n => n * 2);

filter()
Creates a new array with elements that match a condition.

const number = [1,2,3,4]; const even = number.filter(n => n % 2 === 0);

forEach()
Just loops through the array but does not return a new array.

number.forEach(n => console.log(n));

4️⃣ What is an arrow function?

Ans: An arrow function is a shorter way to write a function introduced in ES6.
Ex: 
const add = (a,b) => a + b;

5️⃣ What are template literals?

Ans: Template literals are used to create strings with embedded variables using backticks ( ).

Ex:
const name = "Asia"; const age = 20;

console.log(My name is ${name} and I am ${age} years old.);

