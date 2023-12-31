const { Router } = require('express');
const userController = require('../controllers/UserController');
const { verifyLogin } = require('../middlewares/IsLoggedIn');

const router = Router();

router.get('/', verifyLogin, userController.index);
router.post('/', userController.create);
router.get('/:id', verifyLogin, userController.show);
router.put('/:id', verifyLogin, userController.update);

module.exports = router;
