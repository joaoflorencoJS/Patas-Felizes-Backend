const { compare, hash, genSaltSync } = require('bcryptjs');
const { Sequelize, Model } = require('sequelize');

module.exports = class Ong extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'O nome inserido já está cadastrado.',
        },
        validate: {
          len: {
            args: [3, 100],
            msg: 'O campo nome deve conter entre 3 e 100 caracteres.',
          },
        },
      },
      cnpj: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        unique: {
          msg: 'O CNPJ inserido já está cadastrado.',
        },
        validate: {
          len: {
            args: [14, 14],
            msg: 'O CNPJ deve conter 14 caracteres.',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 60],
            msg: 'A senha deve conter entre 8 e 60 caracteres.',
          },
        },
      },
    }, { sequelize, modelName: 'Ong' });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        const salt = genSaltSync(8);
        user.password_hash = await hash(user.password, salt);
      }
    });
    return this;
  }

  passwordIsValid(password) {
    return compare(password, this.password_hash);
  }
};
