// function greet(name: string): string {
//     return `Hello, ${name}!`;


// }

// function isEven(num:number): boolean {
//     if (num % 2 === 0) {
//         return true;
//     }
//     else{
//         return false;
//     }
// }

// const greeting = greet("Aditya");
// console.log(greeting)


// // userType

// interface User{
//     name:string;
//     age:number;
//     email:string;
//     isActive:boolean;
//     address?:{
//         street:string;
//         city:string;
//         state:string;
//         zip:number;
//     }
// }

// let user2:User={
//     name:"John Doe",
//     age:30,
//     email:"john@example.com",
//     isActive:true,
// }

// let user:User={
// name:"Aditya",
// age:22,
// email:"adityaguptapro@gmail.com",
// isActive:true,
// address:{
//     street:"123 Main St",
//     city:"New York",
//     state:"NY",
//     zip:10001
// }
// }

// function isLegal(user:User):boolean{
//     if(user.age>=18){
//         return true
//     }
//     else{
//         return false
//     }
// }

// console.log(isLegal(user))
// console.log(isLegal(user2))



// interface Poeple{
//     name:string;
//     age:number;
//     greet:()=>string;

// }

// let person:Poeple={
//     name:"Aditya",
//     age:22,
//     greet:()=>{
//         return `Hello, ${person.name}`
//     }
// }



// Types in TypeScript

// type StudentType={
//     user_student_id:number;
//     mobile_number:number;
//     email:string;
// }

// type Employee={
//     name:string;
//     start_date:Date;
// }

// type Manager={
//     name:string;
//     department:string;
// }

// type teamLead=Employee & Manager;

// let NewEmployee:Employee={
//     name:"Aditya",
//     start_date:new Date("2023-10-01"),
// }
// let new_Manager:Manager={
//     name:"Aditya",
//     department:"Sales"
// }


// Class Assignment

// type user={
//     name:string;
//     age:number;
// }
// type admin={
//     name:string;
//     permission:string;
// }

// function greet(name:user |admin):string {
//     return `Hello,${name.name}`;
// }











// Arrays in TypeScript


// Class Assignment => taking array as input and returning the sum of all elements in the array
// function getMax(numbers: number[]) {
//     let maxValue = 0
//     for (let i = 0; i < numbers.length; i++) {
//         if (numbers[i] > maxValue) {
//             maxValue = numbers[i]
//         }
//     }
//     return maxValue
// }


// console.log(getMax([5, 7, 9]))


// interface user{
//     name:string;
//     age:number;
//     email:string;
//     address:{
//         street:string;
//         city:string;
//         state:string;
//         zip:number;
//     }[]
//     // this can also be be used to store multiple addresses thorugh an array
// }





// This can also be used
// interface Address {
//     street: string;
//     city: string;
//     state: string;
//     zip: number;
// }
// interface User {
//     name: string;
//     age: number;
//     email: string;
//     address: Address[]
// }

interface user {
    name: string;
    age: number;
    email: string
}

function filterUser(user: user[]) {
    let filteredUser = []
    for (let i = 0; i < user.length; i++) {
        if (user[i].age > 18) {
            filteredUser.push(user[i])
        }
    }
    return filteredUser
}


const userList:user[]= [
    { name: "Alice", age: 22, email: "alice@example.com" },
    { name: "Bob", age: 17, email: "bob@example.com" },
    { name: "Charlie", age: 19, email: "charlie@example.com" },
    { name: "Diana", age: 16, email: "diana@example.com" },
    { name: "Ethan", age: 25, email: "ethan@example.com" },
    { name: "Fiona", age: 18, email: "fiona@example.com" },
    { name: "George", age: 21, email: "george@example.com" },
    { name: "Hannah", age: 15, email: "hannah@example.com" },
]

console.log(filterUser(userList))