const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Model extends Sequelize.Model { }
    Model.init({
        userId: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: 1 }
        },
        certificate: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: 1 }
        },
        certifiacteNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { len: 18 }

        },
        nation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
        admissionTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        hometown: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthPlace: {
            type: DataTypes.STRING,
            allowNull: false
        },
        healthStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: 1 }
        },
        bloodType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: 1 }
        },
        grade: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: 4 }
        },
        college: {
            type: DataTypes.STRING,
            allowNull: false
        },
        major: {
            type: DataTypes.STRING,
            allowNull: false
        },
        class: {
            type: DataTypes.STRING,
            allowNull: false
        },
        schoolLength: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: 1 }
        },
        studentStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: 1 }
        },
        education: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: 1 }
        },
        isAtSchool: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: 1 }
        },
        roomNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { isEmail: true }
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: { len: 11 }
        },
        familyNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: { len: 11 }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mailNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: { len: 6 }
        },
        QQ: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        weixin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        marriage: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: 1 }
        },
        highSchool: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gaokaoScore: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: { len: 3 }
        },
        admissionType: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: 1 }
        },
        majorType: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: { len: 1 }
        }
    },
        {
            sequelize,
            modelName: 'fileInfo'
        }
    )
}