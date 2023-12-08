var path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = (opt) => {
  return {
    mode: 'production',
    entry: path.resolve(opt.path, './lib/index.js'),
    output: {
      path: path.resolve(opt.path, './dist'),
      filename: `${opt.name}.min.js`,
      library: opt.name,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    externals: opt.externals,
    plugins: [
      new CleanWebpackPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [path.resolve(opt.path, './lib')],
          options: {
            // 指定babel配置文件
            configFile: path.resolve(__dirname, '.babelrc')
          }
        }
      ]
    },
    optimization: {
      minimize: true
    }
  }
}

