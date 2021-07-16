/*
 * @Author: your name
 * @Date: 2021-07-16 09:15:01
 * @LastEditTime: 2021-07-16 09:21:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koaframe\utils\index.js
 */
const parsePostParameter=(ctx)=>{
  return new Promise((resolve,reject)=>{
    ctx.req.on('data',data=>{
      resolve(JSON.parse(data.toString()))
    });
  })
}
module.exports = {
  parsePostParameter
}
