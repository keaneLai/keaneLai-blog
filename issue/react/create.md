# **React 从 0 到 1 的项目搭建以及技术分享**

### 搭建方式有两种

- 通过官方提供的方法搭建
- 通过 node.js、koa、minimist、实现自定义搭建

1. 通过官方提供的方法搭建

   - npx create-react-app my-app
   - npm init react-app my-app
   - yarn create react-app my-app

<div style="text-align:left;"><img src="https://docimg1.docs.qq.com/image/10s5w49xeCm5NOb3IjaVyA?w=359&h=373"></div>

上图就是通过 create-react-app 创建的 react 项目文件结构

### **通过自定义手动搭建 react+Ts 项目**

1. 通过以下命令初始化项目

```
npm init (-y)
```

解析： 首先是需要通过 npm 这个 node 包管理工具（node package manager）的命令：npm init 来初始化 node 项目，也便于以后的各种各样的工具依赖包引入以及 webpack 打包神器的引入。-y 的用途是 直接默认 package.json 的基础配置信息，如下：

```
{
  "name": "reactts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

2.  解析自定义项目的目录结构

    ![](C:\Users\V_Jweolai\Desktop\reactTs\pic1.png)

    1. config (整个项目的配置文件存放路径):

       1.1 **babelrc.js**： （rc 结尾的文件通常代表**运行时自动加载的文件**）

       - 官方说法： babel 是一种 js 语法编译器，由于浏览器的版本和兼容性问题，很多 js 的新方法和特性的使用都受到了限制。使用 babel 可以将代码中 js 代码编译成兼容绝大多数主流浏览器的代码。

       - 通俗来说：就是浏览器有些旧，兼容性不太好，导致看不懂 js 一些新奇有趣的用法，就用 **babel** 把将那些有趣的用法换成他们能看懂的语法。

         > **官方说明： babel6.X 版本后，所有的插件都是可插拔的，也就是只安装 babel 依然无法正常的工作，需要配置对应的.babelrc 文件才能起作用。**

         - .babelrc 文件需要的配置项主要有预设(presets)和插件(plugins)。

           - presets 字段是用来设定**转码规则** （也可以称为转译器）
             1. 语法转译器：主要是针对 JS 最新的语法糖进行转译，常见常用的转译器包是 ：babel-preset-env
             2. jsx 和 flow 插件：主要用于转译 JSX 语法和移除类型说明，使用 React 时需要用到这个：babel-preset-react

           * plugins 字段是用来配置插件

             1. plugin-transform-runtime： 使用 transform-runtime 后，可以减少内部全局函数的定义，从结构上看尊崇了 webpack 的模块化思想

             2. plugin-proposal-class-properties：主要用于编译类，默认后面的参数时 {”loose“: false}，区别不太好说明白。

             3. plugin-proposal-export-default-from：该插件主要是编译 ES6 中的导入导出语法，因为 node 是基于 CommonJS 的机制，所以如果需要使用 es6 的导入导出语法，需要导入该插件。

                ```
                module.exports = {
                  plugins: [
                    'lodash',
                    '@babel/plugin-transform-runtime',
                    '@babel/plugin-proposal-class-properties',
                    '@babel/plugin-proposal-export-default-from',
                  ],
                  presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                  ],
                };
                ```

             1.2 **eslintrc.js**：（该文件主要是关于 ESlint 的一些配置）

         - parser 字段是用来指定让 ESLint 使用自定义的解析器： **@typescript-eslint/parser** （用于解析 typescript，从而检查和规范 Typescript 代码）
         - plugins 字段是用于定义该 ESlint 文件所依赖的插件： **@typescript-eslint**（里面包含了各类定义好的用于检测 TS 代码的规范）
         -
