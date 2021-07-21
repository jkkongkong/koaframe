/*
 * @Author: your name
 * @Date: 2021-07-14 16:55:52
 * @LastEditTime: 2021-07-21 18:09:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koaframe\router\index.js
 */
 const router = require('koa-router')();  //注意：引入的方式
 const resourceManage = require('../controller/resourceManage.js');  //注意：引入的方式
 const parseParameter=require("../utils/index.js")

 router.get('/test1', async function (ctx, next) {
  ctx.body="This is a test "+ctx.request.query.pid+" "+ctx.request.query.uid;
  if(ctx.request.query.uid){
    // if(Math.random()>0.5){
      for(let i=0;i<200000;i++){
        for(let j=0;j<100000;j++){
          let z=i*j
        }
      }
        ctx.body={
          type:1,
          data:{
            url:'www.baidu.com',
            pickCode:'1234',
            unzipCode:'2222',
          }
        }
    // }else{
    //   ctx.body={
    //     type:2,
    //     data:{
    //       payCode:'hahahha',
    //     }
    //   }
    // }
  }
})
router.get('/test2', async function (ctx, next) {
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
