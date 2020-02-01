/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-27 16:21:48
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-02-01 17:58:49
 */
module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "modules": false,
      }
    ]
  ],
  plugins: [
    "@babel/plugin-transform-runtime"
  ],
  env: {
    "test": {
      "plugins": ["transform-es2015-modules-commonjs"]
    }
  }
};