"use strict";
// function delayedCall(fn:()=>void){
//     setTimeout(fn,4000)
// }
function greet(user) {
    return (`Hello ${user.name} your mobile number is ${user.mobileNumber} and marks is ${user.marks} and the address is ${user.address}`);
}
// let user: {
//     firstName: string
//     lastName: string,
//     mobileNo:string
// } = {
//     firstName: "adity",
//     lastName: "Yadav",
//     mobileNo: "9153649577"
// }
let greeting = greet({ name: "Aditya", mobileNumber: 917234657, marks: 90, address: "Bangalore" });
console.log(greeting);
