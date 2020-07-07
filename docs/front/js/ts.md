# typeScript 实践


``` typeScript
    let num: number = 23;

//数组
let arr: number[] = [];
arr = [123, 1];

let arr2: Array<number>;

//联合类型
let arr3: (string | number)[];
let arr4: Array< string | number >;


//元组类型 

let tuple: [string, number?, boolean?];
tuple = ['123']

let tuple1: [string, number, boolean];
tuple = ['123', 12, false];

//长度必须一致, 不能超出
let tuple3: [string, number, boolean];
tuple3 = ['123', 12, false];

//枚举类型
enum Roles {
    
    SUPER_ADMIN ,
    ADMIN = 4,
    USER 

}


//any
let value: any;
value = '123';
value = 12;

const arr5: any[] = [123, 123];

//viod 没有返回值

const consoleText = (text:string):void => {
    console.log(text);
}

let v: void = undefined;
v = undefined;
v = null;
 ```