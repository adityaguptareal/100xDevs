function delayedCall(fn:()=>void){
    setTimeout(fn,4000)
}

function add(a:number,b:number) {
    console.log(a+b, "is the answer")
}

add(5,10)



function greet(user: {
    name: string,
    age: number,
    mobile: number,
    email: string,
    address: string
}) {
    console.log(`Hello ${user.name}, you are ${user.age}.`)
}

greet({ name: "Aditya", age: 21, mobile: 917234567, email: "<EMAIL>", address: "Bangalore" })


interface userType{
    name:string,
    mobileNumber:number,
    marks:number,
    address:string

}



let user: {
    firstName: string
    lastName: string,
    mobileNo:number
} = {
    firstName: "adity",
    lastName: "Yadav",
    mobileNo: 9153649577
}


interface todoType{
    todo:{
        taskName:string,
        status:boolean,
        date:string,
        count:number
    }
}
function toDoList(todo:todoType) {
    return ("THis is your Todo Data")
}


interface Manager{
    name:string,
    age:number
}

interface Employee{
    name:string,
    departement:string
}

type TeamLead=Manager & Employee





