const UserController = require('./controllers/UserController')


module.exports = (app) => {
    app.get ('/api', (request, response) => {    //测试接口
        console.log(request.body);
        response.send({
            msg: 'Hello node'
        })
    })
    app.post('/select',UserController.select)
    app.post('/update',UserController.update)
    app.post('/register',UserController.register)
    app.post('/delete',UserController.delete)
}