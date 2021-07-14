/*
 * @Author: your name
 * @Date: 2021-07-14 16:30:43
 * @LastEditTime: 2021-07-14 17:22:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koaframe\controller\resourceManage.js
 */
const pool = require('../db')
const createResource=(ctx,next)=>{
  pool.getConnection(function(err, connection) {

    connection.query('INSERT INTO test SET ?',{id:parseInt(Math.random()*1000000),name:'test',resourceUrl:'www.baidu.com',createDate:new Date(),sellCount:100,password:'123'},  (error, results) => {
      console.log(results);

      // 结束会话
      connection.release();

      // 如果有错误就抛出
      if (error) throw error;
    })
  })
}
module.exports = {
  createResource
}
