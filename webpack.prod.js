/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-13 15:13:36
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-30 23:48:52
 */
const path = require('path')
const { smart } = require('webpack-merge')
const base = require('./webpack.base')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')   // 压缩css
const TerserJSPlugin = require('terser-webpack-plugin');    // 压缩js
const webpack = require('webpack')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = smart(base, {
    mode: 'production', // 模式   production  development
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                // include: path.resolve('src'),
                use: [
                    {// 解析图片资源
                        loader: 'file-loader',
                        options: {
                            esModule: false,    // 配置false 与html-withimg-loader 兼容
                            outputPath: 'img/',  // 设置输出路径
                            publicPath: path.resolve(__dirname, "dist", 'img')    // 配置静态路径 否则css下图片引入会出错
                        }
                    }
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,    // 配置false 与html-withimg-loader 兼容
                            outputPath: 'font/',  // 设置输出路径
                            publicPath: path.resolve(__dirname, "dist", 'font')    // 配置静态路径 否则css下图片引入会出错
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        // 全局变量
        new webpack.DefinePlugin({
            // 内部会进行计算 不能直接写字符串 输入 'production' 会被转义为production 变量
            DEV: JSON.stringify('production'),
        }),
        // 拷贝文件
        new copyWebpackPlugin([
            {
                from: `${__dirname}/src/plugins`,
                to: './plugins'
            },
        ])
    ],
    // 优化项
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                cache: true, // 是否缓存
                parallel: true, // 并行打包
                sourceMap: false, // 源码映射   
                terserOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log']     // 干掉所有console.log
                    },
                }
            }), // 压缩js
            new OptimizeCSSAssetsPlugin({
                cache: true, // 是否缓存
                parallel: true, // 并行打包
                sourceMap: false, // 源码映射   
            }), //压缩css
        ],
        splitChunks: {
            cacheGroups: {   // 抽离公共代码
                common: {
                    chunks: 'initial',
                    minSize: 0,
                    name: 'common',
                    minChunks: 2,    // 至少公用两次
                },
                vendor: {
                    priority: 1,        // 权重
                    test: /node_modules/,   // 抽离来自node_moudles的代码
                    chunks: 'initial',
                    name: 'vendor',
                    minSize: 0,
                    minChunks: 2,
                }
            }
        }
    },
})