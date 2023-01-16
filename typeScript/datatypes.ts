let Lname: string;

Lname = "santhosh";

// Lname = 10;
let newname = Lname.toUpperCase();

console.log(newname);

let age : number;

age = 25;

let dob = "26";
let result = parseInt (dob);
age = result;

console.log(age);

let isValid : boolean;

isValid= true;

console.log(isValid);

let empList: string[];

empList = ["Edwin", "Karthik", "Shubam", "Avishek" ];

let numList : Array<number>;

numList = [1,2,3,4];

let res = numList.filter((num)=>num>1);

console.log(res);

console.log(numList.find((num)=>num===2));

let sum = numList.reduce((acc,num)=>acc+num);

console.log(sum);

enum Color{
    Red,
    Green, 
    Blue
}

let c:Color = Color.Blue;

let swapNumbs: [number,number];

function swapNumber(num1:number,num2:number):[number,number]{
    return [num2,num1];
}

swapNumbs = swapNumber(10,20);

swapNumbs[0]
swapNumbs[1]


let department :any;

department = "IT";
department = 10;



