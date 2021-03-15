function Compile(el, vm) {
  this.vm = vm;
  this.el = document.querySelector(el);
  this.fragment = null;
  this.init();
}
Compile.prototype = {
  init() {
      if (this.el) {
          this.fragment = this.nodeToFragment(this.el);
          this.compileElement(this.fragment);
          this.el.appendChild(this.fragment);
      } else {
          console.log('Dom元素不存在');
      }
  },

  // Vue对象将根元素id：el 传进来，就找到了需要渲染的部分
  // 然后通过createDocumentFragment()方法创建了documentFragment即文档片段
  // 然后遍历根元素内的所有子元素，依次劫持（当把Dom树中的节点插入文档片段的时候，这些节点会从Dom树中消失，也称之为劫持）并插入文档片段中
  // 直到将根元素掏空（即根元素没有子元素），Vue就可以开始编译，循环遍历文档片段中的节点，对其中的vue指令进行相应的处理，然后将编译完成后的文档片段appendChild到根元素中
  nodeToFragment(el) { 
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;  // 获得根元素中的第一个子元素
    while(child) { // 判断根元素是否还有第一个子元素
      // 将Dom元素插入文档片段fragment
      fragment.appendChild(child);  // 插入即劫持之后，当前的第一个元素就会消失于Dom树中
      child = el.firstChild;  // 此时就是将新的第一个元素重新赋值给child 
    }
    return fragment;  // 返回插满子元素的文档片段从而进行编译处理
  },

  compileElement(el) {
    var childNodes = el.childNodes;
    console.log(childNodes);
    var self = this;
    // [].slice.call(childNodes) 意思就是让childNodes对象列表调用数组中的原型方法slice
    // 从而变成子元素数组，然后再遍历每个子元素
    [].slice.call(childNodes).forEach(function(node) {   // node就是根元素下的子元素们
      var reg = /\{\{\s*(.*?)\s*\}\}/;  // 匹配出{{}}的格式
      var text = node.textContent;  // 获得当前循环中子元素的文本内容
      if(self.isElementNode(node)) {
        self.compile(node);
      }
      else if(self.isTextNode(node) && reg.test(text)) {
        // 第一个条件：需要知道是否为文本元素
        // 第二个条件：文本内容是否符合这种形式{{}}的指令
        console.log("匹配成功");
        self.compileText(node,reg.exec(text)[1]); // 满足则解析指令
      }

      if(node.childNodes && node.childNodes.length) {
        self.compileElement(node);  // 在循环子元素时若是发现还有子元素包裹在内则需要再次调用编译进行递归操作直到每个元素内都没有子元素
      }
    });
  },
  compile(node) {
    var nodeAttrs = node.attributes; // 用于获取当前元素标签属性的数组列表
    var self = this;
    Array.prototype.forEach.call(nodeAttrs,function(attr) { // 让数组列表运用数组的通用方法forEach从而遍历标签属性数组
      var attrname = attr.name; // 例如 元素上有v-model="price" 则会获得 v-model
      if(self.isDirective(attrname)) {
        var exp = attr.value;
        var dir = attrname.substring(2);
        if(self.isEventDirective(dir)) self.compileEvent(node, self.vm, exp, dir); // 事件指令
        else self.compileModel(node, self.vm, exp, dir);
        node.removeAttribute(attrname);
      }
    });
  },
  // 先针对编译{{变量}} 这种形式的指令进行处理
  compileText(node, exp) {  // node就是拥有该形式指令的子元素，exp则是变量名
    var self = this;
    var initText = this.vm[exp];
    console.log(initText);
    this.updateText(node, initText); // 将初始化的数据初始化到视图中
    new Watcher(this.vm, exp, function(value) {
      self.updateText(node, value);
    });
  },
  compileEvent: function (node, vm, exp, dir) {
    var eventType = dir.split(':')[1];
    var cb = vm.methods && vm.methods[exp];

    if (eventType && cb) {
        node.addEventListener(eventType, cb.bind(vm), false);
    }
  },
  compileModel: function (node, vm, exp, dir) {
      var self = this;
      var val = this.vm[exp];
      this.modelUpdater(node, val);
      new Watcher(this.vm, exp, function (value) {
          self.modelUpdater(node, value);
      });

      node.addEventListener('input', function(e) {
          var newValue = e.target.value;
          if (val === newValue) {
              return;
          }
          self.vm[exp] = newValue;
          val = newValue;
      });
  },
  updateText(node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  },
  modelUpdater: function(node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value;
  },
  isDirective: function(attr) {
      return attr.indexOf('v-') == 0;
  },
  isEventDirective: function(dir) {
      return dir.indexOf('on:') === 0;
  },
  isElementNode: function (node) {  // 判断是否是元素
      return node.nodeType == 1;
  },
  isTextNode(node) {  // 判断是否是元素或属性中的文本内容
    return node.nodeType == 3;
  }
}