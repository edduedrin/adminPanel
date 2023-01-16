"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Employee_id;
Object.defineProperty(exports, "__esModule", { value: true });
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
class Employee {
    constructor(id, name, address) {
        _Employee_id.set(this, void 0); // private variable declared using this symbol # for id variable
        __classPrivateFieldSet(this, _Employee_id, id, "f");
        this.name = name;
        this.address = address;
    }
    Login() {
        return { name: "edu", id: 1, email: "gmail.com" };
    }
    getNameWithAddress() {
        return `${this.name} stays at ${this.address.street} ${this.address.city}`; // look at under the tilde operator   we can also use         this.name+" stays at "+this.address
    }
    static getEmployeeScore() {
        return 50;
    }
    get empId() {
        return __classPrivateFieldGet(this, _Employee_id, "f");
    }
    set empId(id) {
        __classPrivateFieldSet(this, _Employee_id, id, "f");
    }
}
_Employee_id = new WeakMap();
class Manager extends Employee {
    constructor(id, name, address) {
        super(id, name, address);
    }
}
console.log(); //formatting purpose
let karthick = new Employee(2, 'Karthik', { street: "12th cross", city: "bangalore", state: "karnataka", pincode: 560083 });
karthick.empId = 3;
console.log(karthick.empId);
console.log(karthick);
console.log(karthick.getNameWithAddress());
console.log(Employee.getEmployeeScore()); //static function
let avishek = new Manager(1, 'Avishek', { street: "13th cross", city: "bangalore", state: "karnataka", pincode: 560083 });
avishek.empId = 4;
console.log(avishek.empId);
console.log(avishek);
console.log(avishek.getNameWithAddress());
console.log(Manager.getEmployeeScore()); //static function
console.log(); //formatting purpose
function newFunction() {
    return 560083;
}
/*

glance oop's concepts

setters and getters methods

    */ 
