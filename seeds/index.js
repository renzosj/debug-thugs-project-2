const sequelize = require('../config/connection');
const User = require('../models/User');
const userData = require('./user-seeds.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true});
        
        const createdUsers = await User.bulkCreate(userData, {
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