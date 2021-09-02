'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('followings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      followerid: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model:"users",
          key:"userName"
      }
      },
      followingid: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model:"users",
          key:"userName"
      }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('followings');
  }
};