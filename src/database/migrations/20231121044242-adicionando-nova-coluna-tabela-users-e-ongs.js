/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'user_info', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
    });

    await queryInterface.addColumn('ongs', 'ong_info', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
