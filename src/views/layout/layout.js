/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-24 21:47:18
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-26 17:59:50
 */
import render from '_c/layout/index.js'
console.log(render)
const data = {
    title: 'My Page',
    myarr: [
        'My Page',
        'My Page',
        'My Page',
        'My Page',
    ]
};
const html = render(data);
console.log(html);

document.body.innerHTML = html;