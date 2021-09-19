
<p align="center">
<img src="https://i.loli.net/2021/09/19/6NW7c5qKm2hfDkj.png" style="width:64px"/>
</p>

<div align="center">

# iCS Convertor

![GitHub stars](https://img.shields.io/github/stars/UPCUnofficial/iCSFrontend?style=flat) ![GitHub forks](https://img.shields.io/github/forks/UPCUnofficial/iCSFrontend)

纯前端实现的`iCS Convertor`！
</div>

----


`iCS Convertor`适用于`新版强智教务系统`导出的`学生当前课表.xls`.转换过程在浏览器端纯本地进行,无隐私泄露风险.

## 🙌 简单的开始
使用现代浏览器(`Chrome`/`Safari`/`Firefox`)访问已部署`iCS Convertor`的[站点](#-已部署站点)即可.
## 🚀 开发
### 流程
本页面是个标准的Vue SPA应用,遵循标准的Nodejs SPA应用开发流程.

请先安装依赖.
```shell
yarn
```
并启动服务器.
```shell
yarn run serve
```
打包获得产物
```shell
yarn run build
```
> 请注意:
> 
> 本项目的部分依赖托管在CDN上,因此升级这些依赖的版本时请同步升级CDN引入.具体查看 `vue.config.js`.
### 项目结构
本应用的视图层位于 `src/App.vue`.

解析XLS并生成iCS的逻辑位于 `src/plugins/parser.js`.

课程时间信息位于 `src/assets/conf_classTime.json`, 学期起始日信息位于 `src/assets/conf_schoolTerms.json`.

> 学期起始日为本学期的第一个周一.
## 🌏 已部署站点

- [咸的鱼](https://x.saltedfish.fun/ics/)
- [Github Pages](https://upcunofficial.github.io/iCSFrontend/)

## 🤯 无法解析\解析出错
本项目的解析逻辑更多依赖于对XLS文件内文本格式的分析,因此XLS文件格式更新后可能出现解析出错或无法解析的问题.

如果遇到了解析错误或其他问题(如`白屏`或`显示错位`等),请在本项目 `Issue` 区发起反馈.

反馈请携带以下信息:

- 课表XLS(至少保留一门课程的信息)
- 使用平台 (如 `移动端 Chrome 92`
- Console错误输出 (如存在)
## 🧩 使用的相关库
- Vue
- [Vuetify](https://vuetifyjs.com/)
- [Sheetjs](https://github.com/SheetJS/sheetjs)
