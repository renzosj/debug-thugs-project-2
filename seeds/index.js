const sequelize = require('../config/connection');
const Users = require('../models/Users');
const Chats = require('../models/Chats');
const Messages = require('../models/Messages');
const Mappings = require('../models/Chats_Users_Mapping');
const userData = require('./user-seeds.json');
const chatData = require('./chat-seeds.json');
const messageData = require('./message-seeds.json');
const mappingData = require('./mapping-seeds.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: false});
        
        const createdUsers = await Users.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });
        const createdChats = await Chats.bulkCreate(chatData, {
            individualHooks: true,
            returning: true,
        });
        const createdMessages = await Messages.bulkCreate(messageData, {
            individualHooks: true,
            returning: true,
        });
        const createdMapping = await Mappings.bulkCreate(mappingData, {
            individualHooks: true,
            returning: true,
        });
        console.log(createdUsers)
        console.log(createdChats)
        console.log(createdMessages)
        console.log(createdMapping)

        process.exit(0);
    } catch (error) {
        console.error(error);
    }
}

seedDatabase();