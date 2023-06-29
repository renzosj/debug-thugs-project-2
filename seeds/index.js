const sequelize = require('../config/connection');
const Users = require('../models/Users');
const userData = require('./user-seeds.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: false});
        
        const createdUsers = await Users.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });
        console.log(createdUsers)

        process.exit(0);
    } catch (error) {
        console.error(error);
    }
}

seedDatabase();