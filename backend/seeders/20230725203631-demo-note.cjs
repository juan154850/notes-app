"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Notes",
      [
        {
          title: "Read about programming.",
          description: "Choose a programming book and start reading it.",
          categories: ["technology"],
          is_archived: false,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Take time for yourself",
          description: "Don't forget to practice your favorite hobby",
          categories: ["health"],
          is_archived: false,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Cleaning the house",
          description: "Doing chores and walking the animals.",
          categories: ["home"],
          is_archived: false,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
