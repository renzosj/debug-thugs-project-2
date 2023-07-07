const { Model, DataTypes} = require('sequelize');
//const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Messages extends Model {
    //methods
}

Messages.init(
    {
        message_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        chat_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Chats",
                key: 'chat_id'
            },
            allowNull: false,
            defaultValue: 9
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: 'user_id'
            },
            allowNull: false
        },
        message_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        created_date: {
            type: DataTypes.DATE,
            allownull: false,
            defaultValue: DataTypes.NOW
        },
        delay_send: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        } 
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'messages'
    }
)

module.exports = Messages;