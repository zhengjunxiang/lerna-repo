module.exports = {
  "targets": {
    "chrome": "58",
    "ie": "11"
  },
  "presets": [
    [
      "@babel/preset-env",
      {
        // "modules": false,
        // 其实默认就是false，这里我为了和大家刻意强调不要混在一起使用
        "useBuiltIns": false,
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        // polyfill使用的corejs版本
        // 需要注意这里是@babel/runtime-corejs3 和 preset-env 中是不同的 npm 包
        "corejs": {
          "version": 3,
          "proposals": true
        },
        // 切换对于 @babel/runtime 造成重复的 _extend() 之类的工具函数提取
        // 默认为true 表示将这些工具函数抽离成为工具包引入而不必在每个模块中单独定义
        "helpers": true,
        // 切换生成器函数是否污染全局
        // 为true时打包体积会稍微有些大 但生成器函数并不会污染全局作用域
        "regenerator": true,
      }
    ]
  ]
}
