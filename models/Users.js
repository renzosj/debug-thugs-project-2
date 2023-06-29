const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Users extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Users.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          //len: [8],
        },
      },
      bed_time: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: "22:00:00", // 10pm i think
        validate: {
          //check for correct format -- double check if this is necessary
        },
        created_date: {
          type: DataTypes.DATETIME,
          allownull: false,
          defaultValue: sequelize.NOW
        }
      }
    },
    {
      hooks: {
        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
      },
      sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
      // test using manually and compare to making this true
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'users',
    }
  );
  
  module.exports = Users;