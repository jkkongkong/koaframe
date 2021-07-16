/*
 * @Author: your name
 * @Date: 2021-07-14 16:30:43
 * @LastEditTime: 2021-07-16 12:00:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koaframe\controller\resourceManage.js
 */
const pool = require('../db')
//创建资源
const createResource=(data)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection(function(err, connection) {
      connection.query('INSERT INTO test SET ?',data,  (error, results) => {
        // console.log(results);
        // 如果有错误就抛出
        let returnData = {
          success: 'Failed',
          data: null
        }
        if (error){
          returnData.data=error
        }else{
          returnData.success='Success'
          returnData.data={id:results.insertId}
        };
        // 结束会话
        connection.release();
        resolve(returnData)
      })
    })
  })
}

//创建资源
const updateResource=(data)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection(function(err, connection) {
      connection.query(`UPDATE test SET ? where (id=${data.id})`,data,  (error, results) => {
        // console.log(results);
        // 如果有错误就抛出
        let returnData = {
          success: 'Failed',
          data: null
        }
        if (error){
          returnData.data=error
        }else{
          returnData.success='Success'
          returnData.data=results
        };
        // 结束会话
        connection.release();
        resolve(returnData)
      })
    })
  })
}

//获取资源详情
const queryResource=(data)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection(function(err, connection) {
      connection.query('select * from test where id= ?',data,  (error, results) => {
        // console.log(results);
        // 如果有错误就抛出
        let returnData = {
          success: 'Failed',
          data: null
        }
        console.log(results);
        if (error){
          returnData.data=error
        }else{
          returnData.success='Success'
          returnData.data=results&&results.length?results[0]:{}
        };
        // 结束会话
        connection.release();
        resolve(returnData)
      })
    })
  })
}

//批量删除资源
const patchDeleteResource=(data)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection(function(err, connection) {
      connection.query(`delete from test where id in (${data.join(',')})`,(error, results) => {
        // console.log(results);
        // 如果有错误就抛出
        let returnData = {
          success: 'Failed',
          data: null
        }
        console.log(results);
        if (error){
          returnData.data=error
        }else{
          returnData.success='Success'
          returnData.data=results
        };
        // 结束会话
        connection.release();
        resolve(returnData)
      })
    })
  })
}

//分页查询列表
const queryResourceList=(data)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection(function(err, connection) {
      connection.query(`select * from test limit ${(data.pageNum-1)*data.pageSize},${data.pageSize}`,(error, results) => {
        // console.log(results);
        // 如果有错误就抛出
        let returnData = {
          success: 'Failed',
          data: null,
          total:0
        }
        if (error){
          returnData.data=error
          connection.release();
          reject(error)
        }else{
          returnData.data=results
          connection.query(`select count(*) as total from test`,(error, results) => {
            if (error){
              returnData.data=error
              connection.release();
              reject(error)
            }else{
              returnData.success='Success'
              returnData.total=results&&results.length?results[0].total:0

            };
            connection.release();
            resolve(returnData)
          })
        };
        // 结束会话

      })
    })
  })
}
module.exports = {
  createResource,
  queryResource,
  patchDeleteResource,
  updateResource,
  updateResource,
  queryResourceList,
}
