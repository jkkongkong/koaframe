/*
 * @Author: your name
 * @Date: 2021-07-14 16:55:52
 * @LastEditTime: 2021-07-14 17:23:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koaframe\router\index.js
 */
 const router = require('koa-router')();  //注意：引入的方式
 const resourceManage = require('../controller/resourceManage.js');  //注意：引入的方式
router.get('/', function (ctx, next) {
  ctx.body="Hello koa";
})


router.get('/news',(ctx,next)=>{
  ctx.body="新闻page1111111222"
  resourceManage.createResource(ctx,next)
})
module.exports = router
