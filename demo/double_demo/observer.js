function defineReactive(data, key, val) { // 用于为每个属性绑定新事件
  observe(val); // 递归遍历所有对象中的子对象
  var dep = new Dep(); // 定义一个新的Dep订阅器实例
  Object.defineProperty(data,key,{
    enumerable: true, // 可枚举
    configurable: true, // 可配置
    get() {
      console.log(val,"被访问啦");
      // 在为每个绑定getter方法的时候也进行判断
      if (Dep.target) { // 通过判断是否有缓存watcher 从而决定是否需要添加订阅者 
        dep.addSub(Dep.target); // 在这里添加一个订阅者
      }
      return val;
    },
    set(newVal) {  // newVal是新数据
      if (val === newVal) { // 用于判断数值是否发生变动
        return; // 如果没变动则会停止
      } 
      val = newVal; // 如果数值发生变动则将新数据赋值给旧值从而更新数据
      console.log('属性' + key + '已经被监听了，现在值变为：“' + newVal.toString() + '”');
      dep.notify(); // 如果数据变化，通知所有订阅者
    }
  })
}

function Dep () {
  this.subs = [];
}
Dep.target = null;

Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub);
  },
  notify() {
    this.subs.forEach(function(sub){
      sub.update();
    })
  }
}

function observe(data) { // 监听器，data为需要被监听的对象
  if(!data || typeof data !== 'object') return; // 判断是否是对象，因为需要监听的是对象的属性
  Object.keys(data).forEach(function(key) { // Object.keys获得data对象的由键名组成的数组并且forEach
    defineReactive(data, key, data[key]);
  });
}

// 例子：
// var library = {
//     book1: {
//       name:''
//     },
//     book2:''
// }
// observe(library); // 开始监听该对象
// library.book1.name = 'vue权威指南'; // 属性name已经被监听了，现在数值为："vue权威指南"
// library.book2 = '没有此书籍'; // 属性book2已经被监听了，现在值为"没有此书籍"