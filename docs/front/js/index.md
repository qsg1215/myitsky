# typeScript



``` typeScript

//可选接口

interface FullName{
    firstName: string;
    secondName?: string;
}

```

### ajax

```typeScript
//封装ajax

interface Config {
    type: string;
    url: string;
    dataType: string;
    data?: string;
   
}

function ajax(config: Config) {

    var xhr = new XMLHttpRequest();
    xhr.open(
        config.type,config.url,true
    );
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (config.dataType == 'json') {
                console.log( JSON.parse(xhr.responseText));
            } else {
                console.log(xhr.responseText);
            }
           
        }
    }


    
}

ajax({
    type: 'get',
    url: 'http://lydsj.hongya.cdsunrise.net:28666/api/industrialMonitor/hotelPassengerReception',
    dataType: 'json',
})
```


### 函数接口

``` typeScript

//加密函数

interface encrypt {
    (key:string, value:string):string
};

var md5: encrypt = function (key: string, value: string): string {
    return key + value;
}
console.log(md5('name', '张三'));

var sha1:encrypt = function (key: string, value: string): string {
    return `${key} - ${value};`
}

console.log(sha1('name', '张三'));


```


### 可索引接口

``` typeScript
var arr: number[] = [1, 2, 3]; 

var arr1: string[] = ['chen', 'hua', 'qiao'];

var arr2: Array<string> = [];

interface UserArray {
    [index: number]:any
}

var arr: UserArray = [1, '2', '4'];

console.log(arr[0]);

对象可索引

interface UserObj {
    [index: string]:string
}

var userObj: UserObj = {
    name: 'chen'
}

console.log(userObj.name);
```




### 类类型接口

``` typeScript
// 类类型接口

interface Animal {
    name: string;
    eat(str: string): void;
}

class Dog implements Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    eat() { //可以不写参数
        console.log(this.name + '吃粮食')
    }
}

var d = new Dog('小黑');

d.eat();

class Cat implements Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    eat(food: string) {
        console.log(this.name + '吃' + food);
        
    }
}

var cat1 = new Cat('小花');

cat1.eat('老鼠');
```




### 接口的扩展(又叫接口的继承)

``` typeScript

interface Animal {
    name: string;
    eat(str:string):void;
}

interface Person extends Animal {
    work():void;
}



class Programer  {
    public name: string
    constructor(name: string) {
        this.name = name
    }

    coding(code:string) {
        console.log(this.name+ '写' + code);
    }
}

//不继承类
class Web  implements Person {
     name: string;
    constructor(name: string) {
       this.name = name;
    };

    eat() {
        console.log(this.name + '吃馒头');
        
    }
    work() {
        console.log(this.name + '写代码');

    }

}

//继承类
class Web extends Programer implements Person {
    // name: string;
    constructor(name: string) {
        super(name);
       
    };

    eat() {
        console.log(this.name + '吃馒头');
        
    }
    work() {
        console.log(this.name + '写代码');

    }

}

var web = new Web('小李');


web.eat();
web.work();
web.coding('typeScript');


```

### 泛型

``` typeScript
function getData<T>(value: T): T {
    return value;
}

var num: number = 1;

console.log(getData<number>(num));
console.log(getData<string>('123'));

function getData<T>(value: T): any {
    return value;
}

var num: number = 1;

console.log(getData<number>(num));
console.log(getData<string>('123'));


```

### 类的泛型

``` typeScript
class MinClass<T> {
    public list: T[] = [];
    add(value: T):void {
        this.list.push(value);
    }
    min(): T {
                var minNum = this.list[0];
        for (var i = 1; i < this.list.length; i++){
            if (minNum > this.list[i]) {
                minNum = this.list[i];
            }
        }
        return minNum;
    }
};

var m1 = new MinClass<Number>();
m1.add(5);
m1.add(23);
m1.add(12);
m1.add(10);

alert(m1.min())

var m2 = new MinClass<String>();
m2.add('4');
m2.add('5');
m2.add('陈');
m2.add('哈呼穷啊');

alert(m2.min())


```


### 泛型接口

``` typeScript

//第一种

interface ConfigFn {
    <T>(value: T): T;
}

var getData: ConfigFn = function <T>(value1: T): T {
    return value1;
}

console.log(getData<string>('123'));

//第二种
interface ConfigFn<T> {
    (value: T): T;
}

function getData<T>(value: T) {
    return value;
}

var myGetData: ConfigFn<string> = getData;

console.log(myGetData('12'));



```


### 类作为参数来约束数据类型

``` typeScript
class User {
    username: string | undefined;
    password: string | undefined;

}

class MysqlDb {
    add(user: User): boolean {
        console.log(user);
        return true;
    }
}

var u = new User();
u.username = '张三';
u.password = '123456';
var db = new MysqlDb();
db.add(u);

```

### 泛型类

``` typeScript
// 使用泛型实现类的动态校验

class MysqlDb<T> {
    add(info: T): boolean {
        console.log(info);
        return true;
    }
}

// 给user表增加数据

// 定义User 类映射数据库字段;
class User {
    username: string | undefined;
    password: string | undefined;

}
var u = new User();
u.username = 'chen';
u.password = '123456';

var db = new MysqlDb<User>();
db.add(u); //good
db.add('1233'); //bad

```

### 类作为参数

``` typeScript

class ArticleCate {
    title: string | undefined;
    desc: string | undefined;
    status: string | undefined;

    constructor(params: {
        title: string | undefined;
        desc: string | undefined;
        status?: string | undefined;
    }) {
        this.title = params.title;
        this.desc = params.desc;
        this.status = params.status;
    }
}

class MysqlDb<T> {
    add(info: T): boolean {
        console.log(info);
        return true;
    }
}
var a = new ArticleCate({
    title: '分类',
    desc: '描述',
    status:'已发布'
});


var db = new MysqlDb<ArticleCate>();
db.add(a);



```



### 接口的扩展(又叫接口的继承)

``` typeScript
interface DBI <T>{
    add(info: T): boolean;
    update(info: T, id:number): boolean;
    delete(id:number): boolean;
    get(id:number): any[];
}

// 类. 泛型, 接口的综合应用

class MySqlDB<T> implements DBI<T> {
    
    constructor() {
        console.log('建立连接')
    }

    add(info: T): boolean {
        console.log(info);
        return true;
    };

    update(info: T, id:number): boolean {
        throw new Error('Method not implementated')
    };

    delete(id:number): boolean{
        throw new Error('Method not implementated')
    };

    get(id:number): any[]{
        throw new Error('Method not implementated')
    };
}

class MSsqlBD<T> implements DBI<T> { 

    constructor() {
        console.log('建立连接')
    }

    add(info: T): boolean {
        console.log(info);
        return true;
    };

    update(info: T, id:number): boolean {
        throw new Error('Method not implementated')
    };

    delete(id:number): boolean{
        throw new Error('Method not implementated')
    };

    get(id:number): any[]{
        throw new Error('Method not implementated')
    };

}

//操作用户表, 定义一个User类和用户表映射

class User {
    username: string | undefined;
    password: string | undefined;
}

var u = new User();
u.username = 'chen';
u.password = '123456';

var db = new MySqlDB<User>();
var msdb = new MSsqlBD<User>();
db.add(u);
msdb.add(u);

```


### 装饰器

``` typeScript

//无参装饰器
function logClass(params: any) {
    console.log(params);
    params.prototype.apiUrl = 'xxxx';
    params.prototype.run = function () {
        console.log('我是一个run方法');
        
    }

}

@logClass
class HttpClient {

};

var http = new HttpClient();
console.log(http);
http.run();


//带参装饰器
unction logClass(params: string) {
    
    return function (target: any) {
        target.prototype.apiUrl = params;
        //console.log(target,params );
        
        
    }

}

@logClass('http://localhost:8080')
class HttpClient {

};

var http:any = new HttpClient();

console.log(http.apiUrl);


```


### 类装饰器重些构造函数

``` typeScript

function logClass(target: any) {
    console.log(target);
    return class  extends target{
        apiUrl: any = '我是修改后的数据';
        getData() {
            this.apiUrl+= '---'
            console.log(this.apiUrl);
        }
     }
}

@logClass
class HttpClient {
    public apiUrl: string | undefined;
    constructor() {
        this.apiUrl = '我是构造函数中的apiUrl'
    }

    getData() {
        console.log(this.apiUrl);
    }
}

var http = new HttpClient();
http.getData()



```



### 方法装饰器1

``` typeScript
function get(params: any) {
    return function (target: any, methodName: any, desc: any) {
        console.log(target);
        console.log(methodName);
        console.log(desc);

        target.apiUrl = 'xxx';
        target.run = function () {
            console.log('run');
            
        }
        
    }
}

class HttpClient {

    public url: any | undefined;

    constructor() {
        
    }

    @get('http://www.myitsky.com')
    getData() {
        console.log(this.url);
        
    }
}

var http:any = new HttpClient();
http.run()

```



### 方法装饰器2(修改修饰方法)

``` typeScript
function get(params: any) {
    return function (target: any, methodsName: string, desc: any) {
        //扩展实例的原型属性和方法
        target.apiUrl = 'xxxxx';
        target.run = function () {
            console.log('run');
            
        };
        
        //保存当前的方法
        var oldMethods = desc.value;
        desc.value = function (...args: any[]) {
            args = args.map(i => String(i) + params);
            oldMethods.apply(this, args); //方法冒充
        }


        
    }

}

class HttpClient {

    public url: string | undefined;

    constructor() {
        
    }

    @get('http:///www.myitsky.com')
    getData(...args: any[]) {
        console.log(args);
        
        console.log('我是getData里面的方法');
    }
 
};

var http = new HttpClient();
http.getData(123,'xxxx')



```


### 参数装饰器

``` typeScript
function logParams(params: any) {
    return function (target: any, methodName: string, paramsIndex: any) {
        console.log(params);
        
        console.log(target);
        console.log(methodName);
        console.log(paramsIndex);
    }

}


class HttpClient {

    public url: string | undefined;

    constructor() {

    };

   
    getData(@logParams('uuid') uuid: any,@logParams('otherParams') other?: any) {
        
        console.log(uuid);
        console.log(other);
         

    }
};

var http = new HttpClient();
http.getData(123456,'other')



```

### 装饰器执行顺序

#### 属性 >> 方法 >> 方法参数 >> 类 同类型装饰器, 先执行后面的装饰器

``` typeScript
function logClass1(params: any) {
    return function (target: any) {
        console.log('类装饰器1');
        
    }
}

function logClass2(params: any) {
    return function (target: any) {
        console.log('类装饰器2');
        
    }
}

function logAttribute(params?: string) {
    return function (target: any, attrName: any) {
        console.log('属性装饰器');
        
    }
}

function logMethod(params: any) {
    return function (target: any, methodName: string, desc: any) {
        console.log('方法装饰器');
        
    }
}

function logParams1(params: any) {
    return function (target: any, methodName: string, paramsIndex: number) {
        console.log('参数装饰器1');
        
    }
}
function logParams2(params: any) {
    return function (target: any, methodName: string, paramsIndex: number) {
        console.log('参数装饰器2');
        
    }
}

@logClass1('http://www.myitsky.com')
@logClass2('xxxx')
class HttpClient {


    @logAttribute()
    public apiUrl: string | undefined;

    constructor() {

    };
    @logMethod('xx')
    getData() {

    };

    setData(@logParams1() params1:any,@logParams2() params2:any) {
        
    };
};

var http = new HttpClient();

http.getData();


```

### 接口的扩展(又叫接口的继承)

``` typeScript


```

### 接口的扩展(又叫接口的继承)

``` typeScript


```






