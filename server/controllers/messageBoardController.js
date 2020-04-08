const {messageBoard} = require('../models')

module.exports = {
    async addMessage(request, response) {
        try{
            const message = await messageBoard.create(request.body)
            response.status(200).send({
                result: 1,
                message
            })
        } catch(error) {
            response.status(400).send({
                code: 400,
                error: '留言发表失败'
            })
        }
    },
    async selectMessage(request, response) {
        try{
            const messageList = await messageBoard.findAll()
            response.status(200).send({
                result: 1,
                messageList
            })
        } catch(error) {
            response.status(400).send({
                code: 400,
                error: '留言查询失败'
            })
        }
    }
}