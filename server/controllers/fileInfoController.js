const { fileInfo } = require('../models')

module.exports = {
    async addfile(request, response) {
        try {
            // console.log(request.body);
            const file = await fileInfo.create(request.body)
            response.status(200).send({
                result: 1,
                file: file
            })
        } catch (error) {
            response.status(400).send({
                code: 400,
                error: '档案新建失败'
            })
        }
    },
    async deletefile(request, response) {
        try {
            await fileInfo.destroy(
                {
                    where: {
                        id: request.body.id
                    }
                }
            )
            response.status(200).send({ message: '档案删除成功' })
        } catch (error) {
            response.status(500).send({ message: '档案删除失败' })
        }
    },
    async updatefile(request, response) {
        try {
            const file = await fileInfo.update(request.body,
                {
                    where: {
                        id: request.body.id
                    }
                }
            )
            response.status(200).send({
                result: 1,
                file
            })
        } catch (error) {
            response.status(500).send({
                code: 500,
                error: '档案更新失败'
            })
        }
    },
    async searchfile(request, response) {
        console.log(request.body);
        try {
            const file = await fileInfo.findOne({
                where: {
                    userId: request.body.userId
                }
            })
            if (file) {
                response.status(200).send({
                    result: 1,
                    file
                })
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
    }
}