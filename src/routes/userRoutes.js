const { Router } = require('express');
const userController = require('../controllers/UserController');

const router = Router();

router.get('/', userController.index);
router.post('/', userController.store);

module.exports = router;
