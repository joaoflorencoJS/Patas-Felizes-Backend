/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('adopters', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      full_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      age: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: true,
      },
      cep: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      address_street: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      address_district: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      address_number: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      address_complement: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      address_city: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      address_state: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      contact_phone: {
        type: Sequelize.STRING(11),
        allowNull: true,
      },
      contact_email: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      // Link do usuário que está fazendo o pedido de adoção
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE', // Se o id do usuário for alterado, altera o id aqui também
        onDelete: 'CASCADE', // Se o usuário for deletado, deleta o pedido de adoção também
      },
      // Link para o post que o adotante está interessado
      post_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'posts',
          key: 'id',
        },
        onUpdate: 'CASCADE', // Se o id do usuário for alterado, altera o id aqui também
        onDelete: 'CASCADE', // Se o usuário for deletado, deleta o pedido de adoção também
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
    await queryInterface.dropTable('adopters');
  },
};
