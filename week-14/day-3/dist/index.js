"use strict";
function sumOfAge(age1, age2) {
    return age1.age + age2.age;
}
const users = sumOfAge({ name: "Aditya", age: 20 }, { name: "Hemant", age: 40 });
console.log(users);
// To make all the properties readable only
const user = {
    name: "Aditya",
    email: "adityaguptapro@gmail.com",
    age: 19,
    password: "Ak1840319@"
};
const StudentUsers = {
    id: "adity4321",
    name: "Aditya",
};
const parentsUsers = {
    name: 2,
    id: 4334
};
const adminUsers = {
    aditya: {
        name: "Aditya",
        email: "adityagupta@gmail.com",
        address: "Knowledge Park III"
    }
};
// Map API => 
let newUser = new Map();
newUser.set("adityaguptareal", { age: 20, mobile: 1234567890, name: "Aditya" }); // set the value of the key
console.log(newUser.get("adityaguptareal")); // get the value of the key
// This is a another way to define the type of the value of the map 
let newUser1 = new Map();
newUser1.set("adityaguptareal", { age: 20, mobile: 1234567890, name: "Aditya" }); // set the value of the key
console.log(newUser1.get("adityaguptareal")); // get the value of the key
const handlingEvents = (event) => {
    console.log("excludedEvent is", event);
};
handlingEvents("Wedding");
