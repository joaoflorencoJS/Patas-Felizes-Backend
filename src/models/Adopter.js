const { Model, Sequelize } = require('sequelize');

module.exports = class Adopter extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      full_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 100],
            msg: 'O campo nome deve conter entre 3 e 100 caracteres.',
          },
        },
        allowNull: false,
      },
      age: {
        type: Sequelize.DATE,
        defaultValue: '',
        validate: {
          isMajority(birthDate) {
            const [day, month, year] = new Date(birthDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }).split('/');
            const birth = new Date(year, month - 1, day);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const birthMonth = today.getMonth() - birth.getMonth();

            if (birthMonth < 0 || (birthMonth === 0 && today.getDate() < birth.getDate())) {
              age -= 1;
            }

            if (age < 18) {
              throw new Error('O adotante deve ser maior de idade.');
            }

            return age;
          },
        },
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
          len: {
            args: [11, 11],
            msg: 'O CPF deve conter 11 caracteres.',
          },
        },
      },
      cep: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 8],
            msg: 'O CEP deve conter 8 caracteres.',
          },
        },
        allowNull: false,
      },
      address_street: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 120],
            msg: 'O campo rua deve conter entre 3 e 120 caracteres.',
          },
        },
        allowNull: false,
      },
      address_district: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 100],
            msg: 'O campo bairro deve conter entre 3 e 100 caracteres.',
          },
        },
        allowNull: false,
      },
      address_number: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [1, 8],
            msg: 'O campo número deve conter entre 1 e 8 caracteres.',
          },
        },
        allowNull: false,
      },
      address_complement: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [0, 50],
            msg: 'O campo complemento deve conter no máximo 50 caracteres.',
          },
        },
        allowNull: true,
      },
      address_city: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'O campo cidade deve conter entre 3 e 50 caracteres.',
          },
        },
        allowNull: false,
      },
      address_state: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 2],
            msg: 'O campo estado deve conter 2 caracteres.',
          },
        },
        allowNull: false,
      },
      contact_phone: {
        type: Sequelize.STRING,
        defaultValue: null,
        validate: {
          len: {
            args: [10, 11],
            msg: 'O campo telefone deve conter entre 10 e 11 caracteres.',
          },
        },
        allowNull: true,
      },
      contact_email: {
        type: Sequelize.STRING,
        defaultValue: null,
        validate: {
          isEmail: {
            msg: 'O campo e-mail deve ser um e-mail válido.',
          },
        },
        allowNull: true,
      },
    }, { sequelize, modelName: 'Adopter' });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Posts, { foreignKey: 'post_id', as: 'post' });
  }
};
