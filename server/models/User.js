const Sequelize = require('sequelize')
const MD5 = require('crypto-js/md5')  //引入crypto

function hashPassword(user, options) {  //password改动的时候对其进行MD5加密
    if (user.changed('password')) {
        user.password = MD5(user.password).toString()
    }
}

module.exports = (sequelize, DataTypes) => {
    class Model extends Sequelize.Model {
        comparePassword(password) { //比较登录密码是否与数据库内密码一致
            return this.password === MD5(password).toString()   //this.password指向model里根据id查找到的password
        }
    }

    Model.init({
        userId: {
            type: DataTypes.INTEGER, //整型
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 16]
            }
        },
        role: {
            type: DataTypes.INTEGER, //整形
            allowNull: false, //不为空
        }
    },
        {
            hooks: {
                afterValidate: hashPassword //验证通过后调用hashpassword函数
            },
            sequelize,
            modelName: 'User'  //根据modelName决定数据表名
        }
    )
    return Model
}