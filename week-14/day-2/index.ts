// function greet(name:string):string{
//     return "Hello"+name
// }

// let result =greet("CodeA")
// console.log(result)



// Interfaces used To Define data type of an object iin typescript

interface user{
    name:string,
    age:number,
    address:{
        city:string,
        country:string
    }
}


let user:user ={
    name:"Aditya",
    age:21,
    address:{
        city:"Haryanya",
        country:"India"
    }
}

function isLegal(user:user):boolean{
    if(user.age>=18){
        return true
    }
    else{
        return false
    }
}
let answer=isLegal(user)
if(answer){
    console.log("User is Legal")
}
else{
    console.log("User is not Legal")
}