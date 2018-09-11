
# easy-node
基于 Koa2 & pm2 的脚手架


可以直接在项目里使用 ES6/7（Generator Function, Class, Async & Await）等特性，借助 Babel 编译，可稳定运行在 Node.js 环境上。

## Init

通过 npx 命令自动生成脚手架

``` bash
npx enode-cli
```
or

``` bash
npx enode-cli <folder name>
```
*([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher
Run ```npm i -g npm``` to update

## Getting Start

进入脚手架目录执行:

``` bash
npm install
npm start
```
然后通过 [http://localhost:7709/](http://localhost:7709/) 访问本地服务即可

## Npm scripts

#### 1、启动进程（测试、生产、灾备模式的启动命令，用于提供给运维人员进行不同环境的部署）

```bash
npm start           # 开发模式
npm run start:test  # 测试模式
npm run start:prd   # 生产模式
npm run start:dr    # 灾备模式
```

#### 2、停止进程

```bash
npm run stop
```

#### 3、查看运行日志（所有console可以在这里看到）

```bash
npm run logs
```

#### 4、其他命令说明

```bash
npm run ls          # 查看进程列表
npm run i:log       # 日志切割工具安装
npm run uni:log     # 日志切割工具卸载
npm run pm2:update  # 升级 pm2
npm run clean       # 清空 编译出来的 app 文件夹
npm run build       # 将项目测试后打包编译到 app 文件夹
npm test            # 单元测试
npm run compile     # 编译
```

该脚手架进程管理使用pm2，所有 pm2 命令需要在 package.json 的 scripts 属性中配置，后使用 npm run xxx 执行；

[更多 pm2 命令请查看官方中文文档](https://pm2.io/doc/zh/runtime/reference/pm2-cli/)

## 日志管理

日志默认存放于用户目录 ``$HOME/app-logs/outerr.log``；
<br />
项目首次部署会自动通过 npm install 安装日志切割插件 pm2-logrotate（防止日积月累，日志文件越来越大所以需要切割）, 若 npm 不通请使用代理；

#### pm2-logrotate 默认配置：
* 日志单个文件限制大小为 10M, 超过则被切割
* 日志文件数限制 30 个, 超过则被删除
* 切割出来的日志文件命名格式为 'outerr__YYYY-MM-DD_HH-mm-ss.log' 
* 日志会在每日凌晨 0 点 0 分 根据上一条命名规则执行切割

## 启动配置说明

启动配置文件为存放于项目目录下的``pm2.config.js``文件；

#### 配置文件中声明变量说明：

* ``$HOME``: 服务器用户目录
* ``dr``: 灾备环境时为 ``true``
* ``prd``: 生产环境时为 ``true``
* ``test``: 测试环境时为 ``true``
* ``dev``: 开发环境时为 ``true``

#### 配置文件配置说明：

* ``apps`` : 需要启动的应用列表
* ``name`` : 应用名称
* ``instances``: 进程数量
* ``log``: 日志存放路径
* ``env``: 开发环境变量
* ``env_test``: 测试环境变量
* ``env_prd``: 生产环境变量
* ``env_dr``: 灾备环境变量

[更多配置属性请查看官方中文文档](https://pm2.io/doc/zh/runtime/reference/ecosystem-file/)

#### 环境变量说明：

环境变量属性内部配置的任意属性，都能在应用中通过``process.env``对象访问

```js
      env: {
        NODE_ENV: 'development',
        PORT: '7709',
        HOST: 'www.development.com'
      },
      env_test: {
        NODE_ENV: 'test',
        PORT: '7709',
        HOST: 'www.test.com'
      },
      env_prd: {
        NODE_ENV: 'production',
        PORT: '7709',
        HOST: 'www.production.com'
      }
```
如上配置：
* 当使用开发模式启动，process.env.HOST === 'www.development.com' 。
* 当使用生产模式启动，process.env.HOST === 'www.production.com' 。

## 目录结构说明

```bash

.
├── app                     # babel outDir
│   └── *
├── bin
│   ├── debug.js
│   ├── start.js            # 项目启动入口
│   ├── initLogrotate.js    # 服务器首次部署安装日志切割
│   ├── development.js      # 开发模式下项目的入口文件
│   └── production.js       # 线上入口文件
│
├── public                  # 静态资源路径
│   ├── favicon.ico
│   ├── robots.txt
│   └── static
│
├── src                     # 源代码目录，编译时会自动将 src 目录下的文件编译到 app 目录下。src 下的目录结构可以自行组织, 但是必须是 babel 可接受的类型(js, json, etc...)。
│   ├── config              # 配置目录
│   ├── modules             # 模型
│   │   ├── [module name]   # 模块名称/接口名称
│   │   │   ├── controllers # 控制器        
│   │   │   ├── routes      # 路由
│   │   │   ├── services    # service
│   │   │   └── mock        # 假数据
│   │   └── [module name]
│   ├── routes              # 总路由
│   ├── utils               # 公用工具库
│   ├── app.js              # koa 配置
│   └── index.js            # 入口文件
│
├── test                    # 测试目录现在在项目根目录下
│   └── test.js
│
├── views                   # 视图(前端模板)
│   ├── error.ejs
│   ├── index.ejs
│   └── *.ejs
│
├── nginx.conf              # nginx 的配置文件，建议线上使用 nginx 做反向代理
├── package.json            # package.json
├── pm2.config.js           # 用于 pm2 部署
├── LICENSE
└── README.md
```


## Contact
[issues](https://github.com/guibwl/easy-node/issues)  

该脚手架根据 [koa2-startkit](https://github.com/17koa/koa2-startkit.git) 修改搭建

