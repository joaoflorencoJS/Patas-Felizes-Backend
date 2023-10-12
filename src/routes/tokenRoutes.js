const { Router } = require('express');
const TokenController = require('../controllers/TokenController');

const router = new Router();

router.post('/', TokenController.store);

module.exports = router;
