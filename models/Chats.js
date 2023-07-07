const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Chats extends Model {
// Methods
}

Chats.init(
    {
        chat_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
            defaultValue: 0
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: 'user_id'
            }
        },
        chat_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_date: {
            type: DataTypes.DATE,
            allownull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'chats'
    }
);

module.exports = Chats;