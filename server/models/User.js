const Sequelize = require('sequelize')

module.exports = (sequelize,DataTypes) => {
    class Model extends Sequelize.Model {}

    Model.init({
        userId:{
            type: DataTypes.STRING, //string类型
            unique: true,
            allowNull: false
        },
        password:{ 
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[6,16]
            }
        },
        role: {
            type: DataTypes.INTEGER, //整形
            allowNull: false, //不为空
        }
    },
    {
        sequelize,
        modelName: 'User'  //根据modelName决定数据表名
    }
    )
     return Model
}