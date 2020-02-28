/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-17 14:59:49
 * @LastEditors: Haojin Sun
 * @LastEditTime: 2020-02-28 14:42:11
 */

import './index.scss'

import Advisory from '_c/Advisory/index.js'

let advisory = new Advisory('advisory', {
	title: '智能咨询2',                  			 // 名称
	// titleImg: titleImg,								// 标题图标
	height: 450,									// 高度
	questionList: [
		{
			id: '1',
			name: '如何申领身份证'
		},
		{
			id: '2',
			name: '新冠疫情防范期间返回人员能否开始工作？'
		}
	],                   			// 问题列表		{name,id}
	contact: '联系我们：12345',						 // 联系信息
	onAnswerTrue: function () { },                  // 点击有帮助后的回调函数
	// onAnswerFalse: function () { },                 // 点击没有帮助后的回调函数
	// onSend: onSend,                      			// 点击提交后的回调函数
	onCreateUsered: onCreateUsered,					// 创建user消息后的回调函数
	onCreateAied: function () { }					// ai 回答完后的回调函数
})
advisory.init()


function onCreateUsered(data){
	advisory.createAi('抱歉，机器人智力暂未上线')
}