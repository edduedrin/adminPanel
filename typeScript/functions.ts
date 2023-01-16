
function add(num1:number, num2:number):number{
    return num1+num2;
}

console.log(add(2,3));

const sub = (num1:number,num2:number):number=>num2-num1;

console.log(sub(3,2));

const mult = function(num1:number,num2:number):number
{
    return num2*num1;
}

console.log(mult(10,5));

//required parameter

function addition(num1:number, num2:number, num3=10):number{
    return num1+num2+num3;
}

console.log(addition(1,1));

//optional parameter

function additions(num1:number,num2:number,num3?:number){
    return num3? num1+num2+num3: num1+num2;
}

console.log(additions(2,3));

// rest parameter

function add2(num1:number,num2:number, ...num3:number[]):number
{
    return num1+num2+num3.reduce((a,b)=> a+b ,0);
}

let numbers = [1,2,3,4,5];

console.log(add2(3,2,3,4,5,6));


//generic function

function getItems<type>(items:type[]): type[]{
    return new Array<type>().concat(items);
}

let concatResults = getItems<number>([1,2,3,4,5]);

let concatString = getItems<string>(["a","b","c","d","e","f"]);



