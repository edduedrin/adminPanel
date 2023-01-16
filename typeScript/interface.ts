// note:- interface is only for typescript not for javascript. after compiling the ts file, js file doesnot contain interface keyword but it treated as class 

export interface User{
    name:String;
    id: number;
    email:string;
}
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

let {name : userName, email:userLogin} : User= {name:"edu",id:1,email:"gmail.com"};//name must be called by userName [object deconstructing.....]

interface Employees extends User{
    salary : number;
}

let employee : Employees={name:"eddu",id:1,email:"gmail.com",salary:10000};

export interface Login{
    Login() : User;
}

/*let user : User[]=[
{ name:"eddu",id:1,email:"gmail.com"},
{ name:"eds",id:2,email:"gmail.com"},
{ name:"edd",id:3,email:"gmail.com"},
]*/ //one way

let [user1, user2 , ...restUsers]: User[]=[
    { name:"eddu",id:1,email:"gmail.com"},
    { name:"eds",id:2,email:"gmail.com"},
    { name:"edd",id:3,email:"gmail.com"},
    { name:"edd",id:4,email:"gmail.com"}
    ]//array deconstructing


    /*console.log(user1);
    console.log(user2);
    console.log(restUsers);*/

    let result = restUsers.filter(user => user.id>2);

    console.log(result);



    //decorator


// @Component({})
// class Component{
// constructor(public name: string){}
// }