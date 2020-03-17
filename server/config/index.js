module.exports = {
    db: {
        database: 'auth',
        username: 'zcw',
        password: '123456',
        options:{
            host:'localhost',
            dialect:'mysql' //sqlite
        }
    },
    token: { //在config中配置token，好处是生成和验证token时可以直接引入
        secretOrPrivateKey: 'graduation', //secretOrPrivateKey是加密的key或者叫做密匙,不知道密匙是无法解析payload参数的.
        options: {
            expiresIn: '24h' //token有效期不带单位默认为秒
        }
    }
}