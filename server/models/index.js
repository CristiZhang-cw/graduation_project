const config = require('../config')
const Sequelize = require('sequelize')
const db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    config.db.options
)

const User = sequelize.import('./User.js')
const fileInfo = sequelize.import('./fileInfo.js')
const messageBoard = sequelize.import('./messageBoard.js')

db.Sequelize = Sequelize
db.sequelize = sequelize
db.User = User
db.fileInfo = fileInfo
db.messageBoard = messageBoard

module.exports = db