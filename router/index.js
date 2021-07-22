/*
 * @Author: your name
 * @Date: 2021-07-14 16:55:52
 * @LastEditTime: 2021-07-22 15:27:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koaframe\router\index.js
 */
 const router = require('koa-router')();  //注意：引入的方式
 const resourceManage = require('../controller/resourceManage.js');  //注意：引入的方式
 const userManage = require('../controller/userManage.js');  //注意：引入的方式
 const parseParameter=require("../utils/index.js")

 router.get('/queryUserInfo', async function (ctx, next) {
  let pid=ctx.request.query.pid;
  let uid=ctx.request.query.uid
  let postInfo=null;
  let response={
    type:2,
    data:null,
  }
  let pResult=await resourceManage.queryResource(pid)
  postInfo=pResult.data

  let uResult=await userManage.queryUserInfo(uid)
  if(uResult.status=="Success"&&uResult.data){//有用户信息
    let userPosts=uResult.data.split(',')
    if(userPosts.indexOf(postInfo.id.toString())!=-1){//用户有该资源,则直接返回
      response.data=postInfo
      response.type=1
      ctx.body=response
    }else{//该用户没有该资源，生成资源二维码返回
      response.data=await resourceManage.createQRCode(postInfo)
      ctx.body=response
    }
  }else{//没有改用户，直接生成资源二维码返回
    response.data=await resourceManage.createQRCode(postInfo)
    ctx.body=response
  }
})
//获取支付信息
router.get('/getPayInfo', async function (ctx, next) {
  ctx.body="This is a test "+ctx.request.query.pid+" "+ctx.request.query.uid;
  if(!ctx.request.query.posts){
    console.log("no posts");
  }
})

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
