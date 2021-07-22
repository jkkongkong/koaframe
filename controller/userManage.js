/*
 * @Author: your name
 * @Date: 2021-07-14 16:30:43
 * @LastEditTime: 2021-07-22 14:31:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koaframe\controller\resourceManage.js
 */
const pool = require('../db')
//获取用户详情
const queryUserInfo=(uid)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection(function(err, connection) {
      connection.query('select posts from user where id= ?',uid,  (error, results) => {
        // console.log(results);
        // 如果有错误就抛出
        let returnData = {
          status: 'Failed',
          data: null
        }
        if (error){
          returnData.data=error
          connection.release();
          reject(error)
        }else{
          returnData.status='Success'
          returnData.data=results&&results.length?results[0].posts:null
          // 结束会话
        connection.release();
        resolve(returnData)
        };
      })
    })
  })
}

module.exports = {
  queryUserInfo,
}
