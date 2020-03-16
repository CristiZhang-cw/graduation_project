const UserController = require('./controllers/UserController')


module.exports = (app) => {
    app.get ('/api', (request, response) => {    //测试接口
        console.log(request.body);
        response.send({
            msg: 'Hello node'
        })
    })
    
    app.post('/login',UserController.login)         //登录
    app.post('/register',UserController.register)  //账号增
    app.post('/delete',UserController.delete)       //账号删
    app.post('/update',UserController.update)       //账号改
    app.post('/select',UserController.select)       //账号查
}