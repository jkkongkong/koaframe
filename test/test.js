/*
 * @Author: your name
 * @Date: 2021-07-22 15:22:02
 * @LastEditTime: 2021-07-22 15:24:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koaframe\test\test.js
 */
let num=1
function test(val){
  console.log(num+":"+val);
  num++
  if(num<=3){
    test(val)
  }
}
test('haha')
