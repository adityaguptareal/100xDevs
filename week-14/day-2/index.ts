// function greet(name:string):string{
//     return "Hello"+name
// }

// let result =greet("CodeA")
// console.log(result)



// Interfaces used To Define data type of an object iin typescript

// interface user{
//     name:string,
//     age:number,
//     address:{
//         city:string,
//         country:string
//     }
// }

// interface address{
//     city:string,
//     country:string
// }

// interface user{
//     name:string,
//     age:number,
//     address:address
// }

// interface office{
//     address:address
// }


// let user:user ={
//     name:"Aditya",
//     age:21,
//     address:{
//         city:"Haryanya",
//         country:"India"
//     }
// }

// function isLegal(user:user):boolean{
//     if(user.age>=18){
//         return true
//     }
//     else{
//         return false
//     }
// }
// let answer=isLegal(user)
// if(answer){
//     console.log("User is Legal")
// }
// else{
//     console.log("User is not Legal")
// }



interface Poeple {
    name: string,
    age: number,
    greet: () => string
}

let person:Poeple={
    name:"Aditya",
    age:21,
    greet:()=>{
        return "Hello"+person.name
    },
   
}
// let greeting=person.greet()
// console.log(greeting)


abstract class User {
    name:string
    constructor(name:string) {
        this.name=name;
    }
   abstract greet:()=>
}

class employee implements User{
    name: string;
    constructor(name:string){
        
    }
}