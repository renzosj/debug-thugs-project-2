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
        // Foreign Key
        chat_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'chats',
                key: 'chat_id'
            },
            allowNull: false
        },
        // Foreign Key
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
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
        delay_send: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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