/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-26 19:03:44
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-26 19:06:49
 */
import axios from './index'

export const getSiteList = (data = null) => {
    return axios.request({
      method: 'post',
      url: 'api/agency/register/info',
     data: data
    })
  }
  