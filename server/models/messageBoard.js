const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Model extends Sequelize.Model { }

    Model.init({
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            sequelize,
            modelName: 'message'
        }
    )
    return Model
}