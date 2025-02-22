require('dotenv').config();
const pg = require('pg');

module.exports = {
  dialect: 'postgres',
  dialectModule: pg,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: true,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
    bigNumberStrings: true,
    ssl: {
      ca: process.env.DATABASE_CERT,
    },
  },
  timezone: 'America/Sao_Paulo',
};
