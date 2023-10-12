const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database');
const User = require('../models/User');

const models = [User];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
