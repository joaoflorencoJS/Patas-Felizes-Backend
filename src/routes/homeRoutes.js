const { Router } = require('express');
const homeController = require('../controllers/HomeController');

const router = new Router();

router.get('/', homeController.index);

module.exports = router;
