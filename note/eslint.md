# Eslint 的各种功能

- 当遇到 **Unexpected console statement.eslint** 问题时  
  可以在 package.json 中的 eslintConfig:{} 中的 “rules”:{} 添加一行代码: “no-console”:“off”

```
  "eslintConfig": {
    "rules": {
      "no-console": "off"
    }
  }
```
