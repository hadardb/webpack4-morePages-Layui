/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-15 11:15:03
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-27 16:11:18
 */
/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-12 12:31:36
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-17 17:35:48
 */

const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')   // 压缩css
const TerserJSPlugin = require('terser-webpack-plugin');    // 压缩js
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

// bannerPlugin  // 内置 为js添加共同头部注释
module.exports = {
    entry: setEntry(),
    // entry: fs.readdirSync(`${__dirname}/src/views`).reduce((entries, dir) => {
    //     let jsFile = path.join(`${__dirname}/src/views`, dir, `${dir}.js`)
    //     if (fs.existsSync(jsFile)) {  // 如果js存在
    //         entries[dir] = jsFile
    //     }
    //     return entries
    // }, {}),    //入口
    output: {
        filename: 'js/[name].[hash:8].js',  // 构建后的名称
        path: path.resolve(__dirname, 'dist'),    // 路径必须是绝对路径
        // publicPath: 'http://localhost:3000/', // 静态路径前缀  会对所有打包资源添加  如需对单独资源添加 在对应loader下添加publicPath
    },
    // 不需要打包的模块配置
    // externals: {
    //     jquery: '$'
    // },

    // 插件 
    plugins: setPlugins(),
    // 模块
    module: {
        // 不去解析包中的依赖关系
        noParse: /jquery/,
        rules: [ // 规则    从下向上执行
            {
                test: /\.html$/,
                // 只找src下的文件
                include: path.resolve('src'),
                use: {
                    loader: 'html-withimg-loader',
                },

            },
            {
                test: /\.art$/,
                loader: "art-template-loader",
                options: {
                    // art-template options (if necessary)
                    // @see https://github.com/aui/art-template
                },
            },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     include: path.resolve('src'),
            //     use: [
            //         {// 解析图片资源
            //             loader: 'file-loader',
            //             options: {
            //                 esModule: false,    // 配置false 与html-withimg-loader 兼容
            //                 outputPath: 'img/',  // 设置输出路径
            //                 // publicPath: path.resolve(__dirname,"dist",'img')
            //             }
            //         }
            //     ],
            // },

            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            node: 'current',
                                        },
                                    },
                                ],
                            ],
                            plugins: [
                                "@babel/plugin-transform-runtime"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader: 'style-loader', // 将css 插入到head中
                    //     options: {
                    //         insert: insertAtTop // 将css插入到head顶部
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader',   // 编译css文件
                    'postcss-loader',
                ]
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    // {
                    //     loader: 'style-loader', // 将css 插入到head中
                    //     options: {
                    //         insert: insertAtTop // 将css插入到head顶部
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',   // 编译css文件
                    },

                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [`${__dirname}/src/css/main.scss`]       // 插入全局scss
                        }
                    }
                ]
            },
            // {            // 如果require引入， 可以使用该插件变为全局变量
            //     test:require.resolve('jquery'),
            //     use:'expose-loader?$!'
            // },
        ]
    },



    //watch 监听 实时打包
    // watch:true,

    // watch 的配置项
    // watchOptions:{
    //     poll: 1000,  // 多少秒更新一次
    //     aggregateTimeout: 1000, // 防抖 的时间
    //     ignored:/node_modules/,  // 不监听哪个文件
    // },



    // 解析第三方包 配置
    resolve: {
        // 省略扩展名  依次解析
        extensions: ['.js', '.scss', '.css', '.art'],
        // 起别名
        alias: {
            'img': path.resolve(__dirname, 'src/img/'),
            'js': path.resolve(__dirname, 'src/js/'),
            'css': path.resolve(__dirname, 'src/css/'),
            '@': path.resolve(__dirname, 'src/'),
            '_c': path.resolve(__dirname, 'src/components'),
            'plugins': path.resolve(__dirname, 'src/plugins/'),
            // 'layui':  path.resolve(__dirname, 'node_modules/layui-src/dist/'),   // layui没有用传统模块化这一套 require进去也没用 必须打包整个layui出去
        }
    }
}


// 将css插入到head顶部
function insertAtTop(element) {
    var parent = document.querySelector('head');
    // eslint-disable-next-line no-underscore-dangle
    var lastInsertedElement =
        window._lastElementInsertedByStyleLoader;

    if (!lastInsertedElement) {
        parent.insertBefore(element, parent.firstChild);
    } else if (lastInsertedElement.nextSibling) {
        parent.insertBefore(element, lastInsertedElement.nextSibling);
    } else {
        parent.appendChild(element);
    }

    // eslint-disable-next-line no-underscore-dangle
    window._lastElementInsertedByStyleLoader = element;
}


// 管理插件
function setPlugins() {
    var data = [   // 存放插件
        // 打包css
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css',
        }),
        // 给模块传递全局变量
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        // 清空目录
        new CleanWebpackPlugin(),

        // 指定引入的依赖补引入某些用不到的子依赖，以减小整体资源大小
        // new webpack.IgnorePlugin(),

        // 拷贝文件
        new copyWebpackPlugin([
            {
                from: `${__dirname}/src/plugins`,
                to: './plugins'
            }
        ])
    ]
    fs.readdirSync(`${__dirname}/src/views`).reduce((entries, dir) => {
        let jsFile = path.join(`${__dirname}/src/views`, dir, `${dir}.js`)
        if (fs.existsSync(jsFile)) {  // 如果js存在
            data.push(new HtmlWebpackPlugin(getHtmlConfig(dir)))
        }
    }, {})
    return data
}

// 统一创建html插件
function getHtmlConfig(name) {
    return {
        template: `./src/views/${name}/${name}.html`,
        filename: `./${name}.html`,
        title: name,
        // 设置为true或'body'会将js模块放入模板底部，设置为'head'会将js模块放入head中
        inject: 'body',
        minify: process.env.NODE_ENV === "development" ? false : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            removeAttributeQuotes: true, //去除属性双引号
        },
        //设为true会在文件尾部增加hash值，防止缓存的影响
        hash: true,
        //需要打包的模块
        chunks: [`${name}`, 'common', 'vendor']
    }
}


/**
 * @name: 创建入口
 * @param {type} 
 * @return: 入口数组
 */
function setEntry() {
    let entery = {
        // main: `${__dirname}/src/css/main.js`
    }
    let pageJs = fs.readdirSync(`${__dirname}/src/views`).reduce((entries, dir) => {
        let jsFile = path.join(`${__dirname}/src/views`, dir, `${dir}.js`)
        if (fs.existsSync(jsFile)) {  // 如果js存在
            entries[dir] = jsFile


        }
        return entries
    }, {})
    Object.assign(entery, pageJs)
    return entery
}