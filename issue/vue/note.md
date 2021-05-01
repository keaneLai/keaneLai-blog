# 关于 Vue 的笔记

- store 中的 getters 的设置
  > 首先解释一下 getters 的含义：
  > store 中的 getters 就相当于 vue 实例中的 computed，
  > store 中使用模块注册，如果模块中设置 getters 是无法注册到全局 store 中的，
  > 需要单独创建一个 getters 文件，然后在 store 全局注册的文件中配置 getters，
  > 然后在 vue 文件中使用 mapGetters 来调用 getters 中的属性，如下例子：

```
import { mapGetters } from 'vuex';
computed: {
  ...mapGetters({
    xxx: '',
  });
},
```
