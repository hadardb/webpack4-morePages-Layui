/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-26 18:12:58
 * @LastEditors: Haojin Sun
 * @LastEditTime: 2020-02-28 14:43:51
 */

//存放与业务无关的工具方法


/**
 * @name: 验证是否为固定电话
 * @val {string}    被验证字符串
 * @return: bool
 */
export const fixedPhoneChecking = function (val) {
	var mPattern = /([0-9]{3,4}-)?[0-9]{7,8}/
	return mPattern.test(val)
}
/**
 * @name: 验证是否为数字英文内容
 * @val {string}    被验证字符串
 * @return: bool
 */
export const letterChecking = function (val) {
	var mPattern = /^[a-zA-Z0-9]+$/
	return mPattern.test(val)
}
/**
 * @name: 验证是否为18位数字英文内容
 * @val {string}    被验证字符串
 * @return: bool
 */
export const shxydmChecking = function (val) {
	var mPattern = /[a-zA-Z0-9]{18}/
	return mPattern.test(val)
}
/**
 * @name: 验证是否为邮编
 * @val {string}    被验证字符串
 * @return: bool
 */
export const postCodeChecking = function (val) {
	var mPattern = /^[1-9][0-9]{5}$/
	return mPattern.test(val)
}

/**
 * @name: 验证是否为数字
 * @val {string}    被验证字符串
 * @return: bool
 */
export const numberChecking = function (val) {
	var mPattern = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0){1}$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/
	return mPattern.test(val)
}

/**
     * @name: 验证是否为日期
     * @val {string}    被验证字符串
     * @return: bool
     */
export const dateChecking = function (val) {
	var dP2 = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/
	return dP2.test(val)
}
/**
 * @name: 验证是否为手机号
 * @val {string}    被验证字符串
 * @return: bool
 */
export const phoneChecking = function (val) {
	// 2019.06 新增16 19 字段电话
	var mPattern = /^1[3456789]\d{9}$/
	return mPattern.test(val)
}
/**
 * @name: 验证是否为email
 * @val {string}    被验证字符串
 * @return: bool
 */
export const emailChecking = function (val) {
	var ePattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
	return ePattern.test(val)
}
/*用正则表达式实现html转码*/
export const htmlEncodeByRegExp = function (str) {
	var s = ''
	if (str.length == 0) return ''
	s = str.replace(/&/g, '&amp;')
	s = s.replace(/</g, '&lt;')
	s = s.replace(/>/g, '&gt;')
	s = s.replace(/ /g, '&nbsp;')
	s = s.replace(/'/g, '&#39;')
	s = s.replace(/"/g, '&quot;')
	return s
}
/*用正则表达式实现html解码*/
export const htmlDecodeByRegExp = function (str) {
	if (typeof (str) != 'string') {
		return str
	}
	var s = ''
	if (str.length == 0) return ''
	s = str.replace(/&amp;/g, '&')
	s = s.replace(/&lt;/g, '<')
	s = s.replace(/&gt;/g, '>')
	s = s.replace(/&nbsp;/g, ' ')
	s = s.replace(/&#39;/g, '\'')
	s = s.replace(/&quot;/g, '"')
	return s
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export const debounce = function (func, wait, immediate) {
	let timeout
	return function () {
		let context = this
		let args = arguments
		if (timeout) clearTimeout(timeout)
		if (immediate) {
			var callNow = !timeout
			timeout = setTimeout(() => {
				timeout = null
			}, wait)
			if (callNow) func.apply(context, args)
		} else {
			timeout = setTimeout(function () {
				func.apply(context, args)
			}, wait)
		}
	}
}

/**
 * @name: async 报错
 * @param {type} 
 * @return: 
 */
export const awaitWrap = (promise) => {
	return promise
		.then(data => [null, data])
		.catch(err => [err, null])
}

/**
 * @name:  JS`正则表达式`获取地址栏url参数：
 * @name {string}   查询的参数名
 * @return: {string} 参数值
 */
export const getUrlParam = (name) => {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg) // 匹配目标参数
	if (r != null) return unescape(r[2])
	return null // 返回参数值
}

