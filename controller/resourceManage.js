/*
 * @Author: your name
 * @Date: 2021-07-14 16:30:43
 * @LastEditTime: 2021-07-22 18:07:45
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

//编辑资源
const updateResource=(data)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection(function(err, connection) {
      connection.query(`UPDATE test SET ? where (id=${data.id})`,data,  (error, results) => {
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

//获取资源详情
const queryResource=(data)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection(function(err, connection) {
      connection.query('select * from test where id= ?',data,  (error, results) => {
        // console.log(results);
        // 如果有错误就抛出
        let returnData = {
          status: 'Failed',
          data: null
        }
        console.log(results);
        if (error){
          returnData.data=error
        }else{
          returnData.status='Success'
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
          status: 'Failed',
          data: null
        }
        console.log("1111111111111111111111111111111");
        console.log(data);
        console.log(results);
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

//分页查询列表
const queryResourceList=(data)=>{
  return new Promise((resolve,reject)=>{
    pool.getConnection(function(err, connection) {
      let sql=`select * from test where 1=1`;
      // let sql=`select * from test where 1=1`;
      let sqlNum="select count(*) as total from test where 1=1"
      let arr=[];
      if(data.keyWord){
        data.keyWord = "%"+data.keyWord+"%";
        sql += " and name like ?";
        sqlNum += " and name like ?";
        arr.push(data.keyWord);
      }
      if(data.status!==null){
        sql += " and status = ?";
        sqlNum += " and status = ?";
        arr.push(data.status);
      }
      if(data.type!==null){
        sql += " and type = ?";
        sqlNum += " and type = ?";
        arr.push(data.type);
      }
      if(data.date&&data.date.length){
        sql += " and createDate between ? and ?";
        sqlNum += " and createDate between ? and ?";
        arr.push(data.date[0]);
        arr.push(data.date[1]);
      }
      sql += " limit ?,?";
      arr.push(((data.pageNum-1)*data.pageSize));
      arr.push(data.pageSize);
      connection.query(sql,arr,(error, results) => {
        // console.log(results);
        // 如果有错误就抛出
        let returnData = {
          status: 'Failed',
          data: {
            list:[],
            total:0
          },
        }
        if (error){
          returnData.data=error
          connection.release();
          reject(error)
        }else{
          returnData.data.list=results
          connection.query(sqlNum,arr,(error, results) => {
            if (error){
              returnData.data=error
              connection.release();
              reject(error)
            }else{
              returnData.status='Success'
              returnData.data.total=results&&results.length?results[0].total:0

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
  createQRCode,
}
