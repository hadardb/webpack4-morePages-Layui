/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-17 14:59:49
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-02-01 18:05:12
 */
require('./index.scss')
// require('@babel/polyfill')
import myimg from 'img/index.png'

import Compo from '_c/compo/compo'
// import $ from 'expose-loader?$!jquery'      //内联暴露全局变量
// import $ from 'jquery'
console.log($)
console.log(window.$)
let image = new Image();
console.log(myimg)
image.src = myimg
console.log(image)
document.body.appendChild(image)

//  引入html组件
let bodyHtml = document.body.innerHTML
document.body.innerHTML = bodyHtml + Compo
console.log(Compo)

Object.assign({})


console.log('nih12312ao')