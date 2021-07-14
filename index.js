/*
 * @Author: your name
 * @Date: 2021-07-14 16:10:55
 * @LastEditTime: 2021-07-14 17:20:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koaframe\index.js
 */
const Koa = require('koa');
var bodyParser = require('koa-bodyparser');
const router = require('./router')
const app = new Koa();
app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.use(bodyParser());
app.listen(3000,()=>{
console.log('starting at port 3000');
});
