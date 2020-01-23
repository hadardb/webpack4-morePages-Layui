/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-12 12:22:13
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-23 14:10:11
 */

 require('../css/main.scss')
 let world = require('./a.js')

 console.log(world)

let fn = ()=>{
    console.log([].fill(8))
    console.log(1423 )
}
fn()

function * gen(params){
    yield 1
}
console.log(gen().next())