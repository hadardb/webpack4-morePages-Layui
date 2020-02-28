/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-02-27 15:25:43
 * @LastEditors: Haojin Sun
 * @LastEditTime: 2020-02-28 14:39:10
 */
import okImgUrl from './img/right.png'
import falseImgUrl from './img/wrong.png'
export default class Advisory {

	constructor(
		id,
		defaultInfo
	) {
		let info = {
			title: '智能咨询',								 // 名称
			titleImg: null,									// 标题图标
			height: 450,									// 高度
			questionList: [],								// 问题列表		{name,id}
			contact: '',									// 联系信息
			onAnswerTrue: function () { },					// 点击有帮助后的回调函数
			onAnswerFalse: function () { },					// 点击没有帮助后的回调函数
			onSend: function () { },                      	// 点击提交后的回调函数	第一个参数返回用户输入的内容
			onCreateUsered: function () { },					// 创建完用户消息后后	第一个参数返回用户内容
			onCreateAied: function () { }					// ai onAnswerTrue答完后的回调函数
		}
		this.id = id
		this.defaultInfo = Object.assign(info, defaultInfo) 
		this.userWords = []				// 保存着用户所有输入过的信息
	}
	/**
     * @name: 初始化
     * @return: {Void}
     */
	init() {
		let advisoryDom = document.createElement('div')
		advisoryDom.setAttribute('class', 'advisory')
		let leftDom = this.initLeftMoudle(this.defaultInfo)
		let rightDom = this.initRightMoudle(this.defaultInfo)
		advisoryDom.appendChild(leftDom)
		advisoryDom.appendChild(rightDom)
		document.getElementById(this.id).appendChild(advisoryDom)
		this.createEvent()
	}
	/**
     * @name: 渲染问题列表
     * @param {Array}  questionList
     * @param {Func}  callBack	回调函数  返回列表dom  以及数量
     * @return: {Void}
     */
	setQuestionList(questionList, callBack) {
		let ul = document.getElementById('questionList')
		let length = questionList.length
		let dom = ''
		questionList.forEach(function (item) {
			dom += `<li class="advisory-questionList-item" data-id="${item.id}">${item.name}</li>`
		})
		ul.innerHTML = dom
		this.clickQuestions()
		if (callBack) {
			callBack(ul, length)
		}
	}

	/**
     * @name: 创建用户消息并触发相关事件
     * @param {String}  answer  显示的消息
     * @return: {Void}
     */
	create(answer) {
		this.createAnsweOfUser(answer)
		this.userWords.push(answer)
		this.setScrollTop()
		this.defaultInfo.onCreateUsered(answer)
	}

	/**
     * @name: 发送消息事件
     * @param {String}  answer  显示的消息
     * @return: {Void}
     */
	onSend(answer) {
		console.log(this.defaultInfo.onSend)
		this.defaultInfo.onSend(answer)
		this.create(answer)
		this.emptyTextArea()
	}

	/**
     * @name: 创建ai信息
     * @param {String}  data  显示的消息
     * @return: {Void}
     */
	createAi(data) {
		let userWord = this.getLastWord()
		this.createAnsweOfAi(data)
		this.setScrollTop()
		this.defaultInfo.onCreateAied(data, userWord)
	}

	/**
     * @name: 创建多行ai回复信息
     * @param {String}  data  显示的数据
     * @param {DOM}  template  模板
     * @return: {Void}  
     */
	createMultiRowAi(data, template) {
		let userWord = this.getLastWord()
		this.createMultiRowAnswer(data, template)
		this.createConfirm(data)
		this.setScrollTop()
		this.defaultInfo.onCreateAied(data, userWord)
	}

	/**
     * @name: 绑定事件
     * @return: {Void}
     */
	createEvent() {
		this.clickSend()
		this.textEnterEvent()
		this.clickQuestions()
	}

	/**
     * @name: 绑定点击发送事件
     * @return: {Void}
     */
	clickSend() {
		document.getElementById('search').onclick = () => {
			let info = document.getElementById('searchInfo').value
			this.onSend(info)
		}
	}

	/**
     * @name: 帮点textArea回车事件
     * @return: {Void}
     */
	textEnterEvent() {
		document.getElementById('searchInfo').onkeydown = (e) => {
			var theEvent = e || window.event
			var code = theEvent.keyCode || theEvent.which || theEvent.charCode
			if (code == 13 && theEvent.ctrlKey) {
				let info = document.getElementById('searchInfo').value
				this.onSend(info)
			}
		}
	}

	/**
     * @name: 绑定点击发送事件
     * @return: {Void}
     */
	clickQuestions() {
		let questions = document.getElementById('questionList').children
		let that = this
		questions.forEach(function (item) {
			let info = item.innerText
			item.onclick = function () {
				that.create(info)
			}
		})
	}

	/**
     * @name: 清空输入栏消息
     * @return: {Void}
     */
	emptyTextArea() {
		document.getElementById('searchInfo').value = ''
	}

	/**
     * @name: 将滚动条保持在最下方
     * @return: {Void}
     */
	setScrollTop() {
		var objDiv = document.getElementById('advisoryContent')
		objDiv.scrollTop = objDiv.scrollHeight
	}

	/**
     * @name: 获取用户最后一句提问
     * @return: {Void}
     */
	getLastWord() {
		return this.userWords[this.userWords.length - 1]
	}

	/**
     * @name: 创建用户消息
     * @param {DOM}  answer  显示的消息
     * @return: {Void}
     */
	createAnsweOfUser(answer) {
		let answerDom = document.createElement('div')
		answerDom.setAttribute('class', 'advisory-content-pack advisory-content-pack-user')
		let dom = document.createElement('div')
		dom.setAttribute('class', 'advisory-content-word advisory-content-user')
		let domText = document.createTextNode(answer)
		dom.appendChild(domText)
		answerDom.appendChild(dom)
		document.getElementById('advisoryContent').appendChild(answerDom)
	}

	/**
     * @name: 创建单句ai消息
     * @param {String}  data  显示的消息
     * @return: {Void}
     */
	createAnsweOfAi(data) {
		let answerDom = document.createElement('div')
		answerDom.setAttribute('class', 'advisory-content-pack')
		let dom = document.createElement('div')
		dom.setAttribute('class', 'advisory-content-word advisory-content-ai')
		let domText = document.createTextNode(data)
		dom.appendChild(domText)
		answerDom.appendChild(dom)
		document.getElementById('advisoryContent').appendChild(answerDom)
	}

	/**
     * @name: 创建ai多行回复消息
     * @param {Obj}  info  显示的消息	{name, conetnt:[{title,value},files:[{url,name}]]}
     * @param {Dom}  uiContent  自定义回复消息
     * @return: {Void}
     */
	createMultiRowAnswer(info, uiContent) {
		let answerDom = document.createElement('div')
		answerDom.setAttribute('class', 'advisory-content-pack')
		let dom = document.createElement('div')
		dom.setAttribute('class', 'advisory-content-word advisory-content-ai')
		let contentDom = document.createElement('div')
		contentDom.setAttribute('class', 'advisory-content-answer')
		// 如果存在自定义回复消息就用自定义的
		if (uiContent) {
			contentDom.appendChild(uiContent)
		} else {
			let content = `<div class="advisory-content-answer-title">您的提问：如何提取公积金</div>
			<ul class="advisory-content-answer-content">
				<li>
					<div class="advisory-content-answer-content-name">受理情况</div>
					<div>住房和城乡建设部颁发的工程勘察企业资质证书；住房和城乡建设部颁发的工程设计企业资质证书；住房和城乡建设部颁发的工程监理企业资质证书。
					</div>
				</li>
				<li>
					<div class="advisory-content-answer-content-name">材料清单</div>
					<div>1.《企业法定代表人声明》；2.广东省建设类企业资质变更申请表；3.企业资质证书正、副本及副本变更页；4.法定代表人身份证
					</div>
				</li>
			</ul>
			<div class="advisory-content-answer-files">
				<div class="advisory-content-answer-files-name">附件材料</div>
				<div><a href="">查看下级相关问题</a></div>
			</div>`
			contentDom.innerHTML = content
		}
		dom.appendChild(contentDom)
		answerDom.appendChild(dom)
		document.getElementById('advisoryContent').appendChild(answerDom)
	}

	/**
     * @name: 创建ai确认消息
     * @param {String}  data  后台返回来的数据
     * @return: {Void}
     */
	createConfirm(data) {
		let answerDom = document.createElement('div')
		answerDom.setAttribute('class', 'advisory-content-pack')
		let contentDom = document.createElement('div')
		contentDom.setAttribute('class', 'advisory-content-word advisory-content-ai')
		let domText = document.createTextNode('智能咨询是否已经解决您的问题？')
		let imgListDom = document.createElement('div')
		imgListDom.setAttribute('class', 'advisory-content-ai-verify')
		let okImg = document.createElement('img')
		let falseImg = document.createElement('img')
		okImg.setAttribute('src', okImgUrl)
		falseImg.setAttribute('src', falseImgUrl)
		okImg.onclick = () => {
			this.defaultInfo.onAnswerTrue(data)
		}
		falseImg.onclick = () => {
			this.defaultInfo.onAnswerFalse(data)
		}
		imgListDom.appendChild(okImg)
		imgListDom.appendChild(falseImg)
		contentDom.appendChild(domText)
		answerDom.appendChild(contentDom)
		answerDom.appendChild(imgListDom)
		document.getElementById('advisoryContent').appendChild(answerDom)
	}

	/**
     * @name: 渲染左侧模块
     * @param {Array}  defaultInfo	参数
     * @return: {DOM} 返回左侧dom对象
     */
	initLeftMoudle(defaultInfo) {
		let { title, titleImg, height } = defaultInfo
		let leftDom = document.createElement('div')
		leftDom.setAttribute('class', 'advisory-left')
		let titleDom = this.initTitle(titleImg, title)
		let contentDom = this.initContent(height)
		let inputDom = this.initInput()
		leftDom.appendChild(titleDom)
		leftDom.appendChild(contentDom)
		leftDom.appendChild(inputDom)
		return leftDom
	}

	/**
     * @name: 渲染右侧模块
     * @param {Array}  defaultInfo	参数
     * @return: {DOM} 返回右侧dom对象
     */
	initRightMoudle(defaultInfo) {
		let { questionList, contact, height } = defaultInfo
		let rightDom = document.createElement('div')
		rightDom.setAttribute('class', 'advisory-right')
		let questionTitleDom = document.createElement('div')
		questionTitleDom.setAttribute('class', 'advisory-questionTitle')
		questionTitleDom.innerHTML = '常见问题'
		let questionDom = this.initQuestionList(questionList, height)
		let contactDom = this.initContactList(contact)
		rightDom.appendChild(questionTitleDom)
		rightDom.appendChild(questionDom)
		rightDom.appendChild(contactDom)
		return rightDom
	}

	/**
     * @name: 渲染标题模块
     * @param {String}  img	文件地址
     * @param {String}  title	文件名
     * @return: {DOM} 返回dom对象
     */
	initTitle(img, title) {
		let titleDom = document.createElement('div')
		titleDom.setAttribute('class', 'advisory-title')
		let background = `background-image:url(${img})`
		let dom = ''
		if (img) {
			dom += `
				<i style=${ img ? background : ''}></i>
			`
		}
		dom += `<div id="title">${title}</div>`
		titleDom.innerHTML = dom
		return titleDom
	}

	/**
     * @name: 渲染显示对话模块
     * @param {Number}  height	高度
     * @return: {DOM} 返回dom对象
     */
	initContent(height) {
		let contentDom = document.createElement('div')
		contentDom.setAttribute('class', 'advisory-content')
		contentDom.setAttribute('id', 'advisoryContent')
		contentDom.style.height = height + 'px'
		return contentDom
	}

	/**
     * @name: 渲染输入模块
     * @return: {DOM} 返回dom对象
     */
	initInput() {
		let inputDom = document.createElement('div')
		inputDom.setAttribute('class', 'advisory-input')
		let dom = `
			<textarea id="searchInfo"  placeholder="请输入您想咨询的问题...(快捷发送 Ctrl + Enter)"></textarea>
			<div id="search">发 送</div>
		`
		inputDom.innerHTML = dom
		return inputDom
	}

	/**
     * @name: 渲染问题列表模块
     * @param {Array}  questionList	问题列表
	 * * @param {Number}  height	高度
     * @return: {DOM} 返回dom对象
     */
	initQuestionList(questionList, height) {
		let questionDom = document.createElement('div')
		questionDom.setAttribute('class', 'advisory-questionList')
		questionDom.style.height = height + 'px'
		let dom = '<ul id="questionList">'
		questionList.forEach(function (item) {
			dom += `<li class="advisory-questionList-item" data-id="${item.id}">${item.name}</li>`
		})
		dom += '</ul>'
		questionDom.innerHTML = dom
		return questionDom
	}

	/**
     * @name: 渲染联系模块
     * @param {Array}  contact	底部联系字段
     * @return: {DOM} 返回dom对象
     */
	initContactList(contact) {
		let contactDom = document.createElement('div')
		contactDom.setAttribute('class', 'advisory-contact')
		let dom = `
			<div id="contact" class="advisory-contact-value">${contact}</div>
		`
		contactDom.innerHTML = dom
		return contactDom
	}
}