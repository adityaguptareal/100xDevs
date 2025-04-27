interface Users {
    name: string;
    age: number;
}

function sumOfAge(age1: Users, age2: Users) {
    return age1.age + age2.age
}

const users = sumOfAge({ name: "Aditya", age: 20 }, { name: "Hemant", age: 40 })
console.log(users)


//TypeScript API




// Pick API => Allow you to create a new type by selecting a set of properties from an existing type or interface, Imagine you have a User model with several properties, but for a user profile display, you only need a subset of these properties.


// interface User{
//     name:string;
//     email:string;
//     age:number;
//     password:string;
// }

// type updateUser= Pick<User, "name"|"email" | "password">


interface studentUser {
    name: string;
    age: number;
    mobile: number;
    email: string;
    admissionDate: string;

}

type updateUser = Pick<studentUser, "mobile" | "email">


//  Partial API => Used to make the all the properties of a type optional 
// type updateUserOptional=Partial<updateUser>




// readonly API => used when we don't want to alter the properties of object 
interface User {
    readonly name: string;
    readonly email: string;
    readonly age: number;
    readonly password: string;
}


// To make all the properties readable only
const user: Readonly<User> = {
    name: "Aditya",
    email: "adityaguptapro@gmail.com",
    age: 19,
    password: "Ak1840319@"
}


// used to define the type of an object with dynamic keys. 

type StudentUserType = {
    [key: string]: string
}


const StudentUsers: StudentUserType = {
    id: "adity4321",
    name: "Aditya",

}


//Records => used to create or define the type of an object in cleaner way

type parentUserType = Record<string, number>
const parentsUsers: parentUserType = {
    name: 2,
    id: 4334
}


type adminUserType=Record<string,{name:string,email:string,address:string}>

const adminUsers:adminUserType={
    aditya:{
        name:"Aditya",
        email:"adityagupta@gmail.com",
        address:"Knowledge Park III"
    }
}




// Map API => 

let newUser= new Map();
newUser.set("adityaguptareal",{age:20,mobile:1234567890,name:"Aditya"}) // set the value of the key
console.log(newUser.get("adityaguptareal")) // get the value of the key

type newUser1= {
    name:string;
    age:number;
    mobile:number;
}

// This is a another way to define the type of the value of the map 
let newUser1= new Map<string,newUser1>();
newUser1.set("adityaguptareal",{age:20,mobile:1234567890,name:"Aditya"}) // set the value of the key
console.log(newUser1.get("adityaguptareal")) // get the value of the key



//Exlcude API => used to exclude a set of properties from an existing type or interface. Imagine you have a User model with several properties, but for a specific operation, you want to exclude certain properties.

type allEvents= "Wedding" | "Birthday" | "Anniversary" | "Party" | "Festival" | "Other";
type exlcudedEvents= Exclude<allEvents,"Birthday">


const handlingEvents=(event:exlcudedEvents)=>{
    console.log("excludedEvent is", event)
}

handlingEvents("Wedding")