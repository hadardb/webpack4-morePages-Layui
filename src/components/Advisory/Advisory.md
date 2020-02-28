<!--
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-16 20:08:37
 * @LastEditors: Haojin Sun
 * @LastEditTime: 2020-02-28 09:26:26
 -->
# Advisory 插件说明
创建方式
```
<div id="advisory">

</div>

<script>
let advisory = new Advisory('advisory', {
	title: '智能咨询',                  			 // 名称
	titleImg: titleImg,								// 标题图标
	height: 450,									// 高度
	questionList: [],                   			// 问题列表		{name,id}
	contact: '联系我们：12345',						 // 联系信息
	onAnswerTrue: function () { },                  // 点击有帮助后的回调函数
	onAnswerFalse: function () { },                 // 点击没有帮助后的回调函数
	onSend: onSend,                      			// 点击提交后的回调函数
	onCreateUsered: onCreateUsered,					// 创建user消息后的回调函数
	onCreateAied: function () { }					// ai 回答完后的回调函数
})
advisory.init()
</script>
```
## 参数说明
参数名           | 类型      | 默认值 | 说明
-|-|-|-
id              | string    | ''    | 必填 需要渲染的div id
title           | string    | ''    | 显示的对话框名称
titleImg        | string    | null  | 显示的对话框图像
height          | number    | 450   | 内容栏的高度（不包括标题栏和输入栏）
questionList    | obj[]     | []    | 内部对象结构  {id：'唯一标识'， name:'现在的名称'} 
contact         | string    | ''    | 底部联系方式
onAnswerTrue    | Function  | null  | 点击有帮助后的回调函数
onAnswerFalse   | Function  | null  | 点击没有帮助后的回调函数
onSend          | Function  | null  | 点击提交后的回调函数  在onCreateUsered 之前触发
onCreateUsered  | Function  | null  | 创建user消息后的回调函数
onCreateAied    | Function  | null  | 创建ai消息后的回调函数 回参 (回答的语句，用户最后提问的语句)

## 实例方法说明
方法名           | 类型      | 参数 | 说明
-|-|-|-
init            | Function  | 无 | 初始化 Advisory
setQuestionList | Function  | obj[],callback(dom,length) | 刷新问题列表 obj[] : 数据列表 dom ： 渲染列表  length： 渲染数量
onSend          | Function  | data | 用户发送消息方法 data : 需要发送的文字
create          | Function  | data | 创建user信息方法 data : 需要发送的文字 相比于onSend 不会触发onSend 回调方法
createAi        | Function  | data | 创建单行ai信息方法 data : 需要显示的文字


