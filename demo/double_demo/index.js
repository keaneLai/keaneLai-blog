// prototype是函数独有的属性，作用就是让该函数所实例化的对象们都可以找到公用的属性和方法
// 在这里相当于为每个对象添加一个新的公共方法
SelfVue.prototype = {
  proxyKeys:function(key) {
    var self = this;
    Object.defineProperty(this, key, {  // 每个对象都修改该get和set方法，让实例对象不需要通过调用data来获取属性
      enumerable: false,
      configurable: true,
      get(){
        // 例子：var selfVue = new SelfVue(); selfVue则是实例化对象，而本身get()方法是return val 则是返回该对象
        // 那么获取该实例对象的name值时需要selfVue.data.name, 那么我们就修改get()方法，通过传递参数'name', 然后把 selfVue = selfVue.data 替换，则返回的就是selfVue.data
        // 那么调用的时候 selfVue 就相当于 selfVue.data ，那selfVue.name 就等于 selfVue.data.name
        return self.data[key];  
      },
      set(newVal) {
        self.data[key] = newVal;
      }
    });
  }
}

function SelfVue (options) {  // data是实例中的data对象，el则是挂载的id名，exp就是需要监听的属性即'name'
  var self = this;  // 每个对该函数实例化的对象
  this.vm = this;
  this.data = options.data; // 为SelfVue新实例添加了data属性
  this.methods = options.methods; // 为SelfVue新实例添加了methods属性

  Object.keys(this.data).forEach(function(key) {
    self.proxyKeys(key);  // 对象们使用公共方法，绑定代理属性
  });

  observe(this.data);  // 监听data对象
  new Compile(options.el,this.vm);
  options.mounted.call(this); // 所有事情处理好后执行mounted函数
  
  // el.innerHTML = this.data[exp];  // 初始化模板数据的值
  // new Watcher(this, exp, function (value) { 
  //   // 初始化监听者
  //   // 1.this指向当前实例
  //   // 2.exp则是'name'
  //   // 3.第三个参数则是自定义函数：用于将新数据展示到页面实现页面更新
  //   el.innerHTML = value;
  // });
  // return this;
}
