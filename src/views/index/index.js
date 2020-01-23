/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-17 14:59:49
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-23 13:23:32
 */
require('js/main.js')
require('./index.scss')

let b = require('js/b')

import myimg from 'img/index.png'

import Compo from '@/compo/compo.html'
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

console.log('nih12312ao')