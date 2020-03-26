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
    proxy: { //配置代理解决跨域问题
      '/api': {  //默认遇到/api，就会把默认的域名(http://localhost:8080)换成目标域名
        target: 'http://localhost:3000',  //目标API地址
        // ws: true,  //websockets
        // secure:false, //http为false，https为true
        changeOrigin: true,  //开启代理
        pathRewrite: {
          '^/api': '/' //重写路径，替换掉/api
        }
      }
    }
  }
}