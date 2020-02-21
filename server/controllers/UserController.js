const { User } = require('../models')



module.exports = {
    async register(request, response) {    //增加
        try {
            const user = await User.create(request.body)
            response.status(200).send({ user })
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
            response.status(200).send({ user })
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
            response.status(200).send({ user})
        } catch (error) {
            response.status(500).send({
                code: 500,
                error: '更新失败'
            })
        }
    },
}