
#  zod使用文档总结汇总

#  API概览
- [安装](#安装)
- [基本用法](#基本用法)
- [定义模式](#定义模式)
  - [原始值类型（primitive）](#原始值类型（primitive）)
  - [字面量（literal）](#字面量（literal）)
  - [字符串](#字符串)
  - [Numbers](#numbers)
  - [Objects](#objects)
    - [.shape](#shape)
    - [.extend](#extend)
    - [.merge](#merge)
    - [.pick/.omit](#pickomit)
    - [.partial](#partial)
    - [.deepPartial](#deepPartial)
    - [.passthrough](#passthrough)
    - [.strict](#strict)
    - [.strip](#strip)
    - [.catchall](#catchall)
  - [Records](#records)
  - [Maps](#maps)
  - [Sets](#sets)
  - [Arrays](#arrays)
    - [.nonempty](#nonempty)
    - [.min/.max/.length](#minmaxlength)
  - [Unions](#unions)
  - [Optionals](#optionals)
  - [Nullables](#nullables)
  - [Enums](#enums)
    - [Zod enums](#zod-enums)
    - [Native enums](#native-enums)
  - [Tuples](#tuples)
  - [Recursive types](#recursive-types)
    - [JSON type](#json-type)
    - [Cyclical data](#cyclical-objects)
  - [Promises](#promises)
  - [Instanceof](#instanceof)
  - [Function schemas](#function-schemas)
- [基础类方法 (ZodType)](#zodtype-methods-and-properties)
  - [.parse](#parse)
  - [.parseAsync](#parseasync)
  - [.safeParse](#safeparse)
  - [.safeParseAsync](#safeparseasync)
  - [.refine](#refine)
  - [.superRefine](#superRefine)
  - [.transform](#transform)
  - [.default](#default)
  - [.optional](#optional)
  - [.nullable](#nullable)
  - [.nullish](#nullish)
  - [.array](#array)
  - [.or](#or)
  - [.and](#and)
- [类型推断](#type-inference)
- [Errors](#errors)


# 安装

### 必要条件

- TypeScript 4.5+!
- 你必须在你的`tsconfig.json`中启用`strict`模式。这是所有 TypeScript 项目的最佳实践。

```ts
// tsconfig.json
{
  // ...
  "compilerOptions": {
    // ...
    "strict": true
  }
}
```

### 从`npm`安装

```sh
npm install zod
yarn add zod          # yarn
```


> README 的剩余部分假定你是直接通过 npm 安装的`zod`包。

# 基本用法

创建一个简单的字符串模式

```ts
import { z } from "zod";

// 创建一个字符串的模式
const mySchema = z.string();

// 解析
mySchema.parse("tuna"); // => "tuna"
mySchema.parse(12); // => throws ZodError

// "安全"解析(如果验证失败不抛出错误)
mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
mySchema.safeParse(12); // => { success: false; error: ZodError }
```

创建一个 Object 模式

```ts
import { z } from "zod";

const User = z.object({
  username: z.string(),
});

User.parse({ username: "Ludwig" });

// 提取出推断的类型
type User = z.infer<typeof User>;
// { username: string }
```

# 定义模式

## 原始值类型（primitive）

```ts
import { z } from "zod";

// 原始值类型
z.string();
z.number();
z.bigint();
z.boolean();
z.date();
z.symbol();

// 空类型
z.undefined();
z.null();
z.void(); // 接受 undefined

// 任意类型
// 允许任意类型的值
z.any();
z.unknown();

// never 类型
// 不允许值类型存在
z.never();
```

## 字面量（literal）

```ts
const tuna = z.literal("tuna");
const twelve = z.literal(12);
const tru = z.literal(true);

// 检索字面量的值
tuna.value; // "tuna"
```

> 目前在 Zod 中不支持 Date 或 bigint 字面。如果你有这个功能的用例，请提交一个 Issue。

## 字符串

Zod 包括一些针对字符串的验证。

```ts
z.string().max(5);
z.string().min(5);
z.string().length(5);
z.string().email();
z.string().url();
z.string().uuid();
z.string().regex(regex);
z.string().startsWith(string);
z.string().endsWith(string);

// 已废弃，等同于 .min(1)
z.string().nonempty();
```

> 查看 [validator.js](https://github.com/validatorjs/validator.js)，了解其他一些有用的字符串验证函数

#### 自定义错误信息

你可以选择传入第二个参数来提供一个自定义的错误信息。

```ts
z.string().min(5, { message: "Must be 5 or more characters long" });
z.string().max(5, { message: "Must be 5 or fewer characters long" });
z.string().length(5, { message: "Must be exactly 5 characters long" });
z.string().email({ message: "Invalid email address." });
z.string().url({ message: "Invalid url" });
z.string().uuid({ message: "Invalid UUID" });
z.string().startsWith("https://", { message: "Must provide secure URL" });
z.string().endsWith(".com", { message: "Only .com domains allowed" });
```

## Numbers

Zod 包括一些特定的数字验证。

```ts
z.number().gt(5);
z.number().gte(5); // alias .min(5)
z.number().lt(5);
z.number().lte(5); // alias .max(5)

z.number().int(); // 值必须是一个整数

z.number().positive(); //     > 0
z.number().nonnegative(); //  >= 0
z.number().negative(); //     < 0
z.number().nonpositive(); //  <= 0

z.number().multipleOf(5); // x % 5 === 0
```

你可以选择传入第二个参数来提供一个自定义的错误信息。

```ts
z.number().max(5, { message: "this👏is👏too👏big" });
```

## Dates

```ts
z.date().safeParse(new Date()); // success: true

z.date({
  required_error: "Please select a date and time",
  invalid_type_error: "That's not a date!",
});

z.date().min(new Date("1900-01-01"), { message: "Too old" });
z.date().max(new Date(), { message: "Too young!" });
```

## Objects

```ts
// 所有属性都是默认需要的
const Dog = z.object({
  name: z.string(),
  age: z.number(),
});

// 像这样提取推断出的类型
type Dog = z.infer<typeof Dog>;

// 相当于:
type Dog = {
  name: string;
  age: number;
};
```

### `.shape`

使用`.shape`来访问特定键的模式。

```ts
Dog.shape.name; // => string schema
Dog.shape.age; // => number schema
```

### `.extend`

你可以用`.extend`方法在对象模式中添加额外的字段。

```ts
const DogWithBreed = Dog.extend({
  breed: z.string(),
});
```

你可以使用`.extend`来覆盖字段! 要小心使用这种方式!

### `.merge`

相当于 `A.extend(B.shape)`.

```ts
const BaseTeacher = z.object({ students: z.array(z.string()) });
const HasID = z.object({ id: z.string() });

const Teacher = BaseTeacher.merge(HasID);
type Teacher = z.infer<typeof Teacher>; // => { students: string[], id: string }
```

> 如果两个模式共享 keys，那么 B 的属性将覆盖 A 的属性。返回的模式也继承了 "unknownKeys 密钥 "策略(strip/strict/passthrough+)和 B 的全面模式。

### `.pick/.omit`

受 TypeScript 内置的`Pick`和`Omit`工具类型的启发，所有 Zod 对象模式都有`.pick`和 `.omit`方法，可以返回一个修改后的版本。考虑一下这个 Recipe 模式。

```ts
const Recipe = z.object({
  id: z.string(),
  name: z.string(),
  ingredients: z.array(z.string()),
});
```

要想只保留某些 Key，使用 `.pick` .

```ts
const JustTheName = Recipe.pick({ name: true });
type JustTheName = z.infer<typeof JustTheName>;
// => { name: string }
```

要删除某些 Key，请使用 `.omit` .

```ts
const NoIDRecipe = Recipe.omit({ id: true });

type NoIDRecipe = z.infer<typeof NoIDRecipe>;
// => { name: string, ingredients: string[] }
```

### `.partial`

受 TypeScript 内置的实用类型[Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)的启发, `.partial` 方法使所有属性都是可选的。

从这个对象开始:

```ts
const user = z.object({
  username: z.string(),
});
// { username: string }
```

我们可以创建一个 Partial 版本:

```ts
const partialUser = user.partial();
// { username?: string | undefined }
```

### `.deepPartial`

T`.partial` 只是一个浅层的使用 — 它只适用于一个层次的深度。还有一个 "深层" 版本:

```ts
const user = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

const deepPartialUser = user.deepPartial();

/*
{
  username?: string | undefined,
  location?: {
    latitude?: number | undefined;
    longitude?: number | undefined;
  } | undefined
}
*/
```

> 重要的限制: `deep partials` 只在对象模式的直接层次中按预期工作。嵌套的对象模式不能是可选的，不能是空的，不能包含细化，不能包含转换，等等...

#### 未被识别的 keys

默认情况下，Zod 对象的模式在解析过程中会剥离出未被识别的 keys

```ts
const person = z.object({
  name: z.string(),
});

person.parse({
  name: "bob dylan",
  extraKey: 61,
});
// => { name: "bob dylan" }
// extraKey已经被剥离
```

### `.passthrough`

相反，如果你想通过未知的 keys，使用`.passthrough()`。

```ts
person.passthrough().parse({
  name: "bob dylan",
  extraKey: 61,
});
// => { name: "bob dylan", extraKey: 61 }
```

### `.strict`

你可以用`.strict()`来 _禁止_ 未知键。如果输入中存在任何未知的 keys，Zod 将抛出一个错误。

```ts
const person = z
  .object({
    name: z.string(),
  })
  .strict();

person.parse({
  name: "bob dylan",
  extraKey: 61,
});
// => throws ZodError
```

### `.strip`

你可以使用`.strip`方法将一个对象模式重置为默认行为(剥离未识别的 keys)。

### `.catchall`

你可以将一个 "catchall "模式传递给一个对象模式。所有未知的 keys 都将根据它进行验证。

```ts
const person = z
  .object({
    name: z.string(),
  })
  .catchall(z.number());

person.parse({
  name: "bob dylan",
  validExtraKey: 61, // 运行良好
});

person.parse({
  name: "bob dylan",
  validExtraKey: false, // 未能成功
});
// => throws ZodError
```

使用`.catchall()`可以避免`.passthrough()`，`.strip()`，或`.strict()`。现在所有的键都被视为 "已知(known)"。

## Arrays

```ts
const stringArray = z.array(z.string());

// 相当于
const stringArray = z.string().array();
```

要小心使用`.array()`方法。它返回一个新的`ZodArray`实例。这意味着你调用方法的 _顺序_ 很重要。比如说:

```ts
z.string().optional().array(); // (string | undefined)[]
z.string().array().optional(); // string[] | undefined
```

### `.nonempty`

如果你想确保一个数组至少包含一个元素，使用 `.nonempty()`.

```ts
const nonEmptyStrings = z.string().array().nonempty();
// 现在推断的类型是
// [string, ...string[]]

nonEmptyStrings.parse([]); // throws: "Array cannot be empty"
nonEmptyStrings.parse(["Ariana Grande"]); // passes
```

### `.min/.max/.length`

```ts
z.string().array().min(5); // 必须包含5个或更多元素
z.string().array().max(5); // 必须包含5个或更少元素
z.string().array().length(5); // 必须正好包含5个元素
```

与`.nonempty()`不同，这些方法不会改变推断的类型。

## Unions

Zod 包括一个内置的`z.union`方法，用于合成 "OR" 类型。

```ts
const stringOrNumber = z.union([z.string(), z.number()]);

stringOrNumber.parse("foo"); // 通过
stringOrNumber.parse(14); // 通过
```

Zod 将按照每个 "选项" 的顺序测试输入，并返回第一个成功验证的值。

为了方便，你也可以使用`.or`方法:

```ts
const stringOrNumber = z.string().or(z.number());
```

## Optionals

你可以用`z.optional()`使任何模式成为可选:

```ts
const schema = z.optional(z.string());

schema.parse(undefined); // => returns undefined
type A = z.infer<typeof schema>; // string | undefined
```

你可以用`.optional()`方法使一个现有的模式成为可选的:

```ts
const user = z.object({
  username: z.string().optional(),
});
type C = z.infer<typeof user>; // { username?: string | undefined };
```

#### `.unwrap`

```ts
const stringSchema = z.string();
const optionalString = stringSchema.optional();
optionalString.unwrap() === stringSchema; // true
```

## Nullables

类似地，你可以这样创建 nullable 类型:

```ts
const nullableString = z.nullable(z.string());
nullableString.parse("asdf"); // => "asdf"
nullableString.parse(null); // => null
```

你可以用`nullable`方法使一个现有的模式变成 nullable:

```ts
const E = z.string().nullable(); // equivalent to D
type E = z.infer<typeof E>; // string | null
```

#### `.unwrap`

```ts
const stringSchema = z.string();
const nullableString = stringSchema.nullable();
nullableString.unwrap() === stringSchema; // true
```

<!--

``` ts
/* Custom Union Types */

const F = z
  .union([z.string(), z.number(), z.boolean()])
  .optional()
  .nullable();

F.parse('tuna'); // => tuna
F.parse(42); // => 42
F.parse(true); // => true
F.parse(undefined); // => undefined
F.parse(null); // => null
F.parse({}); // => throws Error!

type F = z.infer<typeof F>; // string | number | boolean | undefined | null;
``` -->

## Records

Record 模式用于验证诸如`{ [k: string]: number }`这样的类型。

如果你想根据某种模式验证一个对象的 _value_ ，但不关心 keys，使用`Record'。

```ts
const NumberCache = z.record(z.number());

type NumberCache = z.infer<typeof NumberCache>;
// => { [k: string]: number }
```

这对于按 ID 存储或缓存项目特别有用。

```ts
const userSchema = z.object({ name: z.string() });
const userStoreSchema = z.record(userSchema);

type UserStore = z.infer<typeof userStoreSchema>;
// => type UserStore = { [ x: string ]: { name: string } }

const userStore: UserStore = {};

userStore["77d2586b-9e8e-4ecf-8b21-ea7e0530eadd"] = {
  name: "Carlotta",
}; // passes

userStore["77d2586b-9e8e-4ecf-8b21-ea7e0530eadd"] = {
  whatever: "Ice cream sundae",
}; // TypeError
```

#### 关于数字键的说明

你可能期望`z.record()`接受两个参数，一个是 key，一个是 value。毕竟，TypeScript 的内置 Record 类型是这样的：`Record<KeyType, ValueType>` 。否则，你如何在 Zod 中表示 TypeScript 类型`Record<number, any>`？

事实证明，TypeScript 围绕`[k: number]`的行为有点不直观:

```ts
const testMap: { [k: number]: string } = {
  1: "one",
};

for (const key in testMap) {
  console.log(`${key}: ${typeof key}`);
}
// prints: `1: string`
```

正如你所看到的，JavaScript 会自动将所有对象 key 转换为字符串。

由于 Zod 试图弥合静态类型和运行时类型之间的差距，提供一种创建带有数字键的记录模式的方法是没有意义的，因为在 JavaScript runtime 中没有数字键这回事。

## Maps

```ts
const stringNumberMap = z.map(z.string(), z.number());

type StringNumberMap = z.infer<typeof stringNumberMap>;
// type StringNumber = Map<string, number>
```

## Sets

```ts
const numberSet = z.set(z.number());
type numberSet = z.infer<typeof numberSet>;
// Set<number>
```

## Enums

在 Zod 中，有两种方法来定义枚举。

### Zod enums

<!-- An enum is just a union of string literals, so you _could_ define an enum like this:

```ts
const FishEnum = z.union([
  z.literal("Salmon"),
  z.literal("Tuna"),
  z.literal("Trout"),
]);

FishEnum.parse("Salmon"); // => "Salmon"
FishEnum.parse("Flounder"); // => throws
```

For convenience Zod provides a built-in `z.enum()` function. Here's is the equivalent code: -->

```ts
const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);
type FishEnum = z.infer<typeof FishEnum>;
// 'Salmon' | 'Tuna' | 'Trout'
```

你必须将数值数组直接传入`z.enum()`。这样做是不行的:

```ts
const fish = ["Salmon", "Tuna", "Trout"];
const FishEnum = z.enum(fish);
```

在这种情况下，Zod 无法推断出各个枚举元素；相反，推断出的类型将是 `string` 而不是`'Salmon'|'Tuna'|'Trout'`。

另一种可行的方式是使用`as const`，这样 Zod 就可以推断出正确的类型。

```ts
const VALUES = ["Salmon", "Tuna", "Trout"] as const;
const FishEnum = z.enum(VALUES);
```

**自动补全**

为了获得 Zod 枚举的自动完成，请使用你的模式的`.enum`属性:

```ts
FishEnum.enum.Salmon; // => 自动补全

FishEnum.enum;
/*
=> {
  Salmon: "Salmon",
  Tuna: "Tuna",
  Trout: "Trout",
}
*/
```

你也可以用`.options`属性检索选项列表，作为一个元组:

```ts
FishEnum.options; // ["Salmon", "Tuna", "Trout"]);
```

### Native enums

Zod 枚举是定义和验证枚举的推荐方法。但是如果你需要对第三方库的枚举进行验证（或者你不想重写你现有的枚举），你可以使用`z.nativeEnum()`。

**数字枚举**

```ts
enum Fruits {
  Apple,
  Banana,
}

const FruitEnum = z.nativeEnum(Fruits);
type FruitEnum = z.infer<typeof FruitEnum>; // Fruits

FruitEnum.parse(Fruits.Apple); // 通过
FruitEnum.parse(Fruits.Banana); // 通过
FruitEnum.parse(0); // 通过
FruitEnum.parse(1); // 通过
FruitEnum.parse(3); // 未通过
```

**String enums**

```ts
enum Fruits {
  Apple = "apple",
  Banana = "banana",
  Cantaloupe, // 你可以混合使用数字和字符串的枚举
}

const FruitEnum = z.nativeEnum(Fruits);
type FruitEnum = z.infer<typeof FruitEnum>; // Fruits

FruitEnum.parse(Fruits.Apple); // 通过
FruitEnum.parse(Fruits.Cantaloupe); // 通过
FruitEnum.parse("apple"); // 通过
FruitEnum.parse("banana"); // 通过
FruitEnum.parse(0); // 通过
FruitEnum.parse("Cantaloupe"); // 未通过
```

**常量枚举**

`.nativeEnum()`函数也适用于`as const`对象。 ⚠️ `as const`需要 TypeScript 3.4+!

```ts
const Fruits = {
  Apple: "apple",
  Banana: "banana",
  Cantaloupe: 3,
} as const;

const FruitEnum = z.nativeEnum(Fruits);
type FruitEnum = z.infer<typeof FruitEnum>; // "apple" | "banana" | 3

FruitEnum.parse("apple"); // passes
FruitEnum.parse("banana"); // passes
FruitEnum.parse(3); // passes
FruitEnum.parse("Cantaloupe"); // fails
```

## Intersections

<!-- > ⚠️ Intersections are deprecated. If you are trying to merge objects, use the `.merge` method instead. -->

交叉类型对于创建 "logical AND"类型很有用。这对于两个对象类型的相交很有用。

```ts
const Person = z.object({
  name: z.string(),
});

const Employee = z.object({
  role: z.string(),
});

const EmployedPerson = z.intersection(Person, Employee);

// equivalent to:
const EmployedPerson = Person.and(Employee);
```

虽然在很多情况下，建议使用`A.merge(B)`来合并两个对象。`.merge`方法返回一个新的`ZodObject`实例，而`A.and(B)`返回一个不太有用的`ZodIntersection`实例，它缺乏像`pick`和`omit`这样的常用对象方法。

```ts
const a = z.union([z.number(), z.string()]);
const b = z.union([z.number(), z.boolean()]);
const c = z.intersection(a, b);

type c = z.infer<typeof c>; // => number
```

<!-- Intersections in Zod are not smart. Whatever data you pass into `.parse()` gets passed into the two intersected schemas. Because Zod object schemas don't allow any unknown keys by default, there are some unintuitive behavior surrounding intersections of object schemas. -->

<!--

``` ts
const A = z.object({
  a: z.string(),
});

const B = z.object({
  b: z.string(),
});

const AB = z.intersection(A, B);

type Teacher = z.infer<typeof Teacher>;
// { id:string; name:string };
```  -->

## Tuples

与数组不同，tuples 有固定数量的元素，每个元素可以有不同的类型。

```ts
const athleteSchema = z.tuple([
  z.string(), // name
  z.number(), // jersey number
  z.object({
    pointsScored: z.number(),
  }), // statistics
]);

type Athlete = z.infer<typeof athleteSchema>;
// type Athlete = [string, number, { pointsScored: number }]
```

## Recursive types

你可以在 Zod 中定义一个递归模式，但由于 TypeScript 的限制，它们的类型不能被静态推断。相反，你需要手动定义类型，并将其作为 "类型提示" 提供给 Zod。

```ts
interface Category {
  name: string;
  subcategories: Category[];
}

// cast to z.ZodSchema<Category>
const Category: z.ZodSchema<Category> = z.lazy(() =>
  z.object({
    name: z.string(),
    subcategories: z.array(Category),
  })
);

Category.parse({
  name: "People",
  subcategories: [
    {
      name: "Politicians",
      subcategories: [{ name: "Presidents", subcategories: [] }],
    },
  ],
}); // 通过
```

不幸的是，这段代码有点重复，因为你声明了两次类型：一次在接口中，另一次在 Zod 定义中。


#### JSON type

如果你想验证任何 JSON 值，你可以使用下面的片段。

```ts
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

jsonSchema.parse(data);
```

#### Cyclical objects

尽管支持递归模式，但将一个循环数据传入 Zod 会导致无限循环。

## Promises

```ts
const numberPromise = z.promise(z.number());
```

"Parsing"的工作方式与 promise 模式有点不同。验证分两部分进行:

1. Zod 同步检查输入是否是 Promise 的实例(即一个具有`.then`和`.catch`方法的对象)。
2. Zod 使用`.then`在现有的 Promise 上附加一个额外的验证步骤。你必须在返回的 Promise 上使用`.catch`来处理验证失败的问题。

```ts
numberPromise.parse("tuna");
// ZodError: Non-Promise type: string

numberPromise.parse(Promise.resolve("tuna"));
// => Promise<number>

const test = async () => {
  await numberPromise.parse(Promise.resolve("tuna"));
  // ZodError: Non-number type: string

  await numberPromise.parse(Promise.resolve(3.14));
  // => 3.14
};
```

<!-- #### Non-native promise implementations

When "parsing" a promise, Zod checks that the passed value is an object with `.then` and `.catch` methods — that's it. So you should be able to pass non-native Promises (Bluebird, etc) into `z.promise(...).parse` with no trouble. One gotcha: the return type of the parse function will be a _native_ `Promise` , so if you have downstream logic that uses non-standard Promise methods, this won't work. -->

## Instanceof

你可以使用`z.instanceof`来检查输入是否是一个类的实例。这对于验证从第三方库中导出的类的输入很有用。

```ts
class Test {
  name: string;
}

const TestSchema = z.instanceof(Test);

const blob: any = "whatever";
TestSchema.parse(new Test()); // passes
TestSchema.parse("blob"); // throws
```

## Function schemas

Zod 还允许你定义 "函数模式(function schemas)"。这使得验证一个函数的输入和输出变得很容易，而不需要把验证代码和 "业务逻辑(business logic)"混在一起。

你可以用`z.function(args, returnType)`创建一个函数模式。

```ts
const myFunction = z.function();

type myFunction = z.infer<typeof myFunction>;
// => ()=>unknown
```

**定义输入和输出**

```ts
const myFunction = z
  .function()
  .args(z.string(), z.number()) // 接受任意数量的参数
  .returns(z.boolean());
type myFunction = z.infer<typeof myFunction>;
// => (arg0: string, arg1: number)=>boolean
```

**提取输入和输出模式**
你可以提取一个函数模式的参数和返回类型。

```ts
myFunction.parameters();
// => ZodTuple<[ZodString, ZodNumber]>

myFunction.returnType();
// => ZodBoolean
```



函数模式有一个`.implement()`方法，它接受一个函数并返回一个自动验证其输入和输出的新函数。

```ts
const trimmedLength = z
  .function()
  .args(z.string()) // accepts an arbitrary number of arguments
  .returns(z.number())
  .implement((x) => {
    // TypeScript knows x is a string!
    return x.trim().length;
  });

trimmedLength("sandwich"); // => 8
trimmedLength(" asdf "); // => 4
```

如果你只关心验证输入，那就好了:

```ts
const myFunction = z
  .function()
  .args(z.string())
  .implement((arg) => {
    return [arg.length]; //
  });
myFunction; // (arg: string)=>number[]
```

# ZodType: methods and properties

所有的 Zod 模式都包含一些方法。

### `.parse`

`.parse(data:unknown): T`

给定任何 Zod 模式，你可以调用其`.parse`方法来检查`data`是否有效。如果是的话，就会返回一个带有完整类型信息的值。否则，会产生一个错误。

> IMPORTANT: 在 Zod 2 和 Zod 1.11+中，`.parse`返回的值是你传入的变量的 _deep clone_ 。这在zod@1.4 和更早的版本中也是如此。

```ts
const stringSchema = z.string();
stringSchema.parse("fish"); // => returns "fish"
stringSchema.parse(12); // throws Error('Non-string type: number');
```

### `.parseAsync`

`.parseAsync(data:unknown): Promise<T>`

如果你使用异步的[refinements](#refine)或[transforms](#transform)（后面会有更多介绍），你需要使用`.parseAsync`

```ts
const stringSchema = z.string().refine(async (val) => val.length > 20);
const value = await stringSchema.parseAsync("hello"); // => hello
```

### `.safeParse`

`.safeParse(data:unknown): { success: true; data: T; } | { success: false; error: ZodError; }`

如果你不希望 Zod 在验证失败时抛出错误，请使用`.safeParse`。该方法返回一个包含成功解析的数据的对象，或者一个包含验证问题详细信息的 ZodError 实例。

```ts
stringSchema.safeParse(12);
// => { success: false; error: ZodError }

stringSchema.safeParse("billie");
// => { success: true; data: 'billie' }
```

结果是一个 _discriminated union_ ，所以你可以非常方便地处理错误:

```ts
const result = stringSchema.safeParse("billie");
if (!result.success) {
  // handle error then return
  result.error;
} else {
  // do something
  result.data;
}
```

### `.safeParseAsync`

> Alias: `.spa`

一个异步版本的`safeParse`。

```ts
await stringSchema.safeParseAsync("billie");
```

为方便起见，它已被别名为`.spa`:

```ts
await stringSchema.spa("billie");
```

### `.refine`

`.refine(validator: (data:T)=>any, params?: RefineParams)`

Zod 允许你通过 _refinements_ 提供自定义验证逻辑。(关于创建多个问题和自定义错误代码等高级功能，见[`.superRefine`](#superrefine))。

Zod 被设计为尽可能地反映 TypeScript。但有许多所谓的 "细化类型"，你可能希望检查不能在 TypeScript 的类型系统中表示。例如：检查一个数字是否是一个整数，或者一个字符串是否是一个有效的电子邮件地址。

例如，你可以用`.refine`对任何 Zod 模式定义一个自定义验证检查:

```ts
const myString = z.string().refine((val) => val.length <= 255, {
  message: "String can't be more than 255 characters",
});
```

> ⚠️ 精细化函数不应该抛出。相反，它们应该返回一个虚假的值来表示失败。

#### Arguments

正如你所看到的，`.refine`需要两个参数。

1. 第一个是验证函数。这个函数接受一个输入（类型为`T`--模式的推断类型）并返回`any`。任何真实的值都会通过验证。(在zod@1.6.2 之前，验证函数必须返回一个布尔值。)
2. 第二个参数接受一些选项。你可以用它来定制某些错误处理行为:

```ts
type RefineParams = {
  // 覆盖错误信息
  message?: string;

  // 附加到错误路径中
  path?: (string | number)[];

  // params对象，你可以用它来定制消息
  // 在错误map中
  params?: object;
};
```

对于高级情况，第二个参数也可以是一个返回`RefineParams`的函数

```ts
z.string().refine(
  (val) => val.length > 10,
  (val) => ({ message: `${val} is not more than 10 characters` })
);
```

#### Customize error path

```ts
const passwordForm = z
  .object({
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  })
  .parse({ password: "asdf", confirm: "qwer" });
```

因为你提供了一个`路径(path)`参数，产生的错误将是:

```ts
ZodError {
  issues: [{
    "code": "custom",
    "path": [ "confirm" ],
    "message": "Passwords don't match"
  }]
}
```

#### Asynchronous refinements

细化也可以是异步的:

```ts
const userId = z.string().refine(async (id) => {
  // verify that ID exists in database
  return true;
});
```

> ⚠️ 如果你使用异步细化，你必须使用`.parseAsync`方法来解析数据! 否则 Zod 会抛出一个错误。

#### Relationship to transforms

变换(transforms)和细化(refinements)可以交错进行:

```ts
z.string()
  .transform((val) => val.length)
  .refine((val) => val > 25);
```


### `.superRefine`

`.refine`方法实际上是在一个更通用的（也更啰嗦）的`superRefine`方法之上的语法糖。下面是一个例子:

```ts
const Strings = z.array(z.string()).superRefine((val, ctx) => {
  if (val.length > 3) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      maximum: 3,
      type: "array",
      inclusive: true,
      message: "Too many items 😡",
    });
  }

  if (val.length !== new Set(val).size) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `No duplicated allowed.`,
    });
  }
});
```

你可以随心所欲地添加问题(issues)。如果`ctx.addIssue`在函数的执行过程中没有被调用，则验证通过。

通常情况下，细化总是创建具有`ZodIssueCode.custom`错误代码的问题，但通过`superRefine`你可以创建任何代码的任何问题。每个问题代码在错误处理指南 [ERROR_HANDLING.md](ERROR_HANDLING.md) 中都有详细描述。

### `.transform`

要在解析后转换数据，请使用`transform`方法。

```ts
const stringToNumber = z.string().transform((val) => myString.length);
stringToNumber.parse("string"); // => 6
```

> ⚠️ 转化函数不得抛出。确保在转化器之前使用细化功能，以确保输入可以被转化器解析。

#### Chaining order

注意，上面的`stringToNumber`是`ZodEffects`子类的一个实例。它不是`ZodString`的实例。如果你想使用`ZodString`的内置方法（例如`.email()`），你必须在进行任何转换 _之前_ 应用这些方法。

```ts
const emailToDomain = z
  .string()
  .email()
  .transform((val) => val.split("@")[1]);

emailToDomain.parse("colinhacks@example.com"); // => example.com
```

#### Relationship to refinements

转换和细化可以交错进行:

```ts
z.string()
  .transform((val) => val.length)
  .refine((val) => val > 25);
```

#### Async transformations

转换也可以是异步的。

```ts
const IdToUser = z
  .string()
  .uuid()
  .transform(async (id) => {
    return await getUserById(id);
  });
```

> ⚠️ 如果你的模式包含异步变换器，你必须使用.parseAsync()或.safeParseAsync()来解析数据。否则，Zod 将抛出一个错误。

### `.default`

你可以使用变换器来实现 Zod 中 "默认值 "的概念。

```ts
const stringWithDefault = z.string().default("tuna");

stringWithDefault.parse(undefined); // => "tuna"
```

你可以选择在`.default`中传递一个函数，当需要生成默认值时，该函数将被重新执行:

```ts
const numberWithRandomDefault = z.number().default(Math.random);

numberWithRandomDefault.parse(undefined); // => 0.4413456736055323
numberWithRandomDefault.parse(undefined); // => 0.1871840107401901
numberWithRandomDefault.parse(undefined); // => 0.7223408162401552
```

### `.optional`

一个方便的方法，返回一个模式的可选版本。

```ts
const optionalString = z.string().optional(); // string | undefined

// equivalent to
z.optional(z.string());
```

### `.nullable`

一个方便的方法，返回一个模式的可空版本。

```ts
const nullableString = z.string().nullable(); // string | null

// equivalent to
z.nullable(z.string());
```

### `.nullish`

一个方便的方法，用于返回模式的 "nullish "版本。空白模式将同时接受`undefined`和`null`。阅读更多关于 "nullish "的概念[这里](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing).

```ts
const nullishString = z.string().nullish(); // string | null | undefined

// equivalent to
z.string().nullable().optional();
```

### `.array`

一个方便的方法，为给定类型返回一个数组模式:

```ts
const nullableString = z.string().array(); // string[]

// equivalent to
z.array(z.string());
```

### `.or`

一个用于联合类型的方便方法。

```ts
z.string().or(z.number()); // string | number

// equivalent to
z.union([z.string(), z.number()]);
```

### `.and`

一个方便的方法，用于创建交叉类型。

```ts
z.object({ name: z.string() }).and(z.object({ age: z.number() })); // { name: string } & { age: number }

// equivalent to
z.intersection(z.object({ name: z.string() }), z.object({ age: z.number() }));
```

# Type inference

你可以用`z.infer<typeof mySchema>`提取任何模式的 TypeScript 类型。

```ts
const A = z.string();
type A = z.infer<typeof A>; // string

const u: A = 12; // TypeError
const u: A = "asdf"; // compiles
```

#### What about transforms?

在现实中，每个 Zod 模式实际上都与**两种**类型相关：一个输入和一个输出。对于大多数模式（例如`z.string()`），这两种类型是相同的。但是一旦你把转换添加到混合中，这两个值就会发生分歧。例如，`z.string().transform(val => val.length)`的输入为`string`，输出为`number`。

你可以像这样分别提取输入和输出类型:

```ts
const stringToNumber = z.string().transform((val) => val.length);

// ⚠️ Important: z.infer返回OUTPUT类型!
type input = z.input<stringToNumber>; // string
type output = z.output<stringToNumber>; // number

// equivalent to z.output!
type inferred = z.infer<stringToNumber>; // number
```

# Errors

Zod 提供了一个名为 `ZodError` 的错误子类。ZodErrors 包含一个`issues` 数组，包含关于验证问题的详细信息。

```ts
const data = z
  .object({
    name: z.string(),
  })
  .safeParse({ name: 12 });

if (!data.success) {
  data.error.issues;
  /* [
      {
        "code": "invalid_type",
        "expected": "string",
        "received": "number",
        "path": [ "name" ],
        "message": "Expected string, received number"
      }
  ] */
}
```

#### Error formatting

你可以使用`.format()`方法将这个错误转换为一个嵌套对象。

```ts
data.error.format();
/* {
  name: { _errors: [ 'Expected string, received number' ] }
} */
```

