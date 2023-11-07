const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database');
const User = require('../models/User');
const Ong = require('../models/Ong');
const Posts = require('../models/Posts');
const Adopter = require('../models/Adopter');

const models = [User, Ong, Posts, Adopter];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
