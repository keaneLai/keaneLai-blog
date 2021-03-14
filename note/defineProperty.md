[关于defineProperty的文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

# Object.defineProperty

定义：该方法会直接在一个对象上**定义**一个新属性，或者**修改**一个对象的现有属性，并返回此对象。

描述：该方法允许精确地添加或修改对象的属性。通过赋值操作添加的普通属性是可枚举的，在枚举对象属性时会被枚举到（[`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 或 [`Object.keys`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)[ ](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys)方法），可以改变这些属性的值，也可以[`删除`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete)这些属性。这个方法允许修改默认的额外选项（或配置）。默认情况下，使用 `Object.defineProperty()` 添加的属性值是不可修改（immutable）的。

语法：Object.defineProperty(obj, prop, descriptor)

语法解释：

1. 第一个参数：obj => 要定义属性的**对象**
2. 第二个参数：prop => 要定义或修改的属性的**名称**或 [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 。
3. 第三个参数：descriptor => 要定义或修改的**属性描述符**。

例子：

> Object.defineProperty(object1, 'property1', {
> value: 42,
> writable: false
> });

例子分析：一个对象叫做：object1 , 如果该对象没有第二参数数值对应的属性，则是定义新属性反之修改，该例子中则是定义新属性property 。

对象里目前存在的属性描述符有两种主要形式：

1. 数据描述符
2. 存取描述符。

- 数据描述符是一个具有值的属性，该值可写/不可写。
- 存取描述符是由 getter 函数和 setter 函数所描述的属性。

一个描述符只能是这两者其中之一！不能同时是两者！。



这两种描述符都是对象。它们共享以下可选键值（默认值是指在使用 `Object.defineProperty()` 定义属性时的默认值）：

- `configurable`

  当且仅当该属性的 `configurable` 键值为 `true` 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。 **默认为** **`false`**。

- `enumerable`

  当且仅当该属性的 `enumerable` 键值为 `true` 时，该属性才会出现在对象的枚举属性中。 **默认为 `false`**。

数据描述符还具有以下可选键值：

- `value`

  该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。

- `writable`

  当且仅当该属性的 `writable` 键值为 `true` 时，属性的值，也就是上面的 `value`，才能被[`赋值运算符`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)改变。 **默认为 `false`。**

存取描述符还具有以下可选键值：

- `get`

  属性的 getter 函数，如果没有 getter，则为 `undefined`。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 `this` 对象（由于继承关系，这里的`this`并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。

- `set`

  属性的 setter 函数，如果没有 setter，则为 `undefined`。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 `this` 对象。 **默认为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**。

#### 描述符默认值汇总

- 拥有布尔值的键 `configurable`、`enumerable` 和 `writable` 的默认值都是 `false`。
- 属性值和函数的键 `value`、`get` 和 `set` 字段的默认值为 `undefined`。

#### 描述符可拥有的键值

![](img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202020-11-28%20164556.png)