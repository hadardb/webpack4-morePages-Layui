<!--
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-23 12:53:04
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-23 13:35:13
 -->
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
|  |   |  ├─test.css    // test的css
|  |   |  ├─test.html   // test的html
|  |   |  └test.js      // test的js
|  |   ├─index          // 如上
|  |   |   ├─index.html
|  |   |   ├─index.js
|  |   |   └index.scss
|  ├─plugin             // 存放一些没有npm包的静态小插件
|  ├─js                 // 自己编写的通用js 请将每个方法、每个构造函数分别生成js文件
|  | ├─a.js
|  | ├─b.js
|  | └main.js           // 将写好的方法导入main.js 会通过webpack把main.js 自动追加到html文件
|  ├─img                图片目录
|  |  ├─icon1.png       
|  |  └index.png
|  ├─font               // 字体目录
|  ├─css                // 通用css目录
|  |  ├─main.scss       // 将所有的通用变量、mixin
|  |  ├─_variable.scss  // 存放变量
|  |  ├─_class.scss     // 存放通用class
|  |  ├─mixin           // 存放mixin
|  |  |   └_size.scss   // 每个mixin 单独一个文件
|  |  ├─function        // 存放function
|  |  |    └_ceshi.scss // 每个function 单独一个文件
|  ├─components         // 通用组件
|  |     ├─compo            // 组件文件夹
|  |     |   ├─compo.html
|  |     |   ├─compo.js
|  |     |   └compo.scss
├─mock      // mock数据
|  └a.json
├─dist      // 生产目录
├─build     // 开发目录
```