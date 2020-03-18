const { User } = require('../models')
const config = require('../config')
const jwt = require('jsonwebtoken')

function tokenSign({ id, userId }) {  //生成token
    try {
        return jwt.sign({ id, userId }, config.token.secretOrPrivateKey, config.token.options)
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    async register(request, response) {    //增加
        try {
            const user = await User.create(request.body)
            response.status(200).send({
                result: 1,
                user: user
            })
        } catch (error) {
            response.status(400).send({
                code: 400,
                error: '用户创建失败'
            })
        }
    },
    async select(request, response) {  //查询
        try {
            const user = await User.findByPk(request.body.id) //Pk是primary key findByPk()根据主键查询
            // console.log(request.body.id);
            if (user) {
                response.status(200).send({ user })
            } else {
                response.status(400).send({
                    code: 400,
                    error: '未查询到对应数据'
                })
            }
        } catch (error) {
            response.status(500).send({
                code: 500,
                error: '查询失败'
            })
        }
    },
    async update(request, response) { //更新
        try {
            const user = await User.update(
                request.body,
                {
                    where: {
                        id: request.body.id  //根据主键更改表内数据
                    }
                }
            )
            response.status(200).send({ user })
        } catch (error) {
            response.status(500).send({
                code: 500,
                error: '更新失败'
            })
        }
    },
    async delete(request, response) { //删除
        try {
            await User.destroy(
                {
                    where: {
                        id: request.body.id
                    }
                }
            )
            response.status(200).send({ message: '数据删除成功' })
        } catch (error) {
            response.status(500).send({ message: '数据删除失败' })
        }
    },
    async login(request, response) { //登录
        try {
            const user = await User.findOne({
                where: {
                    userId: request.body.userId   //先根据ID查找数据
                }
            })
            let isValidPassword = user.comparePassword(request.body.password)  //比较查找的数据与输入的数据是否一致  
            if (isValidPassword) {
                response.send({
                    user: user.toJSON(),
                    token: tokenSign(user) //验证登录信息正确后，调用tokenSign函数 返回创建的token
                })
            }
        } catch (error) {
            response.status(403).send({
                code: 403,
                error: '用户名或密码错误'
            })
        }
    }
}