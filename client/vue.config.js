let path = require('path')
// const proxy = require('http-proxy-middleware')

function resolve(dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  lintOnSave: false, //取消ESlint校验代码

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // ws: true,
        // secure:false,
        changeOrigin: true, 
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}