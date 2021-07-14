/*
 * @Author: your name
 * @Date: 2021-07-14 16:20:35
 * @LastEditTime: 2021-07-14 17:24:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koaframe\db\index.js
 */
const mysql = require('mysql');
const pool  = mysql.createPool({
  host     : '127.0.0.1',   // 数据库地址
  user     : 'root',    // 数据库用户
  password : 'ccb123456',   // 数据库密码
  database : 'koaFrame'  // 选中数据库
})
module.exports = pool
