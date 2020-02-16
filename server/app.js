const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const {sequelize} = require('./models')
const app = express()
app.use(bodyParser.json())
app.use(morgan('conbined'))

// app.get('/',(requset,response) =>{
//     response.send({
//         msg: 'Hello node'
//     })
// })

sequelize
  .sync({force:true}) //调用sync()根据model自动在数据库中创建表  force:true强制更新，即使已经判断表已经存在，还是会删除旧的表再创建新的表
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



app.listen(3000, () => console.log('Server han been started on port 3000'))