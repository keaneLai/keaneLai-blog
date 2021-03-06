# Git的常用命令：
- 处于主分支 master ,可以通过以下命令创建远程仓库的别名
```
  git remote add origin http://`username`:`password`@...git
  git pull origin master
```
> 结果：让本地仓库与远程仓库建立联系

- 在本地创建新分支dev作为本地分支并且切换到dev分支
```
  git checkout -b dev 
```

- 建立'孤立'的分支
```
  git checkout --orphan latest_branch
```

- window: 禁止 git 自动将 lf 转换成 crlf
```
  git config --global core.autocrlf false
  git config --global -l
```

- 更新远程分支列表
```
  git remote update origin --prune
```

- 将当前更改进行存储
```
git stash
```

- 将之前存储的更改进行释放
```
  git stash pop
```

- 可以让本地分支与对应的远程分支建立起映射，这样可以直接git pull/push
```
  git branch --set-upstream-to origin/dev(远程分支名称) dev(本地分支名称)
```

- 解除当前的本地分支与远程分支的关联
```
  git branch --unset-upstream
```

- 查看分支与远程分支关联的所有列表
```
  git branch -vv
```
- 查看所有分支（包含本地分支和远程分支）列表
```
  git branch -a
```

- 查看当前分支的所有commit信息（美化过的单行commit）
```
  git log --pretty=oneline
```
