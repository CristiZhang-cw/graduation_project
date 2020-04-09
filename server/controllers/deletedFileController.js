const {fileInfo,deletedFile} = require('../models')

module.exports = {
    async searchfile(request,response) {
        try {
            const file = await deletedFile.findOne({
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
    },
    async deletedfile(request,response,next) {
        try{
        const file = await fileInfo.findOne({
            where:{
                id: request.body.id
            }
        })
        console.log(file.dataValues);
        await deletedFile.create(file.dataValues)
        next();
    } catch (error) {
        response.status(400).send({
            status: 400,
            error: '出档失败'
        })
    }
    }
}