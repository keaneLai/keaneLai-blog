# JS常用方法

## 1.forEach()

- array.forEach( function( currentValue, index, arr ) , thisValue )。

描述：

- forEach() 方法用于调用数组的每个元素，`并将元素传递给回调函数`。

  > **注意:  forEach() 对于空数组是不会执行回调函数的；改变原数组。**

| 参数                                 | 描述                                                         |
| :----------------------------------- | :----------------------------------------------------------- |
| *function(currentValue, index, arr)* | 必需。 数组中每个元素需要调用的函数。 函数参数:参数描述*currentValue*必需。当前元素*index*可选。当前元素的索引值。*arr*可选。当前元素所属的数组对象。（**参数如下表**） |
| *thisValue*                          | 可选。传递给函数的值一般用 "this" 值。 如果这个参数为空， "undefined" 会传递给 "this" 值 |

| 参数           | 描述                           |
| :------------- | :----------------------------- |
| *currentValue* | 必需。当前元素                 |
| *index*        | 可选。当前元素的索引值。       |
| *arr*          | 可选。当前元素所属的数组对象。 |

例子：
```
var arr = [1, 2, 3, 4, 5];

arr.forEach(function (item) {
    if (item === 3) {
    	return;
    }

console.log(item);
});
```


## 2.some()

- array.some(function(currentValue,index,arr),thisValue)

描述：

- some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
- some() 方法会依次执行数组的每个元素：
- 如果有一个元素满足条件，则表达式返回*true* , 剩余的元素不会再执行检测。
- 如果没有满足条件的元素，则返回false。

> **注意： some() 不会对空数组进行检测。some() 不会改变原始数组。**

| 参数                                | 描述                                                         |
| :---------------------------------- | :----------------------------------------------------------- |
| *function(currentValue, index,arr)* | 必须。函数，数组中的每个元素都会执行这个函数 函数参数: 参数描述*currentValue* **必须**。当前元素的值*index*可选。当前元素的索引值*arr*可选。当前元素属于的数组对象 |
| *thisValue*                         | 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。 如果省略了 thisValue ，"this" 的值为 "undefined" |

例子：

```
var ages = [4, 12, 16, 20];

function checkAdult(age) {	// 相当于遍历数组
	return age >= 19;	// 如果返回true则证明数组中有大于19的数值，只需要有一个满足。
}

ages.some(checkAdult);
```

**注意：every()需要数组的全部数值都满足才能够返回true**



## 3.Object.keys

**1.处理对象，返回可枚举的属性数组**

```
let person = {name:"张三",age:25,address:"深圳",getName:function(){}} Object.keys(person)   =>  ["name", "age", "address","getName"]
```

2.**处理数组，返回索引值数组**

```
let arr = [1,2,3,4,5,6]; Object.keys(arr)  =>  ["0", "1", "2", "3", "4", "5"]
```


4.Map

- array.map(function(currentValue,index,arr), thisValue)

描述：

- map() 方法**返回一个新数组**，数组中元素为原始数组元素调用函数处理后的值。
- map() 方法按照原始数组元素顺序依次处理元素。

> **注意：map() 不会对空数组进行检测。**
>
> **注意： map() 不会改变原始数组。**

例子：

```
var numbers = [4, 9, 16, 25];

numbers.map(Math.sqrt);
```


**4.New**

描述：使用New是构造函数，不使用New是函数调用，同时this指向不同。

实例：

```
function Test(name, age, job) {

　　console.log(this);

　　this.name = name;

　　this.age = age;

　　this.job = job;

}
```

1. **直接调用函数**：var test1 = Test('Tom', 27, 'IT');  那么test1的输出则是 **undefined**

> **其直接调用上下文指向是window**



1. **使用new构造函数**：var test2 = new Test('Tom', 27, 'IT'); test2 的输出则是：**Test{ name: "Tom", age:27, job: "IT"}**

> **注意**：**new会使执行函数的上下文指向这个函数的本身。**

**概括**：**如果函数返回值为常规意义上的值类型（Number、String、Boolean）时，new 函数将会返回一个该函数的实例对象，而如果函数返回一个引用类型（Object、Array、Function），虽然new函数与直接调用函数产生的结果等同，但是是两个不同的过程，一个是构造对象、一个是函数调用。**