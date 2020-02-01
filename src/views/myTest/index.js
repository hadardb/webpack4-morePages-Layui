/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-17 15:01:43
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-30 23:45:02
 */
import { getSiteList } from '@/api/testPage'
require('./index.css')

getSiteList({}).then( res => {
    console.log(res)
} )
console.log('nihao')
console.log($)