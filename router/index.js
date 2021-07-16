/*
 * @Author: your name
 * @Date: 2021-07-14 16:55:52
 * @LastEditTime: 2021-07-16 11:19:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koaframe\router\index.js
 */
 const router = require('koa-router')();  //注意：引入的方式
 const resourceManage = require('../controller/resourceManage.js');  //注意：引入的方式
 const parseParameter=require("../utils/index.js")

router.get('/getDetails', async function (ctx, next) {
  let re=await resourceManage.queryResource(ctx.request.query.id)
  ctx.body=re;
})


router.post('/createResource',async (ctx,next)=>{
  let params=await parseParameter.parsePostParameter(ctx)
  let re=await resourceManage.createResource(params)
  ctx.body=re
})

router.post('/patchDeleteResource',async (ctx,next)=>{
  let params=await parseParameter.parsePostParameter(ctx)
  let re=await resourceManage.patchDeleteResource(params)
  ctx.body=re
})

router.post('/updateResource',async (ctx,next)=>{
  let params=await parseParameter.parsePostParameter(ctx)
  let re=await resourceManage.updateResource(params)
  ctx.body=re
})


router.post('/queryResourceList',async (ctx,next)=>{
  let params=await parseParameter.parsePostParameter(ctx)
  let re=await resourceManage.queryResourceList(params)
  ctx.body=re
})

module.exports = router
