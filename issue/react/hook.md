# React 的 Hook 使用

1. 为什么要用 Hook?
  - 针对于不使用 hook 的情况下，除了 Class 类组件，能够存储组件状态，而 function 函数组件无法存储组件状态，只能通过外部传入的 props 来控制 UI 的变化，  
  所以为了能够统一的实现组件状态的修改，我们可以选择引入 Hook，Hook 是 React 引入的新特性；个人理解其用处主要在于
    > **注意**: 可忽略生命周期函数的编写，函数组件可实现公共状态的管理，更加有效的完成副作用的实现。

在项目当中，最常用的 hook 就是以下几个：

- useState: 主要用于公共状态的定义以及数值更改。其用法如下：

  ```
  useState(`初始值`)
  const [isLoading, setIsLoading] = useState(false);
  ```

  首先定义了一个新变量：isLoading，然后定义了一个专门更新 isLoading 数值的方法：setIsLoading

- useEffect: 主要用于监听变量的变化从而进行副作用的操作，其用法如下：

  ```
  useEffect(`副作用函数`,`依赖项数组`);
  useEffect(() => {

  }, [dependence]);
  ```

  首先第一个参数是副作用函数，里面主要用于实现副作用的逻辑功能，也就是调用 API 即网络请求,dom 操作等等；

  > **注意**: 副作用有一个执行过程和一个可选的清除过程，副作用函数定义了执行过程，它的返回值函数定义了清除过程.

  而第二个参数就是依赖项，通俗来说就是你把通过 useState 定义好的变量写入这个依赖项，那么这个 useEffect 就会监听这个变量，只要发生任何数值变化，就会再次调用副作用函数。

  > **注意**：Hook 有个常用的方法就是依赖项为空，这样的写法就是实现当前组件在初始化 render 的时候会调用一次 useEffect，之后就不会再次调用。

- useRef: 主要用于获取特定标签的 dom 元素，其用法如下：

  ```
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.focus();
  }, []);

  return (
    <>
      <input name="xxx" ref={inputRef}>
    <>
  );
  ```

  首先使用 useRef(null) 初始化一个 ref 实例，然后再将这个实例赋值给特定的标签的 ref 属性上，这样就相当于该实例绑定上了特定标签的 dom 元素

  > 常见栗子：需要在跳转到某一个页面时，当前页面的输入框需要自动聚焦，那么在这时候可以使用这个 useRef 从而实现自动聚焦。

- useContext: 在子组件中可以获得最外层传递的变量，而useContext(`context`)，参数是通过createContext函数全局创建的上下文常量
```
// 创建一个 context
const Context = createContext(0)
// 组件一, Consumer 写法
class Item1 extends PureComponent {
  render () {
    return (
      <Context.Consumer>
        {
          (count) => (<div>{count}</div>)
        }
      </Context.Consumer>
    )
  }
}
// 组件二, contextType 写法
class Item2 extends PureComponent {
  static contextType = Context
  render () {
    const count = this.context
    return (
      <div>{count}</div>
    )
  }
}
// 组件一, useContext 写法
function Item3 () {
  const count = useContext(Context);
  return (
    <div>{ count }</div>
  )
}
function App () {
  const [ count, setCount ] = useState(0)
  return (
    <div>
      点击次数: { count } 
      <button onClick={() => { setCount(count + 1)}}>点我</button>
      <Context.Provider value={count}>
        <Item1></Item1>
        <Item2></Item2>
        <Item3></Item3>
      </Context.Provider>
    </div>
    )
}
```