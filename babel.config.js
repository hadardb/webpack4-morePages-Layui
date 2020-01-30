/*
 * @name: 文件
 * @Author: Haojin Sun
 * @Date: 2020-01-27 16:21:48
 * @LastEditors  : Haojin Sun
 * @LastEditTime : 2020-01-27 16:24:52
 */
module.exports = {
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
    env: {
        "development": {
                "plugins": ["transform-es2015-modules-commonjs"]
        },
        "test": {
                "plugins": ["transform-es2015-modules-commonjs"]
        }
    }
  };