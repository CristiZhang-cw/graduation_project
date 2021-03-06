const UserController = require('./controllers/UserController')
const fileInfoController = require('./controllers/fileInfoController')
const messageBoardController = require('./controllers/messageBoardController')
const deletedFileController = require('./controllers/deletedFileController')
const AuthenticatePolicy = require('./policies/AuthenticatePolicy')

module.exports = (app) => {
    app.get('/api', (request, response) => {    //测试接口
        console.log(request.body);
        response.send({
            msg: 'Hello node'
        })
    })

    app.post('/user/login', UserController.login)         //登录
    app.post('/user/register', UserController.register)  //账号增
    app.post('/user/delete', AuthenticatePolicy.isValidToken, UserController.delete)       //账号删
    app.post('/user/update', AuthenticatePolicy.isValidToken, UserController.update)       //账号改
    app.post('/user/select', AuthenticatePolicy.isValidToken, UserController.select)    //账号查
    app.post('/file/addfile', AuthenticatePolicy.isValidToken, fileInfoController.addfile) //档案增
    //app.post('/file/deletefile', AuthenticatePolicy.isValidToken, fileInfoController.deletefile) //档案删
    app.post('/file/updatefile', AuthenticatePolicy.isValidToken, fileInfoController.updatefile)  //档案改
    app.post('/file/searchfile', AuthenticatePolicy.isValidToken, fileInfoController.searchfile) //档案查
    app.post('/message/addMessage', AuthenticatePolicy.isValidToken, messageBoardController.addMessage) //留言版增
    app.post('/message/selectMessage',AuthenticatePolicy.isValidToken,messageBoardController.selectMessage) //留言板查
    app.post('/deletedFile/searchDeleteFile',AuthenticatePolicy.isValidToken,deletedFileController.searchfile) //
    app.post('/deletedFile/deletedfile',AuthenticatePolicy.isValidToken,deletedFileController.deletedfile,fileInfoController.deletefile)
}