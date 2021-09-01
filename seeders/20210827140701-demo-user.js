"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          userName: "user1",
          email: "user1@test.com",
          token:
            "a round piece of metal, plastic, etc. that you use instead of money to operate some machines or as a form of payment",
          bio: "Creating a life, I love.",
          image: "hello.png" ,
          password:"123"
        },
        {
          userName: "user2",
          email: "user2@test.com",
          token:"a round piece of metal, plastic, etc. that you use instead of money to operate some machines or as a form of payment",
          bio: "Creating a life, I love.",
          image: "hello.png",
          password:"123"
        },
        {
          userName: "user3",
          email: "user3@test.com",
          token:"a round piece of metal, plastic, etc. that you use instead of money to operate some machines or as a form of payment",
          bio: "Creating a life, I love.",
          image: "hello.png",
          password:"123"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
