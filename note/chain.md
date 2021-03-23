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
