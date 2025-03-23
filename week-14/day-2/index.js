"use strict";
// function greet(name:string):string{
//     return "Hello"+name
// }
let person = {
    name: "Aditya",
    age: 21,
    greet: () => {
        return "Hello" + person.name;
    },
};
let greeting = person.greet();
console.log(greeting);
