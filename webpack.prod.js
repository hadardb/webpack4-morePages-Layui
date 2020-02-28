/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-13 15:13:36
 * @LastEditors: Haojin Sun
 * @LastEditTime: 2020-02-28 13:58:28
 */
const path = require('path')
const { smart } = require('webpack-merge')
const base = require('./webpack.base')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')   // 压缩css
const TerserJSPlugin = require('terser-webpack-plugin')    // 压缩js
const webpack = require('webpack')
const copyWebpackPlugin = require('copy-webpack-plugin')
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = smart(base, {
	mode: 'production', // 模式   production  development
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
				loader: 'happypack/loader?id=happyBabel',
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				include: path.resolve('src'),
				use: [
					{// 解析图片资源
						loader: 'file-loader',
						options: {
							esModule: false,    // 配置false 与html-withimg-loader 兼容
							outputPath: 'img/',  // 设置输出路径
							publicPath:'http://10.35.76.243/tc-zjcs/img'    // 配置静态路径 否则css下图片引入会出错
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
							// publicPath: path.resolve(__dirname, 'dist', 'font')    // 配置静态路径 否则css下图片引入会出错
							 publicPath: 'http://10.35.76.243/tc-zjcs/font'   // 配置静态路径 否则css下图片引入会出错
						}
					}
				]
			},
		]
	},
	plugins: [
		new HappyPack({
			//用id来标识 happypack处理那里类文件
		  id: 'happyBabel',
		  //如何处理  用法和loader 的配置一样
		  loaders: [{
			loader: 'babel-loader',
			query: {
				presets: [
					[
						'@babel/preset-env',
						{
							'useBuiltIns': 'usage',			// 去覆盖config文件下的presets配置 
							'modules': false,
							'corejs': 3
						}
					],
				]
			  }
		  }],
		  //共享进程池
		  threadPool: happyThreadPool,
		  //允许 HappyPack 输出日志
		  verbose: true,
		}),
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
		]
	},
})