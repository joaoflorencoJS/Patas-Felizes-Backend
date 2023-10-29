const { Router } = require('express');
const userController = require('../controllers/UserController');

const router = Router();

router.get('/', userController.index);
router.post('/', userController.create);
router.get('/:id', userController.show);

module.exports = router;
