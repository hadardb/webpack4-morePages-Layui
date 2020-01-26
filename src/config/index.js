/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-26 17:50:53
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-26 19:05:42
 */
export const baseURL = process.env.NODE_ENV === 'production'
  ? 'http://www.xxx.com' // 生产环境下请求url的地址
  : 'https://result.eolinker.com/YNwFiaZd756779b324f9527f0d8d2148b23ba3ad4732d08?uri=192.168.1.104:80/' // 开发环境直接调用vue.config中的代理地址