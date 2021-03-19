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

  - 可以让本地分支与对应的远程分支建立起映射，这样可以直接git pull/push
  ```
    git checkout -b dev(本地分支名称) origin/dev(远程分支名称)
  ```

  - 建立‘孤立’的分支
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

  - 解除当前的本地分支与远程分支的关联
  ```
    git branch --unset-upstream 
  ```