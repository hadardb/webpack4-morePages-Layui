/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-27 16:14:13
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-02-11 16:49:54
 */
import { Random, mock } from 'mockjs'
import {
	dateChecking,
	phoneChecking,
	emailChecking,
	htmlEncodeByRegExp,
	numberChecking,
	getUrlParam,
	debounce
} from '../src/libs/tools'



test('验证是否为日期字符串,格式2020-02-29', () => {
	expect(dateChecking(Random.date())).toBeTruthy()
})

test('验证是否为手机号码字符串', () => {
	expect(phoneChecking(mock(/^1(5|3|7|8)[0-9]{9}$/))).toBeTruthy()
})

test('验证是否为邮箱字符串', () => {
	expect(emailChecking(Random.email())).toBeTruthy()
})

test('验证是否将HTML字符串进行转码', () => {
	expect(htmlEncodeByRegExp('<img url="../../yushan/2.1.png"/>')).not.toMatch(/>|<|'|"| /)
})

test('验证是否为纯数字', () => {
	let num =mock({
		'number|1-3000.1-2': 20
	}).number.toString()
	expect(numberChecking(num)).toBeTruthy()
})

// getUrlParam 非标准函数，内部需要获取window对象


// 有问题 柯里化异步函数 不太懂怎么测
// describe('验证防抖',() =>{
// 	let mockCallBack =null
// 	beforeEach( ()=>{
// 		mockCallBack = jest.fn()
// 	})
// 	test('验证立即执行防抖函数是否有效', async() => {
// 		await debounce(mockCallBack,1000,true)()
// 		expect(mockCallBack).toBeCalled()
// 	})
// 	test('验证非立即执行防抖函数是否有效', (done) => {
// 		debounce(mockCallBack,1000,false)()
// 		expect(mockCallBack).toBeCalled()
// 		done()
// 	})
// })
