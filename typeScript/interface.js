"use strict";
// note:- interface is only for typescript not for javascript. after compiling the ts file, js file doesnot contain interface keyword but it treated as class 
Object.defineProperty(exports, "__esModule", { value: true });
/*
var Users ={
    name:"",
    age:1,
    id: 1,
    email:1
}
*/
// let user : User= {name:"edu",id:1,age:1,email:"gmail.com"};//user.name user.age so on
// let {name ,email} : User= {name:"edu",id:1,age:1,email:"gmail.com"};// name id age this is called as object deconstructing 
let { name: userName, email: userLogin } = { name: "edu", id: 1, email: "gmail.com" }; //name must be called by userName [object deconstructing.....]
let employee = { name: "eddu", id: 1, email: "gmail.com", salary: 10000 };
/*let user : User[]=[
{ name:"eddu",id:1,email:"gmail.com"},
{ name:"eds",id:2,email:"gmail.com"},
{ name:"edd",id:3,email:"gmail.com"},
]*/ //one way
let [user1, user2, ...restUsers] = [
    { name: "eddu", id: 1, email: "gmail.com" },
    { name: "eds", id: 2, email: "gmail.com" },
    { name: "edd", id: 3, email: "gmail.com" },
    { name: "edd", id: 4, email: "gmail.com" }
]; //array deconstructing
/*console.log(user1);
console.log(user2);
console.log(restUsers);*/
let result = restUsers.filter(user => user.id > 2);
console.log(result);
