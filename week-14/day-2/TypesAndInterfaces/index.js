// function greet(name: string): string {
//     return `Hello, ${name}!`;
function filterUser(user) {
    var filteredUser = [];
    for (var i = 0; i < user.length; i++) {
        if (user[i].age > 18) {
            filteredUser.push(user[i]);
        }
    }
    return filteredUser;
}
var userList = [
    { name: "Alice", age: 22, email: "alice@example.com" },
    { name: "Bob", age: 17, email: "bob@example.com" },
    { name: "Charlie", age: 19, email: "charlie@example.com" },
    { name: "Diana", age: 16, email: "diana@example.com" },
    { name: "Ethan", age: 25, email: "ethan@example.com" },
    { name: "Fiona", age: 18, email: "fiona@example.com" },
    { name: "George", age: 21, email: "george@example.com" },
    { name: "Hannah", age: 15, email: "hannah@example.com" },
];
console.log(filterUser(userList));
