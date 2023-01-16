import {Login, User} from './interface';
// import * as UserLogin from './interface';   // another method for stupid😂
interface Address{
    street:string;
    city:string;
    state:string;
    pincode:number
}



// class Employee{
//     id!: number;

//     name!:string;

//     address!:string;

// }

// let john = new Employee();

// john.id=1;
// john.name="Edwin";
// john.address="maruthi badavane";

// console.log(john);




class Employee implements Login{
    #id: number;// private variable declared using this symbol # for id variable

    protected name: string;

    address: Address;

    constructor(id: number, name: string, address: Address) {
        this.#id = id;
        this.name = name;
        this.address = address
    }

    Login(): User{
        return  {name:"edu",id:1,email:"gmail.com"};
      }

    getNameWithAddress(): string {
        return `${this.name} stays at ${this.address.street} ${this.address.city}`;  // look at under the tilde operator   we can also use         this.name+" stays at "+this.address
    }

    static getEmployeeScore():number{
        return 50;
    }

    get empId():number{
        return this.#id;
    }

    set empId(id:number){
        this.#id=id;
    }

   

}




class Manager extends Employee{// inheritance
    constructor(id: number, name: string, address:Address){
        super(id,name,address);
    }
}




console.log();//formatting purpose


let karthick = new Employee(2, 'Karthik', {street:"12th cross", city:"bangalore", state:"karnataka",pincode:560083});
karthick.empId=3;
console.log(karthick.empId);
console.log(karthick);
console.log(karthick.getNameWithAddress());
console.log(Employee.getEmployeeScore());//static function

let avishek = new Manager(1,'Avishek',{street:"13th cross", city:"bangalore", state:"karnataka",pincode:560083})
avishek.empId=4;
console.log(avishek.empId);
console.log(avishek);
console.log(avishek.getNameWithAddress());
console.log(Manager.getEmployeeScore());//static function


console.log();//formatting purpose




function newFunction(): any {
    return 560083;
}
/*

glance oop's concepts

setters and getters methods

    */