<!--
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-23 12:53:04
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-30 23:48:17
 -->
# 安装依赖
```
yarn install
如果node-sass 包拉的很慢请切换淘宝的镜像源（yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass）
``` 
# 开发环境
```
npm run dev
```
# 生产环境
```
npm run build
```
# 代码git提交
```
npm run commit
```
# 技术栈
1. webpack
2. label
3. scss
4. art-template
5. layui   （需要的自己将layui放入plugins文件夹， git拉下来的时间实在太长，受不了）
6. jest

# 目录结构说明
```
|-- 目录
├─.eslintrc.json        
├─.gitignore            
├─package.json
├─postcss.config.js
├─README.md
├─webpack.base.js       // 通用配置
├─webpack.dev.js        // 开发环境
├─webpack.prod.js       // 生产环境
├─yarn.lock
├─src                   // 源文件目录
|  ├─views              // 页面文件
|  |   ├─test           // test页面
|  |   |  ├─index.css    // test的css
|  |   |  ├─index.html   // test的html
|  |   |  ├─index.js      // test的js
|  |   ├─index          // 如上
|  |   |   ├─index.html
|  |   |   ├─index.js
|  |   |   ├─index.scss
|  |   ├─layout         // 使用了art组件
|  |   |   ├─index.html
|  |   |   ├─index.js
|  |   ├─myLayui          // 静态使用layui
|  |   |   ├─index.html
|  |   |   ├─index.js
|  |   |   ├─index.scss
|  ├─libs             // 存放公共方法
|  |   ├─axios.js       // axios方法
|  |   ├─tools.js       // 存放与业务无关的工具方法
|  |   ├─util.js       // 存放与业务有关的工具方法
|  ├─config             // 存放配置项
|  ├─api             // 存放后端接口
|  ├─plugin             // 存放一些没有npm包的静态小插件
|  ├─img                图片目录
|  |  ├─icon1.png       
|  |  └index.png
|  ├─font               // 字体目录
|  ├─mock      // mock数据
|  |  ├─a.json
|  ├─css                // 通用css目录
|  |  ├─main.scss       // 将所有的通用变量、mixin
|  |  ├─_variable.scss  // 存放变量
|  |  ├─_class.scss     // 存放通用class
|  |  ├─mixin           // 存放mixin
|  |  |   └_size.scss   // 每个mixin 单独一个文件
|  |  ├─function        // 存放function
|  |  |    └_ceshi.scss // 每个function 单独一个文件
|  ├─components         // 通用组件
|  |     ├─compo            // 组件文件夹 使用原生的html
|  |     |   ├─index.html
|  |     |   ├─index.js
|  |     |   └─index.scss
|  |     ├─layout            // 组件文件夹  使用art-template
|  |     |   ├─index.art
|  |     |   ├─index.js
|  |     |   └─index.scss

├─test      // 测试目录
|  └tools.test.js   // 测试文件
├─dist      // 生产目录
├─build     // 开发目录
```

# 组件说明
1. 通过art-Template模板语言进行组件编写
2. 组件内部实现采用就近原则，仅在该组件内的静态文件都放在该组件下，当组件过大时将组件拆分为子组件

# 问题汇总
1. 本想使用pug作为模板语法进行组件化开发，但是发现pug在webpack中使用并不是非常友好，本身的方法需要fs模块进行支持。
使用pug-loader可以支持静态html,但是研究了一下好像并不能够进行支持传参，如果知道怎么做的小伙伴请告知一下，万分感谢！
所以最后使用了编译速度更快的，在webpack下更友好的art-template模板语言进行组件化代码的编写，但是art-teamplat也存在较多的弊端，
例如： IDE不识别art的语法(在VScode下可以安装插件 Art Template Helper)，没有完善的语法提示， 无法ctrl + 左键进行文件的跳转。

2. 使用splitChunks对公共代码进行抽离。发现在html页面中调用js没有响应输出，查看源码发现被抽离的公共部分并没有被载入到html中，
通过设置HtmlWebpackPlugin插件的chunks将抽离出来的公共组件进行插入，并必须为每个公共模块设置名称，否则无法控制需要载入哪些模块，这也导致了会载入一些可能没有用到的多余代码，暂时还没有找到解决方案。

3. 在不同层级的css文件中引入img文件，在打包后文件地址引用错误，目前是使用了绝对地址进行设置，也就意味着当切换使用目录时，需要重新设置绝对根目录地址。

4. 当前公共样式css中静态资源的引用都需要使用 ``` ../../ ``` 进行文件指引，暂时没有找到解决方案

5. 在引入layui-src后发现，虽然layui发布了这么一个包，但是内部的模块化逻辑是它特有的一套，webpack并不支持，所以通过语法对layui进行导入无法使用，最终还是将laui提取城plugin，当作静态文件进行处理。