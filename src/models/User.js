const { hash, genSaltSync, compare } = require('bcryptjs');
const { Model, Sequelize } = require('sequelize');

module.exports = class User extends Model {
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
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'O e-mail inserido já está cadastrado.',
        },
        validate: {
          isEmail: {
            msg: 'O e-mail informado é inválido.',
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
    }, { sequelize, modelName: 'User' });

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

  static associate(models) {
    this.hasMany(models.Posts, { foreignKey: 'user_id' });
  }
};
