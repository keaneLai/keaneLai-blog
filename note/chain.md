# 原型链

原型链的完整关系图：  
![原型链](../img/chain.png)

## prototype

- demo 是一个构造函数

```
function Person {

}
Person.prototype.name = 'Kevin';
var person1 = new Person();
var person2 = new Person();
console.log(person1.name) // Kevin
console.log(person2.name) // Kevin
```

> 然后函数都有一个特性：含有 prototype 属性，而 prototype 指向的就是实例原型，
> 也就是通过实例化出来的实例的原型，那么实例要怎么指向这个原型呢？

## proto

- 每个 javascript 对象都具有的一个属性，叫**proto**，这个属性会指向该对象的原型，可以通过代码表示：
  ```
  console.log(person.proto = Person.prototype;); // true
  ```

## constructor

**每个原型都有一个 constructor 属性指向关联的构造函数**  
首先是 constructor 属性，我们看个例子：

```
function Person() {

}
var personObj = new Person();
console.log(Person === Person.prototype.constructor); // true
console.log(personObj.constructor === Person); // true
```

> 当获取 personObj.constructor 时，其实 personObj 中并没有 constructor 属性,当不能读取到 constructor 属性时，会从 personObj 的原型也就是 Person.prototype 中读取，正好原型中有该属性，所以：

```
personObj.constructor === Person.prototype.constructor
```
