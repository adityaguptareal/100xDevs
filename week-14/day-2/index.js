"use strict";
// function greet(name:string):string{
//     return "Hello"+name
// }
let user = {
    name: "Aditya",
    age: 21,
    address: {
        city: "Haryanya",
        country: "India"
    }
};
function isLegal(user) {
    if (user.age >= 18) {
        return true;
    }
    else {
        return false;
    }
}
let answer = isLegal(user);
if (answer) {
    console.log("User is Legal");
}
else {
    console.log("User is not Legal");
}
