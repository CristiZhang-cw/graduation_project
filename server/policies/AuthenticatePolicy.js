const jwt = require('jsonwebtoken') //引入jwt包
const config = require('../config') //引入config

function tokenVerify(token) {  //验证用户在登陆时生成的token
    try {
        jwt.verify(token, config.token.secretOrPrivateKey)
        return true //为了if判断而return true
    } catch (error) {
        return false
    }
}

module.exports = {
    isValidToken(request, response, next) {
        let bearerToken = request.headers.authorization
        try {
            let token = bearerToken.split(' ')[1]  //从请求头中获取token值
            if (tokenVerify(token)) {
                next() // 如果token验证成功调用next方法，执行路由中后续的handle
            } else {
                response.status(403).send({
                    code: 403,
                    error: '登录无效请重新登录'
                })
            }
        } catch (error) {
            response.status(401).send({
                status: 401,
                error: '请先登录'
            })
        }
    }
}