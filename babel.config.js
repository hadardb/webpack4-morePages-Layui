/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-27 16:21:48
 * @LastEditors: Haojin Sun
 * @LastEditTime: 2020-02-20 13:19:17
 */
module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
        targets: {
          node: 'current',      // 转换jest 中的ES6 语法
        }
			}
		],
	],
	plugins: [
		'@babel/plugin-transform-runtime',
		'@babel/plugin-transform-parameters',
		'@babel/plugin-transform-shorthand-properties',  // 支持 参数同名简写
		"@babel/plugin-transform-classes"
	],
	env: {
		'test': {
			'plugins': ['transform-es2015-modules-commonjs']
		}
	}
}