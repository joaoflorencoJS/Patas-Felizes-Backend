/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down() {},
};
