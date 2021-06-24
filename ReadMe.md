# 开始
1. 开启mongodb, 在cmd中测试
    - mongod开启
    - 测试是否打开: mongo -u username -p pwd    
2. 确认已经下载了nodejs
3. 在主目录下运行
    - npm i
4. 修改配置文件:
    - config文件夹下有三个文件，分别为: 开发、生产、测试环境
        - 根据上图的情况修改db对象中的user和pwd
5. 创建用户:
    - model文件夹下的user.js
    - 82-83行, 取消注释, 并根据自己需求修改
6. 安装完成后, 打开cmd, 输入指令：
    - 开发环境: npm run dev
    - 生产环境: npm run start
    - 测试环境: npm run test
    - 云数据库环境: npm run heroku
7. config -> heroku.json
    - mongodbCloud
        - url: 数据库地址
        - user: 登录账户
        - pwd: 密码

# 测试
目前有2种页面: 展示(home)和管理(admin)
- http://127.0.0.1:81/home
    - 展示页面中可以看到发出去的文章
    - 没有文章时, 会比较慢
- http://127.0.0.1:81/admin
    - 管理页面中可以添加账户
    - 添加文章
    - 文章管理
    - 初始化的管理员
        - 账号: fwx@123.com
        - 密码: fwx
        - 如果需要更改, 修改 config -> heroku.json里18-20行内容 

# 注意
- start.cmd文件目前会运行云数据库版本环境

# 2021/6/21 文件替换
根目录:
- package.json
- ReadMe.md
- start.cmd
- app.js
model:
- connect.js
- user.js
config:
- heroku.json 新增
- production.json
- test.json
- development.json

# Heroku 部署

1. `heroku login -i`
   - 'mail'
   - `pwd`
2. `heroku create sample`
   - 记录`url`
3. `git init`
4. `git add .`
5. `git commit -am "init"`
6. `git remote set-url heroku <url>`
7. `git push heroku master`
8. `heroku logs`
   - 观察是否出现400，`blank app`等
9. `heroku restart`
10. `heroku ps`

