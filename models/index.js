const Users = require('./Users');
const Messages = require('./Messages');
const Chats = require('./Chats');
const Mappings = require('./Chats_Users_Mapping');
const sequelize = require('../config/connection.js');

const UserConversation = sequelize.define('UserConversation', {});

Users.hasMany(Messages, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Looked into how sequelize does join tables, apparently we can create an empty model with sequelize.define and pass it "through"
// needs review that this works as intended, UsersID
Users.belongsToMany(Chats, {through: UserConversation});
Chats.belongsToMany(Users, {through: UserConversation});

Chats.hasMany(Messages, {
    foreignKey: 'chat_id',
    onDelete: 'CASCADE'
});

Messages.belongsTo(Chats, {
    foreignKey: 'chat_id',
    onDelete: 'CASCADE'
});

Messages.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})


module.exports = { Users, Chats, Messages, Mappings };