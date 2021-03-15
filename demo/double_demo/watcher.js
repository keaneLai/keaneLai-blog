function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  this.value  =this.get(); // 将自己添加到订阅器的操作
}

Watcher.prototype = {
  update() {
    this.run(); // 收到数据变动则发送通知给订阅者，然后就会执行run()从而更新视图
  },
  run() {
    var value = this.vm.data[this.exp];
    var oldVal = this.value;
    if(value !== oldVal) {
      this.value = value;
      // 第一个参数是对象，call() -> 是让第一个参数对象去调用this.cb方法，而后面的参数则是添加的参数
      this.cb.call(this.vm,value,oldVal); 
    }
  },
  get() {
    Dep.target = this; // 缓存自己
    var value = this.vm.data[this.exp]; // 强制执行监听器Observer里的get函数
    Dep.target = null; // 释放自己,主要是为了防止内存占位
    return value;
  }
}