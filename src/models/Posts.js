const { Model, Sequelize } = require('sequelize');

module.exports = class Posts extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        validate: {
          isUUID: {
            args: 4,
            msg: 'O campo id deve ser um UUID válido.',
          },
        },
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 150],
            msg: 'O campo título deve conter entre 3 e 150 caracteres.',
          },
        },
      },
      content: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 500],
            msg: 'O campo conteúdo deve conter entre 3 e 500 caracteres.',
          },
        },
      },
      url: {
        type: Sequelize.STRING,
        unique: {
          msg: 'Já existe um post com essa url.',
        },
      },
      public_id: {
        type: Sequelize.STRING,
        unique: {
          msg: 'Já existe um post com esse public_id.',
        },
      },
    }, { sequelize, modelName: 'Posts' });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Ong, { foreignKey: 'ong_id', as: 'ong' });
    this.hasMany(models.Adopter, { foreignKey: 'post_id', as: 'adopter' });
  }
};
