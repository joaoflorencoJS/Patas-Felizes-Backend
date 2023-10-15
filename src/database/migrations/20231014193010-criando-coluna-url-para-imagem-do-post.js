/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('posts', 'url', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

    await queryInterface.addColumn('posts', 'public_id', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });
  },

  async down() {},
};
