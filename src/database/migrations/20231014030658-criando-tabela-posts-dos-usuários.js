/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE', // Se o id do usuário for alterado, altera o id do post
        onDelete: 'CASCADE', // Se o usuário for deletado, deleta o post
      },
      ong_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'ongs',
          key: 'id',
        },
        onUpdate: 'CASCADE', // Se o id da ong for alterado, altera o id do post
        onDelete: 'CASCADE', // Se a ong for deletada, deleta o post
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('posts');
  },
};
