const express = require('express');
require('dotenv').config();
const cors = require('cors');

require('./src/database');

const homeRoutes = require('./src/routes/homeRoutes');
const userRoutes = require('./src/routes/userRoutes');
const tokenRoutes = require('./src/routes/tokenRoutes');
const ongRoutes = require('./src/routes/ongRoutes');
const postsRoutes = require('./src/routes/postsRoutes');
const adopterRoutes = require('./src/routes/adopterRoutes');
const corsOptions = require('./src/config/corsConfig');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(express.urlencoded({ extended: true, limit: '5mb' }));
    this.app.use(express.json({ limit: '5mb' }));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/ongs/', ongRoutes);
    this.app.use('/posts/', postsRoutes);
    this.app.use('/adopters/', adopterRoutes);
  }
}

module.exports = new App().app;
