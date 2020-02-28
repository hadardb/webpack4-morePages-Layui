import imgOk from 'img/supermarketHome/wancheng.png'



export default class Processes {
	constructor(
		id = 'processes',
		info = {
			header: ['基本信息', '填写资质信息', '填写授权人员信息', '完成注册'],
			footer: [{
				name: '上一步',
				events: log
			},
			{
				name: '下一步',
				events: log
			},
			{
				name: '提交',
				events: log
			},
			{
				name: '取消',
				events: log
			}]
		},
	) {
		this.state = 0          // 当前执行的步骤
		this.length = info.header.length - 1    // 步骤总长
		this.info = info    // 信息 
		this.dom = document.getElementById(id)  // 渲染的id
		this.content = this.dom.innerHTML        // 获取内容
	}
	// 渲染 组件
	init() {
		headerinit(this)
		footerInit(this)
		this.setState()
		/**
         * @name: 初始化footer
         * @that {Object}  将this传入
         * @return: {viod}
         */
		function footerInit(that) {
			// 1. 创建footer 组件
			let footerDom = document.createElement('div')
			// 2. 添加class属性
			footerDom.setAttribute('class', 'processes-footer')  // 生成外部dom
			// 3. 根据footer 生成 内部 dom 元素
			that.info.footer.map(function (item, index) {
				// 3.1 生成item元素 并添加属性
				let dom = document.createElement('div')
				let id = `footerBtn${index}`
				dom.setAttribute('class', 'processes-footer-item')
				dom.setAttribute('id', id)
				dom.innerHTML = item.name // 2. 注入item元素
				// 3.2 添加点击事件
				dom.addEventListener('click', item.events)
				// 3.3 添加dom
				footerDom.appendChild(dom)
				if (index >= 4) {
					throw Error('当前只能传4个按钮，没有做兼容')
				}
			})
			// 4. 添加footer 组件
			that.dom.appendChild(footerDom)  
		}
		/**
         * @name: 设置底部按钮默认事件  2020.01.23 取消使用默认事件，在回调函数中自己控制
         * @that {Object}  this
         * @return: 
         */
		// function setFooterClick(that) {
		// 	window.document.getElementById('footerBtn0').addEventListener('click', () => {
		// 		that.state -= 1
		// 		that.setState()
		// 	})
		// 	window.document.getElementById('footerBtn1').addEventListener('click', () => {
		// 		that.state += 1
		// 		that.setState()
		// 	})
		// 	window.document.getElementById('footerBtn2').addEventListener('click', () => {
		// 		that.state += 1
		// 		that.setState()
		// 	})
		// }
        
		/**
         * @name: 初始化header
         * @that {Object}  将this传入
         * @return: {void}
         */
		function headerinit(that) {
			let headerDom = document.createElement('div')
			headerDom.setAttribute('class', 'processes-header')  // 生成头部dom
			that.info.header.map(function (item, index) {
				// 1. 生成item元素
				let dom = document.createElement('div')
				dom.setAttribute('class', 'processes-header-item')
				if (index == 0) {
					that.addClass(dom, 'processes-header--success')
				}
				dom.innerHTML = `
					<span class="processes-header-num">${index + 1}</span>
					<img class="processes-header-img" src="${imgOk}" style="display:none">
					<span>${item}</span>
				`
				// 2. 注入item元素
				headerDom.appendChild(dom)
			})
			// 3. 渲染
			that.dom.insertBefore(headerDom, that.dom.firstChild)
		}
	}
	/**
     * @name: 下一页
     * @param {type} 
     * @return: 
     */
	next(){
		this.state += 1
		this.setState()
	}

	/**
     * @name: 上一页
     * @param {type} 
     * @return: 
     */
	prev(){
		this.state -= 1
		this.setState()
	}

	/**
     * @name: 跳转到指定页数
     * @param {type} 
     * @return: 
     */
	nextTo(number){
		this.state = number
		this.setState()
	}

	/**
     * @name:   渲染当前状态
     * @return:  {void}
     */
	setState() {
		setFooterState(this, this.state)
		setHeaderState(this, this.state)
		setBodyPage(this)

		/**
         * @name: 渲染当前页
         * @return: null
         */
		function setBodyPage(that) {
			let list = window.document.getElementsByClassName('processes-content')
			for (let i = 0; i < list.length; i++) {
				if(i == that.state){
					list[i].style.display = 'block'
				}else{
					list[i].style.display = 'none'
				}
			}
		}
		/**
         * @name: 渲染尾部状态
         * @that {Object}   传入this
         * @state {Number}   当前状态是第几步
         * @return: null
         */
		function setFooterState(that, state) {
			let items = window.document.getElementsByClassName('processes-footer-item')
			let footer = window.document.getElementsByClassName('processes-footer')[0]
			if (state != that.length) {
				footer.style.display = 'flex'
				for (let i = 0; i < items.length; i++) {
					items[i].style.display = 'block'
				}
			} else {
				footer.style.display = 'none'
				for (let i = 0; i < items.length; i++) {
					items[i].style.display = 'none'
				}
			}
			// 第一步
			if (state == 0) {
				items[0].style.display = 'none'
				items[2].style.display = 'none'
			}
			//倒数第二步
			else if (state == that.length - 1) {
				items[1].style.display = 'none'
			} else {
				items[2].style.display = 'none'
			}

		}
		/**
         * @name: 渲染头部状态
         * @that {Object}   传入this
         * @state {Number}   当前状态是第几步
         * @return: null
         */
		function setHeaderState(that, state) {
			let items = window.document.getElementsByClassName('processes-header-item')
			for (let i = 0; i < items.length; i++) {
				items[i].setAttribute('state', i)
				if (i == state) {
					that.addClass(items[i], 'processes-header--success')
					let numDOM = items[i].getElementsByClassName('processes-header-num')[0]
					let imgDOM = items[i].getElementsByClassName('processes-header-img')[0]
					numDOM.style.display = 'block'
					imgDOM.style.display = 'none'
				}
				else if( i < state){
					let numDOM = items[i].getElementsByClassName('processes-header-num')[0]
					let imgDOM = items[i].getElementsByClassName('processes-header-img')[0]
					numDOM.style.display = 'none'
					imgDOM.style.display = 'block'
				} 
				else {
					that.removeClass(items[i], 'processes-header--success')
					let numDOM = items[i].getElementsByClassName('processes-header-num')[0]
					let imgDOM = items[i].getElementsByClassName('processes-header-img')[0]
					numDOM.style.display = 'block'
					imgDOM.style.display = 'none'
				}
				items[i].addEventListener('click', function () {
					setHeadClick(that, i)
				})
			}
		}
		/**
         * @name: 设置头部点击跳转事件
         * @that {Object}   this
         * @state {Number}   跳转的地址
         * @return: 
         */
		function setHeadClick(that, state) {
			// 只能向后跳转 到了最后一步就不能回跳了到了最后一步就不能回跳了
			if (that.state > state &&that.state < that.length) {
				that.state = state
				that.setState()
			}

		}



	}
	/**
     * @name: 是否存在class
     * @ele {DOM}   节点
     * @cls {String}   属性名
     * @return: 
     */
	hasClass(ele, cls) {
		var clse = cls || ''
		if (clse.replace(/\s/g, '').length == 0) return false //当clse没有参数时，返回false
		return new RegExp(' ' + clse + ' ').test(' ' + ele.className + ' ')
	}
	/**
     * @name: 添加class
     * @ele {DOM}   节点
     * @cls {String}   属性名
     * @return: 
     */
	addClass(ele, cls) {
		if (!this.hasClass(ele, cls)) {
			ele.className = ele.className == '' ? cls : ele.className + ' ' + cls
		}
	}
	/**
     * @name: 删除class
     * @ele {DOM}   节点
     * @cls {String}   属性名
     * @return: 
     */
	removeClass(ele, cls) {
		if (this.hasClass(ele, cls)) {
			var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' '
			while (newClass.indexOf(' ' + cls + ' ') >= 0) {
				newClass = newClass.replace(' ' + cls + ' ', ' ')
			}
			ele.className = newClass.replace(/^\s+|\s+$/g, '')
		}
	}
}

function log() {
	// console.log('被点击了')
}