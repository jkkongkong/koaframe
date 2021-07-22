/*
 * @Author: your name
 * @Date: 2021-07-14 16:30:43
 * @LastEditTime: 2021-07-22 17:59:52
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
const createUser=(id,posts)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection(function(err, connection) {
      connection.query('INSERT INTO user SET ?',{id,posts},  (error, results) => {
        // console.log(results);
        // 如果有错误就抛出
        let returnData = {
          status: 'Failed',
          data: null
        }
        if (error){
          returnData.data=error
        }else{
          returnData.status='Success'
          returnData.data={id:results.insertId}
        };
        // 结束会话
        connection.release();
        resolve(returnData)
      })
    })
  })
}

const updateUser=(data)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection(function(err, connection) {
      connection.query(`UPDATE user SET ? where (id=${data.id})`,data,  (error, results) => {
        // console.log(results);
        // 如果有错误就抛出
        let returnData = {
          status: 'Failed',
          data: null
        }
        if (error){
          returnData.data=error
        }else{
          returnData.status='Success'
          returnData.data=results
        };
        // 结束会话
        connection.release();
        resolve(returnData)
      })
    })
  })
}
const test=()=>{
  return new Promise((resolve)=>{
    console.log("hhhhhhhhhhhhh");
    setTimeout(()=>{
      console.log("hahahahahhaahahahahahahh");
      resolve("This is a test")
    },500)
  })
}

module.exports = {
  test,
  queryUserInfo,
  createUser,
  updateUser,
}
