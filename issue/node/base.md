# Node 入门

1. 什么是 Node

> 个人认为 node 就是一个 js 文件的运行环境
>
> - 基于 Chrome 浏览器也在用的 V8 引擎
> - 单进程无线程
> - 异步 IO 非阻塞

2. Node 的基础命令常识

> 在建立一个 js 文件之后，在命令行内输入 node 后面拼上 js 文件名称，就可以直接执行改 js 文件。

3. 读取 node 命令行所携带的参数

> ```
> **test.js**
> let port = 3000;
> let env = 'test';
> let logLevel = 'log';
> if (argv['port']) port = argv('port');
> if (argv['env']) env = argv('env');
> if (argv['logLevel']) logLevel = argv('logLevel');
> 命令行输入： node test.js --port=3000 -env=test
> 输出：
> ```
